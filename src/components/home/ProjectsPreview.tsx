import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '../../data/projects';
import { SectionHeading } from '../common/SectionHeading';
import { Button } from '../common/Button';
import { Img } from '../common/Img';
import { DemoNotice } from '../common/DemoNotice';
import { ScrollReveal } from '../common/ScrollReveal';

/**
 * HOME — Section 5: Project Showcase
 * Editorial preview of selected architectural roofing work across categories.
 */
export function ProjectsPreview() {
  // Take a curated selection of 5 varied projects for the homepage editorial grid
  const previewProjects = [projects[0], projects[1], projects[2], projects[3], projects[6]];

  return (
    <section className="relative bg-navy py-24 text-white sm:py-32 lg:py-40" aria-labelledby="projects-preview-title">
      <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-30" aria-hidden />

      <div className="container-x relative">
        <SectionHeading
          tone="dark"
          eyebrow="Selected Work"
          title={
            <>
              Our Work Speaks <br />
              <span className="text-amber">For Itself.</span>
            </>
          }
          text="Explore roofing styles, structural details, and installation work inspired by the projects we undertake across Ghana."
          align="split"
          action={
            <Button to="/projects" variant="primary">
              Explore Our Projects
            </Button>
          }
        />

        {/* Asymmetrical Gallery Grid */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Card 1: Featured Large (col-span-7) */}
          <ScrollReveal className="group relative overflow-hidden bg-navy-800 lg:col-span-7">
            <Link to="/projects" className="block h-full">
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Img image={previewProjects[0].image} className="img-zoom h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/30 to-transparent" />
                <div className="absolute left-6 top-6">
                  <span className="bg-amber px-3 py-1 font-display text-[0.65rem] font-bold uppercase tracking-[0.2em] text-navy">
                    {previewProjects[0].category}
                  </span>
                </div>
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                  <div>
                    <p className="font-display text-xl font-bold uppercase text-white sm:text-2xl">
                      {previewProjects[0].image.alt}
                    </p>
                    <p className="mt-1 font-display text-xs uppercase tracking-[0.25em] text-white/60">
                      Representative Project Inspiration
                    </p>
                  </div>
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-none border border-white/25 bg-navy/60 text-white backdrop-blur-sm transition-colors group-hover:border-amber group-hover:text-amber">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </div>
              </div>
            </Link>
          </ScrollReveal>

          {/* Card 2: Steel Structure (col-span-5) */}
          <ScrollReveal className="group relative overflow-hidden bg-navy-800 lg:col-span-5">
            <Link to="/projects" className="block h-full">
              <div className="relative aspect-[16/10] lg:aspect-auto lg:h-full w-full overflow-hidden">
                <Img image={previewProjects[1].image} className="img-zoom h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/30 to-transparent" />
                <div className="absolute left-6 top-6">
                  <span className="bg-blue px-3 py-1 font-display text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white">
                    {previewProjects[1].category}
                  </span>
                </div>
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                  <div>
                    <p className="font-display text-lg font-bold uppercase text-white sm:text-xl">
                      {previewProjects[1].image.alt}
                    </p>
                    <p className="mt-1 font-display text-xs uppercase tracking-[0.25em] text-white/60">
                      Representative Project Inspiration
                    </p>
                  </div>
                  <span className="grid h-12 w-12 shrink-0 place-items-center border border-white/25 bg-navy/60 text-white backdrop-blur-sm transition-colors group-hover:border-amber group-hover:text-amber">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </div>
              </div>
            </Link>
          </ScrollReveal>

          {/* Row 2: Three equal cards (col-span-4 each) */}
          {previewProjects.slice(2, 5).map((proj) => (
            <ScrollReveal key={proj.id} className="group relative overflow-hidden bg-navy-800 lg:col-span-4">
              <Link to="/projects" className="block h-full">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Img image={proj.image} className="img-zoom h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/30 to-transparent" />
                  <div className="absolute left-5 top-5">
                    <span className="bg-white/10 px-2.5 py-1 font-display text-[0.62rem] font-medium uppercase tracking-[0.2em] text-white/90 backdrop-blur-sm border border-white/15">
                      {proj.category}
                    </span>
                  </div>
                  <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                    <div>
                      <p className="font-display text-base font-bold uppercase text-white line-clamp-1">
                        {proj.image.alt}
                      </p>
                    </div>
                    <span className="grid h-9 w-9 shrink-0 place-items-center border border-white/25 bg-navy/60 text-white backdrop-blur-sm transition-colors group-hover:border-amber group-hover:text-amber">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* Demo transparency note */}
        <div className="mt-10 border-t border-white/10 pt-6">
          <DemoNotice tone="dark" />
        </div>
      </div>
    </section>
  );
}
