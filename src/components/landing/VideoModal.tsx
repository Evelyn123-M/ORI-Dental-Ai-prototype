import React from 'react';
import { X, Play, CheckCircle2, ShieldCheck, Stethoscope } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-3xl bg-[#0F1D24] text-white rounded-[28px] overflow-hidden shadow-2xl border border-white/20 flex flex-col"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#22A6C0]/20 flex items-center justify-center text-[#22A6C0]">
              <Play className="w-4 h-4 fill-[#22A6C0]" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">How ORI Dental AI Supports Dentists</h3>
              <p className="text-[11px] text-slate-400">Clinical Workflow &amp; Dentist Decision Oversight Demonstration</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Simulation Canvas */}
        <div className="relative aspect-video bg-[#070D10] flex items-center justify-center overflow-hidden">
          {/* Background dental clinic image */}
          <img
            src="/src/assets/images/hero_dentist_patient_1791468873741.jpg"
            alt="Dental workflow demonstration"
            className="absolute inset-0 w-full h-full object-cover opacity-35"
          />

          <div className="relative z-10 text-center max-w-lg p-6">
            <div className="w-16 h-16 rounded-full bg-[#22A6C0] text-white flex items-center justify-center mx-auto mb-4 shadow-xl hover:scale-105 transition-transform cursor-pointer">
              <Play className="w-7 h-7 fill-white translate-x-0.5" />
            </div>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white/10 backdrop-blur-md border border-white/20 text-cyan-300 mb-2">
              Clinical Video Walkthrough · ORI Dental Clinic
            </span>
            <h4 className="text-xl font-bold text-white mb-2">
              Empowering Clinicians in Kigali with Intelligent Second Opinions
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Demonstrating the 7-step pathway: from initial triage symptoms to high-resolution panoramic radiograph segmentation, through to Dr. Diane Uwase’s cryptographic digital signature confirmation.
            </p>
          </div>
        </div>

        {/* Clinical Protocol Points */}
        <div className="p-6 bg-[#0B1519] border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#1F9D74] shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-white">AI Suggests</p>
              <p className="text-slate-400 text-[11px] mt-0.5">High-confidence anomaly cues &amp; anatomical bounding tags.</p>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <Stethoscope className="w-4 h-4 text-[#22A6C0] shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-white">Dentist Decides</p>
              <p className="text-slate-400 text-[11px] mt-0.5">Full clinical sovereignty, override capabilities &amp; case notes.</p>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#22A6C0] shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-white">Digital Sign-Off</p>
              <p className="text-slate-400 text-[11px] mt-0.5">Cryptographic signature and audit log for Rwandan healthcare compliance.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
