'use client';

import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ShieldCheck,
  Loader2,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';

/* ═══════════════════════════════════════════════════════════════
   ANIMATION CONSTANTS (identical to Programs / Admin Dashboard)
═══════════════════════════════════════════════════════════════ */
const EASE = [0.22, 1, 0.36, 1] as const;

/** Rising particles */
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

const API_BASE = 'http://localhost:5000/api';
type LoginStatus = 'idle' | 'submitting' | 'error';

export default function StudentLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<LoginStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setStatus('submitting');
      setErrorMsg('');

      try {
        const res = await fetch(`${API_BASE}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
          throw new Error(data?.message || 'Invalid email or password.');
        }

        // Store token if the API returns one (adjust key name to match your backend)
        if (data.success) {

    localStorage.setItem("token", data.token);

    localStorage.setItem(
        "user",
        JSON.stringify(data.user)
    );

    if (data.user.role === "admin") {
        router.push("/admin/dashboard");
    } else {
        router.push("/dashboard");
    }
}
      } catch (err: unknown) {
        setStatus('error');
        setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      }
    },
    [email, password, router]
  );

  return (
    <>
        <Navbar />

    <div className="min-h-screen relative overflow-hidden gradient-hero text-white flex items-center justify-center">
      <ScrollProgress />
      

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

      <div className="relative z-10 w-full max-w-md px-4 py-16">
        {/* Brand mark + animated title */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          className="flex flex-col items-center text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.15 }}
            className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg mb-6"
          >
            <ShieldCheck className="w-8 h-8 text-white" />
          </motion.div>

          <div className="perspective-[800px] mb-3">
            <AnimatedTitle
              text="Student Login"
              className="text-4xl md:text-5xl font-extrabold leading-[1.02] tracking-tight block"
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
            className="text-white/70 text-base font-light"
          >
Sign in to access your dashboard
          </motion.p>

          {/* Divider dots */}
          <motion.div className="flex items-center gap-3 mt-6">
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
        </motion.div>

        {/* Login card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
          className="relative bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Top accent bar */}
          <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-[#8C1B2E] to-[#B43A4E]" />

          <form onSubmit={handleSubmit} className="p-8 pt-9 space-y-5">
            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-[#1A1A1A]/70 uppercase tracking-wide mb-1.5">
                Email Address <span className="text-[#8C1B2E]">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1A1A1A]/40" />
                <input
                  type="email"
                  required
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-[#C0C5CE]/70 focus:border-[#8C1B2E] focus:outline-none text-sm text-[#1A1A1A] placeholder:text-[#1A1A1A]/35 transition-colors duration-200"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-[#1A1A1A]/70 uppercase tracking-wide mb-1.5">
                Password <span className="text-[#8C1B2E]">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1A1A1A]/40" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-11 py-3 rounded-xl border-2 border-[#C0C5CE]/70 focus:border-[#8C1B2E] focus:outline-none text-sm text-[#1A1A1A] placeholder:text-[#1A1A1A]/35 transition-colors duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#1A1A1A]/40 hover:text-[#8C1B2E] transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember + forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-[#1A1A1A]/60 cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-2 border-[#C0C5CE] text-[#8C1B2E] focus:ring-[#8C1B2E]/30"
                />
                Remember me
              </label>
              <button
                type="button"
                className="text-[#8C1B2E] font-semibold hover:underline"
              >
                Forgot password?
              </button>
            </div>

            {/* Error */}
            <AnimatePresence>
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -8, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700"
                >
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  {errorMsg || 'Invalid email or password.'}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={status === 'submitting'}
              whileHover={status !== 'submitting' ? { scale: 1.02 } : {}}
              whileTap={status !== 'submitting' ? { scale: 0.97 } : {}}
              className="w-full bg-gradient-to-r from-[#8C1B2E] to-[#B43A4E] text-white py-3.5 rounded-xl font-bold text-sm hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {status === 'submitting' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </form>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center text-white/50 text-xs mt-8"
        >
Access your enrolled courses securely.        </motion.p>
      </div>
    </div>
      <Footer/>
  </>
);
}
