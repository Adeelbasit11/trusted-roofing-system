/**
 * CENTRALISED IMAGE LIBRARY
 * ------------------------------------------------------------------
 * Every photograph used on the website is referenced from here.
 * All current images are REPRESENTATIVE DEMO IMAGERY (AI-generated)
 * and are NOT verified Trusted Roofing Systems projects.
 * To replace with real company photos, drop new files into
 * /public/images and update the `src` values below.
 */
export type SiteImage = { src: string; alt: string };

const img = (file: string, alt: string): SiteImage => ({ src: `/images/${file}`, alt });

export const images = {
  // Home — hero & storytelling
  hero: img('hero-modern-roof.jpg', 'Modern two-storey residence with a dark standing-seam metal roof at dusk'),
  storyStructure: img('story-1-structure.jpg', 'Building under construction with block walls ready for the roof structure'),
  storyEngineering: img('story-2-engineering.jpg', 'Galvanized steel roof truss framework installed on a house'),
  storyInstallation: img('story-3-installation.jpg', 'Roofing workers installing metal roofing sheets on steel trusses'),
  storyFinished: img('story-4-finished.jpg', 'Completed modern house with a finished metal roof at golden hour'),

  // Home — engineering excellence
  engTruss: img('eng-truss-detail.jpg', 'Close detail of a galvanized steel truss connection'),
  engSheets: img('eng-sheet-alignment.jpg', 'Aligned metal roofing sheet ribs with fixings'),
  engFinished: img('eng-finished-commercial.jpg', 'Commercial building with a long-span metal roof at blue hour'),

  // Services
  svcWood: img('svc-wood-works.jpg', 'Carpenter working on a timber roof framework'),
  svcWaterproofing: img('svc-waterproofing.jpg', 'Waterproofing coating being applied to a flat concrete roof'),
  svcTrusses: img('svc-galvanized-trusses.jpg', 'Rows of galvanized steel roof trusses against the sky'),
  svcIbr: img('svc-ibr-installation.jpg', 'IBR trapezoidal metal roofing sheets being fixed'),
  svcSelflock: img('svc-selflock-roofing.jpg', 'Modern standing-seam selflock metal roof with clean seams'),
  svcLeakage: img('svc-leakage-repair.jpg', 'Roofer inspecting and sealing a joint on a metal roof'),
  svcAdvice: img('svc-technical-advice.jpg', 'Roof plans and construction drawings reviewed during a consultation'),

  // Supporting
  whyStructural: img('why-structural.jpg', 'Upward view of a galvanized steel roof structure with workers above'),
  ctaHome: img('cta-home.jpg', 'Large modern building roof structure at blue hour'),
  ctaAlt: img('cta-alt.jpg', 'Steel roof trusses silhouetted against a sunset sky'),

  // Page heroes
  aboutHero: img('about-hero.jpg', 'Roofer standing on a completed metal roof at sunset'),
  aboutIntro: img('about-intro.jpg', 'Roofing professionals discussing a project on site'),
  aboutWhy: img('about-why.jpg', 'Finished roof edge with metal fascia and gutter'),
  servicesHero: img('services-hero.jpg', 'Rows of metal roof sheets and ridge caps on a large building'),
  projectsHero: img('projects-hero.jpg', 'Aerial view of homes with varied metal roofs'),
  contactHero: img('contact-hero.jpg', 'Dark metal roof with rain droplets reflecting light'),
} satisfies Record<string, SiteImage>;
