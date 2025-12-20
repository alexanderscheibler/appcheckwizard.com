'use client'

import Link from 'next/link'
import { useState } from 'react'
import { FaMapMarkerAlt, FaGithub, FaLinkedin } from 'react-icons/fa'
import { navLinks, personalInfo, socialLinks } from '@data/SidebarData'
import { MobileMenuButton } from '@components/Blog/MobileMenuButton';
import MobileNav from '@components/Blog/MobileNav';

export function Sidebar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
    // setMenuOpen(!menuOpen);
  };

  return (
    <>
      <header className="hidden p-4 py-8 md:flex md:flex-col md:w-[18.2rem] md:fixed md:inset-y-0 bg-gray-100 dark:bg-gray-800" id="top">
        <div className="mb-6 md:space-y-6">
          <h2 className="text-2xl font-bold">
            <Link href={`/`} className="text-xl font-semibold hover:underline" title="Home page">
              {personalInfo.name}
            </Link>
          </h2>
          <p className="text-gray-600 dark:text-gray-400">{personalInfo.role}</p>
          <p className="mt-2 text-sm">{personalInfo.description}</p>
        </div>
        <div className="mb-6">
          <p className="flex items-center mb-2">
            <FaMapMarkerAlt className="mr-2"/>
            {personalInfo.location}
          </p>
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="flex items-center mb-2 hover:text-blue-500"
              aria-label={link.ariaLabel}
            >
              {link.label === 'GitHub' && (
                <>
                  <FaGithub className="mr-2"/> GitHub
                </>
              )}
              {link.label === 'LinkedIn' && (
                <>
                  <FaLinkedin className="mr-2"/> LinkedIn
                </>
              )}
            </a>
          ))}
        </div>
        <nav>
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} aria-label={link.ariaLabel} className="hover:text-blue-500">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Mobile Sidebar (Sticky Header with Hamburger Menu) */}
      <aside className="p-4 px-4 md:hidden fixed top-0 inset-x-0 bg-gray-100 dark:bg-gray-800 z-50">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">
              <Link href={`/blog`} className="hover:underline" title="Blog">
                {personalInfo.name}
              </Link>
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">{personalInfo.role}</p>
          </div>

          {/* Mobile Menu Button */}
          <MobileMenuButton isMenuOpen={menuOpen} toggleMenu={toggleMenu} />
        </div>

        {/* Social Links */}
        <div className="mt-4">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="flex items-center mb-2 hover:text-blue-500 hover:underline"
              aria-label={link.ariaLabel}
            >
              {link.label === 'GitHub' && (
                <>
                  <FaGithub className="mr-2"/> GitHub
                </>
              )}
              {link.label === 'LinkedIn' && (
                <>
                  <FaLinkedin className="mr-2"/> LinkedIn
                </>
              )}
            </a>
          ))}
        </div>

        <MobileNav
          links={navLinks}
          isMenuOpen={menuOpen}
          onClose={toggleMenu}
        />
      </aside>
    </>
  );
}