import { Download, ExternalLink, FileText, Link as LinkIcon, BookOpen } from 'lucide-react';
import type { DownloadableResource, RelatedLink } from '@/types';

type DownloadableResourcesProps = {
  resources?: DownloadableResource[];
  relatedLinks?: RelatedLink[];
};

function formatDownloadUrl(url?: string): string {
  if (!url) return '#';
  const cleanUrl = url.trim();

  // Convert Google Drive view/share link to direct export/download link
  const driveMatch = cleanUrl.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (driveMatch && driveMatch[1]) {
    return `https://drive.google.com/uc?export=download&id=${driveMatch[1]}`;
  }

  // Handle Dropbox download links
  if (cleanUrl.includes('dropbox.com') && cleanUrl.includes('dl=0')) {
    return cleanUrl.replace('dl=0', 'dl=1');
  }

  if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://') && !cleanUrl.startsWith('/')) {
    return `https://${cleanUrl}`;
  }

  return cleanUrl;
}

function formatResourceBadge(res: DownloadableResource): string {
  if (res.fileSize) return res.fileSize;

  const fmt = res.detectedFormat || 'PDF';
  if (res.detectedSize) {
    const mb = (res.detectedSize / (1024 * 1024)).toFixed(1);
    return `${fmt} • ${mb} MB`;
  }

  return `${fmt} Resource`;
}

export default function DownloadableResources({ resources, relatedLinks }: DownloadableResourcesProps) {
  const safeResources = (resources ?? []).filter(Boolean);
  const safeLinks = (relatedLinks ?? []).filter(Boolean);

  const hasResources = safeResources.length > 0;
  const hasLinks = safeLinks.length > 0;

  if (!hasResources && !hasLinks) {
    return null;
  }

  return (
    <div className="mt-10 space-y-8">
      {/* Downloadable Guides & Resources */}
      {hasResources ? (
        <div className="border border-navy/15 bg-white p-6 md:p-8 shadow-[0_10px_30px_rgba(13,27,42,0.04)]">
          <div className="mb-5 flex items-center gap-3 border-b border-navy/10 pb-4">
            <div className="flex h-9 w-9 items-center justify-center bg-primary/10 text-primary">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-navy">
                Downloadable Guides & Resources
              </h3>
              <p className="text-xs text-navy/60">Free whitepapers, templates, and reference guides</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {safeResources.map((res, index) => {
              const downloadHref = formatDownloadUrl(res.fileUrl);
              const badgeLabel = formatResourceBadge(res);

              return (
                <div
                  key={res._key ?? `${res.title}-${index}`}
                  className="group flex flex-col justify-between border border-navy/10 bg-surface-light p-4 transition-all duration-300 hover:border-primary/40 hover:bg-white hover:shadow-md"
                >
                  <div>
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 text-[0.68rem] font-bold uppercase tracking-wider text-primary">
                        <FileText className="h-3.5 w-3.5" />
                        {badgeLabel}
                      </span>
                    </div>
                    <h4 className="font-heading text-base font-semibold leading-snug text-navy group-hover:text-primary">
                      {res.title}
                    </h4>
                    {res.description ? (
                      <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-navy/70">
                        {res.description}
                      </p>
                    ) : null}
                  </div>

                  {res.fileUrl ? (
                    <a
                      href={downloadHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      className="mt-4 inline-flex items-center justify-center gap-2 border border-navy bg-navy px-4 py-2 text-[0.7rem] font-bold uppercase tracking-widest text-white transition-colors duration-200 hover:bg-primary"
                    >
                      <Download className="h-3.5 w-3.5 text-accent" />
                      <span>Download Resource</span>
                    </a>
                  ) : (
                    <span className="mt-4 text-[0.7rem] italic text-navy/40">Download link coming soon</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : null}

      {/* Useful Links & Further Reading */}
      {hasLinks ? (
        <div className="border border-navy/15 bg-white p-6 md:p-8 shadow-[0_10px_30px_rgba(13,27,42,0.04)]">
          <div className="mb-4 flex items-center gap-3 border-b border-navy/10 pb-3">
            <div className="flex h-9 w-9 items-center justify-center bg-accent/15 text-accent">
              <LinkIcon className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-navy">
                Useful Links & Further Reading
              </h3>
              <p className="text-xs text-navy/60">Curated references and related articles</p>
            </div>
          </div>

          <ul className="divide-y divide-navy/10">
            {safeLinks.map((link, index) => (
              <li key={link._key ?? `${link.url}-${index}`} className="py-3 first:pt-0 last:pb-0">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start justify-between gap-4 no-underline"
                >
                  <div>
                    <span className="font-heading text-sm font-semibold text-navy transition-colors duration-200 group-hover:text-accent">
                      {link.label}
                    </span>
                    {link.description ? (
                      <p className="mt-0.5 text-xs text-navy/65">{link.description}</p>
                    ) : null}
                  </div>
                  <ExternalLink className="h-4 w-4 shrink-0 text-navy/35 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
