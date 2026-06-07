"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn, SectionHeader } from "@/components/motion";

const experienceKeys = ["freelance", "coolmate", "cowell", "vccorp"] as const;
const ease = [0.16, 1, 0.3, 1] as const;

export function ExperienceSection() {
  const t = useTranslations("experience");
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section id="experience" className="section-padding border-t border-white/6">
      <div className="container-max">
        <SectionHeader
          index="04"
          headline={t("headline")}
          subtitle={t("subtitle")}
        />

        <div className="space-y-0">
          {experienceKeys.map((key, index) => {
            const isActive = activeIndex === index;
            const technologies = t.raw(`items.${key}.technologies`) as string[];
            const responsibilities = t.raw(`items.${key}.responsibilities`) as string[];
            const achievements = t.raw(`items.${key}.achievements`) as string[];

            return (
              <FadeIn key={key} delay={index * 0.07}>
                <div className="border-t border-white/6 last:border-b">
                  {/* ── Header row (clickable) ── */}
                  <button
                    onClick={() => setActiveIndex(isActive ? null : index)}
                    className="w-full text-left py-7 group"
                    aria-expanded={isActive}
                  >
                    <div className="flex items-start justify-between gap-6">
                      <div className="flex items-start gap-5">
                        {/* Index */}
                        <span className="font-mono text-[0.6rem] text-muted-foreground pt-0.5 flex-shrink-0 w-5">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        {/* Company + Role */}
                        <div>
                          <p className="text-lg md:text-xl font-semibold text-foreground group-hover:text-accent transition-colors duration-300">
                            {t(`items.${key}.company`)}
                          </p>
                          <p className="text-sm text-muted-foreground mt-0.5">
                            {t(`items.${key}.role`)}
                          </p>
                        </div>
                      </div>

                      {/* Period + toggle */}
                      <div className="flex items-center gap-4 flex-shrink-0 pt-0.5">
                        <span className="font-mono text-[0.6rem] text-muted-foreground hidden sm:block">
                          {t(`items.${key}.period`)}
                        </span>
                        <motion.div
                          animate={{ rotate: isActive ? 45 : 0 }}
                          transition={{ duration: 0.25, ease }}
                          className="text-muted-foreground group-hover:text-foreground transition-colors w-4 h-4 flex items-center justify-center"
                        >
                          <span className="text-lg leading-none select-none">+</span>
                        </motion.div>
                      </div>
                    </div>

                    {/* Mobile period */}
                    <p className="font-mono text-[0.6rem] text-muted-foreground mt-2 pl-10 sm:hidden">
                      {t(`items.${key}.period`)}
                    </p>
                  </button>

                  {/* ── Expanded detail ── */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease }}
                        className="overflow-hidden"
                      >
                        <div className="pb-8 pl-10 space-y-6">
                          {/* Impact statement */}
                          <p className="text-sm text-zinc-400 leading-relaxed border-l-2 border-accent pl-4 italic">
                            {t(`items.${key}.impact`)}
                          </p>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Responsibilities */}
                            <div>
                              <p className="section-label mb-3">
                                {t("labels.responsibilities")}
                              </p>
                              <ul className="space-y-2">
                                {responsibilities.map((item) => (
                                  <li
                                    key={item}
                                    className="flex items-start gap-2.5 text-xs text-muted-foreground leading-relaxed"
                                  >
                                    <span className="mt-1.5 h-1 w-1 rounded-full bg-white/30 flex-shrink-0" />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Achievements */}
                            <div>
                              <p className="section-label mb-3">
                                {t("labels.achievements")}
                              </p>
                              <ul className="space-y-2">
                                {achievements.map((item) => (
                                  <li
                                    key={item}
                                    className="flex items-start gap-2.5 text-xs text-muted-foreground leading-relaxed"
                                  >
                                    <span className="mt-1.5 h-1 w-1 rounded-full bg-accent/60 flex-shrink-0" />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* Technologies */}
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {technologies.map((tech) => (
                              <span
                                key={tech}
                                className="inline-flex items-center border border-white/8 px-2.5 py-1 text-[0.6rem] tracking-wide text-muted-foreground"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
