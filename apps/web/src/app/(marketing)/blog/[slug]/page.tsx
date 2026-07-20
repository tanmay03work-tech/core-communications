import {redirect} from 'next/navigation';

type BlogRedirectPageProps = {
  params: {slug: string};
};

export default function BlogPostRedirectPage({params}: BlogRedirectPageProps) {
  redirect(`/blogs/${params.slug}`);
}
