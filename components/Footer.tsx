'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer className="bg-[#5A0F1C] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8"
        >
          {/* Company Info */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-4">Virtual Learning Academy</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Transforming education through innovative online learning solutions for students worldwide.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'About', 'Programs', 'Contact'].map((link) => (
                <li key={link}>
                  <Link
                    href={`/${link.toLowerCase()}`}
                    className="text-gray-300 hover:text-[#B43A4E] transition-colors text-sm"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Programs */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold mb-4">Programs</h4>
            <ul className="space-y-2">
              {['Online School', 'IGCSE Prep', 'A Level', 'Tutoring'].map((prog) => (
                <li key={prog}>
                  <span className="text-gray-300 text-sm">{prog}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold mb-4">Get In Touch</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-[#B43A4E]" />
                <span className="text-sm">+92 XXX XXXXXXX</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-[#B43A4E]" />
                <span className="text-sm">admissions@yourdomain.com</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={16} className="text-[#B43A4E] mt-1" />
                <span className="text-sm">Your Office Address</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-[#8C1B2E]"></div>

        {/* Bottom Footer */}
        <div className="py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-300">
          <p>&copy; {currentYear} Virtual Learning Academy. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-[#B43A4E] transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-[#B43A4E] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
