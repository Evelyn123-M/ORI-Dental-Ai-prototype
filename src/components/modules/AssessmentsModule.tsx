import React, { useState } from 'react';
import {
  FileText,
  Plus,
  Search,
  Sparkles,
  Paperclip,
  CheckCircle2,
  Clock,
  Send,
  Save,
  ArrowRight,
  Filter,
  User,
  Stethoscope
} from 'lucide-react';
import { ClinicalAssessment, Patient, AssessmentStatus } from '../../types';

interface AssessmentsModuleProps {
  assessments: ClinicalAssessment[];
  patients: Patient[];
  selectedPatientId: string;
  onSelectPatient: (patientId: string) => void;
  onSaveAssessment: (assessment: ClinicalAssessment) => void;
  onNavigateModule: (moduleId: string) => void;
  showToast: (title: string, message?: string, type?: 'success' | 'warning' | 'info' | 'error') => void;
}

export const AssessmentsModule: React.FC<AssessmentsModuleProps> = ({
  assessments,
  patients,
  selectedPatientId,
  onSelectPatient,
  onSaveAssessment,
  onNavigateModule,
  showToast,
}) => {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [activeAssessmentId, setActiveAssessmentId] = useState<string>(assessments[0]?.id || '');
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  const activePatient = patients.find(p => p.id === selectedPatientId) || patients[0];

  // Assessment form state
  const [formData, setFormData] = useState({
    templateType: 'Toothache' as 'Toothache' | 'Routine check-up' | 'Gum disease' | 'Dental trauma' | 'Custom',
    chiefComplaint: 'Severe sharp throbbing pain in lower jaw when chewing or taking cold drinks.',
    clinicalObservations: 'Cavitation observed on occlusal surface of Tooth #19. Pain elicited on vertical percussion. Lingual marginal gingiva slightly edematous.',
    periodontalNotes: 'Probing depths 2-3mm generalized, localized 4mm pocket on disto-lingual aspect.',
    occlusalNotes: 'Normal canine guidance, no premature contacts observed.',
    status: 'Pending review' as AssessmentStatus,
    attachmentsCount: 1,
  });

  const templates: Record<string, { complaint: string; obs: string; perio: string; occlusal: string }> = {
    Toothache: {
      complaint: 'Severe throbbing pain in lower molar quadrant, sensitivity to thermal extremes.',
      obs: 'Cavitation and dark discoloration on occlusal surface. Cold test produces lingering sharp sensation.',
      perio: 'Probing depths 2-3mm, bleeding on probing at interdental papillae.',
      occlusal: 'Class I occlusion, non-working interference absent.',
    },
    'Routine check-up': {
      complaint: 'Routine preventive examination, requests cleaning and fluoride application.',
      obs: 'No active cavitated carious lesions. Mild supragingival calculus on lingual surfaces of lower anterior teeth.',
      perio: 'Healthy coral pink gingiva, sulcus depths within 1-2mm normal limits.',
      occlusal: 'Stable centric occlusion.',
    },
    'Gum disease': {
      complaint: 'Gums bleed regularly during morning brushing; generalized dull ache and bad taste.',
      obs: 'Marginal gingival erythema, generalized edema and blunted interdental papillae.',
      perio: 'Periodontal probing depths 4-6mm in molar regions, subgingival calculus deposits.',
      occlusal: 'Slight anterior tooth mobility Grade I.',
    },
    'Dental trauma': {
      complaint: 'Direct blunt impact injury to anterior maxillary region during sports activity.',
      obs: 'Uncomplicated enamel-dentin fracture of Tooth #8/9 without visible pulp exposure.',
      perio: 'Sulcular bleeding, mild tenderness to percussion.',
      occlusal: 'Edge-to-edge relation checked for traumatic interference.',
    },
  };

  const applyTemplate = (tmpl: 'Toothache' | 'Routine check-up' | 'Gum disease' | 'Dental trauma') => {
    const data = templates[tmpl];
    if (data) {
      setFormData(prev => ({
        ...prev,
        templateType: tmpl,
        chiefComplaint: data.complaint,
        clinicalObservations: data.obs,
        periodontalNotes: data.perio,
        occlusalNotes: data.occlusal,
      }));
      showToast('Template Applied', `${tmpl} standard clinical template loaded.`, 'info');
    }
  };

  const handleSave = (statusToSet: AssessmentStatus) => {
    const newAssessment: ClinicalAssessment = {
      id: isCreatingNew ? `asm-${Date.now()}` : activeAssessmentId,
      patientId: activePatient.id,
      patientName: activePatient.fullName,
      date: new Date().toISOString().slice(0, 10),
      chiefComplaint: formData.chiefComplaint,
      templateType: formData.templateType,
      clinicalObservations: formData.clinicalObservations,
      periodontalNotes: formData.periodontalNotes,
      occlusalNotes: formData.occlusalNotes,
      status: statusToSet,
      dentistId: 'usr-1',
      dentistName: 'Dr. Diane Uwase',
      attachmentsCount: formData.attachmentsCount,
      updatedAt: 'Just now',
    };

    onSaveAssessment(newAssessment);
    setIsCreatingNew(false);
    setActiveAssessmentId(newAssessment.id);
    showToast(
      statusToSet === 'Pending review' ? 'Assessment Submitted' : 'Draft Saved',
      `Assessment for ${activePatient.fullName} queued for dental review.`,
      'success'
    );
  };

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-[24px] border border-[#E6EAEC] shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-[#0F1A1F]">Clinical Assessments</h2>
          <p className="text-xs text-[#8F9AA0] mt-0.5">
            Initial examination, triage notes, and template-guided dental observations
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setIsCreatingNew(true);
              setFormData({
                templateType: 'Toothache',
                chiefComplaint: '',
                clinicalObservations: '',
                periodontalNotes: '',
                occlusalNotes: '',
                status: 'Draft',
                attachmentsCount: 0,
              });
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#22A6C0] text-white text-xs font-semibold hover:bg-[#1B899F] transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>New Assessment Form</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left List, Right Editor Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Previous Assessments History (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-[24px] p-5 border border-[#E6EAEC] shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#F0F3F5]">
            <h3 className="font-bold text-sm text-[#0F1A1F]">Assessment Records</h3>
            <span className="text-xs font-mono text-[#8F9AA0]">{assessments.length} records</span>
          </div>

          <div className="space-y-2">
            {assessments.map(asm => {
              const isSelected = asm.id === activeAssessmentId;
              return (
                <div
                  key={asm.id}
                  onClick={() => {
                    setActiveAssessmentId(asm.id);
                    setIsCreatingNew(false);
                    onSelectPatient(asm.patientId);
                    setFormData({
                      templateType: asm.templateType,
                      chiefComplaint: asm.chiefComplaint,
                      clinicalObservations: asm.clinicalObservations,
                      periodontalNotes: asm.periodontalNotes,
                      occlusalNotes: asm.occlusalNotes,
                      status: asm.status,
                      attachmentsCount: asm.attachmentsCount,
                    });
                  }}
                  className={`p-3.5 rounded-2xl cursor-pointer border transition-all ${
                    isSelected
                      ? 'bg-[#E3F4F8] border-[#22A6C0]/40 shadow-xs'
                      : 'bg-[#F5F7F8] hover:bg-[#EAEFF2] border-transparent'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-xs text-[#0F1A1F]">{asm.patientName}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        asm.status === 'Completed'
                          ? 'bg-emerald-100 text-[#1F9D74]'
                          : asm.status === 'Pending review'
                          ? 'bg-amber-100 text-[#E2A23B]'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {asm.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#22A6C0] font-medium">{asm.templateType} Template</p>
                  <p className="text-[11px] text-[#8F9AA0] line-clamp-2 mt-1 leading-relaxed">
                    {asm.chiefComplaint}
                  </p>
                  <div className="mt-2 pt-2 border-t border-[#E6EAEC]/60 flex items-center justify-between text-[10px] text-[#8F9AA0] font-mono">
                    <span>{asm.date}</span>
                    <span>Dr. Diane Uwase</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Assessment Form & Clinical Templates (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-[24px] p-6 border border-[#E6EAEC] shadow-sm space-y-5">
          {/* Form Header with active patient context */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#F0F3F5]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#E3F4F8] text-[#22A6C0] flex items-center justify-center font-bold text-sm">
                {activePatient.fullName.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-base text-[#0F1A1F]">
                  Clinical Examination: {activePatient.fullName}
                </h3>
                <p className="text-xs text-[#8F9AA0]">
                  File: {activePatient.fileNumber} · Age {activePatient.age} · Allergies: {activePatient.allergies.join(', ')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-[#8F9AA0]">Status:</span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#E3F4F8] text-[#22A6C0]">
                {formData.status}
              </span>
            </div>
          </div>

          {/* Quick Assessment Templates Selector */}
          <div>
            <label className="block text-xs font-semibold text-[#0F1A1F] mb-2">
              Apply Standardized Examination Template:
            </label>
            <div className="flex flex-wrap items-center gap-2">
              {(['Toothache', 'Routine check-up', 'Gum disease', 'Dental trauma'] as const).map(tmpl => (
                <button
                  key={tmpl}
                  type="button"
                  onClick={() => applyTemplate(tmpl)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                    formData.templateType === tmpl
                      ? 'bg-[#22A6C0] text-white shadow-2xs'
                      : 'bg-[#F5F7F8] hover:bg-[#EAEFF2] text-[#0F1A1F] border border-[#E6EAEC]'
                  }`}
                >
                  {tmpl}
                </button>
              ))}
            </div>
          </div>

          {/* Form Inputs */}
          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-[#0F1A1F] mb-1.5">
                Chief Complaint &amp; History of Presenting Illness *
              </label>
              <textarea
                rows={3}
                value={formData.chiefComplaint}
                onChange={e => setFormData({ ...formData, chiefComplaint: e.target.value })}
                placeholder="Patient explains sharp/dull pain, duration, triggers..."
                className="w-full p-3.5 bg-[#F5F7F8] rounded-2xl border border-[#E6EAEC] text-[#0F1A1F] outline-none focus:border-[#22A6C0] transition-colors leading-relaxed"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#0F1A1F] mb-1.5">
                Clinical Examination &amp; Dental Observations
              </label>
              <textarea
                rows={3}
                value={formData.clinicalObservations}
                onChange={e => setFormData({ ...formData, clinicalObservations: e.target.value })}
                placeholder="Hard tissue findings, percussion tenderness, discoloration, restorations..."
                className="w-full p-3.5 bg-[#F5F7F8] rounded-2xl border border-[#E6EAEC] text-[#0F1A1F] outline-none focus:border-[#22A6C0] transition-colors leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-[#0F1A1F] mb-1.5">
                  Periodontal &amp; Soft Tissue Status
                </label>
                <textarea
                  rows={2}
                  value={formData.periodontalNotes}
                  onChange={e => setFormData({ ...formData, periodontalNotes: e.target.value })}
                  placeholder="Probing depths, bleeding on probing, gingival recession..."
                  className="w-full p-3 bg-[#F5F7F8] rounded-2xl border border-[#E6EAEC] text-[#0F1A1F] outline-none focus:border-[#22A6C0]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#0F1A1F] mb-1.5">
                  Occlusal &amp; TMJ Notes
                </label>
                <textarea
                  rows={2}
                  value={formData.occlusalNotes}
                  onChange={e => setFormData({ ...formData, occlusalNotes: e.target.value })}
                  placeholder="Canine guidance, attrition facets, clicks or trismus..."
                  className="w-full p-3 bg-[#F5F7F8] rounded-2xl border border-[#E6EAEC] text-[#0F1A1F] outline-none focus:border-[#22A6C0]"
                />
              </div>
            </div>

            {/* Attachments Section */}
            <div className="p-4 rounded-2xl bg-[#F5F7F8] border border-[#E6EAEC] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Paperclip className="w-4 h-4 text-[#22A6C0]" />
                <div>
                  <p className="font-semibold text-[#0F1A1F]">Attached Clinical Radiographs &amp; Photos</p>
                  <p className="text-[11px] text-[#8F9AA0]">
                    1 Panoramic OPG linked from Radiology Department
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onNavigateModule('xrays')}
                className="px-3.5 py-1.5 rounded-full bg-white hover:bg-slate-50 text-xs font-semibold text-[#22A6C0] border border-[#22A6C0]/30 shadow-2xs"
              >
                Inspect X-Ray
              </button>
            </div>
          </div>

          {/* Form Actions Footer */}
          <div className="pt-4 border-t border-[#F0F3F5] flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => handleSave('Draft')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F5F7F8] hover:bg-[#EAEFF2] text-xs font-semibold text-[#0F1A1F] border border-[#E6EAEC] transition-colors"
            >
              <Save className="w-3.5 h-3.5 text-[#8F9AA0]" />
              <span>Save as Draft</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleSave('Pending review')}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#22A6C0] hover:bg-[#1B899F] text-xs font-semibold text-white shadow-md transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit for AI &amp; Dental Review</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
