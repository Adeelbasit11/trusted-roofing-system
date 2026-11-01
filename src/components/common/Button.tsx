import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline-light' | 'outline-dark' | 'ghost-light' | 'ghost-dark';

const base =
  'group/btn relative isolate inline-flex items-center justify-center gap-3 overflow-hidden whitespace-nowrap font-display text-[0.74rem] sm:text-[0.78rem] font-semibold uppercase tracking-[0.16em] transition-colors duration-500 ease-[var(--ease-premium)] disabled:cursor-not-allowed disabled:opacity-60';

const sizes = {
  md: 'h-14 px-6 sm:px-7',
  sm: 'h-11 px-5',
} as const;

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-amber text-navy hover:text-white',
  secondary: 'bg-blue text-white hover:text-navy',
  'outline-light': 'border border-white/35 text-white hover:border-white hover:text-navy',
  'outline-dark': 'border border-navy/25 text-navy hover:border-navy hover:text-white',
  'ghost-light': 'text-white',
  'ghost-dark': 'text-navy',
};

const fills: Record<ButtonVariant, string> = {
  primary: 'bg-navy',
  secondary: 'bg-amber',
  'outline-light': 'bg-white',
  'outline-dark': 'bg-navy',
  'ghost-light': '',
  'ghost-dark': '',
};

type Props = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: keyof typeof sizes;
  icon?: ReactNode | false;
  className?: string;
  /** Internal route */
  to?: string;
  /** External / tel / wa link */
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  ariaLabel?: string;
};

/**
 * Brand button. Renders a router <Link>, an <a>, or a <button>
 * depending on props. Includes a sliding fill and arrow micro-interaction.
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  to,
  href,
  onClick,
  type = 'button',
  disabled,
  ariaLabel,
}: Props) {
  const isGhost = variant.startsWith('ghost');
  const cls = `${base} ${isGhost ? '' : sizes[size]} ${variants[variant]} ${className}`;

  const inner = (
    <>
      {!isGhost && (
        <span
          aria-hidden
          className={`absolute inset-0 -z-10 translate-y-[101%] ${fills[variant]} transition-transform duration-500 ease-[var(--ease-premium)] group-hover/btn:translate-y-0`}
        />
      )}
      <span className={isGhost ? 'border-b border-current/40 pb-1 transition-colors group-hover/btn:border-amber' : ''}>
        {children}
      </span>
      {icon !== false && (
        <span className="relative inline-flex h-4 w-4 shrink-0 overflow-hidden">
          {icon ?? (
            <>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-[var(--ease-premium)] group-hover/btn:-translate-y-full group-hover/btn:translate-x-full" />
              <ArrowUpRight className="absolute h-4 w-4 -translate-x-full translate-y-full transition-transform duration-500 ease-[var(--ease-premium)] group-hover/btn:translate-x-0 group-hover/btn:translate-y-0" />
            </>
          )}
        </span>
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={cls} aria-label={ariaLabel} onClick={onClick}>
        {inner}
      </Link>
    );
  }
  if (href) {
    const external = /^https?:/.test(href);
    return (
      <a
        href={href}
        className={cls}
        aria-label={ariaLabel}
        onClick={onClick}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {inner}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls} aria-label={ariaLabel}>
      {inner}
    </button>
  );
}
