import { useRef } from 'react';
import { gsap, useGSAP } from '../../lib/gsap';
import { images } from '../../data/images';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { Img } from '../common/Img';
import { Button } from '../common/Button';
import { ScrollReveal } from '../common/ScrollReveal';

const HEAD = 'Precision in every detail.';
const COPY =
  'From structural preparation to the final roofing finish, every stage contributes to the strength and appearance of a building.';

/* ---------- Roof truss technical drawing (generic, no dimensions) ---------- */
const leftX = [162.5, 275, 387.5];
const topY = (x: number) => 350 - ((x <= 500 ? x - 50 : 950 - x) / 450) * 270;
const chords = ['M50 350 H950', 'M50 350 L500 80 L950 350'];
const webs: string[] = [];
[...leftX, 500, ...leftX.map((x) => 1000 - x)].forEach((x) => webs.push(`M${x} 350 V${topY(x)}`));
leftX.forEach((x, i) => {
  const next = leftX[i + 1] ?? 500;
  webs.push(`M${x} ${topY(x)} L${next} 350`);
  webs.push(`M${1000 - x} ${topY(x)} L${1000 - next} 350`);
});

function TrussDrawing({ animated = true }: { animated?: boolean }) {
  const drawProps = animated ? { pathLength: 1, strokeDasharray: '1', strokeDashoffset: 1 } : {};
  return (
    <svg viewBox="0 0 1000 420" className="h-auto w-full overflow-visible" role="img" aria-label="Technical line drawing of a roof truss">
      <g fill="none" strokeLinecap="square">
        {/* Roof sheet line */}
        <path data-sheet {...drawProps} d="M20 344 L500 56 L980 344" stroke="#F5A623" strokeWidth="2.5" />
        {/* Purlins */}
        {[0.2, 0.4, 0.6, 0.8].flatMap((t) => {
          const lx = 50 + 450 * t;
          const rx = 950 - 450 * t;
          return [lx, rx].map((x) => (
            <rect key={`${x}`} data-purlin x={x - 7} y={topY(x) - 20} width="14" height="10" fill="#F5A623" opacity=".8" />
          ));
        })}
        {chords.map((d) => (
          <path key={d} data-chord {...drawProps} d={d} stroke="#fff" strokeWidth="3" />
        ))}
        {webs.map((d) => (
          <path key={d} data-web {...drawProps} d={d} stroke="rgba(255,255,255,0.7)" strokeWidth="1.6" />
        ))}
        {/* Nodes */}
        {[50, ...leftX, 500, ...leftX.map((x) => 1000 - x), 950].map((x) => (
          <circle key={x} data-node cx={x} cy={350} r="4.5" fill="#101D3A" stroke="#fff" strokeWidth="1.5" />
        ))}
        {/* Dimension line */}
        <path data-dim {...drawProps} d="M50 392 H950 M50 382 V402 M950 382 V402" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
      </g>
      <text data-dimlabel x="500" y="416" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="13" letterSpacing="4" fontFamily="Sora">
        SPAN
      </text>
    </svg>
  );
}

const labels = [
  { t: 'Ridge', cls: 'left-1/2 top-[2%] -translate-x-1/2' },
  { t: 'Roof sheet line', cls: 'left-[8%] top-[34%]' },
  { t: 'Top chord', cls: 'right-[6%] top-[42%]' },
  { t: 'Web members', cls: 'left-[38%] top-[60%]' },
  { t: 'Bottom chord', cls: 'right-[18%] top-[88%]' },
];

/**
 * HOME — Section 3: second pinned sequence.
 * Blueprint grid → truss line drawing → masked material images →
 * full-bleed finished roof → final headline + CTA.
 */
export function EngineeringSection() {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  return isDesktop && !reduced ? <PinnedEngineering /> : <StackedEngineering />;
}

