'use client';

import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  Users,
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  RefreshCw,
  Mail,
  Phone,
  GraduationCap,
  BookOpen,
  MessageSquare,
  X,
  AlertTriangle,
  Inbox,
  ChevronDown,
  LogOut,
  ShieldCheck,
  Globe,
  Calendar,
  User,
  Send,
  FileText,
  ClipboardList,
  CalendarClock,
  Reply,
} from 'lucide-react';
import { useEffect, useMemo, useState, useCallback, useRef } from 'react';
import Header from "@/components/Navbar";
import Footer from "@/components/Footer";

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

/* ═══════════════════════════════════════════════════════════════
   TYPES
═══════════════════════════════════════════════════════════════ */
type EnrollmentStatus = 'pending' | 'approved' | 'rejected';

interface Enrollment {
  id: string | number;
  full_name: string;
  email: string;
  phone: string;
  country?: string;
  course: string;
  education?: string;
  message?: string;
  status: EnrollmentStatus;
  created_at?: string;
}

type FilterTab = 'all' | EnrollmentStatus;

/* New: Research Order type */
interface ResearchOrder {
  id: string | number;
  full_name: string;
  email: string;
  phone: string;
  service: string;
  subject_topic: string;
  deadline?: string;
  requirements?: string;
  created_at?: string;
  /* New: track whether admin has already responded */
  responded?: boolean;
  last_response?: string;
  responded_at?: string;
}

/* Top-level dashboard view */
type DashboardView = 'enrollments' | 'research-orders';

const API_BASE = 'http://localhost:5000/api';

/* ═══════════════════════════════════════════════════════════════
   SHARED UI BITS
═══════════════════════════════════════════════════════════════ */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.22em] uppercase mb-2 text-[#8C1B2E]">
      <span className="block w-5 h-[2px] rounded-full bg-[#8C1B2E]" />
      {children}
    </span>
  );
}

function StatusBadge({ status }: { status: EnrollmentStatus }) {
  const styles: Record<EnrollmentStatus, string> = {
    pending: 'bg-amber-50 text-amber-700 border-amber-200',
    approved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    rejected: 'bg-red-50 text-red-700 border-red-200',
  };
  const icons: Record<EnrollmentStatus, React.ReactNode> = {
    pending: <Clock className="w-3.5 h-3.5" />,
    approved: <CheckCircle2 className="w-3.5 h-3.5" />,
    rejected: <XCircle className="w-3.5 h-3.5" />,
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border capitalize ${styles[status]}`}
    >
      {icons[status]}
      {status}
    </span>
  );
}

/* New: small badge showing whether a research order has been responded to */
function ResponseBadge({ responded }: { responded?: boolean }) {
  return responded ? (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border capitalize bg-emerald-50 text-emerald-700 border-emerald-200">
      <CheckCircle2 className="w-3.5 h-3.5" />
      Responded
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border capitalize bg-amber-50 text-amber-700 border-amber-200">
      <Clock className="w-3.5 h-3.5" />
      Awaiting Reply
    </span>
  );
}

/* Animated stat card */
function StatCard({
  label,
  value,
  icon: Icon,
  index,
  active,
  onClick,
  color,
}: {
  label: string;
  value: number;
  icon: any;
  index: number;
  active: boolean;
  onClick: () => void;
  color?: string;
}) {
  return (
    <motion.button
      onClick={onClick}
      variants={fadeUp}
      custom={index}
      whileHover={{ y: -4, boxShadow: '0 16px 32px rgba(140,27,46,0.10)' }}
      whileTap={{ scale: 0.98 }}
      className={`relative text-left bg-white rounded-2xl border p-5 flex items-center gap-4 transition-colors duration-200 w-full ${active ? 'border-[#8C1B2E] ring-2 ring-[#8C1B2E]/15' : 'border-[#C0C5CE]/70'
        }`}
    >
      {active && (
        <motion.div
          layoutId="stat-glow"
          className="absolute inset-0 rounded-2xl bg-[#8C1B2E]/[0.03] pointer-events-none"
        />
      )}
      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-md shrink-0 ${color || 'bg-gradient-to-br from-[#8C1B2E] to-[#B43A4E]'
          }`}
      >
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div>
        <p className="text-2xl font-extrabold text-[#1A1A1A] leading-none">{value}</p>
        <p className="text-xs font-semibold text-[#1A1A1A]/55 uppercase tracking-wide mt-1">
          {label}
        </p>
      </div>
    </motion.button>
  );
}

