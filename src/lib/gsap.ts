import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

ScrollTrigger.config({
  limitCallbacks: true,
  ignoreMobileResize: true,
});

gsap.defaults({ ease: 'power3.out' });

export { gsap, ScrollTrigger, useGSAP };

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
