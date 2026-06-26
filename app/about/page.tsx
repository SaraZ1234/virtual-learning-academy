'use client';

import { motion } from 'framer-motion';
import { Target, Eye, Heart } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';


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

export default function About() {
  const values = [
    { icon: Target, title: 'Excellence in Education', description: 'Delivering high-quality learning experiences' },
    { icon: Heart, title: 'Student-Centered Learning', description: 'Placing students at the heart of education' },
    { icon: Eye, title: 'Integrity & Professionalism', description: 'Maintaining highest standards in all we do' },
  ];

  const coreValues = [
    'Excellence in Education',
    'Integrity and Professionalism',
    'Student-Centered Learning',
    'Innovation and Technology',
    'Inclusivity and Accessibility',
    'Continuous Improvement',
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
              About Us
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-100"
            >
              Empowering Students Through Quality Online Education
            </motion.p>
          </div>
        </motion.section>

        {/* Story Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="max-w-4xl"
            >
              <h2 className="section-heading mb-8">Our Story</h2>
              <div className="space-y-6 text-lg text-[#1A1A1A] leading-relaxed">
                <p>
                  Virtual Learning Academy was founded with a simple vision: to provide exceptional educational opportunities to students around the world through innovative online learning solutions.
                </p>
                <p>
                  We believe every student deserves access to highly qualified teachers, engaging lessons, and a supportive learning environment. Our virtual classrooms combine modern technology with proven teaching methods to create meaningful educational experiences that inspire growth and achievement.
                </p>
                <p>
                  Our teachers are passionate educators committed to helping students develop academic excellence, critical thinking skills, confidence, and a lifelong love of learning. From elementary education to advanced academic preparation, we provide comprehensive educational programs tailored to meet the needs of students from diverse backgrounds and learning levels.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mission Vision Values */}
        <section className="py-20 bg-[#F5F7FA]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {/* Mission */}
              <motion.div
                variants={itemVariants}
                className="bg-white rounded-xl p-8 border border-[#C0C5CE] shadow-sm"
              >
                <h3 className="text-2xl font-bold text-[#8C1B2E] mb-4">Our Mission</h3>
                <p className="text-[#1A1A1A] leading-relaxed">
                  To provide accessible, affordable, and high-quality education that empowers students to achieve their full academic and personal potential.
                </p>
              </motion.div>

              {/* Vision */}
              <motion.div
                variants={itemVariants}
                className="bg-white rounded-xl p-8 border border-[#C0C5CE] shadow-sm"
              >
                <h3 className="text-2xl font-bold text-[#8C1B2E] mb-4">Our Vision</h3>
                <p className="text-[#1A1A1A] leading-relaxed">
                  To become a globally trusted online learning institution that prepares students for success in education, careers, and life.
                </p>
              </motion.div>

              {/* Values Preview */}
              <motion.div
                variants={itemVariants}
                className="bg-white rounded-xl p-8 border border-[#C0C5CE] shadow-sm"
              >
                <h3 className="text-2xl font-bold text-[#8C1B2E] mb-4">Our Values</h3>
                <p className="text-[#1A1A1A] leading-relaxed">
                  Excellence, Integrity, Student-Centered Learning, Innovation, Inclusivity, and Continuous Improvement guide everything we do.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="section-heading">Our Core Values</h2>
              <p className="text-lg text-[#1A1A1A] max-w-2xl mx-auto">
                Six principles that guide our commitment to educational excellence
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {coreValues.map((value, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-[#F5F7FA] rounded-lg p-6 border-l-4 border-[#8C1B2E] hover:shadow-md transition-shadow"
                >
                  <p className="font-semibold text-[#8C1B2E] text-lg">{value}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Why We Exist */}
        <section className="py-20 bg-[#F5F7FA]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-12 border border-[#C0C5CE]"
            >
              <h2 className="section-heading mb-8">Why We Exist</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-xl font-semibold text-[#8C1B2E] mb-4">Breaking Barriers in Education</h3>
                  <p className="text-[#1A1A1A] leading-relaxed mb-6">
                    We recognize that geography should never be a barrier to quality education. Thousands of talented students around the world lack access to exceptional teachers and learning resources due to location, affordability, or circumstance.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#8C1B2E] mb-4">Transforming Learning</h3>
                  <p className="text-[#1A1A1A] leading-relaxed mb-6">
                    We leverage technology and pedagogical excellence to create learning experiences that inspire curiosity, build confidence, and help students achieve their highest academic potential. Education should be engaging, accessible, and transformative.
                  </p>
                </div>
              </div>
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
              Join Our Learning Community
            </motion.h2>
            <Link href="/programs">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary bg-white text-[#8C1B2E] hover:bg-gray-100"
              >
                Explore Our Programs
              </motion.button>
            </Link>
          </div>
        </motion.section>
      </main>
      <Footer />
    </>
  );
}
