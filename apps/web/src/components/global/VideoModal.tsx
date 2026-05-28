'use client';

import {AnimatePresence, m} from 'framer-motion';
import {X} from 'lucide-react';
import {useEffect} from 'react';

type VideoModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  videoUrl?: string;
};

export default function VideoModal({
  open,
  onClose,
  title = 'Brand Reel',
  videoUrl,
}: VideoModalProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, open]);

  return (
    <AnimatePresence>
      {open ? (
        <m.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#08111f]/80 px-4 backdrop-blur-md"
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          onClick={onClose}
        >
          <m.div
            className="relative w-full max-w-4xl overflow-hidden rounded-[2rem] border border-white/12 bg-[#08111f] shadow-[0_30px_120px_rgba(0,0,0,0.45)]"
            initial={{opacity: 0, y: 24, scale: 0.96}}
            animate={{opacity: 1, y: 0, scale: 1}}
            exit={{opacity: 0, y: 20, scale: 0.97}}
            transition={{duration: 0.35, ease: [0.22, 1, 0.36, 1]}}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/75 transition hover:border-white/30 hover:text-white"
              aria-label="Close video modal"
            >
              <X size={18} />
            </button>
            <div className="aspect-video w-full">
              {videoUrl ? (
                <iframe
                  src={videoUrl}
                  title={title}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[radial-gradient(circle_at_top,rgba(91,192,235,0.22),transparent_46%),linear-gradient(135deg,rgba(28,46,74,0.3),rgba(8,17,31,0.92))] px-6 text-center">
                  <p className="text-xs uppercase tracking-[0.3em] text-accent/80">Video Preview</p>
                  <h3 className="font-heading text-3xl text-white">{title}</h3>
                  <p className="max-w-md text-sm leading-7 text-white/60">
                    Add a `videoUrl` prop when this hero is wired into real content and the play trigger will open the embedded reel here.
                  </p>
                </div>
              )}
            </div>
          </m.div>
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}
