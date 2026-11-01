import { useRef, type ElementType, type ReactNode } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/gsap';

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Animate direct `[data-reveal]` descendants with a stagger. Falls back to the wrapper itself. */
  stagger?: number;
  y?: number;
  delay?: number;
  id?: string;
};

/**
 * Lightweight scroll-triggered reveal. Elements marked with
 * `data-reveal` fade/slide in once when they enter the viewport.
 * Respects prefers-reduced-motion and cleans up via useGSAP.
 */
export function ScrollReveal({ children, as: Tag = 'div', className, stagger = 0.08, y = 36, delay = 0, id }: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root || prefersReducedMotion()) return;
      const targets = root.querySelectorAll<HTMLElement>('[data-reveal]');
      const els = targets.length ? Array.from(targets) : [root];
      gsap.set(els, { autoAlpha: 0, y });
      gsap.to(els, {
        autoAlpha: 1,
        y: 0,
        duration: 1.05,
        delay,
        stagger,
        ease: 'power3.out',
        scrollTrigger: { trigger: root, start: 'top 85%', once: true },
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className} id={id}>
      {children}
    </Tag>
  );
}
