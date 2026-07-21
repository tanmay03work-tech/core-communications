import type {Metadata} from 'next';
import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';
import {Container} from '@/components/layout/Container';
import {getBlogPosts} from '@/lib/sanity/content';
import {SanityImage} from '@/lib/sanity/image';
import type {BlogPost} from '@/types';

export const metadata: Metadata = {
  title: 'Blogs',
  description: 'Ideas, market notes, and communications thinking from Core Communications.',
};

function getSlug(post: Pick<BlogPost, 'slug'>) {
  return post.slug?.current ?? '';
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

  return (
    <Link
      href={`/blogs/${slug}`}
      className={featured ? 'group grid min-h-full overflow-hidden border border-navy/10 bg-white no-underline shadow-[0_20px_70px_rgba(13,27,42,0.08)] lg:grid-cols-[1.1fr_0.9fr]' : 'group flex min-h-full flex-col overflow-hidden border border-navy/10 bg-white no-underline shadow-[0_12px_36px_rgba(13,27,42,0.045)] transition-transform duration-300 hover:-translate-y-1'}
    >
      {post.coverImage ? (
        <div className={featured ? 'min-h-[18rem] overflow-hidden bg-navy/5 lg:min-h-full' : 'aspect-[1.45] overflow-hidden bg-navy/5'}>
          <SanityImage
            image={post.coverImage}
            alt={post.coverImage.alt ?? post.title}
            width={featured ? 900 : 640}
            height={featured ? 760 : 440}
            sizes={featured ? '(max-width: 1024px) 100vw, 48vw' : '(max-width: 768px) 100vw, 33vw'}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ) : (
        <div className={featured ? 'flex min-h-[18rem] items-end bg-[linear-gradient(135deg,#0D1B2A_0%,#1F513F_55%,#C9952A_100%)] p-6 lg:min-h-full' : 'aspect-[1.45] bg-[linear-gradient(135deg,#0D1B2A_0%,#1F513F_58%,#C9952A_100%)]'} />
      )}

      <div className={featured ? 'flex flex-col justify-between p-[clamp(1.5rem,4vw,3.5rem)]' : 'flex flex-1 flex-col p-5 md:p-6'}>
        <div>
          <div className="mb-5 flex items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-primary">
              <span>{post.category}</span>
              {date ? <span className="text-navy/35">/ {date}</span> : null}
            </div>
            <ArrowUpRight className="h-5 w-5 shrink-0 text-navy/30 transition-all duration-300 group-hover:rotate-45 group-hover:text-accent" />
          </div>
          <h2 className={featured ? 'font-heading text-[clamp(2rem,4vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-navy' : 'font-heading text-2xl font-semibold leading-tight tracking-tight text-navy'}>
            {post.title}
          </h2>
          <p className={featured ? 'mt-5 max-w-2xl font-sans text-base leading-8 text-navy/72' : 'mt-4 line-clamp-3 font-sans text-[0.95rem] leading-7 text-navy/72'}>
            {post.excerpt}
          </p>
        </div>
        <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-navy/10 pt-5 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-navy/56">
          {post.author ? <span>{post.author}</span> : null}
          {post.readTime ? <span>{post.readTime}</span> : null}
        </div>
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

      <section className="py-[clamp(3rem,7vw,6.5rem)]">
        <Container className="max-w-7xl">
          {featuredPost ? (
            <div className="space-y-8">
              <BlogCard post={featuredPost} featured />
              {restPosts.length ? (
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
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
