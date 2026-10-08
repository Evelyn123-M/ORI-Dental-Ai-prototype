import React, { useState } from 'react';
import {
  GitCompare,
  Download,
  Layers,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  FileText,
  Activity,
  Image as ImageIcon,
  ShieldCheck,
  Stethoscope
} from 'lucide-react';
import { Patient } from '../../types';

interface DecisionSupportModuleProps {
  patients: Patient[];
  selectedPatientId: string;
  onSelectPatient: (patientId: string) => void;
  onNavigateModule: (moduleId: string) => void;
  showToast: (title: string, message?: string, type?: 'success' | 'warning' | 'info' | 'error') => void;
}

export const DecisionSupportModule: React.FC<DecisionSupportModuleProps> = ({
  patients,
  selectedPatientId,
  onSelectPatient,
  onNavigateModule,
  showToast,
}) => {
  const [dentistNotes, setDentistNotes] = useState(
    'Agree with AI synthesis: Root canal therapy indicated for #19 due to pulp chamber encroachment and lingering thermal pain. Need full zirconia crown following obturation to prevent coronal fracture.'
  );

  const activePatient = patients.find(p => p.id === selectedPatientId) || patients[0];

  const handleExportSummary = () => {
    const content = `ORI DENTAL AI - CLINICAL DECISION SUPPORT SUMMARY\nPatient: ${activePatient.fullName} (${activePatient.fileNumber})\nDate: 2026-10-08\n\n1. SYMPTOMS SUMMARY:\n- Sharp cold sensitivity lingering >30s on Tooth #19\n- Spontaneous nocturnal throbbing\n\n2. RADIOGRAPHIC ANALYSIS:\n- Deep occlusal dentinal caries encroaching pulp chamber #19 (94.8%)\n- Widening of periodontal ligament space at mesial root apex (87.5%)\n\n3. INTEGRATED DIAGNOSIS:\n- Symptomatic Irreversible Pulpitis with early Apical Periodontitis\n\n4. DENTIST CLINICAL NOTES:\n${dentistNotes}\n\nORIENTED BY: Dr. Diane Uwase, BDS (Lead Dental Professional)`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Clinical_Decision_Support_${activePatient.fileNumber}.txt`;
    a.click();
    showToast('Summary Exported', 'Decision support dossier downloaded.', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Disclaimer Banner Required by Rules */}
      <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-[#E2A23B] shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="font-semibold text-amber-900">
            Synthesized Clinical Decision Support · Qualified Dentist Sovereign Authority
          </p>
          <p className="text-amber-700 text-[11px] mt-0.5 leading-relaxed">
            This module combines patient symptom triage and panoramic radiograph computer vision into a unified clinical hypothesis. Every treatment intervention requires independent validation by Dr. Diane Uwase prior to patient scheduling.
          </p>
        </div>
        <span className="font-mono text-[10px] text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full shrink-0">
          Prototype Data
        </span>
      </div>

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-[24px] border border-[#E6EAEC] shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-[#0F1A1F]">Integrated Decision Support Matrix</h2>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold font-mono bg-[#E3F4F8] text-[#22A6C0]">
              Unified Synthesis
            </span>
          </div>
          <p className="text-xs text-[#8F9AA0] mt-0.5">
            Cross-Referencing Patient: <strong className="text-[#0F1A1F]">{activePatient.fullName}</strong> ({activePatient.fileNumber})
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportSummary}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#F5F7F8] hover:bg-[#EAEFF2] text-xs font-semibold text-[#0F1A1F] border border-[#E6EAEC] transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#22A6C0]" />
            <span>Export Summary</span>
          </button>

          <button
            onClick={() => onNavigateModule('treatment-plans')}
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#22A6C0] hover:bg-[#1B899F] text-xs font-semibold text-white shadow-sm transition-all"
          >
            <Layers className="w-4 h-4" />
            <span>Create Treatment Plan →</span>
          </button>
        </div>
      </div>

      {/* 3 Summary Panels Grid: Symptoms, X-Ray, and AI Hypotheses */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Panel 1: Triage Symptoms */}
        <div className="bg-white rounded-[24px] p-6 border border-[#E6EAEC] shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#F0F3F5]">
            <Activity className="w-4 h-4 text-[#22A6C0]" />
            <h3 className="font-bold text-sm text-[#0F1A1F]">1. Symptoms Triage</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-2xl bg-[#F5F7F8] border border-[#E6EAEC]">
              <span className="font-bold text-[#0F1A1F]">Primary Complaint:</span>
              <p className="text-[#8F9AA0] mt-1">
                Sharp lingering cold sensitivity (&gt;30s) + night throbbing on Tooth #19.
              </p>
            </div>
            <div className="p-3 rounded-2xl bg-[#F5F7F8] border border-[#E6EAEC]">
              <span className="font-bold text-[#0F1A1F]">Severity:</span>
              <p className="text-[#D9534F] font-semibold mt-1">Severe (8/10 on pain scale)</p>
            </div>
            <div className="p-3 rounded-2xl bg-[#F5F7F8] border border-[#E6EAEC]">
              <span className="font-bold text-[#0F1A1F]">Clinical Examination:</span>
              <p className="text-[#8F9AA0] mt-1">Cavitation visible, positive vertical percussion.</p>
            </div>
          </div>
        </div>

        {/* Panel 2: X-Ray Radiological Evidence */}
        <div className="bg-white rounded-[24px] p-6 border border-[#E6EAEC] shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#F0F3F5]">
            <ImageIcon className="w-4 h-4 text-[#22A6C0]" />
            <h3 className="font-bold text-sm text-[#0F1A1F]">2. Radiographic Findings</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-2xl bg-[#F5F7F8] border border-[#E6EAEC]">
              <span className="font-bold text-[#0F1A1F]">Tooth #19 Coronal Caries:</span>
              <p className="text-[#8F9AA0] mt-1">Deep radiolucency reaching inner pulpal third (94.8% conf).</p>
            </div>
            <div className="p-3 rounded-2xl bg-[#F5F7F8] border border-[#E6EAEC]">
              <span className="font-bold text-[#0F1A1F]">Periapical Status:</span>
              <p className="text-[#8F9AA0] mt-1">Early PDL widening at mesial/distal roots (87.5% conf).</p>
            </div>
            <div className="p-3 rounded-2xl bg-[#F5F7F8] border border-[#E6EAEC]">
              <span className="font-bold text-[#0F1A1F]">Secondary Cues:</span>
              <p className="text-[#8F9AA0] mt-1">Tooth #14 defective mesial restoration overhang (76.2%).</p>
            </div>
          </div>
        </div>

        {/* Panel 3: Unified AI Hypothesis */}
        <div className="bg-white rounded-[24px] p-6 border border-[#22A6C0]/30 shadow-sm space-y-4 bg-gradient-to-b from-[#E3F4F8]/30 to-white">
          <div className="flex items-center justify-between pb-3 border-b border-[#22A6C0]/20">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#22A6C0]" />
              <h3 className="font-bold text-sm text-[#0F1A1F]">3. Unified Synthesis</h3>
            </div>
            <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-full bg-[#22A6C0] text-white">
              95.4% Match
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-2xl bg-white border border-[#22A6C0]/30 shadow-2xs">
              <span className="font-bold text-[#0F1A1F]">Primary Working Diagnosis:</span>
              <p className="text-[#22A6C0] font-semibold mt-1">
                Symptomatic Irreversible Pulpitis #19 with Acute Apical Periodontitis (K04.01/K04.4)
              </p>
            </div>
            <div className="p-3 rounded-2xl bg-white border border-[#E6EAEC]">
              <span className="font-bold text-[#0F1A1F]">Recommended Procedure:</span>
              <p className="text-[#0F1A1F] mt-1">
                Molar Endodontic Therapy (Root Canal) followed by Monolithic Zirconia Full Crown.
              </p>
            </div>
            <div className="p-3 rounded-2xl bg-white border border-[#E6EAEC]">
              <span className="font-bold text-[#0F1A1F]">Local Cost Estimate (RWF):</span>
              <p className="font-mono font-bold text-[#1F9D74] mt-1">~405,000 RWF (Phased)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Dentist Notes & Treatment Plan Handover Card */}
      <div className="bg-white rounded-[24px] p-6 border border-[#E6EAEC] shadow-sm space-y-4">
        <h3 className="font-bold text-base text-[#0F1A1F]">Dentist Clinical Remarks &amp; Protocol Override</h3>
        <p className="text-xs text-[#8F9AA0]">
          Add your clinical notes to accompany the treatment plan proposal.
        </p>

        <textarea
          rows={3}
          value={dentistNotes}
          onChange={e => setDentistNotes(e.target.value)}
          className="w-full p-4 bg-[#F5F7F8] rounded-2xl border border-[#E6EAEC] text-xs text-[#0F1A1F] outline-none focus:border-[#22A6C0] leading-relaxed"
        />

        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-[#8F9AA0]">
            <Stethoscope className="w-4 h-4 text-[#22A6C0]" />
            <span>Verified by Dr. Diane Uwase, BDS · Lead Dental Professional</span>
          </div>

          <button
            onClick={() => onNavigateModule('treatment-plans')}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#22A6C0] hover:bg-[#1B899F] text-xs font-semibold text-white shadow-md transition-all self-end sm:self-auto"
          >
            <span>Generate Phased Treatment Plan</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
