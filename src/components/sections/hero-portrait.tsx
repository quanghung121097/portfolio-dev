"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

interface HeroPortraitProps {
  name: string;
  role: string;
}

export function HeroPortrait({ name, role }: HeroPortraitProps) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 30]);
  const rotate = useTransform(scrollY, [0, 500], [0, 1.5]);

  return (
    <motion.div
      style={{ y, rotate }}
      initial={{ opacity: 0, scale: 0.98, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", damping: 18, stiffness: 90, delay: 0.5 }}
      className="group relative w-full max-w-[300px] sm:max-w-[340px] lg:max-w-none lg:w-full"
    >
      {/* Offset editorial frame */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-3 -right-3 bottom-8 left-8 border border-accent/25 transition-colors duration-500 group-hover:border-accent/40"
      />

      {/* Accent corner mark */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 right-0 w-8 h-px bg-accent/60"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 right-0 w-px h-8 bg-accent/60"
      />

      {/* Portrait stage */}
      <div className="relative ml-0 lg:ml-6 h-[340px] sm:h-[400px] lg:h-[480px] xl:h-[520px]">
        <div
          aria-hidden
          className="absolute inset-x-4 bottom-0 top-1/4 rounded-full bg-accent/[0.07] blur-[60px] transition-all duration-700 group-hover:bg-accent/[0.11]"
        />

        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent"
        />

        <Image
          src="/hero-section-nobg.png"
          alt={`${name} — ${role}`}
          fill
          priority
          sizes="(max-width: 640px) 300px, (max-width: 1024px) 340px, 420px"
          className="object-contain object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.22)] transition-transform duration-700 ease-out group-hover:scale-[1.015]"
        />
      </div>

      {/* Floating nameplate */}
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="absolute -bottom-2 left-0 lg:-left-4 glass border border-white/8 px-4 py-3"
      >
        <p className="text-sm font-medium tracking-tight text-foreground">{name}</p>
        <p className="section-label mt-1">{role}</p>
      </motion.div>
    </motion.div>
  );
}
