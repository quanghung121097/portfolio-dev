export const PROJECT_KEYS = [
  "vuongkimbao",
  "heva",
  "vanecom",
  "coolmate",
  "jindo",
  "adstart",
  "onsight",
  "tobilaphone",
  "bizfly",
  "remoteoffer",
] as const;

export const FEATURED_PROJECT_KEYS = [
  "coolmate",
  "heva",
  "vuongkimbao",
  "bizfly",
] as const;

export type ProjectKey = (typeof PROJECT_KEYS)[number];

export const projectGradients: Record<ProjectKey, string> = {
  vanecom: "from-violet-600/40 via-purple-600/30 to-indigo-600/20",
  heva: "from-pink-600/40 via-rose-600/30 to-orange-600/20",
  vuongkimbao: "from-yellow-600/40 via-amber-600/30 to-orange-600/20",
  coolmate: "from-blue-600/40 via-indigo-600/30 to-violet-600/20",
  jindo: "from-amber-600/40 via-orange-600/30 to-red-600/20",
  adstart: "from-emerald-600/40 via-teal-600/30 to-cyan-600/20",
  onsight: "from-sky-600/40 via-blue-600/30 to-indigo-600/20",
  tobilaphone: "from-slate-600/40 via-zinc-600/30 to-neutral-600/20",
  bizfly: "from-cyan-600/40 via-blue-600/30 to-indigo-600/20",
  remoteoffer: "from-green-600/40 via-emerald-600/30 to-teal-600/20",
};

export const projectUrls: Partial<Record<ProjectKey, string>> = {
  // vanecom: "https://vanecom.vn",
  heva: "https://apps.apple.com/vn/app/heva-c%E1%BA%AFt-t%C3%B3c-m%E1%BA%B9-b%C3%A9-t%E1%BA%A1i-nh%C3%A0/id6753140475",
  vuongkimbao:
    "https://apps.apple.com/vn/app/v%C6%B0%C6%A1ng-kim-b%E1%BA%A3o/id6754622962?l=vi",
  adstart: "https://jp.ad-start.ai",
  bizfly: "https://bizfly.vn",
  remoteoffer: "https://remote-jobs.jp",
  coolmate: "https://www.coolmate.me",
};
