import { useRef } from 'react';
import { gsap, useGSAP } from '../../lib/gsap';
import { images, type SiteImage } from '../../data/images';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { Img } from '../common/Img';
import { ScrollReveal } from '../common/ScrollReveal';

type Stage = { n: string; title: string; text: string; image: SiteImage; fig: string };

const stages: Stage[] = [
  {
    n: '01',
    title: 'The Structure',
    text: 'Every roof begins with a prepared building structure, ready to carry the roof framework above it.',
    image: images.storyStructure,
    fig: 'Building structure',
  },
  {
    n: '02',
    title: 'The Engineering',
    text: 'Steel trusses, purlins and roofing materials are planned and prepared to form the framework of the roof.',
    image: images.storyEngineering,
    fig: 'Galvanized truss framework',
  },
  {
    n: '03',
    title: 'The Installation',
    text: 'Roofing sheets are positioned, aligned and fixed with care across the structure.',
    image: images.storyInstallation,
    fig: 'Roofing installation',
  },
  {
    n: '04',
    title: 'The Finished Structure',
    text: 'A finished roof that protects the building and completes its architecture.',
    image: images.storyFinished,
    fig: 'Finished structure',
  },
];

const TITLE = 'From structure to strength.';
const COPY = 'Every great roofing solution begins with the right materials, careful planning, and precision installation.';

/**
 * HOME — Section 2: pinned, scroll-scrubbed storytelling.
 * Desktop: full-bleed image collapses into a framed viewer; four stages
 * wipe in with clip-path masks while copy, counters and technical lines animate.
 * Mobile / reduced motion: natural-scrolling stacked chapters.
 */
export function StorytellingSection() {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  return isDesktop && !reduced ? <PinnedStory /> : <StackedStory />;
}

