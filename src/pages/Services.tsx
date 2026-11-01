import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check, Wrench } from 'lucide-react';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { PageHero, HeroLines } from '../components/common/PageHero';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { Img } from '../components/common/Img';
import { ScrollReveal } from '../components/common/ScrollReveal';
import { images } from '../data/images';
import { services } from '../data/services';

export function Services() {
  useDocumentMeta({
    title: 'Roofing Services | Complete Roofing Solutions',
    description:
      'Explore professional roofing services in Ghana: Wood Works, Waterproofing, Galvanized Trusses, IBR Installation, Selflock Roofing, Leakage Repairs, and Free Technical Advice.',
    image: '/images/services-hero.jpg',
  });

  const [activeSection, setActiveSection] = useState<string>(services[0].slug);

  // Monitor scroll to update active service tab
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const service of services) {
        const el = document.getElementById(service.slug);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(service.slug);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* SECTION 1: SERVICES HERO */}
      <PageHero
        image={images.servicesHero}
        eyebrow="Capabilities & Scope"
        breadcrumb="Services"
        index="03 / 05"
        title={
          <HeroLines
            lines={['Roofing Solutions', 'For Every Structure.']}
            accentIndex={1}
          />
        }
        text="From roofing structures and metal sheet installation to waterproofing and repairs, explore the services offered by Trusted Roofing Systems for projects in Ghana."
      >
        <Button to="/contact#quote" variant="primary">
          Request a Quote
        </Button>
        <Button href="tel:0241924129" variant="outline-light">
          Call 0241924129
        </Button>
      </PageHero>

      {/* SECTION 2: STICKY HORIZONTAL SERVICE NAVIGATION BAR */}
      <nav
        aria-label="Service navigation"
        className="sticky top-20 z-30 border-y border-line bg-white/95 backdrop-blur-md transition-all shadow-sm"
      >
        <div className="container-x overflow-x-auto no-scrollbar py-3">
          <ul className="flex items-center gap-2 sm:gap-3 min-w-max">
            {services.map((s) => {
              const isActive = activeSection === s.slug;
              return (
                <li key={s.slug}>
                  <a
                    href={`#${s.slug}`}
                    className={`inline-flex items-center gap-2 px-3 sm:px-4 py-2 font-display text-xs font-semibold uppercase tracking-[0.15em] transition-all duration-300 ${
                      isActive
                        ? 'bg-navy text-amber shadow-sm'
                        : 'bg-transparent text-navy/70 hover:bg-bg hover:text-navy'
                    }`}
                  >
                    <span className={`text-[0.65rem] ${isActive ? 'text-amber' : 'text-blue'}`}>
                      {s.number}
                    </span>
                    <span>{s.shortTitle}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* SECTION 3: DETAILED SERVICE PRESENTATION (7 EDITORIAL SECTIONS) */}
      <div className="bg-bg">
        {services.map((service, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <section
              id={service.slug}
              key={service.slug}
              className={`relative scroll-mt-36 py-20 sm:py-28 lg:py-36 border-b border-line ${
                isEven ? 'bg-white' : 'bg-bg'
              }`}
              aria-labelledby={`service-title-${service.slug}`}
            >
              <div className="container-x relative">
                <div
                  className={`grid gap-12 lg:grid-cols-12 lg:gap-16 items-center ${
                    isEven ? '' : 'lg:[&>*:first-child]:order-2'
                  }`}
                >
                  {/* Image Column */}
                  <ScrollReveal className="lg:col-span-6">
                    <div className="relative overflow-hidden border border-line bg-navy p-3 sm:p-4 shadow-xl">
                      <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden bg-navy-900">
                        <Img
                          image={service.image}
                          className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
                        <div className="absolute top-5 left-5">
                          <span className="bg-amber px-3 py-1 font-display text-xs font-bold uppercase tracking-[0.2em] text-navy">
                            Service {service.number}
                          </span>
                        </div>
                        <div className="absolute bottom-5 left-5 right-5">
                          <p className="font-display text-xs uppercase tracking-[0.25em] text-white/70">
                            {service.label}
                          </p>
                          <p className="font-display text-lg font-bold uppercase text-white mt-1">
                            {service.title}
                          </p>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>

                  {/* Content Column */}
                  <div className="lg:col-span-6">
                    <ScrollReveal stagger={0.08}>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="font-display text-sm font-bold text-blue">
                          {service.number}
                        </span>
                        <span className="h-px w-8 bg-line" />
                        <span className="font-display text-xs uppercase tracking-[0.25em] text-muted">
                          {service.label}
                        </span>
                      </div>

                      <h2
                        id={`service-title-${service.slug}`}
                        className="display-md text-navy"
                      >
                        {service.title}
                      </h2>

                      <p className="mt-4 font-display text-base font-semibold text-blue sm:text-lg">
                        {service.intro}
                      </p>

                      <p className="mt-4 text-sm sm:text-base leading-relaxed text-muted">
                        {service.detail}
                      </p>

                      {/* Applications & Benefits Grid */}
                      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 border-y border-line py-6">
                        {/* Relevant Applications */}
                        <div>
                          <h3 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-navy mb-3 flex items-center gap-2">
                            <Wrench className="h-3.5 w-3.5 text-blue" />
                            Relevant Applications
                          </h3>
                          <ul className="space-y-2">
                            {service.applications.map((app) => (
                              <li key={app} className="flex items-start gap-2 text-xs sm:text-sm text-muted">
                                <span className="h-1.5 w-1.5 rounded-full bg-blue shrink-0 mt-2" />
                                <span>{app}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Potential Benefits */}
                        <div>
                          <h3 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-navy mb-3 flex items-center gap-2">
                            <Check className="h-3.5 w-3.5 text-amber" />
                            Potential Benefits
                          </h3>
                          <ul className="space-y-2">
                            {service.benefits.map((ben) => (
                              <li key={ben} className="flex items-start gap-2 text-xs sm:text-sm text-muted">
                                <span className="h-1.5 w-1.5 rounded-full bg-amber shrink-0 mt-2" />
                                <span>{ben}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Service Action Buttons */}
                      <div className="mt-8 flex flex-wrap items-center gap-4">
                        <Button
                          to={`/contact?service=${encodeURIComponent(service.formValue)}#quote`}
                          variant="primary"
                        >
                          Enquire About {service.shortTitle}
                        </Button>
                        <Button
                          to="/contact#contact-info"
                          variant="outline-dark"
                        >
                          Request Technical Advice
                        </Button>
                      </div>
                    </ScrollReveal>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* SECTION 4: RELATED SERVICES SHOWCASE */}
      <section className="relative bg-white py-24 sm:py-32" aria-labelledby="related-heading">
        <div className="container-x relative">
          <SectionHeading
            eyebrow="Complementary Solutions"
            title={
              <>
                Integrated Roofing <br />
                <span className="text-blue">Capabilities.</span>
              </>
            }
            text="Many projects combine multiple services—such as galvanized steel trusses paired with selflock or IBR sheets, alongside protective waterproofing."
            align="split"
          />

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Truss Framework + Sheet Installation',
                desc: 'Pair galvanized steel trusses with IBR or selflock roofing sheets for a cohesive structural package.',
                link: '/services#galvanized-trusses',
              },
              {
                title: 'Roofing Inspection + Leakage Repair',
                desc: 'Assess ceiling stains, joint fatigue, or loose fixings before water intrusion causes interior damage.',
                link: '/services#leakage-repairs',
              },
              {
                title: 'Flat Roof Waterproofing + Protection',
                desc: 'Apply waterproofing coatings to concrete slabs, parapet gutters, and flat roof surfaces prone to pooling.',
                link: '/services#waterproofing',
              },
            ].map((combo) => (
              <ScrollReveal
                key={combo.title}
                className="group border border-line bg-bg p-8 transition-all hover:border-navy hover:bg-white hover:shadow-md"
              >
                <h3 className="font-display text-lg font-bold uppercase text-navy group-hover:text-blue transition-colors">
                  {combo.title}
                </h3>
                <p className="mt-3 text-sm text-muted leading-relaxed">
                  {combo.desc}
                </p>
                <div className="mt-6 pt-4 border-t border-line">
                  <Link
                    to={combo.link}
                    className="inline-flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-[0.16em] text-navy group-hover:text-blue transition-colors"
                  >
                    <span>Learn More</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