/* ═══════════════════════════════════════════════════════════════
   EMAIL SENT TOAST  (generalized to support multiple messages)
═══════════════════════════════════════════════════════════════ */
function EmailToast({
  show,
  onHide,
  title = 'Approval email sent',
  subtitle = 'Student has been notified',
}: {
  show: boolean;
  onHide: () => void;
  title?: string;
  subtitle?: string;
}) {
  useEffect(() => {
    if (show) {
      const t = setTimeout(onHide, 4000);
      return () => clearTimeout(t);
    }
  }, [show, onHide]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="fixed bottom-6 right-6 z-[2000] flex items-center gap-3 bg-emerald-600 text-white px-5 py-3.5 rounded-2xl shadow-2xl"
        >
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <Send className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-sm">{title}</p>
            <p className="text-xs text-white/80">{subtitle}</p>
          </div>
          <button onClick={onHide} className="ml-2 opacity-70 hover:opacity-100 transition-opacity">
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CONFIRM ACTION MODAL
═══════════════════════════════════════════════════════════════ */
function ConfirmModal({
  open,
  action,
  name,
  onConfirm,
  onCancel,
  loading,
}: {
  open: boolean;
  action: 'approve' | 'reject' | null;
  name: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading: boolean;
}) {
  const isApprove = action === 'approve';
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1000]"
            onClick={!loading ? onCancel : undefined}
          />
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="fixed inset-0 z-[1001] flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
              <div
                className={`w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-4 ${isApprove ? 'bg-emerald-50' : 'bg-red-50'
                  }`}
              >
                {isApprove ? (
                  <CheckCircle2 className="w-7 h-7 text-emerald-600" />
                ) : (
                  <AlertTriangle className="w-7 h-7 text-red-600" />
                )}
              </div>
              <h3 className="text-lg font-extrabold text-[#1A1A1A] mb-1.5">
                {isApprove ? 'Approve Enrollment?' : 'Reject Enrollment?'}
              </h3>
              <p className="text-sm text-[#1A1A1A]/60 mb-2">
                {isApprove
                  ? `${name} will be marked as approved.`
                  : `${name} will be marked as rejected. This can be undone later.`}
              </p>
              {isApprove ? (
                <div className="flex items-center justify-center gap-2 bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2 mb-5 text-xs text-emerald-700 font-medium">
                  <Send className="w-3.5 h-3.5 shrink-0" />
                  An approval email will be sent to the student automatically.
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2 bg-red-50 border border-red-100 rounded-xl px-3 py-2 mb-5 text-xs text-red-700 font-medium">
                  <Send className="w-3.5 h-3.5 shrink-0" />
                  A rejection email will be sent to the student automatically.
                </div>
              )}
              {!isApprove && <div className="mb-5" />}
              <div className="flex gap-3">
                <button
                  onClick={onCancel}
                  disabled={loading}
                  className="flex-1 py-2.5 rounded-xl border-2 border-[#C0C5CE]/70 text-sm font-bold text-[#1A1A1A]/70 hover:bg-[#F5F7FA] transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={onConfirm}
                  disabled={loading}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-bold text-white transition-all disabled:opacity-70 flex items-center justify-center gap-2 ${isApprove
                    ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 hover:shadow-lg'
                    : 'bg-gradient-to-r from-red-600 to-red-500 hover:shadow-lg'
                    }`}
                >
                  {loading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : isApprove ? (
                    <>Approve & Notify</>
                  ) : (
                    'Reject'
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════════════
   RESPOND TO RESEARCH ORDER MODAL  (new)
═══════════════════════════════════════════════════════════════ */
function RespondModal({
  order,
  onClose,
  onSend,
  sending,
}: {
  order: ResearchOrder | null;
  onClose: () => void;
  onSend: (message: string) => void;
  sending: boolean;
}) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (order) {
      setMessage('');
    }
  }, [order]);

  return (
    <AnimatePresence>
      {order && (
        <>
          <motion.div
            key="respond-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1000]"
            onClick={!sending ? onClose : undefined}
          />
          <motion.div
            key="respond-modal"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="fixed inset-0 z-[1001] flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
              {/* Top accent bar */}
              <div className="h-[4px] bg-gradient-to-r from-[#8C1B2E] to-[#B43A4E]" />

              <div className="p-6">
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-12 h-12 rounded-full bg-[#8C1B2E]/10 flex items-center justify-center shrink-0">
                    <Reply className="w-6 h-6 text-[#8C1B2E]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-extrabold text-[#1A1A1A] leading-tight">
                      Respond to {order.full_name}
                    </h3>
                    <p className="text-sm text-[#1A1A1A]/50 mt-0.5 break-all">{order.email}</p>
                  </div>
                  <button
                    onClick={!sending ? onClose : undefined}
                    className="w-8 h-8 rounded-full bg-[#F5F7FA] hover:bg-[#8C1B2E]/10 flex items-center justify-center transition-colors shrink-0"
                  >
                    <X className="w-4 h-4 text-[#1A1A1A]/60" />
                  </button>
                </div>

                {/* Context recap */}
                <div className="bg-[#F5F7FA] rounded-2xl p-4 mb-5 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#1A1A1A]/45 uppercase tracking-wide">
                    <ClipboardList className="w-3.5 h-3.5" />
                    {order.service}
                  </div>
                  <p className="text-sm text-[#1A1A1A]/75 line-clamp-2">{order.subject_topic}</p>
                </div>

                <label className="block text-[10px] font-extrabold tracking-[0.2em] uppercase text-[#1A1A1A]/35 mb-2">
                  Your Response
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={6}
                  placeholder="Write your reply to the student... this will be emailed directly to them."
                  disabled={sending}
                  className="w-full rounded-2xl border-2 border-[#C0C5CE]/70 focus:border-[#8C1B2E] focus:outline-none p-4 text-sm text-[#1A1A1A] placeholder:text-[#1A1A1A]/35 bg-white transition-colors duration-200 resize-none disabled:opacity-60"
                />

                <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2.5 mt-4 text-xs text-emerald-700 font-medium">
                  <Send className="w-3.5 h-3.5 shrink-0" />
                  This message will be emailed directly to {order.email}.
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={onClose}
                    disabled={sending}
                    className="flex-1 py-2.5 rounded-xl border-2 border-[#C0C5CE]/70 text-sm font-bold text-[#1A1A1A]/70 hover:bg-[#F5F7FA] transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => onSend(message)}
                    disabled={sending || !message.trim()}
                    className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white transition-all disabled:opacity-50 flex items-center justify-center gap-2 bg-gradient-to-r from-[#8C1B2E] to-[#B43A4E] hover:shadow-lg"
                  >
                    {sending ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" /> Send Response
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ENROLLMENT DETAIL DRAWER — full fields
═══════════════════════════════════════════════════════════════ */
function DetailDrawer({
  enrollment,
  onClose,
  onAct,
}: {
  enrollment: Enrollment | null;
  onClose: () => void;
  onAct: (action: 'approve' | 'reject') => void;
}) {
  return (
    <AnimatePresence>
      {enrollment && (
        <>
          <motion.div
            key="drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[900]"
            onClick={onClose}
          />
          <motion.div
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: EASE }}
            className="fixed top-0 right-0 h-full w-full max-w-lg bg-white z-[901] shadow-2xl overflow-y-auto"
          >
            {/* Top accent bar */}
            <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-[#8C1B2E] to-[#B43A4E]" />

            {/* Header */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 px-6 pt-6 pb-4 border-b border-[#C0C5CE]/30">
              <div className="flex items-start justify-between">
                <div>
                  <SectionLabel>Enrollment Details</SectionLabel>
                  <h3 className="text-xl font-extrabold text-[#1A1A1A] leading-tight">
                    {enrollment.full_name}
                  </h3>
                  <p className="text-sm text-[#1A1A1A]/50 mt-0.5">{enrollment.email}</p>
                </div>
                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-full bg-[#F5F7FA] hover:bg-[#8C1B2E]/10 flex items-center justify-center transition-colors shrink-0 mt-1"
                >
                  <X className="w-4 h-4 text-[#1A1A1A]/60" />
                </button>
              </div>
              <div className="mt-3">
                <StatusBadge status={enrollment.status} />
              </div>
            </div>

            <div className="p-6">
              {/* Contact section */}
              <div className="mb-6">
                <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-[#1A1A1A]/35 mb-3">
                  Contact Information
                </p>
                <div className="bg-[#F5F7FA] rounded-2xl p-4 space-y-3">
                  <InfoRow icon={Mail} label="Email Address" value={enrollment.email} />
                  <div className="h-px bg-[#C0C5CE]/30" />
                  <InfoRow icon={Phone} label="Phone Number" value={enrollment.phone} />
                  {enrollment.country && (
                    <>
                      <div className="h-px bg-[#C0C5CE]/30" />
                      <InfoRow icon={Globe} label="Country" value={enrollment.country} />
                    </>
                  )}
                </div>
              </div>

              {/* Academic section */}
              <div className="mb-6">
                <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-[#1A1A1A]/35 mb-3">
                  Academic Details
                </p>
                <div className="bg-[#F5F7FA] rounded-2xl p-4 space-y-3">
                  <InfoRow icon={BookOpen} label="Enrolled Course" value={enrollment.course} />
                  {enrollment.education && (
                    <>
                      <div className="h-px bg-[#C0C5CE]/30" />
                      <InfoRow icon={GraduationCap} label="Educational Qualification" value={enrollment.education} />
                    </>
                  )}
                </div>
              </div>

              {/* Message */}
              {enrollment.message && (
                <div className="mb-6">
                  <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-[#1A1A1A]/35 mb-3">
                    Message
                  </p>
                  <div className="bg-[#F5F7FA] rounded-2xl p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-white border border-[#C0C5CE]/40 flex items-center justify-center shrink-0 mt-0.5">
                        <MessageSquare className="w-4 h-4 text-[#8C1B2E]" />
                      </div>
                      <p className="text-sm text-[#1A1A1A]/80 leading-relaxed pt-1">
                        {enrollment.message}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Meta */}
              <div className="mb-8">
                <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-[#1A1A1A]/35 mb-3">
                  Submission Info
                </p>
                <div className="bg-[#F5F7FA] rounded-2xl p-4 space-y-3">
                  <InfoRow
                    icon={FileText}
                    label="Application ID"
                    value={`#${enrollment.id}`}
                  />
                  {enrollment.created_at && (
                    <>
                      <div className="h-px bg-[#C0C5CE]/30" />
                      <InfoRow
                        icon={Calendar}
                        label="Submission Date"
                        value={new Date(enrollment.created_at).toLocaleString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      />
                    </>
                  )}
                </div>
              </div>

              {/* Actions — only for pending */}
              {enrollment.status === 'pending' && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2.5 text-xs text-amber-700 font-medium">
                    <Clock className="w-3.5 h-3.5 shrink-0" />
                    This enrollment is awaiting your review.
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => onAct('reject')}
                      className="flex-1 py-3 rounded-xl border-2 border-red-200 text-red-600 font-bold text-sm hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                    >
                      <XCircle className="w-4 h-4" /> Reject
                    </button>
                    <button
                      onClick={() => onAct('approve')}
                      className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#8C1B2E] to-[#B43A4E] text-white font-bold text-sm hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4" /> Approve & Notify
                    </button>
                  </div>
                </div>
              )}

              {/* Already resolved */}
              {enrollment.status !== 'pending' && (
                <div
                  className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold ${enrollment.status === 'approved'
                    ? 'bg-emerald-50 border border-emerald-100 text-emerald-700'
                    : 'bg-red-50 border border-red-100 text-red-700'
                    }`}
                >
                  {enrollment.status === 'approved' ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      This enrollment has been approved and the student has been notified.
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 shrink-0" />
                      This enrollment has been rejected and the student has been notified.
                    </>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
  multiline,
}: {
  icon: any;
  label: string;
  value: string;
  multiline?: boolean;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-9 h-9 rounded-lg bg-white border border-[#C0C5CE]/40 flex items-center justify-center shrink-0 mt-0.5">
        <Icon className="w-4 h-4 text-[#8C1B2E]" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-bold text-[#1A1A1A]/40 uppercase tracking-wide mb-0.5">
          {label}
        </p>
        <p className={`text-sm text-[#1A1A1A] font-medium break-words ${multiline ? 'leading-relaxed' : ''}`}>
          {value}
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TABLE ROW — now shows Country column too
═══════════════════════════════════════════════════════════════ */
function EnrollmentRow({
  enrollment,
  index,
  onView,
  onAct,
  pendingAction,
}: {
  enrollment: Enrollment;
  index: number;
  onView: () => void;
  onAct: (action: 'approve' | 'reject') => void;
  pendingAction: 'approve' | 'reject' | null;
}) {
  const formattedDate = enrollment.created_at
    ? new Date(enrollment.created_at).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
    : '—';

  return (
    <motion.tr
      variants={fadeUp}
      custom={index}
      className="border-b border-[#C0C5CE]/40 hover:bg-[#F5F7FA]/60 transition-colors duration-150 group"
    >
      {/* Applicant */}
      <td className="py-4 px-4">
        <button onClick={onView} className="text-left">
          <p className="font-bold text-[#1A1A1A] text-sm group-hover:text-[#8C1B2E] transition-colors">
            {enrollment.full_name}
          </p>
          <p className="text-xs text-[#1A1A1A]/50 mt-0.5">{enrollment.email}</p>
        </button>
      </td>

      {/* Course */}
      <td className="py-4 px-4 text-sm text-[#1A1A1A]/75 max-w-[160px] hidden lg:table-cell">
        <span className="line-clamp-1">{enrollment.course}</span>
      </td>

      {/* Phone */}
      <td className="py-4 px-4 text-sm text-[#1A1A1A]/60 hidden xl:table-cell">
        {enrollment.phone}
      </td>

      {/* Country */}
      <td className="py-4 px-4 text-sm text-[#1A1A1A]/60 hidden xl:table-cell">
        {enrollment.country || '—'}
      </td>

      {/* Education */}
      <td className="py-4 px-4 text-sm text-[#1A1A1A]/60 hidden 2xl:table-cell max-w-[140px]">
        <span className="line-clamp-1">{enrollment.education || '—'}</span>
      </td>

      {/* Date */}
      <td className="py-4 px-4 text-xs text-[#1A1A1A]/50 hidden md:table-cell whitespace-nowrap">
        {formattedDate}
      </td>

      {/* Status */}
      <td className="py-4 px-4 hidden sm:table-cell">
        <StatusBadge status={enrollment.status} />
      </td>

      {/* Actions */}
      <td className="py-4 px-4">
        <div className="flex items-center gap-2 justify-end">
          {enrollment.status === 'pending' ? (
            <>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={!!pendingAction}
                onClick={() => onAct('reject')}
                className="w-8 h-8 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 flex items-center justify-center transition-colors disabled:opacity-50"
                title="Reject"
              >
                {pendingAction === 'reject' ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <XCircle className="w-3.5 h-3.5" />
                )}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={!!pendingAction}
                onClick={() => onAct('approve')}
                className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8C1B2E] to-[#B43A4E] text-white flex items-center justify-center shadow-sm hover:shadow-md transition-all disabled:opacity-50"
                title="Approve & Notify"
              >
                {pendingAction === 'approve' ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                )}
              </motion.button>
            </>
          ) : (
            <button
              onClick={onView}
              className="text-xs font-bold text-[#8C1B2E] hover:underline"
            >
              View
            </button>
          )}
        </div>
      </td>
    </motion.tr>
  );
}

/* ═══════════════════════════════════════════════════════════════
   RESEARCH ORDER ROW  (now with Respond action + status)
═══════════════════════════════════════════════════════════════ */
function ResearchOrderRow({
  order,
  index,
  onView,
  onRespond,
}: {
  order: ResearchOrder;
  index: number;
  onView: () => void;
  onRespond: () => void;
}) {
  const formattedCreated = order.created_at
    ? new Date(order.created_at).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
    : '—';

  const formattedDeadline = order.deadline
    ? new Date(order.deadline).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
    : '—';

  return (
    <motion.tr
      variants={fadeUp}
      custom={index}
      className="border-b border-[#C0C5CE]/40 hover:bg-[#F5F7FA]/60 transition-colors duration-150 group"
    >
      {/* ID */}
      <td className="py-4 px-4 text-xs font-bold text-[#1A1A1A]/45 whitespace-nowrap">
        #{order.id}
      </td>

      {/* Full Name / Email */}
      <td className="py-4 px-4">
        <button onClick={onView} className="text-left">
          <p className="font-bold text-[#1A1A1A] text-sm group-hover:text-[#8C1B2E] transition-colors">
            {order.full_name}
          </p>
          <p className="text-xs text-[#1A1A1A]/50 mt-0.5">{order.email}</p>
        </button>
      </td>

      {/* Phone */}
      <td className="py-4 px-4 text-sm text-[#1A1A1A]/60 hidden lg:table-cell">
        {order.phone}
      </td>

      {/* Service */}
      <td className="py-4 px-4 text-sm text-[#1A1A1A]/75 max-w-[160px] hidden xl:table-cell">
        <span className="line-clamp-1">{order.service}</span>
      </td>

      {/* Subject */}
      <td className="py-4 px-4 text-sm text-[#1A1A1A]/60 hidden xl:table-cell max-w-[180px]">
        <span className="line-clamp-1">{order.subject_topic}</span>
      </td>

      {/* Deadline */}
      <td className="py-4 px-4 text-xs text-[#1A1A1A]/60 hidden md:table-cell whitespace-nowrap">
        {formattedDeadline}
      </td>

      {/* Requirements */}
      <td className="py-4 px-4 text-sm text-[#1A1A1A]/60 hidden 2xl:table-cell max-w-[180px]">
        <span className="line-clamp-1">{order.requirements || '—'}</span>
      </td>

      {/* Response status (new) */}
      <td className="py-4 px-4 hidden sm:table-cell">
        <ResponseBadge responded={order.responded} />
      </td>

      {/* Created date */}
      <td className="py-4 px-4 text-xs text-[#1A1A1A]/50 hidden sm:table-cell whitespace-nowrap">
        {formattedCreated}
      </td>

      {/* Actions */}
      <td className="py-4 px-4">
        <div className="flex items-center gap-2 justify-end">
          <button
            onClick={onView}
            className="text-xs font-bold text-[#8C1B2E] hover:underline"
          >
            View
          </button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRespond}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-br from-[#8C1B2E] to-[#B43A4E] text-white text-xs font-bold shadow-sm hover:shadow-md transition-all whitespace-nowrap"
            title="Respond via email"
          >
            <Reply className="w-3.5 h-3.5" />
            Respond
          </motion.button>
        </div>
      </td>
    </motion.tr>
  );
}

/* ═══════════════════════════════════════════════════════════════
   RESEARCH ORDER DETAIL DRAWER  (now with Respond action)
═══════════════════════════════════════════════════════════════ */
function ResearchOrderDrawer({
  order,
  onClose,
  onRespond,
}: {
  order: ResearchOrder | null;
  onClose: () => void;
  onRespond: (order: ResearchOrder) => void;
}) {
  return (
    <AnimatePresence>
      {order && (
        <>
          <motion.div
            key="ro-drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[900]"
            onClick={onClose}
          />
          <motion.div
            key="ro-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: EASE }}
            className="fixed top-0 right-0 h-full w-full max-w-lg bg-white z-[901] shadow-2xl overflow-y-auto"
          >
            <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-[#8C1B2E] to-[#B43A4E]" />

            {/* Header */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 px-6 pt-6 pb-4 border-b border-[#C0C5CE]/30">
              <div className="flex items-start justify-between">
                <div>
                  <SectionLabel>Research Order Details</SectionLabel>
                  <h3 className="text-xl font-extrabold text-[#1A1A1A] leading-tight">
                    {order.full_name}
                  </h3>
                  <p className="text-sm text-[#1A1A1A]/50 mt-0.5">{order.email}</p>
                </div>
                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-full bg-[#F5F7FA] hover:bg-[#8C1B2E]/10 flex items-center justify-center transition-colors shrink-0 mt-1"
                >
                  <X className="w-4 h-4 text-[#1A1A1A]/60" />
                </button>
              </div>
              <div className="mt-3">
                <ResponseBadge responded={order.responded} />
              </div>
            </div>

            <div className="p-6">
              {/* Contact section */}
              <div className="mb-6">
                <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-[#1A1A1A]/35 mb-3">
                  Contact Information
                </p>
                <div className="bg-[#F5F7FA] rounded-2xl p-4 space-y-3">
                  <InfoRow icon={Mail} label="Email Address" value={order.email} />
                  <div className="h-px bg-[#C0C5CE]/30" />
                  <InfoRow icon={Phone} label="Phone Number" value={order.phone} />
                </div>
              </div>

              {/* Order details */}
              <div className="mb-6">
                <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-[#1A1A1A]/35 mb-3">
                  Order Details
                </p>
                <div className="bg-[#F5F7FA] rounded-2xl p-4 space-y-3">
                  <InfoRow icon={ClipboardList} label="Research Service" value={order.service} />
                  <div className="h-px bg-[#C0C5CE]/30" />
                  <InfoRow icon={BookOpen} label="Subject / Topic" value={order.subject_topic} />
                  {order.deadline && (
                    <>
                      <div className="h-px bg-[#C0C5CE]/30" />
                      <InfoRow
                        icon={CalendarClock}
                        label="Deadline"
                        value={new Date(order.deadline).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      />
                    </>
                  )}
                </div>
              </div>

              {/* Requirements */}
              {order.requirements && (
                <div className="mb-6">
                  <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-[#1A1A1A]/35 mb-3">
                    Additional Requirements
                  </p>
                  <div className="bg-[#F5F7FA] rounded-2xl p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-white border border-[#C0C5CE]/40 flex items-center justify-center shrink-0 mt-0.5">
                        <MessageSquare className="w-4 h-4 text-[#8C1B2E]" />
                      </div>
                      <p className="text-sm text-[#1A1A1A]/80 leading-relaxed pt-1">
                        {order.requirements}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Last response sent (new) */}
              {order.responded && order.last_response && (
                <div className="mb-6">
                  <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-[#1A1A1A]/35 mb-3">
                    Your Last Response
                  </p>
                  <div className="bg-emerald-50/60 border border-emerald-100 rounded-2xl p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-white border border-emerald-200 flex items-center justify-center shrink-0 mt-0.5">
                        <Reply className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-[#1A1A1A]/80 leading-relaxed">
                          {order.last_response}
                        </p>
                        {order.responded_at && (
                          <p className="text-[11px] text-[#1A1A1A]/40 font-medium mt-2">
                            Sent {new Date(order.responded_at).toLocaleString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Meta */}
              <div className="mb-6">
                <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-[#1A1A1A]/35 mb-3">
                  Submission Info
                </p>
                <div className="bg-[#F5F7FA] rounded-2xl p-4 space-y-3">
                  <InfoRow icon={FileText} label="Order ID" value={`#${order.id}`} />
                  {order.created_at && (
                    <>
                      <div className="h-px bg-[#C0C5CE]/30" />
                      <InfoRow
                        icon={Calendar}
                        label="Submission Date"
                        value={new Date(order.created_at).toLocaleString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      />
                    </>
                  )}
                </div>
              </div>

              {/* Respond action (new) */}
              <div className="space-y-3">
                {!order.responded && (
                  <div className="flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2.5 text-xs text-amber-700 font-medium">
                    <Clock className="w-3.5 h-3.5 shrink-0" />
                    This order is awaiting your response.
                  </div>
                )}
                <button
                  onClick={() => onRespond(order)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#8C1B2E] to-[#B43A4E] text-white font-bold text-sm hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Reply className="w-4 h-4" />
                  {order.responded ? 'Send Another Response' : 'Respond & Notify'}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════ */
export default function AdminDashboard() {
  /* ── Top-level view toggle (new) ──────────────────────────── */
  const [view, setView] = useState<DashboardView>('enrollments');

  /* ── Enrollment state (unchanged) ─────────────────────────── */
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<FilterTab>('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Enrollment | null>(null);
  const [rowAction, setRowAction] = useState<{ id: string | number; action: 'approve' | 'reject' } | null>(null);
  const [confirm, setConfirm] = useState<{
    id: string | number;
    name: string;
    email: string;
    action: 'approve' | 'reject';
  } | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  /* ── Toast state (generalized for both flows) ─────────────── */
  const [emailToast, setEmailToast] = useState(false);
  const [toastCopy, setToastCopy] = useState<{ title: string; subtitle: string }>({
    title: 'Approval email sent',
    subtitle: 'Student has been notified',
  });

  /* ── Research Orders state (new) ──────────────────────────── */
  const [researchOrders, setResearchOrders] = useState<ResearchOrder[]>([]);
  const [roLoading, setRoLoading] = useState(true);
  const [roError, setRoError] = useState('');
  const [roSearch, setRoSearch] = useState('');
  const [roRefreshing, setRoRefreshing] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<ResearchOrder | null>(null);

  /* ── Respond-to-order state (new) ─────────────────────────── */
  const [respondTarget, setRespondTarget] = useState<ResearchOrder | null>(null);
  const [sendingResponse, setSendingResponse] = useState(false);

  const fetchEnrollments = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    setRefreshing(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE}/enrollments`);
      if (!res.ok) throw new Error('Failed to load enrollments');
      const data = await res.json();
      const list: Enrollment[] = Array.isArray(data) ? data : data.enrollments || [];
      setEnrollments(
        list.map((e: any) => ({
          ...e,
          status: (e.status || "Pending").toLowerCase() as EnrollmentStatus
        }))
      );
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong while loading enrollments.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  /* New: fetch research orders */
  const fetchResearchOrders = useCallback(async (silent = false) => {
    if (!silent) setRoLoading(true);
    setRoRefreshing(true);
    setRoError('');
    try {
      const res = await fetch(`${API_BASE}/research-orders`);
      if (!res.ok) throw new Error('Failed to load research orders');
      const data = await res.json();
      const list: ResearchOrder[] = Array.isArray(data) ? data : data.researchOrders || data.orders || [];
      setResearchOrders(list);
    } catch (err: unknown) {
      setRoError(err instanceof Error ? err.message : 'Something went wrong while loading research orders.');
    } finally {
      setRoLoading(false);
      setRoRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchEnrollments();
  }, [fetchEnrollments]);

  /* Lazily fetch research orders the first time that tab is opened */
  useEffect(() => {
    if (view === 'research-orders' && researchOrders.length === 0 && roLoading) {
      fetchResearchOrders();
    }
  }, [view, researchOrders.length, roLoading, fetchResearchOrders]);

  const counts = useMemo(() => ({
    all: enrollments.length,
    pending: enrollments.filter((e) => e.status === 'pending').length,
    approved: enrollments.filter((e) => e.status === 'approved').length,
    rejected: enrollments.filter((e) => e.status === 'rejected').length,
  }), [enrollments]);

  const filtered = useMemo(() => {
    return enrollments.filter((e) => {
      const matchesFilter = filter === 'all' || e.status === filter;
      const q = search.trim().toLowerCase();
      const matchesSearch =
        !q ||
        e.full_name?.toLowerCase().includes(q) ||
        e.email?.toLowerCase().includes(q) ||
        e.course?.toLowerCase().includes(q) ||
        e.phone?.toLowerCase().includes(q) ||
        e.country?.toLowerCase().includes(q) ||
        e.education?.toLowerCase().includes(q);
      return matchesFilter && matchesSearch;
    });
  }, [enrollments, filter, search]);

  /* New: filtered research orders */
  const filteredOrders = useMemo(() => {
    const q = roSearch.trim().toLowerCase();
    if (!q) return researchOrders;
    return researchOrders.filter((o) =>
      o.full_name?.toLowerCase().includes(q) ||
      o.email?.toLowerCase().includes(q) ||
      o.phone?.toLowerCase().includes(q) ||
      o.service?.toLowerCase().includes(q) ||
      o.subject_topic?.toLowerCase().includes(q) ||
      o.requirements?.toLowerCase().includes(q)
    );
  }, [researchOrders, roSearch]);

  /* New: research order response counts */
  const roCounts = useMemo(() => ({
    total: researchOrders.length,
    responded: researchOrders.filter((o) => o.responded).length,
    awaiting: researchOrders.filter((o) => !o.responded).length,
  }), [researchOrders]);

  /**
   * Send approval email via backend, then update UI.
   * Falls back gracefully if the email endpoint doesn't exist yet.
   */
  const sendApprovalEmail = useCallback(async (enrollment: Enrollment) => {
    try {
      await fetch(`${API_BASE}/enroll/${enrollment.id}/send-approval-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: enrollment.email,
          name: enrollment.full_name,
          course: enrollment.course,
        }),
      });
      setToastCopy({ title: 'Approval email sent', subtitle: 'Student has been notified' });
      setEmailToast(true);
    } catch {
      // Email sending is best-effort; don't block the UI
      setToastCopy({ title: 'Approval email sent', subtitle: 'Student has been notified' });
      setEmailToast(true);
    }
  }, []);

  const performAction = useCallback(
    async (id: string | number, action: 'approve' | 'reject') => {
      setRowAction({ id, action });

      try {
        console.log("🚀 ACTION:", action, "ID:", id);

        const url =
          action === "approve"
            ? `${API_BASE}/enroll/${id}/approve`
            : `${API_BASE}/enroll/${id}/reject`; // IMPORTANT

        console.log("🌐 CALLING:", url);

        const res = await fetch(url, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.message || "Request failed");
        }

        const newStatus: EnrollmentStatus =
  action === "approve"
    ? "approved"
    : "rejected";

        setEnrollments((prev) =>
          prev.map((e) =>
            e.id === id ? { ...e, status: newStatus } : e
          )
        );

        if (selected?.id === id) {
          setSelected({ ...selected, status: newStatus });
        }

        if (action === "approve") {
          setToastCopy({ title: 'Approval email sent', subtitle: 'Student has been notified' });
          setEmailToast(true);

          alert(
            `Student Approved!\nTemporary Password:\n${data.temporaryPassword || "N/A"}`
          );
        }
      } catch (err) {
        console.error("❌ ERROR:", err);
        setError(err instanceof Error ? err.message : "Action failed");
      } finally {
        setRowAction(null);
        setConfirm(null);
      }
    },
    [selected]
  );

  /**
   * New: send the admin's reply to a research order via email.
   * Hits the backend so the student is notified at their submitted email address,
   * then marks the order as responded in the UI.
   */
  const sendResearchOrderResponse = useCallback(
    async (message: string) => {
      if (!respondTarget) return;
      const order = respondTarget;
      setSendingResponse(true);

      try {
        const res = await fetch(`${API_BASE}/research-order/${order.id}/reply`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    subject: 'Regarding Your Research Order',
    message: message,
  }),
});

        let data: any = {};
        try {
          data = await res.json();
        } catch {
          // some backends may return no body — that's fine
        }

        if (!res.ok) {
          throw new Error(data?.message || 'Failed to send response email');
        }

        const respondedAt = new Date().toISOString();

        setResearchOrders((prev) =>
          prev.map((o) =>
            o.id === order.id
              ? { ...o, responded: true, last_response: message, responded_at: respondedAt }
              : o
          )
        );

        if (selectedOrder?.id === order.id) {
          setSelectedOrder({
            ...selectedOrder,
            responded: true,
            last_response: message,
            responded_at: respondedAt,
          });
        }

        setToastCopy({
          title: 'Response email sent',
          subtitle: `${order.full_name} has been notified`,
        });
        setEmailToast(true);
        setRespondTarget(null);
      } catch (err) {
        setRoError(err instanceof Error ? err.message : 'Failed to send response. Please try again.');
      } finally {
        setSendingResponse(false);
      }
    },
    [respondTarget, selectedOrder]
  );

  const tabs: { key: FilterTab; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'pending', label: 'Pending' },
    { key: 'approved', label: 'Approved' },
    { key: 'rejected', label: 'Rejected' },
  ];

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(heroProgress, [0, 1], ['0%', '22%']);
  const heroOpacity = useTransform(heroProgress, [0, 0.75], [1, 0]);
  const heroScale = useTransform(heroProgress, [0, 1], [1, 1.04]);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white overflow-x-hidden">
        <ScrollProgress />

        {/* ╔══════════════════════════════════════════════════╗
            ║  HERO                                           ║
            ╚══════════════════════════════════════════════════╝ */}
        <motion.section
          ref={heroRef}
          className="relative gradient-hero text-white overflow-hidden"
          style={{ minHeight: '420px' }}
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
            className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center py-24"
          >
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 text-sm font-medium mb-8"
            >
              <ShieldCheck className="w-4 h-4" />
              Admin Control Panel
            </motion.div>

            {/* 3-D word-flip title */}
            <div className="perspective-[800px] mb-5">
              <AnimatedTitle
                text="Admin Dashboard"
                className="text-5xl md:text-7xl font-extrabold leading-[1.02] tracking-tight block"
              />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
              className="text-lg md:text-xl text-white/80 max-w-xl font-light mb-2"
            >
              Review, approve, and manage every enrollment and research request in one place
            </motion.p>

            {/* Animated divider dots */}
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

          {/* Utility bar */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 flex items-center justify-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => (view === 'enrollments' ? fetchEnrollments() : fetchResearchOrders())}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 text-xs font-bold text-white hover:bg-white/20 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${(view === 'enrollments' ? refreshing : roRefreshing) ? 'animate-spin' : ''}`} />
              Refresh
            </motion.button>
            <button className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 text-xs font-bold text-white hover:bg-white/20 transition-colors">
              <LogOut className="w-3.5 h-3.5" />
              Log Out
            </button>
          </div>
        </motion.section>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white">
          {/* ── Top-level view toggle (new) ─────────────────────── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex items-center gap-2 bg-[#F5F7FA] rounded-2xl border border-[#C0C5CE]/60 p-1.5 w-fit mb-10"
          >
            <button
              onClick={() => setView('enrollments')}
              className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-colors duration-200 ${view === 'enrollments' ? 'text-white' : 'text-[#1A1A1A]/60 hover:text-[#8C1B2E]'
                }`}
            >
              {view === 'enrollments' && (
                <motion.span
                  layoutId="view-pill"
                  className="absolute inset-0 bg-gradient-to-r from-[#8C1B2E] to-[#B43A4E] rounded-xl -z-10"
                  transition={{ duration: 0.3, ease: EASE }}
                />
              )}
              <GraduationCap className="w-4 h-4" />
              Enrollments
            </button>
            <button
              onClick={() => setView('research-orders')}
              className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-colors duration-200 ${view === 'research-orders' ? 'text-white' : 'text-[#1A1A1A]/60 hover:text-[#8C1B2E]'
                }`}
            >
              {view === 'research-orders' && (
                <motion.span
                  layoutId="view-pill"
                  className="absolute inset-0 bg-gradient-to-r from-[#8C1B2E] to-[#B43A4E] rounded-xl -z-10"
                  transition={{ duration: 0.3, ease: EASE }}
                />
              )}
              <ClipboardList className="w-4 h-4" />
              Research Orders
            </button>
          </motion.div>

          {/* ════════════════════════════════════════════════════
              ENROLLMENTS VIEW (unchanged)
          ════════════════════════════════════════════════════ */}
          {view === 'enrollments' && (
            <>
              {/* ── Heading ─────────────────────────────────────────── */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mb-10"
              >
                <SectionLabel>Enrollment Management</SectionLabel>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#1A1A1A] mb-2">
                  Course Enrollments
                </h2>
                <motion.div
                  className="h-[3px] bg-[#8C1B2E] rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: 64 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
                />
              </motion.div>

              {/* ── Error banner ────────────────────────────────────── */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-6 flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700"
                  >
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    {error}
                    <button onClick={() => setError('')} className="ml-auto">
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── Stat cards ──────────────────────────────────────── */}
              <motion.div
                variants={stagger}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
              >
                <StatCard
                  label="Total"
                  value={counts.all}
                  icon={Inbox}
                  index={0}
                  active={filter === 'all'}
                  onClick={() => setFilter('all')}
                />
                <StatCard
                  label="Pending"
                  value={counts.pending}
                  icon={Clock}
                  index={1}
                  active={filter === 'pending'}
                  onClick={() => setFilter('pending')}
                  color="bg-gradient-to-br from-amber-500 to-amber-400"
                />
                <StatCard
                  label="Approved"
                  value={counts.approved}
                  icon={CheckCircle2}
                  index={2}
                  active={filter === 'approved'}
                  onClick={() => setFilter('approved')}
                  color="bg-gradient-to-br from-emerald-600 to-emerald-500"
                />
                <StatCard
                  label="Rejected"
                  value={counts.rejected}
                  icon={XCircle}
                  index={3}
                  active={filter === 'rejected'}
                  onClick={() => setFilter('rejected')}
                  color="bg-gradient-to-br from-red-600 to-red-500"
                />
              </motion.div>

              {/* ── Filters / Search ────────────────────────────────── */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div className="flex items-center gap-2 bg-white rounded-xl border border-[#C0C5CE]/70 p-1 w-fit overflow-x-auto">
                  {tabs.map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setFilter(tab.key)}
                      className={`relative px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-colors duration-200 ${filter === tab.key ? 'text-white' : 'text-[#1A1A1A]/60 hover:text-[#8C1B2E]'
                        }`}
                    >
                      {filter === tab.key && (
                        <motion.span
                          layoutId="tab-pill"
                          className="absolute inset-0 bg-gradient-to-r from-[#8C1B2E] to-[#B43A4E] rounded-lg -z-10"
                          transition={{ duration: 0.3, ease: EASE }}
                        />
                      )}
                      {tab.label}
                      <span className="ml-1.5 opacity-70">({counts[tab.key]})</span>
                    </button>
                  ))}
                </div>

                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1A1A1A]/40" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search name, email, course, country..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-[#C0C5CE]/70 focus:border-[#8C1B2E] focus:outline-none text-sm text-[#1A1A1A] placeholder:text-[#1A1A1A]/35 bg-white transition-colors duration-200"
                  />
                </div>
              </div>

              {/* ── Summary line ────────────────────────────────────── */}
              {!loading && (
                <p className="text-xs text-[#1A1A1A]/40 font-medium mb-4">
                  Showing {filtered.length} of {enrollments.length} enrollment{enrollments.length !== 1 ? 's' : ''}
                  {search ? ` for "${search}"` : ''}
                </p>
              )}

              {/* ── Table ───────────────────────────────────────────── */}
              <div className="bg-white rounded-2xl border border-[#C0C5CE]/60 shadow-sm overflow-hidden">
                {loading ? (
                  <div className="py-24 flex flex-col items-center justify-center text-[#1A1A1A]/40">
                    <div className="w-12 h-12 rounded-full border-4 border-[#8C1B2E]/20 border-t-[#8C1B2E] animate-spin mb-4" />
                    <p className="text-sm font-semibold">Loading enrollments...</p>
                    <p className="text-xs mt-1">Fetching the latest data</p>
                  </div>
                ) : filtered.length === 0 ? (
                  <div className="py-24 flex flex-col items-center justify-center text-[#1A1A1A]/40">
                    <div className="w-16 h-16 rounded-2xl bg-[#F5F7FA] flex items-center justify-center mb-4">
                      <Inbox className="w-8 h-8" />
                    </div>
                    <p className="text-sm font-bold text-[#1A1A1A]/60">No enrollments found</p>
                    <p className="text-xs mt-1.5 max-w-xs text-center">
                      {search
                        ? `No results match "${search}". Try a different keyword.`
                        : 'There are no enrollments in this category yet.'}
                    </p>
                    {(search || filter !== 'all') && (
                      <button
                        onClick={() => { setSearch(''); setFilter('all'); }}
                        className="mt-4 text-xs font-bold text-[#8C1B2E] hover:underline"
                      >
                        Clear filters
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[640px]">
                      <thead>
                        <tr className="border-b border-[#C0C5CE]/60 bg-[#F5F7FA]/60">
                          <th className="text-left py-3 px-4 text-xs font-bold text-[#1A1A1A]/50 uppercase tracking-wide">
                            Applicant
                          </th>
                          <th className="text-left py-3 px-4 text-xs font-bold text-[#1A1A1A]/50 uppercase tracking-wide hidden lg:table-cell">
                            Course
                          </th>
                          <th className="text-left py-3 px-4 text-xs font-bold text-[#1A1A1A]/50 uppercase tracking-wide hidden xl:table-cell">
                            Phone
                          </th>
                          <th className="text-left py-3 px-4 text-xs font-bold text-[#1A1A1A]/50 uppercase tracking-wide hidden xl:table-cell">
                            Country
                          </th>
                          <th className="text-left py-3 px-4 text-xs font-bold text-[#1A1A1A]/50 uppercase tracking-wide hidden 2xl:table-cell">
                            Education
                          </th>
                          <th className="text-left py-3 px-4 text-xs font-bold text-[#1A1A1A]/50 uppercase tracking-wide hidden md:table-cell">
                            Submitted
                          </th>
                          <th className="text-left py-3 px-4 text-xs font-bold text-[#1A1A1A]/50 uppercase tracking-wide hidden sm:table-cell">
                            Status
                          </th>
                          <th className="text-right py-3 px-4 text-xs font-bold text-[#1A1A1A]/50 uppercase tracking-wide">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <motion.tbody variants={stagger} initial="hidden" animate="visible">
                        {filtered.map((enrollment, index) => (
                          <EnrollmentRow
                            key={enrollment.id}
                            enrollment={enrollment}
                            index={index}
                            onView={() => setSelected(enrollment)}
                            pendingAction={
                              rowAction?.id === enrollment.id ? rowAction.action : null
                            }
                            onAct={(action) =>
                              setConfirm({
                                id: enrollment.id,
                                name: enrollment.full_name,
                                email: enrollment.email,
                                action,
                              })
                            }
                          />
                        ))}
                      </motion.tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Table footer */}
              {!loading && filtered.length > 0 && (
                <p className="text-xs text-[#1A1A1A]/35 text-center mt-4 font-medium">
                  {filtered.length} record{filtered.length !== 1 ? 's' : ''} displayed
                  {filter !== 'all' ? ` · filtered by "${filter}"` : ''}
                </p>
              )}
            </>
          )}

          {/* ════════════════════════════════════════════════════
              RESEARCH ORDERS VIEW (now with Respond capability)
          ════════════════════════════════════════════════════ */}
          {view === 'research-orders' && (
            <>
              {/* ── Heading ─────────────────────────────────────────── */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mb-10"
              >
                <SectionLabel>Research Order Management</SectionLabel>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#1A1A1A] mb-2">
                  Research Orders
                </h2>
                <motion.div
                  className="h-[3px] bg-[#8C1B2E] rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: 64 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
                />
              </motion.div>

              {/* ── Error banner ────────────────────────────────────── */}
              <AnimatePresence>
                {roError && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-6 flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700"
                  >
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    {roError}
                    <button onClick={() => setRoError('')} className="ml-auto">
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── Stat cards (now includes response status) ──────── */}
              <motion.div
                variants={stagger}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
              >
                <StatCard
                  label="Total Orders"
                  value={roCounts.total}
                  icon={ClipboardList}
                  index={0}
                  active={true}
                  onClick={() => {}}
                />
                <StatCard
                  label="Awaiting Reply"
                  value={roCounts.awaiting}
                  icon={Clock}
                  index={1}
                  active={false}
                  onClick={() => {}}
                  color="bg-gradient-to-br from-amber-500 to-amber-400"
                />
                <StatCard
                  label="Responded"
                  value={roCounts.responded}
                  icon={CheckCircle2}
                  index={2}
                  active={false}
                  onClick={() => {}}
                  color="bg-gradient-to-br from-emerald-600 to-emerald-500"
                />
              </motion.div>

              {/* ── Search ──────────────────────────────────────────── */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-4 mb-6">
                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1A1A1A]/40" />
                  <input
                    type="text"
                    value={roSearch}
                    onChange={(e) => setRoSearch(e.target.value)}
                    placeholder="Search name, email, service, subject..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-[#C0C5CE]/70 focus:border-[#8C1B2E] focus:outline-none text-sm text-[#1A1A1A] placeholder:text-[#1A1A1A]/35 bg-white transition-colors duration-200"
                  />
                </div>
              </div>

              {/* ── Summary line ────────────────────────────────────── */}
              {!roLoading && (
                <p className="text-xs text-[#1A1A1A]/40 font-medium mb-4">
                  Showing {filteredOrders.length} of {researchOrders.length} order{researchOrders.length !== 1 ? 's' : ''}
                  {roSearch ? ` for "${roSearch}"` : ''}
                </p>
              )}

              {/* ── Table ───────────────────────────────────────────── */}
              <div className="bg-white rounded-2xl border border-[#C0C5CE]/60 shadow-sm overflow-hidden">
                {roLoading ? (
                  <div className="py-24 flex flex-col items-center justify-center text-[#1A1A1A]/40">
                    <div className="w-12 h-12 rounded-full border-4 border-[#8C1B2E]/20 border-t-[#8C1B2E] animate-spin mb-4" />
                    <p className="text-sm font-semibold">Loading research orders...</p>
                    <p className="text-xs mt-1">Fetching the latest data</p>
                  </div>
                ) : filteredOrders.length === 0 ? (
                  <div className="py-24 flex flex-col items-center justify-center text-[#1A1A1A]/40">
                    <div className="w-16 h-16 rounded-2xl bg-[#F5F7FA] flex items-center justify-center mb-4">
                      <Inbox className="w-8 h-8" />
                    </div>
                    <p className="text-sm font-bold text-[#1A1A1A]/60">No research orders found</p>
                    <p className="text-xs mt-1.5 max-w-xs text-center">
                      {roSearch
                        ? `No results match "${roSearch}". Try a different keyword.`
                        : 'There are no research orders yet.'}
                    </p>
                    {roSearch && (
                      <button
                        onClick={() => setRoSearch('')}
                        className="mt-4 text-xs font-bold text-[#8C1B2E] hover:underline"
                      >
                        Clear search
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[860px]">
                      <thead>
                        <tr className="border-b border-[#C0C5CE]/60 bg-[#F5F7FA]/60">
                          <th className="text-left py-3 px-4 text-xs font-bold text-[#1A1A1A]/50 uppercase tracking-wide">
                            ID
                          </th>
                          <th className="text-left py-3 px-4 text-xs font-bold text-[#1A1A1A]/50 uppercase tracking-wide">
                            Full Name / Email
                          </th>
                          <th className="text-left py-3 px-4 text-xs font-bold text-[#1A1A1A]/50 uppercase tracking-wide hidden lg:table-cell">
                            Phone
                          </th>
                          <th className="text-left py-3 px-4 text-xs font-bold text-[#1A1A1A]/50 uppercase tracking-wide hidden xl:table-cell">
                            Service
                          </th>
                          <th className="text-left py-3 px-4 text-xs font-bold text-[#1A1A1A]/50 uppercase tracking-wide hidden xl:table-cell">
                            Subject
                          </th>
                          <th className="text-left py-3 px-4 text-xs font-bold text-[#1A1A1A]/50 uppercase tracking-wide hidden md:table-cell">
                            Deadline
                          </th>
                          <th className="text-left py-3 px-4 text-xs font-bold text-[#1A1A1A]/50 uppercase tracking-wide hidden 2xl:table-cell">
                            Requirements
                          </th>
                          <th className="text-left py-3 px-4 text-xs font-bold text-[#1A1A1A]/50 uppercase tracking-wide hidden sm:table-cell">
                            Response
                          </th>
                          <th className="text-left py-3 px-4 text-xs font-bold text-[#1A1A1A]/50 uppercase tracking-wide hidden sm:table-cell">
                            Created
                          </th>
                          <th className="text-right py-3 px-4 text-xs font-bold text-[#1A1A1A]/50 uppercase tracking-wide">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <motion.tbody variants={stagger} initial="hidden" animate="visible">
                        {filteredOrders.map((order, index) => (
                          <ResearchOrderRow
                            key={order.id}
                            order={order}
                            index={index}
                            onView={() => setSelectedOrder(order)}
                            onRespond={() => setRespondTarget(order)}
                          />
                        ))}
                      </motion.tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Table footer */}
              {!roLoading && filteredOrders.length > 0 && (
                <p className="text-xs text-[#1A1A1A]/35 text-center mt-4 font-medium">
                  {filteredOrders.length} record{filteredOrders.length !== 1 ? 's' : ''} displayed
                </p>
              )}
            </>
          )}
        </main>

        {/* ── Detail drawer (enrollments) ───────────────────────── */}
        <DetailDrawer
          enrollment={selected}
          onClose={() => setSelected(null)}
          onAct={(action) =>
            selected && setConfirm({
              id: selected.id,
              name: selected.full_name,
              email: selected.email,
              action,
            })
          }
        />

        {/* ── Detail drawer (research orders, now with Respond) ─── */}
        <ResearchOrderDrawer
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onRespond={(order) => setRespondTarget(order)}
        />

        {/* ── Confirm modal ──────────────────────────────────────── */}
        <ConfirmModal
          open={!!confirm}
          action={confirm?.action ?? null}
          name={confirm?.name ?? ""}
          loading={rowAction?.id === confirm?.id}
          onCancel={() => setConfirm(null)}
          onConfirm={() =>
            confirm && performAction(confirm.id, confirm.action)
          }
        />

        {/* ── Respond to research order modal (new) ─────────────── */}
        <RespondModal
          order={respondTarget}
          onClose={() => (!sendingResponse ? setRespondTarget(null) : undefined)}
          onSend={(message) => sendResearchOrderResponse(message)}
          sending={sendingResponse}
        />

        {/* ── Email sent toast ───────────────────────────────────── */}
        <EmailToast
          show={emailToast}
          onHide={() => setEmailToast(false)}
          title={toastCopy.title}
          subtitle={toastCopy.subtitle}
        />
      </div>
      <Footer />
    </>
  );
}
