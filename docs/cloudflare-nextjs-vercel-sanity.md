# Cloudflare Setup for Next.js 14 + Vercel + Sanity

This project is designed to run behind Cloudflare with Vercel handling application delivery and ISR. Use the settings below for a safe production setup that improves global performance without breaking hydration, draft flows, Sanity updates, or API routes.

## Stack assumptions

- App: Next.js 14 on Vercel
- CMS: Sanity
- Email: Resend
- Contact form spam protection: Cloudflare Turnstile
- ISR / on-demand revalidation: enabled

## 1. DNS

Configure these in Cloudflare DNS:

| Type | Name | Value | Proxy |
| --- | --- | --- | --- |
| `A` | `@` | `76.76.21.21` | Proxied |
| `CNAME` | `www` | `cname.vercel-dns.com` | Proxied |

Notes:

- Keep website traffic proxied through Cloudflare.
- Keep mail-only records such as MX, SPF, DKIM, and DMARC as `DNS only`.

## 2. SSL/TLS

Cloudflare -> `SSL/TLS` -> `Overview`

- `SSL/TLS encryption mode`: `Full (strict)`

Cloudflare -> `SSL/TLS` -> `Edge Certificates`

- `Always Use HTTPS`: `On`
- `Automatic HTTPS Rewrites`: `On`

HSTS:

- `Enable HSTS`: `On`
- `Max Age`: `6 months`
- `Include subdomains`: `Yes`
- `Preload`: `No`

## 3. Performance

Cloudflare -> `Speed` / `Optimization`

Enable:

- `Auto Minify`: HTML, CSS, JavaScript
- `Brotli`: `On`
- `Early Hints`: `On`
- `HTTP/3`: `On`

Disable:

- `Rocket Loader`: `Off`

`Rocket Loader` should stay off for this app because it can interfere with Next.js hydration and client-side animation timing.

## 4. Cache Rules

Do not add a site-wide `Cache Everything` rule. Vercel already handles HTML and ISR caching for Next.js.

Create these Cloudflare cache rules:

### Rule 1: Next.js static assets

- Match: `http.request.uri.path starts_with "/_next/static/"`
- Action: `Eligible for cache`
- `Edge TTL`: `1 year`
- `Browser TTL`: `1 year`

### Rule 2: API routes

- Match: `http.request.uri.path starts_with "/api/"`
- Action: `Bypass cache`

### Rule 3: Sanity studio and revalidation

- Match:
  `http.request.uri.path contains "/studio"`
  or `http.request.uri.path contains "/api/revalidate"`
- Action: `Bypass cache`

This keeps the following safe:

- `/_next/static/*` gets aggressive edge caching
- `/api/contact` stays dynamic for Resend and Turnstile
- `/api/revalidate` stays dynamic for on-demand ISR
- `/studio` avoids stale admin content

## 5. Security

Cloudflare -> `Security`

- `Security Level`: `Medium`
- `Bot Fight Mode`: `On`

## 6. WAF / Rate limiting

Recommended Cloudflare protection:

### Contact endpoint

- Expression: `http.request.uri.path eq "/api/contact"`
- Action: `Rate Limit`
- Threshold: `10 requests`
- Period: `1 minute`
- Characteristic: `IP`
- Mitigation: `Managed Challenge`

This repo now matches that policy at the app layer as well, with a `10/minute/IP` fallback rate limit in the route handler.

### Suspicious traffic

- Expression: `cf.threat_score gt 20`
- Action: `Managed Challenge`

If your Cloudflare plan does not expose `cf.threat_score`, skip this custom rule and rely on Managed WAF rules plus Bot Fight Mode.

## 7. Turnstile

Create a Turnstile site in Cloudflare:

- Name: `Core Communications Contact Form`
- Domains:
  - your production domain, for example `corecommunications.example`
  - `www.your-production-domain`
  - the active Vercel deployment domain used for testing, for example `your-project.vercel.app`
- Widget type: `Invisible`

The contact form renders Turnstile with `size: 'invisible'`. A Managed widget or a site key that does not allow the current hostname will cause the browser to reject the challenge before the message reaches `/api/contact`.

Add these Vercel environment variables:

```bash
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
CLOUDFLARE_TURNSTILE_SECRET=
```

Implementation status in this repo:

- Client widget: [apps/web/src/components/sections/ContactForm.tsx](/E:/CORE_COMMUNICATION/apps/web/src/components/sections/ContactForm.tsx)
- Server verification: [apps/web/src/app/api/contact/route.ts](/E:/CORE_COMMUNICATION/apps/web/src/app/api/contact/route.ts)

The current implementation uses Cloudflare's script API directly, so no extra Turnstile React package is required unless you want to swap implementations later.

## 8. Email routing

Optional but recommended:

- Create `contact@yourdomain.com` in Cloudflare Email Routing
- Forward it to your working inbox
- Use the same branded address in Resend once domain verification is complete

Suggested sender format:

- `Core Communications <contact@yourdomain.com>`

## 9. Vercel environment checklist

The app already reads configuration from `process.env`, so production secrets should live in Vercel rather than committed files. Keep local-only values in ignored `.env.local` files, or pull them with `vercel env pull`.

Set these values in Vercel for production:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SITE_URL=
RESEND_API_KEY=
RESEND_FROM_EMAIL="Core Communications <contact@yourdomain.com>"
CONTACT_EMAIL_TO=contact@yourdomain.com
CLOUDFLARE_TURNSTILE_SECRET=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
REVALIDATE_SECRET=
KV_REST_API_URL=
KV_REST_API_TOKEN=
SANITY_API_READ_TOKEN=
```

Notes:

- `NEXT_PUBLIC_SANITY_DATASET` is optional because the app defaults to `production`.
- `SANITY_API_TOKEN` is typically used by Studio or webhook flows.
- `SANITY_API_TOKEN` is not used by the current web runtime, so do not add it unless a Studio workflow or script actually needs it.
- `CONTACT_EMAIL_TO` is optional because the contact route falls back to the public site email constant.
- `CLOUDFLARE_TURNSTILE_SECRET` and `NEXT_PUBLIC_TURNSTILE_SITE_KEY` are optional together; leaving them unset disables Turnstile verification.
- `REVALIDATE_SECRET` is required only if you enable Sanity webhooks or other on-demand revalidation calls.
- `SANITY_API_READ_TOKEN` is used for preview/draft reads when needed.
- `KV_REST_API_URL` and `KV_REST_API_TOKEN` are optional, but recommended for more durable rate limiting across serverless instances.
- `EDGE_CONFIG` is optional; if unset, feature flags fall back to hardcoded defaults in the app.

## 10. Verify after deploy

Confirm all of the following:

- Cloudflare proxy is enabled for web traffic
- SSL mode is `Full (strict)`
- `Rocket Loader` is off
- `/_next/static/*` is cached
- `/api/*` bypasses cache
- `/api/revalidate` bypasses cache
- `/studio` bypasses cache
- Turnstile returns a valid token on the contact page
- Contact form still sends mail successfully
- Sanity publish events update the site correctly
- No site-wide `Cache Everything` rule exists
