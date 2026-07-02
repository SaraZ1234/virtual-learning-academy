'use client';

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from 'framer-motion';
import { Mail, Phone, MapPin, Send, ArrowRight } from 'lucide-react';
import { useState, useRef, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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
   SHARED UTILITIES
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

function MagneticButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const handleMouse = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos({ x: (e.clientX - (r.left + r.width / 2)) * 0.28, y: (e.clientY - (r.top + r.height / 2)) * 0.28 });
  }, []);
  return (
    <div ref={ref} onMouseMove={handleMouse} onMouseLeave={() => setPos({ x: 0, y: 0 })}>
      <motion.button
        onClick={onClick}
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
      className={`inline-flex items-center gap-2 text-xs font-bold tracking-[0.22em] uppercase mb-3 ${light ? 'text-white/60' : 'text-[#8C1B2E]'
        }`}
    >
      <span className={`block w-5 h-[2px] rounded-full ${light ? 'bg-white/40' : 'bg-[#8C1B2E]'}`} />
      {children}
    </motion.span>
  );
}

/* ═══════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════ */
const contactInfo = [
  { icon: Phone, label: 'Phone', value: '+92 3252467463', link: 'tel:+92 3252467463' },
  { icon: Mail, label: 'Email', value: 'hafsaakbar071@gmail.com ', link: 'mailto:hafsaakbar071@gmail.com ' },
  { icon: MapPin, label: 'Address', value: '  Lahore, Bahawalpur, Pakistan', link: '#' },
];

