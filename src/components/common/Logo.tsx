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
      className="group inline-flex items-center"
      aria-label="Trusted Roofing System — Home"
    >
      <img
        src="/images/trusted-site-logo.png"
        alt="Trusted Roofing System — Quality You Can Trust"
        className="h-10 sm:h-12 md:h-14 w-auto object-contain transition-transform duration-300 ease-out group-hover:scale-[1.03] filter drop-shadow-md"
      />
    </Link>
  );
}
