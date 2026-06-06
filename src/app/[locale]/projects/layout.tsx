import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site";
import { routing, type Locale } from "@/i18n/routing";
import { generatePageMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) {
    return {};
  }
  const t = await getTranslations({ locale, namespace: "projectsPage" });
  const base = await generatePageMetadata(locale as Locale);

  return {
    ...base,
    title: `${t("title")} | Hung Nguyen`,
    description: t("description"),
    alternates: {
      ...base.alternates,
      canonical: `${siteConfig.url}/${locale}/projects`,
      languages: {
        en: `${siteConfig.url}/en/projects`,
        vi: `${siteConfig.url}/vi/projects`,
        "x-default": `${siteConfig.url}/en/projects`,
      },
    },
  };
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
