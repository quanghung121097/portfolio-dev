import { type Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site";
import { routing, type Locale } from "@/i18n/routing";

export async function generatePageMetadata(locale: Locale): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });

  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[loc] = `${siteConfig.url}/${loc}`;
  }
  languages["x-default"] = `${siteConfig.url}/en`;

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: `${siteConfig.url}/${locale}`,
      languages,
    },
    openGraph: {
      type: "website",
      locale: locale === "vi" ? "vi_VN" : "en_US",
      alternateLocale: locale === "vi" ? "en_US" : "vi_VN",
      url: `${siteConfig.url}/${locale}`,
      title: t("title"),
      description: t("description"),
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: t("title"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [siteConfig.ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export function generateJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: locale === "vi" ? "Lập Trình Viên Full Stack" : "Full Stack Developer",
    url: `${siteConfig.url}/${locale}`,
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ha Noi",
      addressCountry: "VN",
    },
    sameAs: [siteConfig.contact.github],
    knowsAbout: [
      "Laravel",
      "React",
      "Node.js",
      "TypeScript",
      "OpenAI API",
      "Docker",
      "AWS",
    ],
  };
}
