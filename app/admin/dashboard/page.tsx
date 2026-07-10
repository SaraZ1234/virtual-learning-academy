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
  Video,
  Link2,
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

interface ResearchOrder {
  id: string | number;
  full_name: string;
  email: string;
  phone: string;
  service: string;
  subject_topic: string; // Uniform interface property resolution
  deadline?: string;
  requirements?: string;
  created_at?: string;
  status: string;
  last_response?: string;
  responded_at?: string;
}

interface ZoomMeeting {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  course: string;
  preferred_date: string;
  preferred_time: string;
  status: string;
  meeting_link: string | null;
  meeting_id: string | null;
  meeting_password: string | null;
  created_at: string;
  duration?: number;
  topic?: string;
  host_email?: string;
  agenda?: string;
  start_time?: string;
}

type DashboardView = 'enrollments' | 'research-orders' | 'zoom-meetings';

const API_BASE = 'https://terrific-light-production-94ae.up.railway.app/api';

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

function ResponseBadge({ status }: { status: string }) {
  return status === "Responded" ? (
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
      className={`relative text-left bg-white rounded-2xl border p-5 flex items-center gap-4 transition-colors duration-200 w-full ${
        active ? 'border-[#8C1B2E] ring-2 ring-[#8C1B2E]/15' : 'border-[#C0C5CE]/70'
      }`}
    >
      {active && (
        <motion.div
          layoutId="stat-glow"
          className="absolute inset-0 rounded-2xl bg-[#8C1B2E]/[0.03] pointer-events-none"
        />
      )}
      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-md shrink-0 ${
          color || 'bg-gradient-to-br from-[#8C1B2E] to-[#B43A4E]'
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
   EMAIL SENT TOAST
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
          className="fixed bottom-6 right-6 z-[2000] flex items-center gap-3 bg-emerald-600 text-white px-5 py-3.5 rounded-2xl shadow-2xl max-w-sm sm:max-w-md"
        >
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <Send className="w-4 h-4" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-bold text-sm truncate">{title}</p>
            <p className="text-xs text-white/80 truncate">{subtitle}</p>
          </div>
          <button onClick={onHide} className="ml-2 opacity-70 hover:opacity-100 transition-opacity shrink-0">
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
                className={`w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-4 ${
                  isApprove ? 'bg-emerald-50' : 'bg-red-50'
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
                  className={`flex-1 py-2.5 rounded-xl text-sm font-bold text-white transition-all disabled:opacity-70 flex items-center justify-center gap-2 ${
                    isApprove
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
   RESPOND TO RESEARCH ORDER MODAL
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
            className="fixed inset-0 z-[1001] flex items-center justify-center p-4 overflow-y-auto"
          >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden my-auto">
              <div className="h-[4px] bg-gradient-to-r from-[#8C1B2E] to-[#B43A4E]" />

              <div className="p-4 sm:p-6">
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
                  <span className="break-all">This message will be emailed directly to {order.email}.</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <button
                    onClick={onClose}
                    disabled={sending}
                    className="w-full sm:flex-1 py-2.5 rounded-xl border-2 border-[#C0C5CE]/70 text-sm font-bold text-[#1A1A1A]/70 hover:bg-[#F5F7FA] transition-colors disabled:opacity-50 dynamic-btn-order"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => onSend(message)}
                    disabled={sending || !message.trim()}
                    className="w-full sm:flex-1 py-2.5 rounded-xl text-sm font-bold text-white transition-all disabled:opacity-50 flex items-center justify-center gap-2 bg-gradient-to-r from-[#8C1B2E] to-[#B43A4E] hover:shadow-lg dynamic-btn-order"
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
   ENROLLMENT DETAIL DRAWER
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
            <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-[#8C1B2E] to-[#B43A4E]" />

            <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 px-6 pt-6 pb-4 border-b border-[#C0C5CE]/30">
              <div className="flex items-start justify-between">
                <div className="min-w-0 flex-1 pr-2">
                  <SectionLabel>Enrollment Details</SectionLabel>
                  <h3 className="text-xl font-extrabold text-[#1A1A1A] leading-tight break-words">
                    {enrollment.full_name}
                  </h3>
                  <p className="text-sm text-[#1A1A1A]/50 mt-0.5 break-all">{enrollment.email}</p>
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
                      <p className="text-sm text-[#1A1A1A]/80 leading-relaxed pt-1 break-words">
                        {enrollment.message}
                      </p>
                    </div>
                  </div>
                </div>
              )}

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

              {enrollment.status === 'pending' && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2.5 text-xs text-amber-700 font-medium">
                    <Clock className="w-3.5 h-3.5 shrink-0" />
                    This enrollment is awaiting your review.
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => onAct('reject')}
                      className="w-full sm:flex-1 py-3 rounded-xl border-2 border-red-200 text-red-600 font-bold text-sm hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                    >
                      <XCircle className="w-4 h-4" /> Reject
                    </button>
                    <button
                      onClick={() => onAct('approve')}
                      className="w-full sm:flex-1 py-3 rounded-xl bg-gradient-to-r from-[#8C1B2E] to-[#B43A4E] text-white font-bold text-sm hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4" /> Approve & Notify
                    </button>
                  </div>
                </div>
              )}

              {enrollment.status !== 'pending' && (
                <div
                  className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold border ${
                    enrollment.status === 'approved'
                      ? 'bg-emerald-50 border-emerald-100 text-emerald-700'
                      : 'bg-red-50 border-red-100 text-red-700'
                  }`}
                >
                  {enrollment.status === 'approved' ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span className="leading-tight">This enrollment has been approved and the student has been notified.</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 shrink-0" />
                      <span className="leading-tight">This enrollment has been rejected and the student has been notified.</span>
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
   TABLE ROW COMPONENTS
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
      <td className="py-4 px-4">
        <button onClick={onView} className="text-left focus:outline-none block max-w-full">
          <p className="font-bold text-[#1A1A1A] text-sm group-hover:text-[#8C1B2E] transition-colors truncate max-w-[180px] sm:max-w-none">
            {enrollment.full_name}
          </p>
          <p className="text-xs text-[#1A1A1A]/50 mt-0.5 truncate max-w-[180px] sm:max-w-none">{enrollment.email}</p>
        </button>
      </td>

      <td className="py-4 px-4 text-sm text-[#1A1A1A]/75 max-w-[160px] hidden lg:table-cell">
        <span className="line-clamp-1">{enrollment.course}</span>
      </td>

      <td className="py-4 px-4 text-sm text-[#1A1A1A]/60 hidden xl:table-cell">
        {enrollment.phone}
      </td>

      <td className="py-4 px-4 text-sm text-[#1A1A1A]/60 hidden xl:table-cell">
        {enrollment.country || '—'}
      </td>

      <td className="py-4 px-4 text-sm text-[#1A1A1A]/60 hidden 2xl:table-cell max-w-[140px]">
        <span className="line-clamp-1">{enrollment.education || '—'}</span>
      </td>

      <td className="py-4 px-4 text-xs text-[#1A1A1A]/50 hidden md:table-cell whitespace-nowrap">
        {formattedDate}
      </td>

      <td className="py-4 px-4 hidden sm:table-cell">
        <StatusBadge status={enrollment.status} />
      </td>

      <td className="py-4 px-4">
        <div className="flex items-center gap-2 justify-end">
          {enrollment.status === 'pending' ? (
            <>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={!!pendingAction}
                onClick={() => onAct('reject')}
                className="w-8 h-8 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 flex items-center justify-center transition-colors disabled:opacity-50 shrink-0"
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
                className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8C1B2E] to-[#B43A4E] text-white flex items-center justify-center shadow-sm hover:shadow-md transition-all disabled:opacity-50 shrink-0"
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
              className="text-xs font-bold text-[#8C1B2E] hover:underline whitespace-nowrap"
            >
              View
            </button>
          )}
        </div>
      </td>
    </motion.tr>
  );
}

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
      <td className="py-4 px-4 text-xs font-bold text-[#1A1A1A]/45 whitespace-nowrap">
        #{order.id}
      </td>

      <td className="py-4 px-4">
        <button onClick={onView} className="text-left focus:outline-none block max-w-full">
          <p className="font-bold text-[#1A1A1A] text-sm group-hover:text-[#8C1B2E] transition-colors truncate max-w-[160px] sm:max-w-none">
            {order.full_name}
          </p>
          <p className="text-xs text-[#1A1A1A]/50 mt-0.5 truncate max-w-[160px] sm:max-w-none">{order.email}</p>
        </button>
      </td>

      <td className="py-4 px-4 text-sm text-[#1A1A1A]/60 hidden lg:table-cell">
        {order.phone}
      </td>

      <td className="py-4 px-4 text-sm text-[#1A1A1A]/75 max-w-[160px] hidden xl:table-cell">
        <span className="line-clamp-1">{order.service}</span>
      </td>

      <td className="py-4 px-4 text-sm text-[#1A1A1A]/60 hidden xl:table-cell max-w-[180px]">
        <span className="line-clamp-1">{order.subject_topic}</span>
      </td>

      <td className="py-4 px-4 text-xs text-[#1A1A1A]/60 hidden md:table-cell whitespace-nowrap">
        {formattedDeadline}
      </td>

      <td className="py-4 px-4 text-sm text-[#1A1A1A]/60 hidden 2xl:table-cell max-w-[180px]">
        <span className="line-clamp-1">{order.requirements || '—'}</span>
      </td>

      <td className="py-4 px-4 hidden sm:table-cell">
        <ResponseBadge status={order.status} />
      </td>

      <td className="py-4 px-4 text-xs text-[#1A1A1A]/50 hidden sm:table-cell whitespace-nowrap">
        {formattedCreated}
      </td>

      <td className="py-4 px-4">
        <div className="flex items-center gap-2 justify-end">
          <button
            onClick={onView}
            className="text-xs font-bold text-[#8C1B2E] hover:underline whitespace-nowrap"
          >
            View
          </button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRespond}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-br from-[#8C1B2E] to-[#B43A4E] text-white text-xs font-bold shadow-sm hover:shadow-md transition-all whitespace-nowrap shrink-0"
            title="Respond via email"
          >
            <Reply className="w-3.5 h-3.5" />
            <span>Respond</span>
          </motion.button>
        </div>
      </td>
    </motion.tr>
  );
}

function ZoomMeetingRow({
  meeting,
  index,
  onView,
}: {
  meeting: ZoomMeeting;
  index: number;
  onView: () => void;
}) {
  const formattedStart = (meeting.preferred_date && meeting.preferred_time)
    ? new Date(`${meeting.preferred_date} ${meeting.preferred_time}`).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '—';

  return (
    <motion.tr
      variants={fadeUp}
      custom={index}
      className="border-b border-[#C0C5CE]/40 hover:bg-[#F5F7FA]/60 transition-colors duration-150 group"
    >
      <td className="py-4 px-4 text-xs font-bold text-[#1A1A1A]/45 whitespace-nowrap">
        #{meeting.id}
      </td>

      <td className="py-4 px-4">
        <button onClick={onView} className="text-left focus:outline-none block max-w-full">
          <p className="font-bold text-[#1A1A1A] text-sm group-hover:text-[#8C1B2E] transition-colors truncate max-w-[150px] sm:max-w-none">
            {meeting.full_name}
          </p>
          {meeting.email && (
            <p className="text-xs text-[#1A1A1A]/50 mt-0.5 truncate max-w-[150px] sm:max-w-none">{meeting.email}</p>
          )}
        </button>
      </td>

      <td className="py-4 px-4 text-sm text-[#1A1A1A]/60 hidden md:table-cell whitespace-nowrap">
        {formattedStart}
      </td>

      <td className="py-4 px-4 text-sm text-[#1A1A1A]/60 hidden lg:table-cell">
        {meeting.duration ? `${meeting.duration} min` : '—'}
      </td>

      <td className="py-4 px-4 text-sm hidden xl:table-cell max-w-[220px]">
        {meeting.meeting_link ? (
          <a
            href={meeting.meeting_link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[#8C1B2E] font-semibold hover:underline truncate"
          >
            <Link2 className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Join Link</span>
          </a>
        ) : (
          '—'
        )}
      </td>

      <td className="py-4 px-4 text-xs text-[#1A1A1A]/50 hidden sm:table-cell whitespace-nowrap">
        {meeting.created_at
          ? new Date(meeting.created_at).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })
          : '—'}
      </td>

      <td className="py-4 px-4">
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={async (e) => {
              e.stopPropagation();
              try {
                const response = await fetch(
                  `https://terrific-light-production-94ae.up.railway.app/api/zoom/approve/${meeting.id}`,
                  {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                );

                if (response.ok) {
                  alert("Meeting approved successfully!");
                } else {
                  alert("Failed to approve meeting.");
                }
              } catch (error) {
                console.error("Error approving meeting:", error);
                alert("An error occurred while approving the meeting.");
              }
            }}
            className="text-xs font-bold bg-[#8C1B2E] text-white px-3 py-1.5 rounded hover:bg-[#8C1B2E]/90 transition-colors whitespace-nowrap shrink-0"
          >
            Approve
          </button>

          <button
            onClick={onView}
            className="text-xs font-bold text-[#8C1B2E] hover:underline whitespace-nowrap"
          >
            View
          </button>
        </div>
      </td>
    </motion.tr>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ZOOM MEETING DETAIL DRAWER
═══════════════════════════════════════════════════════════════ */
function ZoomMeetingDrawer({
  meeting,
  onClose,
}: {
  meeting: ZoomMeeting | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {meeting && (
        <>
          <motion.div
            key="zm-drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[900]"
            onClick={onClose}
          />
          <motion.div
            key="zm-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: EASE }}
            className="fixed top-0 right-0 h-full w-full max-w-lg bg-white z-[901] shadow-2xl overflow-y-auto"
          >
            <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-[#8C1B2E] to-[#B43A4E]" />

            <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 px-6 pt-6 pb-4 border-b border-[#C0C5CE]/30">
              <div className="flex items-start justify-between">
                <div className="min-w-0 flex-1 pr-2">
                  <SectionLabel>Zoom Meeting Details</SectionLabel>
                  <h3 className="text-xl font-extrabold text-[#1A1A1A] leading-tight break-words">
                    {meeting.full_name}
                  </h3>
                  {meeting.email && (
                    <p className="text-sm text-[#1A1A1A]/50 mt-0.5 break-all">{meeting.email}</p>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-full bg-[#F5F7FA] hover:bg-[#8C1B2E]/10 flex items-center justify-center transition-colors shrink-0 mt-1"
                >
                  <X className="w-4 h-4 text-[#1A1A1A]/60" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-[#1A1A1A]/35 mb-3">
                  Meeting Details
                </p>
                <div className="bg-[#F5F7FA] rounded-2xl p-4 space-y-3">
                  <InfoRow icon={Video} label="Topic" value={meeting.full_name} />
                  {meeting.preferred_date && (
                    <>
                      <div className="h-px bg-[#C0C5CE]/30" />
                      <InfoRow
                        icon={CalendarClock}
                        label="Start Time"
                        value={new Date(`${meeting.preferred_date} ${meeting.preferred_time}`).toLocaleString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      />
                    </>
                  )}
                  {meeting.duration != null && (
                    <>
                      <div className="h-px bg-[#C0C5CE]/30" />
                      <InfoRow icon={Clock} label="Duration" value={`${meeting.duration} minutes`} />
                    </>
                  )}
                </div>
              </div>

              {meeting.meeting_link && (
                <div className="mb-6">
                  <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-[#1A1A1A]/35 mb-3">
                    Join Link
                  </p>
                  <div className="bg-[#F5F7FA] rounded-2xl p-4">
                    <a
                      href={meeting.meeting_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#8C1B2E] hover:underline break-all"
                    >
                      <Link2 className="w-4 h-4 shrink-0" />
                      {meeting.meeting_link}
                    </a>
                  </div>
                </div>
              )}

              {meeting.course && (
                <div className="mb-6">
                  <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-[#1A1A1A]/35 mb-3">
                    Agenda
                  </p>
                  <div className="bg-[#F5F7FA] rounded-2xl p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-white border border-[#C0C5CE]/40 flex items-center justify-center shrink-0 mt-0.5">
                        <MessageSquare className="w-4 h-4 text-[#8C1B2E]" />
                      </div>
                      <p className="text-sm text-[#1A1A1A]/80 leading-relaxed pt-1 break-words">
                        {meeting.course}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mb-2">
                <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-[#1A1A1A]/35 mb-3">
                  Submission Info
                </p>
                <div className="bg-[#F5F7FA] rounded-2xl p-4 space-y-3">
                  <InfoRow icon={FileText} label="Meeting ID" value={`#${meeting.id}`} />
                  {meeting.created_at && (
                    <>
                      <div className="h-px bg-[#C0C5CE]/30" />
                      <InfoRow
                        icon={Calendar}
                        label="Created"
                        value={new Date(meeting.created_at).toLocaleString('en-US', {
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
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════════════
   RESEARCH ORDER DETAIL DRAWER
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

            <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 px-6 pt-6 pb-4 border-b border-[#C0C5CE]/30">
              <div className="flex items-start justify-between">
                <div className="min-w-0 flex-1 pr-2">
                  <SectionLabel>Research Order Details</SectionLabel>
                  <h3 className="text-xl font-extrabold text-[#1A1A1A] leading-tight break-words">
                    {order.full_name}
                  </h3>
                  <p className="text-sm text-[#1A1A1A]/50 mt-0.5 break-all">{order.email}</p>
                </div>
                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-full bg-[#F5F7FA] hover:bg-[#8C1B2E]/10 flex items-center justify-center transition-colors shrink-0 mt-1"
                >
                  <X className="w-4 h-4 text-[#1A1A1A]/60" />
                </button>
              </div>
              <div className="mt-3">
                <ResponseBadge status={order.status} />
              </div>
            </div>

            <div className="p-6">
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
                      <p className="text-sm text-[#1A1A1A]/80 leading-relaxed pt-1 break-words">
                        {order.requirements}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {order.status === 'Responded' && order.last_response && (
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
                        <p className="text-sm text-[#1A1A1A]/80 leading-relaxed break-words">
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

              <div className="space-y-3">
                {order.status !== 'Responded' && (
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
                  {order.status === 'Responded' ? 'Send Another Response' : 'Respond & Notify'}
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
   MAIN PAGE DASHBOARD
═══════════════════════════════════════════════════════════════ */
export default function AdminDashboard() {
  const [view, setView] = useState<DashboardView>('enrollments');

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

  const [emailToast, setEmailToast] = useState(false);
  const [toastCopy, setToastCopy] = useState<{ title: string; subtitle: string }>({
    title: 'Approval email sent',
    subtitle: 'Student has been notified',
  });

  const [researchOrders, setResearchOrders] = useState<ResearchOrder[]>([]);
  const [roLoading, setRoLoading] = useState(true);
  const [roError, setRoError] = useState('');
  const [roSearch, setRoSearch] = useState('');
  const [roRefreshing, setRoRefreshing] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<ResearchOrder | null>(null);

  const [respondTarget, setRespondTarget] = useState<ResearchOrder | null>(null);
  const [sendingResponse, setSendingResponse] = useState(false);

  const [zoomMeetings, setZoomMeetings] = useState<ZoomMeeting[]>([]);
  const [zoomLoading, setZoomLoading] = useState(true);
  const [zoomError, setZoomError] = useState('');
  const [zoomSearch, setZoomSearch] = useState('');
  const [zoomRefreshing, setZoomRefreshing] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<ZoomMeeting | null>(null);

  const handleLogout = useCallback(() => {
    // Standard secure wipe of browser state parameters
    localStorage.clear();
    sessionStorage.clear();
    // Redirect context safely out of user profile
    window.location.href = '/login';
  }, []);

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

  const fetchZoomMeetings = useCallback(async (silent = false) => {
    if (!silent) setZoomLoading(true);
    setZoomRefreshing(true);
    setZoomError('');
    try {
      const res = await fetch(`${API_BASE}/zoom/all`);
      if (!res.ok) throw new Error('Failed to load Zoom meetings');
      const data = await res.json();
      const list: ZoomMeeting[] = data.data || [];
      setZoomMeetings(list);
    } catch (err: unknown) {
      setZoomError(err instanceof Error ? err.message : 'Something went wrong while loading Zoom meetings.');
    } finally {
      setZoomLoading(false);
      setZoomRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchEnrollments();
  }, [fetchEnrollments]);

  useEffect(() => {
    if (view === 'research-orders' && researchOrders.length === 0 && roLoading) {
      fetchResearchOrders();
    }
  }, [view, researchOrders.length, roLoading, fetchResearchOrders]);

  useEffect(() => {
    if (view === 'zoom-meetings' && zoomMeetings.length === 0 && zoomLoading) {
      fetchZoomMeetings();
    }
  }, [view, zoomMeetings.length, zoomLoading, fetchZoomMeetings]);

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

  const roCounts = useMemo(() => ({
    total: researchOrders.length,
    responded: researchOrders.filter((o) => o.status === 'Responded').length,
    awaiting: researchOrders.filter((o) => o.status !== 'Responded').length,
  }), [researchOrders]);

  const filteredMeetings = useMemo(() => {
    const q = zoomSearch.trim().toLowerCase();
    if (!q) return zoomMeetings;
    return zoomMeetings.filter((m) =>
      m.topic?.toLowerCase().includes(q) ||
      m.host_email?.toLowerCase().includes(q) ||
      m.agenda?.toLowerCase().includes(q) ||
      m.full_name?.toLowerCase().includes(q) ||
      m.course?.toLowerCase().includes(q)
    );
  }, [zoomMeetings, zoomSearch]);

  const zoomCounts = useMemo(() => {
    const now = Date.now();
    const upcoming = zoomMeetings.filter((m) => {
      if (!m.preferred_date) return false;
      const dateStr = m.preferred_time ? `${m.preferred_date} ${m.preferred_time}` : m.preferred_date;
      return new Date(dateStr).getTime() >= now;
    }).length;
    return {
      total: zoomMeetings.length,
      upcoming,
      past: zoomMeetings.length - upcoming,
    };
  }, [zoomMeetings]);

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
      setToastCopy({ title: 'Approval email sent', subtitle: 'Student has been notified' });
      setEmailToast(true);
    }
  }, []);

  const performAction = useCallback(
    async (id: string | number, action: 'approve' | 'reject') => {
      setRowAction({ id, action });
      try {
        const url =
          action === "approve"
            ? `${API_BASE}/enroll/${id}/approve`
            : `${API_BASE}/enroll/${id}/reject`;

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
          action === "approve" ? "approved" : "rejected";

        setEnrollments((prev) =>
          prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
        );

        if (selected?.id === id) {
          setSelected({ ...selected, status: newStatus });
        }

        if (action === "approve") {
          setToastCopy({ title: 'Approval email sent', subtitle: 'Student has been notified' });
          setEmailToast(true);
          alert(`Student Approved!\nTemporary Password:\n${data.temporaryPassword || "N/A"}`);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Action failed");
      } finally {
        setRowAction(null);
        setConfirm(null);
      }
    },
    [selected]
  );

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
        try { data = await res.json(); } catch {}

        if (!res.ok) {
          throw new Error(data?.message || 'Failed to send response email');
        }

        const respondedAt = new Date().toISOString();

        setResearchOrders((prev) =>
          prev.map((o) =>
            o.id === order.id
              ? { ...o, status: 'Responded', last_response: message, responded_at: respondedAt }
              : o
          )
        );

        if (selectedOrder?.id === order.id) {
          setSelectedOrder({
            ...selectedOrder,
            status: 'Responded',
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

        <motion.section
          ref={heroRef}
          className="relative gradient-hero text-white overflow-hidden px-4"
          style={{ minHeight: '420px' }}
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
            { cls: '-top-20 -right-20 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px]', dur: 14, delay: 0 },
            { cls: '-bottom-14 -left-14 w-44 sm:w-64 h-44 sm:h-64', dur: 11, delay: 1.5 },
            { cls: 'top-1/2 left-1/4 w-32 sm:w-44 h-32 sm:h-44', dur: 9, delay: 3 },
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
            className="relative z-10 max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center pt-20 pb-16"
          >
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-medium mb-6 sm:mb-8"
            >
              <ShieldCheck className="w-4 h-4 animate-pulse" />
              Admin Control Panel
            </motion.div>

            <div className="perspective-[800px] mb-4 sm:mb-5">
              <AnimatedTitle
                text="Admin Dashboard"
                className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-[1.1] sm:leading-[1.02] tracking-tight block"
              />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
              className="text-sm sm:text-base md:text-xl text-white/80 max-w-xl font-light mb-2 px-2"
            >
              Review, approve, and manage every enrollment and research request in one place
            </motion.p>

            <motion.div className="flex items-center gap-3 mt-4 sm:mt-6">
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

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 flex flex-wrap items-center justify-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                view === 'enrollments'
                  ? fetchEnrollments()
                  : view === 'research-orders'
                    ? fetchResearchOrders()
                    : fetchZoomMeetings()
              }
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 text-xs font-bold text-white hover:bg-white/20 transition-colors focus:outline-none"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${(view === 'enrollments' ? refreshing : view === 'research-orders' ? roRefreshing : zoomRefreshing) ? 'animate-spin' : ''}`} />
              Refresh
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 text-xs font-bold text-white hover:bg-white/20 transition-colors focus:outline-none"
            >
              <LogOut className="w-3.5 h-3.5" />
              Log Out
            </motion.button>
          </div>
        </motion.section>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 bg-white">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-[#F5F7FA] rounded-2xl border border-[#C0C5CE]/60 p-1.5 w-full sm:w-fit mb-10 overflow-x-auto"
          >
            <button
              onClick={() => setView('enrollments')}
              className={`relative flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-colors duration-200 ${
                view === 'enrollments' ? 'text-white' : 'text-[#1A1A1A]/60 hover:text-[#8C1B2E]'
              }`}
            >
              {view === 'enrollments' && (
                <motion.span
                  layoutId="view-pill"
                  className="absolute inset-0 bg-gradient-to-r from-[#8C1B2E] to-[#B43A4E] rounded-xl -z-10"
                  transition={{ duration: 0.3, ease: EASE }}
                />
              )}
              <GraduationCap className="w-4 h-4 shrink-0" />
              <span>Enrollments</span>
            </button>
            <button
              onClick={() => setView('research-orders')}
              className={`relative flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-colors duration-200 ${
                view === 'research-orders' ? 'text-white' : 'text-[#1A1A1A]/60 hover:text-[#8C1B2E]'
              }`}
            >
              {view === 'research-orders' && (
                <motion.span
                  layoutId="view-pill"
                  className="absolute inset-0 bg-gradient-to-r from-[#8C1B2E] to-[#B43A4E] rounded-xl -z-10"
                  transition={{ duration: 0.3, ease: EASE }}
                />
              )}
              <ClipboardList className="w-4 h-4 shrink-0" />
              <span>Research Orders</span>
            </button>
            <button
              onClick={() => setView('zoom-meetings')}
              className={`relative flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-colors duration-200 ${
                view === 'zoom-meetings' ? 'text-white' : 'text-[#1A1A1A]/60 hover:text-[#8C1B2E]'
              }`}
            >
              {view === 'zoom-meetings' && (
                <motion.span
                  layoutId="view-pill"
                  className="absolute inset-0 bg-gradient-to-r from-[#8C1B2E] to-[#B43A4E] rounded-xl -z-10"
                  transition={{ duration: 0.3, ease: EASE }}
                />
              )}
              <Video className="w-4 h-4 shrink-0" />
              <span>Zoom Meetings</span>
            </button>
          </motion.div>

          {/* ════════════════════════════════════════════════════
              ENROLLMENTS VIEW
          ════════════════════════════════════════════════════ */}
          {view === 'enrollments' && (
            <>
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mb-8"
              >
                <SectionLabel>Enrollment Management</SectionLabel>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1A1A1A] mb-2">
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

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-6 flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700"
                  >
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span className="flex-1 break-words">{error}</span>
                    <button onClick={() => setError('')} className="ml-auto shrink-0">
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                variants={stagger}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
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

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                <div className="flex items-center gap-2 bg-white rounded-xl border border-[#C0C5CE]/70 p-1 w-full lg:w-fit overflow-x-auto max-w-full pb-2 lg:pb-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setFilter(tab.key)}
                      className={`relative px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-colors duration-200 flex-1 lg:flex-initial text-center ${
                        filter === tab.key ? 'text-white' : 'text-[#1A1A1A]/60 hover:text-[#8C1B2E]'
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
                      <span className="ml-1 opacity-70">({counts[tab.key]})</span>
                    </button>
                  ))}
                </div>

                <div className="relative w-full lg:w-80 shrink-0">
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

              {!loading && (
                <p className="text-xs text-[#1A1A1A]/40 font-medium mb-4">
                  Showing {filtered.length} of {enrollments.length} enrollment{enrollments.length !== 1 ? 's' : ''}
                  {search ? ` for "${search}"` : ''}
                </p>
              )}

              <div className="bg-white rounded-2xl border border-[#C0C5CE]/60 shadow-sm overflow-hidden w-full">
                {loading ? (
                  <div className="py-24 flex flex-col items-center justify-center text-[#1A1A1A]/40">
                    <div className="w-12 h-12 rounded-full border-4 border-[#8C1B2E]/20 border-t-[#8C1B2E] animate-spin mb-4" />
                    <p className="text-sm font-semibold">Loading enrollments...</p>
                    <p className="text-xs mt-1">Fetching the latest data</p>
                  </div>
                ) : filtered.length === 0 ? (
                  <div className="py-24 flex flex-col items-center justify-center text-[#1A1A1A]/40 px-4">
                    <div className="w-16 h-16 rounded-2xl bg-[#F5F7FA] flex items-center justify-center mb-4">
                      <Inbox className="w-8 h-8" />
                    </div>
                    <p className="text-sm font-bold text-[#1A1A1A]/60 text-center">No enrollments found</p>
                    <p className="text-xs mt-1.5 max-w-xs text-center">
                      {search
                        ? `No results match "${search}". Try a different keyword.`
                        : 'There are no enrollments in this category yet.'}
                    </p>
                    {(search || filter !== 'all') && (
                      <button
                        onClick={() => { setSearch(''); setFilter('all'); }}
                        className="mt-4 text-xs font-bold text-[#8C1B2E] hover:underline focus:outline-none"
                      >
                        Clear filters
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="overflow-x-auto w-full scrollbar-thin">
                    <table className="w-full min-w-[600px] sm:min-w-[700px] lg:min-w-[900px] table-auto">
                      <thead>
                        <tr className="border-b border-[#C0C5CE]/60 bg-[#F5F7FA]/60">
                          <th className="text-left py-3 px-4 text-xs font-bold text-[#1A1A1A]/50 uppercase tracking-wide whitespace-nowrap">
                            Applicant
                          </th>
                          <th className="text-left py-3 px-4 text-xs font-bold text-[#1A1A1A]/50 uppercase tracking-wide hidden lg:table-cell whitespace-nowrap">
                            Course
                          </th>
                          <th className="text-left py-3 px-4 text-xs font-bold text-[#1A1A1A]/50 uppercase tracking-wide hidden xl:table-cell whitespace-nowrap">
                            Phone
                          </th>
                          <th className="text-left py-3 px-4 text-xs font-bold text-[#1A1A1A]/50 uppercase tracking-wide hidden xl:table-cell whitespace-nowrap">
                            Country
                          </th>
                          <th className="text-left py-3 px-4 text-xs font-bold text-[#1A1A1A]/50 uppercase tracking-wide hidden 2xl:table-cell whitespace-nowrap">
                            Education
                          </th>
                          <th className="text-left py-3 px-4 text-xs font-bold text-[#1A1A1A]/50 uppercase tracking-wide hidden md:table-cell whitespace-nowrap">
                            Submitted
                          </th>
                          <th className="text-left py-3 px-4 text-xs font-bold text-[#1A1A1A]/50 uppercase tracking-wide hidden sm:table-cell whitespace-nowrap">
                            Status
                          </th>
                          <th className="text-right py-3 px-4 text-xs font-bold text-[#1A1A1A]/50 uppercase tracking-wide whitespace-nowrap">
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

              {!loading && filtered.length > 0 && (
                <p className="text-xs text-[#1A1A1A]/35 text-center mt-4 font-medium">
                  {filtered.length} record{filtered.length !== 1 ? 's' : ''} displayed
                  {filter !== 'all' ? ` · filtered by "${filter}"` : ''}
                </p>
              )}
            </>
          )}

          {/* ════════════════════════════════════════════════════
              RESEARCH ORDERS VIEW
          ════════════════════════════════════════════════════ */}
          {view === 'research-orders' && (
            <>
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mb-8"
              >
                <SectionLabel>Research Order Management</SectionLabel>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1A1A1A] mb-2">
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

              <AnimatePresence>
                {roError && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-6 flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700"
                  >
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span className="flex-1 break-words">{roError}</span>
                    <button onClick={() => setRoError('')} className="ml-auto shrink-0">
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                variants={stagger}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
              >
                <StatCard
                  label="Total Orders"
                  value={roCounts.total}
                  icon={ClipboardList}
                  index={0}
                  active={true}
                  onClick={() => { }}
                />
                <StatCard
                  label="Awaiting Reply"
                  value={roCounts.awaiting}
                  icon={Clock}
                  index={1}
                  active={false}
                  onClick={() => { }}
                  color="bg-gradient-to-br from-amber-500 to-amber-400"
                />
                <StatCard
                  label="Responded"
                  value={roCounts.responded}
                  icon={CheckCircle2}
                  index={2}
                  active={false}
                  onClick={() => { }}
                  color="bg-gradient-to-br from-emerald-600 to-emerald-500"
                />
              </motion.div>

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

              {!roLoading && (
                <p className="text-xs text-[#1A1A1A]/40 font-medium mb-4">
                  Showing {filteredOrders.length} of {researchOrders.length} order{researchOrders.length !== 1 ? 's' : ''}
                  {roSearch ? ` for "${roSearch}"` : ''}
                </p>
              )}

              <div className="bg-white rounded-2xl border border-[#C0C5CE]/60 shadow-sm overflow-hidden w-full">
                {roLoading ? (
                  <div className="py-24 flex flex-col items-center justify-center text-[#1A1A1A]/40">
                    <div className="w-12 h-12 rounded-full border-4 border-[#8C1B2E]/20 border-t-[#8C1B2E] animate-spin mb-4" />
                    <p className="text-sm font-semibold">Loading research orders...</p>
                    <p className="text-xs mt-1">Fetching the latest data</p>
                  </div>
                ) : filteredOrders.length === 0 ? (
                  <div className="py-24 flex flex-col items-center justify-center text-[#1A1A1A]/40 px-4">
                    <div className="w-16 h-16 rounded-2xl bg-[#F5F7FA] flex items-center justify-center mb-4">
                      <Inbox className="w-8 h-8" />
                    </div>
                    <p className="text-sm font-bold text-[#1A1A1A]/60 text-center">No research orders found</p>
                    <p className="text-xs mt-1.5 max-w-xs text-center">
                      {roSearch
                        ? `No results match "${roSearch}". Try a different keyword.`
                        : 'There are no research orders yet.'}
                    </p>
                    {roSearch && (
                      <button
                        onClick={() => setRoSearch('')}
                        className="mt-4 text-xs font-bold text-[#8C1B2E] hover:underline focus:outline-none"
                      >
                        Clear search
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="overflow-x-auto w-full scrollbar-thin">
                    <table className="w-full min-w-[700px] md:min-w-[850px] lg:min-w-[1000px] table-auto">
                      <thead>
                        <tr className="border-b border-[#C0C5CE]/60 bg-[#F5F7FA]/60">
                          <th className="text-left py-3 px-4 text-xs font-bold text-[#1A1A1A]/50 uppercase tracking-wide whitespace-nowrap">
                            ID
                          </th>
                          <th className="text-left py-3 px-4 text-xs font-bold text-[#1A1A1A]/50 uppercase tracking-wide whitespace-nowrap">
                            Full Name / Email
                          </th>
                          <th className="text-left py-3 px-4 text-xs font-bold text-[#1A1A1A]/50 uppercase tracking-wide hidden lg:table-cell whitespace-nowrap">
                            Phone
                          </th>
                          <th className="text-left py-3 px-4 text-xs font-bold text-[#1A1A1A]/50 uppercase tracking-wide hidden xl:table-cell whitespace-nowrap">
                            Service
                          </th>
                          <th className="text-left py-3 px-4 text-xs font-bold text-[#1A1A1A]/50 uppercase tracking-wide hidden xl:table-cell whitespace-nowrap">
                            Subject
                          </th>
                          <th className="text-left py-3 px-4 text-xs font-bold text-[#1A1A1A]/50 uppercase tracking-wide hidden md:table-cell whitespace-nowrap">
                            Deadline
                          </th>
                          <th className="text-left py-3 px-4 text-xs font-bold text-[#1A1A1A]/50 uppercase tracking-wide hidden 2xl:table-cell whitespace-nowrap">
                            Requirements
                          </th>
                          <th className="text-left py-3 px-4 text-xs font-bold text-[#1A1A1A]/50 uppercase tracking-wide hidden sm:table-cell whitespace-nowrap">
                            Response
                          </th>
                          <th className="text-left py-3 px-4 text-xs font-bold text-[#1A1A1A]/50 uppercase tracking-wide hidden sm:table-cell whitespace-nowrap">
                            Created
                          </th>
                          <th className="text-right py-3 px-4 text-xs font-bold text-[#1A1A1A]/50 uppercase tracking-wide whitespace-nowrap">
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

              {!roLoading && filteredOrders.length > 0 && (
                <p className="text-xs text-[#1A1A1A]/35 text-center mt-4 font-medium">
                  {filteredOrders.length} record{filteredOrders.length !== 1 ? 's' : ''} displayed
                </p>
              )}
            </>
          )}

          {/* ════════════════════════════════════════════════════
              ZOOM MEETINGS VIEW
          ════════════════════════════════════════════════════ */}
          {view === 'zoom-meetings' && (
            <>
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mb-8"
              >
                <SectionLabel>Zoom Meeting Management</SectionLabel>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1A1A1A] mb-2">
                  Scheduled Zoom Meetings
                </h2>
                <p className="text-[#1A1A1A]/55 text-sm sm:text-base max-w-2xl">
                  View every Zoom meeting pulled from the API, including join links and schedule details.
                </p>
              </motion.div>

              <AnimatePresence>
                {zoomError && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 mb-6 text-sm font-medium overflow-hidden"
                  >
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span className="flex-1 break-words">{zoomError}</span>
                    <button onClick={() => setZoomError('')} className="ml-auto shrink-0">
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                variants={stagger}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
              >
                <StatCard
                  label="Total Meetings"
                  value={zoomCounts.total}
                  icon={ClipboardList}
                  index={0}
                  active={true}
                  onClick={() => { }}
                />
                <StatCard
                  label="Upcoming"
                  value={zoomCounts.upcoming}
                  icon={CalendarClock}
                  index={1}
                  active={false}
                  onClick={() => { }}
                  color="bg-gradient-to-br from-amber-500 to-amber-400"
                />
                <StatCard
                  label="Past"
                  value={zoomCounts.past}
                  icon={Clock}
                  index={2}
                  active={false}
                  onClick={() => { }}
                  color="bg-gradient-to-br from-emerald-600 to-emerald-500"
                />
              </motion.div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-4 mb-6">
                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1A1A1A]/40" />
                  <input
                    type="text"
                    value={zoomSearch}
                    onChange={(e) => setZoomSearch(e.target.value)}
                    placeholder="Search topic, host, agenda..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-[#C0C5CE]/70 focus:border-[#8C1B2E] focus:outline-none text-sm text-[#1A1A1A] placeholder:text-[#1A1A1A]/35 bg-white transition-colors duration-200"
                  />
                </div>
              </div>

              {!zoomLoading && (
                <p className="text-xs text-[#1A1A1A]/40 font-medium mb-4">
                  Showing {filteredMeetings.length} of {zoomMeetings.length} meeting{zoomMeetings.length !== 1 ? 's' : ''}
                  {zoomSearch ? ` for "${zoomSearch}"` : ''}
                </p>
              )}

              <div className="bg-white rounded-2xl border border-[#C0C5CE]/60 shadow-sm overflow-hidden w-full">
                {zoomLoading ? (
                  <div className="py-24 flex flex-col items-center justify-center text-[#1A1A1A]/40">
                    <div className="w-12 h-12 rounded-full border-4 border-[#8C1B2E]/20 border-t-[#8C1B2E] animate-spin mb-4" />
                    <p className="text-sm font-semibold">Loading Zoom meetings...</p>
                    <p className="text-xs mt-1">Fetching the latest data</p>
                  </div>
                ) : filteredMeetings.length === 0 ? (
                  <div className="py-24 flex flex-col items-center justify-center text-[#1A1A1A]/40 px-4">
                    <div className="w-16 h-16 rounded-2xl bg-[#F5F7FA] flex items-center justify-center mb-4">
                      <Video className="w-8 h-8" />
                    </div>
                    <p className="text-sm font-bold text-[#1A1A1A]/60 text-center">No Zoom meetings found</p>
                    <p className="text-xs mt-1.5 max-w-xs text-center">
                      {zoomSearch
                        ? `No results match "${zoomSearch}". Try a different keyword.`
                        : 'There are no Zoom meetings yet.'}
                    </p>
                    {zoomSearch && (
                      <button
                        onClick={() => setZoomSearch('')}
                        className="mt-4 text-xs font-bold text-[#8C1B2E] hover:underline focus:outline-none"
                      >
                        Clear search
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="overflow-x-auto w-full scrollbar-thin">
                    <table className="w-full min-w-[650px] md:min-w-[800px] lg:min-w-[950px] table-auto">
                      <thead>
                        <tr className="border-b border-[#C0C5CE]/60 bg-[#F5F7FA]/60">
                          <th className="text-left py-3 px-4 text-xs font-bold text-[#1A1A1A]/50 uppercase tracking-wide whitespace-nowrap">
                            ID
                          </th>
                          <th className="text-left py-3 px-4 text-xs font-bold text-[#1A1A1A]/50 uppercase tracking-wide whitespace-nowrap">
                            Topic / Host
                          </th>
                          <th className="text-left py-3 px-4 text-xs font-bold text-[#1A1A1A]/50 uppercase tracking-wide hidden md:table-cell whitespace-nowrap">
                            Start Time
                          </th>
                          <th className="text-left py-3 px-4 text-xs font-bold text-[#1A1A1A]/50 uppercase tracking-wide hidden lg:table-cell whitespace-nowrap">
                            Duration
                          </th>
                          <th className="text-left py-3 px-4 text-xs font-bold text-[#1A1A1A]/50 uppercase tracking-wide hidden xl:table-cell whitespace-nowrap">
                            Join Link
                          </th>
                          <th className="text-left py-3 px-4 text-xs font-bold text-[#1A1A1A]/50 uppercase tracking-wide hidden sm:table-cell whitespace-nowrap">
                            Created
                          </th>
                          <th className="text-right py-3 px-4 text-xs font-bold text-[#1A1A1A]/50 uppercase tracking-wide whitespace-nowrap">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <motion.tbody variants={stagger} initial="hidden" animate="visible">
                        {filteredMeetings.map((meeting, index) => (
                          <ZoomMeetingRow
                            key={meeting.id}
                            meeting={meeting}
                            index={index}
                            onView={() => setSelectedMeeting(meeting)}
                          />
                        ))}
                      </motion.tbody>
                    </table>
                  </div>
                )}
              </div>

              {!zoomLoading && filteredMeetings.length > 0 && (
                <p className="text-xs text-[#1A1A1A]/35 text-center mt-4 font-medium">
                  {filteredMeetings.length} record{filteredMeetings.length !== 1 ? 's' : ''} displayed
                </p>
              )}
            </>
          )}
        </main>

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

        <ResearchOrderDrawer
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onRespond={(order) => setRespondTarget(order)}
        />

        <ZoomMeetingDrawer
          meeting={selectedMeeting}
          onClose={() => setSelectedMeeting(null)}
        />

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

        <RespondModal
          order={respondTarget}
          onClose={() => (!sendingResponse ? setRespondTarget(null) : undefined)}
          onSend={(message) => sendResearchOrderResponse(message)}
          sending={sendingResponse}
        />

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