import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { PageHero, HeroLines } from '../components/common/PageHero';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { Img } from '../components/common/Img';
import { DemoNotice } from '../components/common/DemoNotice';
import { ScrollReveal } from '../components/common/ScrollReveal';
import { images } from '../data/images';
import { projects, projectFilters, type Project } from '../data/projects';

export function Projects() {
  useDocumentMeta({
    title: 'Our Projects | Roofing Portfolio & Inspiration',
    description:
      'View roofing project inspiration from Trusted Roofing Systems: residential metal roofs, commercial buildings, galvanized steel trusses, waterproofing, and repair work in Ghana.',
    image: '/images/projects-hero.jpg',
  });

  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Filter projects based on active selection
  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  // Lightbox navigation
  const currentIndex = selectedProject
    ? filteredProjects.findIndex((p) => p.id === selectedProject.id)
    : -1;

  const handleNext = useCallback(() => {
    if (currentIndex < 0) return;
    const nextIndex = (currentIndex + 1) % filteredProjects.length;
    setSelectedProject(filteredProjects[nextIndex]);
  }, [currentIndex, filteredProjects]);

  const handlePrev = useCallback(() => {
    if (currentIndex < 0) return;
    const prevIndex = (currentIndex - 1 + filteredProjects.length) % filteredProjects.length;
    setSelectedProject(filteredProjects[prevIndex]);
  }, [currentIndex, filteredProjects]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!selectedProject) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedProject, handleNext, handlePrev]);

  // Prevent background scroll when lightbox is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  return (
    <>
      {/* SECTION 1: PROJECT HERO */}
      <PageHero
        image={images.projectsHero}
        eyebrow="Architectural Showcase"
        breadcrumb="Our Projects"
        index="04 / 05"
        title={
          <HeroLines
            lines={['Built Projects.', 'Lasting Impressions.']}
            accentIndex={1}
          />
        }
        text="Explore roofing structures, installation details, and architectural roofing inspiration reflecting the standards and solutions offered by Trusted Roofing Systems."
      >
        <Button to="/contact#quote" variant="primary">
          Discuss Your Project
        </Button>
        <Button to="/services" variant="outline-light">
          Our Services
        </Button>
      </PageHero>

      {/* SECTION 2 & 3: CATEGORY FILTERS & EDITORIAL MASONRY GALLERY */}
      <section className="relative bg-white py-20 sm:py-28 lg:py-36" aria-labelledby="portfolio-heading">
        <div className="line-grid-light pointer-events-none absolute inset-0 opacity-40" aria-hidden />

        <div className="container-x relative">
          <SectionHeading
            eyebrow="Selected Portfolio"
            title={
              <>
                Engineered Roofs <br />
                <span className="text-blue">&amp; Steel Structures.</span>
              </>
            }
            text="Filter through our project categories to examine residential roofs, commercial spans, galvanized steel trusses, and waterproofing applications."
            align="split"
          />

          {/* Category Filter Buttons */}
          <div className="mt-12 flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 border-b border-line pb-6">
            {projectFilters.map((cat) => {
              const active = activeFilter === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveFilter(cat)}
                  className={`px-4 py-2.5 font-display text-xs font-semibold uppercase tracking-[0.16em] transition-all duration-300 ${
                    active
                      ? 'bg-navy text-amber shadow-sm'
                      : 'border border-line bg-bg text-navy/70 hover:border-navy hover:text-navy'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Asymmetric Masonry Gallery */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8">
            {filteredProjects.map((project, idx) => {
              // Asymmetric layout logic for masonry feel
              let colSpan = 'lg:col-span-4';
              let aspect = 'aspect-[4/3]';

              if (project.shape === 'wide') {
                colSpan = idx % 5 === 0 ? 'lg:col-span-8' : 'lg:col-span-6';
                aspect = 'aspect-[16/10]';
              } else if (project.shape === 'tall') {
                colSpan = 'lg:col-span-4';
                aspect = 'aspect-[4/5]';
              } else {
                colSpan = 'lg:col-span-4';
                aspect = 'aspect-square';
              }

              return (
                <ScrollReveal
                  key={project.id}
                  className={`${colSpan} group relative cursor-pointer overflow-hidden border border-line bg-navy-900 shadow-sm transition-all duration-500 hover:shadow-xl`}
                >
                  <div
                    onClick={() => setSelectedProject(project)}
                    className={`relative ${aspect} w-full overflow-hidden`}
                  >
                    <Img
                      image={project.image}
                      className="img-zoom h-full w-full object-cover"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/25 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                    {/* Category Tag */}
                    <div className="absolute top-5 left-5">
                      <span className="bg-navy/85 px-3 py-1 font-display text-[0.62rem] font-bold uppercase tracking-[0.2em] text-white border border-white/15 backdrop-blur-sm">
                        {project.category}
                      </span>
                    </div>

                    {/* Bottom Details & Expand Icon */}
                    <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                      <div className="max-w-[80%]">
                        <p className="font-display text-sm sm:text-base font-bold uppercase text-white line-clamp-2">
                          {project.image.alt}
                        </p>
                        <p className="mt-1 font-display text-[0.62rem] uppercase tracking-[0.2em] text-white/60">
                          Click to preview
                        </p>
                      </div>
                      <span className="grid h-10 w-10 shrink-0 place-items-center border border-white/25 bg-navy/70 text-white backdrop-blur-sm transition-colors group-hover:border-amber group-hover:text-amber">
                        <ZoomIn className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Empty state if any filter has 0 results */}
          {filteredProjects.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-muted">No projects found in this category.</p>
              <button
                type="button"
                onClick={() => setActiveFilter('All')}
                className="mt-4 font-display text-xs uppercase tracking-wider text-blue underline"
              >
                Reset filter
              </button>
            </div>
          )}

          {/* Demo transparency note */}
          <div className="mt-12 border-t border-line pt-6">
            <DemoNotice tone="light" />
          </div>
        </div>
      </section>

      {/* SECTION 4: INTERACTIVE LIGHTBOX MODAL */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Project Preview"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-950/95 p-4 sm:p-8 backdrop-blur-md"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setSelectedProject(null)}
            aria-label="Close project preview"
            className="absolute top-6 right-6 z-20 grid h-12 w-12 place-items-center border border-white/20 text-white transition-colors hover:border-amber hover:text-amber"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Prev button */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 grid h-12 w-12 place-items-center border border-white/20 text-white transition-colors hover:border-amber hover:text-amber"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Next button */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next image"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 grid h-12 w-12 place-items-center border border-white/20 text-white transition-colors hover:border-amber hover:text-amber"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Lightbox Content Container */}
          <div className="relative max-h-[90vh] w-full max-w-5xl overflow-hidden border border-white/15 bg-navy-900 shadow-2xl flex flex-col md:flex-row">
            {/* Image View */}
            <div className="relative max-h-[60vh] md:max-h-[85vh] md:w-2/3 overflow-hidden bg-black flex items-center justify-center">
              <img
                src={selectedProject.image.src}
                alt={selectedProject.image.alt}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            {/* Sidebar Details */}
            <div className="p-6 md:p-8 md:w-1/3 flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/10 text-white bg-navy-900">
              <div>
                <span className="bg-amber px-2.5 py-1 font-display text-[0.65rem] font-bold uppercase tracking-[0.2em] text-navy">
                  {selectedProject.category}
                </span>

                <h3 className="mt-4 font-display text-xl font-bold uppercase text-white">
                  {selectedProject.image.alt}
                </h3>

                <p className="mt-4 text-xs sm:text-sm text-white/70 leading-relaxed">
                  Representative roofing inspiration demonstrating roof profile, structural alignment, and craftsmanship suitable for Ghanaian construction projects.
                </p>

                <div className="mt-6 border-t border-white/10 pt-4 text-xs text-white/50 space-y-1.5">
                  <p>Item {currentIndex + 1} of {filteredProjects.length}</p>
                  <p>Use left/right arrows to navigate</p>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <Button
                  to="/contact#quote"
                  variant="primary"
                  className="w-full"
                  onClick={() => setSelectedProject(null)}
                >
                  Request Similar Solution
                </Button>
                <Button
                  variant="outline-light"
                  className="w-full"
                  onClick={() => setSelectedProject(null)}
                >
                  Close Preview
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
