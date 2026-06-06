import { setRequestLocale, getTranslations } from "next-intl/server";
import { ProjectsSection } from "@/components/sections/projects";

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("projectsPage");

  return (
    <div className="pt-28">
      <section className="section-padding !pt-8">
        <div className="container-max">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              {t("title")}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t("description")}
            </p>
          </div>
        </div>
      </section>
      <ProjectsSection showViewAll={false} />
    </div>
  );
}
