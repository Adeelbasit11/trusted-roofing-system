import { useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/gsap';
import { images } from '../../data/images';
import { Img } from '../common/Img';
import { Button } from '../common/Button';
import { ScrollReveal } from '../common/ScrollReveal';
import { ShieldCheck, Hammer, Layers, Compass } from 'lucide-react';

const pillars = [
  {
    num: '01',
    title: 'Roofing Solutions',
    text: 'Explore a complete suite of roofing services tailored to both residential buildings and commercial properties throughout Ghana.',
    icon: ShieldCheck,
  },
  {
    num: '02',
    title: 'Structural Roofing',
    text: 'Structural capabilities spanning custom wood works and engineered galvanized steel trusses that form a dependable roof framework.',
    icon: Hammer,
  },
  {
    num: '03',
    title: 'Installation Services',
    text: 'Precision installation of IBR trapezoidal sheets and modern selflock concealed-fix metal roofing systems built for clean finishes.',
    icon: Layers,
  },
  {
    num: '04',
    title: 'Technical Guidance',
    text: 'Dedicated technical advice to help property owners, builders, and architects select suitable roofing systems before construction begins.',
    icon: Compass,
  },
];

/**
 * HOME — Section 6: Why Choose Trusted Roofing Systems
 * Premium split-layout with structural photograph left and 4 editorial pillars right.
 */
export function WhyChooseUs() {
  const imgRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !imgRef.current) return;
      gsap.to(imgRef.current, {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: imgRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    },
    { scope: imgRef },
  );

  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-32 lg:py-40" aria-labelledby="why-title">
      <div className="line-grid-light pointer-events-none absolute inset-0 opacity-30" aria-hidden />

      <div className="container-x relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-center">
          {/* Left Column: Framed Image with Parallax */}
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden border border-line bg-navy p-3 sm:p-4 shadow-xl">
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-navy-900">
                <div ref={imgRef} className="h-[115%] w-full -mt-[8%]">
                  <Img
                    image={images.whyStructural}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-center sm:text-left">
                  <p className="font-display text-xs uppercase tracking-[0.25em] text-amber">
                    Structural Strength
                  </p>
                  <p className="font-display text-lg font-bold uppercase text-white mt-1">
                    Engineered Frameworks & Installation
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Editorial Content Blocks */}
          <div className="lg:col-span-7 text-center sm:text-left">
            <ScrollReveal stagger={0.1}>
              <p data-reveal className="eyebrow mb-5 text-blue">
                Why Trusted Roofing Systems
              </p>
              <h2 data-reveal id="why-title" className="display-lg text-navy">
                Built on Trust. <br />
                <span className="text-blue">Defined by Quality.</span>
              </h2>
              <p data-reveal className="lede mt-6 text-muted max-w-xl mx-auto sm:mx-0">
                Explore roofing solutions, installation services, and technical guidance designed around your building requirements.
              </p>
            </ScrollReveal>

            {/* Content Pillars */}
            <div className="mt-12 divide-y divide-line border-y border-line">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <ScrollReveal
                    key={pillar.num}
                    className="group py-7 sm:py-8 transition-colors hover:bg-bg/50 px-2 sm:px-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6 items-baseline">
                      <div className="sm:col-span-4 flex items-center justify-center sm:justify-start gap-3">
                        <span className="font-display text-xs font-bold text-amber">
                          {pillar.num}
                        </span>
                        <h3 className="font-display text-lg font-bold uppercase text-navy group-hover:text-blue transition-colors">
                          {pillar.title}
                        </h3>
                      </div>
                      <div className="sm:col-span-8 flex items-start justify-center sm:justify-start gap-4">
                        <p className="text-sm leading-relaxed text-muted sm:text-[0.95rem]">
                          {pillar.text}
                        </p>
                        <span className="hidden sm:grid h-9 w-9 shrink-0 place-items-center bg-bg text-navy group-hover:bg-blue group-hover:text-white transition-colors">
                          <Icon className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>

            <ScrollReveal className="mt-10 flex flex-wrap justify-center sm:justify-start gap-4">
              <Button to="/contact#quote" variant="primary">
                Discuss Your Requirements
              </Button>
              <Button to="/services" variant="outline-dark">
                View All Capabilities
              </Button>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
