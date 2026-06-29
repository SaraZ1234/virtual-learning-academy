'use client';

import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
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
  LogOut,
  User,
  Bell,
  Activity,
  ChevronRight,
  Filter,
  SlidersHorizontal,
  Calendar,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState, useCallback, useRef } from 'react';

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

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

/* ═══════════════════════════════════════════════════════════════
   PARTICLES
═══════════════════════════════════════════════════════════════ */
function Particles() {
  const dots = Array.from({ length: 18 }, (_, i) => ({
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
          animate={{ opacity: [0, 0.4, 0], y: [0, -28, -56], scale: [1, 1.2, 0.6] }}
          transition={{ duration: d.dur, delay: d.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
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

interface StudentUser {
  name?: string;
  full_name?: string;
  email?: string;
  phone?: string;
}

type FilterTab = 'all' | EnrollmentStatus;

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

/* ═══════════════════════════════════════════════════════════════
   STAT CARD
═══════════════════════════════════════════════════════════════ */
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
  color: string;
}) {
  return (
    <motion.button
      onClick={onClick}
      variants={fadeUp}
      custom={index}
      whileHover={{ y: -4, boxShadow: '0 16px 32px rgba(140,27,46,0.10)' }}
      whileTap={{ scale: 0.98 }}
      className={`relative text-left bg-white rounded-2xl border p-5 flex flex-col gap-3 transition-all duration-200 w-full ${active ? 'border-[#8C1B2E] ring-2 ring-[#8C1B2E]/15' : 'border-[#C0C5CE]/70'
        }`}
    >
      <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center shadow-md shrink-0`}>
        <Icon className="w-4.5 h-4.5 text-white" />
      </div>
      <div>
        <p className="text-2xl font-extrabold text-[#1A1A1A] leading-none">{value}</p>
        <p className="text-xs font-semibold text-[#1A1A1A]/50 uppercase tracking-wide mt-1">{label}</p>
      </div>
    </motion.button>
  );
}

/* ═══════════════════════════════════════════════════════════════
   STUDENT INFO CARD
═══════════════════════════════════════════════════════════════ */
function StudentInfoCard({
  user,
  enrollments,
}: {
  user: StudentUser | null;
  enrollments: Enrollment[];
}) {
  const latestCourse = enrollments[0]?.course || '—';

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="bg-white rounded-2xl border border-[#C0C5CE]/60 shadow-sm overflow-hidden mb-8"
    >
      {/* Accent bar */}
      <div className="h-[4px] bg-gradient-to-r from-[#8C1B2E] to-[#B43A4E]" />
      <div className="p-6">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#8C1B2E] to-[#B43A4E] flex items-center justify-center shadow-lg shrink-0">
            <span className="text-white font-extrabold text-2xl">
              {(user?.full_name || user?.name || 'S').charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <SectionLabel>Student Profile</SectionLabel>
            <h3 className="text-xl font-extrabold text-[#1A1A1A] truncate">
              {user?.full_name || user?.name || 'Student'}
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <ProfileField icon={User} label="Full Name" value={user?.full_name || user?.name || '—'} />
          <ProfileField icon={Mail} label="Email" value={user?.email || '—'} />
          <ProfileField icon={Phone} label="Phone" value={user?.phone || '—'} />
          <ProfileField icon={BookOpen} label="Latest Course" value={latestCourse} />
        </div>
      </div>
    </motion.div>
  );
}

function ProfileField({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 bg-[#F5F7FA] rounded-xl px-4 py-3">
      <div className="w-8 h-8 rounded-lg bg-white border border-[#C0C5CE]/60 flex items-center justify-center shrink-0 mt-0.5">
        <Icon className="w-3.5 h-3.5 text-[#8C1B2E]" />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-bold text-[#1A1A1A]/45 uppercase tracking-wide">{label}</p>
        <p className="text-sm font-semibold text-[#1A1A1A] truncate mt-0.5">{value}</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   RECENT ACTIVITY
═══════════════════════════════════════════════════════════════ */
function RecentActivity({ enrollments }: { enrollments: Enrollment[] }) {
  const activities = useMemo(() => {
    return [...enrollments]
      .sort((a, b) => {
        const da = a.created_at ? new Date(a.created_at).getTime() : 0;
        const db = b.created_at ? new Date(b.created_at).getTime() : 0;
        return db - da;
      })
      .slice(0, 5)
      .map((e) => ({
        id: e.id,
        title:
          e.status === 'approved'
            ? `Enrolled in ${e.course}`
            : e.status === 'rejected'
              ? `Application rejected for ${e.course}`
              : `Application submitted for ${e.course}`,
        time: e.created_at ? new Date(e.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recently',
        status: e.status,
        icon: e.status === 'approved' ? CheckCircle2 : e.status === 'rejected' ? XCircle : Clock,
        color:
          e.status === 'approved'
            ? 'text-emerald-500 bg-emerald-50'
            : e.status === 'rejected'
              ? 'text-red-500 bg-red-50'
              : 'text-amber-500 bg-amber-50',
      }));
  }, [enrollments]);

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="bg-white rounded-2xl border border-[#C0C5CE]/60 shadow-sm overflow-hidden"
    >
      <div className="p-6 border-b border-[#C0C5CE]/40">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#8C1B2E] to-[#B43A4E] flex items-center justify-center shadow-md">
            <Activity className="w-4 h-4 text-white" />
          </div>
          <div>
            <SectionLabel>Activity</SectionLabel>
            <h3 className="text-lg font-extrabold text-[#1A1A1A] -mt-1">Recent Activity</h3>
          </div>
        </div>
      </div>

      {activities.length === 0 ? (
        <div className="py-12 flex flex-col items-center justify-center text-[#1A1A1A]/40">
          <Activity className="w-8 h-8 mb-2" />
          <p className="text-sm font-semibold">No activity yet</p>
        </div>
      ) : (
        <div className="divide-y divide-[#C0C5CE]/30">
          {activities.map((act, i) => {
            const Icon = act.icon;
            return (
              <motion.div
                key={act.id}
                variants={fadeUp}
                custom={i}
                className="flex items-start gap-4 px-6 py-4 hover:bg-[#F5F7FA]/60 transition-colors"
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${act.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#1A1A1A] leading-snug">{act.title}</p>
                  <p className="text-xs text-[#1A1A1A]/45 mt-0.5 flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {act.time}
                  </p>
                </div>
                <StatusBadge status={act.status} />
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   NOTIFICATIONS
═══════════════════════════════════════════════════════════════ */
function Notifications({ enrollments }: { enrollments: Enrollment[] }) {
  const notifications = useMemo(() => {
    const items: { id: string | number; message: string; type: 'success' | 'warning' | 'info' }[] = [];

    enrollments.forEach((e) => {
      if (e.status === 'approved') {
        items.push({
          id: `approved-${e.id}`,
          message: `Your application for "${e.course}" has been approved! Check your email for next steps.`,
          type: 'success',
        });
      } else if (e.status === 'rejected') {
        items.push({
          id: `rejected-${e.id}`,
          message: `Your application for "${e.course}" was not approved. Contact us for more information.`,
          type: 'warning',
        });
      }
    });

    const pending = enrollments.filter((e) => e.status === 'pending').length;
    if (pending > 0) {
      items.push({
        id: 'pending-summary',
        message: `You have ${pending} application${pending > 1 ? 's' : ''} currently under review. We'll notify you once a decision is made.`,
        type: 'info',
      });
    }

    if (items.length === 0) {
      items.push({ id: 'welcome', message: 'Welcome to your dashboard! Apply for a course to get started.', type: 'info' });
    }

    return items.slice(0, 4);
  }, [enrollments]);

  const styles = {
    success: { wrap: 'bg-emerald-50 border-emerald-200', icon: 'text-emerald-500', dot: 'bg-emerald-500' },
    warning: { wrap: 'bg-red-50 border-red-200', icon: 'text-red-500', dot: 'bg-red-500' },
    info: { wrap: 'bg-blue-50 border-blue-200', icon: 'text-blue-500', dot: 'bg-blue-500' },
  };

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="bg-white rounded-2xl border border-[#C0C5CE]/60 shadow-sm overflow-hidden"
    >
      <div className="p-6 border-b border-[#C0C5CE]/40">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#8C1B2E] to-[#B43A4E] flex items-center justify-center shadow-md">
              <Bell className="w-4 h-4 text-white" />
            </div>
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#8C1B2E] rounded-full flex items-center justify-center text-white text-[9px] font-bold">
                {notifications.length}
              </span>
            )}
          </div>
          <div>
            <SectionLabel>Alerts</SectionLabel>
            <h3 className="text-lg font-extrabold text-[#1A1A1A] -mt-1">Notifications</h3>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {notifications.map((n, i) => {
          const s = styles[n.type];
          return (
            <motion.div
              key={n.id}
              variants={fadeUp}
              custom={i}
              className={`flex items-start gap-3 border rounded-xl px-4 py-3 ${s.wrap}`}
            >
              <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${s.dot}`} />
              <p className={`text-sm font-medium leading-relaxed ${s.icon}`}>{n.message}</p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   DETAIL DRAWER
═══════════════════════════════════════════════════════════════ */
function DetailDrawer({ enrollment, onClose }: { enrollment: Enrollment | null; onClose: () => void }) {
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
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[901] shadow-2xl overflow-y-auto"
          >
            <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-[#8C1B2E] to-[#B43A4E]" />
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <SectionLabel>Enrollment Details</SectionLabel>
                  <h3 className="text-xl font-extrabold text-[#1A1A1A]">{enrollment.course}</h3>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-[#F5F7FA] hover:bg-[#8C1B2E]/10 flex items-center justify-center transition-colors shrink-0"
                >
                  <X className="w-4 h-4 text-[#1A1A1A]/60" />
                </button>
              </div>

              <div className="mb-6">
                <StatusBadge status={enrollment.status} />
              </div>

              {enrollment.status === 'pending' && (
                <div className="mb-6 flex items-start gap-2.5 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-700">
                  <Clock className="w-4 h-4 shrink-0 mt-0.5" />
                  Your application is under review. We'll notify you by email once a decision is made.
                </div>
              )}
              {enrollment.status === 'approved' && (
                <div className="mb-6 flex items-start gap-2.5 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 text-sm text-emerald-700">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  You're enrolled! Check your email for class access details.
                </div>
              )}
              {enrollment.status === 'rejected' && (
                <div className="mb-6 flex items-start gap-2.5 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
                  <XCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  This application wasn't approved. Contact us if you'd like more details.
                </div>
              )}

              <div className="space-y-4">
                <InfoRow icon={BookOpen} label="Course" value={enrollment.course} />
                <InfoRow icon={Mail} label="Email" value={enrollment.email} />
                <InfoRow icon={Phone} label="Phone" value={enrollment.phone} />
                {enrollment.education && (
                  <InfoRow icon={GraduationCap} label="Qualification" value={enrollment.education} />
                )}
                {enrollment.message && (
                  <InfoRow icon={MessageSquare} label="Your Message" value={enrollment.message} multiline />
                )}
                {enrollment.created_at && (
                  <InfoRow icon={Clock} label="Submitted" value={new Date(enrollment.created_at).toLocaleString()} />
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function InfoRow({ icon: Icon, label, value, multiline }: { icon: any; label: string; value: string; multiline?: boolean }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-9 h-9 rounded-lg bg-[#F5F7FA] flex items-center justify-center shrink-0 mt-0.5">
        <Icon className="w-4 h-4 text-[#8C1B2E]" />
      </div>
      <div className="flex-1">
        <p className="text-xs font-bold text-[#1A1A1A]/45 uppercase tracking-wide mb-0.5">{label}</p>
        <p className={`text-sm text-[#1A1A1A] ${multiline ? 'leading-relaxed' : ''}`}>{value}</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TABLE ROW
═══════════════════════════════════════════════════════════════ */
function EnrollmentRow({ enrollment, index, onView }: { enrollment: Enrollment; index: number; onView: () => void }) {
  return (
    <motion.tr
      variants={fadeUp}
      custom={index}
      className="border-b border-[#C0C5CE]/40 hover:bg-[#F5F7FA]/60 transition-colors duration-150 group cursor-pointer"
      onClick={onView}
    >
      <td className="py-4 px-4">
        <p className="font-bold text-[#1A1A1A] text-sm group-hover:text-[#8C1B2E] transition-colors">
          {enrollment.course}
        </p>
      </td>
      <td className="py-4 px-4 text-sm text-[#1A1A1A]/60 hidden md:table-cell">
        <span className="inline-flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-[#8C1B2E]/60" />
          {enrollment.created_at ? new Date(enrollment.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
        </span>
      </td>
      <td className="py-4 px-4">
        <StatusBadge status={enrollment.status} />
      </td>
      <td className="py-4 px-4 text-right">
        <button
          onClick={(e) => { e.stopPropagation(); onView(); }}
          className="inline-flex items-center gap-1 text-xs font-bold text-[#8C1B2E] hover:underline"
        >
          View <ChevronRight className="w-3 h-3" />
        </button>
      </td>
    </motion.tr>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════ */
export default function StudentDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<StudentUser | null>(null);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<FilterTab>('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Enrollment | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('user');
      if (stored) setUser(JSON.parse(stored));
    } catch { /* ignore */ }
  }, []);

  const fetchEnrollments = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    setRefreshing(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE}/student/enrollments`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!res.ok) throw new Error('Failed to load your enrollments');
      const data = await res.json();
      const list: Enrollment[] = Array.isArray(data) ? data : data.enrollments || [];
      setEnrollments(list.map((e: any) => ({
        ...e, status: (e.status || "Pending").toLowerCase() as EnrollmentStatus,
      }))
      );
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong while loading your enrollments.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { fetchEnrollments(); }, [fetchEnrollments]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  }, [router]);

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
      const matchesSearch = !q || e.course?.toLowerCase().includes(q);
      return matchesFilter && matchesSearch;
    });
  }, [enrollments, filter, search]);

  const tabs: { key: FilterTab; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'pending', label: 'Pending' },
    { key: 'approved', label: 'Approved' },
    { key: 'rejected', label: 'Rejected' },
  ];

  const displayName = user?.full_name || user?.name || 'Student';

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#F5F7FA] overflow-x-hidden">
        <ScrollProgress />

        {/* ╔══════════════════════════════════════════════════╗
            ║  HERO / WELCOME BANNER                          ║
            ╚══════════════════════════════════════════════════╝ */}
        <section className="relative bg-gradient-to-br from-[#6B0E1E] via-[#8C1B2E] to-[#B43A4E] text-white overflow-hidden">
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

          {/* Orbs */}
          {[
            { cls: '-top-20 -right-20 w-[360px] h-[360px]', dur: 14, delay: 0 },
            { cls: '-bottom-12 -left-12 w-56 h-56', dur: 11, delay: 1.5 },
          ].map((orb, i) => (
            <motion.div
              key={i}
              aria-hidden
              className={`absolute rounded-full bg-white/5 ${orb.cls}`}
              animate={{ scale: [1, 1.1, 1], rotate: [0, 8, 0] }}
              transition={{ duration: orb.dur, repeat: Infinity, ease: 'easeInOut', delay: orb.delay }}
            />
          ))}
          <Particles />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            {/* Left: Welcome */}
            <div>
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="text-white/70 text-sm font-medium mb-1"
              >
                Student Portal
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
                className="text-3xl md:text-4xl font-extrabold tracking-tight"
              >
                Welcome Back,{' '}
                <span className="text-white/90">{displayName}</span> 👋
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="text-white/65 text-sm mt-1"
              >
                Track and manage your course applications from here
              </motion.p>
            </div>

            {/* Right: Utility buttons */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
              className="flex items-center gap-3 shrink-0"
            >
              <button
                onClick={() => fetchEnrollments()}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2.5 text-xs font-bold text-white hover:bg-white/20 transition-colors"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2.5 text-xs font-bold text-white hover:bg-white/20 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                Log Out
              </button>
            </motion.div>
          </div>
        </section>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

          {/* ── Error banner ────────────────────────────────── */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700"
              >
                <AlertTriangle className="w-4 h-4 shrink-0" />
                {error}
                <button onClick={() => setError('')} className="ml-auto"><X className="w-4 h-4" /></button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Student Information Card ─────────────────────── */}
          <StudentInfoCard user={user} enrollments={enrollments} />

          {/* ── Statistics ───────────────────────────────────── */}
          <div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-4">
              <SectionLabel>Overview</SectionLabel>
              <h2 className="text-2xl font-extrabold text-[#1A1A1A]">Statistics</h2>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              <StatCard label="Total" value={counts.all} icon={Inbox} index={0} active={filter === 'all'} onClick={() => setFilter('all')} color="bg-gradient-to-br from-[#8C1B2E] to-[#B43A4E]" />
              <StatCard label="Pending" value={counts.pending} icon={Clock} index={1} active={filter === 'pending'} onClick={() => setFilter('pending')} color="bg-gradient-to-br from-amber-500 to-amber-600" />
              <StatCard label="Approved" value={counts.approved} icon={CheckCircle2} index={2} active={filter === 'approved'} onClick={() => setFilter('approved')} color="bg-gradient-to-br from-emerald-500 to-emerald-600" />
              <StatCard label="Rejected" value={counts.rejected} icon={XCircle} index={3} active={filter === 'rejected'} onClick={() => setFilter('rejected')} color="bg-gradient-to-br from-red-500 to-red-600" />
            </motion.div>
          </div>

          {/* ── My Enrollments ───────────────────────────────── */}
          <div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-5">
              <SectionLabel>Applications</SectionLabel>
              <h2 className="text-2xl font-extrabold text-[#1A1A1A] mb-1">My Enrollments</h2>
              <motion.div
                className="h-[3px] bg-[#8C1B2E] rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
              />
            </motion.div>

            {/* Search + Filter bar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              {/* Search */}
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1A1A1A]/40" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search courses..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-[#C0C5CE]/70 focus:border-[#8C1B2E] focus:outline-none text-sm text-[#1A1A1A] placeholder:text-[#1A1A1A]/35 bg-white transition-colors duration-200 shadow-sm"
                />
              </div>

              {/* Filter tabs */}
              <div className="flex items-center gap-2 bg-white rounded-xl border border-[#C0C5CE]/70 p-1 w-fit overflow-x-auto shadow-sm">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#1A1A1A]/40 ml-1 shrink-0" />
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setFilter(tab.key)}
                    className={`relative px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors duration-200 ${filter === tab.key ? 'text-white' : 'text-[#1A1A1A]/60 hover:text-[#8C1B2E]'
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
                    <span className="ml-1 opacity-60">({counts[tab.key]})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-[#C0C5CE]/60 shadow-sm overflow-hidden">
              {loading ? (
                <div className="py-20 flex flex-col items-center justify-center text-[#1A1A1A]/40">
                  <RefreshCw className="w-6 h-6 animate-spin mb-3" />
                  <p className="text-sm font-semibold">Loading your enrollments...</p>
                </div>
              ) : filtered.length === 0 ? (
                <div className="py-20 flex flex-col items-center justify-center text-[#1A1A1A]/40">
                  <Inbox className="w-10 h-10 mb-3" />
                  <p className="text-sm font-semibold">No enrollments found</p>
                  <p className="text-xs mt-1">
                    {enrollments.length === 0 ? "You haven't applied to any courses yet" : 'Try adjusting your filters or search'}
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#C0C5CE]/60 bg-[#F5F7FA]/80">
                        <th className="text-left py-3 px-4 text-xs font-bold text-[#1A1A1A]/50 uppercase tracking-wide">
                          Course
                        </th>
                        <th className="text-left py-3 px-4 text-xs font-bold text-[#1A1A1A]/50 uppercase tracking-wide hidden md:table-cell">
                          Applied Date
                        </th>
                        <th className="text-left py-3 px-4 text-xs font-bold text-[#1A1A1A]/50 uppercase tracking-wide">
                          Status
                        </th>
                        <th className="text-right py-3 px-4 text-xs font-bold text-[#1A1A1A]/50 uppercase tracking-wide">
                          View
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
                        />
                      ))}
                    </motion.tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* ── Recent Activity + Notifications ──────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RecentActivity enrollments={enrollments} />
            <Notifications enrollments={enrollments} />
          </div>

        </main>

        {/* ── Detail drawer ─────────────────────────────────── */}
        <DetailDrawer enrollment={selected} onClose={() => setSelected(null)} />
      </div>

      <Footer />
    </>
  );
}
