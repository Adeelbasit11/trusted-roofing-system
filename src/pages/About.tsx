import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2, Target, Eye } from 'lucide-react';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { PageHero, HeroLines } from '../components/common/PageHero';
import { CTABanner } from '../components/common/CTABanner';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { Img } from '../components/common/Img';
import { ScrollReveal } from '../components/common/ScrollReveal';
import { images } from '../data/images';
import { services } from '../data/services';
import { business } from '../data/business';

const processSteps = [
  {
    step: '01',
    title: 'Consultation',
    desc: 'Understand the customer’s roofing requirements, architectural style, and project timeline through an initial discussion.',
  },
  {
    step: '02',
    title: 'Assessment',
    desc: 'Discuss the building structure, site conditions, and specific roof support needs (wood rafters or steel trusses).',
  },
  {
    step: '03',
    title: 'Planning',
    desc: 'Consider suitable roofing profiles (IBR or selflock), required flashing details, and material choices.',
  },
  {
    step: '04',
    title: 'Installation',
    desc: 'Present the relevant roofing installation services carried out with focus on alignment, fixings, and waterproofing.',
  },
  {
    step: '05',
    title: 'Completion',
    desc: 'Bring the roofing work to its intended finish, with careful review to ensure clean lines and solid water protection.',
  },
];

