import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { services } from '../../data/services';
import { SectionHeading } from '../common/SectionHeading';
import { Button } from '../common/Button';
import { Img } from '../common/Img';
import { ScrollReveal } from '../common/ScrollReveal';

/**
 * HOME — Section 4: Our Roofing Services
 * Editorial image-led grid displaying all seven services.
 * Features mixed card proportions (asymmetrical editorial composition),
 * service numbers, technical tags, hover zoom, and links to detailed sections.
 */
export function ServicesPreview() {
  return (
    <section className="relative bg-bg py-24 sm:py-32 lg:py-40" aria-labelledby="services-preview-title">
      <div className="line-grid-light pointer-events-none absolute inset-0 opacity-40" aria-hidden />

      <div className="container-x relative">
        <SectionHeading
          eyebrow="What We Do"
          title={
            <>
              Complete Roofing <br />
              <span className="text-blue">Solutions.</span>
            </>
          }
          text="Explore professional roofing and structural solutions designed around your project requirements. Every service is delivered with attention to structural integrity and quality installation."
          align="split"
          action={
            <Button to="/services" variant="primary">
              View All Services
            </Button>
          }
        />

        {/* Editorial Asymmetric Grid */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {services.map((service, index) => {
            // Asymmetrical grid column spans across 7 services:
            // Row 1: Wood Works (col-span-7) + Waterproofing (col-span-5)
            // Row 2: Galvanized Trusses (col-span-4) + IBR Installation (col-span-4) + Selflock Roofing (col-span-4)
            // Row 3: Fixing of Leakages (col-span-6) + Free Technical Advice (col-span-6)
            let colSpan = 'lg:col-span-4';
            let aspect = 'aspect-[16/11]';
            if (index === 0) {
              colSpan = 'lg:col-span-7';
              aspect = 'aspect-[16/10]';
            } else if (index === 1) {
              colSpan = 'lg:col-span-5';
              aspect = 'aspect-[16/10]';
            } else if (index === 5 || index === 6) {
              colSpan = 'lg:col-span-6';
              aspect = 'aspect-[16/10]';
            }

            return (
              <ScrollReveal
                key={service.slug}
                className={`${colSpan} group relative flex flex-col justify-between overflow-hidden border border-line bg-white transition-[border-color,box-shadow] duration-500 hover:border-blue/40 hover:shadow-[0_20px_50px_-20px_rgba(16,29,58,0.15)]`}
              >
                {/* Image Container with Zoom */}
                <div className={`relative ${aspect} w-full overflow-hidden bg-navy-900`}>
                  <Img
                    image={service.image}
                    className="img-zoom h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/30 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute left-5 top-5 right-5 flex items-center justify-between">
                    <span className="font-display text-xs font-bold text-amber">
                      {service.number}
                    </span>
                    <span className="bg-navy/80 px-2.5 py-1 font-display text-[0.62rem] uppercase tracking-[0.2em] text-white/90 backdrop-blur-sm">
                      {service.label}
                    </span>
                  </div>

                  {/* Title over Image on Mobile/Desktop */}
                  <div className="absolute bottom-5 left-5 right-5">
                    <h3 className="font-display text-xl font-bold uppercase tracking-tight text-white sm:text-2xl">
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Content Panel */}
                <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                  <p className="text-sm leading-relaxed text-muted sm:text-[0.95rem]">
                    {service.summary}
                  </p>

                  <div className="mt-6 flex items-center justify-between border-t border-line/80 pt-5">
                    <Link
                      to={`/services#${service.slug}`}
                      className="inline-flex items-center gap-2 font-display text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-navy transition-colors group-hover:text-blue"
                    >
                      <span>Explore Service</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-blue" />
                    </Link>
                    <Link
                      to={`/contact?service=${encodeURIComponent(service.formValue)}#quote`}
                      className="font-display text-[0.7rem] uppercase tracking-[0.18em] text-muted hover:text-amber transition-colors"
                    >
                      Enquire
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
