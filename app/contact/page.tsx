'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Phone,
      label: 'Phone',
      value: '+92 XXX XXXXXXX',
      link: 'tel:+92XXXXXXX',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'admissions@yourdomain.com',
      link: 'mailto:admissions@yourdomain.com',
    },
    {
      icon: MapPin,
      label: 'Address',
      value: 'Your Office Address',
      link: '#',
    },
  ];

  return (
    <>
      <Navbar />
      <main>
        {/* Page Header */}
        <motion.section className="gradient-hero text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-bold mb-4"
            >
              Get In Touch
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-100"
            >
              Let&apos;s Build Your Child&apos;s Future Together
            </motion.p>
          </div>
        </motion.section>

        {/* Contact Info Cards */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motion.a
                    key={index}
                    href={info.link}
                    variants={itemVariants}
                    whileHover={{ translateY: -4 }}
                    className="card-feature group"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-14 h-14 bg-gradient-to-br from-[#8C1B2E] to-[#B43A4E] rounded-lg flex items-center justify-center mb-4"
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-[#8C1B2E] mb-2">
                      {info.label}
                    </h3>
                    <p className="text-[#1A1A1A] group-hover:text-[#8C1B2E] transition-colors">
                      {info.value}
                    </p>
                  </motion.a>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-20 bg-[#F5F7FA]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="section-heading mb-8">Send Us a Message</h2>

                <motion.form onSubmit={handleSubmit} className="space-y-6">
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-[#C0C5CE] bg-white text-[#1A1A1A] focus:outline-none focus:border-[#8C1B2E] focus:ring-2 focus:ring-[#8C1B2E] focus:ring-opacity-20 transition-all"
                      placeholder="Your name"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-[#C0C5CE] bg-white text-[#1A1A1A] focus:outline-none focus:border-[#8C1B2E] focus:ring-2 focus:ring-[#8C1B2E] focus:ring-opacity-20 transition-all"
                      placeholder="your@email.com"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-[#C0C5CE] bg-white text-[#1A1A1A] focus:outline-none focus:border-[#8C1B2E] focus:ring-2 focus:ring-[#8C1B2E] focus:ring-opacity-20 transition-all"
                      placeholder="+1 (555) 123-4567"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                      Subject
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-[#C0C5CE] bg-white text-[#1A1A1A] focus:outline-none focus:border-[#8C1B2E] focus:ring-2 focus:ring-[#8C1B2E] focus:ring-opacity-20 transition-all"
                    >
                      <option value="">Select a subject</option>
                      <option value="enrollment">Enrollment Inquiry</option>
                      <option value="programs">Program Information</option>
                      <option value="trial">Free Trial Class</option>
                      <option value="general">General Question</option>
                      <option value="other">Other</option>
                    </select>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border border-[#C0C5CE] bg-white text-[#1A1A1A] focus:outline-none focus:border-[#8C1B2E] focus:ring-2 focus:ring-[#8C1B2E] focus:ring-opacity-20 transition-all resize-none"
                      placeholder="Tell us how we can help..."
                    ></textarea>
                  </motion.div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="btn-primary w-full flex items-center justify-center gap-2"
                  >
                    <Send size={20} />
                    Send Message
                  </motion.button>

                  {submitted && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm font-medium"
                    >
                      ✓ Message sent successfully! We&apos;ll get back to you soon.
                    </motion.div>
                  )}
                </motion.form>
              </motion.div>

              {/* Additional Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div>
                  <h3 className="section-subheading mb-4">Business Hours</h3>
                  <div className="space-y-3 text-[#1A1A1A]">
                    <p>
                      <span className="font-semibold">Monday - Friday:</span> 9:00 AM - 6:00 PM
                    </p>
                    <p>
                      <span className="font-semibold">Saturday:</span> 10:00 AM - 4:00 PM
                    </p>
                    <p>
                      <span className="font-semibold">Sunday:</span> Closed
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-8 border border-[#C0C5CE]">
                  <h3 className="section-subheading mb-4">Why Contact Us?</h3>
                  <ul className="space-y-3 text-[#1A1A1A]">
                    <li className="flex items-start gap-3">
                      <span className="text-[#8C1B2E] font-bold">•</span>
                      <span>Get personalized program recommendations</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#8C1B2E] font-bold">•</span>
                      <span>Learn about current pricing and offers</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#8C1B2E] font-bold">•</span>
                      <span>Schedule a free trial class</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#8C1B2E] font-bold">•</span>
                      <span>Discuss your specific learning needs</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-[#8C1B2E] to-[#B43A4E] rounded-xl p-8 text-white">
                  <h3 className="text-xl font-bold mb-4">Book Your Free Trial</h3>
                  <p className="mb-6 text-gray-100">
                    Experience our teaching methodology and meet our expert educators
                  </p>
                  <button className="btn-primary bg-white text-[#8C1B2E] hover:bg-gray-100 w-full">
                    Schedule Now
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
