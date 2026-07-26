import type {Metadata} from 'next';
import Link from 'next/link';
import {ArrowUpRight, Clock, User, Calendar} from 'lucide-react';
import {Container} from '@/components/layout/Container';
import {getBlogPosts} from '@/lib/sanity/content';
import {SanityImage} from '@/lib/sanity/image';
import type {BlogPost} from '@/types';

export const metadata: Metadata = {
  title: 'Blogs',
  description: 'Ideas, market notes, and communications thinking from Core Communications.',
};

function getSlug(post: Pick<BlogPost, 'slug'>) {
  const rawSlug = post.slug?.current ?? '';
  const cleanSlug = rawSlug.replace(/^\/+|\/+$/g, '');
  return cleanSlug.split('/').pop() || cleanSlug;
}

function formatDate(date?: string) {
  if (!date) return null;

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));
}

function BlogCard({post, featured = false}: {post: BlogPost; featured?: boolean}) {
  const slug = getSlug(post);
  const date = formatDate(post.publishedAt);

  if (featured) {
    return (
      <Link
        href={`/blogs/${slug}`}
        className="group grid overflow-hidden border border-navy/10 bg-white no-underline shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-md lg:grid-cols-[1.1fr_1fr]"
      >
        {post.coverImage ? (
          <div className="relative aspect-[16/10] overflow-hidden bg-navy/5 lg:aspect-auto lg:h-full">
            <SanityImage
              image={post.coverImage}
              alt={post.coverImage.alt ?? post.title}
              width={800}
              height={500}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="relative aspect-[16/10] min-h-[14rem] bg-[linear-gradient(135deg,#0D1B2A_0%,#1F513F_60%,#C9952A_100%)] p-6 lg:aspect-auto lg:h-full flex items-end">
            <span className="text-[0.66rem] font-bold uppercase tracking-[0.2em] text-white/50">Core Insights</span>
          </div>
        )}

        <div className="flex flex-col justify-between p-6 sm:p-8">
          <div>
            <div className="mb-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-[0.66rem] font-bold uppercase tracking-[0.2em] text-primary">
                <span>Featured</span>
                <span className="text-navy/20">•</span>
                <span>{post.category}</span>
              </div>
              <ArrowUpRight className="h-5 w-5 shrink-0 text-navy/30 transition-transform duration-300 group-hover:rotate-45 group-hover:text-accent" />
            </div>

            <h2 className="font-heading text-xl font-semibold leading-snug tracking-tight text-navy transition-colors group-hover:text-primary sm:text-2xl">
              {post.title}
            </h2>

            {post.excerpt ? (
              <p className="mt-3 line-clamp-3 font-sans text-sm leading-relaxed text-navy/72">
                {post.excerpt}
              </p>
            ) : null}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-navy/10 pt-4 text-[0.72rem] font-medium text-navy/60">
            <div className="flex flex-wrap items-center gap-3">
              {post.author ? (
                <span className="inline-flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-navy/40" />
                  {post.author}
                </span>
              ) : null}
              {date ? (
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-navy/40" />
                  {date}
                </span>
              ) : null}
            </div>
            {post.readTime ? (
              <span className="inline-flex items-center gap-1 text-[0.68rem] font-bold uppercase tracking-wider text-navy/50">
                <Clock className="h-3.5 w-3.5" />
                {post.readTime}
              </span>
            ) : null}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/blogs/${slug}`}
      className="group flex flex-col justify-between overflow-hidden border border-navy/10 bg-white p-6 no-underline shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
    >
      <div>
        {post.coverImage ? (
          <div className="mb-4 aspect-[16/9] overflow-hidden border border-navy/5 bg-navy/5">
            <SanityImage
              image={post.coverImage}
              alt={post.coverImage.alt ?? post.title}
              width={600}
              height={340}
              sizes="(max-width: 768px) 100vw, 33vw"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ) : null}

        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="text-[0.66rem] font-bold uppercase tracking-[0.2em] text-primary">
            {post.category}
          </span>
          <ArrowUpRight className="h-4 w-4 shrink-0 text-navy/30 transition-transform duration-300 group-hover:rotate-45 group-hover:text-accent" />
        </div>

        <h3 className="font-heading text-lg font-semibold leading-snug tracking-tight text-navy transition-colors group-hover:text-primary">
          {post.title}
        </h3>

        {post.excerpt ? (
          <p className="mt-2.5 line-clamp-3 font-sans text-xs leading-relaxed text-navy/70">
            {post.excerpt}
          </p>
        ) : null}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-navy/10 pt-4 text-[0.68rem] font-medium text-navy/55">
        <span>{date || post.author || 'Core Communications'}</span>
        {post.readTime ? <span>{post.readTime}</span> : null}
      </div>
    </Link>
  );
}

export default async function BlogPage() {
  let posts: BlogPost[] = [];

  try {
    posts = (await getBlogPosts()) ?? [];
  } catch (error) {
    console.error('getBlogPosts error:', error);
  }

  const [featuredPost, ...restPosts] = posts;

  return (
    <main className="bg-surface-light text-navy">
      <section className="page-hero">
        <div className="page-hero-grid" aria-hidden="true" />
        <div className="page-hero-glow" aria-hidden="true" />
        <Container className="relative z-10 max-w-7xl">
          <div className="max-w-3xl">
            <div className="section-tag mb-6">Blogs</div>
            <h1
              className="font-semibold leading-[1.02] tracking-[-0.03em] text-white"
              style={{fontSize: 'var(--step-h1)'}}
            >
              Notes from the front line of credibility.
            </h1>
            <p className="mt-6 max-w-xl font-sans text-[1rem] font-normal leading-relaxed text-white/74">
              Practical thinking on B2B PR, market narratives, media behaviour, search visibility, and the small communication choices that compound into trust.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-[clamp(3rem,6vw,5.5rem)]">
        <Container className="max-w-7xl">
          {featuredPost ? (
            <div className="space-y-8">
              <BlogCard post={featuredPost} featured />
              {restPosts.length ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {restPosts.map((post) => (
                    <BlogCard key={post._id ?? getSlug(post)} post={post} />
                  ))}
                </div>
              ) : null}
            </div>
          ) : (
            <div className="border border-navy/10 bg-white p-8 text-center md:p-12">
              <div className="section-tag section-tag-dark mb-5 justify-center">Coming Soon</div>
              <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-navy md:text-4xl">Blog stories are being prepared.</h2>
              <p className="mx-auto mt-4 max-w-xl font-sans text-base leading-8 text-navy/68">
                Blogs will be updated soon.
              </p>
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}
