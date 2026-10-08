import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Play,
  Check,
  Stethoscope,
  Scan,
  Layers,
  ShieldCheck,
  Activity,
  Calendar,
  Clock,
  MapPin,
  Mail,
  Phone,
  Sparkles,
  Award,
  Menu,
  X
} from 'lucide-react';
import { VideoModal } from './VideoModal';

interface LandingPageProps {
  onSignIn: () => void;
  onExploreDemo: () => void;
}

const HERO_SLIDES = [
  {
    image: '/src/assets/images/hero_dentist_patient_1791468873741.jpg',
    tag: 'Clinical Examination & Triage',
    titleLine1: 'Smarter Dental Care,',
    titleLine2: 'Confident Decisions',
    desc: 'AI-assisted symptom analysis, X-ray review and treatment planning — every result confirmed by a qualified dentist.',
  },
  {
    image: '/src/assets/images/patient_smile_chair_1791468919257.jpg',
    tag: 'Patient-Centered Dentistry',
    titleLine1: 'Precision AI Support,',
    titleLine2: 'Clinician Oversight',
    desc: 'Comprehensive Bayesian diagnostics designed specifically for modern clinical practices in Kigali.',
  },
  {
    image: '/src/assets/images/modern_dental_clinic_room_1791468908603.jpg',
    tag: 'Next-Generation Clinic Infrastructure',
    titleLine1: 'Integrated Workflows,',
    titleLine2: 'Zero Compromise',
    desc: 'Empowering oral healthcare practitioners with automated radiographic segmentation and treatment cost projections.',
  },
];

