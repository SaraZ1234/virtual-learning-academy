'use client';

import { motion } from 'framer-motion';
import { Clock, Users, BookOpen, Globe, CheckCircle, Star } from 'lucide-react';
import Link from 'next/link';
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

export default function Page() {
  const features = [
    {
      icon: CheckCircle,
      title: 'Free Trial Classes',
      description: 'We offer a 3-day free trial of our live classes without any registration or fees. Just send us your child\'s name and grade, and we\'ll provide the Zoom meeting link.',
    },
    {
      icon: BookOpen,
      title: 'Oxford and Cambridge Textbooks',
      description: 'We are offering British Curriculum along with Oxford and Cambridge\'s books from KG 1 till Grade 7 & for Grade 8 till grade 12 we are affiliated with Federal Board on Pakistan.',
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Connect with students from around the world. Our virtual learning platform enables students to study from anywhere and join our diverse, international learning community.',
    },
    {
      icon: Clock,
      title: 'Flexible Timings',
      description: 'Experience flexible learning on your schedule. Join us now and unlock limitless possibilities for your education journey with morning and evening session options.',
    },
    {
      icon: BookOpen,
      title: 'E-Books in Google Classrooms',
      description: 'We\'ve made it easy for our students to access their course materials. Once enrolled and fees are paid, they gain access to our Google Classroom, where all necessary books are scanned and uploaded for convenient download from anywhere.',
    },
    {
      icon: Users,
      title: 'Live Classes, Not Recorded Lectures',
      description: 'Choose live interactive classes for real-time learning! Our live classes ensure active participation and immediate feedback, making education interactive and engaging. Say goodbye to recorded lectures and join us today!',
    },
  ];

  const benefits = [
    {
      title: 'Study as a Regular Student',
      description: 'Enroll in our comprehensive programs with daily live classes and continuous assessment.',
      icon: BookOpen,
    },
    {
      title: 'Free Online Consultation for Parents',
      description: 'Get expert guidance on choosing the right program and curriculum for your child.',
      icon: Users,
    },
    {
      title: 'Global Reach',
      description: 'Access education from anywhere in the world with our online platform.',
      icon: Globe,
    },
    {
      title: 'Flexible Timings',
      description: 'Choose morning or evening sessions that fit your schedule perfectly.',
      icon: Clock,
    },
  ];

  const offerings = [
    { name: 'Virtual Learning Platform', icon: '📚' },
    { name: 'Comprehensive Syllabus', icon: '📖' },
    { name: 'Affordable Fee Structure', icon: '💰' },
    { name: 'Community & Social', icon: '👥' },
    { name: 'Resource Library', icon: '📚' },
    { name: 'Easy Admissions', icon: '✍️' },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* HERO SECTION */}
        <motion.section className="relative overflow-hidden bg-gradient-to-r from-[#8C1B2E] to-[#B43A4E] text-white py-16 md:py-24">
          <motion.div
            className="absolute -top-32 -right-32 w-64 h-64 bg-white rounded-full opacity-5 blur-3xl"
            animate={{ y: [0, 40, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -bottom-32 -left-32 w-64 h-64 bg-white rounded-full opacity-5 blur-3xl"
            animate={{ y: [0, -40, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 text-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 text-white"
            >
              Why Choose Us
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto"
            >
              Discover the unique benefits of our Virtual Learning Academy
            </motion.p>
          </div>
        </motion.section>

        {/* MAIN FEATURES GRID */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ y: -8, boxShadow: '0 15px 30px rgba(140, 27, 46, 0.15)' }}
                    className="bg-white rounded-lg p-6 border-2 border-[#C0C5CE] hover:border-[#8C1B2E] transition-all"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-12 h-12 bg-[#8C1B2E] rounded-lg flex items-center justify-center mb-4"
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <h3 className="text-lg font-bold text-[#8C1B2E] mb-3">{feature.title}</h3>
                    <p className="text-[#1A1A1A] text-sm leading-relaxed">{feature.description}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* CTA SECTION */}
        <motion.section className="bg-gradient-to-r from-[#8C1B2E] to-[#B43A4E] text-white py-12 md:py-16 relative overflow-hidden">
          <motion.div
            className="absolute -top-24 -right-24 w-48 h-48 bg-white rounded-full opacity-5 blur-3xl"
            animate={{ y: [0, 30, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-black mb-4 text-white"
            >
              Live Classes, Not Recorded Lectures
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-base md:text-lg text-white/90 mb-8 max-w-2xl mx-auto"
            >
              Choose live interactive classes for real-time learning! Our live classes ensure active participation and immediate feedback, making education interactive and engaging.
            </motion.p>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/contact">
                <motion.button
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-[#8C1B2E] px-8 py-3 rounded-lg font-bold hover:bg-[#F5F7FA] transition-all text-base"
                >
                  Apply Now
                </motion.button>
              </Link>
              <Link href="/contact">
                <motion.button
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#5A0F1C] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#8C1B2E] transition-all text-base border-2 border-white/20"
                >
                  Promotional Offer
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </motion.section>

        {/* BENEFITS SECTION */}
        <section className="py-12 md:py-16 bg-[#F5F7FA]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="text-3xl md:text-4xl font-black text-[#8C1B2E] mb-2">Our Flexible Options</h2>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ y: -6, boxShadow: '0 10px 25px rgba(140, 27, 46, 0.12)' }}
                    className="bg-white p-6 rounded-lg border-2 border-[#C0C5CE] hover:border-[#8C1B2E] transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-12 h-12 bg-[#8C1B2E] rounded-lg flex items-center justify-center flex-shrink-0"
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-[#8C1B2E] mb-2">{benefit.title}</h3>
                        <p className="text-[#1A1A1A] text-sm">{benefit.description}</p>
                      </div>
                      <motion.div
                        whileHover={{ x: 4 }}
                        className="text-[#8C1B2E] font-bold text-xl flex-shrink-0"
                      >
                        →
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* OFFERINGS GRID */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="text-3xl md:text-4xl font-black text-[#8C1B2E] mb-2">What We Offer</h2>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-3 gap-6"
            >
              {offerings.map((offering, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, boxShadow: '0 12px 30px rgba(140, 27, 46, 0.2)' }}
                  className="bg-gradient-to-br from-[#8C1B2E] to-[#B43A4E] text-white p-8 rounded-lg text-center shadow-lg transition-all"
                >
                  <div className="text-4xl mb-3">{offering.icon}</div>
                  <p className="font-semibold text-base">{offering.name}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* FINAL CTA */}
        <motion.section
          className="bg-gradient-to-r from-[#8C1B2E] to-[#B43A4E] text-white py-12 md:py-16 relative overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="absolute -top-24 -right-24 w-48 h-48 bg-white rounded-full opacity-5 blur-3xl"
            animate={{ y: [0, 30, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-black mb-4 text-white"
            >
              Start Your Learning Journey
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-white/90 mb-8"
            >
              Join thousands of students already learning with us
            </motion.p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-[#8C1B2E] px-8 py-3 rounded-lg font-bold hover:bg-[#F5F7FA] transition-all text-base"
              >
                Book Free Trial Class
              </motion.button>
            </Link>
          </div>
        </motion.section>
      </main>
      <Footer />
    </>
  );
}