function PinnedEngineering() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.set('[data-card]', { clipPath: 'inset(100% 0% 0% 0%)' });
      gsap.set('[data-final]', { clipPath: 'inset(50% 50% 50% 50%)' });
      gsap.set(['[data-label]', '[data-node]', '[data-purlin]', '[data-dimlabel]', '[data-final-text] > *'], { autoAlpha: 0 });
      gsap.set('[data-final-text] > *', { y: 50 });
      gsap.set('[data-bp]', { opacity: 0, scale: 1.1 });

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: () => `+=${window.innerHeight * 3.6}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.6,
          anticipatePin: 0,
          fastScrollEnd: 2500,
          preventOverlaps: true,
          invalidateOnRefresh: true,
        },
      });

      tl.to('[data-bp]', { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' }, 0)
        .from('[data-eng-head] > *', { autoAlpha: 0, y: 40, stagger: 0.12, duration: 0.6, ease: 'power3.out' }, 0.1)
        .to('[data-chord]', { strokeDashoffset: 0, duration: 0.8, stagger: 0.2, ease: 'power2.inOut' }, 0.5)
        .to('[data-web]', { strokeDashoffset: 0, duration: 0.3, stagger: 0.05, ease: 'power1.out' }, 0.9)
        .to('[data-node]', { autoAlpha: 1, duration: 0.2, stagger: 0.03 }, 1.2)
        .to('[data-sheet]', { strokeDashoffset: 0, duration: 0.6, ease: 'power2.inOut' }, 1.4)
        .to('[data-purlin]', { autoAlpha: 1, duration: 0.2, stagger: 0.03 }, 1.6)
        .to('[data-dim]', { strokeDashoffset: 0, duration: 0.4 }, 1.6)
        .to(['[data-dimlabel]', '[data-label]'], { autoAlpha: 1, duration: 0.3, stagger: 0.08 }, 1.8)
        // Materials revealed through masks
        .to('[data-card="a"]', { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.8, ease: 'power3.inOut' }, 2.2)
        .fromTo('[data-card="a"] [data-card-img]', { scale: 1.4 }, { scale: 1, duration: 1.2 }, 2.2)
        .to('[data-card="b"]', { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.8, ease: 'power3.inOut' }, 2.5)
        .fromTo('[data-card="b"] [data-card-img]', { scale: 1.4 }, { scale: 1, duration: 1.2 }, 2.5)
        .to('[data-truss]', { yPercent: -8, scale: 0.94, duration: 1.6 }, 2.2)
        .to('[data-card="a"]', { yPercent: -18, duration: 1.4 }, 2.6)
        .to('[data-card="b"]', { yPercent: 14, duration: 1.4 }, 2.6)
        // Finished roof expands from centre
        .to('[data-final]', { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, ease: 'power3.inOut' }, 3.6)
        .fromTo('[data-final-img]', { scale: 1.35 }, { scale: 1, duration: 1.6 }, 3.6)
        .to('[data-final-text] > *', { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out' }, 4.4)
        .to({}, { duration: 0.6 });
    },
    { scope: root },
  );

  return (
    <section ref={root} data-pinned-eng className="relative h-screen overflow-hidden bg-navy-900 text-white" aria-labelledby="eng-title">
      <div data-bp className="blueprint-grid absolute inset-0" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(23,100,232,0.18),transparent_65%)]" aria-hidden />

      <div className="container-x relative h-full pt-28">
        <div data-eng-head className="flex items-end justify-between gap-10">
          <div>
            <p className="eyebrow mb-5 text-amber">Engineering excellence</p>
            <h2 id="eng-title" className="display-md max-w-2xl">
              {HEAD}
            </h2>
          </div>
          <p className="max-w-sm pb-2 text-[0.95rem] leading-relaxed text-white/60">{COPY}</p>
        </div>

        {/* Truss drawing */}
        <div data-truss className="absolute bottom-[8%] left-1/2 w-[min(62vw,1000px)] -translate-x-1/2">
          <TrussDrawing />
          {labels.map((l) => (
            <span
              key={l.t}
              data-label
              className={`absolute ${l.cls} flex items-center gap-2 whitespace-nowrap font-display text-[0.6rem] uppercase tracking-[0.25em] text-white/75`}
            >
              <span className="h-1.5 w-1.5 bg-amber" /> {l.t}
            </span>
          ))}
        </div>

        {/* Material cards */}
        <figure data-card="a" className="absolute bottom-[14%] left-[3%] w-[17vw] max-w-[280px] overflow-hidden">
          <div data-card-img>
            <Img image={images.engTruss} className="aspect-[4/5] w-full" />
          </div>
          <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy-900 to-transparent p-4 font-display text-[0.6rem] uppercase tracking-[0.25em]">
            Detail A — Truss connection
          </figcaption>
        </figure>
        <figure data-card="b" className="absolute right-[3%] top-[30%] w-[17vw] max-w-[280px] overflow-hidden">
          <div data-card-img>
            <Img image={images.engSheets} className="aspect-[4/5] w-full" />
          </div>
          <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy-900 to-transparent p-4 font-display text-[0.6rem] uppercase tracking-[0.25em]">
            Detail B — Sheet alignment
          </figcaption>
        </figure>
      </div>

      {/* Finished roof */}
      <div data-final className="absolute inset-0 z-10">
        <div data-final-img className="absolute inset-0">
          <Img image={images.engFinished} className="h-full w-full" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/60 to-navy/10" aria-hidden />
        <div data-final-text className="container-x relative flex h-full flex-col justify-end pb-[10vh]">
          <p className="eyebrow mb-6 text-amber">The finished roof</p>
          <p className="display-xl max-w-4xl">
            Every stage.
            <br />
            Every <span className="text-amber">detail.</span>
          </p>
          <p className="lede mt-6 max-w-lg text-white/75">{COPY}</p>
          <div className="mt-9 flex gap-4">
            <Button to="/contact#quote">Request a Free Quote</Button>
            <Button to="/services" variant="outline-light">
              Our Services
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function StackedEngineering() {
  return (
    <section className="relative overflow-hidden bg-navy-900 py-24 text-white sm:py-32" aria-labelledby="eng-title-m">
      <div className="blueprint-grid pointer-events-none absolute inset-0" aria-hidden />
      <div className="container-x relative">
        <ScrollReveal stagger={0.1}>
          <p data-reveal className="eyebrow mb-5 text-amber">
            Engineering excellence
          </p>
          <h2 data-reveal id="eng-title-m" className="display-lg">
            {HEAD}
          </h2>
          <p data-reveal className="lede mt-6 max-w-xl text-white/65">
            {COPY}
          </p>
        </ScrollReveal>
        <ScrollReveal className="mt-14">
          <TrussDrawing animated={false} />
        </ScrollReveal>
        <ScrollReveal className="mt-14 grid grid-cols-2 gap-3 sm:gap-5" stagger={0.15}>
          {[
            { img: images.engTruss, cap: 'Detail A — Truss connection' },
            { img: images.engSheets, cap: 'Detail B — Sheet alignment' },
          ].map((c, i) => (
            <figure key={c.cap} data-reveal className={`overflow-hidden ${i ? 'mt-10' : ''}`}>
              <Img image={c.img} className="aspect-[4/5] w-full" />
              <figcaption className="mt-3 font-display text-[0.6rem] uppercase tracking-[0.2em] text-white/60">{c.cap}</figcaption>
            </figure>
          ))}
        </ScrollReveal>
        <ScrollReveal className="relative mt-16 overflow-hidden">
          <Img image={images.engFinished} className="aspect-[4/5] w-full sm:aspect-[16/10]" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent" aria-hidden />
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
            <p className="display-md">
              Every stage. <br />
              Every <span className="text-amber">detail.</span>
            </p>
            <div className="mt-6">
              <Button to="/contact#quote">Request a Free Quote</Button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
