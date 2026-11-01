import { useEffect, useLayoutEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { FloatingWhatsApp } from '../common/FloatingWhatsApp';
import { ScrollTrigger } from '../../lib/gsap';
import { useRefreshOnImagesLoaded } from '../../hooks/useRefreshOnImagesLoaded';

/** Handles scroll restoration and hash-anchor scrolling between routes. */
function useRouteScroll() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);

  useEffect(() => {
    if (!hash) return;
    let tries = 0;
    let t: number;
    const go = () => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) {
        ScrollTrigger.refresh();
        const top = el.getBoundingClientRect().top + window.scrollY - 90;
        window.scrollTo({ top, behavior: tries === 0 ? 'auto' : 'smooth' });
      } else if (tries++ < 10) {
        t = window.setTimeout(go, 100);
      }
    };
    t = window.setTimeout(go, 60);
    return () => window.clearTimeout(t);
  }, [pathname, hash]);
}

export function Layout() {
  const { pathname } = useLocation();
  useRouteScroll();
  useRefreshOnImagesLoaded([pathname]);

  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Outlet />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
