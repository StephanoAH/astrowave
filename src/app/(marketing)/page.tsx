import { HeroSection } from "@/components/marketing/HeroSection";
import { ModulesSection } from "@/components/marketing/ModulesSection";
import { HowItWorksFlow } from "@/components/marketing/HowItWorksFlow";
import { MissionPreviewSection } from "@/components/marketing/MissionPreviewSection";
import { SpaceAtmosphere } from "@/components/marketing/SpaceAtmosphere";

export default function LandingPage() {
  return (
    <>
      <SpaceAtmosphere />
      <HeroSection />
      <ModulesSection />
      <HowItWorksFlow />
      <MissionPreviewSection />
    </>
  );
}
