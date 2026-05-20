import type {ReactNode} from 'react';
import ResponsiveSanityImage from '@/components/sections/ResponsiveSanityImage';
import {cn} from '@/lib/utils';
import type {PortableTextBlock, PortableTextCallout, PortableTextNode, PortableTextSpan} from '@/types';

type PortableTextContentProps = {
  value?: PortableTextNode[];
  className?: string;
  invert?: boolean;
};

function renderSpan(span: PortableTextSpan, block: PortableTextBlock) {
  const markDefs = block.markDefs ?? [];

  return (span.marks ?? []).reduce<ReactNode>((content, mark) => {
    if (mark === 'strong') return <strong key={mark}>{content}</strong>;
    if (mark === 'em') return <em key={mark}>{content}</em>;

    const annotation = markDefs.find((def) => def._key === mark && def._type === 'link');
    if (annotation?.href) {
      return (
        <a
          key={mark}
          href={annotation.href}
          target={annotation.href.startsWith('http') ? '_blank' : undefined}
          rel={annotation.href.startsWith('http') ? 'noreferrer' : undefined}
          className="underline decoration-current/30 underline-offset-4 transition-opacity hover:opacity-70"
        >
          {content}
        </a>
      );
    }

    return content;
  }, span.text);
}

function renderBlock(block: PortableTextBlock, invert?: boolean) {
  const Tag =
    block.style === 'h2'
      ? 'h2'
      : block.style === 'h3'
        ? 'h3'
        : block.style === 'blockquote'
          ? 'blockquote'
          : 'p';

  const tagClasses =
    Tag === 'h2'
      ? 'font-display text-3xl md:text-4xl leading-tight'
      : Tag === 'h3'
        ? 'font-display text-2xl md:text-3xl leading-tight'
        : Tag === 'blockquote'
          ? 'border-l-2 pl-6 text-xl italic leading-8'
          : 'text-base leading-8 md:text-lg';

  return (
    <Tag
      key={block._key}
      className={cn(tagClasses, invert ? 'text-white/90 border-white/20' : 'text-current border-navy/15')}
    >
      {block.children?.map((span) => (
        <span key={span._key}>{renderSpan(span, block)}</span>
      ))}
    </Tag>
  );
}

function renderCallout(callout: PortableTextCallout, invert?: boolean) {
  const toneClass =
    callout.tone === 'success'
      ? 'border-emerald-400/30 bg-emerald-400/10'
      : callout.tone === 'warning'
        ? 'border-amber-400/30 bg-amber-400/10'
        : invert
          ? 'border-white/10 bg-white/5'
          : 'border-navy/10 bg-white/70';

  return (
    <div key={callout._key} className={cn('rounded-3xl border px-6 py-5', toneClass)}>
      {callout.title ? <div className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-accent">{callout.title}</div> : null}
      <p className={cn('leading-7', invert ? 'text-white/80' : 'text-navy/80')}>{callout.body}</p>
    </div>
  );
}

export default function PortableTextContent({value, className, invert = false}: PortableTextContentProps) {
  if (!value?.length) return null;

  return (
    <div className={cn('flex flex-col gap-6', className)}>
      {value.map((node) => {
        if (node._type === 'block') {
          return renderBlock(node, invert);
        }

        if (node._type === 'callout') {
          return renderCallout(node, invert);
        }

        if (node._type === 'image') {
          return (
            <figure key={node._key} className="space-y-3">
              <ResponsiveSanityImage image={node} />
              {node.caption ? (
                <figcaption className={cn('text-sm leading-6', invert ? 'text-white/55' : 'text-navy/55')}>
                  {node.caption}
                </figcaption>
              ) : null}
            </figure>
          );
        }

        return null;
      })}
    </div>
  );
}
