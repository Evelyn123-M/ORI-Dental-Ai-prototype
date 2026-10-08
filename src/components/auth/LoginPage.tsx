import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, ArrowRight, ShieldCheck, ArrowLeft, CheckCircle2, User } from 'lucide-react';
import { UserProfile } from '../../types';
import { DOCTORS_AND_STAFF } from '../../data/mockData';

interface LoginPageProps {
  onLoginSuccess: (user: UserProfile) => void;
  onBackToLanding: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onBackToLanding }) => {
  const [email, setEmail] = useState('diane.uwase@oridental.rw');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Match entered email against mock users or default to Dr Diane
    const matched = DOCTORS_AND_STAFF.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (matched) {
      onLoginSuccess(matched);
    } else {
      // Allow custom email with dentist role
      onLoginSuccess({
        id: 'usr-custom',
        name: email.split('@')[0],
        email: email,
        role: 'dentist',
        roleTitle: 'Dental Clinician',
        avatar: '/src/assets/images/dentist_female_portrait_1791468897572.jpg',
        lastActive: 'Just now',
        status: 'active'
      });
    }
  };

  const handleQuickLogin = (user: UserProfile) => {
    setEmail(user.email);
    setPassword('••••••••••••');
    onLoginSuccess(user);
  };

  const handlePasswordReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (resetEmail) {
      setResetSent(true);
      setTimeout(() => {
        setResetSent(false);
        setIsResetModalOpen(false);
        setResetEmail('');
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#FFFFFF]">
      {/* Left Half: Moving/Ken-Burns Hero Photo with Scrim */}
      <div className="lg:w-1/2 relative bg-[#1F3B45] overflow-hidden min-h-[300px] lg:min-h-screen flex flex-col justify-between p-8 sm:p-12 text-white">
        <img
          src="/src/assets/images/hero_dentist_patient_1791468873741.jpg"
          alt="Dental Clinical Practice"
          className="absolute inset-0 w-full h-full object-cover scale-105 animate-pulse duration-[8000ms]"
          referrerPolicy="no-referrer"
        />

        {/* Deep Teal Scrim */}
        <div className="absolute inset-0 bg-[#1F3B45]/70 backdrop-blur-2xs" />

        {/* Top Header */}
        <div className="relative z-10 flex items-center justify-between">
          <button
            onClick={onBackToLanding}
            className="flex items-center gap-2 text-xs font-semibold text-white/90 hover:text-white glass-pill px-4 py-2 rounded-full transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Public Website</span>
          </button>

          <span className="glass-pill px-3 py-1 rounded-full text-[11px] font-mono text-cyan-200">
            Kigali, Rwanda
          </span>
        </div>

        {/* Center Quotation & Typography */}
        <div className="relative z-10 max-w-lg my-auto py-12">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md text-white flex items-center justify-center mb-6 border border-white/30 shadow-lg">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
              <path d="M12 2C8 2 6 5 6 8c0 4 1.5 7 2 11 .3 2.5 1.5 3 2.5 3s1.5-1.5 1.5-3.5c0-1.5 0-1.5 0-2.5 0 1 0 1 0 2.5 0 2 0.5 3.5 1.5 3.5s2.2-.5 2.5-3c.5-4 2-7 2-11 0-3-2-6-6-6z" />
            </svg>
          </div>

          <h1 className="text-3xl sm:text-5xl font-medium tracking-tight text-white leading-tight">
            Better insight.
            <br />
            Confident care.
          </h1>

          <p className="mt-4 text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
            ORI Dental AI empowers clinicians at ORI Dental Clinic (Kicukiro, Masaka) with rapid panoramic teeth segmentation and symptom correlation.
          </p>

          <div className="mt-8 pt-6 border-t border-white/20 flex items-center gap-4 text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#22A6C0]" />
              <span>Doctor-in-the-loop Mandate</span>
            </div>
            <span>·</span>
            <div>
              <span>AUCA Informatics Research</span>
            </div>
          </div>
        </div>

        {/* Bottom copyright notice */}
        <div className="relative z-10 text-[11px] text-slate-300">
          © 2026 ORI Dental AI · Clinical Practice Portal
        </div>
      </div>

      {/* Right Half: Form + Quick Demo Login */}
      <div className="lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-[#F5F7F8]">
        <div className="w-full max-w-md bg-white rounded-[28px] p-8 sm:p-10 border border-[#E6EAEC] shadow-xl">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#22A6C0]"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#22A6C0]">
                Clinical Authentication
              </span>
            </div>
            <h2 className="text-2xl font-bold text-[#0F1A1F] tracking-tight">
              Sign in to ORI Dental AI
            </h2>
            <p className="text-xs text-[#8F9AA0] mt-1">
              Enter your clinical credentials or use one-click demo roles below.
            </p>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-[#D9534F]">
              {errorMsg}
            </div>
          )}

          {/* Standard Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#0F1A1F] mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#8F9AA0] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@oridental.rw"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#F5F7F8] rounded-full text-xs text-[#0F1A1F] border border-[#E6EAEC] focus:border-[#22A6C0] outline-none transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0F1A1F] mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#8F9AA0] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-10 py-2.5 bg-[#F5F7F8] rounded-full text-xs text-[#0F1A1F] border border-[#E6EAEC] focus:border-[#22A6C0] outline-none transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8F9AA0] hover:text-[#0F1A1F]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-[#0F1A1F]">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  className="rounded text-[#22A6C0] focus:ring-[#22A6C0]"
                />
                <span>Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => setIsResetModalOpen(true)}
                className="text-[#22A6C0] hover:underline font-medium"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Pill Button */}
            <button
              type="submit"
              className="w-full group flex items-center justify-center gap-3 py-3 rounded-full bg-[#0F1A1F] text-white font-semibold text-xs hover:bg-slate-800 transition-all shadow-md mt-2"
            >
              <span>Sign In to Dashboard</span>
              <span className="w-6 h-6 rounded-full bg-[#22A6C0] text-white flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </button>
          </form>

          {/* Quick Demo Login Switcher */}
          <div className="mt-8 pt-6 border-t border-[#F0F3F5]">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#8F9AA0] mb-3 text-center">
              Quick Demo Login (Select Role):
            </p>
            <div className="space-y-2">
              {DOCTORS_AND_STAFF.map(u => (
                <button
                  key={u.id}
                  onClick={() => handleQuickLogin(u)}
                  className="w-full flex items-center justify-between p-2.5 rounded-2xl bg-[#F5F7F8] hover:bg-[#E3F4F8] border border-[#E6EAEC] hover:border-[#22A6C0]/40 transition-all text-left group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={u.avatar}
                      alt={u.name}
                      referrerPolicy="no-referrer"
                      className="w-8 h-8 rounded-full object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-semibold text-xs text-[#0F1A1F] truncate group-hover:text-[#22A6C0]">
                        {u.name}
                      </p>
                      <p className="text-[10px] text-[#8F9AA0] truncate">{u.roleTitle}</p>
                    </div>
                  </div>
                  <span className="shrink-0 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase font-mono bg-white text-[#22A6C0] border border-[#22A6C0]/20">
                    {u.role}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Reset Modal */}
      {isResetModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-[24px] p-6 max-w-md w-full shadow-2xl border border-[#E6EAEC]">
            <h3 className="text-lg font-bold text-[#0F1A1F]">Reset Clinical Account Password</h3>
            <p className="text-xs text-[#8F9AA0] mt-1 mb-4">
              Enter your clinical email to receive a secure time-limited reset code.
            </p>

            {resetSent ? (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-[#1F9D74] flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>
                  Password reset link has been dispatched to <strong>{resetEmail}</strong>. Please check your inbox.
                </span>
              </div>
            ) : (
              <form onSubmit={handlePasswordReset} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#0F1A1F] mb-1">
                    Registered Email
                  </label>
                  <input
                    type="email"
                    value={resetEmail}
                    onChange={e => setResetEmail(e.target.value)}
                    placeholder="doctor@oridental.rw"
                    className="w-full px-4 py-2.5 bg-[#F5F7F8] rounded-full text-xs text-[#0F1A1F] border border-[#E6EAEC] outline-none"
                    required
                  />
                </div>
                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsResetModalOpen(false)}
                    className="px-4 py-2 rounded-full text-xs text-[#8F9AA0] hover:text-[#0F1A1F]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-full bg-[#22A6C0] text-white text-xs font-semibold hover:bg-[#1B899F]"
                  >
                    Send Reset Link
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
