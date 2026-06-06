import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hung Nguyen — Senior Full Stack Developer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
