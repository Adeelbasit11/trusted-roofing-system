import { useRef, type ReactNode } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/gsap';
import type { SiteImage } from '../../data/images';
import { Breadcrumb } from './Breadcrumb';
import { Img } from './Img';

type Props = {
  image: SiteImage;
  eyebrow: string;
  title: ReactNode;
  text: string;
  breadcrumb: string;
  children?: ReactNode;
  /** Small index label e.g. "02 / 05" */
  index?: string;
};

/**
 * Cinematic inner-page hero used by About, Services, Projects and Contact.
 * Includes a masked headline entrance and subtle scroll parallax.
 */
export function PageHero({ image, eyebrow, title, text, breadcrumb, children, index }: Props) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
      tl.from('[data-hero-img]', { scale: 1.18, duration: 2.2, ease: 'power2.out' })
        .from('[data-hero-line] > span', { yPercent: 110, duration: 1.3, stagger: 0.1 }, 0.25)
        .from('[data-hero-fade]', { autoAlpha: 0, y: 24, duration: 1, stagger: 0.08 }, 0.6)
        .from('[data-hero-rule]', { scaleX: 0, transformOrigin: 'left', duration: 1.4 }, 0.4);

      gsap.to('[data-hero-parallax]', {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative flex min-h-[78svh] items-end overflow-hidden bg-navy pb-14 pt-36 text-white sm:min-h-[82svh] sm:pb-20 lg:pb-24">
      <div data-hero-parallax className="absolute inset-0 -top-[10%] h-[120%]">
        <div data-hero-img className="h-full w-full">
          <Img image={image} priority className="h-full w-full" />
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/75 to-navy/35" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/30 to-transparent" aria-hidden />
      <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden />

      <div className="container-x relative text-center sm:text-left">
        <div data-hero-fade className="mb-10 flex items-center justify-center sm:justify-between gap-6">
          <Breadcrumb current={breadcrumb} />
          {index && <span className="hidden font-display text-xs tracking-[0.3em] text-white/50 sm:block">{index}</span>}
        </div>
        <p data-hero-fade className="eyebrow mb-6 text-amber">
          {eyebrow}
        </p>
        <h1 className="display-xl max-w-6xl mx-auto sm:mx-0">{title}</h1>
        <div data-hero-rule className="my-8 h-px w-full bg-white/20 sm:my-10" aria-hidden />
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <p data-hero-fade className="lede max-w-xl mx-auto sm:mx-0 text-white/75 lg:col-span-6">
            {text}
          </p>
          {children && (
            <div data-hero-fade className="flex flex-wrap justify-center sm:justify-start gap-4 lg:col-span-6 lg:justify-end">
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/** Helper: wraps each line of a heading in a mask for reveal animation. */
export function HeroLines({ lines, accentIndex }: { lines: string[]; accentIndex?: number }) {
  return (
    <>
      {lines.map((l, i) => (
        <span key={l} data-hero-line className="block overflow-hidden pb-[0.06em]">
          <span className={`block ${i === accentIndex ? 'text-amber' : ''}`}>{l}</span>
        </span>
      ))}
    </>
  );
}
