'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, CheckCircle, User, Mail, Phone, GraduationCap, 
  ChevronDown, Send, Loader2 
} from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1];

interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseName: string;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function EnrollmentModal({ isOpen, onClose, courseName }: EnrollmentModalProps) {
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          course: courseName,
          education: formData.qualification,
          message: formData.message,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setStatus("success");
        setFormData({ fullName: "", email: "", phone: "", qualification: "", experience: "", message: "" });
      } else {
        throw new Error(data.message || "Submission failed");
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    }
  };

  const handleClose = () => {
    if (status === 'submitting') return;
    setStatus('idle');
    setErrorMsg('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1000]"
            onClick={handleClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed inset-0 z-[1001] flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative bg-gradient-to-b from-[#FBFBFC] to-[#E9EAED] rounded-2xl shadow-2xl ring-1 ring-black/5 w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-[#8C1B2E] to-[#B43A4E] rounded-t-2xl" />
              <div className="flex items-start justify-between p-6 pb-4 pt-7">
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-[#1A1A1A]">Enroll in {courseName}</h3>
                  <p className="text-sm text-[#1A1A1A]/60 mt-1">Fill in your details to get started.</p>
                </div>
                <button onClick={handleClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>

              {status === 'success' ? (
                <div className="px-6 pb-8 text-center flex flex-col items-center">
                  <div className="w-20 h-20 bg-[#8C1B2E] rounded-full flex items-center justify-center mb-4 shadow-lg">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Enrollment Submitted!</h4>
                  <button onClick={handleClose} className="bg-[#8C1B2E] text-white px-8 py-2 rounded-xl font-bold">Close</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase mb-1">Full Name *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 outline-none focus:border-[#8C1B2E] text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase mb-1">Email *</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 outline-none focus:border-[#8C1B2E] text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase mb-1">Phone *</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 outline-none focus:border-[#8C1B2E] text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase mb-1">Qualification *</label>
                    <select name="qualification" required value={formData.qualification} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border-2 outline-none focus:border-[#8C1B2E] text-sm bg-white">
                      <option value="">Select Qualification</option>
                      <option value="High School">High School</option>
                      <option value="Bachelor's">Bachelor's Degree</option>
                      <option value="Master's">Master's Degree</option>
                    </select>
                  </div>
                  {status === 'error' && <p className="text-red-500 text-xs">{errorMsg}</p>}
                  <button type="submit" disabled={status === 'submitting'} className="w-full bg-[#8C1B2E] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2">
                    {status === 'submitting' ? <Loader2 className="animate-spin w-4 h-4" /> : <><Send className="w-4 h-4" /> Submit Enrollment</>}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}