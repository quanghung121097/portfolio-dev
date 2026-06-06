"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { Link } from "@/i18n/navigation";
import {
  FEATURED_PROJECT_KEYS,
  PROJECT_KEYS,
  projectGradients,
  projectUrls,
  type ProjectKey,
} from "@/config/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeader, StaggerContainer, staggerItem } from "@/components/motion";
import { TiltCard } from "@/components/motion/interactions";

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

  return (
    <section id="projects" className="section-padding">
      <div className="container-max">
        <SectionHeader headline={t("headline")} subtitle={t("subtitle")} />

        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {keys.map((key) => {
            const tech = t.raw(`items.${key}.tech`) as string[];
            const highlights = t.raw(`items.${key}.highlights`) as string[];
            const url = projectUrls[key as ProjectKey];
            const period = t.has(`items.${key}.period`)
              ? t(`items.${key}.period`)
              : null;
            const team = t.has(`items.${key}.team`)
              ? t(`items.${key}.team`)
              : null;

            return (
              <motion.div key={key} variants={staggerItem}>
                <TiltCard>
                  <article className="group rounded-2xl border border-white/8 bg-card overflow-hidden transition-all duration-300 hover:border-indigo-500/30 hover:glow">
                    <div
                      className={`relative h-48 bg-gradient-to-br ${projectGradients[key as ProjectKey]} flex flex-col justify-end p-6`}
                    >
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]" />
                      <div className="relative flex items-end justify-between gap-4">
                        <div>
                          <h3 className="text-2xl font-bold">
                            {t(`items.${key}.name`)}
                          </h3>
                          {(period || team) && (
                            <p className="text-xs text-white/70 mt-1">
                              {[period, team].filter(Boolean).join(" · ")}
                            </p>
                          )}
                        </div>
                        {url && (
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 bg-black/20 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                            aria-label={`Visit ${t(`items.${key}.name`)}`}
                          >
                            <ExternalLink className="size-4" />
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="p-6">
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        {t(`items.${key}.description`)}
                      </p>

                      <ul className="space-y-1.5 mb-5">
                        {highlights.map((highlight) => (
                          <li
                            key={highlight}
                            className="flex items-center gap-2 text-sm text-zinc-400"
                          >
                            <span className="h-1 w-1 rounded-full bg-indigo-400" />
                            {highlight}
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-1.5">
                        {tech.map((item) => (
                          <Badge key={item} variant="accent">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </article>
                </TiltCard>
              </motion.div>
            );
          })}
        </StaggerContainer>

        {showViewAll && featured && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mt-12"
          >
            <Button asChild variant="outline" size="lg">
              <Link href="/projects">
                {t("viewAll")}
                <ArrowUpRight className="size-4" />
              </Link>
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
