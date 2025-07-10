'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { links } from '@data/HeaderLinks';
import MobileNav from '@components/Blog/MobileNav';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = (isOpen: boolean) => {
    setMenuOpen(isOpen)
  }

  return (
    <header className="fixed w-full bg-gray-100 dark:bg-gray-800 z-50 backdrop-filter backdrop-blur-sm">
      <div className="p-2 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-white font-bold text-xl">
              AppCheckWizard
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:block" data-testid="desktop-nav">
            <div className="ml-10 flex items-baseline space-x-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-label={link.ariaLabel}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden" data-testid="mobile-menu-div">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              data-testid="mobile-menu-button"
            >
              <span className="sr-only">Open main menu</span>
              {menuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true"/>
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true"/>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Links */}
      <MobileNav
        links={links}
        isMenuOpen={menuOpen}
        onClose={toggleMenu}
      />
    </header>
  )
}