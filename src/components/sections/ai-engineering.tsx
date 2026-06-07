import { getTranslations } from "next-intl/server";
import { FadeIn, SectionHeader, StaggerContainer } from "@/components/motion";
import { MotionStaggerItem } from "@/components/motion/interactions";

const toolKeys = ["openai", "cursor", "claude", "copilot", "prompt"] as const;
const workflowSteps = ["step1", "step2", "step3", "step4", "step5"] as const;

export async function AIEngineeringSection() {
  const t = await getTranslations("aiEngineering");

  return (
    <section className="section-padding border-t border-white/6">
      <div className="container-max">
        <SectionHeader
          index="—"
          headline={t("headline")}
          subtitle={t("subtitle")}
        />

        {/* ── Tools as horizontal list ── */}
        <StaggerContainer className="space-y-0 mb-16">
          {toolKeys.map((key, i) => (
            <MotionStaggerItem key={key} className="border-t border-white/6 py-5 group">
              <div className="flex items-start gap-5">
                <span className="font-mono text-[0.6rem] text-muted-foreground pt-0.5 w-5 flex-shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between flex-1 gap-1 sm:gap-6">
                  <h3 className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors duration-300 flex-shrink-0">
                    {t(`tools.${key}.name`)}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed sm:text-right max-w-lg">
                    {t(`tools.${key}.description`)}
                  </p>
                </div>
              </div>
            </MotionStaggerItem>
          ))}
          <div className="border-t border-white/6" />
        </StaggerContainer>

        {/* ── Workflow ── */}
        <FadeIn>
          <p className="section-label mb-6">{t("workflowLabel")}</p>
          <div className="flex flex-wrap items-center gap-0">
            {workflowSteps.map((step, index) => (
              <div key={step} className="flex items-center">
                <div className="flex items-center gap-2 border border-white/8 px-4 py-2 hover:border-white/20 transition-colors duration-200">
                  <span className="font-mono text-[0.6rem] text-accent">{index + 1}</span>
                  <span className="text-xs text-muted-foreground">{t(`workflow.${step}`)}</span>
                </div>
                {index < workflowSteps.length - 1 && (
                  <span className="text-muted-foreground/40 px-1 text-xs">→</span>
                )}
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
