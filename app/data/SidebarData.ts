import { PersonalInfo } from "@data/blog/interfaces/Sidebar";
import { Links } from "@data/interfaces/Links";

export const personalInfo: PersonalInfo = {
  name: 'AppCheckWizard',
  role: 'Senior Developer • QA Engineer',
  description: 'Coding, testing, monitoring, and improving processes to keep your business moving forward.',
  location: 'New Brunswick, CA',
};

export const socialLinks: Links[] = [
  {
    href: 'https://github.com/alexanderscheibler',
    label: 'GitHub',
    ariaLabel: 'GitHub'
  },
  {
    href: 'https://www.linkedin.com/in/alexander-piers/',
    label: 'LinkedIn',
    ariaLabel: 'LinkedIn'
  },
];

export const navLinks: Links[] = [
  { href: '/blog', label: 'Blog', ariaLabel: 'Blog' },
  { href: '/blog/tag', label: 'Tags', ariaLabel: 'Browse tags' },
  { href: '/blog/about', label: 'About', ariaLabel: 'About AppCheckWizard' },
  { href: '/#contact', label: 'Contact', ariaLabel: 'Contact' },
];