function PinnedStory() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const layers = q('[data-layer]');
      const imgs = q('[data-layer-img]');
      const texts = q('[data-stage]');
      const ticks = q('[data-tick]');
      const caps = q('[data-cap]');

      gsap.set(layers.slice(1), { clipPath: 'inset(100% 0% 0% 0%)' });
      gsap.set(texts.slice(1), { autoAlpha: 0, y: 40 });
      gsap.set(caps.slice(1), { autoAlpha: 0, y: 12 });
      gsap.set('[data-panel]', { autoAlpha: 0, x: -40 });
      gsap.set('[data-draw]', { strokeDashoffset: 1 });

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: () => `+=${window.innerHeight * 3.4}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.6,
          anticipatePin: 0,
          fastScrollEnd: 2500,
          preventOverlaps: true,
          invalidateOnRefresh: true,
        },
      });

      // Intro → framed viewer
      tl.to('[data-intro]', { yPercent: -40, autoAlpha: 0, duration: 0.7, ease: 'power2.in' }, 0)
        .to('[data-frame]', { clipPath: 'inset(13% 4% 9% 46%)', duration: 1, ease: 'power3.inOut' }, 0.1)
        .to('[data-shade]', { opacity: 0.15, duration: 1 }, 0.1)
        .to(imgs[0], { scale: 1.08, duration: 1 }, 0.1)
        .to('[data-panel]', { autoAlpha: 1, x: 0, duration: 0.6, ease: 'power3.out' }, 0.7)
        .to('[data-draw]', { strokeDashoffset: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out' }, 0.8)
        .to(ticks[0], { scaleX: 1, duration: 0.4 }, 0.9);

      // Stages 2-4
      stages.slice(1).forEach((_, idx) => {
        const i = idx + 1;
        const at = 1.6 + idx * 1.1;
        tl.to(layers[i], { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9, ease: 'power2.inOut' }, at)
          .fromTo(imgs[i], { scale: 1.3, yPercent: 6 }, { scale: 1.04, yPercent: 0, duration: 1.1 }, at)
          .to(imgs[i - 1], { scale: 1.2, yPercent: -6, duration: 0.9 }, at)
          .to(texts[i - 1], { autoAlpha: 0, y: -40, duration: 0.4, ease: 'power2.in' }, at)
          .to(texts[i], { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power3.out' }, at + 0.4)
          .to(caps[i - 1], { autoAlpha: 0, y: -12, duration: 0.3 }, at)
          .to(caps[i], { autoAlpha: 1, y: 0, duration: 0.4 }, at + 0.5)
          .to(ticks[i], { scaleX: 1, duration: 0.6 }, at + 0.2);
      });

      tl.to('[data-progress]', { scaleY: 1, duration: tl.duration() - 0.6 }, 0.6).to({}, { duration: 0.4 });
    },
    { scope: root },
  );

  return (
    <section ref={root} data-pinned-story className="relative h-screen overflow-hidden bg-navy text-white" aria-labelledby="story-title">
      <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden />

      {/* Left narrative panel */}
      <div className="container-x relative flex h-full items-center">
        <div data-panel className="w-[40%] pt-16">
          <p className="eyebrow mb-6 text-amber">The process / 4 stages</p>
          <h2 id="story-title" className="display-md max-w-md">
            {TITLE}
          </h2>
          <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-white/60">{COPY}</p>

          <div className="relative mt-12 min-h-[160px]">
            {stages.map((s) => (
              <div key={s.n} data-stage className="absolute inset-0 flex items-start gap-7">
                <div className="w-[5.2rem] shrink-0 font-display text-[4.5rem] font-bold leading-none text-amber select-none" aria-hidden>
                  {s.n}
                </div>
                <div className="flex-1 pt-1.5">
                  <h3 className="font-display text-2xl font-semibold uppercase tracking-tight">{s.title}</h3>
                  <p className="mt-3 max-w-xs text-[0.95rem] leading-relaxed text-white/65">{s.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Stage ticks */}
          <ol className="mt-6 grid max-w-md grid-cols-4 gap-3" aria-label="Stages">
            {stages.map((s) => (
              <li key={s.n}>
                <span className="relative block h-[2px] bg-white/15">
                  <span data-tick className="absolute inset-0 origin-left scale-x-0 bg-amber" />
                </span>
                <span className="mt-3 block font-display text-[0.6rem] uppercase tracking-[0.2em] text-white/45">{s.title.replace('The ', '')}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Image frame */}
      <div data-frame className="absolute inset-0" style={{ clipPath: 'inset(0% 0% 0% 0%)' }}>
        {stages.map((s, i) => (
          <div key={s.n} data-layer className="absolute inset-0 overflow-hidden" style={{ zIndex: i }}>
            <div data-layer-img className="h-full w-full will-change-transform">
              <Img image={s.image} priority={i === 0} className="h-full w-full" />
            </div>
          </div>
        ))}
        <div data-shade className="absolute inset-0 z-10 bg-navy opacity-70" aria-hidden />
        {/* Figure captions (sit inside frame coordinates) */}
        <div className="absolute bottom-[11%] left-[48%] z-20 h-6 w-[40%]">
          {stages.map((s) => (
            <p key={s.n} data-cap className="absolute left-0 top-0 flex items-center gap-3 font-display text-[0.65rem] uppercase tracking-[0.25em] text-white">
              <span className="bg-amber px-2 py-1 text-navy">Fig. {s.n}</span>
              {s.fig}
            </p>
          ))}
        </div>
      </div>

      {/* Technical line graphics framing the viewer */}
      <svg className="pointer-events-none absolute inset-0 z-20 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
        <g fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1" vectorEffect="non-scaling-stroke">
          <path data-draw pathLength={1} strokeDasharray="1" d="M46 9.5 H96" vectorEffect="non-scaling-stroke" />
          <path data-draw pathLength={1} strokeDasharray="1" d="M46 8.3 V10.7 M96 8.3 V10.7" vectorEffect="non-scaling-stroke" />
          <path data-draw pathLength={1} strokeDasharray="1" d="M98 13 V91" vectorEffect="non-scaling-stroke" />
          <path data-draw pathLength={1} strokeDasharray="1" stroke="#F5A623" d="M44 13 V17 M44 13 H45.5 M44 91 V87 M44 91 H45.5" vectorEffect="non-scaling-stroke" />
        </g>
      </svg>
      {/* Vertical progress */}
      <div className="absolute bottom-[9%] right-[2%] top-[13%] z-20 w-px" aria-hidden>
        <span data-progress className="absolute inset-0 origin-top scale-y-0 bg-amber" />
      </div>

      {/* Intro title over full-bleed image */}
      <div data-intro className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center px-6 text-center">
        <p className="eyebrow mb-6 text-amber">The process</p>
        <p className="display-xl max-w-5xl" aria-hidden>
          From structure
          <br />
          to <span className="text-amber">strength.</span>
        </p>
        <p className="lede mt-8 max-w-xl text-white/75">{COPY}</p>
      </div>
    </section>
  );
}

function StackedStory() {
  return (
    <section className="relative overflow-hidden bg-navy py-24 text-white sm:py-32" aria-labelledby="story-title-m">
      <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden />
      <div className="container-x relative text-center sm:text-left">
        <ScrollReveal stagger={0.1}>
          <p data-reveal className="eyebrow mb-6 text-amber">
            The process / 4 stages
          </p>
          <h2 data-reveal id="story-title-m" className="display-lg">
            From structure <br />
            to <span className="text-amber">strength.</span>
          </h2>
          <p data-reveal className="lede mt-6 max-w-xl mx-auto sm:mx-0 text-white/70">
            {COPY}
          </p>
        </ScrollReveal>

        <ol className="mt-16 space-y-16 sm:space-y-20">
          {stages.map((s, i) => (
            <ScrollReveal as="li" key={s.n} className={`grid gap-6 sm:grid-cols-12 sm:items-end ${i % 2 ? 'sm:[&>*:first-child]:order-2' : ''}`}>
              <figure data-reveal className="relative overflow-hidden sm:col-span-7">
                <Img image={s.image} className="aspect-[4/3] w-full" />
                <figcaption className="absolute bottom-3 left-3 bg-amber px-2 py-1 font-display text-[0.6rem] uppercase tracking-[0.2em] text-navy">
                  Fig. {s.n} — {s.fig}
                </figcaption>
              </figure>
              <div data-reveal className="sm:col-span-5 text-center sm:text-left">
                <span className="font-display text-5xl font-bold text-amber">{s.n}</span>
                <h3 className="mt-3 font-display text-2xl font-semibold uppercase tracking-tight">{s.title}</h3>
                <p className="mt-3 text-white/65">{s.text}</p>
              </div>
            </ScrollReveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
