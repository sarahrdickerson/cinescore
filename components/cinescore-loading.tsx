"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

type CineScoreLoadingProps = {
  /** Controls visibility (mount/unmount). If true, shows overlay. */
  isOpen: boolean;
  /** Optional: closes the loader (e.g., when results are ready). */
  onDone?: () => void;
  /** Optional: ms to auto-complete (useful for demo / optimistic transitions). */
  autoCompleteMs?: number;
  /** Optional: show which step you're doing. */
  stageLabels?: string[];
  /** Optional: heading text */
  title?: string;
  /** Optional: subtext under title */
  subtitle?: string;
  /** Optional: override overlay className */
  overlayClassName?: string;
  /** Optional: override card className */
  cardClassName?: string;
};

const DEFAULT_STAGES = [
  "Listening for mood…",
  "Mapping motion…",
  "Finding the right score…",
];

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export default function CineScoreLoading({
  isOpen,
  onDone,
  autoCompleteMs,
  stageLabels = DEFAULT_STAGES,
  title = "Scoring your edit…",
  subtitle = "Calibrating vibe, motion, and inspiration.",
  overlayClassName,
  cardClassName,
}: CineScoreLoadingProps) {
  const [progress, setProgress] = useState(0);
  const [stageIdx, setStageIdx] = useState(0);

  // Softly vary the “wave” pattern so it feels alive.
  const waveSeed = useMemo(
    () => Array.from({ length: 12 }, () => 0.3 + Math.random() * 0.7),
    []
  );

  useEffect(() => {
    if (!isOpen) return;

    let raf = 0;
    const start = performance.now();
    const duration = autoCompleteMs ?? 2400;

    const tick = (t: number) => {
      const elapsed = t - start;
      // Ease-out progress that never feels stuck
      const eased = 1 - Math.pow(1 - clamp(elapsed / duration, 0, 1), 3);
      // Keep it from hitting 100% until we actually close, if no autoCompleteMs:
      const target = autoCompleteMs ? eased : Math.min(eased * 0.92, 0.92);
      setProgress(target);

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isOpen, autoCompleteMs]);

  useEffect(() => {
    if (!isOpen) return;
    const id = window.setInterval(() => {
      setStageIdx((i) => (i + 1) % stageLabels.length);
    }, 900);
    return () => window.clearInterval(id);
  }, [isOpen, stageLabels.length]);

  useEffect(() => {
    if (!isOpen) return;
    if (!autoCompleteMs) return;

    const doneId = window.setTimeout(() => {
      setProgress(1);
      // slight delay so the ring “finishes” before unmount
      window.setTimeout(() => onDone?.(), 220);
    }, autoCompleteMs);

    return () => window.clearTimeout(doneId);
  }, [isOpen, autoCompleteMs, onDone]);

  // Progress ring math
  const R = 22;
  const C = 2 * Math.PI * R;
  const dashOffset = C * (1 - progress);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={cn(
            "fixed inset-0 z-[100] flex items-center justify-center",
            overlayClassName
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-live="polite"
          aria-busy="true"
          role="status"
        >
          {/* Background (tokenized) */}
          <div className="absolute inset-0 bg-primary/30 backdrop-blur-[2px]" />

          {/* Soft spotlight (tokenized) */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute bottom-[-180px] left-[15%] h-[420px] w-[420px] rounded-full bg-primary/8 blur-3xl" />
            <div className="absolute bottom-[-220px] right-[10%] h-[520px] w-[520px] rounded-full bg-primary/6 blur-3xl" />
          </div>

          {/* Vignette + film grain */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.18)_55%,rgba(0,0,0,0.35)_100%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.55)_55%,rgba(0,0,0,0.85)_100%)]" />
            <div
              className="absolute inset-0 opacity-[0.10] mix-blend-overlay dark:opacity-[0.12]"
              style={{
                backgroundImage:
                  "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22300%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22300%22 height=%22300%22 filter=%22url(%23n)%22 opacity=%220.7%22/%3E%3C/svg%3E')",
              }}
            />
          </div>

          {/* Content card */}
          <motion.div
            className={cn(
              "relative mx-4 w-full max-w-md rounded-3xl border border-border/60 bg-card/70 p-6 shadow-2xl backdrop-blur-xl",
              cardClassName
            )}
            initial={{ y: 10, scale: 0.985, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 10, scale: 0.985, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
          >
            {/* Top row: ring + title */}
            <div className="flex items-start gap-4">
              <div className="relative mt-0.5 h-14 w-14">
                <svg
                  className="h-14 w-14 -rotate-90"
                  viewBox="0 0 52 52"
                  fill="none"
                >
                  {/* Track */}
                  <circle
                    cx="26"
                    cy="26"
                    r={R}
                    stroke="hsl(var(--border))"
                    strokeOpacity={0.9}
                    strokeWidth="4"
                  />
                  {/* Progress */}
                  <motion.circle
                    cx="26"
                    cy="26"
                    r={R}
                    stroke="hsl(var(--foreground))"
                    strokeOpacity={0.9}
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray={C}
                    strokeDashoffset={dashOffset}
                    initial={false}
                    animate={{ strokeDashoffset: dashOffset }}
                    transition={{ ease: "easeOut", duration: 0.18 }}
                  />
                </svg>

                {/* Center dot pulse */}
                <motion.div className="absolute inset-0 grid place-items-center">
                  <motion.div
                    className="h-2.5 w-2.5 rounded-full bg-foreground/90"
                    animate={{ scale: [1, 1.35, 1] }}
                    transition={{
                      duration: 1.1,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>
              </div>

              <div className="min-w-0">
                <h2 className="text-lg font-semibold tracking-tight text-foreground">
                  {title}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
              </div>
            </div>

            {/* Waveform */}
            <div className="mt-6">
              <div className="flex items-end justify-between gap-1.5 rounded-2xl border border-border/60 bg-muted/30 px-4 py-4">
                {waveSeed.map((seed, i) => (
                  <motion.div
                    key={i}
                    className="w-2 rounded-full bg-foreground/80"
                    initial={false}
                    animate={{
                      height: [10 + seed * 10, 26 + seed * 16, 12 + seed * 10],
                      opacity: [0.55, 0.95, 0.65],
                    }}
                    transition={{
                      duration: 0.9 + seed * 0.35,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.03,
                    }}
                  />
                ))}
              </div>

              {/* Rotating loading text */}
              <div className="mt-4 flex items-center justify-between">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={stageIdx}
                    className="text-sm text-muted-foreground"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    {stageLabels[stageIdx]}
                  </motion.p>
                </AnimatePresence>

                <p className="text-xs tabular-nums text-muted-foreground">
                  {Math.round(progress * 100)}%
                </p>
              </div>
            </div>

            {/* Bottom loading line */}
            <div className="pointer-events-none mt-6 h-px w-full overflow-hidden rounded-full bg-border/70">
              <motion.div
                className="h-px w-1/3 bg-foreground/60"
                initial={{ x: "-120%" }}
                animate={{ x: "340%" }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
