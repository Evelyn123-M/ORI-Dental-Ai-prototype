import React, { useState } from 'react';
import {
  Activity,
  Plus,
  Search,
  Filter,
  Sliders,
  AlertCircle,
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  X
} from 'lucide-react';
import { SymptomRecord, Patient, SymptomSeverity } from '../../types';
import { TEETH_MAP } from '../common/DentalXRayViewer';

interface SymptomsModuleProps {
  symptoms: SymptomRecord[];
  patients: Patient[];
  selectedPatientId: string;
  onSelectPatient: (patientId: string) => void;
  onAddSymptom: (symptom: SymptomRecord) => void;
  onNavigateModule: (moduleId: string) => void;
  showToast: (title: string, message?: string, type?: 'success' | 'warning' | 'info' | 'error') => void;
}

export const SymptomsModule: React.FC<SymptomsModuleProps> = ({
  symptoms,
  patients,
  selectedPatientId,
  onSelectPatient,
  onAddSymptom,
  onNavigateModule,
  showToast,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBulkEntryOpen, setIsBulkEntryOpen] = useState(false);

  const activePatient = patients.find(p => p.id === selectedPatientId) || patients[0];

  // New symptom form
  const [symptomType, setSymptomType] = useState('Sharp lingering cold pain');
  const [category, setCategory] = useState<'Pain' | 'Sensitivity' | 'Bleeding' | 'Swelling' | 'Aesthetic' | 'Mobility'>('Pain');
  const [duration, setDuration] = useState('4 days');
  const [severityScore, setSeverityScore] = useState<number>(7);
  const [selectedToothNum, setSelectedToothNum] = useState<number>(19);
  const [source, setSource] = useState<'Patient-reported' | 'Clinically observed'>('Patient-reported');
  const [triggers, setTriggers] = useState<string>('Cold water, chewing bread');

  const filteredSymptoms = symptoms.filter(s => {
    const matchesSearch =
      s.symptomType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.toothLocation.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || s.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getSeverityLabel = (score: number): SymptomSeverity => {
    if (score <= 3) return 'Mild';
    if (score <= 6) return 'Moderate';
    return 'Severe';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const toothInfo = TEETH_MAP[selectedToothNum];
    const newRecord: SymptomRecord = {
      id: `sym-${Date.now()}`,
      patientId: activePatient.id,
      patientName: activePatient.fullName,
      symptomType,
      category,
      duration,
      severity: getSeverityLabel(severityScore),
      severityScore,
      toothLocation: toothInfo ? `Tooth #${toothInfo.num} (${toothInfo.name})` : `Tooth #${selectedToothNum}`,
      toothNumber: selectedToothNum,
      triggers: triggers.split(',').map(t => t.trim()),
      source,
      dateReported: new Date().toISOString().slice(0, 10),
      status: 'Active',
    };

    onAddSymptom(newRecord);
    setIsModalOpen(false);
    showToast('Symptom Logged', `Recorded for ${activePatient.fullName}. AI correlation updated.`, 'success');
  };

  const handleBulkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Bulk entry creates 2 records quickly
    const r1: SymptomRecord = {
      id: `sym-${Date.now()}-1`,
      patientId: activePatient.id,
      patientName: activePatient.fullName,
      symptomType: 'Spontaneous nocturnal throbbing',
      category: 'Pain',
      duration: '3 nights',
      severity: 'Severe',
      severityScore: 8,
      toothLocation: 'Tooth #19 (Lower Left 1st Molar)',
      toothNumber: 19,
      triggers: ['Lying supine', 'Warm food'],
      source: 'Patient-reported',
      dateReported: new Date().toISOString().slice(0, 10),
      status: 'Active',
    };
    onAddSymptom(r1);
    setIsBulkEntryOpen(false);
    showToast('Batch Symptoms Added', '2 clinical complaints successfully registered.', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-[24px] border border-[#E6EAEC] shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-[#0F1A1F]">Symptom Tracking &amp; Triage</h2>
          <p className="text-xs text-[#8F9AA0] mt-0.5">
            Log patient-reported sensations and clinically observed oral indicators
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsBulkEntryOpen(true)}
            className="px-4 py-2 rounded-full bg-[#F5F7F8] hover:bg-[#EAEFF2] text-xs font-semibold text-[#0F1A1F] border border-[#E6EAEC] transition-colors"
          >
            Bulk Triage Entry
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#22A6C0] hover:bg-[#1B899F] text-xs font-semibold text-white shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Log Symptom</span>
          </button>
        </div>
      </div>

      {/* Grid: Left Symptom Feed, Right Correlation Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Symptoms Table & Timeline (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-[24px] p-6 border border-[#E6EAEC] shadow-sm space-y-5">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#F0F3F5]">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 text-[#8F9AA0] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search symptom, tooth, or patient..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-[#F5F7F8] rounded-full text-xs text-[#0F1A1F] border border-[#E6EAEC] outline-none"
              />
            </div>

            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar text-xs">
              {(['All', 'Pain', 'Sensitivity', 'Bleeding', 'Swelling'] as const).map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3 py-1 rounded-full text-[11px] font-medium whitespace-nowrap transition-colors ${
                    categoryFilter === cat
                      ? 'bg-[#E3F4F8] text-[#22A6C0] font-semibold'
                      : 'text-[#8F9AA0] hover:text-[#0F1A1F]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* List of Symptoms */}
          <div className="space-y-3">
            {filteredSymptoms.map(sym => (
              <div
                key={sym.id}
                className="p-4 rounded-2xl bg-[#F5F7F8] hover:bg-[#EAEFF2]/70 border border-[#E6EAEC] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-xs text-[#0F1A1F]">{sym.symptomType}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        sym.source === 'Clinically observed'
                          ? 'bg-[#E3F4F8] text-[#22A6C0]'
                          : 'bg-slate-200 text-[#0F1A1F]'
                      }`}
                    >
                      {sym.source}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        sym.severity === 'Severe'
                          ? 'bg-red-100 text-[#D9534F]'
                          : sym.severity === 'Moderate'
                          ? 'bg-amber-100 text-[#E2A23B]'
                          : 'bg-emerald-100 text-[#1F9D74]'
                      }`}
                    >
                      {sym.severity} ({sym.severityScore}/10)
                    </span>
                  </div>

                  <p className="text-xs text-[#22A6C0] font-medium">{sym.toothLocation}</p>
                  <p className="text-[11px] text-[#8F9AA0]">
                    Patient: <strong>{sym.patientName}</strong> · Duration: {sym.duration} · Triggers: {sym.triggers.join(', ')}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                  <span className="text-[11px] font-mono text-[#8F9AA0]">{sym.dateReported}</span>
                  <button
                    onClick={() => onNavigateModule('ai-symptoms')}
                    className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#22A6C0] hover:text-white text-[#22A6C0] border border-[#22A6C0]/30 text-xs font-semibold shadow-2xs transition-all flex items-center gap-1"
                  >
                    <span>Analyze</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Correlation & AI Diagnostic Panel (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-[24px] p-6 border border-[#E6EAEC] shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#F0F3F5]">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#22A6C0]" />
              <h3 className="font-bold text-sm text-[#0F1A1F]">Symptom Correlation Matrix</h3>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#E3F4F8] text-[#22A6C0] font-bold">
              AI Support 2.4
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#E3F4F8]/50 border border-[#22A6C0]/20 space-y-2 text-xs">
            <p className="font-bold text-[#0F1A1F]">Bayesian Pathologic Match</p>
            <p className="text-[#1A4550] leading-relaxed">
              Patient Aline Niyonsaba reports cold lingering pain (&gt;30s) + nocturnal throbbing on Tooth #19.
            </p>
            <div className="flex items-center justify-between pt-2 border-t border-[#22A6C0]/20">
              <span className="text-xs text-[#0F1A1F] font-semibold">Irreversible Pulpitis</span>
              <span className="font-mono font-bold text-[#22A6C0]">94.6% Confidence</span>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-xs text-[#0F1A1F]">Trigger Frequency Analysis</h4>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span>Thermal extremes (Cold/Hot)</span>
                  <span className="font-mono text-[#22A6C0] font-bold">88%</span>
                </div>
                <div className="w-full bg-[#F5F7F8] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#22A6C0] h-full rounded-full" style={{ width: '88%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span>Masticatory pressure (Biting)</span>
                  <span className="font-mono text-[#22A6C0] font-bold">64%</span>
                </div>
                <div className="w-full bg-[#F5F7F8] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#22A6C0] h-full rounded-full" style={{ width: '64%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span>Spontaneous (Nocturnal)</span>
                  <span className="font-mono text-[#22A6C0] font-bold">42%</span>
                </div>
                <div className="w-full bg-[#F5F7F8] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#22A6C0] h-full rounded-full" style={{ width: '42%' }} />
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigateModule('ai-symptoms')}
            className="w-full py-2.5 rounded-full bg-[#22A6C0] text-white font-semibold text-xs hover:bg-[#1B899F] transition-all flex items-center justify-center gap-2 shadow-xs"
          >
            <span>Proceed to AI Symptom Engine →</span>
          </button>
        </div>
      </div>

      {/* Log Symptom Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-[28px] max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#E6EAEC] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#F0F3F5] mb-4">
              <h3 className="font-bold text-base text-[#0F1A1F]">Log Patient Symptom</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-[#8F9AA0] hover:text-[#0F1A1F]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#0F1A1F] mb-1">Patient</label>
                <input
                  type="text"
                  disabled
                  value={`${activePatient.fullName} (${activePatient.fileNumber})`}
                  className="w-full px-3.5 py-2 bg-[#F5F7F8] rounded-full border border-[#E6EAEC] text-[#8F9AA0]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#0F1A1F] mb-1">Category</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-[#F5F7F8] rounded-full border border-[#E6EAEC] outline-none"
                  >
                    <option value="Pain">Pain</option>
                    <option value="Sensitivity">Sensitivity</option>
                    <option value="Bleeding">Bleeding</option>
                    <option value="Swelling">Swelling</option>
                    <option value="Aesthetic">Aesthetic</option>
                    <option value="Mobility">Mobility</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-[#0F1A1F] mb-1">Source</label>
                  <select
                    value={source}
                    onChange={e => setSource(e.target.value as any)}
                    className="w-full px-3 py-2 bg-[#F5F7F8] rounded-full border border-[#E6EAEC] outline-none"
                  >
                    <option value="Patient-reported">Patient-reported</option>
                    <option value="Clinically observed">Clinically observed</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#0F1A1F] mb-1">Symptom Description *</label>
                <input
                  type="text"
                  required
                  value={symptomType}
                  onChange={e => setSymptomType(e.target.value)}
                  placeholder="e.g. Sharp pain when drinking iced water"
                  className="w-full px-3.5 py-2 bg-[#F5F7F8] rounded-full border border-[#E6EAEC] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#0F1A1F] mb-1">Duration</label>
                  <input
                    type="text"
                    value={duration}
                    onChange={e => setDuration(e.target.value)}
                    placeholder="e.g. 3 days, 2 weeks"
                    className="w-full px-3.5 py-2 bg-[#F5F7F8] rounded-full border border-[#E6EAEC] outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#0F1A1F] mb-1">Tooth Location (1-32)</label>
                  <select
                    value={selectedToothNum}
                    onChange={e => setSelectedToothNum(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#F5F7F8] rounded-full border border-[#E6EAEC] outline-none font-mono"
                  >
                    {Object.values(TEETH_MAP).map(t => (
                      <option key={t.num} value={t.num}>
                        Tooth #{t.num} - {t.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Severity Slider (1-10) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-semibold text-[#0F1A1F]">
                    Pain / Severity Level ({severityScore}/10 — {getSeverityLabel(severityScore)})
                  </label>
                  <span className="font-mono font-bold text-[#22A6C0]">{severityScore}/10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={severityScore}
                  onChange={e => setSeverityScore(Number(e.target.value))}
                  className="w-full accent-[#22A6C0] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#8F9AA0] mt-1">
                  <span>1 (Mild discomfort)</span>
                  <span>5 (Moderate ache)</span>
                  <span>10 (Excruciating pain)</span>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#0F1A1F] mb-1">Aggravating Triggers</label>
                <input
                  type="text"
                  value={triggers}
                  onChange={e => setTriggers(e.target.value)}
                  placeholder="e.g. Cold water, chewing bread, night"
                  className="w-full px-3.5 py-2 bg-[#F5F7F8] rounded-full border border-[#E6EAEC] outline-none"
                />
              </div>

              <div className="pt-3 border-t border-[#F0F3F5] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-full text-[#8F9AA0]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#22A6C0] text-white font-semibold hover:bg-[#1B899F]"
                >
                  Save Symptom Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bulk Entry Modal */}
      {isBulkEntryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-[28px] max-w-md w-full p-6 shadow-2xl border border-[#E6EAEC]">
            <h3 className="font-bold text-base text-[#0F1A1F] mb-1">Bulk Triage Questionnaire</h3>
            <p className="text-xs text-[#8F9AA0] mb-4">
              Quick intake checklist for {activePatient.fullName}
            </p>
            <form onSubmit={handleBulkSubmit} className="space-y-3 text-xs">
              <label className="flex items-center gap-2 p-2.5 rounded-xl bg-[#F5F7F8] cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded text-[#22A6C0]" />
                <span>Sharp pain lingering &gt;30 seconds on cold test</span>
              </label>
              <label className="flex items-center gap-2 p-2.5 rounded-xl bg-[#F5F7F8] cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded text-[#22A6C0]" />
                <span>Spontaneous pain at night disturbing sleep</span>
              </label>
              <label className="flex items-center gap-2 p-2.5 rounded-xl bg-[#F5F7F8] cursor-pointer">
                <input type="checkbox" className="rounded text-[#22A6C0]" />
                <span>Bleeding on gentle toothbrushing</span>
              </label>
              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsBulkEntryOpen(false)}
                  className="px-4 py-2 text-[#8F9AA0]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#22A6C0] text-white font-semibold rounded-full"
                >
                  Register Checked Symptoms
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
