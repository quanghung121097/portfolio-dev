import { getTranslations } from "next-intl/server";
import { FadeIn, SectionHeader, StaggerContainer } from "@/components/motion";
import { MotionStaggerItem } from "@/components/motion/interactions";

const timelineKeys = ["step1", "step2", "step3", "step4", "step5"] as const;
const valueKeys = ["productMindset", "problemSolving", "shipping", "learning"] as const;

export async function AboutSection() {
  const t = await getTranslations("about");

  return (
    <section id="about" className="section-padding">
      <div className="container-max">
        <SectionHeader
          index="01"
          headline={t("headline")}
          subtitle={t("subtitle")}
        />

        {/* ── Two-column asymmetric layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24 mb-20">
          {/* Left: sticky stats panel */}
          <FadeIn direction="none">
            <div className="lg:sticky lg:top-32 space-y-6">
              <p className="section-label">{t("sectionLabel")}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t("bio")}
              </p>
              <div className="space-y-0 pt-2">
                {([
                  { label: t("stat1Label"), value: t("stat1Value") },
                  { label: t("stat2Label"), value: t("stat2Value") },
                  { label: t("stat3Label"), value: t("stat3Value") },
                ] as const).map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex justify-between items-baseline border-b border-white/6 py-3"
                  >
                    <span className="section-label">{label}</span>
                    <span className="font-mono text-xs text-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Right: timeline */}
          <div className="space-y-0">
            {timelineKeys.map((key, index) => (
              <FadeIn key={key} delay={index * 0.08}>
                <div className="border-t border-white/6 py-8 group">
                  <div className="flex items-start gap-6">
                    <span className="font-mono text-[0.6rem] text-muted-foreground pt-0.5 flex-shrink-0 w-5">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-foreground mb-2 group-hover:text-accent transition-colors duration-300">
                        {t(`timeline.${key}.title`)}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {t(`timeline.${key}.description`)}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* ── Values row ── */}
        <FadeIn>
          <div className="editorial-rule" />
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-0">
          {valueKeys.map((key, i) => (
            <MotionStaggerItem
              key={key}
              className="border-t border-white/6 lg:border-t-0 lg:border-l first:lg:border-l-0 border-white/6 pt-8 lg:pt-8 lg:pl-8 first:lg:pl-0"
            >
              <p className="font-mono text-[0.6rem] tracking-[0.18em] uppercase text-accent mb-3">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h4 className="text-sm font-semibold text-foreground mb-2">
                {t(`values.${key}.title`)}
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {t(`values.${key}.description`)}
              </p>
            </MotionStaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
