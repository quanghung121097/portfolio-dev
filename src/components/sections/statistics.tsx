import { getTranslations } from "next-intl/server";
import { FadeIn, AnimatedCounter } from "@/components/motion";

const statKeys = ["experience", "products", "companies", "technologies"] as const;

export async function StatisticsSection() {
  const t = await getTranslations("statistics");

  return (
    <section className="section-padding border-t border-white/6">
      <div className="container-max">
        <FadeIn>
          <div className="flex items-center justify-between mb-12">
            <p className="section-label">05 — {t("headline")}</p>
            <p className="section-label hidden sm:block">{t("subtitle")}</p>
          </div>
          <div className="editorial-rule" />
        </FadeIn>

        <div className="grid grid-cols-2 lg:grid-cols-4">
          {statKeys.map((key, i) => {
            const value = t.raw(`items.${key}.value`) as number;
            const suffix = t(`items.${key}.suffix`);

            return (
              <FadeIn key={key} delay={i * 0.1}>
                <div className="border-t border-white/6 lg:border-t-0 lg:border-l first:lg:border-l-0 border-white/6 pt-8 lg:pt-10 lg:pl-10 first:lg:pl-0 pb-2">
                  <div className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground tabular-nums">
                    <AnimatedCounter value={value} suffix={suffix} />
                  </div>
                  <p className="section-label mt-3">
                    {t(`items.${key}.label`)}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
