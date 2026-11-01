import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { services } from '../../data/services';
import { SectionHeading } from '../common/SectionHeading';
import { Button } from '../common/Button';
import { Img } from '../common/Img';
import { ScrollReveal } from '../common/ScrollReveal';

/**
 * HOME — Section 4: Our Roofing Services
 * 8 Modern Classic Architectural Service Cards arranged in 2 equal rows of 4.
 * - Default state features vivid dual gradient borders (top & bottom),
 *   styled blue title, specification chips, and solid amber action buttons.
 * - Hover state triggers cinematic light shimmer sweep, 3D elevation,
 *   image scale, button color-inversion, and radiant amber ring glow.
 */
export function ServicesPreview() {
  return (
    <section className="relative bg-[#F8FAFC] py-24 sm:py-32 lg:py-36 overflow-hidden" aria-labelledby="services-preview-title">
      {/* Background Architectural Grid Pattern */}
      <div className="line-grid-light pointer-events-none absolute inset-0 opacity-60" aria-hidden />

      <div className="container-x relative">
        <SectionHeading
          eyebrow="Engineered Capabilities"
          title={
            <>
              Precision Roofing <br />
              <span className="text-blue">Solutions.</span>
            </>
          }
          text="Explore our complete catalogue of engineered metal roofing, structural steel frameworks, and waterproofing solutions. Built with architectural rigor to withstand Ghana’s toughest tropical climates."
          align="split"
          action={
            <Button to="/services" variant="primary">
              View All Services
            </Button>
          }
        />

        {/* 8 Modern Classic Cards (2 Equal Rows of 4 on Desktop) */}
        <div className="mt-16 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7 xl:gap-8">
          {services.map((service, index) => (
            <ScrollReveal
              key={service.slug}
              delay={index * 0.05}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-300/80 bg-white shadow-[0_14px_40px_2px_rgba(16,29,58,0.22),0_0_22px_2px_rgba(23,100,232,0.12)] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-3 hover:border-blue/60 hover:shadow-[0_28px_65px_6px_rgba(23,100,232,0.32),0_0_30px_4px_rgba(16,29,58,0.18)]"
            >
              {/* TOP DUAL GRADIENT ACCENT BORDER (DEFAULT VISIBLE) */}
              <div className="relative top-0 left-0 right-0 h-[4px] w-full bg-gradient-to-r from-blue via-blue-600 to-amber z-20 transition-all duration-300 group-hover:brightness-125" />

              <div>
                {/* Visual Stage (Image + Shimmer + Technical Badge Overlays) */}
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-navy-900 after:absolute after:inset-0 after:-translate-x-full group-hover:after:translate-x-full after:bg-gradient-to-r after:from-transparent after:via-white/30 after:to-transparent after:transition-transform after:duration-1000 after:pointer-events-none">
                  <Img
                    image={service.image}
                    className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-112"
                  />

                  {/* Subtle Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-900/25 to-transparent transition-opacity duration-500 group-hover:opacity-75" />

                  {/* Top Floating Badges */}
                  <div className="absolute left-3.5 top-3.5 right-3.5 flex items-center justify-between z-10">
                    {/* Number Badge with Live Pulse Indicator */}
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/95 px-2.5 py-1 text-navy shadow-sm backdrop-blur-md">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber animate-pulse" />
                      <span className="font-display text-[0.68rem] font-bold tracking-wider">{service.number}</span>
                    </span>

                    {/* Category Label */}
                    <span className="rounded-lg bg-navy/90 px-2.5 py-1 font-display text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md border border-white/10">
                      {service.label}
                    </span>
                  </div>

                  {/* Corner Engineering Reticle Crosshair */}
                  <div className="pointer-events-none absolute bottom-2.5 right-2.5 font-mono text-[0.6rem] text-white/50 tracking-widest uppercase">
                    + TRS // {service.number}
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-5 sm:p-6 text-center sm:text-left">
                  {/* Service Title (Default Blue / Bold Classic) */}
                  <h3 className="font-display text-lg font-bold uppercase tracking-tight text-blue transition-colors duration-300 group-hover:text-navy sm:text-[1.15rem]">
                    <Link to={`/services#${service.slug}`}>
                      {service.title}
                    </Link>
                  </h3>

                  {/* Editorial Summary */}
                  <p className="mt-2.5 line-clamp-2 text-[0.85rem] leading-relaxed text-muted transition-colors duration-300 group-hover:text-ink">
                    {service.summary}
                  </p>

                  {/* Micro Specification Chips (Default Styled) */}
                  <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-1.5">
                    {service.applications.slice(0, 2).map((app, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 rounded-md bg-blue/[0.04] px-2.5 py-1 text-[0.68rem] font-medium text-navy/85 border border-blue/20 transition-all duration-300 group-hover:border-amber/40 group-hover:bg-amber/[0.06]"
                      >
                        <CheckCircle2 className="h-2.5 w-2.5 text-amber shrink-0" />
                        <span className="truncate max-w-[120px]">{app}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-5 sm:p-6 pt-0">
                <div className="flex items-center justify-between border-t border-slate-100 pt-3.5">
                  <Link
                    to={`/services#${service.slug}`}
                    className="inline-flex items-center gap-1.5 font-display text-[0.72rem] font-bold uppercase tracking-[0.16em] text-blue transition-colors duration-300 group-hover:text-navy"
                  >
                    <span>View Specifications</span>
                  </Link>

                  {/* Solid Amber Button with Hover Inversion & Pulse Ring */}
                  <Link
                    to={`/services#${service.slug}`}
                    aria-label={`View specifications for ${service.title}`}
                    className="grid h-8 w-8 place-items-center rounded-full bg-amber text-navy font-bold shadow-[0_3px_12px_rgba(245,166,35,0.4)] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:bg-navy group-hover:text-amber group-hover:rotate-45 group-hover:scale-115 group-hover:ring-4 group-hover:ring-amber/30"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* BOTTOM DUAL GRADIENT ACCENT BORDER (DEFAULT VISIBLE) */}
              <div className="relative bottom-0 left-0 right-0 h-[4px] w-full bg-gradient-to-r from-amber via-blue-600 to-blue z-20 transition-all duration-300 group-hover:brightness-125" />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
