'use client';

import React, { useRef, useState, use, useMemo } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  AnimatePresence,
} from 'framer-motion';
import {
  BookOpen,
  Award,
  Zap,
  Users,
  Clock,
  CheckCircle2,
  Star,
  ArrowLeft,
  Calendar,
  FileText,
  AlertCircle,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  Sparkles,
  ArrowRight,
  GraduationCap,
  Target,
  ShieldCheck,
  Download,
  Quote,
  UserCheck,
  Layers,
  Globe,
  Timer,
  MessageCircle,
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

/* ═══════════════════════════════════════════════════════════════
   ANIMATION CONSTANTS
═══════════════════════════════════════════════════════════════ */
const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: EASE },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

/* ═══════════════════════════════════════════════════════════════
   SHARED UTILITIES
═══════════════════════════════════════════════════════════════ */
function Particles() {
  const dots = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
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
          animate={{ opacity: [0, 0.35, 0], y: [0, -20, -40] }}
          transition={{ duration: d.dur, delay: d.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
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

function AnimatedTitle({ text, className }: { text: string; className?: string }) {
  const words = text.split(' ');
  return (
    <motion.span
      className={className}
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em]"
          variants={{
            hidden: { opacity: 0, y: 15 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
          }}
        >
          {w}
        </motion.span>
      ))}
    </motion.span>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PROGRAM DATA — enriched with stats, audience, instructor,
   testimonial and a per-program accent motif
═══════════════════════════════════════════════════════════════ */
const detailedProgramsData: Record<string, any> = {
  'british-curriculum-pre-k-to-grade-7': {
    title: 'British Curriculum (Pre-K to Grade 7)',
    shortTitle: 'British Curriculum',
    icon: BookOpen,
    accent: '#8C1B2E',
    motifLabel: 'Term Planner',
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80',
    tagline: 'World-class early years and primary education, rooted in academic excellence.',
    stats: [
      { label: 'Grade Range', value: 'Pre-K – 7' },
      { label: 'Class Days', value: 'Sun – Thu' },
      { label: 'Format', value: 'Live, small group' },
      { label: 'Starts', value: 'Rolling terms' },
    ],
    longDescription: 'Our primary framework provides a comprehensive learning journey mapped closely to the National Curriculum of England. Using recognized Oxford and Cambridge textbooks, we run highly collaborative virtual classrooms where children build fluency in literacy, progressive arithmetic, scientific thinking, and digital skills from the early years up through Key Stage 2.',
    whoFor: 'Families who want a full British-style primary education online — from a child\'s very first structured lessons through to the transition into secondary school — without relocating or commuting.',
    requirements: [
      'Age-appropriate placement documentation & previous report cards.',
      'Stable high-speed internet connection supporting HD live video streaming.',
      'Desktop, laptop, or tablet setup with independent media access options.',
      'Active parental mentorship or supervisor availability for groups spanning Pre-K to Grade 2.'
    ],
    schedule: [
      { session: 'Morning Cohort', time: '09:00 AM - 12:00 PM (KSA Time, AST +0300)' },
      { session: 'Evening Cohort', time: '03:00 PM - 06:00 PM (KSA Time, AST +0300)' },
    ],
    features: [
      'Daily live interactive sessions led by certified UK-methodology specialists.',
      'Full resource alignment across Literacy, Math, Science & Digital Skills.',
      'Weekly feedback milestones and unified progress appraisals.',
      'Interactive learning logs tracking assignment progress in real time.'
    ],
    curriculumBreakdown: [
      { phase: 'Early Years Foundation (Pre-K & KG)', focus: 'Phonics progression, intuitive number sense, speech confidence, and early cognitive coordination.' },
      { phase: 'Key Stage 1 (Grades 1 - 2)', focus: 'Structured reading vocabulary, incremental arithmetic, hands-on science exploration, and early creative expression.' },
      { phase: 'Key Stage 2 (Grades 3 - 7)', focus: 'Advanced reading comprehension, analytical problem-solving, experimental science, and global history & geography.' }
    ],
    instructor: {
      name: 'Ms. Farah Iqbal',
      role: 'Head of Primary, 11 years teaching the UK curriculum',
      note: 'Believes every child learns best when lessons feel like a conversation, not a lecture.'
    },
    testimonial: {
      quote: 'The live classes kept my daughter engaged in a way recorded lessons never did. Her teachers actually know her strengths.',
      name: 'Ayesha K., Parent — Grade 4'
    },
    faqs: [
      { q: 'Are textbooks provided digitally through your portal?', a: 'Yes — full resource bundles, worksheets, and digital study companions are available on our learning platform as soon as registration is confirmed.' },
      { q: 'Can my child switch between morning and evening cohorts mid-term?', a: 'Yes, transitions between active groups are processed smoothly, subject to seat availability in the target class.' }
    ]
  },
  'federal-board-curriculum-grades-8-12': {
    title: 'Federal Board Curriculum (Grades 8-12)',
    shortTitle: 'Federal Board',
    icon: Award,
    accent: '#8C1B2E',
    motifLabel: 'Admit Card',
    image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1200&q=80',
    tagline: 'High-impact academic preparation engineered for board examination success.',
    stats: [
      { label: 'Grade Range', value: '8 – 12' },
      { label: 'Class Days', value: 'Sun – Thu' },
      { label: 'Format', value: 'Live, small group' },
      { label: 'Board', value: 'FBISE' },
    ],
    longDescription: 'This program is built precisely around the requirements of the Federal Board of Pakistan (FBISE). Our senior educators break complex national syllabus objectives into digestible lecture sequences, rigorous concept checks, and extensive past-paper drills — so students walk into their board exams having already seen the shape of the test.',
    whoFor: 'Students in Grades 8–12 preparing for FBISE board exams who want structured teaching, disciplined revision, and a clear route into competitive university admissions.',
    requirements: [
      'Completion records for Grade 7 coursework or an equivalent entry evaluation.',
      'Firm conceptual foundations in mathematics and science basics.',
      'A working computer with standard desktop software support.',
      'Availability for designated monthly mock exam simulations.'
    ],
    schedule: [
      { session: 'Morning Cohort', time: '08:00 AM - 12:00 PM (KSA Time, AST +0300)' },
      { session: 'Evening Cohort', time: '03:00 PM - 07:00 PM (KSA Time, AST +0300)' },
    ],
    features: [
      'Direct textbook coverage backed by exclusive academic notes.',
      'Continuous evaluation with timing breakdowns and scoring analysis.',
      'Personalized diagnostic charts and score projections.',
      'Direct query access to senior faculty for exam-focused doubts.'
    ],
    curriculumBreakdown: [
      { phase: 'Secondary Level (Grades 8 - 10)', focus: 'Advanced physics, inorganic chemistry, biological systems, higher-order math, and core compulsory subjects.' },
      { phase: 'Higher Secondary (Grades 11 - 12)', focus: 'Focused Pre-Engineering, Pre-Medical, or General Science streams mapped to entrance-exam requirements.' }
    ],
    instructor: {
      name: 'Mr. Kashif Raza',
      role: 'Senior FBISE Examiner-trained Faculty, 14 years',
      note: 'Has coached over 300 board candidates through top-decile results.'
    },
    testimonial: {
      quote: 'The past-paper drills made the real exam feel familiar. My tutor showed me exactly where I was losing marks.',
      name: 'Bilal R., Student — Grade 10'
    },
    faqs: [
      { q: 'Do you handle board enrollment paperwork directly?', a: 'Yes — we manage formal candidate registration, verification files, and give administrative guidance to simplify the board admissions process.' },
      { q: 'How often are full mock exams held?', a: 'Chapter tests run every two weeks, building into full timed mock exams starting two months before the real board schedule.' }
    ]
  },
  'igcse-o-level-preparation': {
    title: 'IGCSE & O Level Preparation',
    shortTitle: 'IGCSE & O Level',
    icon: Zap,
    accent: '#8C1B2E',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Internationally recognized certification, prepared with proven exam strategy.',
    stats: [
      { label: 'Level', value: 'IGCSE / O Level' },
      { label: 'Class Days', value: 'Sun – Thu' },
      { label: 'Format', value: 'Live group class' },
      { label: 'Boards', value: 'CAIE / Edexcel' },
    ],
    longDescription: 'A structured, exam-driven program built precisely around Cambridge Assessment International Education (CAIE) and Pearson Edexcel criteria. We focus on analytical reasoning, data-response technique, and examiner-style marking rubrics, so students walk in knowing exactly how marks are won and lost.',
    whoFor: 'Students pursuing an internationally recognized qualification who plan to apply to universities abroad, or who need a portable, globally-understood certificate.',
    requirements: [
      'Sound reading comprehension and basic mathematical fluency.',
      'Transcripts confirming successful completion of junior high school or equivalent.',
      'Ability to scan or photograph handwritten mock answers for grading.',
      'Commitment to timed mock sessions under real exam conditions.'
    ],
    schedule: [
      { session: 'Morning Cohort', time: '08:00 AM - 12:00 PM (KSA Time, AST +0300)' },
      { session: 'Evening Cohort', time: '03:00 PM - 07:00 PM (KSA Time, AST +0300)' },
    ],
    features: [
      'Full syllabus coverage: Math, Additional Math, Physics, Chemistry, Biology, Business.',
      'Past-paper strategy drawn from 15+ years of historic assessments.',
      'Structured response technique for long-form theory questions.',
      'Virtual lab walkthroughs covering required practical concepts.'
    ],
    curriculumBreakdown: [
      { phase: 'Syllabus Mapping', focus: 'A full pass through official board requirements to confirm complete topic coverage before drills begin.' },
      { phase: 'Application & Consolidation', focus: 'Intensive practice on compound problems, thematic questions, and challenging case-study prompts.' },
      { phase: 'Timed Exam Simulation', focus: 'Live mock exams graded to official standards, followed by detailed, one-on-one review sessions.' }
    ],
    instructor: {
      name: 'Ms. Sara Chaudhry',
      role: 'CAIE-trained subject lead, 9 years',
      note: 'Marks every mock the way an official examiner would — no partial credit for guesswork.'
    },
    testimonial: {
      quote: 'The past-paper practice made the real exam feel familiar. My tutor broke down exactly where I was losing marks.',
      name: 'Bilal R., Student — IGCSE O Level'
    },
    faqs: [
      { q: 'Can I enroll in individual subjects only?', a: 'Yes — our modular design lets you enroll in single subjects or a full course load, based on your study goals.' },
      { q: 'Are mock exams graded to real examiner standards?', a: 'Every written mock is marked against official grading rubrics and examiner guidance documents.' }
    ]
  },
  'fbise-grade-8-12-program': {
    title: 'FBISE Grade 8-12 Program',
    shortTitle: 'FBISE Extended',
    icon: Users,
    accent: '#8C1B2E',
    motifLabel: 'Schedule Board',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Extended contact hours and deeper review, for students who want more.',
    stats: [
      { label: 'Grade Range', value: '8 – 12' },
      { label: 'Class Days', value: 'Sat – Thu' },
      { label: 'Format', value: 'Live group class' },
      { label: 'Extra', value: 'Saturday clinics' },
    ],
    longDescription: 'An expanded version of the national board program, with extra contact hours, interactive group workshops, and dedicated weekend help sessions. Built for students who want a genuinely thorough grasp of every concept, not just exam-ready shortcuts, with more direct time with senior faculty.',
    whoFor: 'Students who want more instructional time than a standard board program offers — extra practice, extra faculty access, and a Saturday clinic to close gaps before they become exam problems.',
    requirements: [
      'Previous grade academic records or compatible international school transcripts.',
      'Readiness to participate in intensive live learning sessions.',
      'Reliable broadband connection and a working camera.',
      'Willingness to take part in collaborative peer study groups.'
    ],
    schedule: [
      { session: 'Morning Cohort', time: '08:00 AM - 01:00 PM (KSA Time, AST +0300)' },
      { session: 'Evening Cohort', time: '03:00 PM - 08:00 PM (KSA Time, AST +0300)' },
    ],
    features: [
      'Daily live instruction covering the full syllabus in depth.',
      'Mandatory Saturday revision clinics with peer discussion and oral testing.',
      'Regular progress reports sent directly to parents.',
      'Study plans personalized to regional and school-term variations.'
    ],
    curriculumBreakdown: [
      { phase: 'Matric Foundation Stream', focus: 'Deep work on mathematical theorems, core science formulas, and formal grammar structure.' },
      { phase: 'Intermediate Advanced Stream', focus: 'Pre-university modules covering advanced science applications, engineering basics, and medical-track prerequisites.' }
    ],
    instructor: {
      name: 'Mr. Usman Tariq',
      role: 'Lead Coordinator, FBISE Extended Track, 10 years',
      note: 'Runs the Saturday clinic personally — no substitute teachers on review days.'
    },
    testimonial: {
      quote: 'The evening sessions and extra Saturday clinics have honestly been a blessing for our family\'s schedule.',
      name: 'Sana M., Parent'
    },
    faqs: [
      { q: 'How is this different from the standard curriculum track?', a: 'This path provides roughly 20% more instructional hours, additional weekly review clinics, and more comprehensive mock exams.' },
      { q: 'Is course material available digitally?', a: 'Yes — study notes, presentation slides, and fully solved problem sets are available on our portal from day one.' }
    ]
  }
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProgramDetailPage({ params }: PageProps) {
  const unwrappedParams = use(params);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });

  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  const heroY = useTransform(heroProgress, [0, 1], ['0%', '12%']);
  const heroOpacity = useTransform(heroProgress, [0, 0.85], [1, 0]);

  const rawSlug = unwrappedParams.slug;
  const sanitizedSlug = useMemo(() => {
    return rawSlug ? rawSlug.replace(/^-+|-+$/g, '').toLowerCase() : '';
  }, [rawSlug]);

  const program = detailedProgramsData[sanitizedSlug];

  const otherPrograms = useMemo(() => {
    return Object.entries(detailedProgramsData)
      .filter(([slug]) => slug !== sanitizedSlug)
      .slice(0, 3)
      .map(([slug, data]) => ({ slug, ...data }));
  }, [sanitizedSlug]);

  if (!program) {
    return (
      <>
        <Navbar />
        <div className="min-h-[60vh] bg-white flex flex-col items-center justify-center text-center px-4">
          <div className="p-4 bg-[#8C1B2E]/10 rounded-full mb-4">
            <AlertCircle className="w-12 h-12 text-[#8C1B2E]" />
          </div>
          <h1 className="text-2xl font-extrabold text-[#1A1A1A] mb-2">Program Not Found</h1>
          <p className="text-sm text-[#1A1A1A]/60 mb-6 max-w-sm">
            The program you're looking for doesn't exist or may have been renamed. Browse the full catalog instead.
          </p>
          <Link href="/programs">
            <button className="bg-gradient-to-r from-[#8C1B2E] to-[#B43A4E] text-white font-bold px-6 py-3 rounded-xl text-sm hover:shadow-lg transition-all">
              Return to Catalog
            </button>
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  const IconComponent = program.icon;

  return (
    <>
      <motion.div className="fixed top-0 left-0 right-0 h-[3px] bg-[#8C1B2E] origin-left z-[999]" style={{ scaleX }} />
      <Navbar />

      <main className="bg-white min-h-screen text-[#1A1A1A] antialiased overflow-hidden">

        {/* ╔══════════════════════════════════════════════════╗
            ║ HERO                                             ║
            ╚══════════════════════════════════════════════════╝ */}
        <motion.section
          ref={heroRef}
          className="relative overflow-hidden bg-gradient-to-r from-[#8C1B2E] to-[#B43A4E] text-white pt-20 pb-20 md:pt-28 md:pb-24"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px), linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)',
              backgroundSize: '56px 56px',
            }}
          />
          {/* Floating orbs for depth */}
          <motion.div
            aria-hidden
            className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-white/5"
            animate={{ scale: [1, 1.1, 1], y: [0, -14, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            aria-hidden
            className="absolute -bottom-12 -left-12 w-56 h-56 rounded-full bg-white/5"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />

          <Particles />

          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-6"
          >
            {/* Breadcrumb / back nav */}
            <div className="flex items-center gap-2 text-xs text-white/60 flex-wrap">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/programs" className="hover:text-white transition-colors">Programs</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white font-semibold">{program.shortTitle}</span>
            </div>

            <Link href="/programs">
              <motion.div
                whileHover={{ x: -4 }}
                className="inline-flex items-center gap-2 text-white/80 hover:text-white font-bold text-xs bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                Return to Academic Catalog
              </motion.div>
            </Link>

            <div className="max-w-4xl space-y-4">
              {/* <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-1 text-[11px] font-bold tracking-widest uppercase text-white backdrop-blur-sm"> */}
                {/* <IconComponent className="w-3.5 h-3.5 text-white shrink-0" /> */}
                {/* <span>{program.motifLabel} &middot; Official Academy Syllabus</span> */}
              {/* </div> */}

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                <AnimatedTitle text={program.title} />
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-white/90 font-light max-w-2xl leading-relaxed">
                {program.tagline}
              </p>
            </div>

            {/* Quick stats strip */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-2 max-w-2xl"
            >
              {program.stats.map((s: { label: string; value: string }, i: number) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  custom={i}
                  className="bg-white/10 border border-white/15 backdrop-blur-sm rounded-xl px-3 py-2.5"
                >
                  <p className="text-[9px] uppercase tracking-widest text-white/55 font-bold mb-0.5">{s.label}</p>
                  <p className="text-sm font-extrabold text-white leading-tight">{s.value}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.section>

        {/* ╔══════════════════════════════════════════════════╗
            ║ IMAGE SHOWCASE                                   ║
            ╚══════════════════════════════════════════════════╝ */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 md:-mt-12 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="relative h-48 sm:h-64 md:h-80 w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-[#EEEFF1]"
          >
            <img
              src={program.image}
              alt={program.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 text-white flex items-center gap-2.5">
              <div className="p-1.5 bg-[#8C1B2E] rounded-md hidden sm:block">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <p className="text-xs font-bold tracking-wide shadow-sm bg-black/20 backdrop-blur-sm px-2 py-1 rounded">
                Interactive Virtual Learning Environment
              </p>
            </div>
            <div className="absolute top-4 right-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm text-[#8C1B2E] text-[11px] font-bold px-3 py-1.5 rounded-full shadow-sm">
              <Star className="w-3.5 h-3.5 fill-[#8C1B2E]" /> Rated 4.9 by parents & students
            </div>
          </motion.div>
        </section>

        {/* ╔══════════════════════════════════════════════════╗
            ║ CORE CONTENT                                     ║
            ╚══════════════════════════════════════════════════╝ */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Left column */}
            <div className="lg:col-span-8 space-y-8">

              {/* Dossier */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-[#EEEFF1] p-6 sm:p-8 rounded-2xl border-2 border-[#C0C5CE]/70 shadow-sm space-y-3"
              >
                <SectionLabel>Academic Dossier &amp; Scope</SectionLabel>
                <p className="text-sm sm:text-base text-[#1A1A1A]/85 leading-relaxed">
                  {program.longDescription}
                </p>
                <p className="text-xs sm:text-sm text-[#1A1A1A]/70 leading-relaxed pt-3 border-t border-[#C0C5CE]/50">
                  Our digital framework keeps students engaged through collaborative multimedia elements, structured whiteboards, and diagnostic benchmarking. Educators adapt live workflows in real time to close comprehension gaps before exam phases begin.
                </p>
              </motion.div>

              {/* Who is this for */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-[#C0C5CE]/70 shadow-sm"
              >
                <SectionLabel>Who This Program Is For</SectionLabel>
                <div className="flex items-start gap-3 mt-1">
                  <Target className="w-5 h-5 text-[#8C1B2E] shrink-0 mt-0.5" />
                  <p className="text-sm sm:text-base text-[#1A1A1A]/80 leading-relaxed">{program.whoFor}</p>
                </div>
              </motion.div>

              {/* Prerequisites */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-[#C0C5CE]/70 shadow-sm space-y-4"
              >
                <div>
                  <SectionLabel>Prerequisites &amp; Gateways</SectionLabel>
                  <p className="text-xs text-[#1A1A1A]/60 mt-0.5">Please review these readiness guidelines before enrollment.</p>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {program.requirements.map((req: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-[#F5F7FA] rounded-xl border-l-4 border-[#8C1B2E] hover:bg-[#EEEFF1]/50 transition-colors">
                      <CheckCircle2 className="w-4 h-4 text-[#8C1B2E] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm font-medium text-[#1A1A1A]/80 leading-relaxed">{req}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Curriculum milestones */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-[#C0C5CE]/70 shadow-sm space-y-4"
              >
                <SectionLabel>Educational Milestones</SectionLabel>

                <div className="space-y-6 relative before:absolute before:inset-y-0 before:left-[15px] before:w-[2px] before:bg-[#F5F7FA]">
                  {program.curriculumBreakdown.map((block: any, idx: number) => (
                    <div key={idx} className="relative pl-10 group">
                      <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-[#8C1B2E]/10 border-2 border-[#8C1B2E]/20 flex items-center justify-center text-[11px] font-extrabold text-[#8C1B2E] group-hover:bg-[#8C1B2E] group-hover:text-white group-hover:border-[#8C1B2E] transition-colors">
                        {idx + 1}
                      </div>
                      <h4 className="font-extrabold text-sm sm:text-base text-[#1A1A1A] group-hover:text-[#8C1B2E] transition-colors pt-1">{block.phase}</h4>
                      <p className="text-xs sm:text-sm text-[#1A1A1A]/70 mt-1 leading-relaxed">{block.focus}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Instructor spotlight */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-gradient-to-br from-[#8C1B2E] to-[#B43A4E] p-6 sm:p-8 rounded-2xl shadow-sm text-white relative overflow-hidden"
              >
                <div
                  className="absolute inset-0 opacity-[0.06] pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(circle at 15% 25%, white 1px, transparent 1px)',
                    backgroundSize: '28px 28px',
                  }}
                />
                <div className="relative flex flex-col sm:flex-row sm:items-center gap-5">
                  <div className="w-16 h-16 rounded-full bg-white/15 border-2 border-white/30 flex items-center justify-center shrink-0">
                    <UserCheck className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/60 font-bold mb-1">Faculty Spotlight</p>
                    <h4 className="text-lg font-extrabold">{program.instructor.name}</h4>
                    <p className="text-xs text-white/70 mb-2">{program.instructor.role}</p>
                    <p className="text-sm text-white/90 leading-relaxed italic">&ldquo;{program.instructor.note}&rdquo;</p>
                  </div>
                </div>
              </motion.div>

              {/* Testimonial */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-[#F5F7FA] p-6 sm:p-8 rounded-2xl border border-[#C0C5CE]/60"
              >
                <Quote className="w-6 h-6 text-[#8C1B2E]/25 mb-2" />
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#8C1B2E] text-[#8C1B2E]" />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-[#1A1A1A]/80 leading-relaxed italic mb-3">
                  &ldquo;{program.testimonial.quote}&rdquo;
                </p>
                <p className="text-xs font-bold text-[#1A1A1A]">{program.testimonial.name}</p>
              </motion.div>

              {/* FAQs */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-[#C0C5CE]/70 shadow-sm space-y-4"
              >
                <SectionLabel>Program FAQs</SectionLabel>

                <div className="space-y-3">
                  {program.faqs.map((faq: any, idx: number) => {
                    const isOpen = activeFaq === idx;
                    return (
                      <div key={idx} className="border border-[#C0C5CE]/60 rounded-xl overflow-hidden shadow-sm">
                        <button
                          onClick={() => setActiveFaq(isOpen ? null : idx)}
                          className="w-full flex items-center justify-between p-4 bg-[#F5F7FA] hover:bg-[#EEEFF1] text-left transition-colors font-bold text-[#1A1A1A] text-xs sm:text-sm gap-4"
                        >
                          <span className="flex items-center gap-2">
                            <HelpCircle className="w-4 h-4 text-[#8C1B2E] shrink-0" />
                            {faq.q}
                          </span>
                          <ChevronDown className={`w-4 h-4 text-[#8C1B2E] shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: 'easeInOut' }}
                              className="bg-white text-xs sm:text-sm text-[#1A1A1A]/75 p-4 border-t border-[#C0C5CE]/60 leading-relaxed"
                            >
                              {faq.a}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center gap-2 text-xs text-[#1A1A1A]/50 pt-2">
                  <MessageCircle className="w-3.5 h-3.5" />
                  Still have questions? <Link href="/contact" className="text-[#8C1B2E] font-bold hover:underline">Talk to an advisor</Link>
                </div>
              </motion.div>
            </div>

            {/* Right sticky sidebar */}
            <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6 w-full">
              <div className="bg-[#EEEFF1] p-6 rounded-2xl border-2 border-[#C0C5CE]/70 shadow-xl space-y-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#8C1B2E]" />

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-extrabold text-[#1A1A1A]">Curricular Blueprint</h3>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-[#8C1B2E] mt-0.5 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8C1B2E] animate-pulse" />
                      Live Seats Active
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[#8C1B2E]/10 flex items-center justify-center shrink-0">
                    <IconComponent className="w-5 h-5 text-[#8C1B2E]" />
                  </div>
                </div>

                {/* Inclusions */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-[#8C1B2E] uppercase tracking-wider flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5" /> Academic Core Inclusions
                  </h4>
                  <ul className="space-y-2.5">
                    {program.features.map((feat: string, i: number) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs font-semibold text-[#1A1A1A]/80">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#8C1B2E] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <hr className="border-[#C0C5CE]/60" />

                {/* Schedule */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-[#8C1B2E] uppercase tracking-wider flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5" /> Cohort Scheduling Tracks
                  </h4>
                  <div className="grid grid-cols-1 gap-2.5">
                    {program.schedule.map((sch: any, i: number) => (
                      <div key={i} className="p-3 bg-white border border-[#C0C5CE]/60 rounded-xl space-y-1 hover:border-[#8C1B2E]/30 transition-colors shadow-sm">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#8C1B2E]">
                          <Calendar className="w-3.5 h-3.5" /> {sch.session}
                        </div>
                        <p className="text-[11px] text-[#1A1A1A]/70 font-medium leading-tight">{sch.time}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <hr className="border-[#C0C5CE]/60" />

                {/* Trust markers */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-[11px] font-semibold text-[#1A1A1A]/70">
                    <ShieldCheck className="w-4 h-4 text-[#8C1B2E] shrink-0" /> Certified Faculty
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-semibold text-[#1A1A1A]/70">
                    <Globe className="w-4 h-4 text-[#8C1B2E] shrink-0" /> Learn Anywhere
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-semibold text-[#1A1A1A]/70">
                    <Timer className="w-4 h-4 text-[#8C1B2E] shrink-0" /> Flexible Timing
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-semibold text-[#1A1A1A]/70">
                    <Layers className="w-4 h-4 text-[#8C1B2E] shrink-0" /> Full Syllabus
                  </div>
                </div>

                {/* CTAs */}
                <div className="pt-1 space-y-2.5">
                  <Link href="/contact" className="block w-full">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-[#8C1B2E] hover:bg-[#B43A4E] text-white py-3.5 text-xs sm:text-sm font-bold shadow-lg rounded-xl flex items-center justify-center gap-2 transition-colors duration-200"
                    >
                      Apply For Free Trial Class <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </Link>
                  <button className="w-full bg-white border-2 border-[#8C1B2E]/20 hover:border-[#8C1B2E] text-[#8C1B2E] py-3 text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-colors duration-200">
                    <Download className="w-4 h-4" /> Download Syllabus PDF
                  </button>
                </div>

                <p className="text-[10px] text-center text-[#1A1A1A]/40 font-medium leading-normal px-1">
                  Have evaluation questions? Reach out directly via our official channels for support.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* ╔══════════════════════════════════════════════════╗
            ║ RELATED PROGRAMS                                 ║
            ╚══════════════════════════════════════════════════╝ */}
        <section className="bg-[#F5F7FA] py-16 sm:py-20 border-t border-[#C0C5CE]/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="mb-10"
            >
              <SectionLabel>Keep Exploring</SectionLabel>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A]">Other Programs You Might Consider</h2>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-5"
            >
              {otherPrograms.map((p) => {
                const Icon = p.icon;
                return (
                  <motion.div key={p.slug} variants={fadeUp}>
                    <Link href={`/programs/${p.slug}`}>
                      <div className="group bg-white rounded-2xl border border-[#C0C5CE]/60 p-6 h-full hover:border-[#8C1B2E]/40 hover:shadow-md transition-all duration-300">
                        <div className="w-11 h-11 rounded-xl bg-[#8C1B2E]/10 group-hover:bg-[#8C1B2E] flex items-center justify-center mb-4 transition-colors duration-300">
                          <Icon className="w-5 h-5 text-[#8C1B2E] group-hover:text-white transition-colors duration-300" />
                        </div>
                        <h3 className="font-bold text-[#1A1A1A] text-sm mb-1.5 group-hover:text-[#8C1B2E] transition-colors">{p.shortTitle}</h3>
                        <p className="text-xs text-[#1A1A1A]/60 leading-relaxed mb-4 line-clamp-2">{p.tagline}</p>
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8C1B2E]">
                          View Program <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
