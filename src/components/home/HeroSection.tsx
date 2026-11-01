import { useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/gsap';
import { images } from '../../data/images';
import { business } from '../../data/business';
import { services } from '../../data/services';
import { Img } from '../common/Img';
import { Button } from '../common/Button';
import { TikTokIcon } from '../common/TikTokIcon';

/**
 * HOME — Section 1: cinematic hero.
 * Asymmetric composition: oversized headline left, technical index column right.
 */
export function HeroSection() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
      tl.fromTo('[data-h-frame]', { clipPath: 'inset(12% 10% 12% 40%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.8, ease: 'expo.inOut' })
        .from('[data-h-img]', { scale: 1.3, duration: 2.4, ease: 'power3.out' }, 0)
        .from('[data-h-line] > span', { yPercent: 115, duration: 1.4, stagger: 0.12 }, 0.9)
        .from('[data-h-fade]', { autoAlpha: 0, y: 26, duration: 1.1, stagger: 0.08 }, 1.2)
        .from('[data-h-rule]', { scaleY: 0, transformOrigin: 'top', duration: 1.4, stagger: 0.1 }, 1.0);

      // Scroll parallax: image drifts slower, content lifts away
      gsap.to('[data-h-parallax]', {
        yPercent: 16,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.to('[data-h-content]', {
        yPercent: -12,
        autoAlpha: 0.2,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative flex min-h-[100svh] items-end overflow-hidden bg-navy text-white" aria-label="Introduction">
      <div data-h-frame className="absolute inset-0">
        <div data-h-parallax className="absolute inset-0 -top-[8%] h-[116%]">
          <div data-h-img className="h-full w-full">
            <Img image={images.hero} priority className="h-full w-full object-[78%_center] md:object-[82%_center] lg:object-[88%_center]" />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/80 to-navy/10 lg:via-navy/55" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-navy/50" aria-hidden />
      </div>

      {/* Technical vertical rules */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden>
        <div className="container-x relative h-full">
          {[25, 50, 75].map((l) => (
            <span key={l} data-h-rule className="absolute top-0 h-full w-px bg-white/[0.07]" style={{ left: `${l}%` }} />
          ))}
        </div>
      </div>

      <div data-h-content className="container-x relative pb-10 pt-36 sm:pb-14 lg:pb-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-9">
            <p data-h-fade className="eyebrow mb-7 text-amber">
              Trusted Roofing Solutions
            </p>
            <h1 className="display-xl">
              <span data-h-line className="block overflow-hidden pb-[0.05em]">
                <span className="block">Engineered</span>
              </span>
              <span data-h-line className="block overflow-hidden pb-[0.05em]">
                <span className="block">
                  Roofing<span className="text-amber">.</span>
                </span>
              </span>
              <span data-h-line className="block overflow-hidden pb-[0.05em]">
                <span className="block text-white/90">
                  Built to <span className="relative inline-block">last<span className="text-amber">.</span></span>
                </span>
              </span>
            </h1>
            <p data-h-fade className="lede mt-8 max-w-xl text-white/75">
              Professional roofing solutions, precision installation, and reliable protection for residential and commercial structures.
            </p>
            <div data-h-fade className="mt-10 flex flex-col gap-4 xs:flex-row xs:flex-wrap">
              <Button to="/contact#quote">Get a Free Quote</Button>
              <Button to="/services" variant="outline-light">
                Explore Our Services
              </Button>
            </div>
          </div>

          {/* Right index column */}
          <aside data-h-fade className="hidden border-l border-white/15 pl-8 lg:col-span-3 lg:block" aria-label="Services overview">
            <p className="mb-5 font-display text-[0.65rem] uppercase tracking-[0.3em] text-white/50">Index / Services</p>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.slug} className="flex items-baseline gap-3 text-sm text-white/70">
                  <span className="font-display text-[0.6rem] text-amber">{s.number}</span>
                  {s.shortTitle}
                </li>
              ))}
            </ul>
          </aside>
        </div>

        {/* Bottom bar */}
        <div data-h-fade className="mt-14 flex flex-col gap-6 border-t border-white/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="relative h-10 w-px overflow-hidden bg-white/20" aria-hidden>
              <span className="animate-scroll-line absolute inset-x-0 top-0 h-1/2 bg-amber" />
            </span>
            <span className="font-display text-[0.65rem] uppercase tracking-[0.3em] text-white/60">Scroll to explore</span>
          </div>
          <a
            href={business.tiktokUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-4 text-white/70 transition-colors hover:text-white"
          >
            <span className="grid h-10 w-10 place-items-center border border-white/20 transition-colors group-hover:border-amber group-hover:text-amber">
              <TikTokIcon />
            </span>
            <span className="text-sm">
              <span className="font-display font-semibold text-white">19.4K</span> followers ·{' '}
              <span className="font-display font-semibold text-white">143.8K</span> likes on TikTok
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
