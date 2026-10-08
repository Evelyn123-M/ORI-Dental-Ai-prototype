import React from 'react';
import {
  Users,
  Clock,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Activity,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Layers,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { Patient, ReviewItem, AuditLog, UserProfile } from '../../types';

interface DashboardModuleProps {
  currentUser: UserProfile;
  patients: Patient[];
  reviews: ReviewItem[];
  auditLogs: AuditLog[];
  onNavigateModule: (moduleId: string) => void;
  onSelectPatient: (patientId: string) => void;
  onOpenReviewModal?: (reviewId: string) => void;
}

export const DashboardModule: React.FC<DashboardModuleProps> = ({
  currentUser,
  patients,
  reviews,
  auditLogs,
  onNavigateModule,
  onSelectPatient,
  onOpenReviewModal,
}) => {
  const pendingReviews = reviews.filter(r => r.status === 'Pending');
  const activePatients = patients.filter(p => p.status === 'Active');

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#1F3B45] to-[#122830] rounded-[24px] p-6 sm:p-8 text-white shadow-md relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="relative z-10 max-w-xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#22A6C0] animate-pulse"></span>
            <span className="text-xs uppercase tracking-wider font-semibold text-cyan-300">
              ORI Dental Clinic · Kigali Clinical Platform
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
            Muraho, {currentUser.name}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
            There are <strong className="text-white underline">{pendingReviews.length} clinical cases</strong> awaiting dental specialist verification today. All AI diagnostic suggestions remain advisory until your signature is applied.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap items-center gap-3">
          <button
            onClick={() => onNavigateModule('professional-review')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#22A6C0] text-white text-xs font-semibold hover:bg-[#1B899F] transition-all shadow-md"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Open Review Queue ({pendingReviews.length})</span>
          </button>
          <button
            onClick={() => onNavigateModule('patients')}
            className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-medium border border-white/20 transition-all"
          >
            <span>Register New Patient</span>
          </button>
        </div>

        {/* Subtle decorative tooth outline in background */}
        <div className="absolute right-0 top-0 bottom-0 opacity-10 pointer-events-none flex items-center pr-10">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-48 h-48 text-white">
            <path d="M12 2C8 2 6 5 6 8c0 4 1.5 7 2 11 .3 2.5 1.5 3 2.5 3s1.5-1.5 1.5-3.5c0-1.5 0-1.5 0-2.5 0 1 0 1 0 2.5 0 2 0.5 3.5 1.5 3.5s2.2-.5 2.5-3c.5-4 2-7 2-11 0-3-2-6-6-6z" />
          </svg>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-[24px] p-5 border border-[#E6EAEC] shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-[#8F9AA0] font-medium">Patients Today</p>
            <p className="text-2xl font-bold text-[#0F1A1F] mt-1">12</p>
            <span className="text-[11px] text-[#1F9D74] font-medium mt-1 inline-flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +2 from yesterday
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#E3F4F8] text-[#22A6C0] flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-[24px] p-5 border border-[#E6EAEC] shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-[#8F9AA0] font-medium">Pending Dentist Sign-Off</p>
            <p className="text-2xl font-bold text-[#0F1A1F] mt-1">{pendingReviews.length}</p>
            <span className="text-[11px] text-[#E2A23B] font-medium mt-1 inline-flex items-center gap-1">
              <Clock className="w-3 h-3" /> Action required
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#E2A23B] flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-[24px] p-5 border border-[#E6EAEC] shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-[#8F9AA0] font-medium">AI Diagnostic Accuracy</p>
            <p className="text-2xl font-bold text-[#0F1A1F] mt-1">94.2%</p>
            <span className="text-[11px] text-[#8F9AA0] font-mono mt-1 block">
              Prototype Data (Q1-Q3)
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#E3F4F8] text-[#22A6C0] flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-[24px] p-5 border border-[#E6EAEC] shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-[#8F9AA0] font-medium">Completed Plans This Week</p>
            <p className="text-2xl font-bold text-[#0F1A1F] mt-1">18</p>
            <span className="text-[11px] text-[#1F9D74] font-medium mt-1 inline-flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> 100% Signed
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#1F9D74] flex items-center justify-center">
            <Layers className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Grid: Pending Reviews + AI Accuracy Chart Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Pending Professional Review Queue */}
        <div className="lg:col-span-7 bg-white rounded-[24px] p-6 border border-[#E6EAEC] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#F0F3F5]">
              <div>
                <h3 className="font-bold text-base text-[#0F1A1F]">Clinical Cases Awaiting Decision</h3>
                <p className="text-xs text-[#8F9AA0] mt-0.5">High priority cases requiring Dr. Diane Uwase review</p>
              </div>
              <button
                onClick={() => onNavigateModule('professional-review')}
                className="text-xs font-semibold text-[#22A6C0] hover:underline flex items-center gap-1"
              >
                <span>View all ({reviews.length})</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {reviews.map(item => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-[#F5F7F8] hover:bg-[#E3F4F8]/50 border border-[#E6EAEC] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-white border border-[#CBD5E1] text-[#0F1A1F] flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                      {item.patientName.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-sm text-[#0F1A1F] group-hover:text-[#22A6C0] transition-colors">
                          {item.patientName}
                        </p>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            item.status === 'Confirmed'
                              ? 'bg-emerald-100 text-[#1F9D74]'
                              : item.status === 'Rejected'
                              ? 'bg-red-100 text-[#D9534F]'
                              : 'bg-amber-100 text-[#E2A23B]'
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                      <p className="text-xs text-[#8F9AA0] mt-0.5">{item.caseType}</p>
                      <div className="flex items-center gap-2 text-[11px] text-[#8F9AA0] mt-1 font-mono">
                        <span>AI Confidence: <strong className="text-[#22A6C0]">{item.aiConfidenceScore}%</strong></span>
                        <span>·</span>
                        <span>{item.dateSubmitted}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onSelectPatient(item.patientId);
                      onNavigateModule('professional-review');
                    }}
                    className="self-end sm:self-center px-4 py-1.5 rounded-full text-xs font-semibold bg-white hover:bg-[#22A6C0] hover:text-white text-[#0F1A1F] border border-[#E6EAEC] transition-all shadow-2xs flex items-center gap-1.5"
                  >
                    <span>Inspect Case</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#F0F3F5] flex items-center justify-between text-xs text-[#8F9AA0]">
            <span>Regulatory mandate: Every recommendation must carry doctor sign-off.</span>
            <span className="font-mono text-[#22A6C0]">RMC Compliance Active</span>
          </div>
        </div>

        {/* Right Column: AI Concordance Chart & Active Patients */}
        <div className="lg:col-span-5 space-y-6">
          {/* AI Findings Confirmed Chart Preview */}
          <div className="bg-white rounded-[24px] p-6 border border-[#E6EAEC] shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-sm text-[#0F1A1F]">AI Concordance by Pathology</h3>
                <p className="text-[11px] text-[#8F9AA0]">Dentist confirmation rates (Prototype data)</p>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#E3F4F8] text-[#22A6C0] font-bold">
                v2.4 Engine
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-[#0F1A1F] font-medium">Deep Occlusal &amp; Proximal Caries</span>
                  <span className="font-mono font-bold text-[#22A6C0]">94.8%</span>
                </div>
                <div className="w-full bg-[#F5F7F8] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#22A6C0] h-full rounded-full" style={{ width: '94.8%' }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-[#0F1A1F] font-medium">Marginal Bone Loss &amp; Furcation</span>
                  <span className="font-mono font-bold text-[#22A6C0]">89.1%</span>
                </div>
                <div className="w-full bg-[#F5F7F8] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#22A6C0] h-full rounded-full" style={{ width: '89.1%' }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-[#0F1A1F] font-medium">Third Molar Impaction</span>
                  <span className="font-mono font-bold text-[#22A6C0]">96.4%</span>
                </div>
                <div className="w-full bg-[#F5F7F8] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#22A6C0] h-full rounded-full" style={{ width: '96.4%' }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-[#0F1A1F] font-medium">Defective Overhang Restoration</span>
                  <span className="font-mono font-bold text-[#22A6C0]">76.2%</span>
                </div>
                <div className="w-full bg-[#F5F7F8] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#22A6C0] h-full rounded-full" style={{ width: '76.2%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Recent Audit & System Activity feed */}
          <div className="bg-white rounded-[24px] p-6 border border-[#E6EAEC] shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-sm text-[#0F1A1F]">Recent Audit Events</h3>
              <button
                onClick={() => onNavigateModule('audit')}
                className="text-xs text-[#22A6C0] hover:underline"
              >
                All Logs
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {auditLogs.slice(0, 3).map(log => (
                <div key={log.id} className="flex items-start gap-2.5 pb-2 border-b border-[#F5F7F8] last:border-none">
                  <div className="w-2 h-2 rounded-full bg-[#22A6C0] mt-1.5 shrink-0" />
                  <div className="min-w-0">
                    <p className="font-semibold text-[#0F1A1F] leading-tight">{log.action}</p>
                    <p className="text-[#8F9AA0] text-[11px] truncate mt-0.5">{log.details}</p>
                    <span className="text-[10px] text-[#8F9AA0] font-mono">{log.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
