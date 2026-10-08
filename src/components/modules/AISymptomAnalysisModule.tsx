import React, { useState } from 'react';
import {
  Sparkles,
  RefreshCw,
  Download,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldAlert,
  HelpCircle,
  Activity,
  Layers,
  Info
} from 'lucide-react';
import { AISymptomFinding, Patient } from '../../types';
import { INITIAL_AI_SYMPTOM_FINDINGS } from '../../data/mockData';

interface AISymptomAnalysisModuleProps {
  findings?: AISymptomFinding[];
  patients: Patient[];
  selectedPatientId: string;
  onSelectPatient: (patientId: string) => void;
  onNavigateModule: (moduleId: string) => void;
  showToast: (title: string, message?: string, type?: 'success' | 'warning' | 'info' | 'error') => void;
}

export const AISymptomAnalysisModule: React.FC<AISymptomAnalysisModuleProps> = ({
  findings = INITIAL_AI_SYMPTOM_FINDINGS,
  patients,
  selectedPatientId,
  onSelectPatient,
  onNavigateModule,
  showToast,
}) => {
  const [isReRunning, setIsReRunning] = useState(false);
  const [activeTab, setActiveTab] = useState<'All' | 'High Urgency' | 'Moderate'>('All');

  const activePatient = patients.find(p => p.id === selectedPatientId) || patients[0];

  const handleReRun = () => {
    setIsReRunning(true);
    setTimeout(() => {
      setIsReRunning(false);
      showToast('AI Inference Complete', 'Bayesian model re-evaluated latest patient records.', 'success');
    }, 1200);
  };

  const handleExportSummary = () => {
    const text = `ORI DENTAL AI - SYMPTOM ANALYSIS REPORT\nPatient: ${activePatient.fullName} (${activePatient.fileNumber})\nModel: ORI Symptom Support 2.4\nDate: 2026-10-08\n\n${findings
      .map(
        f =>
          `Condition: ${f.condition} (${f.icdCode})\nConfidence: ${f.confidence}%\nUrgency: ${f.urgency}\nReasoning: ${f.reasoning}\nSuggested: ${f.suggestedAction}\n`
      )
      .join('\n---\n')}`;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AI_Symptom_Summary_${activePatient.fileNumber}.txt`;
    a.click();
    showToast('Report Exported', 'Symptom diagnostic brief downloaded.', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Disclaimer Banner Required by Rules */}
      <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-[#E2A23B] shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="font-semibold text-amber-900">
            AI Suggestion — Decision Support Only · Professional Review Required
          </p>
          <p className="text-amber-700 text-[11px] mt-0.5 leading-relaxed">
            The probabilistic inferences below are synthesized from patient triage complaints and clinical observations. In accordance with Rwandan health guidelines, this system does not deliver autonomous diagnoses. A qualified dental professional must review, palpate, and confirm all findings before initiating therapy.
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
            <h2 className="text-xl font-bold text-[#0F1A1F]">AI Symptom Analysis Engine</h2>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold font-mono bg-[#E3F4F8] text-[#22A6C0]">
              ORI Symptom Support 2.4
            </span>
          </div>
          <p className="text-xs text-[#8F9AA0] mt-0.5">
            Active Case: <strong className="text-[#0F1A1F]">{activePatient.fullName}</strong> ({activePatient.fileNumber})
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
            onClick={handleReRun}
            disabled={isReRunning}
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#22A6C0] hover:bg-[#1B899F] text-xs font-semibold text-white shadow-sm transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isReRunning ? 'animate-spin' : ''}`} />
            <span>{isReRunning ? 'Running Inference...' : 'Re-run Analysis'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Findings Cards + Model Architecture Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Probabilistic Findings Cards (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {findings.map(finding => {
            const isHigh = finding.urgency === 'High' || finding.urgency === 'Immediate';
            return (
              <div
                key={finding.id}
                className="bg-white rounded-[24px] p-6 border border-[#E6EAEC] shadow-sm space-y-4 hover:shadow-md transition-shadow"
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#F0F3F5]">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-base text-[#0F1A1F]">{finding.condition}</h3>
                      <span className="font-mono text-xs text-[#8F9AA0] font-normal">
                        [{finding.icdCode}]
                      </span>
                    </div>
                    <span
                      className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        isHigh ? 'bg-red-100 text-[#D9534F]' : 'bg-amber-100 text-[#E2A23B]'
                      }`}
                    >
                      Urgency: {finding.urgency}
                    </span>
                  </div>

                  {/* Confidence meter with cyan pill progress */}
                  <div className="sm:text-right">
                    <div className="flex items-center gap-2 sm:justify-end">
                      <span className="text-xs text-[#8F9AA0]">AI Confidence:</span>
                      <span className="text-base font-bold font-mono text-[#22A6C0]">
                        {finding.confidence}%
                      </span>
                    </div>
                    <div className="w-36 bg-[#F5F7F8] h-2 rounded-full overflow-hidden mt-1 sm:ml-auto">
                      <div
                        className="bg-[#22A6C0] h-full rounded-full"
                        style={{ width: `${finding.confidence}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Correlated Symptoms Pills */}
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8F9AA0] block mb-1.5">
                    Correlated Clinical Complaints:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {finding.correlatedSymptoms.map((sym, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-full text-[11px] bg-[#E3F4F8] text-[#1D7486] font-medium border border-[#22A6C0]/20"
                      >
                        ✓ {sym}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Algorithmic Reasoning */}
                <div className="p-3.5 rounded-2xl bg-[#F5F7F8] border border-[#E6EAEC] text-xs text-[#0F1A1F] leading-relaxed">
                  <p className="font-semibold mb-1 flex items-center gap-1.5 text-[#0F1A1F]">
                    <Sparkles className="w-3.5 h-3.5 text-[#22A6C0]" /> Bayesian Diagnostic Rationale:
                  </p>
                  <p className="text-[#8F9AA0]">{finding.reasoning}</p>
                </div>

                {/* Differential Diagnosis & Next Action */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
                  <div>
                    <span className="font-semibold text-[#0F1A1F] block mb-1">
                      Differential Candidates:
                    </span>
                    <ul className="text-[11px] text-[#8F9AA0] space-y-0.5">
                      {finding.differentialDiagnosis.map((d, idx) => (
                        <li key={idx}>• {d}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="font-semibold text-[#0F1A1F] block mb-1">
                      Suggested Clinical Next Step:
                    </span>
                    <p className="text-[11px] text-[#22A6C0] font-medium leading-relaxed">
                      {finding.suggestedAction}
                    </p>
                  </div>
                </div>

                {/* Action Handover */}
                <div className="pt-3 border-t border-[#F0F3F5] flex items-center justify-between">
                  <span className="text-[11px] text-[#8F9AA0]">
                    Link to radiological review for tooth confirmation
                  </span>
                  <button
                    onClick={() => onNavigateModule('xrays')}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#E3F4F8] hover:bg-[#d0eff5] text-[#22A6C0] font-semibold text-xs transition-colors"
                  >
                    <span>Inspect X-Ray for this finding</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Diagnostic Pattern Chart & Engine Attributes (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-[24px] p-6 border border-[#E6EAEC] shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#F0F3F5]">
            <h3 className="font-bold text-sm text-[#0F1A1F]">Pattern Analysis Summary</h3>
            <span className="text-xs font-mono text-[#22A6C0]">Patient Case</span>
          </div>

          {/* Probability Distribution */}
          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="font-medium text-[#0F1A1F]">Endodontic Involvement (Pulp)</span>
                <span className="font-mono font-bold text-[#22A6C0]">94.6%</span>
              </div>
              <div className="w-full bg-[#F5F7F8] h-2 rounded-full overflow-hidden">
                <div className="bg-[#22A6C0] h-full rounded-full" style={{ width: '94.6%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="font-medium text-[#0F1A1F]">Periodontal Pocket Infection</span>
                <span className="font-mono font-bold text-[#22A6C0]">88.2%</span>
              </div>
              <div className="w-full bg-[#F5F7F8] h-2 rounded-full overflow-hidden">
                <div className="bg-[#22A6C0] h-full rounded-full" style={{ width: '88.2%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="font-medium text-[#0F1A1F]">Pericoronitis (3rd Molar)</span>
                <span className="font-mono font-bold text-[#22A6C0]">96.1%</span>
              </div>
              <div className="w-full bg-[#F5F7F8] h-2 rounded-full overflow-hidden">
                <div className="bg-[#22A6C0] h-full rounded-full" style={{ width: '96.1%' }} />
              </div>
            </div>
          </div>

          {/* Model Specification Card */}
          <div className="p-4 rounded-2xl bg-[#F5F7F8] border border-[#E6EAEC] space-y-2 text-xs">
            <p className="font-bold text-[#0F1A1F]">Algorithm Architecture</p>
            <p className="text-[11px] text-[#8F9AA0] leading-relaxed">
              Trained on multi-modal clinical tooth telemetry and validated against Rwandan epidemiology dental checkups.
            </p>
            <div className="pt-2 border-t border-[#E6EAEC] space-y-1 text-[11px] font-mono text-[#8F9AA0]">
              <div className="flex justify-between">
                <span>Sensitivity:</span>
                <span className="text-[#0F1A1F] font-bold">96.8%</span>
              </div>
              <div className="flex justify-between">
                <span>Specificity:</span>
                <span className="text-[#0F1A1F] font-bold">94.1%</span>
              </div>
              <div className="flex justify-between">
                <span>Latency:</span>
                <span className="text-[#22A6C0] font-bold">140ms</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigateModule('decision-support')}
            className="w-full py-2.5 rounded-full bg-[#0F1A1F] text-white font-semibold text-xs hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-xs"
          >
            <span>Proceed to Integrated Decision Support →</span>
          </button>
        </div>
      </div>
    </div>
  );
};
