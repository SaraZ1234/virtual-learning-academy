'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
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

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah Ahmed',
      role: 'Parent',
      feedback:
        'Our experience has been outstanding. The teachers are knowledgeable, caring, and highly professional. My daughter looks forward to every class!',
      rating: 5,
      image: '👨‍👩‍👧',
    },
    {
      name: 'Michael Chen',
      role: 'Student',
      feedback:
        'The online classes are engaging and effective. I have improved significantly in my grades and my confidence has grown tremendously.',
      rating: 5,
      image: '📚',
    },
    {
      name: 'Fatima Hassan',
      role: 'Parent',
      feedback:
        'We appreciate the flexibility, quality of instruction, and regular communication from the school. It&apos;s exactly what our family needed.',
      rating: 5,
      image: '⭐',
    },
    {
      name: 'David Thompson',
      role: 'Student',
      feedback:
        'The tutoring sessions have been incredibly helpful. My teacher really understands my learning style and adapts the lessons accordingly.',
      rating: 5,
      image: '✨',
    },
    {
      name: 'Amira Patel',
      role: 'Parent',
      feedback:
        'Best investment in our child&apos;s education. The platform is user-friendly and the teachers are truly passionate about their students&apos; success.',
      rating: 5,
      image: '💡',
    },
    {
      name: 'James Wilson',
      role: 'Student',
      feedback:
        'The interactive lessons keep me engaged. I&apos;m getting better grades and I actually enjoy learning now. Highly recommend VLA!',
      rating: 5,
      image: '🎓',
    },
  ];

  const stats = [
    { number: '5000+', label: 'Students Worldwide' },
    { number: '95%', label: 'Student Satisfaction' },
    { number: '150+', label: 'Qualified Teachers' },
    { number: '50+', label: 'Countries Served' },
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
              What Families Say About Us
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-100"
            >
              Hear from students and parents who have transformed their educational journey
            </motion.p>
          </div>
        </motion.section>

        {/* Stats */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-4 gap-8"
            >
              {stats.map((stat, index) => (
                <motion.div key={index} variants={itemVariants} className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="text-4xl md:text-5xl font-bold text-[#8C1B2E] mb-2"
                  >
                    {stat.number}
                  </motion.div>
                  <p className="text-lg text-[#1A1A1A] font-semibold">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="py-20 bg-[#F5F7FA]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="section-heading">Testimonials</h2>
              <p className="text-lg text-[#1A1A1A] max-w-2xl mx-auto">
                Real stories from real students and parents
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ translateY: -8, boxShadow: '0 20px 25px -5px rgba(140, 27, 46, 0.1)' }}
                  className="bg-white rounded-xl p-8 border border-[#C0C5CE] shadow-md hover:shadow-xl transition-all"
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <Star
                          size={20}
                          className="fill-[#8C1B2E] text-[#8C1B2E]"
                        />
                      </motion.div>
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-[#1A1A1A] mb-6 leading-relaxed italic">
                    "{testimonial.feedback}"
                  </p>

                  {/* Author */}
                  <div className="border-t border-[#C0C5CE] pt-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8C1B2E] to-[#B43A4E] flex items-center justify-center text-2xl">
                        {testimonial.image}
                      </div>
                      <div>
                        <p className="font-semibold text-[#8C1B2E]">{testimonial.name}</p>
                        <p className="text-sm text-[#1A1A1A] text-gray-600">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="section-heading">Frequently Asked Questions</h2>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              {[
                {
                  q: 'Who can enroll?',
                  a: 'Students from any country can enroll in our programs. We welcome learners of all backgrounds and learning levels.',
                },
                {
                  q: 'What technology is required?',
                  a: 'A stable internet connection, computer, tablet, or smartphone is sufficient to participate in our classes.',
                },
                {
                  q: 'Are classes live?',
                  a: 'Yes, most of our classes are conducted live with direct teacher interaction, allowing for real-time engagement and feedback.',
                },
                {
                  q: 'Do you offer trial classes?',
                  a: 'Absolutely! Free trial classes are available for all new students so they can experience our teaching methodology first-hand.',
                },
                {
                  q: 'How are students assessed?',
                  a: 'Assessment happens through assignments, quizzes, projects, class participation, and formal examinations based on the program.',
                },
                {
                  q: 'Do you provide certificates?',
                  a: 'Yes, certificates and academic reports are provided according to program requirements and completion standards.',
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-[#F5F7FA] rounded-lg p-6 border border-[#C0C5CE] hover:border-[#8C1B2E] transition-colors"
                >
                  <h3 className="font-semibold text-[#8C1B2E] mb-3 text-lg">{faq.q}</h3>
                  <p className="text-[#1A1A1A] leading-relaxed">{faq.a}</p>
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
              Join Our Community of Successful Learners
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
