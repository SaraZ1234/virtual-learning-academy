'use client';

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  animate,
  stagger as fmStagger,
} from 'framer-motion';
import {
  BookOpen, Users, Globe, TrendingUp, Shield, Zap,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useRef, useEffect, useState, useCallback } from 'react';

/* ═══════════════════════════════════════════════════════════════
   ANIMATION VARIANTS
═══════════════════════════════════════════════════════════════ */
const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: EASE },
  }),
};

const fadeLeft = {
  hidden: { opacity: 0, x: -48 },
  visible: (i = 0) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: EASE },
  }),
};

const fadeRight = {
  hidden: { opacity: 0, x: 48 },
  visible: (i = 0) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: EASE },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (i = 0) => ({
    opacity: 1, scale: 1,
    transition: { duration: 0.6, delay: i * 0.08, ease: EASE },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

/* ═══════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════ */
const missionCards = [
  {
    title: 'Our Mission',
    body: 'To provide accessible, affordable, and high-quality education that empowers students to achieve their full academic and personal potential.',
    gradient: 'from-[#8C1B2E]/10 to-transparent',
  },
  {
    title: 'Our Vision',
    body: 'To become a globally trusted online learning institution that prepares students for success in education, careers, and life.',
    gradient: 'from-[#8C1B2E]/8 to-transparent',
  },
  {
    title: 'Our Values',
    body: 'Excellence, Integrity, Student-Centered Learning, Innovation, Inclusivity, and Continuous Improvement guide everything we do.',
    gradient: 'from-[#8C1B2E]/10 to-transparent',
  },
];

const coreValues = [
  { icon: TrendingUp, label: 'Excellence in Education' },
  { icon: Shield,     label: 'Integrity and Professionalism' },
  { icon: Users,      label: 'Student-Centered Learning' },
  { icon: Zap,        label: 'Innovation and Technology' },
  { icon: Globe,      label: 'Inclusivity and Accessibility' },
  { icon: BookOpen,   label: 'Continuous Improvement' },
];

const whyCards = [
  {
    title: 'Breaking Barriers in Education',
    body: 'We recognize that geography should never be a barrier to quality education. Thousands of talented students around the world lack access to exceptional teachers and learning resources due to location, affordability, or circumstance.',
  },
  {
    title: 'Transforming Learning',
    body: 'We leverage technology and pedagogical excellence to create learning experiences that inspire curiosity, build confidence, and help students achieve their highest academic potential. Education should be engaging, accessible, and transformative.',
  },
];

const stats = [
  { value: 10000, suffix: 'K+', display: '10K+', label: 'Students Enrolled' },
  { value: 200,   suffix: '+',  display: '200+', label: 'Expert Educators' },
  { value: 50,    suffix: '+',  display: '50+',  label: 'Countries Reached' },
  { value: 98,    suffix: '%',  display: '98%',  label: 'Satisfaction Rate' },
];

const storyParagraphs = [
  'Virtual Learning Academy was founded with a simple vision: to provide exceptional educational opportunities to students around the world through innovative online learning solutions.',
  'We believe every student deserves access to highly qualified teachers, engaging lessons, and a supportive learning environment. Our virtual classrooms combine modern technology with proven teaching methods to create meaningful educational experiences that inspire growth and achievement.',
  'Our teachers are passionate educators committed to helping students develop academic excellence, critical thinking skills, confidence, and a lifelong love of learning. From elementary education to advanced academic preparation, we provide comprehensive educational programs tailored to meet the needs of students from diverse backgrounds and learning levels.',
];

/* ═══════════════════════════════════════════════════════════════
   ANIMATED COUNTER
═══════════════════════════════════════════════════════════════ */
function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (inView && !started && ref.current) {
      setStarted(true);
      const node = ref.current;
      const controls = animate(0, target > 1000 ? target / 1000 : target, {
        duration: 2,
        ease: 'easeOut',
        onUpdate(v) {
          node.textContent =
            target > 1000
              ? Math.floor(v) + 'K' + suffix.replace('K+', '+')
              : Math.floor(v) + suffix;
        },
      });
      return () => controls.stop();
    }
  }, [inView, started, target, suffix]);

  return <span ref={ref}>0</span>;
}

