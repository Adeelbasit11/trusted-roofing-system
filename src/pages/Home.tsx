import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { HeroSection } from '../components/home/HeroSection';
import { StorytellingSection } from '../components/home/StorytellingSection';
import { EngineeringSection } from '../components/home/EngineeringSection';
import { ServicesPreview } from '../components/home/ServicesPreview';
import { ProjectsPreview } from '../components/home/ProjectsPreview';
import { WhyChooseUs } from '../components/home/WhyChooseUs';

export function Home() {
  useDocumentMeta({
    title: 'Engineered Roofing. Built to Last',
    description:
      'Trusted Roofing Systems provides professional roofing solutions, galvanized trusses, IBR and selflock installation, waterproofing, and technical advice in Ghana.',
    image: '/images/hero-section-image.png',
  });

  return (
    <>
      {/* Immersive Dark Sequence (Hero -> Storytelling -> Engineering) with unified navy backing to prevent any scroll flashes */}
      <div className="bg-navy">
        {/* 1. Cinematic Hero */}
        <HeroSection />

         {/* 2. Complete Roofing Services (8 Equally Sized Cards Grid) */}
      <ServicesPreview />

        {/* 3. Pinned Scroll Storytelling (From Structure to Strength) */}
        <StorytellingSection />

        {/* 4. Pinned Engineering Excellence (Blueprint to Finished Roof) */}
        <EngineeringSection />
      </div>

      {/* 5. Project Showcase (Editorial Portfolio Grid) */}
      <ProjectsPreview />

      {/* 6. Why Choose Trusted Roofing Systems (Split Layout) */}
      <WhyChooseUs />
    </>
  );
}
