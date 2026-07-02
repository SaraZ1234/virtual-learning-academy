'use client';

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from 'framer-motion';
import { Clock, Users, BookOpen, Globe, CheckCircle, Star, ArrowRight, Zap } from 'lucide-react';
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

const fadeRight = {
  hidden: { opacity: 0, x: 48 },
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
const features = [
  {
    icon: CheckCircle,
    title: 'Free Trial Classes',
    description: "We offer a 3-day free trial of our live classes without any registration or fees. Just send us your child's name and grade, and we'll provide the Zoom meeting link.",
  },
  {
    icon: BookOpen,
    title: 'Oxford and Cambridge Textbooks',
    description: "We are offering British Curriculum along with Oxford and Cambridge's books from KG 1 till Grade 7 & for Grade 8 till grade 12 we are affiliated with Federal Board of Pakistan.",
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
    description: "We've made it easy for our students to access their course materials. Once enrolled and fees are paid, they gain access to our Google Classroom, where all necessary books are scanned and uploaded for convenient download from anywhere.",
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
  { name: 'Virtual Learning Platform', emoji: '📚' },
  { name: 'Comprehensive Syllabus',    emoji: '📖' },
  { name: 'Affordable Fee Structure',  emoji: '💰' },
  { name: 'Community & Social',        emoji: '👥' },
  { name: 'Resource Library',          emoji: '📚' },
  { name: 'Easy Admissions',           emoji: '✍️' },
];

/* ═══════════════════════════════════════════════════════════════
   SHARED UTILITIES (consistent with About & Programs)
═══════════════════════════════════════════════════════════════ */

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
            visible: { opacity: 1, y: 0,  rotateX: 0, transition: { duration: 0.55, ease: EASE } },
          }}
        >
          {w}
        </motion.span>
      ))}
    </motion.span>
  );
}

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
          <span className="group-hover:translate-x-1 transition-transform duration-200">
            <ArrowRight className="w-5 h-5" />
          </span>
        </motion.button>
      </Link>
    </div>
  );
}

function MagneticButtonDark({ children, href }: { children: React.ReactNode; href: string }) {
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
          className="inline-flex items-center gap-3 bg-[#5A0F1C] border-2 border-white/20 text-white font-bold px-10 py-5 rounded-full text-base shadow-2xl group hover:bg-[#8C1B2E] transition-colors duration-200"
        >
          {children}
          <span className="group-hover:translate-x-1 transition-transform duration-200">
            <ArrowRight className="w-5 h-5" />
          </span>
        </motion.button>
      </Link>
    </div>
  );
}

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
   FEATURE CARD