export const LandingPage: React.FC<LandingPageProps> = ({ onSignIn, onExploreDemo }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribedToast, setSubscribedToast] = useState(false);
  const [featureIndex, setFeatureIndex] = useState(0);

  // Auto crossfade hero slideshow every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrevSlide = () => {
    setCurrentSlide(prev => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribedToast(true);
      setTimeout(() => setSubscribedToast(false), 4000);
      setNewsletterEmail('');
    }
  };

  const features = [
    {
      title: 'AI Symptom Analysis',
      desc: 'Bayesian correlation of patient complaints with dental pathologies like pulpitis and periodontitis.',
      icon: Activity,
      tag: 'Bayesian Model 2.4',
      image: '/src/assets/images/hero_dentist_patient_1791468873741.jpg',
    },
    {
      title: 'AI Dental X-Ray Review',
      desc: 'Automated panoramic OPG and bitewing segmentation detecting caries, bone loss and impactions.',
      icon: Scan,
      tag: 'Direct DICOM / OPG',
      image: '/src/assets/images/modern_dental_clinic_room_1791468908603.jpg',
    },
    {
      title: 'Treatment Planning Support',
      desc: 'Phased multi-stage procedural pathways with automated cost estimates in Rwandan Francs (RWF).',
      icon: Layers,
      tag: 'Phased Protocols',
      image: '/src/assets/images/patient_smile_chair_1791468919257.jpg',
    },
    {
      title: 'Professional Review & Signature',
      desc: 'Cryptographic digital signature ensuring dentist oversight before any final clinical decision.',
      icon: ShieldCheck,
      tag: 'RMC Regulatory Ready',
      image: '/src/assets/images/dentist_female_portrait_1791468997572.jpg',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#0F1A1F] selection:bg-[#22A6C0]/20 selection:text-[#0F1A1F]">
      {/* 1. TOP NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-4 transition-all">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between">
          {/* Left: Tooth Logo + Brand */}
          <a href="#home" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-full bg-white/95 backdrop-blur-md shadow-md text-[#22A6C0] flex items-center justify-center border border-white/40 group-hover:scale-105 transition-transform">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M12 2C8 2 6 5 6 8c0 4 1.5 7 2 11 .3 2.5 1.5 3 2.5 3s1.5-1.5 1.5-3.5c0-1.5 0-1.5 0-2.5 0 1 0 1 0 2.5 0 2 0.5 3.5 1.5 3.5s2.2-.5 2.5-3c.5-4 2-7 2-11 0-3-2-6-6-6z" />
              </svg>
            </div>
            <span className="font-bold text-lg text-white drop-shadow-md tracking-tight">
              ORI Dental AI
            </span>
          </a>

          {/* Center: Glass Pill Menu (Desktop) */}
          <nav className="hidden md:flex items-center gap-1 px-2 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg text-xs font-medium text-white">
            <a
              href="#home"
              className="px-4 py-1.5 rounded-full bg-white text-[#0F1A1F] font-semibold shadow-xs transition-all"
            >
              Home
            </a>
            <a
              href="#about"
              className="px-4 py-1.5 rounded-full hover:bg-white/20 transition-colors"
            >
              About
            </a>
            <a
              href="#features"
              className="px-4 py-1.5 rounded-full hover:bg-white/20 transition-colors"
            >
              Features
            </a>
            <a
              href="#doctor"
              className="px-4 py-1.5 rounded-full hover:bg-white/20 transition-colors"
            >
              Specialist
            </a>
            <a
              href="#how-it-works"
              className="px-4 py-1.5 rounded-full hover:bg-white/20 transition-colors"
            >
              How It Works
            </a>
            <a
              href="#contact"
              className="px-4 py-1.5 rounded-full hover:bg-white/20 transition-colors"
            >
              Contact
            </a>
          </nav>

          {/* Right: Sign In Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={onSignIn}
              className="px-5 py-2 rounded-full bg-white text-[#0F1A1F] hover:bg-slate-100 font-semibold text-xs transition-all shadow-md hover:shadow-lg"
            >
              Sign in
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 max-w-[1280px] mx-auto p-4 rounded-3xl bg-white/95 backdrop-blur-xl shadow-2xl border border-white/40 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex flex-col gap-2 text-sm font-medium text-[#0F1A1F]">
              <a
                href="#home"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-2xl bg-[#E3F4F8] text-[#22A6C0] font-semibold"
              >
                Home
              </a>
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-2xl hover:bg-[#F5F7F8]"
              >
                About Clinic
              </a>
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-2xl hover:bg-[#F5F7F8]"
              >
                Clinical Modules
              </a>
              <a
                href="#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-2xl hover:bg-[#F5F7F8]"
              >
                7-Step Workflow
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-2xl hover:bg-[#F5F7F8]"
              >
                Location &amp; Contact
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onSignIn();
                }}
                className="mt-2 w-full py-3 rounded-full bg-[#22A6C0] text-white font-semibold text-center shadow-md"
              >
                Access Clinical Platform →
              </button>
            </div>
          </div>
        )}
      </header>

      {/* 2. HERO — MOVING IMAGE (full-width rounded 32px container, ~90vh) */}
      <section id="home" className="pt-4 px-3 sm:px-6 lg:px-8 pb-12">
        <div className="relative w-full h-[90vh] min-h-[640px] max-h-[880px] rounded-[32px] overflow-hidden shadow-2xl flex flex-col justify-between p-6 sm:p-12 text-white">
          {/* Background Slideshow with Ken-Burns Zoom */}
          {HERO_SLIDES.map((slide, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                idx === currentSlide ? 'opacity-100 z-0' : 'opacity-0 -z-10'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.titleLine1}
                className={`w-full h-full object-cover transition-transform duration-[6000ms] ease-out ${
                  idx === currentSlide ? 'scale-105' : 'scale-100'
                }`}
                referrerPolicy="no-referrer"
              />
            </div>
          ))}

          {/* Deep Teal Scrim Overlay (--hero-overlay: #1F3B45 at 55%) */}
          <div className="absolute inset-0 bg-[#1F3B45]/60 backdrop-brightness-90 z-1" />

          {/* Top spacer for navbar */}
          <div className="relative z-10 pt-16">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold glass-pill text-white tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#22A6C0] animate-pulse"></span>
              {HERO_SLIDES[currentSlide].tag}
            </span>
          </div>

          {/* Center: H1 Headlines and Actions */}
          <div className="relative z-10 max-w-3xl my-auto">
            <h1 className="text-4xl sm:text-6xl lg:text-[64px] font-medium leading-[1.05] tracking-[-0.03em] text-white drop-shadow-md">
              <span>{HERO_SLIDES[currentSlide].titleLine1}</span>
              <br />
              <span>{HERO_SLIDES[currentSlide].titleLine2}</span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-200 max-w-xl font-normal leading-relaxed drop-shadow-xs">
              {HERO_SLIDES[currentSlide].desc}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              {/* Primary Button: White pill + cyan arrow */}
              <button
                onClick={onSignIn}
                className="group flex items-center gap-3 pl-6 pr-2 py-2 rounded-full bg-white text-[#0F1A1F] font-semibold text-sm hover:bg-slate-100 transition-all shadow-xl hover:shadow-2xl"
              >
                <span>Sign in to the platform</span>
                <span className="w-8 h-8 rounded-full bg-[#22A6C0] text-white flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </button>

              {/* Glass pill: See how it works */}
              <button
                onClick={() => {
                  const el = document.getElementById('how-it-works');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3 rounded-full text-sm font-medium glass-pill text-white hover:bg-white/25 transition-all shadow-md"
              >
                See how it works
              </button>
            </div>
          </div>

          {/* Bottom Row inside Hero */}
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 pt-6 border-t border-white/20">
            {/* Bottom-left glass card: Watch video */}
            <div
              onClick={() => setIsVideoOpen(true)}
              className="glass-card p-3 rounded-2xl flex items-center gap-3 cursor-pointer hover:bg-white/25 transition-all group max-w-sm"
            >
              <div className="w-12 h-12 rounded-xl bg-[#22A6C0] text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                <Play className="w-5 h-5 fill-white translate-x-0.5" />
              </div>
              <div>
                <p className="font-semibold text-xs text-white leading-snug">
                  Watch: how ORI Dental AI supports dentists
                </p>
                <p className="text-[11px] text-slate-300">2 min clinical video walkthrough</p>
              </div>
            </div>

            {/* Bottom-right glass chips */}
            <div className="hidden sm:flex flex-wrap items-center gap-2 max-w-xl justify-end">
              {['Symptom Analysis', 'X-Ray Review', 'Treatment Planning', 'Professional Review', 'Clinical History'].map(
                (chip, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full text-[11px] font-medium glass-pill text-white/90"
                  >
                    {chip}
                  </span>
                )
              )}
            </div>

            {/* Bottom Bar: AI suggests · Dentist decides + controls */}
            <div className="w-full flex items-center justify-between text-xs text-slate-300 pt-2 lg:hidden">
              <span>AI suggests · The dentist decides</span>
              <div className="flex items-center gap-2">
                <button onClick={handlePrevSlide} className="p-1 hover:text-white">
                  Prev
                </button>
                <span className="font-mono text-white">0{currentSlide + 1} / 03</span>
                <button onClick={handleNextSlide} className="p-1 hover:text-white">
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* Desktop Slider Controls Bottom Center */}
          <div className="hidden lg:flex absolute bottom-5 left-1/2 -translate-x-1/2 items-center gap-4 text-xs text-slate-300 z-10">
            <span>AI suggests · The dentist decides</span>
            <span className="text-white/30">|</span>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevSlide}
                className="w-7 h-7 rounded-full glass-pill flex items-center justify-center hover:bg-white/30 text-white transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="font-mono text-white font-semibold">
                0{currentSlide + 1} / 03
              </span>
              <button
                onClick={handleNextSlide}
                className="w-7 h-7 rounded-full glass-pill flex items-center justify-center hover:bg-white/30 text-white transition-colors"
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <span className="text-white/30">|</span>
            <span className="text-slate-300">Scroll for more ↓</span>
          </div>
        </div>
      </section>

      {/* 3. WORKFLOW TICKER (Infinitely scrolling strip) */}
      <section className="border-y border-[#E6EAEC] bg-[#F5F7F8] py-4 overflow-hidden">
        <div className="animate-ticker text-xs font-semibold uppercase tracking-wider text-[#0F1A1F] flex items-center gap-8">
          {[
            'Patient Information',
            'Symptom Analysis',
            'Dental X-Ray Review',
            'AI-Assisted Findings',
            'Treatment Planning',
            'Professional Review',
            'Final Clinical Decision',
            'Patient Information',
            'Symptom Analysis',
            'Dental X-Ray Review',
            'AI-Assisted Findings',
            'Treatment Planning',
            'Professional Review',
            'Final Clinical Decision',
          ].map((item, idx) => (
            <React.Fragment key={idx}>
              <span className="whitespace-nowrap flex items-center gap-2 text-[#0F1A1F]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22A6C0]"></span>
                {item}
              </span>
              <span className="text-[#8F9AA0] font-normal">|</span>
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* 4. ABOUT SECTION */}
      <section id="about" className="py-20 lg:py-28 px-4 sm:px-8 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Two small rounded portraits & Badge */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="inline-flex self-start px-3.5 py-1 rounded-full text-xs font-semibold bg-white border border-[#E6EAEC] shadow-2xs text-[#0F1A1F]">
              About Us
            </div>

            {/* Two portraits side-by-side */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-[24px] overflow-hidden bg-[#DCEAF4] aspect-square shadow-sm relative group">
                <img
                  src="/src/assets/images/dentist_doctor_portrait_1791468886254.jpg"
                  alt="Doctor Portrait"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="rounded-[24px] overflow-hidden bg-[#DCEAF4] aspect-square shadow-sm relative group">
                <img
                  src="/src/assets/images/dentist_female_portrait_1791468897572.jpg"
                  alt="Dr Diane Uwase"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Doctor caption */}
            <div className="p-4 rounded-2xl bg-[#F5F7F8] border border-[#E6EAEC]">
              <p className="text-xs font-bold text-[#0F1A1F]">Dr. Diane Uwase &amp; Clinical Team</p>
              <p className="text-[11px] text-[#8F9AA0] mt-0.5">
                ORI Dental Clinic · Masaka, Kicukiro District, Kigali
              </p>
            </div>
          </div>

          {/* Right Column: Two-tone H2 & Big Stats */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Two-tone H2 style: First part in ink, rest in muted */}
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-medium leading-[1.15] tracking-[-0.02em]">
              <span className="text-[#0F1A1F]">
                We support dentists with modern AI technology{' '}
              </span>
              <span className="text-[#8F9AA0]">
                while every diagnosis and treatment decision stays with a qualified professional.
              </span>
            </h2>

            <p className="mt-6 text-base text-[#8F9AA0] leading-relaxed">
              Designed specifically for Rwandan dental practices, ORI Dental AI blends deep radiological feature extraction with structured clinician review. It standardizes assessments, minimizes missed interproximal caries, and creates transparent treatment cost projections in Rwandan Francs (RWF).
            </p>

            {/* 3 Big Stats */}
            <div className="mt-10 grid grid-cols-3 gap-4 pt-8 border-t border-[#E6EAEC]">
              <div>
                <p className="text-4xl sm:text-5xl font-medium text-[#0F1A1F] tracking-tight">15</p>
                <p className="text-xs sm:text-sm text-[#8F9AA0] mt-1 font-medium">Integrated modules</p>
              </div>
              <div>
                <p className="text-4xl sm:text-5xl font-medium text-[#0F1A1F] tracking-tight">7-step</p>
                <p className="text-xs sm:text-sm text-[#8F9AA0] mt-1 font-medium">Clinical workflow</p>
              </div>
              <div>
                <p className="text-4xl sm:text-5xl font-medium text-[#22A6C0] tracking-tight">100%</p>
                <p className="text-xs sm:text-sm text-[#8F9AA0] mt-1 font-medium">Dentist-reviewed AI</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FEATURES CAROUSEL */}
      <section id="features" className="py-20 bg-[#F5F7F8] px-4 sm:px-8">
        <div className="max-w-[1280px] mx-auto">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="inline-flex px-3.5 py-1 rounded-full text-xs font-semibold bg-white border border-[#E6EAEC] text-[#0F1A1F]">
                Features
              </span>
              <h2 className="text-3xl sm:text-4xl font-medium text-[#0F1A1F] mt-3 tracking-tight">
                Everything a modern clinic needs
              </h2>
            </div>

            {/* Carousel Controls (Desktop) */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                onClick={() => setFeatureIndex(prev => Math.max(0, prev - 1))}
                disabled={featureIndex === 0}
                className="w-10 h-10 rounded-full bg-white border border-[#E6EAEC] text-[#0F1A1F] flex items-center justify-center hover:bg-slate-100 disabled:opacity-40 transition-colors shadow-2xs"
                aria-label="Previous features"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setFeatureIndex(prev => Math.min(features.length - 2, prev + 1))}
                disabled={featureIndex >= features.length - 2}
                className="w-10 h-10 rounded-full bg-white border border-[#E6EAEC] text-[#0F1A1F] flex items-center justify-center hover:bg-slate-100 disabled:opacity-40 transition-colors shadow-2xs"
                aria-label="Next features"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, idx) => (
              <div
                key={idx}
                className="bg-white rounded-[24px] p-6 border border-[#E6EAEC] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="rounded-[20px] overflow-hidden aspect-[4/3] mb-5 bg-[#DCEAF4] relative">
                    <img
                      src={f.image}
                      alt={f.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-white/90 backdrop-blur-md text-[#22A6C0] border border-white/40 shadow-xs">
                      {f.tag}
                    </span>
                  </div>

                  <div className="w-10 h-10 rounded-full bg-[#E3F4F8] text-[#22A6C0] flex items-center justify-center mb-4">
                    <f.icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-xl font-semibold text-[#0F1A1F] tracking-tight mb-2">
                    {f.title}
                  </h3>

                  <p className="text-xs text-[#8F9AA0] leading-relaxed">
                    {f.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#F0F3F5] flex items-center justify-between text-xs font-semibold text-[#22A6C0]">
                  <span>Explore module</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. DOCTOR + DASHBOARD PREVIEW (Sample's Dr Daniel Carter Section replica) */}
      <section id="doctor" className="py-20 lg:py-28 px-4 sm:px-8 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Doctor Card on --card-blue (#DCEAF4) */}
          <div className="lg:col-span-5 bg-[#DCEAF4] rounded-[24px] p-8 sm:p-10 flex flex-col justify-between shadow-sm relative overflow-hidden">
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white/80 text-[#0F1A1F] border border-white/50 mb-6">
                Clinical Leadership
              </span>

              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden mb-6 border-4 border-white shadow-md mx-auto sm:mx-0">
                <img
                  src="/src/assets/images/dentist_female_portrait_1791468897572.jpg"
                  alt="Dr. Diane Uwase"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <h3 className="text-2xl sm:text-3xl font-semibold text-[#0F1A1F] tracking-tight">
                Dr. Diane Uwase
              </h3>
              <p className="text-xs font-semibold text-[#22A6C0] uppercase tracking-wider mt-1">
                Lead Dental Professional, ORI Dental Clinic
              </p>

              <div className="mt-4 flex items-center gap-1.5 text-xs text-[#0F1A1F] font-medium">
                <span className="text-[#E2A23B] font-bold">★ 4.9</span>
                <span className="text-[#8F9AA0]">(800+ Confirmed Clinical Cases)</span>
              </div>

              <p className="mt-5 text-sm text-[#0F1A1F]/80 leading-relaxed">
                "AI diagnostics serve as an infallible second pair of eyes during busy clinical hours. At ORI Dental Clinic, every AI prediction is verified and signed off before we begin any procedural work."
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-black/10 flex items-center justify-between text-xs font-semibold text-[#0F1A1F]">
              <span>Rwanda Medical Council Reg. #0842</span>
              <span className="text-[#22A6C0]">Verified Lead</span>
            </div>
          </div>

          {/* Right: Clinic Room Photo with Floating Stats Card */}
          <div className="lg:col-span-7 relative rounded-[24px] overflow-hidden min-h-[420px] shadow-md group">
            <img
              src="/src/assets/images/modern_dental_clinic_room_1791468908603.jpg"
              alt="ORI Dental Clinic Room"
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />

            {/* Floating White Stats Card (Replica of appointment progress in sample) */}
            <div className="absolute bottom-6 left-6 right-6 sm:right-auto sm:max-w-md bg-white rounded-[22px] p-6 shadow-2xl border border-[#E6EAEC]">
              <div className="grid grid-cols-2 gap-4 pb-4 border-b border-[#F0F3F5] text-center">
                <div>
                  <p className="text-2xl font-bold text-[#0F1A1F]">12</p>
                  <p className="text-[11px] text-[#8F9AA0] font-medium">Patients Today</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#0F1A1F]">8 min</p>
                  <p className="text-[11px] text-[#8F9AA0] font-medium">Avg. Review Time</p>
                </div>
              </div>

              <div className="pt-4">
                <div className="flex items-center justify-between text-xs font-semibold mb-2">
                  <span className="text-[#0F1A1F]">Today's Review Progress</span>
                  <span className="text-[#22A6C0] font-bold">60%</span>
                </div>

                {/* Cyan Segmented Bars */}
                <div className="flex items-center gap-1.5 h-3">
                  {[...Array(10)].map((_, i) => (
                    <div
                      key={i}
                      className={`flex-1 h-full rounded-full transition-all ${
                        i < 6 ? 'bg-[#22A6C0]' : 'bg-[#E3F4F8]'
                      }`}
                    />
                  ))}
                </div>

                <p className="text-[10px] text-[#8F9AA0] mt-2 text-right">
                  7 of 12 clinical records verified and cryptographically signed
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. HOW IT WORKS (7 numbered steps horizontal timeline) */}
      <section id="how-it-works" className="py-20 bg-[#F5F7F8] px-4 sm:px-8">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-flex px-3.5 py-1 rounded-full text-xs font-semibold bg-white border border-[#E6EAEC] text-[#0F1A1F]">
              Clinical Protocol
            </span>
            <h2 className="text-3xl sm:text-4xl font-medium text-[#0F1A1F] mt-3 tracking-tight">
              A 7-Step Dentist-Centered Pathway
            </h2>
            <p className="text-sm text-[#8F9AA0] mt-2">
              Every step is structured so artificial intelligence only assists and provides decision support.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
            {[
              { num: '01', title: 'Patient Info', desc: 'Demographics, medical history & Kigali residence.' },
              { num: '02', title: 'Symptoms', desc: 'Chief complaints, pain duration & triggers.' },
              { num: '03', title: 'Dental X-Ray', desc: 'Panoramic OPG or bitewing radiograph intake.' },
              { num: '04', title: 'AI Findings', desc: 'Computer vision & Bayesian diagnostic cues.' },
              { num: '05', title: 'Treatment Plan', desc: 'Phased procedures & local RWF cost estimates.' },
              { num: '06', title: 'Dentist Signs', desc: 'Mandatory clinical review & digital signature.', highlight: true },
              { num: '07', title: 'Final Decision', desc: 'Signed treatment plan shared with patient.' },
            ].map(step => (
              <div
                key={step.num}
                className={`p-5 rounded-[22px] flex flex-col justify-between transition-all ${
                  step.highlight
                    ? 'bg-[#22A6C0] text-white shadow-xl ring-4 ring-[#22A6C0]/20 scale-102'
                    : 'bg-white border border-[#E6EAEC] text-[#0F1A1F]'
                }`}
              >
                <div>
                  <span
                    className={`font-mono text-2xl font-bold block mb-3 ${
                      step.highlight ? 'text-white/80' : 'text-[#22A6C0]'
                    }`}
                  >
                    {step.num}
                  </span>
                  <h4 className="font-semibold text-sm mb-1">{step.title}</h4>
                  <p
                    className={`text-xs leading-relaxed ${
                      step.highlight ? 'text-cyan-50' : 'text-[#8F9AA0]'
                    }`}
                  >
                    {step.desc}
                  </p>
                </div>

                {step.highlight && (
                  <span className="mt-4 inline-block text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full text-white text-center">
                    Crucial Checkpoint
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. AI ANALYTICS PREVIEW (98% Confirmation Bar Card replica) */}
      <section className="py-20 px-4 sm:px-8 max-w-[1280px] mx-auto">
        <div className="bg-white rounded-[28px] p-8 sm:p-12 border border-[#E6EAEC] shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5">
            <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-[#E3F4F8] text-[#22A6C0] mb-3">
              Performance Rigor · Prototype Data
            </span>
            <h2 className="text-3xl sm:text-4xl font-medium text-[#0F1A1F] tracking-tight">
              High Clinical Concordance
            </h2>
            <p className="mt-4 text-sm text-[#8F9AA0] leading-relaxed">
              In ongoing pilot evaluations at ORI Dental Clinic, qualified dentists confirmed 94% of AI-identified deep caries and 91% of periodontal bone loss indications, saving an estimated 8 minutes per complex case.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={onExploreDemo}
                className="px-6 py-2.5 rounded-full bg-[#0F1A1F] text-white text-xs font-semibold hover:bg-slate-800 transition-colors shadow-md"
              >
                Explore Live Clinical Modules
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#F5F7F8] rounded-[24px] p-6 sm:p-8 border border-[#E6EAEC]">
            <div className="flex items-center justify-between pb-6 border-b border-[#E6EAEC]">
              <div>
                <span className="text-4xl sm:text-5xl font-medium text-[#0F1A1F]">94.2%</span>
                <p className="text-xs text-[#8F9AA0] mt-1 font-medium">Average Confirmation Rate Across All Teeth</p>
              </div>
              <span className="text-xs font-bold font-mono text-[#22A6C0] bg-white px-3 py-1.5 rounded-full border border-[#E6EAEC]">
                Q1-Q3 2026 Trial
              </span>
            </div>

            {/* Monthly Confirmation Bar Chart */}
            <div className="mt-6">
              <p className="text-xs font-semibold text-[#0F1A1F] mb-4">AI Findings Confirmed by Dentists (Monthly %):</p>
              <div className="grid grid-cols-6 gap-3 items-end h-40 pt-4">
                {[
                  { month: 'May', rate: 88 },
                  { month: 'Jun', rate: 91 },
                  { month: 'Jul', rate: 93 },
                  { month: 'Aug', rate: 92 },
                  { month: 'Sep', rate: 95 },
                  { month: 'Oct', rate: 97 },
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-2 h-full justify-end">
                    <span className="text-[10px] font-mono font-bold text-[#22A6C0]">{item.rate}%</span>
                    <div
                      style={{ height: `${item.rate}%` }}
                      className="w-full bg-[#22A6C0] rounded-full transition-all duration-500 hover:bg-[#1B899F]"
                    />
                    <span className="text-[11px] text-[#8F9AA0] font-medium">{item.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. PARTNER & ACADEMIC COLLABORATION */}
      <section className="py-12 bg-[#F5F7F8] border-y border-[#E6EAEC] px-4 sm:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs uppercase font-bold tracking-widest text-[#8F9AA0] mb-2">
            Institutional Collaboration
          </p>
          <h3 className="text-lg sm:text-xl font-medium text-[#0F1A1F]">
            In partnership with ORI Dental Clinic (Kicukiro, Masaka, Kigali)
          </h3>
          <p className="text-xs text-[#8F9AA0] mt-1">
            Adventist University of Central Africa (AUCA) Final-Year Health Informatics Project
          </p>
        </div>
      </section>

      {/* 10. FOOTER WITH HUGE FADED WATERMARK */}
      <footer id="contact" className="relative bg-white pt-20 pb-12 px-4 sm:px-8 border-t border-[#E6EAEC] overflow-hidden">
        <div className="max-w-[1280px] mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#F0F3F5]">
            {/* Newsletter Column */}
            <div className="lg:col-span-5">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-full bg-[#E3F4F8] text-[#22A6C0] flex items-center justify-center font-bold">
                  ORI
                </div>
                <span className="font-bold text-lg text-[#0F1A1F]">ORI Dental AI</span>
              </div>
              <p className="text-xs text-[#8F9AA0] max-w-sm mb-6 leading-relaxed">
                Stay updated on the clinical deployment of AI-assisted dental diagnostics in Rwanda.
              </p>

              <form onSubmit={handleNewsletterSubmit} className="flex items-center max-w-md bg-[#F5F7F8] rounded-full p-1 border border-[#E6EAEC]">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={e => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your clinical email address"
                  className="flex-1 px-4 py-2 text-xs bg-transparent border-none outline-none text-[#0F1A1F] placeholder:text-[#8F9AA0]"
                  required
                />
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#22A6C0] text-white text-xs font-semibold hover:bg-[#1B899F] transition-colors"
                >
                  Subscribe
                </button>
              </form>

              {subscribedToast && (
                <p className="text-xs text-[#1F9D74] mt-2 font-medium">
                  ✓ Thank you! You have been subscribed to clinical updates.
                </p>
              )}
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F1A1F] mb-4">
                Clinical Modules
              </h4>
              <ul className="space-y-2.5 text-xs text-[#8F9AA0]">
                <li><button onClick={onSignIn} className="hover:text-[#22A6C0]">Symptom Analysis</button></li>
                <li><button onClick={onSignIn} className="hover:text-[#22A6C0]">Panoramic X-Ray Review</button></li>
                <li><button onClick={onSignIn} className="hover:text-[#22A6C0]">Treatment Plan Generator</button></li>
                <li><button onClick={onSignIn} className="hover:text-[#22A6C0]">Professional Review &amp; Signature</button></li>
                <li><button onClick={onSignIn} className="hover:text-[#22A6C0]">Audit &amp; Compliance Logs</button></li>
              </ul>
            </div>

            {/* Contact Details */}
            <div className="lg:col-span-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F1A1F] mb-4">
                ORI Dental Clinic, Kigali
              </h4>
              <ul className="space-y-3 text-xs text-[#8F9AA0]">
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#22A6C0] shrink-0" />
                  <span>Kicukiro District, Masaka Sector, Kigali, Rwanda</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#22A6C0] shrink-0" />
                  <a href="mailto:hello@oridental.rw" className="hover:text-[#22A6C0]">
                    hello@oridental.rw
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#22A6C0] shrink-0" />
                  <span>+250 788 123 456 / +250 722 000 111</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8F9AA0]">
            <p>© 2026 ORI Dental AI. Developed for ORI Dental Clinic &amp; AUCA. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <span className="hover:text-[#0F1A1F] cursor-pointer">Privacy &amp; Data Ethics</span>
              <span>·</span>
              <span className="hover:text-[#0F1A1F] cursor-pointer">Terms of Service</span>
            </div>
          </div>
        </div>

        {/* Huge Faded Watermark across bottom */}
        <div className="select-none pointer-events-none absolute -bottom-10 left-0 right-0 text-center opacity-[0.035] text-[120px] sm:text-[180px] lg:text-[220px] font-black tracking-tighter text-[#0F1A1F] whitespace-nowrap overflow-hidden">
          ORI DENTAL AI
        </div>
      </footer>

      {/* Video Modal */}
      <VideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
    </div>
  );
};
