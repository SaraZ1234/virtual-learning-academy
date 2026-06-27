'use client';

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from 'framer-motion';
import { BookOpen, Users, Zap, Award, ArrowRight, Clock, CheckCircle2, Star } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useRef, useState, useCallback } from 'react';

/* ═══════════════════════════════════════════════════════════════
   ANIMATION CONSTANTS
═══════════════════════════════════════════════════════════════ */
const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: EASE },
  }),
};

const fadeLeft = {
  hidden: { opacity: 0, x: -48 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: EASE },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, delay: i * 0.09, ease: EASE },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

/* ═══════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════ */
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
    highlight: 'Affiliated with Federal Board of Pakistan',
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
  { name: 'Noorani Qaida',            desc: 'Foundation for Quranic reading' },
  { name: 'Quran Reading',            desc: 'Fluent recitation skills' },
  { name: 'Tajweed',                  desc: 'Rules of correct pronunciation' },
  { name: 'Quran Memorization (Hifz)',desc: 'Complete memorization program' },
  { name: 'Islamic Studies',          desc: 'Comprehensive Islamic knowledge' },
  { name: 'Basic Arabic',             desc: 'Language of the Quran' },
  { name: 'Daily Duas',               desc: 'Essential supplications' },
  { name: 'Islamic Ethics',           desc: 'Character and moral development' },
];

const howSteps = [
  { step: '1', title: 'Consultation',   desc: 'Discuss your goals with our advisors' },
  { step: '2', title: 'Assessment',     desc: 'Complete a placement assessment' },
  { step: '3', title: 'Trial Class',    desc: 'Experience our teaching first-hand' },
  { step: '4', title: 'Enrollment',     desc: 'Select and join your program' },
  { step: '5', title: 'Begin Learning', desc: 'Start your academic journey' },
];

/* ═══════════════════════════════════════════════════════════════
   SHARED UTILITIES
═══════════════════════════════════════════════════════════════ */

/** Rising particles (reused from About page) */
function Particles() {
  const dots = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 5,
    dur: Math.random() * 6 + 6,
  }));
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {dots.map((d) => (
        <motion.span
          key={d.id}
          className="absolute rounded-full bg-white"
          style={{ left: `${d.x}%`, top: `${d.y}%`, width: d.size, height: d.size, opacity: 0 }}
          animate={{ opacity: [0, 0.45, 0], y: [0, -28, -56], scale: [1, 1.2, 0.6] }}
          transition={{ duration: d.dur, delay: d.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

/** Word-by-word 3-D flip title */
function AnimatedTitle({ text, className }: { text: string; className?: string }) {
  const words = text.split(' ');
  return (
    <motion.span
      className={className}
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em]"
          variants={{
            hidden:  { opacity: 0, y: 28, rotateX: -40 },
            visible: { opacity: 1, y: 0,  rotateX: 0,  transition: { duration: 0.55, ease: EASE } },
          }}
        >
          {w}
        </motion.span>
      ))}
    </motion.span>
  );
}

/** Spring-smoothed scroll progress bar */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-[#8C1B2E] origin-left z-[999]"
      style={{ scaleX }}
    />
  );
}

/** Magnetic CTA button */
function MagneticButton({ children, href }: { children: React.ReactNode; href: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const handleMouse = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos({ x: (e.clientX - (r.left + r.width / 2)) * 0.28, y: (e.clientY - (r.top + r.height / 2)) * 0.28 });
  }, []);
  return (
    <div ref={ref} onMouseMove={handleMouse} onMouseLeave={() => setPos({ x: 0, y: 0 })}>
      <Link href={href}>
        <motion.button
          animate={{ x: pos.x, y: pos.y }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          whileTap={{ scale: 0.96 }}
          className="inline-flex items-center gap-3 bg-white text-[#8C1B2E] font-bold px-10 py-5 rounded-full text-base shadow-2xl group"
        >
          {children}
          <motion.span className="group-hover:translate-x-1 transition-transform duration-200">
            <ArrowRight className="w-5 h-5" />
          </motion.span>
        </motion.button>
      </Link>
    </div>
  );
}

/** Section eyebrow label */
function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <motion.span
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: EASE }}
      className={`inline-flex items-center gap-2 text-xs font-bold tracking-[0.22em] uppercase mb-3 ${
        light ? 'text-white/60' : 'text-[#8C1B2E]'
      }`}
    >
      <span className={`block w-5 h-[2px] rounded-full ${light ? 'bg-white/40' : 'bg-[#8C1B2E]'}`} />
      {children}
    </motion.span>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PROGRAM CARD
