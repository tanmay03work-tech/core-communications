import {revalidatePath, revalidateTag} from 'next/cache';
import { NextResponse } from 'next/server';

type RevalidatePayload = {
  _type?: string;
  slug?: string | {current?: string};
  document?: {
    _type?: string;
    slug?: string | {current?: string};
  };
};

function resolveSlug(payload: RevalidatePayload | null) {
  const slug = payload?.slug ?? payload?.document?.slug;

  if (typeof slug === 'string') {
    return slug;
  }

  return slug?.current;
}

function resolveType(payload: RevalidatePayload | null) {
  return payload?._type ?? payload?.document?._type ?? null;
}

export async function POST(request: Request) {
  const secret = request.headers.get('x-revalidate-secret');

  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false, message: 'Unauthorized' }, { status: 401 });
  }

  const payload = (await request.json().catch(() => null)) as RevalidatePayload | null;
  const slug = resolveSlug(payload);
  const documentType = resolveType(payload);

  revalidateTag('sanity');

  if (documentType === 'siteSettings') {
    revalidateTag('siteSettings');
  }

  if (documentType === 'service') {
    revalidateTag('services');
  }

  if (documentType === 'teamMember') {
    revalidateTag('teamMembers');
  }

  if (documentType === 'caseStudy') {
    revalidateTag('caseStudies');
    if (slug) {
      revalidateTag(`caseStudy:${slug}`);
      revalidatePath(`/work/${slug}`);
    }
  }

  revalidatePath('/');
  revalidatePath('/work');

  return NextResponse.json({
    ok: true,
    revalidated: true,
    slug: slug ?? null,
    type: documentType,
  });
}
