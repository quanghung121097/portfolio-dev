"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { SectionHeader, StaggerContainer, staggerItem } from "@/components/motion";

const companies = [
  { name: "Coolmate", color: "from-blue-500/20 to-cyan-500/10" },
  { name: "CO-WELL Asia", color: "from-violet-500/20 to-purple-500/10" },
  { name: "VCCorp", color: "from-indigo-500/20 to-blue-500/10" },
] as const;

export function CompaniesSection() {
  const t = useTranslations("companies");

  return (
    <section className="section-padding border-y border-white/5 bg-card/30">
      <div className="container-max">
        <SectionHeader headline={t("headline")} subtitle={t("subtitle")} />

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {companies.map((company) => (
            <motion.div
              key={company.name}
              variants={staggerItem}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group relative"
            >
              <div className="gradient-border rounded-2xl">
                <div
                  className={`relative flex items-center justify-center h-28 rounded-2xl bg-gradient-to-br ${company.color} border border-white/8 transition-all duration-300 group-hover:glow`}
                >
                  <span className="text-xl md:text-2xl font-bold tracking-tight text-foreground/90 group-hover:text-foreground transition-colors">
                    {company.name}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
