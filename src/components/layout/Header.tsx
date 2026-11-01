import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, Menu } from 'lucide-react';
import { navigation } from '../../data/navigation';
import { Logo } from '../common/Logo';
import { Button } from '../common/Button';
import { MobileNavigation } from './MobileNavigation';

/**
 * Fixed corporate header across all viewports.
 * - Permanently fixed at top-0 (never hides on scroll).
 * - Refined translucent glass over hero, solid high-contrast navy on scroll.
 * - Keyboard-accessible Services dropdown and responsive layout across mobile, tablet, and desktop.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMenuOpen(false);
    setDropdown(false);
  }, [pathname]);

  // Close dropdown on outside click / Escape
  useEffect(() => {
    if (!dropdown) return;
    const onDown = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) setDropdown(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setDropdown(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [dropdown]);

  return (
    <>
      <a
        href="#main"
        className="fixed left-4 top-4 z-[100] -translate-y-24 bg-amber px-4 py-3 font-display text-sm font-semibold text-navy transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-[var(--ease-premium)] ${
          scrolled
            ? 'h-[68px] sm:h-[74px] lg:h-[78px] bg-navy/95 border-b border-white/15 shadow-[0_12px_36px_-6px_rgba(10,20,40,0.55)] backdrop-blur-xl'
            : 'h-[72px] sm:h-[80px] lg:h-[86px] bg-navy-900/55 border-b border-white/10 backdrop-blur-md'
        }`}
      >
        <div className="container-x flex h-full items-center justify-between gap-3 sm:gap-6">
          <Logo />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-7 xl:gap-9">
              {navigation.map((item) =>
                item.children ? (
                  <li
                    key={item.to}
                    ref={dropdownRef}
                    className="relative"
                    onMouseEnter={() => setDropdown(true)}
                    onMouseLeave={() => setDropdown(false)}
                  >
                    <div className="flex items-center gap-1">
                      <NavLink
                        to={item.to}
                        className="nav-link font-display text-[0.82rem] font-semibold uppercase tracking-[0.1em] text-white/90 transition-colors hover:text-amber aria-[current=page]:text-amber"
                      >
                        {item.label}
                      </NavLink>
                      <button
                        type="button"
                        aria-expanded={dropdown}
                        aria-controls="services-menu"
                        aria-label="Toggle services menu"
                        onClick={() => setDropdown((d) => !d)}
                        className="grid h-7 w-7 place-items-center text-white/75 transition-colors hover:text-amber"
                      >
                        <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${dropdown ? 'rotate-180 text-amber' : ''}`} />
                      </button>
                    </div>
                    <div
                      id="services-menu"
                      className={`absolute left-1/2 top-full w-[310px] -translate-x-1/2 pt-4 transition-all duration-300 ease-[var(--ease-premium)] ${
                        dropdown ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'
                      }`}
                    >
                      <ul className="rounded-2xl border border-white/15 bg-navy-900/98 p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl">
                        {item.children.map((c, i) => (
                          <li key={c.to}>
                            <Link
                              to={c.to}
                              onClick={() => setDropdown(false)}
                              className="group flex items-center gap-3.5 rounded-xl px-3.5 py-2.5 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:bg-white/10"
                            >
                              <span className="font-display text-[0.65rem] font-bold text-amber">{String(i + 1).padStart(2, '0')}</span>
                              <span className="transition-transform duration-300 group-hover:translate-x-1">{c.label}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ) : (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      end={item.to === '/'}
                      className="nav-link font-display text-[0.82rem] font-semibold uppercase tracking-[0.1em] text-white/90 transition-colors hover:text-amber aria-[current=page]:text-amber"
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-3">
            <Button to="/contact#quote" size="sm" className="hidden sm:inline-flex">
              Get a Free Quote
            </Button>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/25 bg-white/5 text-white transition-colors hover:border-amber hover:bg-white/10 hover:text-amber lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>
      <MobileNavigation open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
