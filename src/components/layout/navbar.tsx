"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Menu, X, Globe } from "lucide-react";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { routing, type Locale } from "@/i18n/routing";

const navItems = [
  { key: "about", href: "/#about" },
  { key: "projects", href: "/projects" },
  { key: "experience", href: "/#experience" },
  { key: "contact", href: "/#contact" },
] as const;

export function Navbar() {
  const t = useTranslations("nav");
  const tLang = useTranslations("language");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const switchLocale = (newLocale: Locale) => {
    setLangOpen(false);
    setMobileOpen(false);
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "glass border-b border-white/8 py-3"
          : "bg-transparent py-5"
      )}
    >
      <nav className="container-max flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight hover:opacity-80 transition-opacity"
        >
          {siteConfig.name.split(" ")[0]}
          <span className="text-indigo-400">.</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t(item.key)}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLangOpen(!langOpen)}
              aria-label={tLang("switch")}
              className="gap-1.5"
            >
              <Globe className="size-4" />
              {locale.toUpperCase()}
            </Button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-2 w-36 rounded-lg border border-white/10 bg-card p-1 shadow-xl">
                {routing.locales.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => switchLocale(loc)}
                    className={cn(
                      "w-full rounded-md px-3 py-2 text-left text-sm transition-colors",
                      loc === locale
                        ? "bg-indigo-500/20 text-indigo-300"
                        : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                    )}
                  >
                    {tLang(loc)}
                  </button>
                ))}
              </div>
            )}
          </div>
          <Button asChild size="sm">
            <Link href="/projects">{t("viewProjects")}</Link>
          </Button>
        </div>

        <button
          className="md:hidden p-2 text-muted-foreground hover:text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="md:hidden glass border-t border-white/8">
          <div className="container-max px-4 py-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-4 py-3 text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground transition-colors"
              >
                {t(item.key)}
              </Link>
            ))}
            <div className="flex gap-2 pt-2 border-t border-white/8">
              {routing.locales.map((loc) => (
                <button
                  key={loc}
                  onClick={() => switchLocale(loc)}
                  className={cn(
                    "flex-1 rounded-lg px-3 py-2 text-sm transition-colors",
                    loc === locale
                      ? "bg-indigo-500/20 text-indigo-300"
                      : "text-muted-foreground hover:bg-white/5"
                  )}
                >
                  {tLang(loc)}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
