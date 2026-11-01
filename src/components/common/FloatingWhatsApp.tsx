import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { whatsappLink, defaultWhatsappMessage, business } from '../../data/business';

/**
 * Fixed Floating WhatsApp Button with radiant glowing effect & pulsing halo.
 * Displays on the bottom-right corner across all pages.
 */
export function FloatingWhatsApp() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <aside
      aria-label="Contact on WhatsApp"
      className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 flex items-center gap-3 select-none"
    >
      {/* Floating Tooltip Label (Appears on Hover or Desktop) */}
      <div
        className={`hidden sm:flex items-center gap-2 rounded-full bg-navy/95 border border-white/15 px-4 py-2 text-white shadow-xl backdrop-blur-md transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'
        }`}
      >
        <span className="h-2 w-2 rounded-full bg-[#25D366] animate-pulse" />
        <span className="font-display text-xs font-semibold uppercase tracking-wider text-white">
          Chat with us
        </span>
      </div>

      {/* Radiant Glowing Floating WhatsApp Action Button */}
      <a
        href={whatsappLink(defaultWhatsappMessage)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat on WhatsApp with Trusted Roofing Systems at ${business.phoneDisplay}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_28px_rgba(37,211,102,0.45)] transition-all duration-300 ease-out hover:scale-110 hover:shadow-[0_0_35px_rgba(37,211,102,0.75)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#25D366]"
      >
        {/* Concentric Glowing Pulse Halo */}
        <span className="absolute -inset-1.5 rounded-full bg-[#25D366]/40 blur-md animate-pulse" aria-hidden="true" />
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-75 animate-ping" aria-hidden="true" />

        {/* WhatsApp Icon */}
        <span className="relative z-10">
          <MessageCircle className="h-7 w-7 sm:h-8 sm:w-8 fill-white text-[#25D366] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
        </span>

        {/* Live Active Online Green Dot */}
        <span className="absolute top-0.5 right-0.5 z-20 flex h-4 w-4 items-center justify-center">
          <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
          <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
        </span>
      </a>
    </aside>
  );
}
