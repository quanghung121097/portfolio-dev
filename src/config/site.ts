export const siteConfig = {
  name: "Hung Nguyen",
  url: "https://nguyenvanquanghung.dev",
  ogImage: "/og-image.svg",
  role: "Full Stack Developer",
  contact: {
    email: "quanghung121097@gmail.com",
    phone: "+84 788 337 682",
    phoneDisplay: "0788 337 682",
    github: "https://github.com/quanghung121097",
    location: "Ha Noi, Vietnam",
  },
  resumePath: "/resume.pdf",
  resumeFileName: "Hung-Nguyen-Full-Stack-Developer.pdf",
} as const;

export type SiteConfig = typeof siteConfig;
