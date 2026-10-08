import React, { useState } from 'react';
import {
  Scan,
  Check,
  Flag,
  RotateCw,
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle2,
  Sliders,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Table
} from 'lucide-react';
import { AIXRayFinding, Patient } from '../../types';
import { INITIAL_AI_XRAY_FINDINGS } from '../../data/mockData';
import { DentalXRayViewer } from '../common/DentalXRayViewer';

interface AIXRayReviewModuleProps {
  patients: Patient[];
  selectedPatientId: string;
  onSelectPatient: (patientId: string) => void;
  onNavigateModule: (moduleId: string) => void;
  showToast: (title: string, message?: string, type?: 'success' | 'warning' | 'info' | 'error') => void;
}

export const AIXRayReviewModule: React.FC<AIXRayReviewModuleProps> = ({
  patients,
  selectedPatientId,
  onSelectPatient,
  onNavigateModule,
  showToast,
}) => {
  const [findings, setFindings] = useState<AIXRayFinding[]>(INITIAL_AI_XRAY_FINDINGS);
  const [selectedTooth, setSelectedTooth] = useState<number | null>(19);
  const [showOverlays, setShowOverlays] = useState<boolean>(true);
  const [isReAnalyzing, setIsReAnalyzing] = useState<boolean>(false);

  const activePatient = patients.find(p => p.id === selectedPatientId) || patients[0];

  const handleAcceptFinding = (id: string) => {
    setFindings(prev =>
      prev.map(f => (f.id === id ? { ...f, status: 'Accepted' as const } : f))
    );
    showToast('Finding Accepted', 'Radiographic finding confirmed by clinician.', 'success');
  };

  const handleFlagFinding = (id: string) => {
    setFindings(prev =>
      prev.map(f => (f.id === id ? { ...f, status: 'Flagged' as const } : f))
    );
    showToast('Finding Flagged', 'Marked for second clinician review or follow-up bitewing.', 'warning');
  };

  const handleReAnalyze = () => {
    setIsReAnalyzing(true);
    setTimeout(() => {
      setIsReAnalyzing(false);
      showToast('Re-Analysis Completed', 'Computer vision model segmented 32 teeth and verified bounding cues.', 'success');
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Disclaimer Banner Required by Rules */}
      <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-[#E2A23B] shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="font-semibold text-amber-900">
            Radiographic AI Overlay — Decision Support Only · Professional Review Required
          </p>
          <p className="text-amber-700 text-[11px] mt-0.5 leading-relaxed">
            Automated teeth segmentation and radiolucency detection provide visual second opinions. Radiographic artifacts, patient movement, or restorative margins can generate false indications. The dentist's clinical judgment and tactile probing remain decisive.
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
            <h2 className="text-xl font-bold text-[#0F1A1F]">AI X-Ray Review &amp; Segmentation</h2>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold font-mono bg-[#E3F4F8] text-[#22A6C0]">
              DeepVision Dental v2.4
            </span>
          </div>
          <p className="text-xs text-[#8F9AA0] mt-0.5">
            Active Panoramic Case: <strong className="text-[#0F1A1F]">{activePatient.fullName}</strong> ({activePatient.fileNumber})
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowOverlays(!showOverlays)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold border transition-all ${
              showOverlays
                ? 'bg-[#E3F4F8] text-[#22A6C0] border-[#22A6C0]/30'
                : 'bg-[#F5F7F8] text-[#8F9AA0] border-[#E6EAEC]'
            }`}
          >
            {showOverlays ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>{showOverlays ? 'AI Overlays On' : 'Hide Overlays'}</span>
          </button>

          <button
            onClick={handleReAnalyze}
            disabled={isReAnalyzing}
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#22A6C0] hover:bg-[#1B899F] text-xs font-semibold text-white shadow-sm transition-all disabled:opacity-50"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isReAnalyzing ? 'animate-spin' : ''}`} />
            <span>{isReAnalyzing ? 'Re-analyzing DICOM...' : 'Re-analyze Image'}</span>
          </button>
        </div>
      </div>

      {/* Radiograph Viewer with Active Overlays */}
      <DentalXRayViewer
        selectedTooth={selectedTooth}
        onSelectTooth={setSelectedTooth}
        showAIOverlays={showOverlays}
        onToggleAIOverlays={() => setShowOverlays(!showOverlays)}
        onFindingClick={setSelectedTooth}
      />

      {/* Findings Verification Cards */}
      <div className="bg-white rounded-[24px] p-6 border border-[#E6EAEC] shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#F0F3F5]">
          <div>
            <h3 className="font-bold text-base text-[#0F1A1F]">Detected Radiographic Cues ({findings.length})</h3>
            <p className="text-xs text-[#8F9AA0] mt-0.5">Click "Accept" to incorporate into treatment plan or "Flag" to dispute</p>
          </div>
          <span className="text-xs text-[#8F9AA0] font-mono">
            {findings.filter(f => f.status === 'Accepted').length} Accepted · {findings.filter(f => f.status === 'Flagged').length} Flagged
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {findings.map(f => {
            const isSelected = selectedTooth === f.toothNumber;
            return (
              <div
                key={f.id}
                onClick={() => setSelectedTooth(f.toothNumber)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#E3F4F8]/40 border-[#22A6C0] shadow-sm'
                    : 'bg-[#F5F7F8] hover:bg-[#EAEFF2] border-[#E6EAEC]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-[#0F1A1F]">
                      Tooth #{f.toothNumber}: {f.findingType}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        f.status === 'Accepted'
                          ? 'bg-emerald-100 text-[#1F9D74]'
                          : f.status === 'Flagged'
                          ? 'bg-amber-100 text-[#E2A23B]'
                          : 'bg-cyan-100 text-[#22A6C0]'
                      }`}
                    >
                      {f.status}
                    </span>
                  </div>

                  <p className="text-xs text-[#8F9AA0] mb-2">{f.toothName} · {f.location}</p>

                  <div className="p-3 rounded-xl bg-white border border-[#E6EAEC] text-xs space-y-1 mb-3">
                    <p className="font-semibold text-[#0F1A1F]">Clinical Correlation:</p>
                    <p className="text-[#8F9AA0] leading-relaxed">{f.clinicalObservationComparison}</p>
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono text-[#8F9AA0]">
                    <span>AI Confidence: <strong className="text-[#22A6C0]">{f.confidence}%</strong></span>
                    <span>Severity: <strong className="text-[#0F1A1F]">{f.severity}</strong></span>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-[#E6EAEC] flex items-center justify-end gap-2">
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      handleFlagFinding(f.id);
                    }}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                      f.status === 'Flagged'
                        ? 'bg-amber-500 text-white'
                        : 'bg-white hover:bg-amber-50 text-[#E2A23B] border border-amber-300'
                    }`}
                  >
                    <Flag className="w-3.5 h-3.5" />
                    <span>Flag Cue</span>
                  </button>

                  <button
                    onClick={e => {
                      e.stopPropagation();
                      handleAcceptFinding(f.id);
                    }}
                    className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                      f.status === 'Accepted'
                        ? 'bg-[#1F9D74] text-white'
                        : 'bg-white hover:bg-emerald-50 text-[#1F9D74] border border-emerald-300'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span>Accept Finding</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI vs Clinical Observation Comparison Table */}
      <div className="bg-white rounded-[24px] p-6 border border-[#E6EAEC] shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#F0F3F5]">
          <h3 className="font-bold text-base text-[#0F1A1F]">AI vs. Clinical Chairside Concordance Table</h3>
          <span className="text-xs text-[#8F9AA0]">Cross-Validation Protocol</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E6EAEC] text-[#8F9AA0] uppercase tracking-wider text-[10px]">
                <th className="py-2.5 px-3">Tooth #</th>
                <th className="py-2.5 px-3">AI Finding</th>
                <th className="py-2.5 px-3">Confidence</th>
                <th className="py-2.5 px-3">Clinical In-Chair Observation</th>
                <th className="py-2.5 px-3">Concordance</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F3F5]">
              {findings.map(f => (
                <tr key={f.id} className="hover:bg-[#F5F7F8]">
                  <td className="py-3 px-3 font-mono font-bold text-[#0F1A1F]">#{f.toothNumber}</td>
                  <td className="py-3 px-3 font-semibold text-[#0F1A1F]">{f.findingType}</td>
                  <td className="py-3 px-3 font-mono text-[#22A6C0] font-bold">{f.confidence}%</td>
                  <td className="py-3 px-3 text-[#8F9AA0] max-w-xs">{f.clinicalObservationComparison}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-[#1F9D74]">
                      Verified Match
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => onNavigateModule('decision-support')}
                      className="text-xs font-semibold text-[#22A6C0] hover:underline"
                    >
                      Plan →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
