"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import {
  FEATURED_PROJECT_KEYS,
  PROJECT_KEYS,
  projectUrls,
  type ProjectKey,
} from "@/config/projects";
import { FadeIn, SectionHeader } from "@/components/motion";

const ease = [0.16, 1, 0.3, 1] as const;

interface ProjectsSectionProps {
  showViewAll?: boolean;
  featured?: boolean;
}

export function ProjectsSection({
  showViewAll = true,
  featured = false,
}: ProjectsSectionProps) {
  const t = useTranslations("projects");
  const keys = featured ? FEATURED_PROJECT_KEYS : PROJECT_KEYS;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="projects" className="section-padding border-t border-white/6">
      <div className="container-max">
        <SectionHeader
          index="03"
          headline={t("headline")}
          subtitle={t("subtitle")}
        />

        {/* ── Project indexed list ── */}
        <div>
          {keys.map((key, index) => {
            const tech = t.raw(`items.${key}.tech`) as string[];
            const url = projectUrls[key as ProjectKey];
            const period = t.has(`items.${key}.period`)
              ? t(`items.${key}.period`)
              : null;
            const context = t.has(`items.${key}.context`)
              ? t(`items.${key}.context`)
              : null;
            const isHovered = hoveredIndex === index;

            return (
              <FadeIn key={key} delay={index * 0.05}>
                <div
                  className="project-row group"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="py-6 md:py-7">
                    {/* ── Main row ── */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-5 flex-1 min-w-0">
                        {/* Index */}
                        <span className="font-mono text-[0.6rem] text-muted-foreground pt-1 flex-shrink-0 w-5">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        {/* Name + meta */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline gap-3 flex-wrap">
                            <h3 className="text-lg md:text-xl font-semibold text-foreground group-hover:text-accent transition-colors duration-300">
                              {t(`items.${key}.name`)}
                            </h3>
                            {context && (
                              <span className="font-mono text-[0.6rem] text-accent/80 flex-shrink-0">
                                {context}
                              </span>
                            )}
                            {period && (
                              <span className="font-mono text-[0.6rem] text-muted-foreground flex-shrink-0">
                                {period}
                              </span>
                            )}
                          </div>

                          {/* Tech tags */}
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {tech.slice(0, 4).map((item) => (
                              <span
                                key={item}
                                className="inline-flex items-center border border-white/6 px-2 py-0.5 text-[0.6rem] tracking-wide text-muted-foreground"
                              >
                                {item}
                              </span>
                            ))}
                            {tech.length > 4 && (
                              <span className="text-[0.6rem] text-muted-foreground self-center">
                                +{tech.length - 4}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* External link */}
                      {url ? (
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Visit ${t(`items.${key}.name`)}`}
                          className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors duration-300 pt-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ArrowUpRight className="size-4" />
                        </a>
                      ) : (
                        <div className="flex-shrink-0 w-4 pt-1" />
                      )}
                    </div>

                    {/* ── Expandable description on hover ── */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease }}
                          className="overflow-hidden"
                        >
                          <p className="pt-4 pl-10 text-sm text-muted-foreground leading-relaxed max-w-2xl">
                            {t(`items.${key}.description`)}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </FadeIn>
            );
          })}

          {/* Bottom rule */}
          <div className="editorial-rule" />
        </div>

        {showViewAll && featured && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 flex justify-start"
          >
            <Link
              href="/projects"
              className="flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground animated-underline transition-colors duration-300"
            >
              {t("viewAll")}
              <ArrowUpRight className="size-3" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
