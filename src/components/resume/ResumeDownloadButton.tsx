"use client";

import { useCallback, useEffect, useId, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { Download, FileText, X } from "lucide-react";
import { siteConfig } from "@/config/site";

const spring = { type: "spring" as const, damping: 22, stiffness: 280 };

type ResumeDownloadButtonProps = {
  label: string;
  className?: string;
  showIcon?: boolean;
};

type ResumeOption = {
  key: "en" | "vi";
  title: string;
  subtitle: string;
  path: string;
  fileName: string;
};

export function ResumeDownloadButton({
  label,
  className = "",
  showIcon = true,
}: ResumeDownloadButtonProps) {
  const t = useTranslations("resume");
  const locale = useLocale();
  const titleId = useId();
  const [open, setOpen] = useState(false);

  const options: ResumeOption[] = [
    {
      key: "en",
      title: t("english"),
      subtitle: "English",
      path: siteConfig.resumes.en.path,
      fileName: siteConfig.resumes.en.fileName,
    },
    {
      key: "vi",
      title: t("vietnamese"),
      subtitle: "Tiếng Việt",
      path: siteConfig.resumes.vi.path,
      fileName: siteConfig.resumes.vi.fileName,
    },
  ];

  const orderedOptions =
    locale === "vi" ? [...options].reverse() : options;

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [close, open]);

  const handleSelect = (option: ResumeOption) => {
    window.open(option.path, "_blank", "noopener,noreferrer");
    close();
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={className}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        {showIcon ? <Download className="size-3" /> : null}
        {label}
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="presentation"
          >
            <button
              type="button"
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              aria-label={t("close")}
              onClick={close}
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={spring}
              className="relative z-10 w-full max-w-md border border-white/10 bg-[#121214] p-6 shadow-2xl shadow-black/50 sm:p-8"
            >
              <button
                type="button"
                onClick={close}
                className="absolute right-4 top-4 text-muted-foreground transition-colors hover:text-foreground"
                aria-label={t("close")}
              >
                <X className="size-4" />
              </button>

              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#ff4500]">
                CV
              </p>
              <h2
                id={titleId}
                className="mt-2 text-xl font-medium tracking-tight text-foreground"
              >
                {t("title")}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">{t("subtitle")}</p>

              <div className="mt-6 flex flex-col gap-3">
                {orderedOptions.map((option) => (
                  <button
                    key={option.key}
                    type="button"
                    onClick={() => handleSelect(option)}
                    className="group flex items-center gap-4 border border-white/10 bg-white/[0.02] px-4 py-4 text-left transition-all duration-300 hover:border-[#ff4500]/40 hover:bg-[#ff4500]/5"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center border border-white/10 bg-white/[0.03] transition-colors group-hover:border-[#ff4500]/30 group-hover:text-[#ff4500]">
                      <FileText className="size-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium text-foreground">
                        {option.title}
                      </span>
                      <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                        {option.subtitle}
                      </span>
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground transition-colors group-hover:text-[#ff4500]">
                      {t("open")} ↗
                    </span>
                  </button>
                ))}
              </div>

              <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground/80">
                {t("hint")}
              </p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
