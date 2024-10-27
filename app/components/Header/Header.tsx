'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { links } from '@data/HeaderLinks';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
      <header className="fixed w-full bg-gray-600 bg-opacity-90 z-50 backdrop-filter backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                data-testid="mobile-menu-button"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true"/>
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true"/>
                )}
              </button>
            </div>
          </div>
        </div>
        {/* Mobile Links */}
        {isMenuOpen && (
          <div className="md:hidden" data-testid="mobile-nav">
            <div className="px-2 pt-2 pb-3 space-y-1 flex flex-col sm:px-3">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-label={link.ariaLabel}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>
  )
}