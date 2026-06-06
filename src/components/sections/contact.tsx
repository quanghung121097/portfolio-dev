"use client";

import { useTranslations } from "next-intl";
import { Mail, Phone, Github, MapPin, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { SectionHeader, FadeIn, StaggerContainer, staggerItem } from "@/components/motion";
import { MagneticButton } from "@/components/motion/interactions";
import { motion } from "framer-motion";

const contactItems = [
  {
    key: "email",
    icon: Mail,
    href: `mailto:${siteConfig.contact.email}`,
    value: siteConfig.contact.email,
  },
  {
    key: "phone",
    icon: Phone,
    href: `tel:${siteConfig.contact.phone.replace(/\s/g, "")}`,
    value: siteConfig.contact.phoneDisplay,
  },
  {
    key: "github",
    icon: Github,
    href: siteConfig.contact.github,
    value: "GitHub",
  },
  {
    key: "location",
    icon: MapPin,
    href: undefined,
    value: siteConfig.contact.location,
  },
] as const;

export function ContactSection() {
  const t = useTranslations("contact");

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-indigo-600/15 blur-[100px]" />
      </div>

      <div className="container-max">
        <SectionHeader headline={t("headline")} subtitle={t("subtitle")} />

        <div className="max-w-3xl mx-auto">
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
            {contactItems.map(({ key, icon: Icon, href, value }) => (
              <motion.div key={key} variants={staggerItem}>
                {href ? (
                  <a
                    href={href}
                    target={key === "email" || key === "phone" ? undefined : "_blank"}
                    rel={key === "email" || key === "phone" ? undefined : "noopener noreferrer"}
                    className="group flex items-center gap-4 rounded-xl border border-white/8 bg-card p-5 transition-all hover:border-indigo-500/30 hover:glow"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 group-hover:bg-indigo-500/20 transition-colors">
                      <Icon className="size-4 text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{t(key)}</p>
                      <p className="text-sm font-medium">{value}</p>
                    </div>
                  </a>
                ) : (
                  <div className="flex items-center gap-4 rounded-xl border border-white/8 bg-card p-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10">
                      <Icon className="size-4 text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{t(key)}</p>
                      <p className="text-sm font-medium">{value}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </StaggerContainer>

          <FadeIn>
            <div className="text-center rounded-2xl border border-white/8 bg-gradient-to-br from-indigo-500/10 via-card to-violet-500/10 p-10 gradient-border">
              <p className="text-muted-foreground mb-6">{t("ctaDescription")}</p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <MagneticButton>
                  <Button asChild size="lg">
                    <a href={`mailto:${siteConfig.contact.email}`}>
                      {t("cta")}
                      <ArrowUpRight className="size-4" />
                    </a>
                  </Button>
                </MagneticButton>
                <MagneticButton>
                  <Button asChild variant="outline" size="lg">
                    <a
                      href={siteConfig.resumePath}
                      download={siteConfig.resumeFileName}
                    >
                      {t("downloadResume")}
                    </a>
                  </Button>
                </MagneticButton>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
