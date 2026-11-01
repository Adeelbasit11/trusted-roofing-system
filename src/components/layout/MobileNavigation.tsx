import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ArrowUpRight, ChevronDown, MessageCircle, Phone, X } from 'lucide-react';
import { navigation } from '../../data/navigation';
import { business, defaultWhatsappMessage, whatsappLink } from '../../data/business';
import { Logo } from '../common/Logo';

type Props = { open: boolean; onClose: () => void };

/**
 * Slide-in mobile navigation panel with focus trap, Escape to close,
 * body scroll lock, and an expandable services list.
 */
export function MobileNavigation({ open, onClose }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const panel = panelRef.current;
    const focusables = () =>
      Array.from(panel?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? []);
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab') {
        const els = focusables();
        const first = els[0];
        const last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  return (
    <div className={`fixed inset-0 z-[60] lg:hidden ${open ? 'visible' : 'invisible'}`} aria-hidden={!open}>
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-navy-900/70 backdrop-blur-sm transition-opacity duration-500 ${open ? 'opacity-100' : 'opacity-0'}`}
      />
      <div
        id="mobile-nav"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        className={`absolute right-0 top-0 flex h-full w-full max-w-[420px] flex-col overflow-y-auto bg-navy text-white transition-transform duration-500 ease-[var(--ease-premium)] ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden />
        <div className="relative flex items-center justify-between border-b border-white/10 px-5 py-5 sm:px-8">
          <Logo showTagline={false} onClick={onClose} />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="grid h-11 w-11 place-items-center border border-white/25 transition-colors hover:border-amber hover:text-amber"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav aria-label="Mobile" className="relative flex-1 px-5 py-6 sm:px-8">
          <ul className="divide-y divide-white/10">
            {navigation.map((item, i) => (
              <li key={item.to}>
                <div className="flex items-center justify-between">
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    onClick={onClose}
                    className="group flex flex-1 items-baseline gap-4 py-4 font-display text-2xl font-semibold uppercase tracking-tight text-white/85 transition-colors hover:text-white aria-[current=page]:text-amber"
                  >
                    <span className="font-display text-[0.65rem] font-medium text-white/40">0{i + 1}</span>
                    {item.label}
                  </NavLink>
                  {item.children && (
                    <button
                      type="button"
                      onClick={() => setServicesOpen((s) => !s)}
                      aria-expanded={servicesOpen}
                      aria-label="Show services"
                      className="grid h-11 w-11 place-items-center text-white/70 hover:text-amber"
                    >
                      <ChevronDown className={`h-5 w-5 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                    </button>
                  )}
                </div>
                {item.children && (
                  <div
                    className={`grid transition-[grid-template-rows] duration-500 ease-[var(--ease-premium)] ${
                      servicesOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <ul className="overflow-hidden">
                      {item.children.map((c) => (
                        <li key={c.to}>
                          <Link
                            to={c.to}
                            onClick={onClose}
                            tabIndex={servicesOpen ? 0 : -1}
                            className="flex items-center justify-between py-2.5 pl-8 text-[0.95rem] text-white/65 transition-colors hover:text-amber"
                          >
                            {c.label}
                            <ArrowUpRight className="h-4 w-4" />
                          </Link>
                        </li>
                      ))}
                      <li className="h-3" />
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="relative space-y-3 border-t border-white/10 px-5 py-6 sm:px-8">
          <Link
            to="/contact#quote"
            onClick={onClose}
            className="flex h-14 items-center justify-center gap-3 bg-amber font-display text-sm font-semibold uppercase tracking-[0.16em] text-navy"
          >
            Get a Free Quote <ArrowUpRight className="h-4 w-4" />
          </Link>
          <div className="grid grid-cols-2 gap-3">
            <a
              href={business.phoneHref}
              className="flex h-12 items-center justify-center gap-2 border border-white/20 text-sm font-medium hover:border-amber hover:text-amber"
            >
              <Phone className="h-4 w-4" /> Call
            </a>
            <a
              href={whatsappLink(defaultWhatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 items-center justify-center gap-2 border border-white/20 text-sm font-medium hover:border-amber hover:text-amber"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
