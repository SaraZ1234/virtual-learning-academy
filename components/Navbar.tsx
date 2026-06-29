'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, User } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // TEMP: replace with real auth later (JWT / NextAuth)
  const isLoggedIn = false;

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Programs', href: '/programs' },
    { label: 'Why Us', href: '/features' },
    { label: 'Testimonials', href: '/testimonials' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-[#C0C5CE] shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 sm:gap-3"
            >
              <Image
                src="/images/logo.jpg"
                alt="Virtual Learning Academy Logo"
                width={65}
                height={65}
                className="h-12 sm:h-14 w-auto"
                priority
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 lg:gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm lg:text-base text-[#1A1A1A] hover:text-[#8C1B2E] transition-colors font-medium whitespace-nowrap"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* Free Trial */}
            <Link
              href="/contact"
              className="hidden sm:block btn-primary text-xs sm:text-sm py-2 px-3 sm:px-4"
            >
              Free Trial
            </Link>

            {/* LOGIN / DASHBOARD */}
            {!isLoggedIn ? (
              <Link
                href="/login"
                className="hidden sm:flex items-center gap-2 text-sm font-medium text-[#8C1B2E] border border-[#8C1B2E] px-4 py-2 rounded-lg hover:bg-[#8C1B2E] hover:text-white transition"
              >
                <User size={16} />
                Login
              </Link>
            ) : (
              <Link
                href="/dashboard"
                className="hidden sm:flex items-center gap-2 text-sm font-medium text-white bg-[#8C1B2E] px-4 py-2 rounded-lg hover:bg-[#6f1424] transition"
              >
                <User size={16} />
                Dashboard
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-[#F5F7FA] rounded-lg transition-colors flex-shrink-0"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X size={20} className="text-[#8C1B2E]" />
              ) : (
                <Menu size={20} className="text-[#8C1B2E]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="px-2 py-3 space-y-1 border-t border-[#C0C5CE]">

            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-3 py-2 text-sm text-[#1A1A1A] hover:bg-[#F5F7FA] hover:text-[#8C1B2E] rounded-lg transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/contact"
              className="block btn-primary w-full text-xs text-center py-2 mt-2"
              onClick={() => setIsOpen(false)}
            >
              Free Trial
            </Link>

            {/* Mobile Login / Dashboard */}
            {!isLoggedIn ? (
              <Link
                href="/login"
                className="block w-full text-center border border-[#8C1B2E] text-[#8C1B2E] py-2 rounded-lg mt-2 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            ) : (
              <Link
                href="/dashboard"
                className="block w-full text-center bg-[#8C1B2E] text-white py-2 rounded-lg mt-2 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </nav>
  );
}