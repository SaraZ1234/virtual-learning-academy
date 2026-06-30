'use client';

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from 'framer-motion';
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
  X,
  User,
  Mail,
  Phone,
  GraduationCap,
  ChevronDown,
  Send,
  Loader2,
  FileText,
  CalendarDays,
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useRef, useState, useCallback } from 'react';

const MotionLink = motion(Link);


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
      className={`inline-flex items-center gap-2 text-xs font-bold tracking-[0.22em] uppercase mb-3 ${light ? 'text-white/60' : 'text-[#8C1B2E]'
        }`}
    >
      <span className={`block w-5 h-[2px] rounded-full ${light ? 'bg-white/40' : 'bg-[#8C1B2E]'}`} />
      {children}
    </motion.span>
  );
}

function SectionHeading({ label, title, subtitle, light = false }: { label: string; title: string; subtitle?: string; light?: boolean }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <SectionLabel light={light}>{label}</SectionLabel>
      <h2 className={`text-4xl md:text-5xl font-extrabold ${light ? 'text-white' : 'text-[#1A1A1A]'}`}>
        {title}
      </h2>
      <motion.div
        className={`mt-4 h-[3px] rounded-full mx-auto ${light ? 'bg-white/40' : 'bg-[#8C1B2E]'}`}
        initial={{ width: 0 }}
        whileInView={{ width: 64 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
      />
      {subtitle && (
        <p className={`text-lg max-w-2xl mx-auto mt-6 ${light ? 'text-white/70' : 'text-[#1A1A1A]/70'}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ENROLLMENT MODAL
═══════════════════════════════════════════════════════════════ */

interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseName: string;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

function EnrollmentModal({ isOpen, onClose, courseName }: EnrollmentModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    qualification: '',
    experience: '',
    message: '',
  });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    try {
      const response = await fetch("http://localhost:5000/api/enroll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          country: "",
          course: courseName,
          education: formData.qualification,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");

        setFormData({
          fullName: "",
          email: "",
          phone: "",
          qualification: "",
          experience: "",
          message: "",
        });
      } else {
        throw new Error(data.message || "Submission failed");
      }
    } catch (err: unknown) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  const handleClose = () => {
    if (status === 'submitting') return;
    setStatus('idle');
    setErrorMsg('');
    setFormData({ fullName: '', email: '', phone: '', qualification: '', experience: '', message: '' });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1000]"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed inset-0 z-[1001] flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              {/* Top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-[#8C1B2E] to-[#B43A4E] rounded-t-2xl" />

              {/* Header */}
              <div className="flex items-start justify-between p-6 pb-4 pt-7">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.18em] uppercase text-[#8C1B2E] mb-1">
                    <span className="block w-4 h-[2px] rounded-full bg-[#8C1B2E]" />
                    Course Enrollment
                  </div>
                  <h3 className="text-xl font-extrabold text-[#1A1A1A]">Enroll in {courseName}</h3>
                  <p className="text-sm text-[#1A1A1A]/60 mt-1">Fill in your details and we'll get back to you shortly.</p>
                </div>
                <button
                  onClick={handleClose}
                  disabled={status === 'submitting'}
                  className="ml-4 mt-1 w-8 h-8 rounded-full bg-[#F5F7FA] hover:bg-[#8C1B2E]/10 flex items-center justify-center transition-colors duration-200 shrink-0"
                >
                  <X className="w-4 h-4 text-[#1A1A1A]/60" />
                </button>
              </div>

              {/* Success State */}
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="px-6 pb-8 flex flex-col items-center text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.1 }}
                    className="w-20 h-20 bg-gradient-to-br from-[#8C1B2E] to-[#B43A4E] rounded-full flex items-center justify-center mb-5 shadow-lg"
                  >
                    <CheckCircle className="w-10 h-10 text-white" />
                  </motion.div>
                  <h4 className="text-xl font-extrabold text-[#1A1A1A] mb-2">Enrollment Submitted!</h4>
                  <p className="text-[#1A1A1A]/65 text-sm leading-relaxed mb-6">
                    Thank you for enrolling in <span className="font-bold text-[#8C1B2E]">{courseName}</span>. Our team will review your application and contact you within 24 hours.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleClose}
                    className="bg-gradient-to-r from-[#8C1B2E] to-[#B43A4E] text-white px-8 py-3 rounded-xl font-bold text-sm hover:shadow-lg transition-all"
                  >
                    Close
                  </motion.button>
                </motion.div>
              ) : (
                /* Form */
                <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-[#1A1A1A]/70 uppercase tracking-wide mb-1.5">
                      Full Name <span className="text-[#8C1B2E]">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1A1A1A]/40" />
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-[#C0C5CE]/70 focus:border-[#8C1B2E] focus:outline-none text-sm text-[#1A1A1A] placeholder:text-[#1A1A1A]/35 transition-colors duration-200"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-[#1A1A1A]/70 uppercase tracking-wide mb-1.5">
                      Email Address <span className="text-[#8C1B2E]">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1A1A1A]/40" />
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-[#C0C5CE]/70 focus:border-[#8C1B2E] focus:outline-none text-sm text-[#1A1A1A] placeholder:text-[#1A1A1A]/35 transition-colors duration-200"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold text-[#1A1A1A]/70 uppercase tracking-wide mb-1.5">
                      Phone Number <span className="text-[#8C1B2E]">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1A1A1A]/40" />
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-[#C0C5CE]/70 focus:border-[#8C1B2E] focus:outline-none text-sm text-[#1A1A1A] placeholder:text-[#1A1A1A]/35 transition-colors duration-200"
                      />
                    </div>
                  </div>

                  {/* Qualification */}
                  <div>
                    <label className="block text-xs font-bold text-[#1A1A1A]/70 uppercase tracking-wide mb-1.5">
                      Highest Qualification <span className="text-[#8C1B2E]">*</span>
                    </label>
                    <div className="relative">
                      <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1A1A1A]/40 pointer-events-none" />
                      <select
                        name="qualification"
                        required
                        value={formData.qualification}
                        onChange={handleChange}
                        className="w-full pl-10 pr-10 py-3 rounded-xl border-2 border-[#C0C5CE]/70 focus:border-[#8C1B2E] focus:outline-none text-sm text-[#1A1A1A] appearance-none transition-colors duration-200 bg-white"
                      >
                        <option value="" disabled>Select your qualification</option>
                        <option value="High School">High School</option>
                        <option value="Intermediate / A-Level">Intermediate / A-Level</option>
                        <option value="Bachelor's Degree">Bachelor's Degree</option>
                        <option value="Master's Degree">Master's Degree</option>
                        <option value="PhD">PhD</option>
                        <option value="Other">Other</option>
                      </select>
                      <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1A1A1A]/40 pointer-events-none" />
                    </div>
                  </div>

                  {/* Experience */}
                  <div>
                    <label className="block text-xs font-bold text-[#1A1A1A]/70 uppercase tracking-wide mb-1.5">
                      Relevant Experience
                    </label>
                    <div className="relative">
                      <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1A1A1A]/40 pointer-events-none" />
                      <select
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border-2 border-[#C0C5CE]/70 focus:border-[#8C1B2E] focus:outline-none text-sm text-[#1A1A1A] appearance-none transition-colors duration-200 bg-white"
                      >
                        <option value="">Select experience level</option>
                        <option value="No Experience (Beginner)">No Experience (Beginner)</option>
                        <option value="Less than 1 year">Less than 1 year</option>
                        <option value="1–2 years">1–2 years</option>
                        <option value="3–5 years">3–5 years</option>
                        <option value="5+ years">5+ years</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-bold text-[#1A1A1A]/70 uppercase tracking-wide mb-1.5">
                      Why do you want to join this course?
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us briefly about your goals..."
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#C0C5CE]/70 focus:border-[#8C1B2E] focus:outline-none text-sm text-[#1A1A1A] placeholder:text-[#1A1A1A]/35 transition-colors duration-200 resize-none"
                    />
                  </div>

                  {/* Error */}
                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700"
                    >
                      <X className="w-4 h-4 shrink-0" />
                      {errorMsg || 'Something went wrong. Please try again.'}
                    </motion.div>
                  )}

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={status === 'submitting'}
                    whileHover={status !== 'submitting' ? { scale: 1.03 } : {}}
                    whileTap={status !== 'submitting' ? { scale: 0.97 } : {}}
                    className="w-full bg-gradient-to-r from-[#8C1B2E] to-[#B43A4E] text-white py-3.5 rounded-xl font-bold text-sm hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Submit Enrollment
                      </>
                    )}
                  </motion.button>

                  <p className="text-xs text-center text-[#1A1A1A]/40 pb-1">
                    By submitting, you agree to be contacted by our team regarding your enrollment.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════════════
   RESEARCH ORDER MODAL  (new — mirrors EnrollmentModal exactly)
═══════════════════════════════════════════════════════════════ */

interface ResearchOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string;
}

function ResearchOrderModal({ isOpen, onClose, serviceName }: ResearchOrderModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subjectTopic: '',
    deadline: '',
    requirements: '',
  });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    try {
      const response = await fetch("http://localhost:5000/api/research-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
  full_name: formData.fullName,
  email: formData.email,
  phone: formData.phone,
  service: serviceName,
  subject: formData.subjectTopic,
  deadline: formData.deadline,
  requirements: formData.requirements,
}),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");

        setFormData({
          fullName: "",
          email: "",
          phone: "",
          subjectTopic: "",
          deadline: "",
          requirements: "",
        });
      } else {
        throw new Error(data.message || "Submission failed");
      }
    } catch (err: unknown) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  const handleClose = () => {
    if (status === 'submitting') return;
    setStatus('idle');
    setErrorMsg('');
    setFormData({ fullName: '', email: '', phone: '', subjectTopic: '', deadline: '', requirements: '' });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="research-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1000]"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            key="research-modal"
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed inset-0 z-[1001] flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              {/* Top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-[#8C1B2E] to-[#B43A4E] rounded-t-2xl" />

              {/* Header */}
              <div className="flex items-start justify-between p-6 pb-4 pt-7">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.18em] uppercase text-[#8C1B2E] mb-1">
                    <span className="block w-4 h-[2px] rounded-full bg-[#8C1B2E]" />
                    Research Order
                  </div>
                  <h3 className="text-xl font-extrabold text-[#1A1A1A]">Book Order: {serviceName}</h3>
                  <p className="text-sm text-[#1A1A1A]/60 mt-1">Fill in your details and we'll get back to you shortly.</p>
                </div>
                <button
                  onClick={handleClose}
                  disabled={status === 'submitting'}
                  className="ml-4 mt-1 w-8 h-8 rounded-full bg-[#F5F7FA] hover:bg-[#8C1B2E]/10 flex items-center justify-center transition-colors duration-200 shrink-0"
                >
                  <X className="w-4 h-4 text-[#1A1A1A]/60" />
                </button>
              </div>

              {/* Success State */}
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="px-6 pb-8 flex flex-col items-center text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.1 }}
                    className="w-20 h-20 bg-gradient-to-br from-[#8C1B2E] to-[#B43A4E] rounded-full flex items-center justify-center mb-5 shadow-lg"
                  >
                    <CheckCircle className="w-10 h-10 text-white" />
                  </motion.div>
                  <h4 className="text-xl font-extrabold text-[#1A1A1A] mb-2">Order Submitted!</h4>
                  <p className="text-[#1A1A1A]/65 text-sm leading-relaxed mb-6">
                    Thank you for booking <span className="font-bold text-[#8C1B2E]">{serviceName}</span>. Our team will review your request and contact you within 24 hours.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleClose}
                    className="bg-gradient-to-r from-[#8C1B2E] to-[#B43A4E] text-white px-8 py-3 rounded-xl font-bold text-sm hover:shadow-lg transition-all"
                  >
                    Close
                  </motion.button>
                </motion.div>
              ) : (
                /* Form */
                <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-[#1A1A1A]/70 uppercase tracking-wide mb-1.5">
                      Full Name <span className="text-[#8C1B2E]">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1A1A1A]/40" />
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-[#C0C5CE]/70 focus:border-[#8C1B2E] focus:outline-none text-sm text-[#1A1A1A] placeholder:text-[#1A1A1A]/35 transition-colors duration-200"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-[#1A1A1A]/70 uppercase tracking-wide mb-1.5">
                      Email Address <span className="text-[#8C1B2E]">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1A1A1A]/40" />
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-[#C0C5CE]/70 focus:border-[#8C1B2E] focus:outline-none text-sm text-[#1A1A1A] placeholder:text-[#1A1A1A]/35 transition-colors duration-200"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold text-[#1A1A1A]/70 uppercase tracking-wide mb-1.5">
                      Phone Number <span className="text-[#8C1B2E]">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1A1A1A]/40" />
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-[#C0C5CE]/70 focus:border-[#8C1B2E] focus:outline-none text-sm text-[#1A1A1A] placeholder:text-[#1A1A1A]/35 transition-colors duration-200"
                      />
                    </div>
                  </div>

                  {/* Selected Research Service (auto-filled, read-only) */}
                  <div>
                    <label className="block text-xs font-bold text-[#1A1A1A]/70 uppercase tracking-wide mb-1.5">
                      Selected Research Service
                    </label>
                    <div className="relative">
                      <FileText className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1A1A1A]/40" />
                      <input
                        type="text"
                        value={serviceName}
                        readOnly
                        className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-[#C0C5CE]/70 bg-[#F5F7FA] text-sm text-[#1A1A1A]/70 cursor-not-allowed"
                      />
                    </div>
                  </div>

                  {/* Subject / Topic */}
                  <div>
                    <label className="block text-xs font-bold text-[#1A1A1A]/70 uppercase tracking-wide mb-1.5">
                      Subject / Topic <span className="text-[#8C1B2E]">*</span>
                    </label>
                    <input
                      type="text"
                      name="subjectTopic"
                      required
                      value={formData.subjectTopic}
                      onChange={handleChange}
                      placeholder="e.g. Effect of nanoparticles on..."
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#C0C5CE]/70 focus:border-[#8C1B2E] focus:outline-none text-sm text-[#1A1A1A] placeholder:text-[#1A1A1A]/35 transition-colors duration-200"
                    />
                  </div>

                  {/* Deadline */}
                  <div>
                    <label className="block text-xs font-bold text-[#1A1A1A]/70 uppercase tracking-wide mb-1.5">
                      Deadline <span className="text-[#8C1B2E]">*</span>
                    </label>
                    <div className="relative">
                      <CalendarDays className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1A1A1A]/40 pointer-events-none" />
                      <input
                        type="date"
                        name="deadline"
                        required
                        value={formData.deadline}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-[#C0C5CE]/70 focus:border-[#8C1B2E] focus:outline-none text-sm text-[#1A1A1A] transition-colors duration-200 bg-white"
                      />
                    </div>
                  </div>

                  {/* Additional Requirements */}
                  <div>
                    <label className="block text-xs font-bold text-[#1A1A1A]/70 uppercase tracking-wide mb-1.5">
                      Additional Requirements
                    </label>
                    <textarea
                      name="requirements"
                      rows={3}
                      value={formData.requirements}
                      onChange={handleChange}
                      placeholder="Any specific instructions, formatting, or references..."
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#C0C5CE]/70 focus:border-[#8C1B2E] focus:outline-none text-sm text-[#1A1A1A] placeholder:text-[#1A1A1A]/35 transition-colors duration-200 resize-none"
                    />
                  </div>

                  {/* Error */}
                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700"
                    >
                      <X className="w-4 h-4 shrink-0" />
                      {errorMsg || 'Something went wrong. Please try again.'}
                    </motion.div>
                  )}

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={status === 'submitting'}
                    whileHover={status !== 'submitting' ? { scale: 1.03 } : {}}
                    whileTap={status !== 'submitting' ? { scale: 0.97 } : {}}
                    className="w-full bg-gradient-to-r from-[#8C1B2E] to-[#B43A4E] text-white py-3.5 rounded-xl font-bold text-sm hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Submit Order
                      </>
                    )}
                  </motion.button>

                  <p className="text-xs text-center text-[#1A1A1A]/40 pb-1">
                    By submitting, you agree to be contacted by our team regarding your order.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════ */
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
  { step: '1', title: 'Consultation', description: 'Discuss your educational goals' },
  { step: '2', title: 'Assessment', description: 'Complete a placement assessment' },
  { step: '3', title: 'Free Trial', description: 'Attend a live trial lesson' },
  { step: '4', title: 'Enrollment', description: 'Select your program' },
  { step: '5', title: 'Learn', description: 'Begin your learning journey' },
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
    text: "We appreciate the quality of instruction and regular communication. Our child's grades improved significantly.",
    rating: 5,
  },
  {
    name: 'Omar Ali',
    role: 'Student, Grade 11',
    text: 'The personalized learning plans and dedicated support make all the difference.',
    rating: 5,
  },
];

const trainingPrograms = [
  { title: 'Cloud Computing', description: 'AWS, Azure & GCP expertise', image: '/training/cloud-computing.png', icon: Globe, color: 'from-blue-500 to-blue-600' },
  { title: 'AI & Machine Learning', description: 'ML Engineering & AI Research', image: '/training/ai-machine-learning.png', icon: Sparkles, color: 'from-purple-500 to-purple-600' },
  { title: 'Cybersecurity', description: 'Network & Information Security', image: '/training/cybersecurity.png', icon: Award, color: 'from-red-500 to-red-600' },
  { title: 'Graphic Design', description: 'UI/UX & Visual Design', image: '/training/graphic-design.png', icon: Sparkles, color: 'from-pink-500 to-pink-600' },
  { title: 'Full Stack Development', description: 'React, Node.js, Express & More', image: '/training/full-stack-development.png', icon: BookOpen, color: 'from-green-500 to-green-600' },
  { title: 'Data Science', description: 'Analytics & Big Data', image: '/training/data-science.png', icon: BarChart3, color: 'from-orange-500 to-orange-600' },
  { title: 'DevOps & Automation', description: 'Docker, Kubernetes & CI/CD', image: '/training/devops.png', icon: Zap, color: 'from-cyan-500 to-cyan-600' },
  { title: 'Blockchain', description: 'Cryptocurrency & Smart Contracts', image: '/training/blockchain.png', icon: Target, color: 'from-amber-500 to-amber-600' },
];

const researchServices = [
  { title: 'Research Paper Writing', description: 'Full paper writing service with expert research and analysis', image: '/services/research-paper-writing.png', icon: BookOpen, color: 'from-blue-500 to-blue-600' },
  { title: 'Literature Review', description: 'Systematic, Scoping, and Meta-analysis literature reviews', image: '/services/literature-review.png', icon: CheckCircle, color: 'from-green-500 to-green-600' },
  { title: 'Graphical Abstract', description: 'Professional BioRender and Illustrator designs', image: '/services/graphical-abstract.png', icon: Sparkles, color: 'from-purple-500 to-purple-600' },
  { title: 'Assignment & Coursework Help', description: 'STEM and Business subject expertise', image: '/services/assignment-coursework.png', icon: Target, color: 'from-orange-500 to-orange-600' },
  { title: 'Thesis & Dissertation Chapters', description: 'High-ticket service with comprehensive support', image: '/services/thesis-dissertation.png', icon: Award, color: 'from-pink-500 to-pink-600' },
  { title: 'Journal Paper Editing', description: 'Native English polishing and professional proofreading', image: '/services/journal-editing.png', icon: BarChart3, color: 'from-red-500 to-red-600' },
  { title: 'Data Analysis', description: 'SPSS, R, Python, and Origin expertise', image: '/services/data-analysis.png', icon: Zap, color: 'from-indigo-500 to-indigo-600' },
  { title: 'Graphs & Plotting', description: 'Professional visualization with Origin, Excel, MATLAB', image: '/services/graphs-plotting.png', icon: BarChart3, color: 'from-cyan-500 to-cyan-600' },
  { title: 'Characterization Graphs', description: 'XRD, SEM, UV, FTIR, TEM, BET, TGA, NMR, XPS, and more', image: '/services/characterization-graphs.png', icon: Sparkles, color: 'from-violet-500 to-violet-600' },
  { title: 'Research Proposal', description: 'CSC, HEC, PhD, and MS proposals', image: '/services/research-proposal.png', icon: Target, color: 'from-amber-500 to-amber-600' },
  { title: 'PPT Presentation', description: 'Defense, Viva, and Conference presentations', image: '/services/ppt-presentation.png', icon: Play, color: 'from-lime-500 to-lime-600' },
  { title: 'Plagiarism Removal', description: 'Professional paraphrasing with Turnitin <5%', image: '/services/plagiarism-removal.png', icon: CheckCircle, color: 'from-teal-500 to-teal-600' },
];

/* ═══════════════════════════════════════════════════════════════
   SUB-COMPONENTS
═══════════════════════════════════════════════════════════════ */

function ProgramCard({ program, index }: { program: typeof programs[0]; index: number }) {
  const Icon = program.icon;
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -10, boxShadow: '0 24px 48px rgba(140,27,46,0.13)' }}
      transition={{ duration: 0.28 }}
      className="group relative bg-white rounded-2xl border-2 border-[#C0C5CE]/70 hover:border-[#8C1B2E]/40 transition-colors duration-300 overflow-hidden flex flex-col"
    >
      <motion.div
        className="absolute top-0 left-0 right-0 h-[3px] bg-[#8C1B2E] origin-left"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }}
      />
      <div className={`bg-gradient-to-br ${program.color} p-6 text-white`}>
        <motion.div
          animate={hovered ? { rotate: 10, scale: 1.1 } : { rotate: 0, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Icon className="w-7 h-7 mb-3" />
        </motion.div>
        <h3 className="text-lg font-bold">{program.title}</h3>
        <p className="text-xs text-white/85 mt-1">{program.grades}</p>
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <div className="space-y-2 mb-5 flex-1">
          {program.features.slice(0, 4).map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4 text-[#8C1B2E] flex-shrink-0" />
              <span className="text-sm text-[#1A1A1A]/80">{feature}</span>
            </motion.div>
          ))}
        </div>
        <Link href="/contact" className="block w-full">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="w-full bg-gradient-to-r from-[#8C1B2E] to-[#B43A4E] text-white py-2.5 rounded-xl font-bold hover:shadow-lg transition-all text-sm"
          >
            Learn More
          </motion.button>
        </Link>
      </div>
      <motion.div
        className="absolute bottom-0 right-0 w-20 h-20 bg-[#8C1B2E]/5 rounded-tl-full pointer-events-none"
        initial={{ scale: 0, opacity: 0 }}
        animate={hovered ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.35 }}
      />
    </motion.div>
  );
}

function WhyCard({ reason, index }: { reason: typeof whyChoose[0]; index: number }) {
  const Icon = reason.icon;
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -10, boxShadow: '0 24px 48px rgba(140,27,46,0.13)' }}
      transition={{ duration: 0.28 }}
      className="group relative bg-white rounded-2xl border-2 border-[#C0C5CE]/70 hover:border-[#8C1B2E]/40 transition-colors duration-300 overflow-hidden p-8"
    >
      <motion.div
        className="absolute top-0 left-0 right-0 h-[3px] bg-[#8C1B2E] origin-left"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }}
      />
      <motion.div
        animate={hovered ? { rotate: 10, scale: 1.15 } : { rotate: 0, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-12 h-12 bg-gradient-to-br from-[#8C1B2E] to-[#B43A4E] rounded-xl flex items-center justify-center mb-4 shadow-md"
      >
        <Icon className="w-6 h-6 text-white" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="inline-block px-2.5 py-1 bg-[#F5F7FA] text-[#8C1B2E] rounded-full text-xs font-bold mb-3 tracking-wide"
      >
        {reason.benefit}
      </motion.div>
      <h3 className="text-base font-bold text-[#1A1A1A] mb-2">{reason.title}</h3>
      <p className="text-[#1A1A1A]/70 text-sm leading-relaxed">{reason.description}</p>
      <motion.div
        className="absolute bottom-0 right-0 w-20 h-20 bg-[#8C1B2E]/5 rounded-tl-full pointer-events-none"
        initial={{ scale: 0, opacity: 0 }}
        animate={hovered ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.35 }}
      />
    </motion.div>
  );
}

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
      <div className="flex gap-1 mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
          >
            <Star size={18} className="fill-[#8C1B2E] text-[#8C1B2E]" />
          </motion.div>
        ))}
      </div>
      <p className="text-[#1A1A1A]/80 mb-6 leading-relaxed italic flex-1">
        &ldquo;{testimonial.text}&rdquo;
      </p>
      <div className="border-t border-[#C0C5CE] pt-5 flex items-center gap-4">
        <motion.div
          animate={hovered ? { rotate: 8, scale: 1.1 } : { rotate: 0, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="shrink-0 w-11 h-11 rounded-full bg-gradient-to-br from-[#8C1B2E] to-[#B43A4E] flex items-center justify-center shadow-md"
        >
          <span className="text-white font-bold text-sm">{testimonial.name.charAt(0)}</span>
        </motion.div>
        <div>
          <p className="font-bold text-[#8C1B2E] text-sm">{testimonial.name}</p>
          <p className="text-xs text-[#1A1A1A]/60">{testimonial.role}</p>
        </div>
      </div>
      <motion.div
        className="absolute bottom-0 right-0 w-24 h-24 bg-[#8C1B2E]/5 rounded-tl-full pointer-events-none"
        initial={{ scale: 0, opacity: 0 }}
        animate={hovered ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.35 }}
      />
    </motion.div>
  );
}

/* ── TrainingCard now accepts onEnroll callback ── */
function TrainingCard({
  program,
  index,
  onEnroll,
}: {
  program: typeof trainingPrograms[0];
  index: number;
  onEnroll: (title: string) => void;
}) {
  const Icon = program.icon;
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(140,27,46,0.13)' }}
      transition={{ duration: 0.28 }}
      className="group relative bg-white rounded-2xl border-2 border-[#C0C5CE]/70 hover:border-[#8C1B2E]/40 transition-colors duration-300 overflow-hidden flex flex-col"
    >
      <motion.div
        className="absolute top-0 left-0 right-0 h-[3px] bg-[#8C1B2E] origin-left"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.06, ease: EASE }}
      />
      <div className="overflow-hidden">
        <motion.img
          src={program.image}
          alt={program.title}
          className="w-full h-32 object-cover"
          animate={hovered ? { scale: 1.06 } : { scale: 1 }}
          transition={{ duration: 0.4 }}
        />
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <motion.div
          className={`w-10 h-10 bg-gradient-to-br ${program.color} rounded-xl flex items-center justify-center mb-3 shadow-md`}
          animate={hovered ? { rotate: 10, scale: 1.1 } : { rotate: 0, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Icon className="w-5 h-5 text-white" />
        </motion.div>
        <h3 className="text-base font-bold text-[#1A1A1A] mb-1">{program.title}</h3>
        <p className="text-xs text-[#1A1A1A]/70 leading-relaxed flex-1">{program.description}</p>
        <motion.button
          onClick={() => onEnroll(program.title)}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="mt-4 w-full bg-gradient-to-r from-[#8C1B2E] to-[#B43A4E] text-white py-2 rounded-xl font-bold text-xs hover:shadow-lg transition-all"
        >
          Enroll Now
        </motion.button>
      </div>
      <motion.div
        className="absolute bottom-0 right-0 w-16 h-16 bg-[#8C1B2E]/5 rounded-tl-full pointer-events-none"
        initial={{ scale: 0, opacity: 0 }}
        animate={hovered ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.35 }}
      />
    </motion.div>
  );
}

/* ── ResearchCard now accepts onBookOrder callback ── */
function ResearchCard({
  service,
  index,
  onBookOrder,
}: {
  service: typeof researchServices[0];
  index: number;
  onBookOrder: (title: string) => void;
}) {
  const Icon = service.icon;
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(140,27,46,0.13)' }}
      transition={{ duration: 0.28 }}
      className="group relative bg-white rounded-2xl border-2 border-[#C0C5CE]/70 hover:border-[#8C1B2E]/40 transition-colors duration-300 overflow-hidden flex flex-col"
    >
      <motion.div
        className="absolute top-0 left-0 right-0 h-[3px] bg-[#8C1B2E] origin-left"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.05, ease: EASE }}
      />
      <div className="overflow-hidden">
        <motion.img
          src={service.image}
          alt={service.title}
          className="w-full h-48 object-cover"
          animate={hovered ? { scale: 1.06 } : { scale: 1 }}
          transition={{ duration: 0.4 }}
        />
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <motion.div
          className={`w-12 h-12 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-3 shadow-md`}
          animate={hovered ? { rotate: 10, scale: 1.1 } : { rotate: 0, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Icon className="w-6 h-6 text-white" />
        </motion.div>
        <h3 className="text-base font-bold text-[#1A1A1A] mb-2">{service.title}</h3>
        <p className="text-sm text-[#1A1A1A]/70 leading-relaxed flex-1 mb-4">{service.description}</p>
        <motion.button
          onClick={() => onBookOrder(service.title)}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="w-full bg-gradient-to-r from-[#8C1B2E] to-[#B43A4E] text-white py-2.5 rounded-xl font-bold text-xs hover:shadow-lg transition-all"
        >
          Book Order
        </motion.button>
      </div>
      <motion.div
        className="absolute bottom-0 right-0 w-20 h-20 bg-[#8C1B2E]/5 rounded-tl-full pointer-events-none"
        initial={{ scale: 0, opacity: 0 }}
        animate={hovered ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.35 }}
      />
    </motion.div>
  );
}

function ProcessStep({ item, index }: { item: typeof processSteps[0]; index: number }) {
  return (
    <motion.div
      variants={scaleIn}
      custom={index}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="relative bg-white rounded-2xl border-2 border-[#C0C5CE]/70 hover:border-[#8C1B2E]/40 transition-colors duration-300 px-5 py-8 text-center overflow-hidden"
    >
      <motion.div
        className="absolute top-0 left-0 right-0 h-[3px] bg-[#8C1B2E] origin-left"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.1, ease: EASE }}
      />
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, type: 'spring', stiffness: 200, damping: 14 }}
        className="w-11 h-11 bg-gradient-to-br from-[#8C1B2E] to-[#B43A4E] text-white rounded-full flex items-center justify-center font-extrabold mx-auto mb-4 shadow-md"
      >
        {item.step}
      </motion.div>
      <h3 className="text-base font-bold text-[#1A1A1A] mb-1">{item.title}</h3>
      <p className="text-xs text-[#1A1A1A]/65">{item.description}</p>
      {index < processSteps.length - 1 && (
        <motion.div
          className="hidden md:block absolute top-1/2 -right-[13px] w-3 h-3 bg-[#8C1B2E] rounded-full transform -translate-y-1/2 z-10"
          animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════ */
export default function Page() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(heroProgress, [0, 1], ['0%', '22%']);
  const heroOpacity = useTransform(heroProgress, [0, 0.75], [1, 0]);
  const heroScale = useTransform(heroProgress, [0, 1], [1, 1.04]);

  /* Enrollment modal state */
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');

  const handleEnroll = useCallback((courseTitle: string) => {
    setSelectedCourse(courseTitle);
    setEnrollModalOpen(true);
  }, []);

  /* Research order modal state */
  const [researchModalOpen, setResearchModalOpen] = useState(false);
  const [selectedResearchService, setSelectedResearchService] = useState('');

  const handleBookOrder = useCallback((serviceTitle: string) => {
    setSelectedResearchService(serviceTitle);
    setResearchModalOpen(true);
  }, []);

  return (
    <>
      <ScrollProgress />

      {/* Global Enrollment Modal */}
      <EnrollmentModal
        isOpen={enrollModalOpen}
        onClose={() => setEnrollModalOpen(false)}
        courseName={selectedCourse}
      />

      {/* Global Research Order Modal */}
      <ResearchOrderModal
        isOpen={researchModalOpen}
        onClose={() => setResearchModalOpen(false)}
        serviceName={selectedResearchService}
      />

      <main className="min-h-screen bg-white">
        <Navbar />

        {/* ╔══════════════════════════════════════════════════╗
            ║  HERO                                           ║
            ╚══════════════════════════════════════════════════╝ */}
        <motion.section
          ref={heroRef}
          className="relative overflow-hidden bg-gradient-to-r from-[#8C1B2E] to-[#B43A4E] text-white"
          style={{ minHeight: '620px' }}
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
            className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center text-center py-28"
          >
            {/* Badge */}
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
              Join Thousands of Successful Students
            </motion.div>

            {/* Main Heading */}
            <div className="perspective-[800px] mb-6">
              <AnimatedTitle
                text="Transforming Education Through Virtual Learning"
                className="text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight block"
              />
            </div>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
              className="text-xl md:text-2xl text-white/80 font-light mb-4"
            >
              Learn Without Limits. Study From Anywhere.
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65, ease: EASE }}
              className="text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed text-white/70"
            >
              High-quality online schooling and personalized tutoring services for students worldwide. World-class education accessible, engaging, and affordable.
            </motion.p>

            {/* Key Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.75, ease: EASE }}
              className="grid grid-cols-2 gap-3 max-w-lg mx-auto mb-12 text-left"
            >
              {['Live Interactive Classes', 'Qualified Teachers', 'Small Class Sizes', 'Flexible Schedules'].map((f, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-white/70 flex-shrink-0" />
                  <span className="text-sm text-white/85">{f}</span>
                </div>
              ))}
            </motion.div>

            {/* Decorative dots */}
            <motion.div className="flex items-center gap-3 mb-14">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="block h-[3px] rounded-full bg-white/50"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: i === 1 ? 36 : 14, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.9 + i * 0.1, ease: EASE }}
                />
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.0, ease: EASE }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/programs">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  className="group inline-flex items-center gap-2 bg-white text-[#8C1B2E] px-8 py-4 rounded-full font-bold text-base shadow-2xl"
                >
                  <Play className="w-4 h-4" />
                  Start Learning
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center gap-2 border-2 border-white/60 text-white px-8 py-4 rounded-full font-bold text-base hover:bg-white/10 transition-all backdrop-blur-sm"
                >
                  Free Trial Class
                </motion.button>
              </Link>
            </motion.div>

            {/* Scroll indicator */}
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
            ║  ABOUT US                                       ║
            ╚══════════════════════════════════════════════════╝ */}
        <section className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <SectionHeading
              label="Quality Online Education"
              title="About Us"
            />
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {[
                { icon: Target, title: 'Our Mission', text: 'Provide accessible, affordable, high-quality education that empowers students to achieve their full potential.' },
                { icon: Globe, title: 'Our Vision', text: 'A globally trusted online learning institution that prepares students for success in education and life.' },
                { icon: Award, title: 'Core Values', text: 'Excellence, Integrity, Student-Centered Learning, Innovation, Inclusivity.' },
              ].map((item, index) => {
                const Icon = item.icon;
                const [hovered, setHovered] = useState(false);
                return (
                  <motion.div
                    key={index}
                    variants={fadeUp}
                    custom={index}
                    onHoverStart={() => setHovered(true)}
                    onHoverEnd={() => setHovered(false)}
                    whileHover={{ y: -10, boxShadow: '0 24px 48px rgba(140,27,46,0.13)' }}
                    transition={{ duration: 0.28 }}
                    className="group relative bg-white rounded-2xl border-2 border-[#C0C5CE]/70 hover:border-[#8C1B2E]/40 transition-colors duration-300 overflow-hidden p-8"
                  >
                    <motion.div
                      className="absolute top-0 left-0 right-0 h-[3px] bg-[#8C1B2E] origin-left"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1, ease: EASE }}
                    />
                    <motion.div
                      animate={hovered ? { rotate: 10, scale: 1.1 } : { rotate: 0, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="w-12 h-12 bg-gradient-to-br from-[#8C1B2E] to-[#B43A4E] rounded-xl flex items-center justify-center mb-4 shadow-md"
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <h3 className="text-lg font-bold text-[#8C1B2E] mb-3">{item.title}</h3>
                    <p className="text-[#1A1A1A]/75 text-sm leading-relaxed">{item.text}</p>
                    <motion.div
                      className="absolute bottom-0 right-0 w-20 h-20 bg-[#8C1B2E]/5 rounded-tl-full pointer-events-none"
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
            ║  PROGRAMS                                       ║
            ╚══════════════════════════════════════════════════╝ */}
        <section
          id="programs"
          className="py-24 bg-[#F5F7FA]"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <SectionHeading
              label="What We Offer"
              title="Our Programs"
              subtitle="Comprehensive education for every stage of learning"
            />
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {programs.map((program, index) => (
                <ProgramCard key={index} program={program} index={index} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* ╔══════════════════════════════════════════════════╗
            ║  SOFT SKILLS / TRAINING                         ║
            ╚══════════════════════════════════════════════════╝ */}
        <section
          id="research-services"
          className="py-24 bg-white"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <SectionHeading
              label="Professional Training"
              title="Soft Skills Solutions"
              subtitle="Build Your Digital Future With Professional Training"
            />
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12"
            >
              {trainingPrograms.map((program, index) => (
                <TrainingCard key={index} program={program} index={index} onEnroll={handleEnroll} />
              ))}
            </motion.div>

            {/* Pricing & Zoom */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* Pricing */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(140,27,46,0.13)' }}
                transition={{ duration: 0.28 }}
                className="relative bg-white rounded-2xl border-2 border-[#8C1B2E]/40 p-8 overflow-hidden"
              >
                <motion.div
                  className="absolute top-0 left-0 right-0 h-[3px] bg-[#8C1B2E]"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: EASE }}
                />
                <h3 className="text-2xl font-extrabold text-[#1A1A1A] mb-6">Flexible Pricing</h3>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center pb-4 border-b border-[#C0C5CE]/70">
                    <span className="text-[#1A1A1A] font-semibold">Enrollment Fee</span>
                    <span className="text-2xl font-extrabold text-[#8C1B2E]">Rs. 1,000</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-[#C0C5CE]/70">
                    <span className="text-[#1A1A1A] font-semibold">Per Course Fee</span>
                    <span className="text-2xl font-extrabold text-[#8C1B2E]">Rs. 14,000</span>
                  </div>
                </div>
                <p className="text-sm text-[#1A1A1A]/70 leading-relaxed mb-6">Learn, build skills, and shine in the global market with our comprehensive training programs designed for professionals.</p>
                <MotionLink
                  href="/programs"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="block w-full bg-gradient-to-r from-[#8C1B2E] to-[#B43A4E] text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all text-center"
                >
                  Get Started Today
                </MotionLink>
              </motion.div>

              {/* Zoom Consultation */}
              <motion.div
                variants={fadeUp}
                custom={1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative bg-gradient-to-br from-[#8C1B2E] to-[#B43A4E] rounded-2xl p-8 text-white overflow-hidden"
              >
                <motion.div
                  aria-hidden
                  className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full"
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 8, repeat: Infinity }}
                />
                <motion.div
                  className="absolute top-0 left-0 right-0 h-[3px] bg-white/30"
                />
                <h3 className="text-2xl font-extrabold mb-6 relative z-10">Live Zoom Consultations</h3>
                <div className="space-y-4 mb-6 relative z-10">
                  {[
                    { title: 'Expert Guidance', desc: 'Get personalized course recommendations' },
                    { title: 'Career Planning', desc: 'Build your professional roadmap' },
                    { title: 'Direct Access', desc: 'Connect with our training experts' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-white/80 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-sm">{item.title}</p>
                        <p className="text-xs text-white/70">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="w-full bg-white text-[#8C1B2E] py-3 rounded-xl font-bold hover:bg-gray-100 transition-all relative z-10"
                  >
                    Schedule a Zoom Session
                  </motion.button>
                </Link>              </motion.div>
            </div>

            {/* Video */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ boxShadow: '0 20px 40px rgba(140,27,46,0.13)' }}
              className="relative bg-white rounded-2xl border-2 border-[#C0C5CE]/70 overflow-hidden"
            >
              <motion.div
                className="absolute top-0 left-0 right-0 h-[3px] bg-[#8C1B2E]"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: EASE }}
              />
              <div className="relative bg-black/90 aspect-video flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute z-10 pointer-events-none"
                >
                  <Play className="w-16 h-16 text-white drop-shadow-lg" />
                </motion.div>
                <video
                  className="w-full h-full object-cover" controls
                  poster="/images/thumbnail.jpg"
                >
                  <source src="/videos/Video.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">Watch Our Training Overview</h3>
                <p className="text-sm text-[#1A1A1A]/70">Discover how our comprehensive training programs can transform your career and help you excel in the competitive global market.</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ╔══════════════════════════════════════════════════╗
            ║  WHY CHOOSE US                                  ║
            ╚══════════════════════════════════════════════════╝ */}
        <section className="py-24 bg-[#F5F7FA]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <SectionHeading
              label="Our Advantage"
              title="Why Choose Us?"
              subtitle="A Better Way to Learn"
            />
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {whyChoose.map((reason, index) => (
                <WhyCard key={index} reason={reason} index={index} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* ╔══════════════════════════════════════════════════╗
            ║  RESEARCH SERVICES                              ║
            ╚══════════════════════════════════════════════════╝ */}
        <section className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <SectionHeading
              label="Academic Support"
              title="Research & Academic Support Services"
              subtitle="Professional Research Assistance"
            />
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
            >
              {researchServices.map((service, index) => (
                <ResearchCard key={index} service={service} index={index} onBookOrder={handleBookOrder} />
              ))}
            </motion.div>

            {/* Bundle */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(140,27,46,0.10)' }}
              className="relative bg-[#F5F7FA] rounded-2xl border-2 border-[#C0C5CE]/70 hover:border-[#8C1B2E]/40 transition-colors duration-300 overflow-hidden p-8 mb-10"
            >
              <motion.div
                className="absolute top-0 left-0 right-0 h-[3px] bg-[#8C1B2E] origin-left"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: EASE }}
              />
              <h3 className="text-xl md:text-2xl font-extrabold text-[#1A1A1A] mb-6">Premium Services Bundle</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
                {[
                  { title: 'Characterization Graphs', desc: 'Advanced visualization expertise' },
                  { title: 'Graphic Abstract', desc: 'Professional visual design' },
                  { title: 'Paper Writing', desc: 'Complete research support' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#8C1B2E] flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-bold text-[#1A1A1A] text-sm">{item.title}</p>
                      <p className="text-xs text-[#1A1A1A]/65">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <motion.div
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#8C1B2E] to-[#B43A4E] text-white px-5 py-2.5 rounded-xl font-bold text-sm"
                whileHover={{ scale: 1.04 }}
              >
                <Star className="w-4 h-4" />
                <span>Bundle Price: $200+ per client</span>
              </motion.div>
            </motion.div>

            {/* Zoom / Research CTA */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative bg-gradient-to-br from-[#8C1B2E] to-[#B43A4E] rounded-2xl p-8 md:p-12 text-white overflow-hidden"
            >
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(255,255,255,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.05) 1px,transparent 1px)',
                  backgroundSize: '56px 56px',
                }}
                animate={{ backgroundPosition: ['0px 0px', '56px 56px'] }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              />
              <Particles />
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <SectionLabel light>Expert Consultations</SectionLabel>
                  <h3 className="text-3xl md:text-4xl font-extrabold mb-4">Live Zoom Consultations</h3>
                  <p className="text-white/80 mb-6 leading-relaxed">
                    Get personalized guidance through our live Zoom meetings. Our expert researchers will discuss your project, address concerns, and provide detailed guidance tailored to your needs.
                  </p>
                  <div className="space-y-3 mb-6">
                    {[
                      { title: 'One-on-One Sessions', desc: 'Personalized consultations for your specific requirements' },
                      { title: 'Screen Share & Demo', desc: 'Visual walkthroughs of your work and improvements' },
                      { title: 'Flexible Scheduling', desc: 'Available across different time zones' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-white/80 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-sm">{item.title}</p>
                          <p className="text-xs text-white/65">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <MotionLink
                    href="/contact"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.96 }}
                    className="inline-block bg-white text-[#8C1B2E] px-7 py-3 rounded-full font-bold hover:bg-gray-100 transition-all shadow-xl text-center"
                  >
                    Book a Zoom Session
                  </MotionLink>
                </div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative bg-black/20 rounded-2xl overflow-hidden border-2 border-white/20"
                >
                  <div className="aspect-video bg-black/50 flex items-center justify-center relative">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute z-10 pointer-events-none"
                    >
                      <Play className="w-14 h-14 text-white drop-shadow-lg" />
                    </motion.div>
                    <video
                      className="w-full h-full object-cover"
                      controls
                      preload="metadata"
                      poster="/images/thumbnail.jpg"
                    >
                      <source src="/videos/Video.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <div className="p-4 bg-white/10 backdrop-blur">
                    <p className="text-sm font-bold">Watch our consultation overview</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ╔══════════════════════════════════════════════════╗
            ║  HOW IT WORKS                                   ║
            ╚══════════════════════════════════════════════════╝ */}
        <section className="py-24 bg-[#F5F7FA]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <SectionHeading
              label="Getting Started"
              title="How It Works"
              subtitle="Five simple steps to start your journey"
            />
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4"
            >
              {processSteps.map((item, index) => (
                <ProcessStep key={index} item={item} index={index} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* ╔══════════════════════════════════════════════════╗
            ║  TESTIMONIALS                                   ║
            ╚══════════════════════════════════════════════════╝ */}
        <section className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <SectionHeading
              label="Voices Of Our Community"
              title="What Families Say"
              subtitle="Hear from our happy students and parents"
            />
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={index} testimonial={testimonial} index={index} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* ╔══════════════════════════════════════════════════╗
            ║  CTA                                            ║
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

          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <SectionLabel light>Start Your Journey</SectionLabel>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight"
            >
              Book Your Free Trial Class
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-white/70 text-lg mb-12 max-w-md mx-auto"
            >
              Experience quality education. Just provide your child's name and grade for instant access.
            </motion.p>
            <motion.div
              variants={fadeUp}
              custom={2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <MagneticButton href="/contact">Start Your Free Trial</MagneticButton>
            </motion.div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}