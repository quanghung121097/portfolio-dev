"use client";

import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion";
import { MagneticButton } from "@/components/motion/interactions";

export function HeroSection() {
  const t = useTranslations("hero");
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const metrics = ["experience", "projects", "companies"] as const;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[#09090B]" />
        <motion.div style={{ y }} className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-indigo-600/20 blur-[120px] animate-gradient" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-violet-600/15 blur-[100px] animate-gradient" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[140px]" />
        </motion.div>
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <motion.div style={{ opacity }} className="container-max section-padding pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn delay={0.1}>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-muted-foreground mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
              </span>
              {t("greeting")}
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
              <span className="gradient-text">{t("headline")}</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10">
              {t("subheadline")}
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="flex flex-wrap items-center justify-center gap-8 mb-12">
              {metrics.map((key) => (
                <div key={key} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-foreground">
                    {t(`metrics.${key}.value`)}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {t(`metrics.${key}.label`)}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.5}>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <MagneticButton>
                <Button asChild size="lg">
                  <Link href="/projects">{t("cta.viewProjects")}</Link>
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button asChild variant="outline" size="lg">
                  <a
                    href={siteConfig.resumePath}
                    download={siteConfig.resumeFileName}
                  >
                    <Download className="size-4" />
                    {t("cta.downloadResume")}
                  </a>
                </Button>
              </MagneticButton>
            </div>
          </FadeIn>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown className="size-5 text-muted-foreground" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
