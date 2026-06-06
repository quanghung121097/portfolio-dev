export const siteConfig = {
  name: "Hung Nguyen",
  url: "https://hungnguyen.dev",
  ogImage: "/og-image.svg",
  role: "Full Stack Developer",
  contact: {
    email: "quanghung121097@gmail.com",
    phone: "+84 989 523 497",
    phoneDisplay: "0989 523 497",
    github: "https://github.com/quang-hung",
    location: "Ha Noi, Vietnam",
  },
  resumePath: "/resume.pdf",
  resumeFileName: "Hung-Nguyen-Full-Stack-Developer.pdf",
} as const;

export type SiteConfig = typeof siteConfig;
