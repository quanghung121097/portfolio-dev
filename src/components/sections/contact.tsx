import { getTranslations } from "next-intl/server";
import { Mail, Phone, Github, MapPin, ArrowUpRight, Download } from "lucide-react";
import { siteConfig } from "@/config/site";
import { FadeIn, ScrollLine } from "@/components/motion";

const contactItems = [
  {
    key: "email" as const,
    icon: Mail,
    href: `mailto:${siteConfig.contact.email}`,
    value: siteConfig.contact.email,
  },
  {
    key: "phone" as const,
    icon: Phone,
    href: `tel:${siteConfig.contact.phone.replace(/\s/g, "")}`,
    value: siteConfig.contact.phoneDisplay,
  },
  {
    key: "github" as const,
    icon: Github,
    href: siteConfig.contact.github,
    value: "GitHub",
  },
  {
    key: "location" as const,
    icon: MapPin,
    href: undefined,
    value: siteConfig.contact.location,
  },
] as const;

export async function ContactSection() {
  const t = await getTranslations("contact");

  return (
    <section id="contact" className="section-padding border-t border-white/6">
      <div className="container-max">
        <FadeIn>
          <p className="section-label mb-6">06 — {t("headline").split(" ")[0]}</p>
          <ScrollLine />
        </FadeIn>

        {/* ── Editorial large CTA ── */}
        <FadeIn delay={0.1}>
          <div className="py-14 md:py-20">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
              {t("headline")}
            </h2>
            <p className="text-sm text-muted-foreground mt-5 max-w-md leading-relaxed">
              {t("subtitle")}
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="editorial-rule mb-10" />
        </FadeIn>

        {/* ── Contact info ── */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-10">
          {/* Contact links */}
          <FadeIn delay={0.2}>
            <div className="space-y-0">
              {contactItems.map(({ key, icon: Icon, href, value }) => (
                <div key={key} className="border-b border-white/5 last:border-b-0 py-3">
                  {href ? (
                    <a
                      href={href}
                      target={key === "github" ? "_blank" : undefined}
                      rel={key === "github" ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-3 group"
                    >
                      <Icon className="size-3 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0" />
                      <div className="flex items-baseline gap-3">
                        <span className="section-label w-14">{t(key)}</span>
                        <span className="text-xs text-muted-foreground group-hover:text-foreground animated-underline transition-colors">
                          {value}
                        </span>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-center gap-3">
                      <Icon className="size-3 text-muted-foreground flex-shrink-0" />
                      <div className="flex items-baseline gap-3">
                        <span className="section-label w-14">{t(key)}</span>
                        <span className="text-xs text-muted-foreground">{value}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </FadeIn>

          {/* CTAs */}
          <FadeIn delay={0.3}>
            <div className="flex flex-col gap-3 sm:items-end">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center gap-2 text-xs tracking-[0.12em] uppercase border border-white/15 px-6 py-3 text-foreground hover:bg-white/5 transition-colors duration-300"
              >
                {t("cta")}
                <ArrowUpRight className="size-3" />
              </a>
              <a
                href={siteConfig.resumePath}
                download={siteConfig.resumeFileName}
                className="flex items-center gap-2 text-xs tracking-[0.12em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                <Download className="size-3" />
                {t("downloadResume")}
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
