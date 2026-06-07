"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { X, Globe } from "lucide-react";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";
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
    const onScroll = () => setScrolled(window.scrollY > 30);
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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled ? "glass border-b border-white/6 py-4" : "bg-transparent py-6"
      )}
    >
      <nav className="container-max flex items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Wordmark */}
        <Link
          href="/"
          className="font-mono text-xs tracking-[0.2em] uppercase text-foreground hover:text-muted-foreground transition-colors duration-300"
        >
          {siteConfig.name.split(" ")[0]}
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="animated-underline text-xs tracking-[0.12em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              {t(item.key)}
            </Link>
          ))}
        </div>

        {/* Desktop right */}
        <div className="hidden md:flex items-center gap-5">
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              aria-label={tLang("switch")}
              className="flex items-center gap-1.5 text-xs tracking-[0.12em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              <Globe className="size-3" />
              {locale.toUpperCase()}
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full mt-3 w-32 border border-white/8 bg-card"
                >
                  {routing.locales.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => switchLocale(loc)}
                      className={cn(
                        "w-full px-4 py-2.5 text-left text-xs tracking-widest uppercase transition-colors",
                        loc === locale
                          ? "text-foreground bg-white/5"
                          : "text-muted-foreground hover:text-foreground hover:bg-white/3"
                      )}
                    >
                      {tLang(loc)}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/projects"
            className="text-xs tracking-[0.12em] uppercase border border-white/12 px-4 py-2 text-foreground hover:bg-white/5 transition-colors duration-300"
          >
            {t("viewProjects")} ↗
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="size-4" />
          ) : (
            <span className="font-mono text-xs tracking-widest">MENU</span>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden glass border-t border-white/6"
          >
            <div className="container-max px-4 py-6 flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-2 py-3 text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground border-b border-white/5 transition-colors"
                >
                  {t(item.key)}
                </Link>
              ))}
              <div className="flex gap-2 pt-4">
                {routing.locales.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => switchLocale(loc)}
                    className={cn(
                      "flex-1 py-2 text-xs tracking-widest uppercase transition-colors border",
                      loc === locale
                        ? "border-white/20 text-foreground"
                        : "border-white/6 text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {tLang(loc)}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
