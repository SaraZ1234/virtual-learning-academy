'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPinterestP,
} from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Programs', href: '/programs' },
    { label: 'Why Us', href: '/features' },
    { label: 'Testimonials', href: '/testimonials' },
    { label: 'Contact Us', href: '/contact' },
  ];

  const admissionsLinks = [
    { label: 'Subject Tuitions', href: '/#programs' },
    { label: 'Online School Classes', href: '/#programs' },
    { label: 'Core Research Services', href: '/#research-services' },
  ];

  const socialLinks = [
    { icon: FaFacebookF, href: "#", label: "Facebook" },
    { icon: FaInstagram, href: "#", label: "Instagram" },
    { icon: FaPinterestP, href: "#", label: "Pinterest" },
    { icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-[#5A0F1C] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
          {/* Brand Section */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <div className="flex items-center gap-4">
                <Image
                  src="/images/logo1.jpg"
                  alt="Virtual Learning Academy Logo"
                  width={71}
                  height={71}
                  className="h-17 w-17 rounded-full object-cover border-2 border-[#B43A4E]/40"
                />
                <div>
                  {/* <h3 className="text-base font-bold leading-tight">Virtual Learning</h3>
                  <p className="text-sm text-[#B43A4E] font-semibold">Academy</p> */}
                </div>
              </div>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed mb-5">
              Our goal is to establish ourselves as a leading education institution, distinguished nationally and internationally for high-quality teaching, innovation, and academic excellence.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="h-10 w-10 rounded-full border-2 border-gray-400 flex items-center justify-center text-gray-300 hover:border-[#B43A4E] hover:bg-[#B43A4E] hover:text-white transition-all duration-300"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className="mb-5">
              <h4 className="text-xl font-bold text-white mb-2">Quick Links</h4>
              <div className="w-20 h-1 bg-[#B43A4E]"></div>
            </div>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-[#B43A4E] transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Admissions */}
          <div>
            <div className="mb-5">
              <h4 className="text-xl font-bold text-white mb-2">Our Services</h4>
              <div className="w-20 h-1 bg-[#B43A4E]"></div>
            </div>
            <ul className="space-y-2">
              {admissionsLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-[#B43A4E] transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <div className="mb-5">
              <h4 className="text-xl font-bold text-white mb-2">Contact Information</h4>
              <div className="w-20 h-1 bg-[#B43A4E]"></div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="text-[#B43A4E] mt-0.5 flex-shrink-0" />
                <p className="text-gray-300 text-sm leading-relaxed">
                  Your Office Address
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={20} className="text-[#B43A4E] mt-0.5 flex-shrink-0" />
                <div>
                  <a
                    href="mailto:hafsaakbar071@gmail.com"
                    className="text-gray-300 hover:text-[#B43A4E] transition-colors duration-300 text-sm break-all"
                  >
                    hafsaakbar071@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={20} className="text-[#B43A4E] mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">+92 3252467463</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700"></div>

        {/* Bottom Footer */}
        <div className="py-5 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 gap-3">
          <p>&copy; {currentYear} Virtual Learning Academy. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-[#B43A4E] transition-colors duration-300">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
