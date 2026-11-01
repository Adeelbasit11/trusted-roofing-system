import { Info } from 'lucide-react';

/** Discreet notice marking representative (non-verified) imagery. */
export function DemoNotice({ tone = 'light', className = '' }: { tone?: 'light' | 'dark'; className?: string }) {
  return (
    <p
      className={`inline-flex items-start gap-2 text-xs leading-relaxed ${tone === 'dark' ? 'text-white/50' : 'text-muted'} ${className}`}
    >
      <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
      Representative demo imagery for presentation purposes — not verified Trusted Roofing Systems projects.
    </p>
  );
}
