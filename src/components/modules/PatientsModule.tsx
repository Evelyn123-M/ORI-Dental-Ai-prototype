import React, { useState } from 'react';
import {
  Search,
  Plus,
  Download,
  Upload,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  AlertTriangle,
  FileText,
  Clock,
  Layers,
  Activity,
  Image as ImageIcon,
  CheckCircle2,
  X,
  Edit2,
  ChevronRight,
  Filter
} from 'lucide-react';
import { Patient, ClinicalAssessment, SymptomRecord, DentalXRay, TreatmentPlan } from '../../types';

interface PatientsModuleProps {
  patients: Patient[];
  selectedPatientId: string;
  onSelectPatient: (patientId: string) => void;
  onAddPatient: (newPatient: Patient) => void;
  onUpdatePatient: (updatedPatient: Patient) => void;
  assessments: ClinicalAssessment[];
  symptoms: SymptomRecord[];
  xrays: DentalXRay[];
  treatmentPlans: TreatmentPlan[];
  onNavigateToModule: (moduleId: string) => void;
  showToast: (title: string, message?: string, type?: 'success' | 'warning' | 'info' | 'error') => void;
}

export const PatientsModule: React.FC<PatientsModuleProps> = ({
  patients,
  selectedPatientId,
  onSelectPatient,
  onAddPatient,
  onUpdatePatient,
  assessments,
  symptoms,
  xrays,
  treatmentPlans,
  onNavigateToModule,
  showToast,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Inactive' | 'Archived'>('All');
  const [districtFilter, setDistrictFilter] = useState<'All' | 'Kicukiro' | 'Gasabo' | 'Nyarugenge'>('All');
  const [activeProfileTab, setActiveProfileTab] = useState<
    'Overview' | 'Assessments' | 'Symptoms' | 'X-rays' | 'Treatment plans' | 'Documents' | 'History'
  >('Overview');
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // New patient registration form state
  const [formData, setFormData] = useState({
    fullName: '',
    nationalId: '',
    gender: 'Female' as 'Female' | 'Male' | 'Other',
    dob: '1996-05-12',
    phone: '078 ',
    email: '',
    district: 'Kicukiro',
    sector: 'Masaka',
    cell: 'Gako',
    address: 'Near ORI Clinic, Masaka',
    emergencyName: '',
    emergencyRelationship: 'Spouse',
    emergencyPhone: '078 ',
    medicalHistory: 'No systemic illness',
    allergies: 'No known drug allergies',
    status: 'Active' as 'Active' | 'Inactive' | 'Archived',
  });

  const activePatient = patients.find(p => p.id === selectedPatientId) || patients[0];

  const filteredPatients = patients.filter(p => {
    const matchesSearch =
      p.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.fileNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.phone.includes(searchQuery);
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    const matchesDistrict = districtFilter === 'All' || p.district === districtFilter;
    return matchesSearch && matchesStatus && matchesDistrict;
  });

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `pat-${Date.now()}`;
    const newPat: Patient = {
      id: newId,
      fileNumber: `ORI-2026-00${patients.length + 1}`,
      fullName: formData.fullName,
      nationalId: formData.nationalId,
      gender: formData.gender,
      dob: formData.dob,
      age: 2026 - parseInt(formData.dob.substring(0, 4) || '1995'),
      phone: formData.phone,
      email: formData.email,
      district: formData.district,
      sector: formData.sector,
      cell: formData.cell,
      address: formData.address,
      emergencyContact: {
        name: formData.emergencyName,
        relationship: formData.emergencyRelationship,
        phone: formData.emergencyPhone,
      },
      medicalHistory: formData.medicalHistory.split(',').map(s => s.trim()),
      allergies: formData.allergies.split(',').map(s => s.trim()),
      status: formData.status,
      registeredDate: '2026-10-08',
      lastVisit: '2026-10-08',
      assignedDentist: 'Dr. Diane Uwase',
    };

    onAddPatient(newPat);
    setIsRegisterModalOpen(false);
    onSelectPatient(newId);
    showToast('Patient Registered', `${newPat.fullName} added successfully.`, 'success');
  };

  const handleExportCSV = () => {
    const header = 'File Number,Full Name,National ID,Gender,Age,Phone,District,Status,Last Visit\n';
    const rows = patients
      .map(
        p =>
          `"${p.fileNumber}","${p.fullName}","${p.nationalId}","${p.gender}","${p.age}","${p.phone}","${p.district}","${p.status}","${p.lastVisit}"`
      )
      .join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ORI_Dental_Patients_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    showToast('Export Complete', 'Patients CSV directory exported.', 'success');
  };

  const handleSimulateImport = () => {
    showToast('CSV Import Ready', 'Standard Rwandan MOH MoH-HMIS format accepted.', 'info');
  };

  // Patient-specific records
  const patientAssessments = assessments.filter(a => a.patientId === activePatient?.id);
  const patientSymptoms = symptoms.filter(s => s.patientId === activePatient?.id);
  const patientXrays = xrays.filter(x => x.patientId === activePatient?.id);
  const patientPlans = treatmentPlans.filter(t => t.patientId === activePatient?.id);

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-[24px] border border-[#E6EAEC] shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-[#0F1A1F]">Patients Directory</h2>
          <p className="text-xs text-[#8F9AA0] mt-0.5">
            Registered patients at ORI Dental Clinic, Masaka, Kigali ({patients.length} total)
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#F5F7F8] hover:bg-[#EAEFF2] text-xs font-medium text-[#0F1A1F] border border-[#E6EAEC] transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#22A6C0]" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={handleSimulateImport}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#F5F7F8] hover:bg-[#EAEFF2] text-xs font-medium text-[#0F1A1F] border border-[#E6EAEC] transition-colors"
          >
            <Upload className="w-3.5 h-3.5 text-[#8F9AA0]" />
            <span>Import</span>
          </button>

          <button
            onClick={() => setIsRegisterModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#22A6C0] hover:bg-[#1B899F] text-xs font-semibold text-white shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Register Patient</span>
          </button>
        </div>
      </div>

      {/* Main Split: Left Directory Table, Right Comprehensive Profile */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Patient List (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-[24px] p-5 border border-[#E6EAEC] shadow-sm flex flex-col gap-4">
          {/* Search & Filters */}
          <div className="space-y-2.5">
            <div className="relative">
              <Search className="w-4 h-4 text-[#8F9AA0] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by name, ID, or phone..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-[#F5F7F8] rounded-full text-xs text-[#0F1A1F] border border-[#E6EAEC] outline-none"
              />
            </div>

            <div className="flex items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-1">
                {(['All', 'Active', 'Inactive'] as const).map(st => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors ${
                      statusFilter === st
                        ? 'bg-[#E3F4F8] text-[#22A6C0] font-semibold'
                        : 'text-[#8F9AA0] hover:text-[#0F1A1F]'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <select
                value={districtFilter}
                onChange={e => setDistrictFilter(e.target.value as any)}
                className="px-2 py-1 bg-[#F5F7F8] rounded-full text-[11px] text-[#0F1A1F] border border-[#E6EAEC] outline-none"
              >
                <option value="All">All Districts</option>
                <option value="Kicukiro">Kicukiro</option>
                <option value="Gasabo">Gasabo</option>
                <option value="Nyarugenge">Nyarugenge</option>
              </select>
            </div>
          </div>

          {/* List items */}
          <div className="space-y-1.5 max-h-[580px] overflow-y-auto pr-1">
            {filteredPatients.map(p => {
              const isSelected = p.id === activePatient?.id;
              return (
                <div
                  key={p.id}
                  onClick={() => onSelectPatient(p.id)}
                  className={`p-3 rounded-2xl cursor-pointer transition-all flex items-center justify-between border ${
                    isSelected
                      ? 'bg-[#E3F4F8] border-[#22A6C0]/40 shadow-xs'
                      : 'bg-[#F5F7F8]/80 hover:bg-[#F5F7F8] border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                        isSelected ? 'bg-[#22A6C0] text-white' : 'bg-white text-[#0F1A1F] border border-[#CBD5E1]'
                      }`}
                    >
                      {p.fullName.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-xs text-[#0F1A1F] truncate">{p.fullName}</p>
                      <p className="text-[11px] text-[#8F9AA0] font-mono">{p.fileNumber}</p>
                      <p className="text-[10px] text-[#8F9AA0] truncate">
                        {p.district}, {p.sector} · {p.phone}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        p.status === 'Active'
                          ? 'bg-emerald-100 text-[#1F9D74]'
                          : p.status === 'Inactive'
                          ? 'bg-amber-100 text-[#E2A23B]'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {p.status}
                    </span>
                    <span className="text-[10px] text-[#8F9AA0]">{p.lastVisit}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Detailed Patient Record & 7 Tabs (7 cols) */}
        {activePatient && (
          <div className="lg:col-span-7 bg-white rounded-[24px] p-6 border border-[#E6EAEC] shadow-sm flex flex-col gap-6">
            {/* Patient Header Block */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#F0F3F5]">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#E3F4F8] text-[#22A6C0] flex items-center justify-center font-bold text-xl shadow-xs">
                  {activePatient.fullName.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-[#0F1A1F]">{activePatient.fullName}</h3>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-[#F5F7F8] border border-[#E6EAEC] text-[#0F1A1F]">
                      {activePatient.fileNumber}
                    </span>
                  </div>
                  <p className="text-xs text-[#8F9AA0] mt-0.5">
                    {activePatient.gender} · Age {activePatient.age} (DOB: {activePatient.dob}) · National ID: {activePatient.nationalId}
                  </p>
                  <p className="text-xs text-[#8F9AA0] mt-0.5 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#22A6C0]" />
                    <span>{activePatient.address}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="p-2 rounded-full hover:bg-[#F5F7F8] text-[#8F9AA0] hover:text-[#0F1A1F] border border-[#E6EAEC]"
                  title="Edit patient details"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigateToModule('assessments')}
                  className="px-4 py-2 rounded-full bg-[#22A6C0] text-white text-xs font-semibold hover:bg-[#1B899F] transition-all shadow-xs"
                >
                  Start Assessment →
                </button>
              </div>
            </div>

            {/* Profile Tabs (7 Tabs) */}
            <div className="flex items-center gap-1 border-b border-[#F0F3F5] pb-2 overflow-x-auto no-scrollbar text-xs">
              {(
                [
                  'Overview',
                  'Assessments',
                  'Symptoms',
                  'X-rays',
                  'Treatment plans',
                  'Documents',
                  'History',
                ] as const
              ).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveProfileTab(tab)}
                  className={`px-3.5 py-1.5 rounded-full font-medium whitespace-nowrap transition-colors ${
                    activeProfileTab === tab
                      ? 'bg-[#E3F4F8] text-[#22A6C0] font-semibold'
                      : 'text-[#8F9AA0] hover:text-[#0F1A1F]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab 1: Overview */}
            {activeProfileTab === 'Overview' && (
              <div className="space-y-5 text-xs">
                {/* Emergency & Contacts */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-[#F5F7F8] border border-[#E6EAEC]">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8F9AA0] block mb-2">
                      Primary Contact Info
                    </span>
                    <p className="font-semibold text-[#0F1A1F] flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-[#22A6C0]" /> {activePatient.phone}
                    </p>
                    <p className="text-[#8F9AA0] mt-1 flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-[#22A6C0]" /> {activePatient.email}
                    </p>
                    <p className="text-[#8F9AA0] mt-1">Assigned Clinician: {activePatient.assignedDentist}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#F5F7F8] border border-[#E6EAEC]">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8F9AA0] block mb-2">
                      Emergency Contact
                    </span>
                    <p className="font-semibold text-[#0F1A1F]">
                      {activePatient.emergencyContact.name} ({activePatient.emergencyContact.relationship})
                    </p>
                    <p className="text-[#8F9AA0] mt-1 flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-[#22A6C0]" /> {activePatient.emergencyContact.phone}
                    </p>
                    <p className="text-[#8F9AA0] mt-1">Authorized for urgent dental consent</p>
                  </div>
                </div>

                {/* Medical History & Allergies Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white border border-[#E6EAEC]">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8F9AA0] block mb-2">
                      Medical History / Systemic Conditions
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {activePatient.medicalHistory.map((h, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-full text-[11px] bg-[#F5F7F8] text-[#0F1A1F] border border-[#E6EAEC]"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block mb-2 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-[#E2A23B]" /> Drug &amp; Material Allergies
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {activePatient.allergies.map((a, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-full text-[11px] bg-white text-[#D9534F] font-medium border border-red-200 shadow-2xs"
                        >
                          ⚠ {a}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quick Shortcuts to Clinical Data */}
                <div className="p-4 rounded-2xl bg-[#E3F4F8]/50 border border-[#22A6C0]/20 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-[#0F1A1F]">Connected Case Files</p>
                    <p className="text-[11px] text-[#8F9AA0]">
                      {patientAssessments.length} assessment(s) · {patientXrays.length} X-ray(s) · {patientPlans.length} treatment plan(s)
                    </p>
                  </div>
                  <button
                    onClick={() => onNavigateToModule('xrays')}
                    className="px-3.5 py-1.5 rounded-full bg-white hover:bg-slate-50 text-xs font-semibold text-[#22A6C0] border border-[#22A6C0]/30 shadow-2xs"
                  >
                    View Panoramic X-Ray →
                  </button>
                </div>
              </div>
            )}

            {/* Tab 2: Assessments */}
            {activeProfileTab === 'Assessments' && (
              <div className="space-y-3 text-xs">
                {patientAssessments.length === 0 ? (
                  <p className="text-[#8F9AA0] p-4 text-center">No assessments recorded for this patient yet.</p>
                ) : (
                  patientAssessments.map(a => (
                    <div key={a.id} className="p-4 rounded-2xl bg-[#F5F7F8] border border-[#E6EAEC] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#0F1A1F]">{a.templateType} Assessment</span>
                        <span className="font-mono text-[#8F9AA0]">{a.date}</span>
                      </div>
                      <p className="text-[#0F1A1F] leading-relaxed"><strong>Chief Complaint:</strong> {a.chiefComplaint}</p>
                      <p className="text-[#8F9AA0] leading-relaxed"><strong>Clinical Notes:</strong> {a.clinicalObservations}</p>
                      <div className="flex items-center justify-between pt-2 border-t border-[#E6EAEC] text-[11px]">
                        <span className="text-[#22A6C0] font-medium">Status: {a.status}</span>
                        <span>Examiner: {a.dentistName}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Tab 3: Symptoms */}
            {activeProfileTab === 'Symptoms' && (
              <div className="space-y-3 text-xs">
                {patientSymptoms.map(s => (
                  <div key={s.id} className="p-3.5 rounded-2xl bg-[#F5F7F8] border border-[#E6EAEC] flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-[#0F1A1F]">{s.symptomType}</p>
                      <p className="text-[#8F9AA0] text-[11px]">{s.toothLocation} · Duration: {s.duration}</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-[#E2A23B]">
                      Severity: {s.severity} ({s.severityScore}/10)
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 4: X-rays */}
            {activeProfileTab === 'X-rays' && (
              <div className="space-y-4 text-xs">
                {patientXrays.map(x => (
                  <div key={x.id} className="p-4 rounded-2xl bg-[#F5F7F8] border border-[#E6EAEC] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-[#0B1519] text-[#22A6C0] flex items-center justify-center font-bold text-xs">
                        OPG
                      </div>
                      <div>
                        <p className="font-semibold text-[#0F1A1F]">{x.type} · {x.toothRegion}</p>
                        <p className="text-[#8F9AA0] text-[11px]">{x.dateTaken} · Radiographer: {x.takenBy}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => onNavigateToModule('xrays')}
                      className="px-3.5 py-1.5 rounded-full bg-[#22A6C0] text-white text-xs font-semibold"
                    >
                      Open Radiograph
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 5: Treatment Plans */}
            {activeProfileTab === 'Treatment plans' && (
              <div className="space-y-4 text-xs">
                {patientPlans.map(tp => (
                  <div key={tp.id} className="p-4 rounded-2xl bg-[#F5F7F8] border border-[#E6EAEC] space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-[#0F1A1F] text-sm">{tp.title}</h4>
                      <span className="font-mono text-sm font-bold text-[#22A6C0]">
                        {tp.totalCostRwf.toLocaleString()} RWF
                      </span>
                    </div>
                    <p className="text-[#8F9AA0]">{tp.diagnosisSummary}</p>
                    <div className="flex items-center justify-between text-[11px] pt-2 border-t border-[#E6EAEC]">
                      <span>Phases: {tp.phases.length}</span>
                      <span className="font-medium text-[#1F9D74]">Status: {tp.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 6: Documents Upload Area */}
            {activeProfileTab === 'Documents' && (
              <div className="space-y-4 text-xs">
                <div className="border-2 border-dashed border-[#CBD5E1] rounded-2xl p-8 text-center hover:border-[#22A6C0] transition-colors cursor-pointer bg-[#F5F7F8]">
                  <Upload className="w-8 h-8 text-[#22A6C0] mx-auto mb-2" />
                  <p className="font-semibold text-[#0F1A1F]">Upload Clinical Documents or Referral Letters</p>
                  <p className="text-[11px] text-[#8F9AA0] mt-1">Drag and drop PDF, PNG, or DICOM files up to 25MB</p>
                </div>
              </div>
            )}

            {/* Tab 7: History */}
            {activeProfileTab === 'History' && (
              <div className="space-y-3 text-xs">
                <div className="border-l-2 border-[#22A6C0] pl-4 py-1 space-y-1">
                  <p className="font-semibold text-[#0F1A1F]">Initial Registration &amp; Triage</p>
                  <p className="text-[#8F9AA0] text-[11px]">Registered on {activePatient.registeredDate} by Claire Uwera</p>
                </div>
                <div className="border-l-2 border-[#22A6C0] pl-4 py-1 space-y-1">
                  <p className="font-semibold text-[#0F1A1F]">Panoramic OPG Radiograph Acquired</p>
                  <p className="text-[#8F9AA0] text-[11px]">Uploaded on 2026-10-06 by Radiology Dept</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Registration Modal */}
      {isRegisterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-[28px] max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#E6EAEC] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#F0F3F5] mb-4">
              <div>
                <h3 className="text-lg font-bold text-[#0F1A1F]">Register New Patient</h3>
                <p className="text-xs text-[#8F9AA0]">ORI Dental Clinic, Masaka, Kigali</p>
              </div>
              <button onClick={() => setIsRegisterModalOpen(false)} className="p-1 text-[#8F9AA0] hover:text-[#0F1A1F]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRegisterSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[#0F1A1F] mb-1">Full Legal Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Jean-Baptiste Nzeyimana"
                    className="w-full px-3.5 py-2 bg-[#F5F7F8] rounded-full border border-[#E6EAEC] outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#0F1A1F] mb-1">Rwandan National ID (16 digits) *</label>
                  <input
                    type="text"
                    required
                    value={formData.nationalId}
                    onChange={e => setFormData({ ...formData, nationalId: e.target.value })}
                    placeholder="1 199X X XXXX XXXX X"
                    className="w-full px-3.5 py-2 bg-[#F5F7F8] rounded-full border border-[#E6EAEC] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-[#0F1A1F] mb-1">Date of Birth</label>
                  <input
                    type="date"
                    value={formData.dob}
                    onChange={e => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#F5F7F8] rounded-full border border-[#E6EAEC] outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#0F1A1F] mb-1">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={e => setFormData({ ...formData, gender: e.target.value as any })}
                    className="w-full px-3.5 py-2 bg-[#F5F7F8] rounded-full border border-[#E6EAEC] outline-none"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-[#0F1A1F] mb-1">Phone Number (MTN/Airtel)</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#F5F7F8] rounded-full border border-[#E6EAEC] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-[#0F1A1F] mb-1">District</label>
                  <select
                    value={formData.district}
                    onChange={e => setFormData({ ...formData, district: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#F5F7F8] rounded-full border border-[#E6EAEC] outline-none"
                  >
                    <option value="Kicukiro">Kicukiro</option>
                    <option value="Gasabo">Gasabo</option>
                    <option value="Nyarugenge">Nyarugenge</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-[#0F1A1F] mb-1">Sector</label>
                  <input
                    type="text"
                    value={formData.sector}
                    onChange={e => setFormData({ ...formData, sector: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#F5F7F8] rounded-full border border-[#E6EAEC] outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#0F1A1F] mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="patient@gmail.com"
                    className="w-full px-3.5 py-2 bg-[#F5F7F8] rounded-full border border-[#E6EAEC] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#0F1A1F] mb-1">Known Drug Allergies (e.g. Penicillin, Latex)</label>
                <input
                  type="text"
                  value={formData.allergies}
                  onChange={e => setFormData({ ...formData, allergies: e.target.value })}
                  className="w-full px-3.5 py-2 bg-[#F5F7F8] rounded-full border border-[#E6EAEC] outline-none text-[#D9534F]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#F0F3F5]">
                <button
                  type="button"
                  onClick={() => setIsRegisterModalOpen(false)}
                  className="px-5 py-2 rounded-full text-[#8F9AA0] hover:text-[#0F1A1F]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-[#22A6C0] text-white font-semibold hover:bg-[#1B899F]"
                >
                  Save &amp; Register Patient
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && activePatient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-[28px] max-w-lg w-full p-6 shadow-2xl border border-[#E6EAEC]">
            <h3 className="text-base font-bold text-[#0F1A1F] mb-2">Edit {activePatient.fullName}</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold block mb-1">Phone Number</label>
                <input
                  type="text"
                  defaultValue={activePatient.phone}
                  onChange={e => (activePatient.phone = e.target.value)}
                  className="w-full px-3 py-2 bg-[#F5F7F8] rounded-full border border-[#E6EAEC]"
                />
              </div>
              <div>
                <label className="font-semibold block mb-1">Status</label>
                <select
                  defaultValue={activePatient.status}
                  onChange={e => (activePatient.status = e.target.value as any)}
                  className="w-full px-3 py-2 bg-[#F5F7F8] rounded-full border border-[#E6EAEC]"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 rounded-full text-xs text-[#8F9AA0]"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onUpdatePatient({ ...activePatient });
                  setIsEditModalOpen(false);
                  showToast('Record Updated', 'Patient details saved successfully.', 'success');
                }}
                className="px-5 py-2 rounded-full bg-[#22A6C0] text-white text-xs font-semibold"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
