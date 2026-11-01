import { Link } from 'react-router-dom';

type Props = { tone?: 'light' | 'dark'; showTagline?: boolean; onClick?: () => void };

/**
 * Official Brand Logo: Trusted Roofing System
 * Uses the client's transparent official badge logo.
 */
export function Logo({ onClick }: Props) {
  return (
    <Link
      to="/"
      onClick={onClick}
      className="group inline-flex shrink-0 items-center"
      aria-label="Trusted Roofing System — Home"
    >
      <img
        src="/images/trusted-site-logo.png"
        alt="Trusted Roofing System — Quality You Can Trust"
        className="h-12 xs:h-14 sm:h-15 lg:h-16 w-auto shrink-0 object-contain transition-transform duration-300 ease-out group-hover:scale-[1.03] drop-shadow-[0_2px_12px_rgba(255,255,255,0.16)]"
      />
    </Link>
  );
}
