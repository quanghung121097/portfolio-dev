"use client";

import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import { Download } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";

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
    <div className="overflow-hidden">
      <motion.div
        initial={{ y: "105%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay, ease }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function HeroSection() {
  const t = useTranslations("hero");

  const { scrollY } = useScroll();
  const titleY = useTransform(scrollY, [0, 700], [0, -100]);
  const metaOpacity = useTransform(scrollY, [0, 350], [1, 0]);

  const metrics = [
    { value: t("metrics.experience.value"), label: t("metrics.experience.label") },
    { value: t("metrics.projects.value"), label: t("metrics.projects.label") },
    { value: t("metrics.companies.value"), label: t("metrics.companies.label") },
  ];

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* ── Top meta bar ── */}
      <motion.div
        style={{ opacity: metaOpacity }}
        className="pt-28 pb-0 px-4 sm:px-6 lg:px-8 container-max w-full"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="editorial-rule"
        />
        <div className="flex items-center justify-between py-4">
          <span className="section-label">{t("greeting")}</span>
          <span className="section-label">{siteConfig.contact.location} · 2026</span>
        </div>
      </motion.div>

      {/* ── Main editorial headline ── */}
      <motion.div
        style={{ y: titleY }}
        className="flex-1 flex items-center px-4 sm:px-6 lg:px-8 container-max w-full py-8 md:py-0"
      >
        <div className="w-full flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 lg:gap-16">
          {/* Headline block */}
          <div className="flex-1">
            <h1 className="editorial-display">
              <HeroLine delay={0.3}>Building</HeroLine>
              <HeroLine delay={0.42}>Scalable</HeroLine>
              <HeroLine delay={0.54}>
                <span className="italic font-light text-muted-foreground">Digital</span>
              </HeroLine>
              <HeroLine delay={0.66}>Products.</HeroLine>
            </h1>
          </div>

          {/* Metrics column */}
          <div className="lg:pb-3 flex flex-row lg:flex-col gap-8 lg:gap-7 lg:text-right">
            {metrics.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.9 + i * 0.1, ease }}
              >
                <p className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                  {m.value}
                </p>
                <p className="section-label mt-1">{m.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Bottom section: subheadline + CTAs ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.1, ease }}
        className="px-4 sm:px-6 lg:px-8 container-max w-full pb-10 md:pb-14"
      >
        <div className="editorial-rule mb-7" />
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          {/* Subheadline */}
          <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
            {t("subheadline")}
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <Link
              href="/projects"
              className="text-xs tracking-[0.12em] uppercase border border-white/15 px-5 py-2.5 text-foreground hover:bg-white/5 transition-all duration-300"
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
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent"
        />
      </motion.div>
    </section>
  );
}
