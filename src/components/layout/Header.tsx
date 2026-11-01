import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, Menu } from 'lucide-react';
import { navigation } from '../../data/navigation';
import { Logo } from '../common/Logo';
import { Button } from '../common/Button';
import { MobileNavigation } from './MobileNavigation';

/**
 * Sticky corporate header.
 * - Transparent over dark heroes, solid navy after scrolling.
 * - Hides while scrolling down, reappears when scrolling up.
 * - Keyboard-accessible Services dropdown.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const lastY = useRef(0);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 500 && y > lastY.current + 4);
      if (y < lastY.current - 4) setHidden(false);
      lastY.current = y;
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
        className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,box-shadow,padding] duration-500 ease-[var(--ease-premium)] ${
          hidden && !menuOpen ? '-translate-y-full' : 'translate-y-0'
        } ${scrolled ? 'bg-navy/95 py-3 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.6)] backdrop-blur-md' : 'bg-transparent py-5 lg:py-6'}`}
      >
        <div className="container-x flex items-center justify-between gap-6">
          <Logo />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-8 xl:gap-10">
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
                        className="nav-link font-display text-[0.82rem] font-medium tracking-wide text-white/85 transition-colors hover:text-white aria-[current=page]:text-white"
                      >
                        {item.label}
                      </NavLink>
                      <button
                        type="button"
                        aria-expanded={dropdown}
                        aria-controls="services-menu"
                        aria-label="Toggle services menu"
                        onClick={() => setDropdown((d) => !d)}
                        className="grid h-7 w-7 place-items-center text-white/70 hover:text-amber"
                      >
                        <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${dropdown ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                    <div
                      id="services-menu"
                      className={`absolute left-1/2 top-full w-[300px] -translate-x-1/2 pt-4 transition-all duration-300 ease-[var(--ease-premium)] ${
                        dropdown ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'
                      }`}
                    >
                      <ul className="border border-white/10 bg-navy-900 p-2 shadow-2xl">
                        {item.children.map((c, i) => (
                          <li key={c.to}>
                            <Link
                              to={c.to}
                              onClick={() => setDropdown(false)}
                              className="group flex items-center gap-4 px-4 py-3 text-sm text-white/75 transition-colors hover:bg-white/5 hover:text-white focus-visible:bg-white/5"
                            >
                              <span className="font-display text-[0.65rem] text-amber/80">{String(i + 1).padStart(2, '0')}</span>
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
                      className="nav-link font-display text-[0.82rem] font-medium tracking-wide text-white/85 transition-colors hover:text-white aria-[current=page]:text-white"
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Button to="/contact#quote" size="sm" className="hidden sm:inline-flex">
              Get a Free Quote
            </Button>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              className="grid h-11 w-11 place-items-center border border-white/25 text-white transition-colors hover:border-amber hover:text-amber lg:hidden"
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
