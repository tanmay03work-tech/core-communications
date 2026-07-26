import BlogLeadGate from '@/components/blog/BlogLeadGate';
import DownloadableResources from '@/components/blog/DownloadableResources';
import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {Container} from '@/components/layout/Container';
import SectionRenderer from '@/components/sections/SectionRenderer';
import StructuredData from '@/components/seo/StructuredData';
import SectionLabel from '@/components/ui/SectionLabel';
import {buildMetadata, buildOgImageUrl, getAbsoluteUrl, getSiteUrl} from '@/lib/metadata';
import {getBlogPostBySlug, getBlogPostSlugs} from '@/lib/sanity/content';
import {getSanityImageUrl, SanityImage} from '@/lib/sanity/image';

type BlogPostPageProps = {
  params: {slug: string};
};

type BlogPostRouteParams = {slug: string};

function normalizeSlug(slug: string | null | undefined) {
  if (typeof slug !== 'string') {
    return null;
  }

  const trimmedSlug = slug.trim().replace(/^\/+|\/+$/g, '');
  const seg = trimmedSlug.split('/').pop() || trimmedSlug;
  return seg.length > 0 ? seg : null;
}

function formatDate(date?: string) {
  if (!date) return null;

  return new Intl.DateTimeFormat('en', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));
}

async function getSafeBlogPostBySlug(slug: string) {
  const cleanSlug = slug.replace(/^\/+|\/+$/g, '');
  const seg = cleanSlug.split('/').pop() || cleanSlug;
  try {
    const post = await getBlogPostBySlug(cleanSlug);
    if (post) return post;
    if (seg !== cleanSlug) {
      return await getBlogPostBySlug(seg);
    }
    return null;
  } catch (error) {
    console.error(`getBlogPostBySlug error for "${cleanSlug}":`, error);
    return null;
  }
}

export async function generateStaticParams(): Promise<BlogPostRouteParams[]> {
  try {
    const slugs = await getBlogPostSlugs();

    return (slugs ?? [])
      .map((slug) => normalizeSlug(slug))
      .filter((slug): slug is string => Boolean(slug))
      .map((slug) => ({slug}));
  } catch (error) {
    console.error('generateStaticParams blog error:', error);
    return [];
  }
}

export async function generateMetadata({params}: BlogPostPageProps): Promise<Metadata> {
  const rawSlug = (params?.slug ?? '').replace(/^\/+|\/+$/g, '');
  const cleanSlug = rawSlug.split('/').pop() || rawSlug;
  const post = await getSafeBlogPostBySlug(cleanSlug);
  const pathname = `/blogs/${cleanSlug}`;

  if (!post) {
    return buildMetadata({
      title: 'Blog',
      description: 'Explore communications insights from Core Communications.',
      pathname,
    });
  }

  return buildMetadata({
    title: post.seo?.metaTitle ?? post.title,
    description: post.seo?.metaDescription ?? post.excerpt,
    pathname,
    ogImage: post.seo?.ogImage ?? post.coverImage,
  });
}

export default async function BlogPostPage({params}: BlogPostPageProps) {
  const rawSlug = (params?.slug ?? '').replace(/^\/+|\/+$/g, '');
  const cleanSlug = rawSlug.split('/').pop() || rawSlug;
  const post = await getSafeBlogPostBySlug(cleanSlug);

  if (!post) {
    notFound();
  }

  const date = formatDate(post.publishedAt);
  const image = post.seo?.ogImage ?? post.coverImage;
  const imageUrl = image ? getSanityImageUrl(image, {width: 1200, height: 630, fit: 'crop', quality: 85}) : buildOgImageUrl({title: post.title, description: post.excerpt, type: 'blog'});
  const sections = post.sections ?? [];

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    url: getAbsoluteUrl(`/blogs/${cleanSlug}`),
    image: [imageUrl],
    datePublished: post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author ?? 'Core Communications',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Core Communications',
      url: getSiteUrl(),
    },
  };

  return (
    <main className="bg-surface-light text-navy">
      <StructuredData data={structuredData} />

      <section className="border-y border-navy/12 bg-white pb-8 pt-32 md:pb-10 md:pt-36">
        <Container className="max-w-7xl">
          <div className="flex flex-col gap-3">
            <SectionLabel className="text-primary">{post.category ?? 'Blog'}</SectionLabel>
            <h1 className="max-w-5xl font-heading text-[clamp(2rem,4vw,3.9rem)] font-semibold leading-[0.98] tracking-[-0.035em] text-navy">
              {post.title}
            </h1>
            {post.excerpt ? <p className="max-w-4xl font-sans text-[0.88rem] leading-relaxed text-steel">{post.excerpt}</p> : null}
            {post.storyLead ? <p className="max-w-5xl text-[0.95rem] italic leading-relaxed text-black">{post.storyLead}</p> : null}
          </div>
          <div className="mobile-scroll-pane -mx-5 mt-5 flex gap-2.5 px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
            {post.author ? <span className="shrink-0 border border-neutral-100 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-navy/72">{post.author}</span> : null}
            {post.authorRole ? <span className="shrink-0 border border-neutral-100 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-navy/72">{post.authorRole}</span> : null}
            {post.readTime ? <span className="shrink-0 border border-neutral-100 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-navy/72">{post.readTime}</span> : null}
            {date ? <span className="shrink-0 border border-neutral-100 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-navy/72">{date}</span> : null}
          </div>
        </Container>
      </section>

      <section className="py-8 md:py-10">
        <Container className="max-w-7xl">
          {post.coverImage ? (
            <div className="mb-5 overflow-hidden border border-navy/10 bg-white">
              <SanityImage
                image={post.coverImage}
                alt={post.coverImage.alt ?? post.title}
                width={1440}
                height={760}
                sizes="100vw"
                className="h-auto w-full object-cover"
              />
            </div>
          ) : null}

          {post.keyTakeaways?.length ? (
            <div className="mb-5 border border-navy/10 bg-white p-5">
              <h2 className="mb-3 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-navy">Key Takeaways</h2>
              <ul className="space-y-2.5">
                {post.keyTakeaways.map((takeaway) => (
                  <li key={takeaway} className="grid grid-cols-[0.35rem_1fr] gap-3 font-sans text-[0.84rem] leading-relaxed text-navy/78">
                    <span className="mt-2 h-1 w-1 rounded-full bg-navy" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {/* Gated Blog Content & Downloadable Guides */}
          <BlogLeadGate blogTitle={post.title} blogSlug={cleanSlug} bodyContent={post.bodyContent}>
            <DownloadableResources resources={post.downloadableResources} relatedLinks={post.relatedLinks} />
          </BlogLeadGate>

          <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-navy/10 pt-5">
            <Link href="/blogs" className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-accent no-underline">
              Back To Blogs -&gt;
            </Link>
            {post.category ? <div className="text-[0.72rem] text-navy/62">Category: {post.category}</div> : null}
          </div>
        </Container>
      </section>

      <SectionRenderer sections={sections} />
    </main>
  );
}
