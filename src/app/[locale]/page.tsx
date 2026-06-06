import { setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/sections/hero";
import { CompaniesSection } from "@/components/sections/companies";
import { AboutSection } from "@/components/sections/about";
import { TechStackSection } from "@/components/sections/tech-stack";
import { ProjectsSection } from "@/components/sections/projects";
import { ExperienceSection } from "@/components/sections/experience";
import { AIEngineeringSection } from "@/components/sections/ai-engineering";
import { StatisticsSection } from "@/components/sections/statistics";
import { ContactSection } from "@/components/sections/contact";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <CompaniesSection />
      <AboutSection />
      <TechStackSection />
      <ProjectsSection featured />
      <ExperienceSection />
      <AIEngineeringSection />
      <StatisticsSection />
      <ContactSection />
    </>
  );
}
