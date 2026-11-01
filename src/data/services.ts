import { images, type SiteImage } from './images';

/**
 * SERVICE CATALOGUE
 * Content is intentionally general. No load capacities, gauges,
 * standards, guarantees or prices are stated — add only verified
 * technical information supplied by the business.
 */
export type Service = {
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  /** Value used by the quote form dropdown */
  formValue: string;
  label: string;
  summary: string;
  intro: string;
  detail: string;
  applications: string[];
  benefits: string[];
  image: SiteImage;
};

export const services: Service[] = [
  {
    slug: 'wood-works',
    number: '01',
    title: 'Wood Works',
    shortTitle: 'Wood Works',
    formValue: 'Wood Works',
    label: 'Structure / Timber',
    summary:
      'Wood-related roofing and structural work for building projects requiring carefully planned roof components.',
    intro: 'Timber roof components planned around the shape and needs of your building.',
    detail:
      'Wood works cover roofing-related carpentry such as timber rafters, roof framing and supporting roof components. A well-planned timber structure gives the roofing material a stable base and helps shape the final roof profile. Discuss your building plans to explore whether a timber roof structure suits your project.',
    applications: ['Timber roof framing', 'Rafters and roof supports', 'Residential roof structures', 'Roof extensions and renovations'],
    benefits: ['Roof structure planned around the building layout', 'Supports a range of roofing finishes', 'Suitable for new builds and renovations'],
    image: images.svcWood,
  },
  {
    slug: 'waterproofing',
    number: '02',
    title: 'Waterproofing',
    shortTitle: 'Waterproofing',
    formValue: 'Waterproofing',
    label: 'Protection / Surfaces',
    summary:
      'Roof and structural waterproofing solutions designed to help address water penetration concerns.',
    intro: 'Helping protect roofs and building surfaces from water penetration.',
    detail:
      'Waterproofing is the application of protective treatments to roof and structural surfaces to help prevent water from entering a building. It is commonly considered for flat concrete roofs, slabs and areas where water tends to collect. Share details of your surface and the concerns you are seeing to discuss an appropriate approach.',
    applications: ['Flat concrete roofs', 'Roof slabs and parapets', 'Areas prone to water collection', 'Surfaces showing damp or seepage'],
    benefits: ['Helps reduce water penetration concerns', 'Supports the protection of building surfaces', 'Can form part of roof maintenance planning'],
    image: images.svcWaterproofing,
  },
  {
    slug: 'galvanized-trusses',
    number: '03',
    title: 'Galvanized Trusses',
    shortTitle: 'Galvanized Trusses',
    formValue: 'Galvanized Trusses',
    label: 'Structure / Steel',
    summary: 'Galvanized steel truss solutions for roofing structures and building frameworks.',
    intro: 'Galvanized steel frameworks that form the backbone of a modern roof.',
    detail:
      'Galvanized trusses are steel roof frameworks with a protective zinc coating. They form the structural skeleton that carries the roofing sheets and give the roof its shape. Galvanized steel trusses are widely used for residential and commercial roofing. Talk to the team about your building to discuss a truss solution for your roof.',
    applications: ['Residential roof frameworks', 'Commercial and industrial roofs', 'New construction projects', 'Replacement roof structures'],
    benefits: ['Steel framework for metal roofing systems', 'Galvanized protective coating', 'Clean, precise structural lines'],
    image: images.svcTrusses,
  },
  {
    slug: 'ibr-installation',
    number: '04',
    title: 'IBR Installation',
    shortTitle: 'IBR Installation',
    formValue: 'IBR Installation',
    label: 'Installation / Sheets',
    summary:
      'Professional installation of IBR roofing sheets for suitable residential and commercial structures.',
    intro: 'Installation of IBR metal roofing sheets with a strong, defined profile.',
    detail:
      'IBR (Inverted Box Rib) roofing sheets are metal sheets with a trapezoidal rib profile, a familiar choice for homes, commercial buildings and warehouses. Installation involves careful sheet alignment, fixing and finishing so the roof looks clean and performs as intended. Enquire with your building details to discuss IBR roofing for your project.',
    applications: ['Residential homes', 'Commercial buildings', 'Warehouses and workshops', 'Roof replacements'],
    benefits: ['Recognisable trapezoidal metal profile', 'Suitable for a wide range of buildings', 'Clean, aligned roof appearance'],
    image: images.svcIbr,
  },
  {
    slug: 'selflock-roofing',
    number: '05',
    title: 'Selflock Roofing',
    shortTitle: 'Selflock Roofing',
    formValue: 'Selflock Roofing',
    label: 'Installation / Modern',
    summary:
      'Selflock roofing installation for projects requiring a clean, modern metal roofing finish.',
    intro: 'A clean, modern metal roofing finish with sleek seam lines.',
    detail:
      'Selflock roofing is a metal roofing system where sheets lock together along raised seams, giving a minimal and contemporary look with fewer visible fixings. It is popular for modern homes and architectural projects where the roof is part of the design statement. Discuss your design goals to explore selflock roofing for your building.',
    applications: ['Contemporary residential homes', 'Architectural feature roofs', 'Commercial frontages', 'Modern renovations'],
    benefits: ['Minimal, modern roof appearance', 'Clean vertical seam lines', 'Complements contemporary architecture'],
    image: images.svcSelflock,
  },
  {
    slug: 'leakage-repairs',
    number: '06',
    title: 'Fixing of Leakages',
    shortTitle: 'Leakage Repairs',
    formValue: 'Fixing of Leakages',
    label: 'Repair / Inspection',
    summary:
      'Roof leakage inspection and repair services to help identify and address water entry problems.',
    intro: 'Inspection and repair to help find and address roof leaks.',
    detail:
      'Roof leaks can come from damaged sheets, loose fixings, worn joints or gaps around roof features. Leakage repair starts with inspecting the roof to understand where water may be entering, followed by the appropriate repair work. If you are noticing leaks, stains or damp, share photos and details to start the conversation.',
    applications: ['Leaking metal roofs', 'Damaged or displaced sheets', 'Worn joints and fixings', 'Ceiling stains and damp areas'],
    benefits: ['Inspection to help locate water entry', 'Targeted repair approach', 'Supports longer-term roof care'],
    image: images.svcLeakage,
  },
  {
    slug: 'technical-advice',
    number: '07',
    title: 'Free Technical Advice',
    shortTitle: 'Technical Advice',
    formValue: 'Free Technical Advice',
    label: 'Guidance / Planning',
    summary:
      'Technical guidance to help customers understand roofing options and discuss suitable solutions for their projects.',
    intro: 'Talk through your roofing options before you build or repair.',
    detail:
      'Choosing between timber or steel structures, IBR or selflock sheets, or deciding how to deal with a leak can be confusing. Free technical advice gives you the chance to discuss your building, your plans and your budget priorities so you can better understand the roofing options available. Get in touch to start the conversation.',
    applications: ['New building planning', 'Choosing roofing materials', 'Repair or replace decisions', 'Understanding roofing options'],
    benefits: ['Clearer understanding of options', 'Project-specific discussion', 'No-cost initial guidance'],
    image: images.svcAdvice,
  },
  {
    slug: 'roof-maintenance',
    number: '08',
    title: 'Roof Maintenance & Care',
    shortTitle: 'Maintenance & Care',
    formValue: 'Roof Maintenance & Care',
    label: 'Care / Longevity',
    summary:
      'Periodic structural inspections, preventative care, and re-fastening to safeguard and prolong your roof’s life.',
    intro: 'Proactive maintenance and inspections to protect your roofing investment.',
    detail:
      'Routine roofing checks identify loose fasteners, blocked gutters, surface wear, and early weathering before they become costly leaks. Our maintenance service provides detailed structural assessments and essential preventative care for residential, commercial, and industrial roofing systems across Ghana.',
    applications: ['Periodic residential checkups', 'Commercial roof maintenance', 'Pre-rainy season inspections', 'Fastener tightening & re-sealing'],
    benefits: ['Extends overall roof lifespan', 'Catches minor wear before leaks develop', 'Preserves structural aesthetics & value'],
    image: images.svcMaintenance,
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