export function About() {
  useDocumentMeta({
    title: 'About Us | Building Trust Above Every Roof',
    description:
      'Learn about Trusted Roofing Systems, a Ghana-based roofing solutions business specializing in metal roofing, galvanized trusses, waterproofing, and technical advice.',
    image: '/images/about-hero.jpg',
  });

  return (
    <>
      {/* SECTION 1: ABOUT HERO */}
      <PageHero
        image={images.aboutHero}
        eyebrow="About Trusted Roofing Systems"
        breadcrumb="About Us"
        index="02 / 05"
        title={
          <HeroLines
            lines={['Building Trust', 'Above Every Roof.']}
            accentIndex={1}
          />
        }
        text="Discover Trusted Roofing Systems and our approach to roofing, structural solutions, and installation services designed for residential and commercial projects in Ghana."
      >
        <Button to="/contact#quote" variant="primary">
          Get a Free Quote
        </Button>
        <Button to="/services" variant="outline-light">
          Our Services
        </Button>
      </PageHero>

      {/* SECTION 2: COMPANY INTRODUCTION (SPLIT SCREEN) */}
      <section className="relative bg-white py-24 sm:py-32 lg:py-40" aria-labelledby="intro-heading">
        <div className="line-grid-light pointer-events-none absolute inset-0 opacity-40" aria-hidden />

        <div className="container-x relative">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-center">
            {/* Left Column: Image with frame */}
            <ScrollReveal className="lg:col-span-6">
              <div className="relative overflow-hidden border border-line bg-navy p-3 sm:p-4 shadow-xl">
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-navy-900">
                  <Img image={images.aboutIntro} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="font-display text-xs uppercase tracking-[0.25em] text-amber">
                      On-Site Dedication
                    </p>
                    <p className="font-display text-lg font-bold uppercase text-white mt-1">
                      Professional Consultation & Structural Assessment
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Right Column: Text Layout */}
            <div className="lg:col-span-6">
              <ScrollReveal stagger={0.1}>
                <p data-reveal className="eyebrow mb-5 text-blue">
                  Company Introduction
                </p>
                <h2 data-reveal id="intro-heading" className="display-lg text-navy">
                  A Commitment to <br />
                  <span className="text-blue">Roofing Quality.</span>
                </h2>
                <p data-reveal className="lede mt-6 text-muted">
                  <strong className="text-navy">{business.name}</strong> is a Ghana-based roofing solutions business dedicated to providing dependable roofing frameworks, sheet installations, and maintenance services.
                </p>
                <p data-reveal className="mt-4 text-sm sm:text-base leading-relaxed text-muted">
                  Whether constructing a new residential home, setting up a commercial warehouse, or addressing persistent leakages on an existing building, our work centers on delivering reliable structural strength and practical roofing solutions.
                </p>

                {/* Scope checklist */}
                <div data-reveal className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 border-y border-line py-6">
                  {[
                    'Roofing Systems & Planning',
                    'Metal Roofing Profiles',
                    'Wood Works & Carpentry',
                    'Galvanized Steel Trusses',
                    'Roof Waterproofing',
                    'IBR Sheet Installation',
                    'Selflock Concealed Roofing',
                    'Free Technical Advice',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2.5 text-sm text-navy font-medium">
                      <CheckCircle2 className="h-4 w-4 text-amber shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div data-reveal className="mt-8 flex items-center gap-6">
                  <div>
                    <span className="font-display text-2xl font-bold text-navy">Ghana</span>
                    <span className="block text-xs uppercase tracking-[0.2em] text-muted">Primary Market</span>
                  </div>
                  <div className="h-10 w-px bg-line" />
                  <div>
                    <span className="font-display text-2xl font-bold text-navy">7 Services</span>
                    <span className="block text-xs uppercase tracking-[0.2em] text-muted">Specialized Scope</span>
                  </div>
                  <div className="h-10 w-px bg-line" />
                  <div>
                    <span className="font-display text-2xl font-bold text-navy">Quality</span>
                    <span className="block text-xs uppercase tracking-[0.2em] text-muted">You Can Trust</span>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: MISSION AND VISION (DISTINCTIVE CONTENT PANELS) */}
      <section className="relative bg-bg py-24 sm:py-32" aria-labelledby="mission-heading">
        <div className="container-x relative">
          <SectionHeading
            eyebrow="Direction & Purpose"
            title={
              <>
                Our Mission <br />
                <span className="text-blue">&amp; Vision.</span>
              </>
            }
            text="Proposed brand statements for demonstration, designed around professional roofing delivery and customer confidence."
            align="split"
          />

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Panel 1: Mission */}
            <ScrollReveal className="relative overflow-hidden border border-line bg-white p-8 sm:p-12 shadow-sm transition-all duration-300 hover:border-blue/30 hover:shadow-md">
              <div className="flex items-center gap-4 mb-6">
                <span className="grid h-12 w-12 place-items-center bg-blue/10 text-blue">
                  <Target className="h-6 w-6" />
                </span>
                <span className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-blue">
                  Proposed Brand Statement
                </span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase text-navy">
                Our Mission
              </h3>
              <blockquote className="mt-6 border-l-2 border-amber pl-5 text-lg sm:text-xl font-display font-medium leading-relaxed text-navy italic">
                “To provide roofing solutions and services that respond to the structural and practical requirements of each project.”
              </blockquote>
              <p className="mt-6 text-sm text-muted leading-relaxed">
                We believe that every structure has distinct requirements—from slope and wind exposure to architectural design—requiring careful planning and tailored installation.
              </p>
            </ScrollReveal>

            {/* Panel 2: Vision */}
            <ScrollReveal className="relative overflow-hidden border border-line bg-navy p-8 sm:p-12 text-white shadow-sm transition-all duration-300 hover:border-amber/30 hover:shadow-md">
              <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-20" aria-hidden />
              <div className="relative">
                <div className="flex items-center gap-4 mb-6">
                  <span className="grid h-12 w-12 place-items-center bg-amber/20 text-amber">
                    <Eye className="h-6 w-6" />
                  </span>
                  <span className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-amber">
                    Proposed Brand Statement
                  </span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase text-white">
                  Our Vision
                </h3>
                <blockquote className="mt-6 border-l-2 border-amber pl-5 text-lg sm:text-xl font-display font-medium leading-relaxed text-white/95 italic">
                  “To build customer confidence through professional roofing solutions, quality-focused work, and reliable technical guidance.”
                </blockquote>
                <p className="mt-6 text-sm text-white/70 leading-relaxed">
                  Striving to establish a long-standing reputation across Ghana as a dependable partner for residential owners, commercial developers, and builders.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SECTION 4: OUR EXPERTISE (NUMBERED EDITORIAL CARDS) */}
      <section className="relative bg-white py-24 sm:py-32" aria-labelledby="expertise-heading">
        <div className="container-x relative">
          <SectionHeading
            eyebrow="Specialized Capabilities"
            title={
              <>
                Our Technical <br />
                <span className="text-blue">Expertise.</span>
              </>
            }
            text="Every service is shaped by practical knowledge in roofing frameworks, modern sheeting, waterproofing treatments, and roof maintenance."
            align="split"
          />

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((s) => (
              <ScrollReveal
                key={s.slug}
                className="group relative flex flex-col justify-between border border-line bg-bg/50 p-6 transition-all duration-300 hover:border-navy hover:bg-white hover:shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-line pb-4 mb-5">
                    <span className="font-display text-sm font-bold text-amber">{s.number}</span>
                    <span className="text-[0.62rem] font-display uppercase tracking-[0.2em] text-muted">
                      {s.label}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-bold uppercase text-navy group-hover:text-blue transition-colors">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm text-muted leading-relaxed">
                    {s.intro}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-line/60">
                  <Link
                    to={`/services#${s.slug}`}
                    className="inline-flex items-center gap-2 font-display text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-navy group-hover:text-blue transition-colors"
                  >
                    <span>View Details</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: OUR WORKING PROCESS (HORIZONTAL TIMELINE) */}
      <section className="relative bg-navy py-24 sm:py-32 text-white" aria-labelledby="process-heading">
        <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden />

        <div className="container-x relative">
          <SectionHeading
            tone="dark"
            eyebrow="Suggested Customer Journey"
            title={
              <>
                From First Discussion <br />
                <span className="text-amber">To Final Roof.</span>
              </>
            }
            text="Presented as a suggested, transparent customer collaboration journey from the initial requirement review to completed installation."
            align="split"
          />

          {/* Process Timeline */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-5 gap-6 sm:gap-4 relative">
            {/* Connecting line on desktop */}
            <div className="hidden md:block absolute top-7 left-6 right-6 h-px bg-white/20 z-0" aria-hidden />

            {processSteps.map((p) => (
              <ScrollReveal
                key={p.step}
                className="relative z-10 flex flex-col border border-white/10 bg-navy-900/90 p-6 backdrop-blur-sm transition-all duration-300 hover:border-amber/40"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-display text-2xl font-bold text-amber">{p.step}</span>
                  <span className="h-2 w-2 rounded-full bg-amber" />
                </div>
                <h3 className="font-display text-lg font-bold uppercase text-white mb-2">
                  {p.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                  {p.desc}
                </p>
              </ScrollReveal>
            ))}
          </div>

          <p className="mt-10 text-xs uppercase tracking-[0.2em] text-white/40 text-center">
            Suggested customer journey for demo presentation · Project steps adapted to individual site conditions
          </p>
        </div>
      </section>

      {/* SECTION 6: WHY TRUSTED ROOFING SYSTEMS */}
      <section className="relative bg-white py-24 sm:py-32" aria-labelledby="why-about-heading">
        <div className="container-x relative">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <ScrollReveal stagger={0.1}>
                <p data-reveal className="eyebrow mb-5 text-blue">
                  Core Values
                </p>
                <h2 data-reveal id="why-about-heading" className="display-lg text-navy">
                  Focused On What <br />
                  <span className="text-blue">Matters Most.</span>
                </h2>
                <p data-reveal className="lede mt-6 text-muted max-w-xl">
                  We focus on the fundamental qualities of good roofing: structural soundness, proper water management, and straightforward communication.
                </p>

                <div data-reveal className="mt-10 space-y-6">
                  {[
                    {
                      title: 'Roofing Service Variety',
                      desc: 'Offering both timber and galvanized steel structural frameworks alongside IBR and selflock sheets to match different architectural tastes.',
                    },
                    {
                      title: 'Structural Roofing Capabilities',
                      desc: 'Careful planning of trusses and load points so the roofing framework provides solid support for the building.',
                    },
                    {
                      title: 'Free Technical Guidance',
                      desc: 'Encouraging property owners to discuss options and clarify questions early to avoid costly revisions down the road.',
                    },
                    {
                      title: 'Customer Enquiry Support',
                      desc: 'Direct communication via telephone, WhatsApp, or online quote requests without administrative delays.',
                    },
                  ].map((item, idx) => (
                    <div key={item.title} className="flex gap-4 items-start border-b border-line pb-5">
                      <span className="font-display text-xs font-bold text-amber mt-1">
                        0{idx + 1}
                      </span>
                      <div>
                        <h3 className="font-display text-base font-bold uppercase text-navy">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-sm text-muted leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            {/* Right: Architectural Detail Image */}
            <ScrollReveal className="lg:col-span-5">
              <div className="relative overflow-hidden border border-line bg-navy p-3 sm:p-4 shadow-xl">
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-navy-900">
                  <Img image={images.aboutWhy} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="font-display text-xs uppercase tracking-[0.25em] text-amber">
                      Detail & Finish
                    </p>
                    <p className="font-display text-base font-bold uppercase text-white mt-1">
                      Fascia, Gutter & Seam Alignment
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SECTION 7: CONTACT CTA */}
      <CTABanner
        image={images.ctaAlt}
        eyebrow="Start the Conversation"
        title={
          <>
            Let's Discuss Your <br />
            <span className="text-amber">Roofing Project.</span>
          </>
        }
        text="Contact Trusted Roofing Systems to discuss materials, roof framing, or installation requirements for your building."
        actions={
          <>
            <Button to="/contact#quote" variant="primary">
              Get a Free Quote
            </Button>
            <Button to="/projects" variant="outline-light">
              View Our Work
            </Button>
          </>
        }
        showPhone={true}
      />
    </>
  );
}
