'use client';

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from 'framer-motion';
import { Star, ArrowRight } from 'lucide-react';
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
   DATA  (unchanged content)
═══════════════════════════════════════════════════════════════ */
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
      "We appreciate the flexibility, quality of instruction, and regular communication from the school. It&apos;s exactly what our family needed.",
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
      "Best investment in our child&apos;s education. The platform is user-friendly and the teachers are truly passionate about their students&apos; success.",
    rating: 5,
    image: '💡',
  },
  {
    name: 'James Wilson',
    role: 'Student',
    feedback:
      "The interactive lessons keep me engaged. I&apos;m getting better grades and I actually enjoy learning now. Highly recommend VLA!",
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

const faqs = [
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
];

/* ═══════════════════════════════════════════════════════════════
   SHARED UTILITIES (consistent with Why Choose Us & Programs)
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
            hidden: { opacity: 0, y: 28, rotateX: -40 },
            visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.55, ease: EASE } },
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
   STAT CARD
═══════════════════════════════════════════════════════════════ */
function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  return (
    <motion.div
      variants={scaleIn}
      custom={index}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="relative bg-white rounded-2xl border-2 border-[#C0C5CE]/70 hover:border-[#8C1B2E]/40 transition-colors duration-300 px-6 py-9 text-center overflow-hidden"
    >
      <motion.div
        className="absolute top-0 left-0 right-0 h-[3px] bg-[#8C1B2E] origin-left"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }}
      />
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, type: 'spring', stiffness: 200, damping: 14 }}
        className="text-4xl md:text-5xl font-extrabold text-[#8C1B2E] mb-2"
      >
        {stat.number}
      </motion.div>
      <p className="text-base text-[#1A1A1A] font-semibold">{stat.label}</p>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TESTIMONIAL CARD
═══════════════════════════════════════════════════════════════ */
function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -10, boxShadow: '0 24px 48px rgba(140,27,46,0.13)' }}
      transition={{ duration: 0.28 }}
      className="group relative bg-white rounded-2xl border-2 border-[#C0C5CE]/70 hover:border-[#8C1B2E]/40 transition-colors duration-300 overflow-hidden flex flex-col p-8"
    >
      <motion.div
        className="absolute top-0 left-0 right-0 h-[3px] bg-[#8C1B2E] origin-left"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }}
      />

      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
          >
            <Star size={20} className="fill-[#8C1B2E] text-[#8C1B2E]" />
          </motion.div>
        ))}
      </div>

      {/* Quote */}
      <p className="text-[#1A1A1A]/80 mb-6 leading-relaxed italic flex-1">
        &ldquo;{testimonial.feedback}&rdquo;
      </p>

      {/* Author */}
      <div className="border-t border-[#C0C5CE] pt-6 flex items-center gap-4">
        <motion.div
          animate={hovered ? { rotate: 8, scale: 1.1 } : { rotate: 0, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#8C1B2E] to-[#B43A4E] flex items-center justify-center text-2xl shadow-md"
        >
          {testimonial.image}
        </motion.div>
        <div>
          <p className="font-bold text-[#8C1B2E]">{testimonial.name}</p>
          <p className="text-sm text-[#1A1A1A]/60">{testimonial.role}</p>
        </div>
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
}

/* ═══════════════════════════════════════════════════════════════
   FAQ ITEM
═══════════════════════════════════════════════════════════════ */
function FaqItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative bg-[#F5F7FA] rounded-2xl border-2 border-[#C0C5CE]/70 hover:border-[#8C1B2E]/40 transition-colors duration-300 overflow-hidden p-7"
    >
      <motion.div
        className="absolute top-0 left-0 bottom-0 w-[3px] bg-[#8C1B2E] origin-top"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.06, ease: EASE }}
      />
      <div className="pl-3">
        <h3 className="font-bold text-[#8C1B2E] mb-3 text-lg flex items-center gap-2">
          {faq.q}
          <motion.span
            animate={hovered ? { x: 4 } : { x: 0 }}
            transition={{ duration: 0.25 }}
            className="text-[#8C1B2E] opacity-0 group-hover:opacity-100"
          >
            <ArrowRight className="w-4 h-4" />
          </motion.span>
        </h3>
        <p className="text-[#1A1A1A]/75 leading-relaxed">{faq.a}</p>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════ */
export default function Testimonials() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(heroProgress, [0, 1], ['0%', '22%']);
  const heroOpacity = useTransform(heroProgress, [0, 0.75], [1, 0]);
  const heroScale = useTransform(heroProgress, [0, 1], [1, 1.04]);

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
          style={{ minHeight: '560px' }}
        >
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

          {[
            { cls: '-top-20 -right-20 w-[400px] h-[400px]', dur: 14, delay: 0 },
            { cls: '-bottom-14 -left-14 w-64 h-64', dur: 11, delay: 1.5 },
            { cls: 'top-1/2 left-1/4 w-44 h-44', dur: 9, delay: 3 },
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

          <motion.div
            style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
            className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center py-28"
          >
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
              Real Stories, Real Results
            </motion.div>

            <div className="perspective-[800px] mb-6">
              <AnimatedTitle
                text="What Families Say About Us"
                className="text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight block"
              />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
              className="text-xl md:text-2xl text-white/80 max-w-xl font-light mb-14"
            >
              Hear from students and parents who have transformed their educational journey
            </motion.p>

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
            ║  STATS                                          ║
            ╚══════════════════════════════════════════════════╝ */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {stats.map((stat, index) => (
                <StatCard key={index} stat={stat} index={index} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* ╔══════════════════════════════════════════════════╗
            ║  TESTIMONIALS GRID                              ║
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
              <SectionLabel>Voices Of Our Community</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#1A1A1A]">
                Testimonials
              </h2>
              <motion.div
                className="mt-4 h-[3px] bg-[#8C1B2E] rounded-full mx-auto"
                initial={{ width: 0 }}
                whileInView={{ width: 64 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
              />
              <p className="text-lg text-[#1A1A1A]/70 max-w-2xl mx-auto mt-6">
                Real stories from real students and parents
              </p>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={index} testimonial={testimonial} index={index} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* ╔══════════════════════════════════════════════════╗
            ║  FAQ                                            ║
            ╚══════════════════════════════════════════════════╝ */}
        <section className="py-28 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <SectionLabel>Need To Know</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#1A1A1A]">
                Frequently Asked Questions
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
              className="space-y-5"
            >
              {faqs.map((faq, index) => (
                <FaqItem key={index} faq={faq} index={index} />
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
            <SectionLabel light>Be Our Next Success Story</SectionLabel>

            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight"
            >
              Join Our Community<br />of Successful Learners
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
              <MagneticButton href="/contact">Book Your Free Trial Today</MagneticButton>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
