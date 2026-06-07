import { getTranslations } from "next-intl/server";
import { FadeIn } from "@/components/motion";

const companyKeys = ["coolmate", "cowell", "vccorp"] as const;

export async function CompaniesSection() {
  const t = await getTranslations("companies");

  return (
    <section className="border-t border-white/6 py-10">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <p className="section-label mb-8">{t("headline")}</p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="flex flex-col sm:flex-row sm:items-center gap-0">
            {companyKeys.map((key, i) => (
              <div key={key} className="flex items-center">
                <div className="py-4 sm:py-0 sm:px-8 first:sm:pl-0">
                  <p className="text-base md:text-lg font-semibold text-foreground/70 hover:text-foreground transition-colors duration-300">
                    {t(`items.${key}.name`)}
                  </p>
                  <p className="section-label mt-1">{t(`items.${key}.domain`)}</p>
                </div>
                {i < companyKeys.length - 1 && (
                  <span className="hidden sm:block w-px h-8 bg-white/8 mx-2" />
                )}
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
