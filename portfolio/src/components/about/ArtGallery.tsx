"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { MY_ART, type ArtPiece } from "./artGalleryData";

type ArtGalleryProps = {
  pieces?: ArtPiece[];
  koulenClass?: string;
  specialClass?: string;
};

/** Masonry thumbnails */
const GALLERY_SIZES =
  "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1536px) 25vw, 20vw";

/** Lightbox: image column is ~half the modal on desktop */
const LIGHTBOX_SIZES =
  "(max-width: 767px) 96vw, (max-width: 1536px) 45vw, 720px";

export default function ArtGallery({
  pieces = MY_ART,
  koulenClass = "",
  specialClass = "",
}: ArtGalleryProps) {
  const [active, setActive] = useState<ArtPiece | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const open = useCallback((piece: ArtPiece) => {
    setActive(piece);
  }, []);

  const close = useCallback(() => {
    setActive(null);
  }, []);

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    if (active) {
      if (!el.open) el.showModal();
    } else if (el.open) {
      el.close();
    }
  }, [active]);

  return (
    <section
      className="relative w-full overflow-hidden bg-zinc-950 bg-[url('/assets/artBg.jpg')] bg-cover bg-center py-12 sm:py-14 md:py-16"
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 md:px-12 lg:max-w-[90rem] lg:px-16 xl:px-20">
        <h2
          className={`${koulenClass} mb-10 text-center text-3xl text-white drop-shadow-md sm:mb-12 sm:text-4xl md:mb-14 md:text-5xl lg:mb-16 lg:text-5xl xl:text-5xl`}
        >
          ‧₊˚❀༉‧₊˚ my art ‧₊˚❀༉‧₊˚.
        </h2>

        <div className="columns-2 gap-3 sm:columns-3 sm:gap-4 md:columns-4 md:gap-4 lg:gap-5">
          {pieces.map((piece) => (
            <article
              key={piece.id}
              className="mb-3 break-inside-avoid sm:mb-4"
            >
              <button
                type="button"
                onClick={() => open(piece)}
                className="group w-full cursor-zoom-in rounded-xl text-left outline-none ring-white/0 transition-[transform,box-shadow] duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-black/40 focus-visible:ring-2 focus-visible:ring-white/70 motion-reduce:transition-none motion-reduce:hover:scale-100"
              >
                <div className="relative w-full overflow-hidden rounded-xl bg-zinc-900">
                  <Image
                    src={piece.src}
                    alt={piece.title}
                    width={piece.width}
                    height={piece.height}
                    sizes={GALLERY_SIZES}
                    className="cursor-pointer h-auto w-full transition duration-200 group-hover:brightness-105 motion-reduce:group-hover:brightness-100"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <p
                  className={`${koulenClass} mt-2 line-clamp-2 px-0.5 text-sm text-white/90 sm:text-base`}
                >
                  {piece.title}
                </p>
              </button>
            </article>
          ))}
        </div>

        <p
          className={`${specialClass} mx-auto mt-10 max-w-2xl text-center text-base leading-relaxed text-white/90 sm:mt-12 sm:text-lg md:mt-14`}
        >
          Want to see more? Follow my instagram{" "}
          <a
            href="https://www.instagram.com/katxartt/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-kat-purple underline decoration-kat-purple/50 underline-offset-2 transition hover:text-kat-purple hover:decoration-kat-purple"
          >
            @katxartt
          </a>{" "}
          !
        </p>
      </div>

      <dialog
        ref={dialogRef}
        className="fixed left-1/2 top-1/2 z-[200] hidden max-h-[96dvh] w-[min(99vw,1920px)] max-w-[calc(100vw-0.5rem)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 p-0 text-white shadow-2xl outline-none open:flex [&::backdrop]:bg-black/85"
        onClose={close}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        {active && (
          <div className="relative flex max-h-[96dvh] w-full flex-col md:h-[min(92dvh,960px)] md:max-h-[92dvh] md:flex-row">
            <button
              type="button"
              onClick={close}
              className="absolute right-3 top-3 z-20 rounded-lg bg-black/50 px-3 py-1.5 text-sm text-white/90 backdrop-blur-sm transition hover:bg-black/70 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70 md:right-4 md:top-4"
              aria-label="Close"
            >
              ✕
            </button>

            {/* Image — left on md+ */}
            <div className="relative flex h-[min(42vh,480px)] w-full shrink-0 items-center justify-center bg-black p-4 sm:h-[min(46vh,520px)] md:h-full md:min-h-0 md:w-[min(50%,900px)] md:max-w-[52%] md:p-6 lg:w-[48%]">
              <Image
                src={active.fullSrc ?? active.src}
                alt={active.title}
                width={active.width}
                height={active.height}
                sizes={LIGHTBOX_SIZES}
                className="max-h-full max-w-full object-contain"
                priority
              />
            </div>

            {/* Title, date, description — right on md+ */}
            <div className="flex min-h-0 min-w-0 flex-1 flex-col border-t border-white/10 md:border-l md:border-t-0">
              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-7 sm:py-7 md:px-8 md:py-8 lg:px-10 lg:py-10">
                <h3
                  className={`${koulenClass} pr-10 text-2xl text-white sm:pr-12 sm:text-3xl md:pr-14 md:text-4xl lg:text-5xl`}
                >
                  {active.title}
                </h3>

                <div className="mt-4 md:mt-5">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/45">
                    Date
                  </p>
                  <p
                    className={`${specialClass} mt-1.5 text-base text-white/90 sm:text-lg`}
                  >
                    {active.date}
                  </p>
                </div>

                <div className="mt-6 md:mt-8">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/45">
                    About
                  </p>
                  <p
                    className={`${specialClass} mt-3 whitespace-pre-wrap text-base leading-relaxed text-white/[0.88] sm:text-lg md:text-lg lg:leading-loose`}
                  >
                    {active.description}
                  </p>
                </div>
              </div>

              <div className="shrink-0 border-t border-white/10 px-5 py-3 sm:px-7 md:px-8 lg:px-10">
                <form method="dialog" className="flex justify-end">
                  <button
                    type="submit"
                    className="cursor-pointer rounded-lg bg-white/10 px-4 py-2 text-sm text-white transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60"
                  >
                    Close
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
