import {redirect} from 'next/navigation';

type BlogRedirectPageProps = {
  params: {slug: string};
};

export default function BlogPostRedirectPage({params}: BlogRedirectPageProps) {
  const rawSlug = (params?.slug ?? '').replace(/^\/+|\/+$/g, '');
  const cleanSlug = rawSlug.split('/').pop() || rawSlug;
  redirect(`/blogs/${cleanSlug}`);
}
