"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { AnimatedCounter, SectionHeader, StaggerContainer, staggerItem } from "@/components/motion";

const statKeys = ["experience", "products", "companies", "technologies"] as const;

export function StatisticsSection() {
  const t = useTranslations("statistics");

  return (
    <section className="section-padding bg-card/30 border-y border-white/5">
      <div className="container-max">
        <SectionHeader headline={t("headline")} subtitle={t("subtitle")} />

        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {statKeys.map((key) => {
            const value = t.raw(`items.${key}.value`) as number;
            const suffix = t(`items.${key}.suffix`);

            return (
              <motion.div
                key={key}
                variants={staggerItem}
                className="text-center rounded-2xl border border-white/8 bg-card p-8 transition-all hover:border-indigo-500/30 hover:glow"
              >
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                  <AnimatedCounter value={value} suffix={suffix} />
                </div>
                <p className="text-sm text-muted-foreground">
                  {t(`items.${key}.label`)}
                </p>
              </motion.div>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
