import { useRef, type ReactNode } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/gsap';
import type { SiteImage } from '../../data/images';
import { Img } from './Img';
import { business } from '../../data/business';
import { Phone } from 'lucide-react';

type Props = {
  image: SiteImage;
  eyebrow?: string;
  title: ReactNode;
  text?: string;
  actions: ReactNode;
  showPhone?: boolean;
};

/**
 * Cinematic full-width closing CTA used on every page.
 * The image scales down within a clip-path frame as it enters view.
 */
export function CTABanner({ image, eyebrow = 'Start the conversation', title, text, actions, showPhone = true }: Props) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: 'top 80%', end: 'top 20%', scrub: 1 },
      });
      tl.fromTo('[data-cta-frame]', { clipPath: 'inset(8% 6% 8% 6%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none' }).fromTo(
        '[data-cta-img]',
        { scale: 1.25 },
        { scale: 1, ease: 'none' },
        0,
      );
      gsap.from('[data-cta-reveal]', {
        autoAlpha: 0,
        y: 40,
        stagger: 0.1,
        duration: 1.1,
        scrollTrigger: { trigger: root.current, start: 'top 60%', once: true },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative bg-navy">
      <div data-cta-frame className="relative overflow-hidden">
        <div data-cta-img className="absolute inset-0">
          <Img image={image} className="h-full w-full" />
        </div>
        <div className="absolute inset-0 bg-navy/80" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/40" aria-hidden />
        <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-30" aria-hidden />

        <div className="container-x relative py-28 text-white sm:py-36 lg:py-44">
          <div className="max-w-5xl">
            <p data-cta-reveal className="eyebrow mb-6 text-amber">
              {eyebrow}
            </p>
            <h2 data-cta-reveal className="display-xl">
              {title}
            </h2>
            {text && (
              <p data-cta-reveal className="lede mt-8 max-w-xl text-white/75">
                {text}
              </p>
            )}
            <div data-cta-reveal className="mt-10 flex flex-col gap-4 xs:flex-row xs:flex-wrap">
              {actions}
            </div>
            {showPhone && (
              <a
                data-cta-reveal
                href={business.phoneHref}
                className="mt-12 inline-flex items-center gap-4 border-t border-white/15 pt-6 text-white/70 transition-colors hover:text-amber"
              >
                <Phone className="h-4 w-4" aria-hidden />
                <span className="font-display text-sm uppercase tracking-[0.2em]">Call</span>
                <span className="font-display text-xl font-semibold tracking-wide text-white">{business.phoneDisplay}</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