/* ═══════════════════════════════════════════════════════════════
   SUB-COMPONENTS
═══════════════════════════════════════════════════════════════ */
function ContactInfoCard({ info, index }: { info: typeof contactInfo[0]; index: number }) {
  const Icon = info.icon;
  const [hovered, setHovered] = useState(false);
  return (
    <motion.a
      href={info.link}
      variants={scaleIn}
      custom={index}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -10, boxShadow: '0 24px 48px rgba(140,27,46,0.13)' }}
      transition={{ duration: 0.28 }}
      className="group relative bg-[#EEEFF1] rounded-2xl border-2 border-[#C0C5CE]/70 hover:border-[#8C1B2E]/40 transition-colors duration-300 overflow-hidden p-8 flex flex-col items-start"
    >
      <motion.div
        className="absolute top-0 left-0 right-0 h-[3px] bg-[#8C1B2E] origin-left"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.1, ease: EASE }}
      />
      <motion.div
        animate={hovered ? { rotate: 10, scale: 1.15 } : { rotate: 0, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-14 h-14 bg-gradient-to-br from-[#8C1B2E] to-[#B43A4E] rounded-xl flex items-center justify-center mb-5 shadow-md"
      >
        <Icon className="w-7 h-7 text-white" />
      </motion.div>
      <h3 className="text-lg font-bold text-[#8C1B2E] mb-2">{info.label}</h3>
      <p className="text-[#1A1A1A]/75 group-hover:text-[#8C1B2E] transition-colors duration-200 text-sm">
        {info.value}
      </p>
      <motion.div
        className="absolute bottom-0 right-0 w-20 h-20 bg-[#8C1B2E]/5 rounded-tl-full pointer-events-none"
        initial={{ scale: 0, opacity: 0 }}
        animate={hovered ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.35 }}
      />
    </motion.a>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════ */
export default function Contact() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(heroProgress, [0, 1], ['0%', '22%']);
  const heroOpacity = useTransform(heroProgress, [0, 0.75], [1, 0]);
  const heroScale = useTransform(heroProgress, [0, 1], [1, 1.04]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);

        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });

        setTimeout(() => {
          setSubmitted(false);
        }, 3000);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    }
  };

  const inputClass =
    'w-full px-4 py-3 rounded-xl border-2 border-[#C0C5CE]/70 bg-white text-[#1A1A1A] focus:outline-none focus:border-[#8C1B2E]/60 focus:ring-2 focus:ring-[#8C1B2E]/10 transition-all duration-200 text-sm placeholder:text-[#1A1A1A]/40';

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
          className="relative overflow-hidden bg-gradient-to-r from-[#8C1B2E] to-[#B43A4E] text-white"
          style={{ minHeight: '520px' }}
        >
          {/* Grid overlay */}
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

          {/* Orbs */}
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
              We&apos;d Love to Hear From You
            </motion.div>

            <div className="perspective-[800px] mb-6">
              <AnimatedTitle
                text="Get In Touch"
                className="text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight block"
              />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
              className="text-xl md:text-2xl text-white/80 max-w-xl font-light mb-14"
            >
              Let&apos;s Build Your Child&apos;s Future Together
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
            ║  CONTACT INFO CARDS                             ║
            ╚══════════════════════════════════════════════════╝ */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <SectionLabel>Reach Out</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#1A1A1A]">Contact Information</h2>
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
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {contactInfo.map((info, index) => (
                <ContactInfoCard key={index} info={info} index={index} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* ╔══════════════════════════════════════════════════╗
            ║  FORM & SIDE INFO                               ║
            ╚══════════════════════════════════════════════════╝ */}
        <section className="py-24 bg-[#F5F7FA]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

              {/* ── FORM ── */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <SectionLabel>Drop Us A Line</SectionLabel>
                <h2 className="text-4xl font-extrabold text-[#1A1A1A] mb-2">Send Us a Message</h2>
                <motion.div
                  className="h-[3px] bg-[#8C1B2E] rounded-full mb-10"
                  initial={{ width: 0 }}
                  whileInView={{ width: 64 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
                />

                <motion.form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  variants={stagger}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {/* Full Name */}
                  <motion.div variants={fadeUp}>
                    <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={inputClass}
                      placeholder="Your name"
                    />
                  </motion.div>

                  {/* Email */}
                  <motion.div variants={fadeUp}>
                    <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={inputClass}
                      placeholder="your@email.com"
                    />
                  </motion.div>

                  {/* Phone */}
                  <motion.div variants={fadeUp}>
                    <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="+1 (555) 123-4567"
                    />
                  </motion.div>

                  {/* Subject */}
                  <motion.div variants={fadeUp}>
                    <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                      Subject
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className={inputClass}
                    >
                      <option value="">Select a subject</option>
                      <option value="enrollment">Enrollment Inquiry</option>
                      <option value="programs">Program Information</option>
                      <option value="trial">Free Trial Class</option>
                      <option value="general">General Question</option>
                      <option value="other">Other</option>
                    </select>
                  </motion.div>

                  {/* Message */}
                  <motion.div variants={fadeUp}>
                    <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className={`${inputClass} resize-none`}
                      placeholder="Tell us how we can help..."
                    />
                  </motion.div>

                  {/* Submit */}
                  <motion.div variants={fadeUp}>
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#8C1B2E] to-[#B43A4E] text-white font-bold py-4 rounded-xl hover:shadow-lg transition-all text-sm"
                    >
                      <Send size={18} />
                      Send Message
                    </motion.button>
                  </motion.div>

                  {/* Success */}
                  {submitted && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-green-50 border-2 border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm font-medium"
                    >
                      ✓ Message sent successfully! We&apos;ll get back to you soon.
                    </motion.div>
                  )}
                </motion.form>
              </motion.div>

              {/* ── SIDE INFO ── */}
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-6"
              >
                {/* Business Hours */}
                <motion.div
                  variants={fadeUp}
                  whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(140,27,46,0.10)' }}
                  transition={{ duration: 0.28 }}
                  className="relative bg-[#EEEFF1] rounded-2xl border-2 border-[#C0C5CE]/70 hover:border-[#8C1B2E]/40 transition-colors duration-300 overflow-hidden p-8"
                >
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-[3px] bg-[#8C1B2E] origin-left"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: EASE }}
                  />
                  <h3 className="text-xl font-extrabold text-[#1A1A1A] mb-5">Business Hours</h3>
                  <div className="space-y-3 text-sm">
                    {[
                      { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM' },
                      { day: 'Saturday', hours: '10:00 AM - 4:00 PM' },
                      { day: 'Sunday', hours: 'Closed' },
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center pb-3 border-b border-[#C0C5CE]/50 last:border-0 last:pb-0">
                        <span className="font-semibold text-[#1A1A1A]">{item.day}</span>
                        <span className="text-[#8C1B2E] font-bold">{item.hours}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Why Contact Us */}
                <motion.div
                  variants={fadeUp}
                  custom={1}
                  whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(140,27,46,0.10)' }}
                  transition={{ duration: 0.28 }}
                  className="relative bg-[#EEEFF1] rounded-2xl border-2 border-[#C0C5CE]/70 hover:border-[#8C1B2E]/40 transition-colors duration-300 overflow-hidden p-8"
                >
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-[3px] bg-[#8C1B2E] origin-left"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
                  />
                  <h3 className="text-xl font-extrabold text-[#1A1A1A] mb-5">Why Contact Us?</h3>
                  <ul className="space-y-3">
                    {[
                      'Get personalized program recommendations',
                      'Learn about current pricing and offers',
                      'Schedule a free trial class',
                      'Discuss your specific learning needs',
                    ].map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, ease: EASE }}
                        className="flex items-start gap-3 text-sm text-[#1A1A1A]/75"
                      >
                        <span className="w-5 h-5 rounded-full bg-gradient-to-br from-[#8C1B2E] to-[#B43A4E] flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                  <motion.div
                    className="absolute bottom-0 right-0 w-20 h-20 bg-[#8C1B2E]/5 rounded-tl-full pointer-events-none"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  />
                </motion.div>

                {/* Book Free Trial CTA */}
                <motion.div
                  variants={fadeUp}
                  custom={2}
                  className="relative bg-gradient-to-br from-[#8C1B2E] to-[#B43A4E] rounded-2xl p-8 text-white overflow-hidden"
                >
                  <motion.div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-30"
                    style={{
                      backgroundImage:
                        'linear-gradient(rgba(255,255,255,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.05) 1px,transparent 1px)',
                      backgroundSize: '40px 40px',
                    }}
                    animate={{ backgroundPosition: ['0px 0px', '40px 40px'] }}
                    transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                  />
                  <motion.div
                    aria-hidden
                    className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full"
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 7, repeat: Infinity }}
                  />
                  <Particles />
                  <div className="relative z-10">
                    <SectionLabel light>Limited Spots Available</SectionLabel>
                    <h3 className="text-2xl font-extrabold mb-3">Book Your Free Trial</h3>
                    <p className="mb-6 text-white/75 text-sm leading-relaxed">
                      Experience our teaching methodology and meet our expert educators — no commitment required.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      className="w-full bg-white text-[#8C1B2E] py-3 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-xl"
                    >
                      Schedule Now
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ╔══════════════════════════════════════════════════╗
            ║  FINAL CTA                                      ║
            ╚══════════════════════════════════════════════════╝ */}
        <section className="relative overflow-hidden bg-gradient-to-r from-[#8C1B2E] to-[#B43A4E] text-white py-28">
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
            <SectionLabel light>Ready To Start?</SectionLabel>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight"
            >
              Start Your Learning<br />Journey Today
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
              <MagneticButton>Book Your Free Trial Today</MagneticButton>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
