import React, { useState } from 'react';
import {
  ShieldCheck,
  Check,
  X,
  AlertTriangle,
  FileSignature,
  Clock,
  CheckCircle2,
  Lock,
  ArrowRight,
  ExternalLink,
  History,
  Info
} from 'lucide-react';
import { ReviewItem, Patient } from '../../types';

interface ProfessionalReviewModuleProps {
  reviews: ReviewItem[];
  patients: Patient[];
  selectedPatientId: string;
  onSelectPatient: (patientId: string) => void;
  onUpdateReview: (review: ReviewItem) => void;
  onNavigateModule: (moduleId: string) => void;
  showToast: (title: string, message?: string, type?: 'success' | 'warning' | 'info' | 'error') => void;
}

export const ProfessionalReviewModule: React.FC<ProfessionalReviewModuleProps> = ({
  reviews,
  patients,
  selectedPatientId,
  onSelectPatient,
  onUpdateReview,
  onNavigateModule,
  showToast,
}) => {
  const [activeReviewId, setActiveReviewId] = useState<string>(reviews[0]?.id || '');
  const [isSignModalOpen, setIsSignModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [isOverrideModalOpen, setIsOverrideModalOpen] = useState(false);
  const [overrideReason, setOverrideReason] = useState('');

  // Digital Signature Modal State
  const [signDoctorName, setSignDoctorName] = useState('Dr. Diane Uwase, BDS');
  const [signLicenseNo, setSignLicenseNo] = useState('RMC/DEN/2019/0842');
  const [confirmedResponsibility, setConfirmedResponsibility] = useState(false);

  const activeReview = reviews.find(r => r.id === activeReviewId) || reviews[0];
  const activePatient = patients.find(p => p.id === activeReview?.patientId) || patients[0];

  const handleConfirmSignature = (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmedResponsibility) {
      showToast('Confirmation Required', 'You must check the confirmation of clinical responsibility.', 'warning');
      return;
    }

    const updated: ReviewItem = {
      ...activeReview,
      status: 'Confirmed',
      digitalSignature: {
        signedByName: signDoctorName,
        medicalLicenseNo: signLicenseNo,
        signedAt: new Date().toLocaleString() + ' CAT',
        hash: `SHA256:${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
        confirmedResponsibility: true,
      },
    };

    onUpdateReview(updated);
    setIsSignModalOpen(false);
    showToast(
      'Case Cryptographically Signed',
      `Dr. Diane Uwase confirmed final clinical diagnosis for ${activePatient.fullName}.`,
      'success'
    );
  };

  const handleConfirmReject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rejectReason) return;

    const updated: ReviewItem = {
      ...activeReview,
      status: 'Rejected',
      reviewNotes: `REJECTED: ${rejectReason}`,
    };

    onUpdateReview(updated);
    setIsRejectModalOpen(false);
    showToast('Case Rejected', 'Returned to triage stage for re-assessment.', 'error');
  };

  const handleConfirmOverride = (e: React.FormEvent) => {
    e.preventDefault();
    if (!overrideReason) return;

    const updated: ReviewItem = {
      ...activeReview,
      overridden: true,
      overrideReason: overrideReason,
      reviewNotes: `CLINICAL OVERRIDE: ${overrideReason}`,
    };

    onUpdateReview(updated);
    setIsOverrideModalOpen(false);
    showToast('AI Finding Overridden', 'Clinician override recorded in compliance audit trail.', 'warning');
  };

  return (
    <div className="space-y-6">
      {/* Top Protocol Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-[24px] border border-[#E6EAEC] shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-[#0F1A1F]">Professional Review &amp; Digital Signature</h2>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold font-mono bg-[#E3F4F8] text-[#22A6C0]">
              Mandatory Gate
            </span>
          </div>
          <p className="text-xs text-[#8F9AA0] mt-0.5">
            Dental specialist review queue · Cryptographic digital signature required before procedural approval
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigateModule('audit')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#F5F7F8] hover:bg-[#EAEFF2] text-xs font-semibold text-[#0F1A1F] border border-[#E6EAEC] transition-colors"
          >
            <span>Regulatory Audit Trail</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#22A6C0]" />
          </button>
        </div>
      </div>

      {/* Main Grid: Queue on Left, Case Review & Sign Workspace on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Review Queue (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-[24px] p-5 border border-[#E6EAEC] shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#F0F3F5]">
            <h3 className="font-bold text-sm text-[#0F1A1F]">Cases Queue</h3>
            <span className="text-xs font-mono text-[#8F9AA0]">{reviews.length} total</span>
          </div>

          <div className="space-y-2">
            {reviews.map(item => {
              const isSelected = item.id === activeReview?.id;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setActiveReviewId(item.id);
                    onSelectPatient(item.patientId);
                  }}
                  className={`p-3.5 rounded-2xl cursor-pointer border transition-all ${
                    isSelected
                      ? 'bg-[#E3F4F8] border-[#22A6C0]/40 shadow-xs'
                      : 'bg-[#F5F7F8] hover:bg-[#EAEFF2] border-transparent'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-xs text-[#0F1A1F]">{item.patientName}</span>
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
                  <p className="text-[11px] text-[#22A6C0] font-medium">{item.caseType}</p>
                  <div className="mt-2 pt-2 border-t border-[#E6EAEC]/60 flex items-center justify-between text-[10px] text-[#8F9AA0] font-mono">
                    <span>AI Conf: {item.aiConfidenceScore}%</span>
                    <span>{item.dateSubmitted}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Inspection, Override & Signature Area (8 cols) */}
        {activeReview && (
          <div className="lg:col-span-8 bg-white rounded-[24px] p-6 border border-[#E6EAEC] shadow-sm space-y-6">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#F0F3F5]">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-base text-[#0F1A1F]">
                    Case Dossier: {activePatient.fullName}
                  </h3>
                  <span className="font-mono text-xs bg-[#F5F7F8] px-2 py-0.5 rounded-full border border-[#E6EAEC]">
                    {activePatient.fileNumber}
                  </span>
                </div>
                <p className="text-xs text-[#8F9AA0] mt-0.5">
                  Type: {activeReview.caseType} · Submitted on {activeReview.dateSubmitted}
                </p>
              </div>

              {/* Status Badge */}
              {activeReview.digitalSignature ? (
                <div className="p-2.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-[#1F9D74] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#1F9D74]" />
                  <div>
                    <p className="font-bold">Final Decision Signed</p>
                    <p className="text-[10px] font-mono">{activeReview.digitalSignature.signedByName}</p>
                  </div>
                </div>
              ) : (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-[#E2A23B]">
                  Pending Clinical Sign-off
                </span>
              )}
            </div>

            {/* Case Synthesis Card */}
            <div className="p-4 rounded-2xl bg-[#F5F7F8] border border-[#E6EAEC] space-y-2 text-xs">
              <span className="font-bold text-[#0F1A1F] block">AI Finding Summary to Review:</span>
              <p className="text-[#8F9AA0] leading-relaxed">
                Tooth #19 deep occlusal caries encroaching pulpal zone (94.8% confidence) and early PDL widening. Recommendation: Molar endodontic therapy + monolithic zirconia crown restoration.
              </p>
              {activeReview.overridden && (
                <div className="mt-2 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
                  <strong>Clinician Override Active:</strong> {activeReview.overrideReason}
                </div>
              )}
            </div>

            {/* If Already Signed */}
            {activeReview.digitalSignature && (
              <div className="p-5 rounded-2xl bg-[#E3F4F8]/50 border border-[#22A6C0]/30 space-y-3 text-xs">
                <div className="flex items-center gap-2 text-[#22A6C0] font-bold">
                  <Lock className="w-4 h-4" />
                  <span>Cryptographic Digital Signature On Record</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#0F1A1F]">
                  <div>
                    <span className="text-[#8F9AA0] block text-[10px]">Signed By Doctor:</span>
                    <p className="font-semibold">{activeReview.digitalSignature.signedByName}</p>
                  </div>
                  <div>
                    <span className="text-[#8F9AA0] block text-[10px]">Medical License:</span>
                    <p className="font-mono font-semibold">{activeReview.digitalSignature.medicalLicenseNo}</p>
                  </div>
                  <div>
                    <span className="text-[#8F9AA0] block text-[10px]">Timestamp (CAT):</span>
                    <p className="font-mono">{activeReview.digitalSignature.signedAt}</p>
                  </div>
                  <div>
                    <span className="text-[#8F9AA0] block text-[10px]">Cryptographic Digest:</span>
                    <p className="font-mono text-[10px] text-[#22A6C0] truncate">{activeReview.digitalSignature.hash}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Bar */}
            <div className="pt-4 border-t border-[#F0F3F5] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsOverrideModalOpen(true)}
                  className="px-4 py-2 rounded-full bg-[#F5F7F8] hover:bg-amber-50 text-xs font-semibold text-[#E2A23B] border border-[#E6EAEC] transition-colors"
                >
                  Override AI Recommendation
                </button>

                <button
                  type="button"
                  onClick={() => setIsRejectModalOpen(true)}
                  className="px-4 py-2 rounded-full bg-[#F5F7F8] hover:bg-red-50 text-xs font-semibold text-[#D9534F] border border-[#E6EAEC] transition-colors"
                >
                  Reject Case
                </button>
              </div>

              {!activeReview.digitalSignature ? (
                <button
                  type="button"
                  onClick={() => setIsSignModalOpen(true)}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#22A6C0] hover:bg-[#1B899F] text-xs font-semibold text-white shadow-md transition-all"
                >
                  <FileSignature className="w-4 h-4" />
                  <span>Apply Digital Signature &amp; Confirm</span>
                </button>
              ) : (
                <button
                  onClick={() => onNavigateModule('treatment-plans')}
                  className="px-5 py-2 rounded-full bg-[#0F1A1F] text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
                >
                  Proceed to Treatment Execution →
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Digital Signature Modal */}
      {isSignModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-[28px] max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#E6EAEC]">
            <div className="flex items-center justify-between pb-3 border-b border-[#F0F3F5] mb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#22A6C0]" />
                <h3 className="font-bold text-base text-[#0F1A1F]">Digital Clinical Signature</h3>
              </div>
              <button onClick={() => setIsSignModalOpen(false)} className="text-[#8F9AA0] hover:text-[#0F1A1F]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmSignature} className="space-y-4 text-xs">
              <p className="text-[#8F9AA0] leading-relaxed">
                By entering your signature, you certify that you have independently examined patient{' '}
                <strong className="text-[#0F1A1F]">{activePatient.fullName}</strong>, reviewed all radiographs, and assume full legal clinical responsibility for the treatment pathway under Rwandan medical regulations.
              </p>

              <div>
                <label className="block font-semibold text-[#0F1A1F] mb-1">
                  Full Doctor Name (Typed Signature) *
                </label>
                <input
                  type="text"
                  required
                  value={signDoctorName}
                  onChange={e => setSignDoctorName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F5F7F8] rounded-full border border-[#E6EAEC] font-semibold text-[#0F1A1F] outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#0F1A1F] mb-1">
                  Rwanda Medical Council License Number *
                </label>
                <input
                  type="text"
                  required
                  value={signLicenseNo}
                  onChange={e => setSignLicenseNo(e.target.value)}
                  className="w-full px-3.5 py-2 bg-[#F5F7F8] rounded-full border border-[#E6EAEC] font-mono text-[#0F1A1F] outline-none"
                />
              </div>

              <div className="p-3.5 rounded-2xl bg-[#E3F4F8]/70 border border-[#22A6C0]/20">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={confirmedResponsibility}
                    onChange={e => setConfirmedResponsibility(e.target.checked)}
                    className="mt-0.5 rounded text-[#22A6C0] focus:ring-[#22A6C0]"
                  />
                  <span className="text-[11px] text-[#1A4550] leading-relaxed">
                    I confirm that I have reviewed the AI-assisted dental assessments and radiological findings and certify this treatment plan under my professional medical license.
                  </span>
                </label>
              </div>

              <div className="pt-3 border-t border-[#F0F3F5] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsSignModalOpen(false)}
                  className="px-4 py-2 rounded-full text-[#8F9AA0]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!confirmedResponsibility}
                  className="px-6 py-2.5 rounded-full bg-[#22A6C0] hover:bg-[#1B899F] text-white font-semibold shadow-md disabled:opacity-40"
                >
                  Execute Digital Signature
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {isRejectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-[28px] max-w-md w-full p-6 shadow-2xl border border-[#E6EAEC]">
            <h3 className="font-bold text-base text-[#0F1A1F] mb-2">Reject Clinical Case</h3>
            <p className="text-xs text-[#8F9AA0] mb-4">
              Reason is required to return this case for diagnostic refinement.
            </p>
            <form onSubmit={handleConfirmReject} className="space-y-4 text-xs">
              <textarea
                required
                rows={3}
                placeholder="State clinical reason for rejection (e.g. artifacts on lower jaw OPG)..."
                value={rejectReason}
                onChange={e => setRejectReason(e.target.value)}
                className="w-full p-3 bg-[#F5F7F8] rounded-2xl border border-[#E6EAEC] outline-none"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsRejectModalOpen(false)}
                  className="px-4 py-2 text-[#8F9AA0]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#D9534F] text-white rounded-full font-semibold"
                >
                  Confirm Rejection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Override Modal */}
      {isOverrideModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-[28px] max-w-md w-full p-6 shadow-2xl border border-[#E6EAEC]">
            <h3 className="font-bold text-base text-[#0F1A1F] mb-2">Override AI Suggestion</h3>
            <p className="text-xs text-[#8F9AA0] mb-4">
              Provide clinical justification for disagreeing with automated findings.
            </p>
            <form onSubmit={handleConfirmOverride} className="space-y-4 text-xs">
              <textarea
                required
                rows={3}
                placeholder="Clinical override reasoning (e.g. conservative pulp capping chosen instead of RCT)..."
                value={overrideReason}
                onChange={e => setOverrideReason(e.target.value)}
                className="w-full p-3 bg-[#F5F7F8] rounded-2xl border border-[#E6EAEC] outline-none"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsOverrideModalOpen(false)}
                  className="px-4 py-2 text-[#8F9AA0]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#E2A23B] text-white rounded-full font-semibold"
                >
                  Record Override
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
