"use client";

import { useEffect, useSyncExternalStore } from "react";
import { AnimatePresence, MotionConfig, motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { siteConfig } from "@/config/site";
import { contactInfo } from "@/config/contact";
import { launchDate } from "@/config/launch";

// Stands in for the real homepage at "/" while COMING_SOON is active — see
// src/proxy.ts for the gate that keeps every other route redirected here.

const EASE = [0.22, 1, 0.36, 1] as const;

// Gold foil gradient, animated by sliding background-position across it.
const GOLD =
  "linear-gradient(110deg, #8a6a3a 0%, #d9b877 22%, #fff3d6 32%, #b08d57 45%, #f4dca6 60%, #8a6a3a 75%, #e8cc90 90%, #8a6a3a 100%)";

// The four-point sparkle from the logo, reused for the twinkling stars.
const SPARKLE_PATH = "M12 0C13 7 17 11 24 12C17 13 13 17 12 24C11 17 7 13 0 12C7 11 11 7 12 0Z";

// Deterministic pseudo-random so server and client render the same stars.
function seeded(i: number) {
  const x = Math.sin(i * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}
const round = (n: number) => Math.round(n * 100) / 100;

const STARS = Array.from({ length: 28 }, (_, i) => ({
  left: round(seeded(i) * 100),
  top: round(seeded(i + 100) * 100),
  size: round(6 + seeded(i + 200) * 14),
  delay: round(seeded(i + 300) * 6),
  duration: round(2.5 + seeded(i + 400) * 3.5),
}));

const DUST = Array.from({ length: 40 }, (_, i) => ({
  left: round(seeded(i + 500) * 100),
  size: round(1 + seeded(i + 600) * 2.5),
  delay: round(seeded(i + 700) * 12),
  duration: round(10 + seeded(i + 800) * 14),
  drift: round((seeded(i + 900) - 0.5) * 80),
}));

function Sparkle({ size, className }: { size: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden>
      <path d={SPARKLE_PATH} fill="currentColor" />
    </svg>
  );
}

// A transparent PNG used as a mask over the moving gold gradient, so the
// logo itself looks like polished, light-catching gold foil.
function GoldMask({ src, className }: { src: string; className?: string }) {
  return (
    <motion.div
      className={className}
      style={{
        backgroundImage: GOLD,
        backgroundSize: "250% 100%",
        WebkitMaskImage: `url("${src}")`,
        maskImage: `url("${src}")`,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
      animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

const LAUNCH_AT = new Date(launchDate).getTime();
const COUNTDOWN_UNITS = [
  { label: "Days", ms: 86_400_000, mod: Infinity },
  { label: "Hours", ms: 3_600_000, mod: 24 },
  { label: "Minutes", ms: 60_000, mod: 60 },
  { label: "Seconds", ms: 1_000, mod: 60 },
];

// A once-a-second clock; snapshots are whole seconds so they stay stable
// between ticks, and the server snapshot is null.
function subscribeClock(onTick: () => void) {
  const id = setInterval(onTick, 1000);
  return () => clearInterval(id);
}
const getClockSecond = () => Math.floor(Date.now() / 1000);
const getServerClock = () => null;

// Ticks down to launchDate and holds at zero once it passes. Renders "--"
// until mounted so the server HTML never disagrees with the client clock.
function Countdown() {
  const nowSec = useSyncExternalStore(subscribeClock, getClockSecond, getServerClock);
  const remaining = nowSec === null ? null : Math.max(0, LAUNCH_AT - nowSec * 1000);

  return (
    <div className="flex items-start justify-center gap-2 sm:gap-4">
      {COUNTDOWN_UNITS.map((unit, i) => {
        const value =
          remaining === null
            ? "--"
            : String(Math.floor(remaining / unit.ms) % unit.mod).padStart(2, "0");
        return (
          <div key={unit.label} className="flex items-start gap-2 sm:gap-4">
            {i > 0 && (
              <motion.span
                className="mt-3 font-serif text-2xl text-[#d9b877]/60 sm:mt-4 sm:text-3xl"
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
              >
                :
              </motion.span>
            )}
            <div className="flex flex-col items-center">
              <div className="relative flex h-16 w-14 items-center justify-center overflow-hidden rounded-xl border border-[#d9b877]/25 bg-gradient-to-b from-white/[0.07] to-white/[0.01] shadow-[0_0_30px_rgba(176,141,87,0.12),inset_0_1px_0_rgba(255,243,214,0.15)] backdrop-blur-sm sm:h-20 sm:w-20">
                <span className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-black/30" />
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={value}
                    className="font-serif text-3xl tabular-nums text-transparent sm:text-4xl"
                    style={{ backgroundImage: GOLD, backgroundSize: "250% 100%", WebkitBackgroundClip: "text", backgroundClip: "text" }}
                    initial={{ y: "-100%", opacity: 0, filter: "blur(4px)" }}
                    animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: "100%", opacity: 0, filter: "blur(4px)" }}
                    transition={{ duration: 0.45, ease: EASE }}
                  >
                    {value}
                  </motion.span>
                </AnimatePresence>
              </div>
              <span className="mt-2 text-[9px] font-semibold uppercase tracking-[0.3em] text-moonlight/50 sm:text-[10px]">
                {unit.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function ComingSoon() {
  // Cursor-driven parallax for the emblem and the spotlight.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-12, 12]);
  const glowX = useTransform(sx, [-0.5, 0.5], ["30%", "70%"]);
  const glowY = useTransform(sy, [-0.5, 0.5], ["30%", "70%"]);
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${glowX} ${glowY}, rgba(176,141,87,0.14), transparent 60%)`;

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  const taglineWords = siteConfig.tagline.split(" ");

  return (
    <MotionConfig reducedMotion="user">
      <main className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-[#0d0405] px-6 py-16 text-center text-moonlight">
        {/* --- Backdrop --- */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,#3a0507_0%,#160405_55%,#070203_100%)]" />

        <motion.div
          className="pointer-events-none absolute -left-1/4 -top-1/4 h-[70vmax] w-[70vmax] rounded-full bg-maroon/40 blur-[120px]"
          animate={{ x: [0, 120, -40, 0], y: [0, 80, 140, 0], scale: [1, 1.15, 0.95, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="pointer-events-none absolute -bottom-1/3 -right-1/4 h-[60vmax] w-[60vmax] rounded-full bg-cherry/30 blur-[120px]"
          animate={{ x: [0, -100, 30, 0], y: [0, -120, -40, 0], scale: [1, 0.9, 1.1, 1] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[45vmax] w-[45vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/15 blur-[110px]"
          animate={{ opacity: [0.5, 1, 0.5], scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Spotlight that trails the cursor */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{ background: spotlight }}
        />

        {/* Diagonal light sweep */}
        <motion.div
          className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 rotate-12 bg-gradient-to-r from-transparent via-[#f4dca6]/10 to-transparent blur-2xl"
          animate={{ x: ["0vw", "220vw"] }}
          transition={{ duration: 9, repeat: Infinity, repeatDelay: 4, ease: "easeInOut", delay: 2.5 }}
        />

        {/* Rising gold dust */}
        {DUST.map((d, i) => (
          <motion.span
            key={`d${i}`}
            className="pointer-events-none absolute bottom-[-10px] rounded-full bg-[#f4dca6]"
            style={{ left: `${d.left}%`, width: d.size, height: d.size, boxShadow: "0 0 6px #d9b877" }}
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: "-110vh", x: d.drift, opacity: [0, 0.9, 0.9, 0] }}
            transition={{ duration: d.duration, delay: d.delay, repeat: Infinity, ease: "linear" }}
          />
        ))}

        {/* Twinkling sparkles */}
        {STARS.map((s, i) => (
          <motion.div
            key={`s${i}`}
            className="pointer-events-none absolute text-[#f4dca6]"
            style={{ left: `${s.left}%`, top: `${s.top}%`, filter: "drop-shadow(0 0 6px rgba(244,220,166,0.8))" }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], rotate: [0, 90] }}
            transition={{ duration: s.duration, delay: 1.5 + s.delay, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkle size={s.size} />
          </motion.div>
        ))}

        {/* Grain + vignette */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:3px_3px]" />
        <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_200px_rgba(0,0,0,0.9)]" />

        {/* --- Content --- */}
        <div className="relative z-10 flex flex-col items-center [perspective:1000px]">
          {/* Emblem */}
          <motion.div
            className="relative flex h-44 w-44 items-center justify-center sm:h-56 sm:w-56"
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            initial={{ opacity: 0, scale: 0.4, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.6, ease: EASE }}
          >
            {/* Outer ring */}
            <motion.div
              className="absolute inset-0 rounded-full border border-[#d9b877]/30"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, rotate: 360 }}
              transition={{
                scale: { duration: 1.4, delay: 0.4, ease: EASE },
                opacity: { duration: 1.4, delay: 0.4 },
                rotate: { duration: 40, repeat: Infinity, ease: "linear" },
              }}
            >
              <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[#f4dca6] shadow-[0_0_12px_4px_rgba(244,220,166,0.7)]" />
            </motion.div>

            {/* Conic shimmer ring */}
            <motion.div
              className="absolute inset-3 rounded-full p-px"
              style={{
                background: "conic-gradient(from 0deg, transparent 0%, #f4dca6 12%, transparent 30%, transparent 55%, #b08d57 70%, transparent 85%)",
                WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 1.5px), #000 calc(100% - 1px))",
                mask: "radial-gradient(farthest-side, transparent calc(100% - 1.5px), #000 calc(100% - 1px))",
              }}
              animate={{ rotate: -360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            />

            {/* Dashed inner ring */}
            <motion.div
              className="absolute inset-7 rounded-full border border-dashed border-[#d9b877]/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            />

            {/* Pulse waves */}
            {[0, 1.3, 2.6].map((delay) => (
              <motion.div
                key={delay}
                className="absolute inset-8 rounded-full border border-[#d9b877]/40"
                initial={{ scale: 1, opacity: 0 }}
                animate={{ scale: [1, 1.9], opacity: [0.6, 0] }}
                transition={{ duration: 3.9, delay: 2 + delay, repeat: Infinity, ease: "easeOut" }}
              />
            ))}

            <GoldMask
              src="/logo/logo.png"
              className="relative h-24 w-24 drop-shadow-[0_0_25px_rgba(217,184,119,0.45)] sm:h-28 sm:w-28"
            />

            {/* Star flare on the logo's sparkle */}
            <motion.div
              className="absolute text-white"
              style={{ left: "58%", top: "48%", filter: "drop-shadow(0 0 10px #fff3d6)" }}
              initial={{ opacity: 0, scale: 0, rotate: -90 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1.6, 0], rotate: [-90, 0, 45] }}
              transition={{ duration: 1.4, delay: 1.4, repeat: Infinity, repeatDelay: 4.5, ease: "easeOut" }}
            >
              <Sparkle size={22} />
            </motion.div>
          </motion.div>

          {/* Wordmark reveal */}
          <motion.div
            className="mt-10 w-[min(78vw,420px)]"
            initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
            animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
            transition={{ duration: 1.6, delay: 1.1, ease: EASE }}
          >
            <GoldMask src="/logo/Secondary%20Logo-04%20(1).png" className="aspect-[3020/515] w-full" />
          </motion.div>

          {/* Launching soon eyebrow */}
          <motion.div
            className="mt-10 flex items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2 }}
          >
            <motion.span
              className="h-px w-10 origin-right bg-gradient-to-r from-transparent to-[#d9b877] sm:w-16"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 2.1, ease: EASE }}
            />
            <motion.p
              className="text-[11px] font-semibold uppercase tracking-[0.5em] text-[#e8cc90] sm:text-xs"
              animate={{ opacity: [1, 0.55, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            >
              Launching Soon
            </motion.p>
            <motion.span
              className="h-px w-10 origin-left bg-gradient-to-l from-transparent to-[#d9b877] sm:w-16"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 2.1, ease: EASE }}
            />
          </motion.div>

          {/* Tagline, word by word */}
          <h1 className="mt-6 max-w-2xl font-serif text-4xl leading-tight tracking-tight text-moonlight sm:text-5xl lg:text-6xl">
            {taglineWords.map((word, i) => (
              <motion.span
                key={i}
                className="mr-[0.25em] inline-block last:mr-0"
                initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.9, delay: 2.4 + i * 0.12, ease: EASE }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            className="mt-6 max-w-md text-sm font-light leading-relaxed text-moonlight/60 sm:text-base"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 3.1, ease: EASE }}
          >
            Something precious is being crafted. A new collection of contemporary silver jewellery is almost
            ready to be unveiled.
          </motion.p>

          {/* Countdown */}
          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 3.4, ease: EASE }}
          >
            <Countdown />
          </motion.div>

          {/* CTA */}
          <motion.a
            href={`mailto:${contactInfo.email}`}
            className="group relative mt-10 inline-flex items-center gap-3 overflow-hidden rounded-full border border-[#d9b877]/50 bg-white/[0.03] px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#f4dca6] backdrop-blur-sm transition-colors hover:border-[#f4dca6] hover:bg-[#d9b877]/10 sm:text-xs"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 3.9, ease: EASE }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <motion.span
              className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent"
              animate={{ x: ["0%", "400%"] }}
              transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 2.5, ease: "easeInOut", delay: 4.5 }}
            />
            <Sparkle size={12} className="transition-transform duration-500 group-hover:rotate-90" />
            <span className="relative normal-case tracking-[0.15em]">{contactInfo.email}</span>
          </motion.a>
        </div>

        <motion.p
          className="relative z-10 mt-16 text-[11px] tracking-wider text-moonlight/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 4.4 }}
        >
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </motion.p>
      </main>
    </MotionConfig>
  );
}
