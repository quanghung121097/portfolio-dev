import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site";
import { Github } from "lucide-react";

export async function Footer() {
  const t = await getTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/6">
      <div className="container-max px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Left */}
          <div className="flex items-center gap-6">
            <span className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-foreground">
              {siteConfig.name}
            </span>
            <span className="section-label">
              © {year} — {t("rights")}
            </span>
          </div>

          {/* Right */}
          <div className="flex items-center gap-6">
            <p className="section-label hidden sm:block">{t("builtWith")}</p>
            <a
              href={siteConfig.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors duration-300"
              aria-label="GitHub"
            >
              <Github className="size-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
