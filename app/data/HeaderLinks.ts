interface HeaderLink {
  href: string;
  label: string;
  ariaLabel: string;
}

export const links: HeaderLink[] = [
  { href: '#home', label: 'Home', ariaLabel: 'Home' },
  { href: '#help', label: 'Skills', ariaLabel: 'Help. What can I do' },
  { href: '#projects', label: 'Projects', ariaLabel: 'Projects. What have I done' },
  { href: '#contact', label: 'Contact', ariaLabel: 'Contact' },
];