"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
  StaggerRevealGroup,
  StaggerRevealItem,
} from "../../../components/StaggerReveal";
import {
  THINGS_I_LIKE_TO_DO,
  type ThingILikeToDo,
} from "./thingsILikeToDoData";

const MD_MIN = 768;

function useResponsiveItemsPerPage(): number {
  const [perPage, setPerPage] = useState(6);

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${MD_MIN}px)`);
    const read = () => (mq.matches ? 6 : 3);
    setPerPage(read());
    const onChange = () => setPerPage(read());
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return perPage;
}

function ThingRow({
  item,
  specialClass,
}: {
  item: ThingILikeToDo;
  specialClass: string;
}) {
  return (
    <div
      className="relative z-0 flex min-w-0 origin-left items-center gap-4 rounded-xl px-1 py-1 sm:gap-5 md:gap-6 lg:gap-8 transform-gpu transition-transform duration-200 ease-out hover:z-10 hover:scale-[1.085] motion-reduce:transition-none motion-reduce:hover:scale-100"
    >
      <img
        src={item.imageSrc}
        alt=""
        className="h-16 w-16 shrink-0 rounded-full object-cover sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-28 lg:w-28 xl:h-32 xl:w-32"
      />
      <p
        className={`${specialClass} text-left text-base leading-snug text-white sm:text-lg md:text-lg lg:text-xl max-w-60`}
      >
        {item.label}
      </p>
    </div>
  );
}

type ThingsILikeToDoProps = {
  /** Override default data (optional) */
  items?: ThingILikeToDo[];
  koulenClass?: string;
  specialClass?: string;
};

export default function ThingsILikeToDo({
  items = THINGS_I_LIKE_TO_DO,
  koulenClass = "",
  specialClass = "",
}: ThingsILikeToDoProps) {
  const perPage = useResponsiveItemsPerPage();
  const prevPerPage = useRef(6);
  const [page, setPage] = useState(0);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(items.length / perPage)),
    [items.length, perPage],
  );

  useEffect(() => {
    const prev = prevPerPage.current;
    if (prev !== perPage) {
      setPage((p) => Math.floor((p * prev) / perPage));
      prevPerPage.current = perPage;
    }
  }, [perPage]);

  useEffect(() => {
    setPage((p) => Math.min(p, totalPages - 1));
  }, [totalPages]);

  const canPrev = page > 0;
  const canNext = page < totalPages - 1;
  const showArrows = items.length > perPage;

  const sliceStart = page * perPage;
  const visible = items.slice(sliceStart, sliceStart + perPage);

  const goPrev = useCallback(() => {
    setPage((p) => Math.max(0, p - 1));
  }, []);

  const goNext = useCallback(() => {
    setPage((p) => Math.min(totalPages - 1, p + 1));
  }, [totalPages]);

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col justify-center">
      <div className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-8 sm:py-14 md:px-12 md:py-16 lg:max-w-[90rem] lg:px-16 lg:py-12 xl:px-20">
        <h2
          className={`${koulenClass} mb-10 text-center text-3xl text-white drop-shadow-md sm:mb-12 sm:text-4xl md:mb-14 md:text-5xl lg:mb-16 lg:text-5xl xl:text-5xl`}
        >
          ‧₊˚❀༉‧₊˚.Things i like to do! ‧₊˚❀༉‧₊˚.
        </h2>

        <div className="relative flex min-h-0 w-full items-stretch gap-3 sm:gap-4 md:gap-6">
          {showArrows && (
            <button
              type="button"
              onClick={goPrev}
              disabled={!canPrev}
              aria-label="Previous"
              className="shrink-0 self-center rounded-full p-2 text-white/90 transition enabled:hover:bg-white/15 enabled:hover:text-white disabled:pointer-events-none disabled:opacity-30 md:p-3"
            >
              <FaChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
            </button>
          )}

          <div className="min-h-0 min-w-0 w-0 flex-1 basis-0">
            <StaggerRevealGroup
              replayKey={page}
              itemCount={visible.length}
              className="grid w-full auto-rows-fr grid-cols-1 items-center gap-x-10 gap-y-8 overflow-visible sm:gap-y-10 md:grid-cols-2 md:gap-x-14 md:gap-y-12 lg:min-h-[min(50dvh,28rem)] lg:gap-x-20 lg:gap-y-14 xl:gap-x-24 xl:gap-y-16"
            >
              {visible.map((item, i) => (
                <StaggerRevealItem key={`${sliceStart + i}-${item.imageSrc}`} index={i}>
                  <ThingRow item={item} specialClass={specialClass} />
                </StaggerRevealItem>
              ))}
            </StaggerRevealGroup>

            {showArrows && totalPages > 1 && (
              <div
                className="mt-8 flex justify-center gap-2.5 md:mt-10 md:gap-3"
                aria-hidden
              >
                {Array.from({ length: totalPages }, (_, i) => (
                  <span
                    key={i}
                    className={`h-2.5 w-2.5 rounded-full transition-colors md:h-3 md:w-3 ${
                      i === page ? "bg-white" : "bg-white/35"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {showArrows && (
            <button
              type="button"
              onClick={goNext}
              disabled={!canNext}
              aria-label="Next"
              className="shrink-0 self-center rounded-full p-2 text-white/90 transition enabled:hover:bg-white/15 enabled:hover:text-white disabled:pointer-events-none disabled:opacity-30 md:p-3"
            >
              <FaChevronRight className="h-6 w-6 md:h-8 md:w-8" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
