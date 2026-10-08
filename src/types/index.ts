export type Role = 'dentist' | 'staff' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: Role;
  roleTitle: string;
  avatar: string;
  specialty?: string;
  lastActive: string;
  status: 'active' | 'inactive' | 'locked';
}

export interface Patient {
  id: string;
  fileNumber: string;
  fullName: string;
  nationalId: string;
  gender: 'Female' | 'Male' | 'Other';
  dob: string;
  age: number;
  phone: string;
  email: string;
  district: string;
  sector: string;
  cell: string;
  address: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  medicalHistory: string[];
  allergies: string[];
  status: 'Active' | 'Inactive' | 'Archived';
  registeredDate: string;
  lastVisit: string;
  assignedDentist: string;
}

export type AssessmentStatus = 'Draft' | 'Pending review' | 'Completed';

export interface ClinicalAssessment {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  chiefComplaint: string;
  templateType: 'Toothache' | 'Routine check-up' | 'Gum disease' | 'Dental trauma' | 'Custom';
  clinicalObservations: string;
  periodontalNotes: string;
  occlusalNotes: string;
  status: AssessmentStatus;
  dentistId: string;
  dentistName: string;
  attachmentsCount: number;
  updatedAt: string;
}

export type SymptomSeverity = 'Mild' | 'Moderate' | 'Severe';

export interface SymptomRecord {
  id: string;
  patientId: string;
  patientName: string;
  symptomType: string;
  category: 'Pain' | 'Sensitivity' | 'Bleeding' | 'Swelling' | 'Aesthetic' | 'Mobility';
  duration: string;
  severity: SymptomSeverity;
  severityScore: number; // 1-10
  toothLocation: string; // e.g. "Tooth #19 (Lower Left 1st Molar)"
  toothNumber: number;
  triggers: string[];
  source: 'Patient-reported' | 'Clinically observed';
  dateReported: string;
  status: 'Active' | 'Under Investigation' | 'Resolved';
}

export interface AISymptomFinding {
  id: string;
  condition: string;
  icdCode: string;
  confidence: number; // 0-100
  urgency: 'Low' | 'Moderate' | 'High' | 'Immediate';
  correlatedSymptoms: string[];
  reasoning: string;
  differentialDiagnosis: string[];
  suggestedAction: string;
}

export interface XRayAnnotation {
  id: string;
  type: 'box' | 'arrow' | 'label';
  toothNumber: number;
  x: number;
  y: number;
  width?: number;
  height?: number;
  label: string;
  createdBy: 'AI' | 'Dentist';
  confidence?: number;
}

export interface DentalXRay {
  id: string;
  patientId: string;
  patientName: string;
  type: 'Panoramic (OPG)' | 'Bitewing' | 'Periapical' | 'CBCT 3D';
  dateTaken: string;
  takenBy: string;
  toothRegion: string;
  notes: string;
  aiProcessed: boolean;
  aiFindingsCount: number;
  status: 'Normal' | 'Findings Detected' | 'Under Review';
}

export interface AIXRayFinding {
  id: string;
  toothNumber: number;
  toothName: string;
  findingType: 'Deep Caries' | 'Periapical Radiolucency' | 'Marginal Bone Loss' | 'Impacted Tooth' | 'Defective Restoration';
  location: string;
  confidence: number;
  status: 'AI Pending' | 'Accepted' | 'Flagged' | 'Rejected';
  doctorFeedback?: string;
  severity: 'Mild' | 'Moderate' | 'Severe';
  clinicalObservationComparison: string;
  recommendation: string;
}

export interface TreatmentPhase {
  id: string;
  phaseNumber: number;
  name: string;
  targetTimeline: string;
  procedures: {
    id: string;
    code: string;
    name: string;
    tooth?: string;
    costRwf: number;
    status: 'Pending' | 'Scheduled' | 'Completed';
    notes: string;
  }[];
}

export type TreatmentPlanStatus = 'Draft' | 'Proposed' | 'Approved' | 'In progress' | 'Completed';

export interface TreatmentPlan {
  id: string;
  patientId: string;
  patientName: string;
  title: string;
  diagnosisSummary: string;
  phases: TreatmentPhase[];
  totalCostRwf: number;
  status: TreatmentPlanStatus;
  createdDate: string;
  approvedDate?: string;
  dentistId: string;
  dentistName: string;
  patientAgreed: boolean;
  notes: string;
}

export interface ReviewItem {
  id: string;
  patientId: string;
  patientName: string;
  caseType: 'Symptom & X-Ray Combined' | 'X-Ray Assessment' | 'Treatment Plan Sign-off';
  dateSubmitted: string;
  status: 'Pending' | 'Reviewed' | 'Confirmed' | 'Rejected';
  aiConfidenceScore: number;
  findingsCount: number;
  dentistId?: string;
  dentistName?: string;
  reviewNotes?: string;
  overridden: boolean;
  overrideReason?: string;
  digitalSignature?: {
    signedByName: string;
    medicalLicenseNo: string;
    signedAt: string;
    hash: string;
    confirmedResponsibility: boolean;
  };
}

export interface AuditLog {
  id: string;
  timestamp: string;
  category: 'Access' | 'AI events' | 'Professional reviews' | 'System';
  user: string;
  role: string;
  action: string;
  resource: string;
  status: 'Success' | 'Warning' | 'Alert';
  details: string;
}
