"use client";

import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";
import { Github } from "lucide-react";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/8 bg-card/50">
      <div className="container-max section-padding !py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-sm font-medium">{siteConfig.name}</p>
            <p className="text-xs text-muted-foreground mt-1">
              © {year} {siteConfig.name}. {t("rights")}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={siteConfig.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github className="size-5" />
            </a>
          </div>

          <p className="text-xs text-muted-foreground">{t("builtWith")}</p>
        </div>
      </div>
    </footer>
  );
}
