"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SectionHeader, StaggerContainer, staggerItem } from "@/components/motion";
import { cn } from "@/lib/utils";

const experienceKeys = ["freelance", "coolmate", "cowell", "vccorp"] as const;

export function ExperienceSection() {
  const t = useTranslations("experience");
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="experience" className="section-padding bg-card/30 border-y border-white/5">
      <div className="container-max">
        <SectionHeader headline={t("headline")} subtitle={t("subtitle")} />

        <div className="max-w-4xl mx-auto">
          <StaggerContainer className="relative">
            <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/50 via-violet-500/20 to-transparent hidden md:block" />

            {experienceKeys.map((key, index) => {
              const isActive = activeIndex === index;
              const technologies = t.raw(`items.${key}.technologies`) as string[];
              const responsibilities = t.raw(`items.${key}.responsibilities`) as string[];
              const achievements = t.raw(`items.${key}.achievements`) as string[];

              return (
                <motion.div
                  key={key}
                  variants={staggerItem}
                  className="relative mb-4 last:mb-0"
                >
                  <button
                    onClick={() => setActiveIndex(isActive ? -1 : index)}
                    className={cn(
                      "w-full text-left rounded-xl border transition-all duration-300",
                      isActive
                        ? "border-indigo-500/30 bg-card glow"
                        : "border-white/8 bg-card/50 hover:border-white/15"
                    )}
                  >
                    <div className="flex items-start gap-4 p-5 md:p-6">
                      <div className="relative z-10 flex-shrink-0 hidden md:flex">
                        <div
                          className={cn(
                            "flex h-10 w-10 items-center justify-center rounded-lg border transition-colors",
                            isActive
                              ? "border-indigo-500/50 bg-indigo-500/10"
                              : "border-white/10 bg-card"
                          )}
                        >
                          <Building2
                            className={cn(
                              "size-4",
                              isActive ? "text-indigo-400" : "text-muted-foreground"
                            )}
                          />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <h3 className="text-lg font-semibold">
                              {t(`items.${key}.company`)}
                            </h3>
                            <p className="text-sm text-indigo-400 mt-0.5">
                              {t(`items.${key}.role`)}
                            </p>
                          </div>
                          <div className="flex items-center gap-3 flex-shrink-0">
                            <span className="text-sm text-muted-foreground hidden sm:block">
                              {t(`items.${key}.period`)}
                            </span>
                            <ChevronDown
                              className={cn(
                                "size-5 text-muted-foreground transition-transform duration-300",
                                isActive && "rotate-180"
                              )}
                            />
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground sm:hidden mt-1 block">
                          {t(`items.${key}.period`)}
                        </span>
                      </div>
                    </div>

                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 md:px-6 pb-6 md:pl-[4.5rem] space-y-5 border-t border-white/5 pt-5">
                            <p className="text-sm text-zinc-300 leading-relaxed italic">
                              {t(`items.${key}.impact`)}
                            </p>

                            <div>
                              <h4 className="text-sm font-medium mb-2 text-foreground">
                                {t("labels.responsibilities")}
                              </h4>
                              <ul className="space-y-1.5">
                                {responsibilities.map((item) => (
                                  <li
                                    key={item}
                                    className="flex items-start gap-2 text-sm text-muted-foreground"
                                  >
                                    <span className="mt-2 h-1 w-1 rounded-full bg-indigo-400 flex-shrink-0" />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h4 className="text-sm font-medium mb-2 text-foreground">
                                {t("labels.achievements")}
                              </h4>
                              <ul className="space-y-1.5">
                                {achievements.map((item) => (
                                  <li
                                    key={item}
                                    className="flex items-start gap-2 text-sm text-muted-foreground"
                                  >
                                    <span className="mt-2 h-1 w-1 rounded-full bg-violet-400 flex-shrink-0" />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="flex flex-wrap gap-1.5">
                              {technologies.map((tech) => (
                                <Badge key={tech}>{tech}</Badge>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </motion.div>
              );
            })}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
