import { services } from './services';

export type NavItem = {
  label: string;
  to: string;
  children?: { label: string; to: string }[];
};

export const navigation: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  {
    label: 'Services',
    to: '/services',
    children: services.map((s) => ({ label: s.shortTitle, to: `/services#${s.slug}` })),
  },
  { label: 'Our Projects', to: '/projects' },
  { label: 'Contact Us', to: '/contact' },
];
