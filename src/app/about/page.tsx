import AboutSection from "@/components/blocks/AboutSection";
import AboutProject from "@/components/blocks/about/AboutProject";

export default function AboutPage() {
  return (
    <>
      <AboutProject />
      
      {/* Если ставить секцию на первое место, тогда заменить variant="default" на variant="first-section" */}
      <AboutSection variant="default" />
    </>
  );
}
