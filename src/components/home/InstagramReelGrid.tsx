"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { Play, X } from "lucide-react";
import { InstagramIcon } from "@/components/icons/Icons";
import { socialLinks } from "@/config/site";
import { cn } from "@/utils/cn";

export interface Reel {
  id: string;
  title: string;
  caption: string;
  uploadDate: string;
  // Full-quality file, played with sound in the lightbox.
  src: string;
  // 540px-wide rendition for the muted card previews.
  previewSrc: string;
  poster: string;
}

// Muted preview that only plays while its card is on screen, so four reels
// don't all download and decode at once. Reduced-motion visitors get the
// poster frame instead; `paused` holds it while the lightbox is playing.
// The story-style bar is updated straight from timeupdate (no re-render).
function ReelPreview({ reel, paused }: { reel: Reel; paused: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (inView && !reduceMotion && !paused) video.play().catch(() => {});
    else video.pause();
  }, [inView, reduceMotion, paused]);

  function updateProgress() {
    const video = ref.current;
    if (!video || !barRef.current || !video.duration) return;
    barRef.current.style.transform = `scaleX(${video.currentTime / video.duration})`;
  }

  return (
    <>
      <video
        ref={ref}
        src={reel.previewSrc}
        poster={reel.poster}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        onTimeUpdate={updateProgress}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
      />
      <span aria-hidden="true" className="absolute inset-x-4 top-3 h-[3px] overflow-hidden rounded-full bg-white/25">
        <span
          ref={barRef}
          className="block h-full origin-left scale-x-0 rounded-full bg-white transition-transform duration-300 ease-linear"
        />
      </span>
    </>
  );
}

// Card with a gentle 3D tilt toward a mouse pointer (never on touch, never
// for reduced motion) and a glowing gold ring on hover.
function ReelCard({ reel, paused, onOpen }: { reel: Reel; paused: boolean; onOpen: () => void }) {
  const reduceMotion = useReducedMotion();
  const rotateX = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });

  function tilt(event: PointerEvent<HTMLButtonElement>) {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    rotateY.set(((event.clientX - rect.left) / rect.width - 0.5) * 12);
    rotateX.set(-((event.clientY - rect.top) / rect.height - 0.5) * 12);
  }

  function resetTilt() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <div className="[perspective:1200px]">
      <motion.button
        type="button"
        onClick={onOpen}
        onPointerMove={tilt}
        onPointerLeave={resetTilt}
        style={{ rotateX, rotateY }}
        aria-label={`Play reel: ${reel.title}`}
        className="group relative block aspect-[9/16] w-full rounded-[1.75rem] bg-gradient-to-br from-white/15 via-white/5 to-white/10 p-[1.5px] text-left shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)] transition-[background,box-shadow] duration-500 hover:from-gold hover:via-cherry hover:to-gold hover:shadow-[0_40px_80px_-30px_rgba(176,141,87,0.55)] focus-visible:outline-none focus-visible:from-gold focus-visible:to-gold"
      >
        <span className="relative block h-full w-full overflow-hidden rounded-[calc(1.75rem-1.5px)] bg-black/40">
          <ReelPreview reel={reel} paused={paused} />

          <span
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/5 to-black/40"
          />

          <span className="absolute left-4 top-7 inline-flex items-center gap-1.5 rounded-full bg-black/30 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white backdrop-blur-sm">
            <InstagramIcon className="h-3.5 w-3.5" />
            Reel
          </span>

          <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 scale-75 items-center justify-center rounded-full bg-white/20 text-white opacity-0 ring-1 ring-white/50 backdrop-blur-md transition-all duration-500 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100">
            <span className="absolute inset-0 animate-ping rounded-full bg-white/20 [animation-duration:2s]" />
            <Play className="relative ml-1 h-6 w-6 fill-current" aria-hidden />
          </span>

          <span className="absolute inset-x-0 bottom-0 translate-y-2 p-5 transition-transform duration-500 group-hover:translate-y-0">
            <span className="block font-serif text-xl leading-tight text-white lg:text-2xl">{reel.title}</span>
            <span className="mt-1 line-clamp-2 block text-xs leading-relaxed text-white/75 transition-opacity duration-500 lg:opacity-0 lg:group-hover:opacity-100">
              {reel.caption}
            </span>
          </span>
        </span>
      </motion.button>
    </div>
  );
}

function ReelLightbox({ reel, onClose }: { reel: Reel | null; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!reel) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [reel, onClose]);

  return (
    <AnimatePresence>
      {reel && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/90 p-4 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={reel.title}
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
            className="relative aspect-[9/16] h-[min(85dvh,calc((100vw-2rem)*16/9))] overflow-hidden rounded-3xl bg-black shadow-2xl"
          >
            <video
              key={reel.src}
              src={reel.src}
              poster={reel.poster}
              controls
              autoPlay
              playsInline
              className="h-full w-full object-contain"
            />
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close video"
              className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full bg-black/50 px-3 py-2 text-xs font-medium text-white backdrop-blur-sm transition-colors hover:bg-black/70"
            >
              <InstagramIcon className="h-4 w-4" />
              @vylore.in
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function InstagramReelGrid({ reels }: { reels: Reel[] }) {
  const [active, setActive] = useState<Reel | null>(null);
  const close = useCallback(() => setActive(null), []);

  return (
    <>
      {/* Phones/tablets: a swipeable row. Desktop: four columns, the even
          ones dropped lower for a staggered editorial rhythm. */}
      <ul className="no-scrollbar -mx-4 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-4">
        {reels.map((reel, index) => (
          <motion.li
            key={reel.id}
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "w-[64%] shrink-0 snap-center sm:w-[40%] lg:w-auto",
              index % 2 === 1 && "lg:mt-16",
            )}
          >
            <ReelCard reel={reel} paused={active !== null} onOpen={() => setActive(reel)} />
          </motion.li>
        ))}
      </ul>

      <ReelLightbox reel={active} onClose={close} />
    </>
  );
}
