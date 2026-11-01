import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { HeroSection } from '../components/home/HeroSection';
import { StorytellingSection } from '../components/home/StorytellingSection';
import { EngineeringSection } from '../components/home/EngineeringSection';
import { ServicesPreview } from '../components/home/ServicesPreview';
import { ProjectsPreview } from '../components/home/ProjectsPreview';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { HomeFinalCTA } from '../components/home/HomeFinalCTA';

export function Home() {
  useDocumentMeta({
    title: 'Engineered Roofing. Built to Last',
    description:
      'Trusted Roofing Systems provides professional roofing solutions, galvanized trusses, IBR and selflock installation, waterproofing, and technical advice in Ghana.',
    image: '/images/hero-modern-roof.jpg',
  });

  return (
    <>
      {/* 1. Cinematic Hero */}
      <HeroSection />

      {/* 2. Pinned Scroll Storytelling (From Structure to Strength) */}
      <StorytellingSection />

      {/* 3. Pinned Engineering Excellence (Blueprint to Finished Roof) */}
      <EngineeringSection />

      {/* 4. Complete Roofing Services (Editorial 7-Service Grid) */}
      <ServicesPreview />

      {/* 5. Project Showcase (Editorial Portfolio Grid) */}
      <ProjectsPreview />

      {/* 6. Why Choose Trusted Roofing Systems (Split Layout) */}
      <WhyChooseUs />

      {/* 7. Final Quote CTA (Full-Width Cinematic Closing) */}
      <HomeFinalCTA />
    </>
  );
}
