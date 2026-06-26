'use client';

import { motion } from 'framer-motion';
import { BookOpen, Users, Zap, Award, ArrowRight } from 'lucide-react';
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

export default function Programs() {
  const programs = [
    {
      title: 'British Curriculum (Pre-K to Grade 7)',
      icon: BookOpen,
      description: 'Complete British Curriculum education with Oxford and Cambridge textbooks',
      schedule: [
        { session: 'Morning', time: '09:00 AM - 12:00 PM (KSA Time, AST +0300)' },
        { session: 'Evening', time: '03:00 PM - 06:00 PM (KSA Time, AST +0300)' },
      ],
      features: ['Daily Live Classes', 'All Subjects', 'Sunday-Thursday', 'Real-time Interactive Learning'],
      highlight: 'Qualified educators with years of online teaching experience',
      cta: 'Enroll Now',
    },
    {
      title: 'Federal Board Curriculum (Grades 8-12)',
      icon: Award,
      description: 'Complete Federal Board education with expert instruction and exam preparation',
      schedule: [
        { session: 'Morning', time: '08:00 AM - 12:00 PM (KSA Time, AST +0300)' },
        { session: 'Evening', time: '03:00 PM - 07:00 PM (KSA Time, AST +0300)' },
      ],
      features: ['Daily Live Classes', 'All Subjects', 'Sunday-Thursday', 'Structured Lessons & Exam Strategies'],
      highlight: 'Affiliated with Federal Board on Pakistan',
      cta: 'Explore Federal Board',
    },
    {
      title: 'IGCSE & O Level Preparation',
      icon: Zap,
      description: 'Expert instruction and examination preparation for international qualifications',
      schedule: [
        { session: 'Morning', time: '08:00 AM - 12:00 PM (KSA Time, AST +0300)' },
        { session: 'Evening', time: '03:00 PM - 07:00 PM (KSA Time, AST +0300)' },
      ],
      features: ['Daily Live Group Classes', 'All Subjects', 'Past Paper Practice', 'Exam Strategy Training'],
      subjects: ['Mathematics', 'Additional Mathematics', 'Physics', 'Chemistry', 'Biology', 'English Language', 'Economics', 'Business Studies'],
      cta: 'View IGCSE',
    },
    {
      title: 'FBISE Grade 8-12 Program',
      icon: Users,
      description: 'Comprehensive FBISE curriculum with flexible morning and evening sessions',
      schedule: [
        { session: 'Morning', time: '08:00 AM - 01:00 PM (KSA Time, AST +0300)' },
        { session: 'Evening', time: '03:00 PM - 08:00 PM (KSA Time, AST +0300)' },
      ],
      features: ['Daily Live Group Classes', 'All Subjects', 'Saturday-Thursday', 'Complete Syllabus Coverage'],
      highlight: 'Professional educators with proven track record',
      cta: 'Learn More',
    },
  ];

  const islamicPrograms = [
    'Noorani Qaida',
    'Quran Reading',
    'Tajweed',
    'Quran Memorization (Hifz)',
    'Islamic Studies',
    'Basic Arabic',
    'Daily Duas',
    'Islamic Ethics',
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
              Our Programs
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-100"
            >
              Comprehensive educational programs designed for student success
            </motion.p>
          </div>
        </motion.section>

        {/* Programs Grid */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {programs.map((program, index) => {
                const Icon = program.icon;
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ translateY: -8 }}
                    className="card-feature group"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <h3 className="text-2xl font-bold text-[#8C1B2E] flex-1">{program.title}</h3>
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-12 h-12 bg-gradient-to-br from-[#8C1B2E] to-[#B43A4E] rounded-lg flex items-center justify-center flex-shrink-0 ml-4"
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </motion.div>
                    </div>

                    <p className="text-[#1A1A1A] mb-6">{program.description}</p>

                    {program.schedule && (
                      <div className="mb-6 p-4 bg-[#F5F7FA] rounded-lg border border-[#C0C5CE]">
                        <h4 className="font-semibold text-[#8C1B2E] mb-3">Class Schedules</h4>
                        <div className="space-y-2">
                          {program.schedule.map((sched, i) => (
                            <div key={i} className="text-sm">
                              <p className="font-semibold text-[#1A1A1A]">{sched.session} Session</p>
                              <p className="text-gray-600">{sched.time}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {program.features && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-[#8C1B2E] mb-3">Features</h4>
                        <ul className="space-y-2">
                          {program.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-[#1A1A1A]">
                              <span className="w-1.5 h-1.5 bg-[#8C1B2E] rounded-full"></span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {program.subjects && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-[#8C1B2E] mb-3">
                          {program.grades ? 'Subjects & Grades' : 'Subjects Offered'}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {(program.subjects || []).slice(0, 4).map((subject, i) => (
                            <span
                              key={i}
                              className="text-xs bg-[#F5F7FA] text-[#1A1A1A] px-3 py-1 rounded-full border border-[#C0C5CE]"
                            >
                              {subject}
                            </span>
                          ))}
                          {(program.subjects?.length || 0) > 4 && (
                            <span className="text-xs bg-[#F5F7FA] text-[#8C1B2E] px-3 py-1 rounded-full border border-[#C0C5CE] font-semibold">
                              +{(program.subjects?.length || 0) - 4} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {program.grades && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-[#8C1B2E] mb-3">Grades</h4>
                        <div className="flex flex-wrap gap-2">
                          {program.grades.map((grade, i) => (
                            <span
                              key={i}
                              className="text-sm bg-[#F5F7FA] text-[#1A1A1A] px-3 py-1 rounded-lg border border-[#C0C5CE]"
                            >
                              {grade}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {program.highlight && (
                      <p className="text-sm text-[#8C1B2E] font-semibold mb-6">
                        {program.highlight}
                      </p>
                    )}

                    {program.benefits && (
                      <ul className="space-y-2 mb-6">
                        {program.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-center gap-2 text-[#1A1A1A]">
                            <span className="w-2 h-2 bg-[#8C1B2E] rounded-full"></span>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    )}

                    <Link href="/contact">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn-primary w-full text-sm flex items-center justify-center gap-2"
                      >
                        {program.cta} <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Islamic Studies Program */}
        <section className="py-20 bg-[#F5F7FA]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="section-heading">Quran & Islamic Studies Program</h2>
              <p className="text-lg text-[#1A1A1A] max-w-2xl mx-auto">
                Comprehensive Islamic education programs for children and adults worldwide
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 border border-[#C0C5CE]"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {islamicPrograms.map((course, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="p-4 bg-[#F5F7FA] rounded-lg border border-[#C0C5CE] hover:border-[#8C1B2E] transition-colors"
                  >
                    <p className="font-semibold text-[#8C1B2E]">{course}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="section-heading">How Our Online Learning Works</h2>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-5 gap-4"
            >
              {[
                { step: '1', title: 'Consultation', desc: 'Discuss your goals with advisors' },
                { step: '2', title: 'Assessment', desc: 'Complete placement assessment' },
                { step: '3', title: 'Trial Class', desc: 'Experience our teaching' },
                { step: '4', title: 'Enrollment', desc: 'Select your program' },
                { step: '5', title: 'Begin Learning', desc: 'Start your journey' },
              ].map((item, index) => (
                <motion.div key={index} variants={itemVariants} className="text-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-14 h-14 bg-gradient-to-br from-[#8C1B2E] to-[#B43A4E] rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4"
                  >
                    {item.step}
                  </motion.div>
                  <h4 className="font-semibold text-[#8C1B2E] mb-2">{item.title}</h4>
                  <p className="text-sm text-[#1A1A1A]">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <motion.section
          className="gradient-hero text-white py-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold mb-6"
            >
              Ready to Start Learning?
            </motion.h2>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary bg-white text-[#8C1B2E] hover:bg-gray-100"
              >
                Book Your Free Trial Today
              </motion.button>
            </Link>
          </div>
        </motion.section>
      </main>
      <Footer />
    </>
  );
}
