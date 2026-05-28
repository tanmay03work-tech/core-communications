import {ImageResponse} from 'next/og';

export const runtime = 'edge';

async function fetchGoogleFont(url: string) {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      },
    });
    const css = await response.text();
    const match = css.match(/src: url\(([^)]+)\) format\('(opentype|truetype|woff2?)'\)/);

    if (!match?.[1]) {
      return null;
    }

    const fontResponse = await fetch(match[1]);
    return fontResponse.arrayBuffer();
  } catch {
    return null;
  }
}

const fontPromise = Promise.all([
  fetchGoogleFont('https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap'),
  fetchGoogleFont('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap'),
]);

function truncate(value: string, length: number) {
  return value.length > length ? `${value.slice(0, length - 1).trimEnd()}…` : value;
}

export async function GET(request: Request) {
  const {searchParams} = new URL(request.url);
  const title = truncate(searchParams.get('title') ?? 'Core Communications', 110);
  const description = truncate(
    searchParams.get('description') ?? 'Clarity. Credibility. Cut-through.',
    180,
  );
  const type = truncate(searchParams.get('type') ?? 'Case Study', 24).toUpperCase();
  const [poppins, openSans] = await fontPromise;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background:
            'radial-gradient(circle at top right, rgba(0, 184, 150, 0.16), transparent 30%), linear-gradient(135deg, #0D1B2A 0%, #1E2F44 52%, #2E4057 100%)',
          color: 'white',
          fontFamily: 'Open Sans',
          padding: '56px 64px',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 8,
            background: 'linear-gradient(90deg, #C9952A 0%, rgba(0, 184, 150, 0.7) 100%)',
          }}
        />

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 18}}>
            <div style={{position: 'relative', width: 54, height: 54, display: 'flex'}}>
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '9999px',
                  border: '4px solid #2E4057',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: 27,
                  height: 27,
                  borderTop: '4px solid #00B896',
                  borderLeft: '4px solid #00B896',
                  borderTopLeftRadius: '9999px',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: 21,
                  left: 21,
                  width: 12,
                  height: 12,
                  borderRadius: '9999px',
                  background: '#00B896',
                }}
              />
            </div>

            <div style={{display: 'flex', flexDirection: 'column'}}>
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                }}
              >
                CORE
              </div>
              <div
                style={{
                  fontSize: 11,
                  textTransform: 'uppercase',
                  letterSpacing: '0.3em',
                  color: 'rgba(255,255,255,0.65)',
                }}
              >
                Communications
              </div>
            </div>
          </div>

          <div
            style={{
              padding: '10px 16px',
              borderRadius: 9999,
              border: '1px solid rgba(255,255,255,0.16)',
              color: '#00D4AA',
              fontSize: 16,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
            }}
          >
            {type}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 22,
            maxWidth: 920,
          }}
        >
          <div
            style={{
              width: 160,
              height: 3,
              background: 'linear-gradient(90deg, #C9952A 0%, rgba(0, 184, 150, 0.22) 100%)',
              borderRadius: 9999,
            }}
          />
          <div
            style={{
              fontFamily: 'Poppins',
              fontSize: 74,
              lineHeight: 1.02,
              letterSpacing: '-0.04em',
            }}
          >
            {title}
          </div>
          <div
            style={{
              maxWidth: 760,
              fontSize: 24,
              lineHeight: 1.45,
              color: 'rgba(255,255,255,0.78)',
            }}
          >
            {description}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 18,
            color: 'rgba(255,255,255,0.6)',
          }}
        >
          <div>Clarity. Credibility. Cut-through.</div>
          <div>corecommunications</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        ...(poppins
          ? [
              {
                name: 'Poppins',
                data: poppins,
                style: 'normal' as const,
                weight: 700 as const,
              },
            ]
          : []),
        ...(openSans
          ? [
              {
                name: 'Open Sans',
                data: openSans,
                style: 'normal' as const,
                weight: 400 as const,
              },
            ]
          : []),
      ],
    },
  );
}
