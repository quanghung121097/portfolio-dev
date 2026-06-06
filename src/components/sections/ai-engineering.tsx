"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Bot,
  Terminal,
  Brain,
  GitBranch,
  Wand2,
  ArrowRight,
} from "lucide-react";
import { SectionHeader, FadeIn, StaggerContainer, staggerItem } from "@/components/motion";

const toolKeys = [
  { key: "openai", icon: Bot },
  { key: "cursor", icon: Terminal },
  { key: "claude", icon: Brain },
  { key: "copilot", icon: GitBranch },
  { key: "prompt", icon: Wand2 },
] as const;

const workflowSteps = ["step1", "step2", "step3", "step4", "step5"] as const;

export function AIEngineeringSection() {
  const t = useTranslations("aiEngineering");

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-indigo-600/10 blur-[120px]" />
      </div>

      <div className="container-max">
        <SectionHeader headline={t("headline")} subtitle={t("subtitle")} />

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-16">
          {toolKeys.map(({ key, icon: Icon }) => (
            <motion.div
              key={key}
              variants={staggerItem}
              whileHover={{ y: -4 }}
              className="rounded-xl border border-white/8 bg-card p-5 transition-all hover:border-indigo-500/30 hover:glow"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 mb-3">
                <Icon className="size-5 text-indigo-400" />
              </div>
              <h3 className="font-semibold text-sm mb-1.5">
                {t(`tools.${key}.name`)}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {t(`tools.${key}.description`)}
              </p>
            </motion.div>
          ))}
        </StaggerContainer>

        <FadeIn>
          <div className="max-w-4xl mx-auto">
            <div className="rounded-2xl border border-white/8 bg-card/80 p-8 md:p-10 gradient-border">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2">
                {workflowSteps.map((step, index) => (
                  <div key={step} className="flex items-center gap-2 md:gap-0">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 }}
                      className="flex flex-col items-center text-center"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-indigo-500/30 bg-indigo-500/10 text-sm font-semibold text-indigo-300 mb-2">
                        {index + 1}
                      </div>
                      <span className="text-xs md:text-sm font-medium max-w-[100px] leading-tight">
                        {t(`workflow.${step}`)}
                      </span>
                    </motion.div>
                    {index < workflowSteps.length - 1 && (
                      <ArrowRight className="size-4 text-muted-foreground hidden md:block mx-1 flex-shrink-0" />
                    )}
                  </div>
                ))}
              </div>

              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
                className="mt-8 h-1 rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-500 origin-left hidden md:block"
              />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
