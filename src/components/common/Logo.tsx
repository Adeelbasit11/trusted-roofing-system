import { Link } from 'react-router-dom';

type Props = { tone?: 'light' | 'dark'; showTagline?: boolean; onClick?: () => void };

/** Custom typographic wordmark with a roof-line monogram. */
export function Logo({ tone = 'light', showTagline = true, onClick }: Props) {
  const light = tone === 'light';
  return (
    <Link to="/" onClick={onClick} className="group flex items-center gap-3" aria-label="Trusted Roofing Systems — Home">
      <span className={`relative grid h-11 w-11 shrink-0 place-items-center ${light ? 'bg-white/10 ring-1 ring-white/20' : 'bg-navy'}`}>
        <svg viewBox="0 0 40 40" className="h-7 w-7" aria-hidden>
          <path d="M5 21 20 9l15 12" fill="none" stroke="#F5A623" strokeWidth="3.2" strokeLinejoin="miter" className="transition-transform duration-500 group-hover:-translate-y-0.5" />
          <path d="M10 20v12h20V20" fill="none" stroke="#fff" strokeWidth="2.4" />
          <path d="M20 9v23M10 26h20" stroke="#fff" strokeWidth="1.2" opacity=".5" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[0.95rem] font-bold uppercase tracking-[0.08em] sm:text-base ${light ? 'text-white' : 'text-navy'}`}>
          Trusted Roofing
          <span className="text-amber"> Systems</span>
        </span>
        {showTagline && (
          <span className={`mt-1.5 text-[0.6rem] font-medium uppercase tracking-[0.3em] ${light ? 'text-white/55' : 'text-muted'}`}>
            Quality You Can Trust
          </span>
        )}
      </span>
    </Link>
  );
}
