/**
 * VERIFIED BUSINESS INFORMATION
 * Only details supplied by the business are stored here.
 * Do not add addresses, emails, hours or claims until verified.
 */
export const business = {
  name: 'Trusted Roofing Systems',
  tagline: 'Quality You Can Trust',
  market: 'Ghana, West Africa',
  phoneDisplay: '0241924129',
  phoneHref: 'tel:0241924129',
  /** Ghana local 024 192 4129 → international +233 24 192 4129 (leading 0 dropped). */
  whatsappNumber: '233241924129',
  whatsappDisplay: '+233 24 192 4129',
  tiktokHandle: '@trustedroofingsystem',
  tiktokUrl: 'https://www.tiktok.com/@trustedroofingsystem',
  description:
    'Roofing solutions, structural services, and installation support for residential and commercial building requirements.',
} as const;

export const whatsappLink = (message?: string) =>
  `https://wa.me/${business.whatsappNumber}${message ? `?text=${encodeURIComponent(message)}` : ''}`;

export const defaultWhatsappMessage =
  'Hello Trusted Roofing Systems, I would like to enquire about a roofing project.';
