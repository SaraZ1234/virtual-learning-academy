'use client';

import { motion } from 'framer-motion';
import {
  CheckCircle,
  Users,
  Zap,
  Globe,
  Award,
  BookOpen,
  Clock,
  ArrowRight,
  Sparkles,
  Target,
  Play,
  Star,
  Heart,
  BarChart3,
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
};

const slideInLeftVariants = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const slideInRightVariants = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const rotateInVariants = {
  hidden: { opacity: 0, rotate: -10 },
  visible: { opacity: 1, rotate: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

export default function Page() {
  const programs = [
    {
      title: 'Online School Program',
      icon: BookOpen,
      grades: 'Early Years to Secondary',
      color: 'from-blue-500 to-blue-600',
      features: ['English Language', 'Mathematics', 'Science', 'Social Studies', 'Computer Science'],
    },
    {
      title: 'IGCSE & O Level Preparation',
      icon: Award,
      grades: 'International Programs',
      color: 'from-purple-500 to-purple-600',
      features: ['Expert Subject Specialists', 'Past Paper Practice', 'Exam Strategies', 'Performance Evaluations'],
    },
    {
      title: 'A Level Coaching',
      icon: Zap,
      grades: 'Advanced Academic Programs',
      color: 'from-green-500 to-green-600',
      features: ['University Preparation', 'Complex Concepts', 'Problem-Solving Skills', 'Career Guidance'],
    },
    {
      title: 'One-to-One Tutoring',
      icon: Target,
      grades: 'Personalized Support',
      color: 'from-orange-500 to-orange-600',
      features: ['Individual Attention', 'Customized Plans', 'Flexible Scheduling', 'Exam Preparation'],
    },
    {
      title: 'Quran & Islamic Studies',
      icon: BookOpen,
      grades: 'Children & Adults',
      color: 'from-pink-500 to-pink-600',
      features: ['Noorani Qaida', 'Quran Reading', 'Tajweed', 'Quran Memorization'],
    },
  ];

  const whyChoose = [
    {
      icon: Users,
      title: 'Qualified & Experienced Teachers',
      description: 'Our teachers possess extensive academic qualifications and years of teaching experience.',
      benefit: 'Expert Educators',
    },
    {
      icon: Zap,
      title: 'Live Interactive Learning',
      description: 'Students participate in real-time classes where they can ask questions and receive immediate feedback.',
      benefit: 'Real Interaction',
    },
    {
      icon: Heart,
      title: 'Personalized Academic Support',
      description: 'Every student learns differently. Our individualized approach ensures academic success.',
      benefit: 'Custom Learning',
    },
    {
      icon: Clock,
      title: 'Flexible Scheduling',
      description: 'We offer flexible class schedules designed to accommodate students from different time zones.',
      benefit: 'Any Time',
    },
    {
      icon: Globe,
      title: 'Modern Learning Technology',
      description: 'Our virtual classrooms utilize advanced educational technology that enhances learning outcomes.',
      benefit: 'Tech-Enabled',
    },
    {
      icon: BarChart3,
      title: 'Continuous Assessment',
      description: 'Regular assignments, quizzes, and progress reports help monitor student development.',
      benefit: 'Progress Tracking',
    },
  ];

  const processSteps = [
    {
      step: '1',
      title: 'Consultation',
      description: 'Discuss your educational goals',
    },
    {
      step: '2',
      title: 'Assessment',
      description: 'Complete a placement assessment',
    },
    {
      step: '3',
      title: 'Free Trial',
      description: 'Attend a live trial lesson',
    },
    {
      step: '4',
      title: 'Enrollment',
      description: 'Select your program',
    },
    {
      step: '5',
      title: 'Learn',
      description: 'Begin your learning journey',
    },
  ];

  const testimonials = [
    {
      name: 'Ahmed Hassan',
      role: 'Student, Grade 9',
      text: 'The live classes are amazing! Teachers are very interactive and answer all questions immediately.',
      rating: 5,
    },
    {
      name: 'Fatima Khan',
      role: 'Parent',
      text: 'We appreciate the quality of instruction and regular communication. Our child\'s grades improved significantly.',
      rating: 5,
    },
    {
      name: 'Omar Ali',
      role: 'Student, Grade 11',
      text: 'The personalized learning plans and dedicated support make all the difference.',
      rating: 5,
    },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* HERO SECTION */}
        <motion.section className="relative overflow-hidden bg-gradient-to-r from-[#8C1B2E] to-[#B43A4E] py-16 md:py-24 text-white">
          {/* Background Elements */}
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

          <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-center"
            >
              {/* Badge */}
              {/* <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/15 border border-white/30 backdrop-blur mb-6 text-sm">
                <Sparkles className="w-4 h-4" />
                <span className="font-semibold">Join Thousands of Successful Students</span>
              </motion.div> */}

              {/* Main Heading */}
              <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 leading-tight">
                Transforming Education
                <br />
                Through Virtual Learning
              </motion.h1>

              {/* Subheading */}
              <motion.p variants={itemVariants} className="text-lg md:text-xl mb-6 text-white/90">
                Learn Without Limits. Study From Anywhere.
              </motion.p>

              {/* Description */}
              <motion.p variants={itemVariants} className="text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed text-white/85">
                High-quality online schooling and personalized tutoring services for students worldwide. World-class education accessible, engaging, and affordable.
              </motion.p>

              {/* Key Features */}
              <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto mb-8 text-left">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#C0C5CE] flex-shrink-0" />
                  <span className="text-sm md:text-base">Live Interactive Classes</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#C0C5CE] flex-shrink-0" />
                  <span className="text-sm md:text-base">Qualified Teachers</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#C0C5CE] flex-shrink-0" />
                  <span className="text-sm md:text-base">Small Class Sizes</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#C0C5CE] flex-shrink-0" />
                  <span className="text-sm md:text-base">Flexible Schedules</span>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/programs">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group w-full sm:w-auto bg-white text-[#8C1B2E] px-6 py-3 rounded-lg font-bold text-base flex items-center justify-center gap-2 hover:bg-gray-100 transition-all"
                  >
                    <Play className="w-4 h-4" />
                    Start Learning
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto border-2 border-white text-white px-6 py-3 rounded-lg font-bold text-base hover:bg-white/10 transition-all"
                  >
                    Free Trial Class
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* ABOUT US SECTION */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="text-3xl md:text-4xl font-black text-[#1A1A1A] mb-3">About Us</h2>
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="h-1 w-10 bg-[#8C1B2E]"></div>
                <p className="text-base text-[#1A1A1A]">Quality Online Education</p>
                <div className="h-1 w-10 bg-[#B43A4E]"></div>
              </div>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <motion.div variants={slideInLeftVariants} whileHover={{ y: -8, boxShadow: '0 10px 30px rgba(140, 27, 46, 0.15)' }} className="bg-white p-6 rounded-lg border-2 border-[#C0C5CE] hover:border-[#8C1B2E] transition-all cursor-pointer">
                <Target className="w-8 h-8 text-[#8C1B2E] mb-3" />
                <h3 className="text-lg font-bold text-[#8C1B2E] mb-2">Our Mission</h3>
                <p className="text-[#1A1A1A] text-sm leading-relaxed">Provide accessible, affordable, high-quality education that empowers students to achieve their full potential.</p>
              </motion.div>
              <motion.div variants={scaleInVariants} whileHover={{ y: -8, boxShadow: '0 10px 30px rgba(140, 27, 46, 0.15)' }} className="bg-white p-6 rounded-lg border-2 border-[#C0C5CE] hover:border-[#8C1B2E] transition-all cursor-pointer">
                <Globe className="w-8 h-8 text-[#8C1B2E] mb-3" />
                <h3 className="text-lg font-bold text-[#8C1B2E] mb-2">Our Vision</h3>
                <p className="text-[#1A1A1A] text-sm leading-relaxed">A globally trusted online learning institution that prepares students for success in education and life.</p>
              </motion.div>
              <motion.div variants={slideInRightVariants} whileHover={{ y: -8, boxShadow: '0 10px 30px rgba(140, 27, 46, 0.15)' }} className="bg-white p-6 rounded-lg border-2 border-[#C0C5CE] hover:border-[#8C1B2E] transition-all cursor-pointer">
                <Award className="w-8 h-8 text-[#8C1B2E] mb-3" />
                <h3 className="text-lg font-bold text-[#8C1B2E] mb-2">Core Values</h3>
                <p className="text-[#1A1A1A] text-sm leading-relaxed">Excellence, Integrity, Student-Centered Learning, Innovation, Inclusivity.</p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* PROGRAMS SHOWCASE */}
        <section className="py-12 md:py-16 bg-[#F5F7FA]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="text-3xl md:text-4xl font-black text-[#1A1A1A] mb-2">Our Programs</h2>
              <p className="text-base text-[#1A1A1A]">Comprehensive education for every stage of learning</p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {programs.map((program, index) => {
                const Icon = program.icon;
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ y: -12, boxShadow: '0 20px 40px rgba(140, 27, 46, 0.2)' }}
                    className="bg-white rounded-lg border-2 border-[#C0C5CE] hover:border-[#8C1B2E] overflow-hidden transition-all"
                  >
                    <motion.div 
                      className={`bg-gradient-to-br ${program.color} p-5 text-white`}
                      whileHover={{ scale: 1.02 }}
                    >
                      <motion.div whileHover={{ rotate: 10, scale: 1.1 }} transition={{ type: 'spring', stiffness: 300 }}>
                        <Icon className="w-7 h-7 mb-2" />
                      </motion.div>
                      <h3 className="text-lg font-bold">{program.title}</h3>
                      <p className="text-xs text-white/90">{program.grades}</p>
                    </motion.div>

                    <motion.div className="p-5">
                      <div className="space-y-2 mb-4">
                        {program.features.slice(0, 4).map((feature, i) => (
                          <motion.div 
                            key={i} 
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-2"
                          >
                            <CheckCircle className="w-4 h-4 text-[#8C1B2E] flex-shrink-0" />
                            <span className="text-xs text-[#1A1A1A]">{feature}</span>
                          </motion.div>
                        ))}
                      </div>

                      <Link href="/contact" className="block w-full">
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-full bg-gradient-to-r from-[#8C1B2E] to-[#B43A4E] text-white py-2 rounded-lg font-bold hover:shadow-lg transition-all text-sm"
                        >
                          Learn More
                        </motion.button>
                      </Link>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="text-3xl md:text-4xl font-black text-[#1A1A1A] mb-2">Why Choose Us?</h2>
              <p className="text-base text-[#1A1A1A]">A Better Way to Learn</p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {whyChoose.map((reason, index) => {
                const Icon = reason.icon;
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="relative group"
                    whileHover={{ y: -10 }}
                  >
                    <motion.div 
                      className="p-6 rounded-lg border-2 border-[#C0C5CE] bg-white hover:border-[#8C1B2E] transition-all"
                      whileHover={{ boxShadow: '0 15px 35px rgba(140, 27, 46, 0.15)' }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.15, rotate: 10 }}
                        className="w-12 h-12 bg-gradient-to-br from-[#8C1B2E] to-[#B43A4E] rounded-lg flex items-center justify-center mb-3"
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </motion.div>

                      <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-block px-2 py-1 bg-[#F5F7FA] text-[#8C1B2E] rounded text-xs font-bold mb-2"
                      >
                        {reason.benefit}
                      </motion.div>

                      <h3 className="text-base font-bold text-[#1A1A1A] mb-2">{reason.title}</h3>
                      <p className="text-[#1A1A1A] text-sm leading-relaxed">{reason.description}</p>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-12 md:py-16 bg-[#F5F7FA]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="text-3xl md:text-4xl font-black text-[#1A1A1A] mb-2">How It Works</h2>
              <p className="text-base text-[#1A1A1A]">Five simple steps to start your journey</p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4"
            >
              {processSteps.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div 
                    className="bg-white border-2 border-[#8C1B2E] rounded-lg p-4 text-center hover:border-[#B43A4E] transition-all"
                    whileHover={{ boxShadow: '0 12px 25px rgba(140, 27, 46, 0.2)' }}
                  >
                    <motion.div 
                      className="w-10 h-10 bg-gradient-to-br from-[#8C1B2E] to-[#B43A4E] text-white rounded-full flex items-center justify-center font-bold mx-auto mb-3 text-sm"
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                    >
                      {item.step}
                    </motion.div>
                    <h3 className="text-base font-bold text-[#1A1A1A] mb-1">{item.title}</h3>
                    <p className="text-xs text-[#1A1A1A]">{item.description}</p>
                  </motion.div>
                  {index < processSteps.length - 1 && (
                    <motion.div 
                      className="hidden md:block absolute top-1/2 -right-2 w-3 h-3 bg-[#8C1B2E] transform -translate-y-1/2"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="text-3xl md:text-4xl font-black text-[#1A1A1A] mb-2">What Families Say</h2>
              <p className="text-base text-[#1A1A1A]">Hear from our happy students and parents</p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -12, boxShadow: '0 15px 40px rgba(140, 27, 46, 0.2)' }}
                  className="bg-white p-6 rounded-lg border-l-4 border-[#8C1B2E] hover:border-[#B43A4E] transition-all"
                >
                  <motion.div 
                    className="flex gap-1 mb-3"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                      >
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.p 
                    className="text-[#1A1A1A] mb-4 italic text-sm leading-relaxed"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {testimonial.text}
                  </motion.p>

                  <motion.div 
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <motion.div 
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8C1B2E] to-[#B43A4E] flex items-center justify-center"
                      whileHover={{ scale: 1.15 }}
                    >
                      <span className="text-white font-bold text-sm">{testimonial.name.charAt(0)}</span>
                    </motion.div>
                    <div>
                      <p className="font-bold text-[#1A1A1A] text-sm">{testimonial.name}</p>
                      <p className="text-xs text-[#1A1A1A]">{testimonial.role}</p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-12 md:py-16 bg-gradient-to-r from-[#8C1B2E] to-[#B43A4E] text-white relative overflow-hidden">
          <motion.div
            className="absolute -top-24 -right-24 w-48 h-48 bg-white rounded-full opacity-5 blur-3xl"
            animate={{ y: [0, 30, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-black mb-4"
            >
              Book Your Free Trial Class
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-base md:text-lg mb-6 text-white/90"
            >
              Experience quality education. Just provide your child's name and grade for instant access.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-[#8C1B2E] px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all text-base"
                >
                  Start Your Free Trial
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}