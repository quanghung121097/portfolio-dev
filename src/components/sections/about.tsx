"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { GraduationCap, Code, Layers, Rocket, Target, Lightbulb, Package, BookOpen } from "lucide-react";
import { SectionHeader, StaggerContainer, staggerItem } from "@/components/motion";

const timelineSteps = [
  { key: "step1", icon: GraduationCap },
  { key: "step2", icon: Code },
  { key: "step3", icon: Layers },
  { key: "step4", icon: Rocket },
] as const;

const values = [
  { key: "productMindset", icon: Target },
  { key: "problemSolving", icon: Lightbulb },
  { key: "shipping", icon: Package },
  { key: "learning", icon: BookOpen },
] as const;

export function AboutSection() {
  const t = useTranslations("about");

  return (
    <section id="about" className="section-padding">
      <div className="container-max">
        <SectionHeader headline={t("headline")} subtitle={t("subtitle")} />

        <div className="max-w-3xl mx-auto mb-20">
          <StaggerContainer className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/50 via-violet-500/30 to-transparent hidden sm:block" />

            {timelineSteps.map(({ key, icon: Icon }, index) => (
              <motion.div
                key={key}
                variants={staggerItem}
                className="relative flex gap-6 pb-12 last:pb-0"
              >
                <div className="relative z-10 flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-card glow">
                    <Icon className="size-5 text-indigo-400" />
                  </div>
                </div>
                <div className="pt-1">
                  <h3 className="text-lg font-semibold mb-2">
                    {t(`timeline.${key}.title`)}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t(`timeline.${key}.description`)}
                  </p>
                </div>
                {index < timelineSteps.length - 1 && (
                  <div className="absolute left-[23px] top-12 bottom-0 w-px bg-white/5 sm:hidden" />
                )}
              </motion.div>
            ))}
          </StaggerContainer>
        </div>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map(({ key, icon: Icon }) => (
            <motion.div
              key={key}
              variants={staggerItem}
              whileHover={{ y: -4 }}
              className="rounded-xl border border-white/8 bg-card p-6 transition-shadow hover:glow"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 mb-4">
                <Icon className="size-5 text-indigo-400" />
              </div>
              <h4 className="font-semibold mb-2">{t(`values.${key}.title`)}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t(`values.${key}.description`)}
              </p>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