═══════════════════════════════════════════════════════════════ */
function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const Icon = feature.icon;
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={scaleIn}
      custom={index}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -10, boxShadow: '0 24px 48px rgba(140,27,46,0.13)' }}
      transition={{ duration: 0.28 }}
      className="group relative bg-[#EEEFF1] rounded-2xl border-2 border-[#C0C5CE]/70 hover:border-[#8C1B2E]/40 transition-colors duration-300 overflow-hidden flex flex-col p-7"
    >
      {/* Animated top accent */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[3px] bg-[#8C1B2E] origin-left"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }}
      />

      {/* Icon */}
      <motion.div
        animate={hovered ? { rotate: 8, scale: 1.12 } : { rotate: 0, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-12 h-12 bg-gradient-to-br from-[#8C1B2E] to-[#B43A4E] rounded-xl flex items-center justify-center mb-5 shadow-md"
      >
        <Icon className="w-6 h-6 text-white" />
      </motion.div>

      <h3 className="text-lg font-bold text-[#8C1B2E] mb-3">{feature.title}</h3>
      <p className="text-[#1A1A1A]/75 text-sm leading-relaxed flex-1">{feature.description}</p>

      {/* Corner glow */}
      <motion.div
        className="absolute bottom-0 right-0 w-24 h-24 bg-[#8C1B2E]/5 rounded-tl-full pointer-events-none"
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
export default function Page() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY       = useTransform(heroProgress, [0, 1], ['0%', '22%']);
  const heroOpacity = useTransform(heroProgress, [0, 0.75], [1, 0]);
  const heroScale   = useTransform(heroProgress, [0, 1], [1, 1.04]);

  return (
    <>
      <ScrollProgress />
      <Navbar />

      <main className="overflow-x-hidden bg-white">

        {/* ╔══════════════════════════════════════════════════╗
            ║  HERO                                           ║
            ╚══════════════════════════════════════════════════╝ */}
        <motion.section
          ref={heroRef}
          className="relative gradient-hero text-white overflow-hidden"
          style={{ minHeight: '600px' }}
        >
          {/* Drifting grid */}
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

          {/* Content */}
          <motion.div
            style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
            className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center py-20 sm:py-24 md:py-32"
          >
            {/* Eyebrow */}
           <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3.5 sm:px-5 py-1.5 sm:py-2 text-[11px] xs:text-xs sm:text-sm font-medium mb-6 sm:mb-8 md:mb-10 max-w-[90vw] text-center leading-snug"
            >
              <motion.span
                className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white shrink-0"
                animate={{ opacity: [1, 0.3, 1], scale: [1, 1.4, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="whitespace-nowrap sm:whitespace-normal">Virtual Learning Academy</span>
            </motion.div>
            {/* 3-D word-flip title */}
            <div className="perspective-[800px] mt-2 sm:mt-4 mb-6">
              <AnimatedTitle
                text="Why Choose Us"
                className="text-5xl sm:text-6xl md:text-8xl font-extrabold leading-[1.05] sm:leading-[1.02] tracking-tight block"
              />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
              className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-xl font-light mb-14 px-2"
            >
              Discover the unique benefits of our Virtual Learning Academy
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
              className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-1 text-white/40 text-xs tracking-widest uppercase"
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
            ║  MAIN FEATURES GRID                             ║
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
              <SectionLabel>Our Advantages</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#1A1A1A]">
                What Sets Us Apart
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
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {features.map((feature, index) => (
                <FeatureCard key={index} feature={feature} index={index} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* ╔══════════════════════════════════════════════════╗
            ║  LIVE CLASSES CTA STRIP                         ║
            ╚══════════════════════════════════════════════════╝ */}
        <section className="gradient-hero text-white py-24 relative overflow-hidden">
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

          {['-top-16 -right-16 w-64 h-64', '-bottom-10 -left-10 w-48 h-48'].map((cls, i) => (
            <motion.div
              key={i}
              aria-hidden
              className={`absolute rounded-full bg-white/5 ${cls}`}
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 8 + i * 2, repeat: Infinity, ease: 'easeInOut', delay: i }}
            />
          ))}

          <Particles />

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <SectionLabel light>Interactive Learning</SectionLabel>

            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-extrabold mb-5 leading-tight"
            >
              Live Classes,<br />Not Recorded Lectures
            </motion.h2>

            <motion.p
              variants={fadeUp}
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-white/75 text-lg mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              Choose live interactive classes for real-time learning! Our live classes ensure active
              participation and immediate feedback, making education interactive and engaging.
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <MagneticButton href="/contact">Apply Now</MagneticButton>
              <MagneticButtonDark href="/contact">Promotional Offer</MagneticButtonDark>
            </motion.div>
          </div>
        </section>

        {/* ╔══════════════════════════════════════════════════╗
            ║  FLEXIBLE OPTIONS / BENEFITS                    ║
            ╚══════════════════════════════════════════════════╝ */}
        <section className="py-28 bg-[#F5F7FA]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <SectionLabel>Tailored For You</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#1A1A1A]">
                Our Flexible Options
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
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                const [hovered, setHovered] = useState(false);
                return (
                  <motion.div
                    key={index}
                    variants={fadeUp}
                    custom={index}
                    onHoverStart={() => setHovered(true)}
                    onHoverEnd={() => setHovered(false)}
                    whileHover={{ y: -8, boxShadow: '0 20px 48px rgba(140,27,46,0.11)' }}
                    className="group relative bg-[#EEEFF1] rounded-2xl border-2 border-[#C0C5CE]/70 hover:border-[#8C1B2E]/40 transition-colors duration-300 overflow-hidden p-7"
                  >
                    {/* Top bar */}
                    <motion.div
                      className="absolute top-0 left-0 right-0 h-[3px] bg-[#8C1B2E] origin-left"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1, ease: EASE }}
                    />

                    <div className="flex items-start gap-5">
                      {/* Icon */}
                      <motion.div
                        animate={hovered ? { rotate: 8, scale: 1.12 } : { rotate: 0, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="shrink-0 w-12 h-12 bg-gradient-to-br from-[#8C1B2E] to-[#B43A4E] rounded-xl flex items-center justify-center shadow-md"
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </motion.div>

                      {/* Text */}
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-[#8C1B2E] mb-2">{benefit.title}</h3>
                        <p className="text-[#1A1A1A]/70 text-sm leading-relaxed">{benefit.description}</p>
                      </div>

                      {/* Arrow */}
                      <motion.div
                        animate={hovered ? { x: 5 } : { x: 0 }}
                        transition={{ duration: 0.25 }}
                        className="shrink-0 text-[#8C1B2E] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <ArrowRight className="w-5 h-5" />
                      </motion.div>
                    </div>

                    {/* Corner glow */}
                    <motion.div
                      className="absolute bottom-0 right-0 w-24 h-24 bg-[#8C1B2E]/5 rounded-tl-full pointer-events-none"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={hovered ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                      transition={{ duration: 0.35 }}
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ╔══════════════════════════════════════════════════╗
            ║  WHAT WE OFFER — OFFERINGS GRID                 ║
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
              <SectionLabel>Everything Included</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#1A1A1A]">
                What We Offer
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
              className="grid grid-cols-2 md:grid-cols-3 gap-5"
            >
              {offerings.map((offering, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  custom={index}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 20px 48px rgba(140,27,46,0.22)',
                    y: -6,
                  }}
                  className="group relative bg-gradient-to-br from-[#8C1B2E] to-[#B43A4E] text-white p-9 rounded-2xl text-center shadow-lg overflow-hidden cursor-default"
                >
                  {/* Shimmer sweep */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full"
                    whileHover={{ x: '300%' }}
                    transition={{ duration: 0.65, ease: 'easeOut' }}
                  />

                  {/* Ripple circle */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl border-2 border-white/20"
                    initial={{ scale: 1, opacity: 0 }}
                    whileHover={{ scale: 1.08, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  />

                  <motion.div
                    className="text-4xl mb-4"
                    animate={{ rotate: [0, 0] }}
                    whileHover={{ scale: 1.2, rotate: [-5, 5, 0] }}
                    transition={{ duration: 0.4 }}
                  >
                    {offering.emoji}
                  </motion.div>
                  <p className="font-bold text-base leading-snug relative z-10">{offering.name}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ╔══════════════════════════════════════════════════╗
            ║  FINAL CTA                                      ║
            ╚══════════════════════════════════════════════════╝ */}
        <section className="gradient-hero text-white py-28 relative overflow-hidden">
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
            <SectionLabel light>Begin Today</SectionLabel>

            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight"
            >
              Start Your<br />Learning Journey
            </motion.h2>

            <motion.p
              variants={fadeUp}
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-white/70 text-lg mb-12 max-w-md mx-auto"
            >
              Join thousands of students already learning with us.
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <MagneticButton href="/contact">Book Free Trial Class</MagneticButton>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
