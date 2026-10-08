import React, { useState } from 'react';
import {
  Clock,
  Calendar,
  Filter,
  Download,
  GitCompare,
  FileText,
  Activity,
  Image as ImageIcon,
  Layers,
  ChevronRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Patient, ClinicalAssessment, DentalXRay, TreatmentPlan } from '../../types';

interface ClinicalHistoryModuleProps {
  patients: Patient[];
  selectedPatientId: string;
  onSelectPatient: (patientId: string) => void;
  assessments: ClinicalAssessment[];
  xrays: DentalXRay[];
  treatmentPlans: TreatmentPlan[];
  onNavigateModule: (moduleId: string) => void;
  showToast: (title: string, message?: string, type?: 'success' | 'warning' | 'info' | 'error') => void;
}

export const ClinicalHistoryModule: React.FC<ClinicalHistoryModuleProps> = ({
  patients,
  selectedPatientId,
  onSelectPatient,
  assessments,
  xrays,
  treatmentPlans,
  onNavigateModule,
  showToast,
}) => {
  const [filterType, setFilterType] = useState<'All' | 'Assessment' | 'X-Ray' | 'Treatment'>('All');
  const [compareMode, setCompareMode] = useState(false);

  const activePatient = patients.find(p => p.id === selectedPatientId) || patients[0];

  const patientAssessments = assessments.filter(a => a.patientId === activePatient.id);
  const patientXrays = xrays.filter(x => x.patientId === activePatient.id);
  const patientPlans = treatmentPlans.filter(t => t.patientId === activePatient.id);

  // Unified chronological history items
  const historyEvents = [
    {
      id: 'h-1',
      date: '2026-10-06 14:45',
      type: 'Assessment',
      title: 'Triage Examination & Toothache Assessment',
      author: 'Dr. Diane Uwase',
      details: 'Evaluated sharp cold pain on lower left jaw. Cavitation on Tooth #19 noted.',
      status: 'Pending review',
    },
    {
      id: 'h-2',
      date: '2026-10-06 14:40',
      type: 'X-Ray',
      title: 'Digital Panoramic (OPG) Acquired',
      author: 'Claire Uwera (Radiology)',
      details: 'Full dentition radiograph uploaded. Multi-tooth AI segmentation executed.',
      status: 'Completed',
    },
    {
      id: 'h-3',
      date: '2026-10-06 15:10',
      type: 'Treatment',
      title: 'Endodontic Therapy & Coronal Restoration Plan Generated',
      author: 'Dr. Diane Uwase',
      details: 'Phased procedural plan totaling 405,000 RWF submitted for digital sign-off.',
      status: 'Proposed',
    },
    {
      id: 'h-4',
      date: '2025-11-14 10:00',
      type: 'Assessment',
      title: 'Initial Registration & Baseline Checkup',
      author: 'Claire Uwera',
      details: 'Registered patient at ORI Dental Clinic Masaka. No acute contraindications.',
      status: 'Completed',
    },
  ].filter(e => filterType === 'All' || e.type === filterType);

  const handleExportHistory = () => {
    const text = `ORI DENTAL CLINIC - CHRONOLOGICAL CLINICAL HISTORY\nPatient: ${activePatient.fullName} (${activePatient.fileNumber})\nDOB: ${activePatient.dob} · Phone: ${activePatient.phone}\nAddress: ${activePatient.address}\n\n${historyEvents
      .map(e => `[${e.date}] ${e.type.toUpperCase()}: ${e.title}\nBy: ${e.author}\nDetails: ${e.details}\nStatus: ${e.status}\n`)
      .join('\n---\n')}`;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Clinical_History_${activePatient.fileNumber}.txt`;
    a.click();
    showToast('History Exported', 'Full longitudinal history downloaded.', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-[24px] border border-[#E6EAEC] shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-[#0F1A1F]">Longitudinal Clinical History</h2>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold font-mono bg-[#E3F4F8] text-[#22A6C0]">
              Patient Timeline
            </span>
          </div>
          <p className="text-xs text-[#8F9AA0] mt-0.5">
            Active Record: <strong className="text-[#0F1A1F]">{activePatient.fullName}</strong> ({activePatient.fileNumber})
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => {
              setCompareMode(!compareMode);
              showToast(compareMode ? 'Standard Timeline' : 'Comparison Active', 'Comparing current state with baseline visit.', 'info');
            }}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold border transition-all ${
              compareMode
                ? 'bg-[#22A6C0] text-white border-[#22A6C0]'
                : 'bg-[#F5F7F8] hover:bg-[#EAEFF2] text-[#0F1A1F] border-[#E6EAEC]'
            }`}
          >
            <GitCompare className="w-3.5 h-3.5" />
            <span>Compare Current vs Baseline</span>
          </button>

          <button
            onClick={handleExportHistory}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#22A6C0] hover:bg-[#1B899F] text-xs font-semibold text-white shadow-sm transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Longitudinal Record</span>
          </button>
        </div>
      </div>

      {/* Comparison Drawer if enabled */}
      {compareMode && (
        <div className="bg-[#E3F4F8]/60 rounded-[24px] p-6 border border-[#22A6C0]/30 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="p-4 rounded-2xl bg-white border border-[#E6EAEC] space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8F9AA0] block">
              Baseline Checkup (November 2025)
            </span>
            <p className="font-semibold text-[#0F1A1F]">General Hygiene Status: Good</p>
            <p className="text-[#8F9AA0]">Tooth #19 showed superficial staining with no active cavitation.</p>
            <p className="text-[#8F9AA0]">Probing depths: 1-2mm sulcus.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#22A6C0]/40 shadow-xs space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#22A6C0] block">
              Current Active Status (October 2026)
            </span>
            <p className="font-semibold text-[#0F1A1F]">Acute Pulpitis Present (#19)</p>
            <p className="text-[#D9534F] font-semibold">Deep cavitated decay reaching inner pulpal third + apical widening.</p>
            <p className="text-[#8F9AA0]">Probing depths: 2-3mm, percussion tender (+).</p>
          </div>
        </div>
      )}

      {/* Timeline Strip */}
      <div className="bg-white rounded-[24px] p-6 border border-[#E6EAEC] shadow-sm space-y-6">
        {/* Filter Chips */}
        <div className="flex items-center justify-between pb-4 border-b border-[#F0F3F5]">
          <div className="flex items-center gap-1 text-xs">
            {(['All', 'Assessment', 'X-Ray', 'Treatment'] as const).map(tp => (
              <button
                key={tp}
                onClick={() => setFilterType(tp)}
                className={`px-3 py-1.5 rounded-full font-medium transition-colors ${
                  filterType === tp
                    ? 'bg-[#E3F4F8] text-[#22A6C0] font-semibold'
                    : 'text-[#8F9AA0] hover:text-[#0F1A1F]'
                }`}
              >
                {tp}
              </button>
            ))}
          </div>

          <span className="text-xs text-[#8F9AA0] font-mono">
            {historyEvents.length} events logged
          </span>
        </div>

        {/* Chronological Timeline */}
        <div className="relative pl-6 space-y-8 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E6EAEC]">
          {historyEvents.map(event => (
            <div key={event.id} className="relative group">
              {/* Dot */}
              <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-white border-2 border-[#22A6C0] shadow-xs group-hover:scale-125 transition-transform" />

              <div className="p-5 rounded-2xl bg-[#F5F7F8] hover:bg-[#E3F4F8]/50 border border-[#E6EAEC] transition-all space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white text-[#22A6C0] border border-[#22A6C0]/20">
                      {event.type}
                    </span>
                    <h4 className="font-bold text-sm text-[#0F1A1F]">{event.title}</h4>
                  </div>
                  <span className="font-mono text-xs text-[#8F9AA0]">{event.date}</span>
                </div>

                <p className="text-xs text-[#8F9AA0] leading-relaxed">{event.details}</p>

                <div className="flex items-center justify-between pt-2 border-t border-[#E6EAEC]/60 text-xs text-[#8F9AA0]">
                  <span>Clinician: {event.author}</span>
                  <span className="font-medium text-[#22A6C0]">{event.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
