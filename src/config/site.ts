export const siteConfig = {
  name: "Nguyễn Văn Quang Hưng",
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
  resumes: {
    en: {
      path: "/Hung-Nguyen-CV-English.pdf",
      previewPath: "/NguyenVanQuangHung_CV.html",
      fileName: "Hung-Nguyen-CV-English.pdf",
    },
    vi: {
      path: "/Hung-Nguyen-CV-Tieng-Viet.pdf",
      previewPath: "/NguyenVanQuangHung_CV_VI.html",
      fileName: "Hung-Nguyen-CV-Tieng-Viet.pdf",
    },
  },
} as const;

export type SiteConfig = typeof siteConfig;
