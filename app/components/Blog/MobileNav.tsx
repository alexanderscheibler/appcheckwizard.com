'use client'

import Link from 'next/link'
import { Links } from '@data/interfaces/Links';

interface MobileNavProps {
  isMenuOpen: boolean;
  onClose: (isOpen: boolean) => void;
  links: Links[]
}

export default function MobileNav({ isMenuOpen, onClose, links }: MobileNavProps) {

  if (!isMenuOpen) return null;

  return (
    <div className="md:hidden" data-testid="mobile-nav">
      <div className="px-2 pb-3 space-y-1 flex flex-col sm:px-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            aria-label={link.ariaLabel}
            onClick={() => onClose(false)}
            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  )
}