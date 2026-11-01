import { Link } from 'react-router-dom';
import { ArrowUp, ArrowUpRight, MessageCircle, Phone } from 'lucide-react';
import { navigation } from '../../data/navigation';
import { services } from '../../data/services';
import { business, defaultWhatsappMessage, whatsappLink } from '../../data/business';
import { Logo } from '../common/Logo';
import { TikTokIcon } from '../common/TikTokIcon';

const linkCls =
  'group inline-flex items-center gap-2 text-[0.95rem] text-white/65 transition-colors duration-300 hover:text-white';

export function Footer() {
  const year = new Date().getFullYear();
  const toTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden bg-navy-900 text-white">
      <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden />

      {/* Oversized wordmark band */}
      <div className="container-x relative border-b border-white/10 pb-12 pt-20 lg:pt-28">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <p className="font-display text-[clamp(2.2rem,6vw,5.5rem)] font-bold uppercase leading-[0.92] tracking-[-0.035em]">
            Quality you
            <br />
            can <span className="text-amber">trust.</span>
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={business.phoneHref}
              className="group inline-flex h-14 items-center gap-3 bg-amber px-6 font-display text-sm font-semibold uppercase tracking-[0.14em] text-navy transition-colors hover:bg-white"
            >
              <Phone className="h-4 w-4" /> {business.phoneDisplay}
            </a>
            <button
              type="button"
              onClick={toTop}
              aria-label="Back to top"
              className="group grid h-14 w-14 place-items-center border border-white/25 transition-colors hover:border-amber hover:text-amber"
            >
              <ArrowUp className="h-5 w-5 transition-transform duration-500 group-hover:-translate-y-1" />
            </button>
          </div>
        </div>
      </div>

      <div className="container-x relative grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <Logo />
          <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-white/60">{business.description}</p>
          <p className="mt-6 text-xs uppercase tracking-[0.25em] text-white/40">Serving {business.market}</p>
        </div>

        <nav aria-label="Footer quick links" className="lg:col-span-2">
          <h3 className="mb-6 font-display text-xs font-semibold uppercase tracking-[0.25em] text-amber">Quick Links</h3>
          <ul className="space-y-3">
            {navigation.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className={linkCls}>
                  <span className="h-px w-0 bg-amber transition-all duration-300 group-hover:w-3" />
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Footer services" className="lg:col-span-3">
          <h3 className="mb-6 font-display text-xs font-semibold uppercase tracking-[0.25em] text-amber">Our Services</h3>
          <ul className="space-y-3">
            {services.map((s) => (
              <li key={s.slug}>
                <Link to={`/services#${s.slug}`} className={linkCls}>
                  <span className="h-px w-0 bg-amber transition-all duration-300 group-hover:w-3" />
                  {s.shortTitle}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h3 className="mb-6 font-display text-xs font-semibold uppercase tracking-[0.25em] text-amber">Contact</h3>
          <ul className="space-y-4">
            <li>
              <a href={business.phoneHref} className={linkCls}>
                <Phone className="h-4 w-4 text-white/40" /> {business.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={whatsappLink(defaultWhatsappMessage)} target="_blank" rel="noopener noreferrer" className={linkCls}>
                <MessageCircle className="h-4 w-4 text-white/40" /> WhatsApp
                <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
            </li>
            <li>
              <a href={business.tiktokUrl} target="_blank" rel="noopener noreferrer" className={linkCls}>
                <TikTokIcon className="h-4 w-4 text-white/40" /> TikTok {business.tiktokHandle}
                <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-x relative flex flex-col gap-3 border-t border-white/10 py-7 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {business.name}. All rights reserved.
        </p>
        <p>Imagery shown is representative for demonstration purposes.</p>
      </div>
    </footer>
  );
}
