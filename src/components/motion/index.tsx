"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  type Variants,
} from "framer-motion";
import { useEffect, useRef } from "react";

/* ─── AnimatedCounter ─── */

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  className?: string;
}

export function AnimatedCounter({
  value,
  suffix = "",
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 2000, bounce: 0 });
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [isInView, motionValue, value]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toString();
      }
    });
    return unsubscribe;
  }, [springValue]);

  return (
    <span className={className}>
      <span ref={ref}>0</span>
      {suffix}
    </span>
  );
}

/* ─── FadeIn ─── */

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
}

export function FadeIn({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 0.7,
}: FadeInProps) {
  const offsets = {
    up: { y: 28, x: 0 },
    down: { y: -28, x: 0 },
    left: { y: 0, x: 28 },
    right: { y: 0, x: -28 },
    none: { y: 0, x: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...offsets[direction] }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── StaggerContainer ─── */

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.08,
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/* ─── SectionHeader — Editorial style ─── */

interface SectionHeaderProps {
  index?: string;
  headline: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  index,
  headline,
  subtitle,
  className,
  align = "left",
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <FadeIn className={className}>
      <div className={`mb-14 ${isCenter ? "text-center max-w-2xl mx-auto" : ""}`}>
        {index && (
          <p className="section-label mb-4">{index} — {headline.split(" ")[0]}</p>
        )}
        <div className="editorial-rule mb-8" />
        <h2
          className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.05] ${
            isCenter ? "" : "max-w-2xl"
          }`}
        >
          {headline}
        </h2>
        {subtitle && (
          <p
            className={`mt-4 text-muted-foreground leading-relaxed ${
              isCenter ? "text-base" : "text-sm max-w-xl mt-3"
            }`}
          >
            {subtitle}
          </p>
        )}
      </div>
    </FadeIn>
  );
}

/* ─── ScrollLine — animated thin rule ─── */

export function ScrollLine({ className }: { className?: string }) {
  return (
    <motion.div
      initial={{ scaleX: 0, originX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className={`h-px bg-border ${className ?? ""}`}
    />
  );
}
