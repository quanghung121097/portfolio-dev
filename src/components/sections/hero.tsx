"use client";

import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import { Download } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";
import { HeroPortrait } from "@/components/sections/hero-portrait";

const ease = [0.16, 1, 0.3, 1] as const;

function HeroLine({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay, ease }}
        className={`block ${className}`}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function HeroSection() {
  const t = useTranslations("hero");

  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 600], [0, -40]);
  const metaOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  const metrics = [
    { value: t("metrics.experience.value"), label: t("metrics.experience.label") },
    { value: t("metrics.projects.value"), label: t("metrics.projects.label") },
    { value: t("metrics.companies.value"), label: t("metrics.companies.label") },
  ];

  const headlineLines = t.raw("headlineLines") as Array<{
    text: string;
    emphasis: boolean;
  }>;

  const lineDelays = [0.2, 0.32, 0.44, 0.56];

  return (
    <section className="relative min-h-[92vh] lg:min-h-screen overflow-hidden">
      {/* Ambient glow behind portrait */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 top-1/4 w-[min(50vw,480px)] h-[min(65vh,600px)] rounded-full bg-accent/[0.05] blur-[90px]"
      />

      <div className="container-max relative z-10 flex flex-col min-h-[92vh] lg:min-h-screen px-4 sm:px-6 lg:px-8">
        {/* Meta bar */}
        <motion.div
          style={{ opacity: metaOpacity }}
          className="pt-28 pb-2 w-full"
        >
          <div className="editorial-rule" />
          <div className="flex items-center justify-between py-4">
            <span className="section-label">{t("greeting")}</span>
            <span className="section-label">{siteConfig.contact.location} · 2026</span>
          </div>
        </motion.div>

        {/* Main composition */}
        <div className="flex-1 grid lg:grid-cols-12 gap-10 lg:gap-6 items-center py-8 lg:py-12">
          {/* Portrait — first on mobile, right on desktop */}
          <div className="lg:col-span-5 lg:col-start-8 order-1 lg:order-2 flex justify-center lg:justify-end lg:pr-4">
            <HeroPortrait name={siteConfig.name} role={t("greeting")} />
          </div>

          {/* Copy block */}
          <motion.div
            style={{ y: contentY }}
            className="lg:col-span-6 lg:col-start-1 lg:row-start-1 order-2 lg:order-1"
          >
            <h1 className="hero-display">
              {headlineLines.map((line, index) => (
                <HeroLine
                  key={line.text}
                  delay={lineDelays[index] ?? 0.2 + index * 0.1}
                >
                  {line.emphasis ? (
                    <span className="italic font-normal text-muted-foreground">
                      {line.text}
                    </span>
                  ) : (
                    line.text
                  )}
                </HeroLine>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7, ease }}
              className="mt-5 text-sm md:text-[0.9375rem] text-muted-foreground max-w-md leading-relaxed"
            >
              {t("subheadline")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.85, ease }}
              className="mt-7 flex flex-wrap items-center gap-4"
            >
              <Link
                href="/projects"
                className="text-xs tracking-[0.12em] uppercase border border-white/15 px-5 py-2.5 text-foreground hover:bg-white/5 hover:border-white/25 transition-all duration-300"
              >
                {t("cta.viewProjects")} ↗
              </Link>
              <a
                href={siteConfig.resumePath}
                download={siteConfig.resumeFileName}
                className="flex items-center gap-2 text-xs tracking-[0.12em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                <Download className="size-3" />
                {t("cta.downloadResume")}
              </a>
            </motion.div>

            {/* Metrics — compact horizontal strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 1, ease }}
              className="mt-10 pt-6 border-t border-white/6 flex flex-wrap gap-x-10 gap-y-4"
            >
              {metrics.map((m) => (
                <div key={m.label}>
                  <p className="text-xl md:text-2xl font-semibold tracking-tight text-foreground">
                    {m.value}
                  </p>
                  <p className="section-label mt-1">{m.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="pb-8 flex justify-center lg:justify-start"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-6 bg-gradient-to-b from-white/25 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
