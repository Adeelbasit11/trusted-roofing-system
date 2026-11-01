import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export function Breadcrumb({ current }: { current: string }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-2 font-display text-[0.7rem] font-medium uppercase tracking-[0.22em] text-white/60">
        <li>
          <Link to="/" className="transition-colors hover:text-amber">
            Home
          </Link>
        </li>
        <li aria-hidden>
          <ChevronRight className="h-3 w-3" />
        </li>
        <li aria-current="page" className="text-white">
          {current}
        </li>
      </ol>
    </nav>
  );
}
