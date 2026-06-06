"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Server,
  Monitor,
  Database,
  Cloud,
  Sparkles,
} from "lucide-react";
import { SectionHeader, StaggerContainer, staggerItem } from "@/components/motion";

const categories = [
  { key: "backend", icon: Server, color: "text-blue-400", bg: "from-blue-500/10" },
  { key: "frontend", icon: Monitor, color: "text-violet-400", bg: "from-violet-500/10" },
  { key: "databases", icon: Database, color: "text-emerald-400", bg: "from-emerald-500/10" },
  { key: "devops", icon: Cloud, color: "text-amber-400", bg: "from-amber-500/10" },
  { key: "ai", icon: Sparkles, color: "text-indigo-400", bg: "from-indigo-500/10" },
] as const;

export function TechStackSection() {
  const t = useTranslations("techStack");

  return (
    <section className="section-padding bg-card/30 border-y border-white/5">
      <div className="container-max">
        <SectionHeader headline={t("headline")} subtitle={t("subtitle")} />

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(({ key, icon: Icon, color, bg }) => {
            const skills = t.raw(`skills.${key}`) as string[];
            return (
              <motion.div
                key={key}
                variants={staggerItem}
                whileHover={{ y: -4 }}
                className="group rounded-2xl border border-white/8 bg-card p-6 transition-all duration-300 hover:border-indigo-500/30 hover:glow"
              >
                <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${bg} to-transparent border border-white/5 mb-5`}>
                  <Icon className={`size-5 ${color}`} />
                </div>
                <h3 className="text-lg font-semibold mb-4">
                  {t(`categories.${key}`)}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center rounded-md border border-white/8 bg-white/5 px-2.5 py-1 text-xs font-medium text-zinc-300 transition-colors group-hover:border-white/15 group-hover:bg-white/8"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
