import type { SiteImage } from './images';

/**
 * PROJECT GALLERY DATA
 * ------------------------------------------------------------------
 * `verified: false` marks REPRESENTATIVE DEMO IMAGERY. These are not
 * actual Trusted Roofing Systems projects. When real project photos
 * are supplied, add them here with `verified: true` and (optionally)
 * a title/description provided by the business. Never invent client
 * names, locations or completion dates.
 */
export const projectCategories = [
  'Residential Roofing',
  'Commercial Roofing',
  'Steel Structures',
  'Waterproofing',
  'Roofing Installation',
  'Roof Repairs',
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export type Project = {
  id: string;
  category: ProjectCategory;
  image: SiteImage;
  /** Layout hint for the masonry grid */
  shape: 'tall' | 'wide' | 'square';
  verified: boolean;
  title?: string;
  description?: string;
};

const p = (
  id: string,
  category: ProjectCategory,
  file: string,
  alt: string,
  shape: Project['shape'],
): Project => ({ id, category, image: { src: `/images/${file}`, alt }, shape, verified: false });

export const projects: Project[] = [
  p('res-1', 'Residential Roofing', 'proj-residential-1.jpg', 'Contemporary residential home with charcoal selflock metal roof', 'wide'),
  p('steel-1', 'Steel Structures', 'proj-steel-1.jpg', 'Galvanized steel roof truss framework under construction', 'square'),
  p('res-2', 'Residential Roofing', 'proj-residential-2.jpg', 'Modern residence with standing-seam metal roof finish', 'tall'),
  p('com-1', 'Commercial Roofing', 'proj-commercial-1.jpg', 'Commercial warehouse with long-span metal roofing', 'wide'),
  p('inst-1', 'Roofing Installation', 'proj-installation-1.jpg', 'Roofing team installing corrugated metal sheets onto steel framework', 'wide'),
  p('rep-1', 'Roof Repairs', 'proj-repairs-1.jpg', 'Roofing crew performing inspection and maintenance on rooftop', 'tall'),
  p('wp-1', 'Waterproofing', 'proj-waterproofing-1.jpg', 'Waterproofing protective coating applied to roof gutter and parapet', 'tall'),
  p('com-2', 'Commercial Roofing', 'proj-commercial-2.jpg', 'Commercial steel roof truss framework assembled on site', 'tall'),
  p('steel-2', 'Steel Structures', 'proj-steel-2.jpg', 'Engineered roof truss framework under construction', 'wide'),
  p('res-3', 'Residential Roofing', 'proj-residential-3.jpg', 'Residential buildings with finished metal roofs', 'wide'),
];

/** Filters shown on the Projects page (per brief). */
export const projectFilters = ['All', 'Residential Roofing', 'Commercial Roofing', 'Steel Structures', 'Waterproofing', 'Roof Repairs'] as const;
