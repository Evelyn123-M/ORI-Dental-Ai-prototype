import React, { useState } from 'react';
import {
  Layers,
  Plus,
  Trash2,
  Printer,
  Download,
  CheckCircle2,
  Send,
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  FileText,
  DollarSign,
  AlertCircle
} from 'lucide-react';
import { TreatmentPlan, Patient, TreatmentPlanStatus, TreatmentPhase } from '../../types';

interface TreatmentPlansModuleProps {
  treatmentPlans: TreatmentPlan[];
  patients: Patient[];
  selectedPatientId: string;
  onSelectPatient: (patientId: string) => void;
  onUpdateTreatmentPlan: (plan: TreatmentPlan) => void;
  onNavigateModule: (moduleId: string) => void;
  showToast: (title: string, message?: string, type?: 'success' | 'warning' | 'info' | 'error') => void;
}

export const TreatmentPlansModule: React.FC<TreatmentPlansModuleProps> = ({
  treatmentPlans,
  patients,
  selectedPatientId,
  onSelectPatient,
  onUpdateTreatmentPlan,
  onNavigateModule,
  showToast,
}) => {
  const activePatient = patients.find(p => p.id === selectedPatientId) || patients[0];
  const activePlan = treatmentPlans.find(t => t.patientId === activePatient.id) || treatmentPlans[0];

  const [currentPlan, setCurrentPlan] = useState<TreatmentPlan>(activePlan);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

  // Calculate live total cost
  const calculatedTotal = currentPlan.phases.reduce((acc, ph) => {
    return acc + ph.procedures.reduce((pAcc, p) => pAcc + p.costRwf, 0);
  }, 0);

  const handleStatusChange = (newStatus: TreatmentPlanStatus) => {
    const updated = { ...currentPlan, status: newStatus };
    setCurrentPlan(updated);
    onUpdateTreatmentPlan(updated);
    showToast('Plan Status Updated', `Status changed to ${newStatus}.`, 'success');
  };

  const handleRemoveProcedure = (phaseId: string, procId: string) => {
    const updatedPhases = currentPlan.phases.map(ph => {
      if (ph.id === phaseId) {
        return {
          ...ph,
          procedures: ph.procedures.filter(p => p.id !== procId),
        };
      }
      return ph;
    });
    const updated = { ...currentPlan, phases: updatedPhases };
    setCurrentPlan(updated);
    onUpdateTreatmentPlan(updated);
    showToast('Procedure Removed', 'Treatment plan line item removed.', 'info');
  };

  const handleAddProcedure = (phaseId: string) => {
    const newProc = {
      id: `pr-${Date.now()}`,
      code: 'D2391',
      name: 'Resin Composite Restoration (1 Surface)',
      tooth: 'Tooth #19',
      costRwf: 25000,
      status: 'Pending' as const,
      notes: 'Occlusal anatomical build-up with light-cure hybrid composite.',
    };

    const updatedPhases = currentPlan.phases.map(ph => {
      if (ph.id === phaseId) {
        return {
          ...ph,
          procedures: [...ph.procedures, newProc],
        };
      }
      return ph;
    });

    const updated = { ...currentPlan, phases: updatedPhases };
    setCurrentPlan(updated);
    onUpdateTreatmentPlan(updated);
    showToast('Procedure Added', 'New dental procedure added to phase.', 'success');
  };

  const handleSubmitForReview = () => {
    handleStatusChange('Proposed');
    showToast(
      'Submitted for Professional Review',
      'Treatment plan forwarded to Dr. Diane Uwase for digital signature.',
      'success'
    );
    onNavigateModule('professional-review');
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-[24px] border border-[#E6EAEC] shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-[#0F1A1F]">Phased Treatment Planning</h2>
            <span
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                currentPlan.status === 'Approved'
                  ? 'bg-emerald-100 text-[#1F9D74]'
                  : currentPlan.status === 'Proposed'
                  ? 'bg-cyan-100 text-[#22A6C0]'
                  : 'bg-amber-100 text-[#E2A23B]'
              }`}
            >
              {currentPlan.status}
            </span>
          </div>
          <p className="text-xs text-[#8F9AA0] mt-0.5">
            Patient: <strong className="text-[#0F1A1F]">{activePatient.fullName}</strong> ({activePatient.fileNumber}) · Lead Dentist: {currentPlan.dentistName}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPdfModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#F5F7F8] hover:bg-[#EAEFF2] text-xs font-semibold text-[#0F1A1F] border border-[#E6EAEC] transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-[#22A6C0]" />
            <span>Print / PDF Export</span>
          </button>

          <button
            onClick={handleSubmitForReview}
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#22A6C0] hover:bg-[#1B899F] text-xs font-semibold text-white shadow-sm transition-all"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Submit for Dentist Signature</span>
          </button>
        </div>
      </div>

      {/* Overview Card: Diagnosis, Summary & Total in RWF */}
      <div className="bg-white rounded-[24px] p-6 border border-[#E6EAEC] shadow-sm grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-8 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8F9AA0]">
            Clinical Treatment Outline
          </span>
          <h3 className="text-lg font-bold text-[#0F1A1F]">{currentPlan.title}</h3>
          <p className="text-xs text-[#8F9AA0] leading-relaxed">{currentPlan.diagnosisSummary}</p>
          <p className="text-xs text-[#0F1A1F] mt-2 italic">"{currentPlan.notes}"</p>
        </div>

        <div className="md:col-span-4 bg-[#E3F4F8]/60 rounded-2xl p-5 border border-[#22A6C0]/20 text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#22A6C0] block mb-1">
            Total Estimated Cost (RWF)
          </span>
          <p className="text-3xl font-extrabold font-mono text-[#166E7F]">
            {calculatedTotal.toLocaleString()} RWF
          </p>
          <span className="text-[11px] text-[#8F9AA0] mt-1 block">
            Across {currentPlan.phases.length} treatment phases
          </span>
        </div>
      </div>

      {/* Phased Procedure Timeline */}
      <div className="space-y-6">
        {currentPlan.phases.map(phase => {
          const phaseTotal = phase.procedures.reduce((acc, p) => acc + p.costRwf, 0);

          return (
            <div
              key={phase.id}
              className="bg-white rounded-[24px] p-6 border border-[#E6EAEC] shadow-sm space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#F0F3F5]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#E3F4F8] text-[#22A6C0] flex items-center justify-center font-bold text-xs">
                    P{phase.phaseNumber}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#0F1A1F]">{phase.name}</h4>
                    <p className="text-[11px] text-[#8F9AA0] flex items-center gap-1.5 mt-0.5">
                      <Clock className="w-3 h-3 text-[#22A6C0]" /> Target Timeline: {phase.targetTimeline}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <span className="font-mono text-xs font-bold text-[#0F1A1F]">
                    Phase Subtotal: {phaseTotal.toLocaleString()} RWF
                  </span>
                  <button
                    onClick={() => handleAddProcedure(phase.id)}
                    className="p-1.5 rounded-full hover:bg-[#F5F7F8] text-[#22A6C0] border border-[#22A6C0]/30"
                    title="Add procedure to this phase"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Procedures Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#E6EAEC] text-[#8F9AA0] uppercase tracking-wider text-[10px]">
                      <th className="py-2.5 px-3">CDT Code</th>
                      <th className="py-2.5 px-3">Procedure Name</th>
                      <th className="py-2.5 px-3">Tooth Site</th>
                      <th className="py-2.5 px-3">Clinical Remarks</th>
                      <th className="py-2.5 px-3">Cost (RWF)</th>
                      <th className="py-2.5 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F0F3F5]">
                    {phase.procedures.map(proc => (
                      <tr key={proc.id} className="hover:bg-[#F5F7F8]">
                        <td className="py-3 px-3 font-mono font-bold text-[#22A6C0]">{proc.code}</td>
                        <td className="py-3 px-3 font-semibold text-[#0F1A1F]">{proc.name}</td>
                        <td className="py-3 px-3 font-mono text-[#8F9AA0]">{proc.tooth || '—'}</td>
                        <td className="py-3 px-3 text-[#8F9AA0] max-w-xs">{proc.notes}</td>
                        <td className="py-3 px-3 font-mono font-bold text-[#0F1A1F]">
                          {proc.costRwf.toLocaleString()} RWF
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={() => handleRemoveProcedure(phase.id, proc.id)}
                            className="p-1 hover:text-[#D9534F] text-[#8F9AA0] transition-colors"
                            title="Remove procedure"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>

      {/* PDF Export Modal Simulation */}
      {isPdfModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-[28px] max-w-2xl w-full p-8 shadow-2xl border border-[#E6EAEC] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#E6EAEC] mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#E3F4F8] text-[#22A6C0] flex items-center justify-center font-bold">
                  ORI
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#0F1A1F]">Official Treatment Plan Estimate</h3>
                  <p className="text-[11px] text-[#8F9AA0]">ORI Dental Clinic · Kicukiro, Masaka, Kigali</p>
                </div>
              </div>
              <button
                onClick={() => setIsPdfModalOpen(false)}
                className="text-xs px-3 py-1.5 rounded-full bg-[#F5F7F8] hover:bg-[#EAEFF2]"
              >
                Close
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-[#F5F7F8]">
                <div>
                  <p className="font-semibold text-[#0F1A1F]">Patient: {activePatient.fullName}</p>
                  <p className="text-[#8F9AA0]">File: {activePatient.fileNumber} · Age: {activePatient.age}</p>
                  <p className="text-[#8F9AA0]">Address: {activePatient.address}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-[#0F1A1F]">Date: 2026-10-08</p>
                  <p className="text-[#8F9AA0]">Dentist: Dr. Diane Uwase, BDS</p>
                  <p className="text-[#8F9AA0]">Phone: {activePatient.phone}</p>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-sm text-[#0F1A1F] mb-1">{currentPlan.title}</h4>
                <p className="text-[#8F9AA0]">{currentPlan.diagnosisSummary}</p>
              </div>

              <div className="border border-[#E6EAEC] rounded-2xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F5F7F8] text-[#8F9AA0]">
                    <tr>
                      <th className="p-2.5">Procedure</th>
                      <th className="p-2.5">Phase</th>
                      <th className="p-2.5 text-right">Cost (RWF)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F0F3F5]">
                    {currentPlan.phases.flatMap(ph =>
                      ph.procedures.map(pr => (
                        <tr key={pr.id}>
                          <td className="p-2.5 font-medium">{pr.name} ({pr.tooth})</td>
                          <td className="p-2.5 text-[#8F9AA0]">Phase {ph.phaseNumber}</td>
                          <td className="p-2.5 text-right font-mono font-bold">
                            {pr.costRwf.toLocaleString()} RWF
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                  <tfoot className="bg-[#E3F4F8]/50 font-bold">
                    <tr>
                      <td colSpan={2} className="p-3 text-right">Total Payable:</td>
                      <td className="p-3 text-right font-mono text-base text-[#166E7F]">
                        {calculatedTotal.toLocaleString()} RWF
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <span className="text-[11px] text-[#8F9AA0]">
                  Accepted payments: MTN MoMo, Airtel Money, BK Bank Transfer
                </span>
                <button
                  onClick={() => {
                    setIsPdfModalOpen(false);
                    showToast('Document Printed', 'Clinical PDF ready for patient signature.', 'success');
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#22A6C0] text-white font-semibold hover:bg-[#1B899F]"
                >
                  Print Official Document
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
