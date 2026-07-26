import type {ReactNode} from 'react';
import ResponsiveSanityImage from '@/components/sections/ResponsiveSanityImage';
import {cn} from '@/lib/utils';
import type {PortableTextBlock, PortableTextCallout, PortableTextNode, PortableTextSpan} from '@/types';

type PortableTextContentProps = {
  value?: PortableTextNode[];
  className?: string;
  invert?: boolean;
};

function renderTextWithLinks(text: string, invert?: boolean) {
  if (!text || typeof text !== 'string') return text;

  // Master Regex matching Emails (user@domain.com) OR Web URLs (http://..., https://..., www...., domain.com)
  const masterRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|https?:\/\/[^\s]+|www\.[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+(?:\/[^\s]*)?|[a-zA-Z0-9-]+\.(?:biz|com|org|net|io|co|au|in|tech|edu|gov|xyz|me|info|app|us|uk)(?:\/[^\s]*)?)/gi;

  if (!masterRegex.test(text)) {
    return text;
  }

  const parts = text.split(masterRegex);

  return parts.map((part, idx) => {
    if (!part) return null;

    const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(part);
    const isUrl = /^(https?:\/\/[^\s]+|www\.[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+(?:\/[^\s]*)?|[a-zA-Z0-9-]+\.(?:biz|com|org|net|io|co|au|in|tech|edu|gov|xyz|me|info|app|us|uk)(?:\/[^\s]*)?)$/i.test(part);

    if (isEmail || isUrl) {
      let cleanTarget = part;
      let trailingPunctuation = '';
      const matchPunct = part.match(/([.,;:!?)]+)$/);
      if (matchPunct) {
        trailingPunctuation = matchPunct[1];
        cleanTarget = part.slice(0, -trailingPunctuation.length);
      }

      if (isEmail) {
        return (
          <span key={idx}>
            <a
              href={`mailto:${cleanTarget}`}
              className={cn(
                'font-semibold underline underline-offset-4 transition-colors duration-200 cursor-pointer',
                invert
                  ? 'text-accent decoration-accent/60 hover:text-white hover:decoration-white'
                  : 'text-accent decoration-accent/60 hover:text-gold hover:decoration-gold'
              )}
            >
              {cleanTarget}
            </a>
            {trailingPunctuation}
          </span>
        );
      }

      const href = cleanTarget.toLowerCase().startsWith('http') ? cleanTarget : `https://${cleanTarget}`;

      return (
        <span key={idx}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'font-semibold underline underline-offset-4 transition-colors duration-200 cursor-pointer',
              invert
                ? 'text-accent decoration-accent/60 hover:text-white hover:decoration-white'
                : 'text-accent decoration-accent/60 hover:text-gold hover:decoration-gold'
            )}
          >
            {cleanTarget}
          </a>
          {trailingPunctuation}
        </span>
      );
    }
    return part;
  });
}

function renderSpan(span: PortableTextSpan, block: PortableTextBlock, invert?: boolean) {
  const markDefs = block.markDefs ?? [];
  const baseContent = renderTextWithLinks(span.text ?? '', invert);

  if (!span.marks || span.marks.length === 0) {
    return baseContent;
  }

  return span.marks.reduce<ReactNode>((content, mark) => {
    if (mark === 'strong') return <strong key={mark} className="font-bold">{content}</strong>;
    if (mark === 'em') return <em key={mark} className="font-serif italic">{content}</em>;

    const annotation = markDefs.find((def) => def._key === mark && (def._type === 'link' || Boolean(def.href)));
    if (annotation?.href) {
      const rawHref = annotation.href;
      const href = rawHref.toLowerCase().startsWith('www.') ? `https://${rawHref}` : rawHref;
      const isExternal = href.startsWith('http') || href.startsWith('//');

      return (
        <a
          key={mark}
          href={href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className={cn(
            'font-semibold underline underline-offset-4 transition-colors duration-200 cursor-pointer',
            invert
              ? 'text-accent decoration-accent/60 hover:text-white hover:decoration-white'
              : 'text-accent decoration-accent/60 hover:text-gold hover:decoration-gold'
          )}
        >
          {content}
        </a>
      );
    }

    return content;
  }, baseContent);
}

function renderBlock(block: PortableTextBlock, invert?: boolean) {
  const Tag =
    block.listItem === 'bullet' || block.listItem === 'number'
      ? 'li'
      : block.style === 'h2'
        ? 'h2'
        : block.style === 'h3'
          ? 'h3'
          : block.style === 'blockquote'
            ? 'blockquote'
            : 'p';

  const tagClasses =
    Tag === 'li'
      ? 'text-base leading-8 md:text-lg'
      : Tag === 'h2'
        ? 'font-heading text-3xl md:text-4xl leading-tight'
        : Tag === 'h3'
          ? 'font-heading text-2xl md:text-3xl leading-tight'
          : Tag === 'blockquote'
            ? 'border-l-2 pl-6 font-serif text-xl italic leading-8'
            : 'text-base leading-8 md:text-lg';

  return (
    <Tag
      key={block._key}
      className={cn(tagClasses, invert ? 'text-white/90 border-white/20' : 'text-current border-navy/15')}
    >
      {block.children?.map((span) => (
        <span key={span._key}>{renderSpan(span, block, invert)}</span>
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
          if (node.listItem === 'bullet') {
            return (
              <ul key={node._key} className="list-disc pl-6 space-y-2">
                {renderBlock(node, invert)}
              </ul>
            );
          }
          if (node.listItem === 'number') {
            return (
              <ol key={node._key} className="list-decimal pl-6 space-y-2">
                {renderBlock(node, invert)}
              </ol>
            );
          }
          return renderBlock(node, invert);
        }

        if (node._type === 'callout') {
          return renderCallout(node, invert);
        }

        if (node._type === 'image') {
          return (
            <figure key={node._key} className="space-y-3">
              <ResponsiveSanityImage image={node} sizes="(max-width: 768px) 100vw, 800px" />
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
