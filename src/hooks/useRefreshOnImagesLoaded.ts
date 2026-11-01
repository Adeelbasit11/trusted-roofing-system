import { useEffect } from 'react';
import { ScrollTrigger } from '../lib/gsap';

/**
 * Refreshes ScrollTrigger once all images inside the document have loaded,
 * so pinned/scrubbed positions are calculated against final layout.
 */
export function useRefreshOnImagesLoaded(deps: unknown[] = []) {
  useEffect(() => {
    let pending = 0;
    let timeout: number | undefined;
    const refresh = () => {
      window.clearTimeout(timeout);
      timeout = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    };
    const imgs = Array.from(document.images).filter((i) => !i.complete);
    pending = imgs.length;
    const onDone = () => {
      pending -= 1;
      if (pending <= 0) refresh();
    };
    imgs.forEach((i) => {
      i.addEventListener('load', onDone, { once: true });
      i.addEventListener('error', onDone, { once: true });
    });
    window.addEventListener('load', refresh);
    if (document.fonts?.ready) document.fonts.ready.then(refresh);
    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener('load', refresh);
      imgs.forEach((i) => {
        i.removeEventListener('load', onDone);
        i.removeEventListener('error', onDone);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
