"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  animate,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  value?: number; // 0..1 (controlled)
  defaultValue?: number; // 0..1 (uncontrolled initial)
  onChange?: (v: number) => void;
  tickCount?: number;
  majorTickEvery?: number;
  className?: string;
  trackClassName?: string;
  thumbClassName?: string;
  ariaLabel?: string;
  min?: number;
  max?: number;
};

export function MotionScrollbar({
  value,
  defaultValue = 0,
  onChange,
  tickCount = 64,
  majorTickEvery = 8,
  className,
  trackClassName,
  thumbClassName,
  ariaLabel = "Scrollbar",
  min = 0,
  max = 100,
}: Props) {
  const isControlled = typeof value === "number";
  const [internal, setInternal] = React.useState(defaultValue);
  const progress = isControlled ? (value as number) : internal; // 0..1

  // Refs
  const railRef = React.useRef<HTMLDivElement | null>(null);
  const thumbRef = React.useRef<HTMLDivElement | null>(null);

  // Sizes (only what we need)
  const [sizes, setSizes] = React.useState({ railW: 0, thumbW: 0 });

  // Motion
  const x = useMotionValue(0);
  const [dragging, setDragging] = React.useState(false);

  // --- 1) Measure once, keep up-to-date via RO (no manual DOM reads elsewhere)
  React.useLayoutEffect(() => {
    const ro = new ResizeObserver(() => {
      const railW = railRef.current?.clientWidth ?? 0;
      const thumbW = thumbRef.current?.clientWidth ?? 0;
      setSizes({ railW, thumbW });
    });
    if (railRef.current) ro.observe(railRef.current);
    if (thumbRef.current) ro.observe(thumbRef.current);
    return () => ro.disconnect();
  }, []);

  // Derived maxX
  const maxX = Math.max(0, sizes.railW - sizes.thumbW);

  // --- 2) Drive the thumb when progress changes (controlled or internal)
  React.useEffect(() => {
    if (!maxX || dragging) return;
    const target = clamp(progress, 0, 1) * maxX;
    animate(x, target, { type: "spring", stiffness: 340, damping: 28 });
  }, [progress, maxX, x, dragging]);

  // --- 3) When the thumb’s x changes (usually due to drag), map back to progress
  useMotionValueEvent(x, "change", (currX) => {
    if (!dragging || !maxX) return;
    const p = clamp(currX / (maxX || 1), 0, 1);
    if (isControlled) {
      onChange?.(p);
    } else {
      setInternal(p);
      onChange?.(p);
    }
  });

  // --- 4) Click on the track to jump
  function onTrackPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    // Ignore if clicking the thumb (so drag takes over)
    if (thumbRef.current && thumbRef.current.contains(e.target as Node)) return;

    if (!railRef.current) return;
    const rect = railRef.current.getBoundingClientRect();
    // Center the thumb around click
    const nextX = clamp(e.clientX - rect.left - sizes.thumbW / 2, 0, maxX);
    const nextP = clamp(nextX / (maxX || 1), 0, 1);
    commit(nextP);
  }

  // --- 5) Keyboard support
  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const step = 0.02;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      commit(clamp(progress + step, 0, 1));
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      commit(clamp(progress - step, 0, 1));
    } else if (e.key === "Home") {
      e.preventDefault();
      commit(0);
    } else if (e.key === "End") {
      e.preventDefault();
      commit(1);
    }
  }

  // Single place to write progress (keeps controlled/uncontrolled tidy)
  function commit(p: number) {
    if (isControlled) {
      onChange?.(p);
    } else {
      setInternal(p);
      onChange?.(p);
    }
  }

  // Render ticks (pure calculation, no effect)
  const ticks = React.useMemo(
    () => Array.from({ length: tickCount }, (_, i) => i),
    [tickCount],
  );

  return (
    <div className={cn("w-full", className)}>
      <div
        role="slider"
        aria-label={ariaLabel}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={Math.round(progress * (max - min) + min)}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onTrackPointerDown}
        className={cn(
          "relative h-full rounded-xl bg-foreground/5 backdrop-blur border border-foreground/10",
          "px-4 flex items-center select-none touch-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/50",
          trackClassName,
        )}
      >
        {/* Rail */}
        <div ref={railRef} className="relative w-full h-10">
          {/* Ticks */}
          {sizes.railW > 0 &&
            ticks.map((i) => {
              const left = (i / (tickCount - 1)) * 100;
              const isMajor = i % majorTickEvery === 0 || i === tickCount - 1;
              const h = isMajor ? "h-5" : "h-3";
              const opacity = isMajor ? "opacity-100" : "opacity-50";
              return (
                <div
                  key={i}
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none absolute top-1/2 -translate-y-1/2 w-px",
                    h,
                    opacity,
                    "bg-foreground last:bg-foreground/50",
                  )}
                  style={{ left: `${left}%` }}
                />
              );
            })}

          {/* (Optional) glow following the thumb */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-24 h-8 rounded-full"
            style={{ left: x }}
          />

          {/* Thumb */}
          <motion.div
            ref={thumbRef}
            className={cn(
              "absolute top-1/2 -translate-y-1/2",
              "h-6 w-2 rounded-full bg-red-500 shadow-[0_0_0_2px_var(--color-secondary)]",
              "cursor-grab active:cursor-grabbing will-change-transform select-none touch-none",
              thumbClassName,
            )}
            drag="x"
            dragDirectionLock
            dragMomentum={false}
            dragElastic={0}
            // Constrain to the rail without manually computing bounds
            dragConstraints={railRef}
            onDragStart={() => setDragging(true)}
            onDragEnd={() => setDragging(false)}
            style={{ x }}
          >
            <div className="absolute inset-0 rounded-full bg-foreground/10" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max);
}