═══════════════════════════════════════════════════════════════ */
function ProgramCard({ program, index }: { program: typeof programs[0]; index: number }) {
  const Icon = program.icon;
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={scaleIn}
      custom={index}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -10, boxShadow: '0 28px 56px rgba(140,27,46,0.13)' }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white rounded-2xl border border-[#C0C5CE]/70 shadow-sm overflow-hidden flex flex-col"
    >
      {/* Animated top accent bar */}
      <motion.div
        className="h-1 bg-[#8C1B2E] origin-left"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        whileHover={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.1, ease: EASE }}
      />

      <div className="p-8 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <h3 className="text-xl font-bold text-[#8C1B2E] flex-1 leading-snug pr-4">
            {program.title}
          </h3>
          <motion.div
            animate={hovered ? { rotate: 8, scale: 1.1 } : { rotate: 0, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="shrink-0 w-12 h-12 bg-gradient-to-br from-[#8C1B2E] to-[#B43A4E] rounded-xl flex items-center justify-center shadow-md"
          >
            <Icon className="w-6 h-6 text-white" />
          </motion.div>
        </div>

        <p className="text-[#1A1A1A]/75 mb-6 leading-relaxed">{program.description}</p>

        {/* Schedule */}
        {program.schedule && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.2 }}
            className="mb-6 p-4 bg-[#F5F7FA] rounded-xl border border-[#C0C5CE]/60"
          >
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-[#8C1B2E]" />
              <h4 className="font-bold text-[#8C1B2E] text-sm tracking-wide uppercase">Class Schedules</h4>
            </div>
            <div className="space-y-2">
              {program.schedule.map((sched, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + i * 0.1 + 0.3 }}
                  className="flex items-start gap-3 text-sm"
                >
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#8C1B2E] shrink-0" />
                  <div>
                    <span className="font-semibold text-[#1A1A1A]">{sched.session} Session — </span>
                    <span className="text-[#1A1A1A]/65">{sched.time}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Features */}
        {program.features && (
          <div className="mb-6">
            <h4 className="font-bold text-[#8C1B2E] text-sm tracking-wide uppercase mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Features
            </h4>
            <ul className="space-y-2">
              {program.features.map((feature, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 + 0.2 }}
                  className="flex items-center gap-2.5 text-sm text-[#1A1A1A]/80"
                >
                  <motion.span
                    className="w-1.5 h-1.5 rounded-full bg-[#8C1B2E] shrink-0"
                    animate={hovered ? { scale: [1, 1.6, 1] } : {}}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                  />
                  {feature}
                </motion.li>
              ))}
            </ul>
          </div>
        )}

        {/* Subjects */}
        {program.subjects && (
          <div className="mb-6">
            <h4 className="font-bold text-[#8C1B2E] text-sm tracking-wide uppercase mb-3">
              Subjects Offered
            </h4>
            <div className="flex flex-wrap gap-2">
              {program.subjects.slice(0, 4).map((subject, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ scale: 1.06, backgroundColor: '#8C1B2E', color: '#fff' }}
                  className="text-xs bg-[#F5F7FA] text-[#1A1A1A] px-3 py-1.5 rounded-full border border-[#C0C5CE] transition-colors duration-200 cursor-default"
                >
                  {subject}
                </motion.span>
              ))}
              {program.subjects.length > 4 && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.28 }}
                  className="text-xs bg-[#8C1B2E]/10 text-[#8C1B2E] px-3 py-1.5 rounded-full border border-[#8C1B2E]/20 font-semibold"
                >
                  +{program.subjects.length - 4} more
                </motion.span>
              )}
            </div>
          </div>
        )}

        {/* Highlight */}
        {program.highlight && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm text-[#8C1B2E] font-semibold mb-6 flex items-center gap-2"
          >
            <Star className="w-3.5 h-3.5 shrink-0" />
            {program.highlight}
          </motion.p>
        )}

        {/* CTA Button */}
        <div className="mt-auto">
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: '0 8px 24px rgba(140,27,46,0.22)' }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary w-full text-sm flex items-center justify-center gap-2 group/btn"
            >
              {program.cta}
              <motion.span
                className="group-hover/btn:translate-x-1 transition-transform duration-200"
              >
                <ArrowRight className="w-4 h-4" />
              </motion.span>
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Corner glow on hover */}
      <motion.div
        className="absolute bottom-0 right-0 w-28 h-28 bg-[#8C1B2E]/5 rounded-tl-full pointer-events-none"
        initial={{ scale: 0, opacity: 0 }}
        animate={hovered ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.35 }}
      />
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════ */
export default function Programs() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY       = useTransform(heroProgress, [0, 1], ['0%', '22%']);
  const heroOpacity = useTransform(heroProgress, [0, 0.75], [1, 0]);
  const heroScale   = useTransform(heroProgress, [0, 1], [1, 1.04]);

  return (
    <>
      <ScrollProgress />
      <Navbar />

      <main className="overflow-x-hidden">

        {/* ╔══════════════════════════════════════════════════╗
            ║  HERO                                           ║
            ╚══════════════════════════════════════════════════╝ */}
        <motion.section
          ref={heroRef}
          className="relative gradient-hero text-white overflow-hidden"
          style={{ minHeight: '600px' }}
        >
          {/* Animated drifting grid */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)',
              backgroundSize: '56px 56px',
            }}
            animate={{ backgroundPosition: ['0px 0px', '56px 56px'] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />

          {/* Floating orbs */}
          {[
            { cls: '-top-20 -right-20 w-[400px] h-[400px]', dur: 14, delay: 0 },
            { cls: '-bottom-14 -left-14 w-64 h-64',          dur: 11, delay: 1.5 },
            { cls: 'top-1/2 left-1/4 w-44 h-44',            dur: 9,  delay: 3 },
          ].map((orb, i) => (
            <motion.div
              key={i}
              aria-hidden
              className={`absolute rounded-full bg-white/5 ${orb.cls}`}
              animate={{ scale: [1, 1.1, 1], rotate: [0, 8, 0], y: [0, -14, 0] }}
              transition={{ duration: orb.dur, repeat: Infinity, ease: 'easeInOut', delay: orb.delay }}
            />
          ))}

          <Particles />

          {/* Hero content */}
          <motion.div
            style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
            className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center py-32"
          >
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 text-sm font-medium mb-10"
            >
              <motion.span
                className="w-2 h-2 rounded-full bg-white"
                animate={{ opacity: [1, 0.3, 1], scale: [1, 1.4, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              Virtual Learning Academy
            </motion.div>

            {/* 3-D word-flip title */}
            <div className="perspective-[800px] mb-6">
              <AnimatedTitle
                text="Our Programs"
                className="text-6xl md:text-8xl font-extrabold leading-[1.02] tracking-tight block"
              />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
              className="text-xl md:text-2xl text-white/80 max-w-xl font-light mb-14"
            >
              Comprehensive educational programs designed for student success
            </motion.p>

            {/* Animated divider dots */}
            <motion.div className="flex items-center gap-3">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="block h-[3px] rounded-full bg-white/50"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: i === 1 ? 36 : 14, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 + i * 0.1, ease: EASE }}
                />
              ))}
            </motion.div>

            {/* Scroll cue */}
            <motion.div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40 text-xs tracking-widest uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.8 }}
            >
              <div className="w-5 h-8 border-2 border-white/30 rounded-full flex items-start justify-center pt-1">
                <motion.div
                  className="w-1 h-2 bg-white/60 rounded-full"
                  animate={{ y: [0, 10, 0], opacity: [1, 0, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
              <span>Scroll</span>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* ╔══════════════════════════════════════════════════╗
            ║  PROGRAMS GRID                                  ║
            ╚══════════════════════════════════════════════════╝ */}
        <section className="py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <SectionLabel>What We Offer</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#1A1A1A]">
                Academic Programs
              </h2>
              <motion.div
                className="mt-4 h-[3px] bg-[#8C1B2E] rounded-full mx-auto"
                initial={{ width: 0 }}
                whileInView={{ width: 64 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
              />
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {programs.map((program, index) => (
                <ProgramCard key={index} program={program} index={index} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* ╔══════════════════════════════════════════════════╗
            ║  ISLAMIC STUDIES                                ║
            ╚══════════════════════════════════════════════════╝ */}
        <section className="py-28 bg-[#F5F7FA]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <SectionLabel>Faith &amp; Knowledge</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#1A1A1A]">
                Quran &amp; Islamic Studies Program
              </h2>
              <motion.div
                className="mt-4 h-[3px] bg-[#8C1B2E] rounded-full mx-auto"
                initial={{ width: 0 }}
                whileInView={{ width: 64 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
              />
              <p className="mt-6 text-lg text-[#1A1A1A]/70 max-w-2xl mx-auto">
                Comprehensive Islamic education programs for children and adults worldwide
              </p>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 border border-[#C0C5CE]/60 shadow-sm"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {islamicPrograms.map((course, index) => (
                  <motion.div
                    key={index}
                    variants={scaleIn}
                    custom={index}
                    whileHover={{
                      y: -5,
                      borderColor: '#8C1B2E',
                      boxShadow: '0 12px 28px rgba(140,27,46,0.10)',
                    }}
                    className="group p-5 bg-[#F5F7FA] rounded-xl border border-[#C0C5CE]/80 transition-all duration-300 cursor-default"
                  >
                    {/* Animated dot */}
                    <motion.div
                      className="w-2 h-2 rounded-full bg-[#8C1B2E]/30 mb-3 group-hover:bg-[#8C1B2E]"
                      transition={{ duration: 0.3 }}
                    />
                    <p className="font-bold text-[#8C1B2E] text-sm mb-1">{course.name}</p>
                    <p className="text-xs text-[#1A1A1A]/55 leading-snug">{course.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ╔══════════════════════════════════════════════════╗
            ║  HOW IT WORKS                                   ║
            ╚══════════════════════════════════════════════════╝ */}
        <section className="py-28 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <SectionLabel>The Process</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#1A1A1A]">
                How Our Online Learning Works
              </h2>
              <motion.div
                className="mt-4 h-[3px] bg-[#8C1B2E] rounded-full mx-auto"
                initial={{ width: 0 }}
                whileInView={{ width: 64 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
              />
            </motion.div>

            {/* Steps with animated connector line */}
            <div className="relative">
              {/* Connector line — desktop only */}
              <div className="hidden md:block absolute top-7 left-0 right-0 h-[2px] bg-[#F5F7FA] z-0">
                <motion.div
                  className="h-full bg-[#8C1B2E]/30 origin-left"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
                />
              </div>

              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative z-10 grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4"
              >
                {howSteps.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={fadeUp}
                    custom={index}
                    className="group flex flex-col items-center text-center"
                  >
                    {/* Animated step circle */}
                    <motion.div
                      whileHover={{
                        scale: 1.15,
                        boxShadow: '0 0 0 6px rgba(140,27,46,0.15)',
                      }}
                      className="relative w-14 h-14 bg-gradient-to-br from-[#8C1B2E] to-[#B43A4E] rounded-full flex items-center justify-center text-white font-extrabold text-xl mb-5 shadow-lg cursor-default"
                    >
                      {/* Ripple on hover */}
                      <motion.span
                        className="absolute inset-0 rounded-full border-2 border-[#8C1B2E]/40"
                        initial={{ scale: 1, opacity: 0 }}
                        whileHover={{ scale: 1.6, opacity: 0 }}
                        transition={{ duration: 0.6 }}
                      />
                      {item.step}
                    </motion.div>

                    <h4 className="font-bold text-[#8C1B2E] mb-2 text-base">{item.title}</h4>
                    <p className="text-sm text-[#1A1A1A]/65 leading-snug max-w-[120px]">{item.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ╔══════════════════════════════════════════════════╗
            ║  CTA                                            ║
            ╚══════════════════════════════════════════════════╝ */}
        <section className="gradient-hero text-white py-28 relative overflow-hidden">
          {/* Moving grid */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.05) 1px,transparent 1px)',
              backgroundSize: '56px 56px',
            }}
            animate={{ backgroundPosition: ['0px 0px', '56px 56px'] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          />

          {/* Orbs */}
          {['-top-14 -right-14 w-72 h-72', '-bottom-10 -left-10 w-52 h-52'].map((cls, i) => (
            <motion.div
              key={i}
              aria-hidden
              className={`absolute rounded-full bg-white/5 ${cls}`}
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 8 + i * 2, repeat: Infinity, ease: 'easeInOut', delay: i }}
            />
          ))}

          <Particles />

          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <SectionLabel light>Get Started</SectionLabel>

            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight"
            >
              Ready to Start<br />Learning?
            </motion.h2>

            <motion.p
              variants={fadeUp}
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-white/70 text-lg mb-12 max-w-md mx-auto"
            >
              Book a free trial class and experience the quality of our teaching first-hand.
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <MagneticButton href="/contact">Book Your Free Trial Today</MagneticButton>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
