import React from 'react';
import {
  LayoutDashboard,
  Users,
  FileText,
  Activity,
  Sparkles,
  Image as ImageIcon,
  Scan,
  GitCompare,
  Layers,
  CheckCircle2,
  Clock,
  BarChart3,
  ShieldCheck,
  UserCheck,
  Sliders,
  X,
  Stethoscope,
  Info
} from 'lucide-react';
import { SYSTEM_MODULES } from '../../data/mockData';

interface SidebarProps {
  activeModule: string;
  onSelectModule: (moduleId: string) => void;
  isOpen: boolean;
  onClose: () => void;
  pendingReviewsCount: number;
}

const ICON_MAP: Record<string, React.ElementType> = {
  LayoutDashboard,
  Users,
  FileText,
  Activity,
  Sparkles,
  Image: ImageIcon,
  ScanFace: Scan,
  GitCompare,
  Layers,
  CheckCircle2,
  Clock,
  BarChart3,
  ShieldCheck,
  UserCheck,
  Sliders,
};

export const Sidebar: React.FC<SidebarProps> = ({
  activeModule,
  onSelectModule,
  isOpen,
  onClose,
  pendingReviewsCount,
}) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-white border-r border-[#E6EAEC] flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 flex items-center justify-between border-b border-[#F0F3F5]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#E3F4F8] text-[#22A6C0] flex items-center justify-center shadow-xs">
              {/* Modern Tooth Emblem SVG */}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <path d="M12 2C8 2 6 5 6 8c0 4 1.5 7 2 11 .3 2.5 1.5 3 2.5 3s1.5-1.5 1.5-3.5c0-1.5 0-1.5 0-2.5 0 1 0 1 0 2.5 0 2 0.5 3.5 1.5 3.5s2.2-.5 2.5-3c.5-4 2-7 2-11 0-3-2-6-6-6z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-base text-[#0F1A1F] tracking-tight">ORI Dental AI</span>
                <span className="text-[10px] font-bold bg-[#E3F4F8] text-[#22A6C0] px-1.5 py-0.2 rounded font-mono">v2.4</span>
              </div>
              <p className="text-[11px] text-[#8F9AA0] font-medium leading-none mt-0.5">ORI Clinic · Kigali, Rwanda</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-[#8F9AA0] hover:text-[#0F1A1F] hover:bg-[#F5F7F8]"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Clinical Disclaimer Banner */}
        <div className="mx-4 mt-3 p-3 rounded-2xl bg-[#E3F4F8]/70 border border-[#22A6C0]/20 flex items-start gap-2.5 text-[11px]">
          <Info className="w-4 h-4 text-[#22A6C0] shrink-0 mt-0.5" />
          <p className="text-[#1A4550] leading-tight">
            <strong>Decision Support Only:</strong> All AI findings require dental specialist review &amp; signature.
          </p>
        </div>

        {/* Modules Navigation Links */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-[#8F9AA0]">
            Clinical Workflow Modules
          </div>

          {SYSTEM_MODULES.map(mod => {
            const Icon = ICON_MAP[mod.icon] || Stethoscope;
            const isActive = activeModule === mod.id;
            const isReview = mod.id === 'professional-review';

            return (
              <button
                key={mod.id}
                onClick={() => {
                  onSelectModule(mod.id);
                  if (window.innerWidth < 1024) onClose();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-full text-xs font-medium transition-all group ${
                  isActive
                    ? 'bg-[#E3F4F8] text-[#166E7F] font-semibold shadow-2xs'
                    : 'text-[#0F1A1F] hover:bg-[#F5F7F8] hover:text-[#22A6C0]'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-colors ${
                      isActive
                        ? 'text-[#22A6C0]'
                        : 'text-[#8F9AA0] group-hover:text-[#22A6C0]'
                    }`}
                  />
                  <span className="truncate">{mod.name}</span>
                </div>

                {/* Badge for Professional Review */}
                {isReview && pendingReviewsCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold font-mono bg-[#22A6C0] text-white">
                    {pendingReviewsCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Sidebar Footer info */}
        <div className="p-4 border-t border-[#F0F3F5] text-[11px] text-[#8F9AA0] flex items-center justify-between">
          <span>Kicukiro, Masaka, Kigali</span>
          <span className="font-mono text-[10px] text-[#22A6C0] bg-[#E3F4F8] px-2 py-0.5 rounded-full">AUCA Project</span>
        </div>
      </aside>
    </>
  );
};
