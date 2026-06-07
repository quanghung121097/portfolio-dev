import { getTranslations } from "next-intl/server";
import { FadeIn, SectionHeader, StaggerContainer } from "@/components/motion";
import { MotionStaggerItem } from "@/components/motion/interactions";

const categoryMeta = [
  { key: "backend",   accent: "text-cyan-400" },   /* electric — cyberpunk */
  { key: "frontend",  accent: "text-violet-400" },  /* electric purple */
  { key: "databases", accent: "text-emerald-400" }, /* matrix green */
  { key: "devops",    accent: "text-amber-400" },   /* warm gold */
  { key: "ai",        accent: "text-accent" },      /* brand accent — most prominent */
] as const;

export async function TechStackSection() {
  const t = await getTranslations("techStack");

  return (
    <section className="section-padding border-t border-white/6">
      <div className="container-max">
        <SectionHeader
          index="02"
          headline={t("headline")}
          subtitle={t("subtitle")}
        />

        <StaggerContainer className="space-y-0">
          {categoryMeta.map(({ key, accent }) => {
            const skills = t.raw(`skills.${key}`) as string[];
            return (
              <MotionStaggerItem key={key} className="border-t border-white/6 py-6">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-12">
                  {/* Category label */}
                  <div className="flex-shrink-0 sm:w-36">
                    <p className={`section-label ${accent}`}>
                      {t(`categories.${key}`)}
                    </p>
                  </div>

                  {/* Skills as inline tags */}
                  <div className="flex flex-wrap gap-2 flex-1">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center border border-white/8 px-3 py-1.5 text-xs text-zinc-300 hover:border-white/20 hover:text-foreground transition-colors duration-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </MotionStaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Bottom rule */}
        <FadeIn>
          <div className="editorial-rule mt-0" />
        </FadeIn>
      </div>
    </section>
  );
}