/* ═══════════════════════════════════════════════════════════════
   PARTICLE DOTS (Hero Background)
═══════════════════════════════════════════════════════════════ */
function Particles() {
  const dots = Array.from({ length: 28 }, (_, i) => ({
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
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: d.size,
            height: d.size,
            opacity: 0,
          }}
          animate={{
            opacity: [0, 0.5, 0],
            y: [0, -30, -60],
            scale: [1, 1.2, 0.6],
          }}
          transition={{
            duration: d.dur,
            delay: d.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   WORD-BY-WORD REVEAL TITLE
═══════════════════════════════════════════════════════════════ */
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
            hidden: { opacity: 0, y: 24, rotateX: -40 },
            visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.55, ease: EASE } },
          }}
        >
          {w}
        </motion.span>
      ))}
    </motion.span>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SCROLL PROGRESS BAR
═══════════════════════════════════════════════════════════════ */
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

/* ═══════════════════════════════════════════════════════════════
   MAGNETIC BUTTON
═══════════════════════════════════════════════════════════════ */
function MagneticButton({ children, href }: { children: React.ReactNode; href: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouse = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setPos({ x: (e.clientX - cx) * 0.28, y: (e.clientY - cy) * 0.28 });
  }, []);

  return (
    <div ref={ref} onMouseMove={handleMouse} onMouseLeave={() => setPos({ x: 0, y: 0 })}>
      <Link href={href}>
        <motion.button
          animate={{ x: pos.x, y: pos.y }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          whileTap={{ scale: 0.96 }}
          className="inline-flex items-center gap-3 bg-white text-[#8C1B2E] font-bold px-10 py-5 rounded-full text-base shadow-2xl hover:shadow-white/20 transition-shadow duration-300 group"
        >
          Explore Our Programs
          <motion.svg
            width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden
            className="group-hover:translate-x-1 transition-transform duration-200"
          >
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
        </motion.button>
      </Link>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION LABEL
═══════════════════════════════════════════════════════════════ */
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
   PAGE
═══════════════════════════════════════════════════════════════ */
export default function About() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
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
          {/* Animated grid */}
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
            { cls: 'top-[-80px] right-[-80px] w-[420px] h-[420px]', dur: 14, delay: 0 },
            { cls: 'bottom-[-60px] left-[-60px] w-[280px] h-[280px]', dur: 11, delay: 1.5 },
            { cls: 'top-1/2 left-1/3 w-[180px] h-[180px]', dur: 9, delay: 3 },
          ].map((orb, i) => (
            <motion.div
              key={i}
              aria-hidden
              className={`absolute rounded-full bg-white/5 ${orb.cls}`}
              animate={{ scale: [1, 1.1, 1], rotate: [0, 8, 0], y: [0, -16, 0] }}
              transition={{ duration: orb.dur, repeat: Infinity, ease: 'easeInOut', delay: orb.delay }}
            />
          ))}

          {/* Rising particles */}
          <Particles />

          {/* Hero content */}
          <motion.div
            style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
            className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center py-20 sm:py-24 md:py-32"
          >
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 sm:px-5 py-2 text-xs sm:text-sm font-medium mb-8 sm:mb-10"
            >
              <motion.span
                className="w-2 h-2 rounded-full bg-white shrink-0"
                animate={{ opacity: [1, 0.3, 1], scale: [1, 1.4, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              Virtual Learning Academy
            </motion.div>

            {/* Main title — word reveal + 3D flip */}
            <div className="perspective-[800px] mt-2 sm:mt-4 mb-6">
              <AnimatedTitle
                text="About Us"
                className="text-5xl sm:text-6xl md:text-8xl font-extrabold leading-[1.05] sm:leading-[1.02] tracking-tight block"
              />
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
              className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-xl font-light mb-14 px-2"
            >
              Empowering Students Through Quality Online Education
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
              <motion.div
                className="w-5 h-8 border-2 border-white/30 rounded-full flex items-start justify-center pt-1"
              >
                <motion.div
                  className="w-1 h-2 bg-white/60 rounded-full"
                  animate={{ y: [0, 10, 0], opacity: [1, 0, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                />
              </motion.div>
              <span>Scroll</span>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* ╔══════════════════════════════════════════════════╗
            ║  OUR STORY                                      ║
            ╚══════════════════════════════════════════════════╝ */}
        <section className="py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

              {/* Sticky left */}
              <div className="lg:col-span-4 lg:sticky lg:top-28">
                <SectionLabel>Who We Are</SectionLabel>
                <motion.h2
                  variants={fadeLeft}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="text-4xl md:text-5xl font-extrabold text-[#1A1A1A] leading-tight"
                >
                  Our<br />Story
                </motion.h2>

                {/* Animated underline */}
                <motion.div
                  className="mt-4 h-[3px] bg-[#8C1B2E] rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: 48 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
                />
                <motion.p
                  variants={fadeLeft}
                  custom={1}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="text-[#8C1B2E] font-semibold mt-5"
                >
                  Founded with purpose.<br />Built for students.
                </motion.p>

                {/* Decorative bracket */}
                <motion.div
                  initial={{ opacity: 0, scaleY: 0 }}
                  whileInView={{ opacity: 1, scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
                  className="mt-10 border-l-2 border-[#8C1B2E]/20 pl-4"
                >
                  <p className="text-sm text-[#1A1A1A]/50 italic">
                    "Education is the most powerful weapon which you can use to change the world."
                  </p>
                </motion.div>
              </div>

              {/* Paragraphs */}
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="lg:col-span-8 space-y-8"
              >
                {storyParagraphs.map((text, i) => (
                  <motion.div
                    key={i}
                    variants={fadeRight}
                    custom={i}
                    className="group relative pl-7"
                  >
                    {/* Animated left border */}
                    <motion.span
                      className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full bg-[#C0C5CE] group-hover:bg-[#8C1B2E] transition-colors duration-400"
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 * i + 0.2, ease: EASE }}
                      style={{ transformOrigin: 'top' }}
                    />
                    {/* Paragraph number */}
                    <span className="absolute -left-5 top-0 text-[10px] font-bold text-[#8C1B2E]/40 tracking-widest">
                      0{i + 1}
                    </span>
                    <p className="text-lg text-[#1A1A1A]/80 leading-relaxed">{text}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ╔══════════════════════════════════════════════════╗
            ║  MISSION / VISION / VALUES                      ║
            ╚══════════════════════════════════════════════════╝ */}
        <section className="py-28 bg-[#F5F7FA] overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <SectionLabel>Foundation</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#1A1A1A]">
                Mission, Vision &amp; Values
              </h2>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {missionCards.map((card, i) => (
                <motion.div
                  key={i}
                  variants={scaleIn}
                  custom={i}
                  whileHover={{
                    y: -10,
                    boxShadow: '0 24px 48px rgba(140,27,46,0.14)',
                    transition: { duration: 0.25 },
                  }}
                  className="group relative bg-gradient-to-b from-[#FBFBFC] to-[#E9EAED] rounded-2xl p-9 border border-[#C0C5CE]/70 shadow-sm overflow-hidden cursor-default"
                >
                  {/* Gradient shine on hover */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  {/* Animated top bar */}
                  <motion.div
                    className="relative h-1 rounded-full bg-[#8C1B2E] mb-7"
                    initial={{ width: '24px' }}
                    whileInView={{ width: '40px' }}
                    whileHover={{ width: '72px' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, ease: EASE }}
                  />

                  <h3 className="relative text-2xl font-bold text-[#8C1B2E] mb-3">{card.title}</h3>
                  <p className="relative text-[#1A1A1A]/75 leading-relaxed">{card.body}</p>

                  {/* Corner accent */}
                  <motion.div
                    className="absolute bottom-0 right-0 w-20 h-20 bg-[#8C1B2E]/5 rounded-tl-full"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ╔══════════════════════════════════════════════════╗
            ║  CORE VALUES                                    ║
            ╚══════════════════════════════════════════════════╝ */}
        <section className="py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-16">

              {/* Left heading */}
              <div className="lg:w-72 shrink-0">
                <SectionLabel>What Drives Us</SectionLabel>
                <motion.h2
                  variants={fadeLeft}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="text-4xl md:text-5xl font-extrabold text-[#1A1A1A] leading-tight mb-5"
                >
                  Our Core Values
                </motion.h2>
                <motion.p
                  variants={fadeLeft}
                  custom={1}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="text-[#1A1A1A]/60"
                >
                  Six principles that guide our commitment to educational excellence
                </motion.p>
              </div>

              {/* Values grid */}
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {coreValues.map(({ icon: Icon, label }, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    custom={i}
                    whileHover={{
                      scale: 1.03,
                      boxShadow: '0 12px 32px rgba(140,27,46,0.10)',
                    }}
                    className="group relative bg-[#F5F7FA] rounded-xl p-5 border border-transparent hover:border-[#8C1B2E]/15 transition-all duration-300 flex items-center gap-5 overflow-hidden cursor-default"
                  >
                    {/* Sweep shimmer on hover */}
                    <motion.div
                      className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#8C1B2E]/5 to-transparent"
                      whileHover={{ x: ['−100%', '200%'] }}
                      transition={{ duration: 0.6 }}
                    />

                    {/* Icon box */}
                    <motion.div
                      className="relative shrink-0 w-12 h-12 rounded-xl bg-[#8C1B2E]/10 flex items-center justify-center"
                      whileHover={{ backgroundColor: '#8C1B2E', rotate: [0, -6, 6, 0] }}
                      transition={{ duration: 0.35 }}
                    >
                      <Icon
                        size={20}
                        className="text-[#8C1B2E] group-hover:text-white transition-colors duration-300"
                      />
                    </motion.div>

                    <p className="relative font-semibold text-[#1A1A1A] text-[0.95rem] leading-snug">
                      {label}
                    </p>

                    {/* Right arrow reveal */}
                    <motion.svg
                      width="14" height="14" viewBox="0 0 16 16" fill="none"
                      aria-hidden
                      className="ml-auto shrink-0 text-[#8C1B2E] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </motion.svg>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ╔══════════════════════════════════════════════════╗
            ║  WHY WE EXIST                                   ║
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
              <SectionLabel>Our Purpose</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#1A1A1A]">
                Why We Exist
              </h2>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {whyCards.map((card, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  custom={i}
                  whileHover={{
                    y: -8,
                    boxShadow: '0 20px 48px rgba(0,0,0,0.08)',
                  }}
                  className="group relative bg-gradient-to-b from-[#FBFBFC] to-[#E9EAED] rounded-2xl p-10 border border-[#C0C5CE]/60 shadow-sm overflow-hidden"
                >
                  {/* Animated number */}
                  <motion.div
                    className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-[#8C1B2E] text-white font-extrabold text-base mb-6 shadow-md"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    0{i + 1}
                  </motion.div>

                  <h3 className="text-xl font-bold text-[#8C1B2E] mb-4">{card.title}</h3>
                  <p className="text-[#1A1A1A]/75 leading-relaxed">{card.body}</p>

                  {/* Bottom fill bar */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-[3px] bg-[#8C1B2E]"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.4, ease: EASE }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ╔══════════════════════════════════════════════════╗
            ║  STATS                                          ║
            ╚══════════════════════════════════════════════════╝ */}
        <section className="py-20 bg-white border-y border-[#C0C5CE]/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center"
            >
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  variants={scaleIn}
                  custom={i}
                  className="flex flex-col items-center gap-2"
                >
                  {/* Circular progress ring */}
                  <motion.svg
                    width="88" height="88" viewBox="0 0 88 88"
                    className="mb-2 -rotate-90"
                    aria-hidden
                  >
                    <circle cx="44" cy="44" r="36" fill="none" stroke="#F5F7FA" strokeWidth="5" />
                    <motion.circle
                      cx="44" cy="44" r="36"
                      fill="none"
                      stroke="#8C1B2E"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 36}
                      initial={{ strokeDashoffset: 2 * Math.PI * 36 }}
                      whileInView={{ strokeDashoffset: 2 * Math.PI * 36 * (1 - (s.value > 1000 ? 0.85 : s.value / 100)) }}
                      viewport={{ once: true }}
                      transition={{ duration: 2, delay: i * 0.15, ease: 'easeOut' }}
                    />
                  </motion.svg>

                  <p className="text-4xl font-extrabold text-[#8C1B2E] tracking-tight -mt-16">
                    <AnimatedCounter target={s.value} suffix={s.suffix} />
                  </p>
                  <p className="text-xs font-bold text-[#1A1A1A]/50 uppercase tracking-widest mt-12">
                    {s.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ╔══════════════════════════════════════════════════╗
            ║  CTA                                            ║
            ╚══════════════════════════════════════════════════╝ */}
        <section className="gradient-hero text-white py-28 relative overflow-hidden">
          {/* Animated grid */}
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

          {/* Glowing orbs */}
          {[
            'top-[-60px] right-[-60px] w-72 h-72',
            'bottom-[-40px] left-[-40px] w-52 h-52',
          ].map((cls, i) => (
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
              Join Our Learning<br />Community
            </motion.h2>

            <motion.p
              variants={fadeUp}
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-white/70 text-lg mb-12 max-w-md mx-auto"
            >
              Take the first step toward a world-class education — wherever you are.
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <MagneticButton href="/programs">Explore Our Programs</MagneticButton>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
