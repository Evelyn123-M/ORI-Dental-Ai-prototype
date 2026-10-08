import { Patient, ClinicalAssessment, SymptomRecord, AISymptomFinding, DentalXRay, AIXRayFinding, TreatmentPlan, ReviewItem, AuditLog, UserProfile } from '../types';

export const DOCTORS_AND_STAFF: UserProfile[] = [
  {
    id: 'usr-1',
    name: 'Dr. Diane Uwase',
    email: 'diane.uwase@oridental.rw',
    role: 'dentist',
    roleTitle: 'Lead Dental Professional',
    specialty: 'BDS, MSc Oral Surgery & Implantology',
    avatar: '/src/assets/images/dentist_female_portrait_1791468897572.jpg',
    lastActive: 'Just now',
    status: 'active'
  },
  {
    id: 'usr-2',
    name: 'Claire Uwera',
    email: 'claire.uwera@oridental.rw',
    role: 'staff',
    roleTitle: 'Clinic Operations & Triage Staff',
    specialty: 'Dental Clinical Assisting & Triage',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
    lastActive: '12 mins ago',
    status: 'active'
  },
  {
    id: 'usr-3',
    name: 'Patrick Habineza',
    email: 'patrick.habineza@oridental.rw',
    role: 'admin',
    roleTitle: 'Platform Administrator',
    specialty: 'Health Informatics & System Governance',
    avatar: '/src/assets/images/dentist_doctor_portrait_1791468886254.jpg',
    lastActive: '1 hour ago',
    status: 'active'
  }
];

export const INITIAL_PATIENTS: Patient[] = [
  {
    id: 'pat-1',
    fileNumber: 'ORI-2026-0041',
    fullName: 'Aline Niyonsaba',
    nationalId: '1199570023412098',
    gender: 'Female',
    dob: '1995-04-18',
    age: 31,
    phone: '078 812 3456',
    email: 'aline.niyonsaba@gmail.com',
    district: 'Kicukiro',
    sector: 'Niboye',
    cell: 'Gatare',
    address: 'KG 14 Ave, House 24, Niboye, Kicukiro',
    emergencyContact: {
      name: 'Jean Niyonsaba',
      relationship: 'Brother',
      phone: '078 899 1122'
    },
    medicalHistory: ['Mild asthma (salbutamol inhaler PRN)', 'No systemic hypertension'],
    allergies: ['Penicillin', 'Sulfa drugs'],
    status: 'Active',
    registeredDate: '2025-11-14',
    lastVisit: '2026-10-06',
    assignedDentist: 'Dr. Diane Uwase'
  },
  {
    id: 'pat-2',
    fileNumber: 'ORI-2026-0042',
    fullName: 'Kevin Mugisha',
    nationalId: '1199180014529011',
    gender: 'Male',
    dob: '1991-08-22',
    age: 35,
    phone: '078 934 5678',
    email: 'k.mugisha@techrwanda.rw',
    district: 'Kicukiro',
    sector: 'Masaka',
    cell: 'Gako',
    address: 'Near Masaka Hospital Road, Kicukiro',
    emergencyContact: {
      name: 'Grace Mugisha',
      relationship: 'Spouse',
      phone: '078 333 4455'
    },
    medicalHistory: ['Type 2 Diabetes (HbA1c 6.8%, Metformin 500mg)'],
    allergies: ['No known drug allergies (NKDA)'],
    status: 'Active',
    registeredDate: '2026-01-10',
    lastVisit: '2026-10-07',
    assignedDentist: 'Dr. Diane Uwase'
  },
  {
    id: 'pat-3',
    fileNumber: 'ORI-2026-0043',
    fullName: 'Imani Uwase',
    nationalId: '1200270034120087',
    gender: 'Female',
    dob: '2002-12-05',
    age: 23,
    phone: '073 222 1199',
    email: 'imani.uwase@student.auca.ac.rw',
    district: 'Gasabo',
    sector: 'Kimihurura',
    cell: 'Rugando',
    address: 'KN 5 Rd, Near Convention Centre',
    emergencyContact: {
      name: 'Marie Uwase',
      relationship: 'Mother',
      phone: '078 844 5566'
    },
    medicalHistory: ['None reported'],
    allergies: ['Latex sensitivity'],
    status: 'Active',
    registeredDate: '2026-02-19',
    lastVisit: '2026-10-05',
    assignedDentist: 'Dr. Diane Uwase'
  },
  {
    id: 'pat-4',
    fileNumber: 'ORI-2026-0044',
    fullName: 'Eric Murenzi',
    nationalId: '1198680009871144',
    gender: 'Male',
    dob: '1986-03-12',
    age: 40,
    phone: '078 456 7890',
    email: 'murenzi.eric@minagri.gov.rw',
    district: 'Nyarugenge',
    sector: 'Nyamirambo',
    cell: 'Mumena',
    address: 'KN 211 St, Nyamirambo',
    emergencyContact: {
      name: 'Clarisse Murenzi',
      relationship: 'Spouse',
      phone: '078 777 8899'
    },
    medicalHistory: ['Controlled hypertension (Amlodipine 5mg)'],
    allergies: ['Aspirin'],
    status: 'Active',
    registeredDate: '2025-08-01',
    lastVisit: '2026-09-28',
    assignedDentist: 'Dr. Diane Uwase'
  },
  {
    id: 'pat-5',
    fileNumber: 'ORI-2026-0045',
    fullName: 'Sandrine Gasana',
    nationalId: '1199870021349901',
    gender: 'Female',
    dob: '1998-07-30',
    age: 28,
    phone: '078 567 8901',
    email: 'sandrine.gasana@gmail.com',
    district: 'Kicukiro',
    sector: 'Kagarama',
    cell: 'Muyange',
    address: 'KK 15 Rd, Kagarama, Kicukiro',
    emergencyContact: {
      name: 'Claude Gasana',
      relationship: 'Father',
      phone: '078 222 3344'
    },
    medicalHistory: ['Seasonal allergic rhinitis'],
    allergies: ['NKDA'],
    status: 'Active',
    registeredDate: '2026-03-15',
    lastVisit: '2026-10-02',
    assignedDentist: 'Dr. Diane Uwase'
  },
  {
    id: 'pat-6',
    fileNumber: 'ORI-2026-0046',
    fullName: 'Jean-Luc Habimana',
    nationalId: '1198980008712398',
    gender: 'Male',
    dob: '1989-11-14',
    age: 36,
    phone: '072 345 6789',
    email: 'jl.habimana@logistics.rw',
    district: 'Gasabo',
    sector: 'Gisozi',
    cell: 'Musezero',
    address: 'KG 678 St, Gisozi, Gasabo',
    emergencyContact: {
      name: 'Béatrice Habimana',
      relationship: 'Sister',
      phone: '078 666 5544'
    },
    medicalHistory: ['None'],
    allergies: ['Codeine'],
    status: 'Active',
    registeredDate: '2025-10-20',
    lastVisit: '2026-09-15',
    assignedDentist: 'Dr. Diane Uwase'
  },
  {
    id: 'pat-7',
    fileNumber: 'ORI-2026-0047',
    fullName: 'Chantal Mukamana',
    nationalId: '1197770001234908',
    gender: 'Female',
    dob: '1977-05-09',
    age: 49,
    phone: '078 678 9012',
    email: 'c.mukamana@yahoo.fr',
    district: 'Kicukiro',
    sector: 'Masaka',
    cell: 'Cyimo',
    address: 'Masaka Commercial Center, Plot 12',
    emergencyContact: {
      name: 'Emmanuel Mukamana',
      relationship: 'Spouse',
      phone: '078 555 4433'
    },
    medicalHistory: ['Osteopenia, calcium supplements'],
    allergies: ['NKDA'],
    status: 'Active',
    registeredDate: '2026-04-02',
    lastVisit: '2026-10-01',
    assignedDentist: 'Dr. Diane Uwase'
  },
  {
    id: 'pat-8',
    fileNumber: 'ORI-2026-0048',
    fullName: 'Patrick Nshimiyimana',
    nationalId: '1199380023419012',
    gender: 'Male',
    dob: '1993-09-18',
    age: 33,
    phone: '079 012 3456',
    email: 'pat.nshimi@fintech.rw',
    district: 'Gasabo',
    sector: 'Remera',
    cell: 'Rukiri I',
    address: 'KG 17 Ave, Remera, Gasabo',
    emergencyContact: {
      name: 'Nadine Nshimiyimana',
      relationship: 'Spouse',
      phone: '078 999 0011'
    },
    medicalHistory: ['None'],
    allergies: ['Ibuprofen'],
    status: 'Active',
    registeredDate: '2026-05-11',
    lastVisit: '2026-10-04',
    assignedDentist: 'Dr. Diane Uwase'
  },
  {
    id: 'pat-9',
    fileNumber: 'ORI-2026-0049',
    fullName: 'Solange Ingabire',
    nationalId: '1199670012398012',
    gender: 'Female',
    dob: '1996-01-25',
    age: 30,
    phone: '078 789 0123',
    email: 'solange.ingabire@rwandair.com',
    district: 'Kicukiro',
    sector: 'Kicukiro Centre',
    cell: 'Ngoma',
    address: 'KK 31 Ave, Kicukiro Centre',
    emergencyContact: {
      name: 'David Ingabire',
      relationship: 'Brother',
      phone: '078 444 3322'
    },
    medicalHistory: ['Mitral valve prolapse (requires antibiotic prophylaxis check)'],
    allergies: ['Amoxicillin (severe rash)'],
    status: 'Active',
    registeredDate: '2025-12-01',
    lastVisit: '2026-09-30',
    assignedDentist: 'Dr. Diane Uwase'
  },
  {
    id: 'pat-10',
    fileNumber: 'ORI-2026-0050',
    fullName: 'Fabrice Tuyisenge',
    nationalId: '1199080034120987',
    gender: 'Male',
    dob: '1990-06-14',
    age: 36,
    phone: '073 456 7890',
    email: 'fabrice.t@coffeerwanda.org',
    district: 'Nyarugenge',
    sector: 'Kiyovu',
    cell: 'Kiyovu',
    address: 'KN 45 St, Kiyovu, Nyarugenge',
    emergencyContact: {
      name: 'Jeanne Tuyisenge',
      relationship: 'Spouse',
      phone: '078 111 2233'
    },
    medicalHistory: ['None'],
    allergies: ['NKDA'],
    status: 'Active',
    registeredDate: '2026-06-08',
    lastVisit: '2026-10-03',
    assignedDentist: 'Dr. Diane Uwase'
  },
  {
    id: 'pat-11',
    fileNumber: 'ORI-2026-0051',
    fullName: 'Divine Uwimana',
    nationalId: '2001700145290123',
    gender: 'Female',
    dob: '2001-10-10',
    age: 24,
    phone: '078 123 4567',
    email: 'divine.uwimana@kigali.rw',
    district: 'Kicukiro',
    sector: 'Gatenga',
    cell: 'Karambo',
    address: 'KK 210 St, Gatenga, Kicukiro',
    emergencyContact: {
      name: 'Paul Uwimana',
      relationship: 'Father',
      phone: '078 888 7766'
    },
    medicalHistory: ['None'],
    allergies: ['NKDA'],
    status: 'Inactive',
    registeredDate: '2025-07-12',
    lastVisit: '2026-08-14',
    assignedDentist: 'Dr. Diane Uwase'
  },
  {
    id: 'pat-12',
    fileNumber: 'ORI-2026-0052',
    fullName: 'Didier Manzi',
    nationalId: '1198480008712345',
    gender: 'Male',
    dob: '1984-02-03',
    age: 42,
    phone: '078 234 5678',
    email: 'didier.manzi@energymarket.rw',
    district: 'Gasabo',
    sector: 'Kacyiru',
    cell: 'Kamatamu',
    address: 'KG 543 St, Kacyiru, Gasabo',
    emergencyContact: {
      name: 'Alice Manzi',
      relationship: 'Spouse',
      phone: '078 222 1100'
    },
    medicalHistory: ['Smoker (5 pack-years)', 'Borderline cholesterol'],
    allergies: ['NKDA'],
    status: 'Archived',
    registeredDate: '2025-04-10',
    lastVisit: '2026-06-20',
    assignedDentist: 'Dr. Diane Uwase'
  }
];

export const INITIAL_ASSESSMENTS: ClinicalAssessment[] = [
  {
    id: 'asm-101',
    patientId: 'pat-1',
    patientName: 'Aline Niyonsaba',
    date: '2026-10-06',
    chiefComplaint: 'Severe sharp pain on lower left jaw when drinking cold water or chewing hard food. Lasted 5 days.',
    templateType: 'Toothache',
    clinicalObservations: 'Deep occlusal discoloration and cavitation on Tooth #19. Pain to percussion (+), electric pulp testing shows delayed lingering response (irreversible pulpitis suspect). Margins on adjacent restorations intact.',
    periodontalNotes: 'Probing depths 2-3mm generalized, no pathological pockets around #19. Mild bleeding on probing at gingival papilla.',
    occlusalNotes: 'Class I molar relationship, no significant premature occlusal contact.',
    status: 'Pending review',
    dentistId: 'usr-1',
    dentistName: 'Dr. Diane Uwase',
    attachmentsCount: 2,
    updatedAt: '2026-10-06 14:35'
  },
  {
    id: 'asm-102',
    patientId: 'pat-2',
    patientName: 'Kevin Mugisha',
    date: '2026-10-07',
    chiefComplaint: 'Dull throbbing pain in lower right posterior quadrant, radiating to ear; bad taste in mouth in mornings.',
    templateType: 'Gum disease',
    clinicalObservations: 'Tooth #30 tender to vertical percussion. Erythematous attached gingiva. Distal pocket depth 6mm. Suppuration on probing.',
    periodontalNotes: 'Localized Stage II Grade B periodontitis in lower right quadrant. Calculus supragingival and subgingival.',
    occlusalNotes: 'Mild attrition on anterior facets.',
    status: 'Pending review',
    dentistId: 'usr-1',
    dentistName: 'Dr. Diane Uwase',
    attachmentsCount: 1,
    updatedAt: '2026-10-07 10:15'
  },
  {
    id: 'asm-103',
    patientId: 'pat-3',
    patientName: 'Imani Uwase',
    date: '2026-10-05',
    chiefComplaint: 'Swelling and pressure behind lower left molars; difficulty opening mouth fully (trismus) since weekend.',
    templateType: 'Toothache',
    clinicalObservations: 'Operculum inflamed over partially erupted Tooth #38/32 (wisdom tooth region). Pericoronitis signs. Normal pulp testing on adjacent 2nd molar.',
    periodontalNotes: 'Localized gingival erythema, minimal plaque elsewhere.',
    occlusalNotes: 'Normal bite alignment.',
    status: 'Completed',
    dentistId: 'usr-1',
    dentistName: 'Dr. Diane Uwase',
    attachmentsCount: 1,
    updatedAt: '2026-10-05 16:40'
  },
  {
    id: 'asm-104',
    patientId: 'pat-4',
    patientName: 'Eric Murenzi',
    date: '2026-09-28',
    chiefComplaint: 'Routine annual check-up and teeth cleaning request before international conference.',
    templateType: 'Routine check-up',
    clinicalObservations: 'No acute decay observed clinically. Moderate extrinsic tea/coffee staining on lingual aspects of lower incisors.',
    periodontalNotes: 'Gingiva firm and pink. Average probing depths 2mm.',
    occlusalNotes: 'Stable balanced occlusion.',
    status: 'Completed',
    dentistId: 'usr-1',
    dentistName: 'Dr. Diane Uwase',
    attachmentsCount: 1,
    updatedAt: '2026-09-28 11:20'
  }
];

export const INITIAL_SYMPTOMS: SymptomRecord[] = [
  {
    id: 'sym-01',
    patientId: 'pat-1',
    patientName: 'Aline Niyonsaba',
    symptomType: 'Sharp cold sensitivity with lingering pain (>30 sec)',
    category: 'Sensitivity',
    duration: '5 days',
    severity: 'Severe',
    severityScore: 8,
    toothLocation: 'Tooth #19 (Mandibular Left First Molar)',
    toothNumber: 19,
    triggers: ['Cold drinks', 'Biting hard bread', 'Sweet foods'],
    source: 'Patient-reported',
    dateReported: '2026-10-06',
    status: 'Active'
  },
  {
    id: 'sym-02',
    patientId: 'pat-1',
    patientName: 'Aline Niyonsaba',
    symptomType: 'Spontaneous nocturnal throbbing pain',
    category: 'Pain',
    duration: '2 nights',
    severity: 'Severe',
    severityScore: 9,
    toothLocation: 'Tooth #19 (Mandibular Left First Molar)',
    toothNumber: 19,
    triggers: ['Lying down flat', 'Warm beverages'],
    source: 'Patient-reported',
    dateReported: '2026-10-06',
    status: 'Active'
  },
  {
    id: 'sym-03',
    patientId: 'pat-1',
    patientName: 'Aline Niyonsaba',
    symptomType: 'Tenderness to vertical percussion',
    category: 'Pain',
    duration: '3 days',
    severity: 'Moderate',
    severityScore: 6,
    toothLocation: 'Tooth #19 (Mandibular Left First Molar)',
    toothNumber: 19,
    triggers: ['Chewing pressure', 'Tapping'],
    source: 'Clinically observed',
    dateReported: '2026-10-06',
    status: 'Active'
  },
  {
    id: 'sym-04',
    patientId: 'pat-2',
    patientName: 'Kevin Mugisha',
    symptomType: 'Bleeding while flossing and brushing',
    category: 'Bleeding',
    duration: '3 weeks',
    severity: 'Moderate',
    severityScore: 5,
    toothLocation: 'Lower right posterior quadrant (#28-#31)',
    toothNumber: 30,
    triggers: ['Toothbrushing', 'Flossing'],
    source: 'Patient-reported',
    dateReported: '2026-10-07',
    status: 'Active'
  },
  {
    id: 'sym-05',
    patientId: 'pat-2',
    patientName: 'Kevin Mugisha',
    symptomType: 'Localized deep gingival swelling with halitosis',
    category: 'Swelling',
    duration: '1 week',
    severity: 'Severe',
    severityScore: 7,
    toothLocation: 'Tooth #30 (Mandibular Right First Molar)',
    toothNumber: 30,
    triggers: ['Chewing', 'Pressure'],
    source: 'Clinically observed',
    dateReported: '2026-10-07',
    status: 'Active'
  },
  {
    id: 'sym-06',
    patientId: 'pat-3',
    patientName: 'Imani Uwase',
    symptomType: 'Retromolar pain and partial lockjaw (trismus)',
    category: 'Swelling',
    duration: '4 days',
    severity: 'Moderate',
    severityScore: 6,
    toothLocation: 'Tooth #32 (Mandibular Right Third Molar)',
    toothNumber: 32,
    triggers: ['Mouth opening', 'Swallowing'],
    source: 'Clinically observed',
    dateReported: '2026-10-05',
    status: 'Under Investigation'
  }
];

export const INITIAL_AI_SYMPTOM_FINDINGS: AISymptomFinding[] = [
  {
    id: 'aif-01',
    condition: 'Symptomatic Irreversible Pulpitis with Acute Apical Periodontitis',
    icdCode: 'K04.01 / K04.4',
    confidence: 94.6,
    urgency: 'High',
    correlatedSymptoms: [
      'Sharp cold sensitivity lingering >30s',
      'Spontaneous nocturnal throbbing',
      'Tenderness to vertical percussion on #19'
    ],
    reasoning: 'The combination of prolonged cold response, night throbbing exacerbated by supine posture, and localized percussion sensitivity provides high Bayesian correlation (94.6%) for irreversible pulpitis transitioning into apical involvement.',
    differentialDiagnosis: ['Deep reversible pulpitis (14%)', 'Cracked tooth syndrome (9%)', 'Food impaction papillitis (4%)'],
    suggestedAction: 'Require radiographic confirmation of pulpal depth and periapical status. Endodontic root canal therapy or indirect pulp capping depending on radiographic pulp encroachment.'
  },
  {
    id: 'aif-02',
    condition: 'Localized Acute Periodontal Abscess / Severe Periodontitis',
    icdCode: 'K05.21',
    confidence: 88.2,
    urgency: 'Moderate',
    correlatedSymptoms: [
      'Deep pocket bleeding',
      'Throbbing localized swelling on #30',
      'Suppuration on probing'
    ],
    reasoning: 'Pre-existing diabetic history (Kevin Mugisha HbA1c 6.8%) coupled with 6mm pocket depth and acute swelling aligns with an acute exacerbation of chronic localized periodontitis.',
    differentialDiagnosis: ['Combined endo-perio lesion (22%)', 'Vertical root fracture (8%)'],
    suggestedAction: 'Perform periapical radiograph to rule out endodontic origin, followed by subgingival debridement, pocket irrigation, and chlorhexidine regimen.'
  },
  {
    id: 'aif-03',
    condition: 'Acute Pericoronitis associated with Partially Impacted 3rd Molar',
    icdCode: 'K05.22',
    confidence: 96.1,
    urgency: 'Moderate',
    correlatedSymptoms: [
      'Operculum inflammation',
      'Mild trismus',
      'Pain on swallowing behind tooth #32'
    ],
    reasoning: 'Classic triad of pericoronal inflammation in 23-year-old patient with partially erupted lower wisdom tooth.',
    differentialDiagnosis: ['Tonsillitis (6%)', 'Temporomandibular joint capsulitis (3%)'],
    suggestedAction: 'Operculectomy or surgical disimpaction once acute inflammation is resolved with warm saline irrigation.'
  }
];

export const INITIAL_XRAYS: DentalXRay[] = [
  {
    id: 'xray-101',
    patientId: 'pat-1',
    patientName: 'Aline Niyonsaba',
    type: 'Panoramic (OPG)',
    dateTaken: '2026-10-06 14:40',
    takenBy: 'Claire Uwera (Certified Radiographer)',
    toothRegion: 'Full Dentition (Mandibular & Maxillary Arches)',
    notes: 'Panoramic digital OPG high resolution. High contrast on posterior quadrants. Patient moved slightly on upper left canine region but occlusal fields sharp.',
    aiProcessed: true,
    aiFindingsCount: 3,
    status: 'Findings Detected'
  },
  {
    id: 'xray-102',
    patientId: 'pat-2',
    patientName: 'Kevin Mugisha',
    type: 'Bitewing',
    dateTaken: '2026-10-07 10:30',
    takenBy: 'Claire Uwera',
    toothRegion: 'Right Posterior (#28-#31)',
    notes: 'Bitewing assessing interproximal bone crest and subgingival calculus.',
    aiProcessed: true,
    aiFindingsCount: 2,
    status: 'Findings Detected'
  },
  {
    id: 'xray-103',
    patientId: 'pat-3',
    patientName: 'Imani Uwase',
    type: 'Panoramic (OPG)',
    dateTaken: '2026-10-05 16:15',
    takenBy: 'Claire Uwera',
    toothRegion: 'Mandibular Third Molars (#17, #32)',
    notes: 'Evaluated lower third molar angulation relative to inferior alveolar nerve canal.',
    aiProcessed: true,
    aiFindingsCount: 1,
    status: 'Findings Detected'
  }
];

export const INITIAL_AI_XRAY_FINDINGS: AIXRayFinding[] = [
  {
    id: 'xrf-01',
    toothNumber: 19,
    toothName: 'Lower Left 1st Molar (Tooth #19)',
    findingType: 'Deep Caries',
    location: 'Occluso-distal coronal dentin extending to inner pulpal third',
    confidence: 94.8,
    status: 'AI Pending',
    severity: 'Severe',
    clinicalObservationComparison: 'Matches clinical cavitation and severe cold lingering response noted during Dr. Diane Uwase clinical assessment.',
    recommendation: 'Complete caries removal under rubber dam; root canal treatment (RCT) indicated due to pulp chamber violation.'
  },
  {
    id: 'xrf-02',
    toothNumber: 19,
    toothName: 'Lower Left 1st Molar (Tooth #19)',
    findingType: 'Periapical Radiolucency',
    location: 'Mesial and distal root apices, PDL space widening >1.2mm',
    confidence: 87.5,
    status: 'AI Pending',
    severity: 'Moderate',
    clinicalObservationComparison: 'Correlates with clinical tenderness to percussion (+). Indicates early periapical inflammatory response.',
    recommendation: 'Bio-mechanical canal preparation, calcium hydroxide intracanal medication, obturation.'
  },
  {
    id: 'xrf-03',
    toothNumber: 14,
    toothName: 'Upper Left 1st Molar (Tooth #14)',
    findingType: 'Defective Restoration',
    location: 'Mesial amalgam overhang with localized food impaction',
    confidence: 76.2,
    status: 'AI Pending',
    severity: 'Mild',
    clinicalObservationComparison: 'Mild interproximal floss fraying noted during hygiene check.',
    recommendation: 'Re-contour or replacement with direct composite resin restoration.'
  },
  {
    id: 'xrf-04',
    toothNumber: 30,
    toothName: 'Lower Right 1st Molar (Tooth #30)',
    findingType: 'Marginal Bone Loss',
    location: 'Interradicular crestal bone recession 3.8mm, furcation involvement Grade I',
    confidence: 89.1,
    status: 'Accepted',
    doctorFeedback: 'Confirmed on clinical probe 6mm pocket depth.',
    severity: 'Moderate',
    clinicalObservationComparison: 'Direct match with clinical pocket depth and localized bleeding.',
    recommendation: 'Scaling and root planing (SRP), localized antimicrobial therapy.'
  },
  {
    id: 'xrf-05',
    toothNumber: 32,
    toothName: 'Lower Right 3rd Molar (Tooth #32)',
    findingType: 'Impacted Tooth',
    location: 'Mesioangular impaction Pell & Gregory Class II Position B',
    confidence: 96.4,
    status: 'Accepted',
    doctorFeedback: 'Roots curved away from ID canal. Safe for surgical removal.',
    severity: 'Moderate',
    clinicalObservationComparison: 'Matches clinical pericoronitis operculum and trismus.',
    recommendation: 'Surgical extraction under local anesthesia.'
  }
];

export const INITIAL_TREATMENT_PLANS: TreatmentPlan[] = [
  {
    id: 'tp-201',
    patientId: 'pat-1',
    patientName: 'Aline Niyonsaba',
    title: 'Endodontic Therapy & Coronal Restoration Plan (#19)',
    diagnosisSummary: 'Symptomatic Irreversible Pulpitis #19 with early apical periodontitis; Secondary recurrent caries #14.',
    phases: [
      {
        id: 'ph-1',
        phaseNumber: 1,
        name: 'Phase 1: Emergency & Pain Relief (Immediate)',
        targetTimeline: 'Week 1 (Oct 8 - Oct 12, 2026)',
        procedures: [
          {
            id: 'pr-101',
            code: 'D3220',
            name: 'Emergency Pulpectomy / Canal Extirpation & Temp Seal',
            tooth: 'Tooth #19',
            costRwf: 35000,
            status: 'Pending',
            notes: 'Profound anesthesia (inferior alveolar nerve block). Rubber dam isolation.'
          },
          {
            id: 'pr-102',
            code: 'D0140',
            name: 'Diagnostic Radiographs & Re-evaluation',
            tooth: 'Quadrant 3',
            costRwf: 15000,
            status: 'Pending',
            notes: 'Working length determination via apex locator and periapical shot.'
          }
        ]
      },
      {
        id: 'ph-2',
        phaseNumber: 2,
        name: 'Phase 2: Endodontic Completion & Core Buildup',
        targetTimeline: 'Week 2 (Oct 15 - Oct 19, 2026)',
        procedures: [
          {
            id: 'pr-103',
            code: 'D3330',
            name: 'Molar Endodontic Therapy (3-4 Canals Obturation)',
            tooth: 'Tooth #19',
            costRwf: 95000,
            status: 'Pending',
            notes: 'Warm vertical condensation with bioceramic sealer.'
          },
          {
            id: 'pr-104',
            code: 'D2950',
            name: 'Core Buildup with Fiber Post Retention',
            tooth: 'Tooth #19',
            costRwf: 45000,
            status: 'Pending',
            notes: 'Dual-cure core composite resin.'
          }
        ]
      },
      {
        id: 'ph-3',
        phaseNumber: 3,
        name: 'Phase 3: Definitive Prosthetic Restoration & Preventive Care',
        targetTimeline: 'Week 4-5 (Nov 2026)',
        procedures: [
          {
            id: 'pr-105',
            code: 'D2740',
            name: 'Monolithic Zirconia Full Coverage Crown',
            tooth: 'Tooth #19',
            costRwf: 160000,
            status: 'Pending',
            notes: 'Digital intraoral scan for custom milled crown.'
          },
          {
            id: 'pr-106',
            code: 'D2392',
            name: 'Resin Composite Restoration (2 Surfaces)',
            tooth: 'Tooth #14',
            costRwf: 30000,
            status: 'Pending',
            notes: 'Replace defective mesial restoration.'
          },
          {
            id: 'pr-107',
            code: 'D1110',
            name: 'Full Mouth Ultrasonic Scaling & Polish',
            tooth: 'All Quadrants',
            costRwf: 25000,
            status: 'Pending',
            notes: 'Routine periodontal prophylaxis.'
          }
        ]
      }
    ],
    totalCostRwf: 405000,
    status: 'Proposed',
    createdDate: '2026-10-06',
    dentistId: 'usr-1',
    dentistName: 'Dr. Diane Uwase',
    patientAgreed: false,
    notes: 'Patient briefed on importance of full crown coverage to prevent post-endodontic root fracture. Payment plan option available via MTN Mobile Money / Bank transfer.'
  },
  {
    id: 'tp-202',
    patientId: 'pat-2',
    patientName: 'Kevin Mugisha',
    title: 'Non-Surgical Periodontal Therapy & Occlusal Rehabilitation',
    diagnosisSummary: 'Stage II Grade B Localized Periodontitis (#30) in patient with Type 2 Diabetes.',
    phases: [
      {
        id: 'ph-1',
        phaseNumber: 1,
        name: 'Phase 1: Deep Subgingival Debridement & Irrigation',
        targetTimeline: 'Week 1-2',
        procedures: [
          {
            id: 'pr-201',
            code: 'D4341',
            name: 'Periodontal Scaling & Root Planing (Quadrant 4)',
            tooth: '#28-#31',
            costRwf: 50000,
            status: 'Scheduled',
            notes: 'Local anesthetic infiltration. Ultrasonic piezo + Gracey curettes.'
          },
          {
            id: 'pr-202',
            code: 'D9630',
            name: 'Subgingival Chlorhexidine 0.2% Pocket Irrigation',
            tooth: 'Tooth #30',
            costRwf: 12000,
            status: 'Scheduled',
            notes: 'Deliver localized antimicrobial lavage.'
          }
        ]
      },
      {
        id: 'ph-2',
        phaseNumber: 2,
        name: 'Phase 2: Re-evaluation & Maintenance Therapy',
        targetTimeline: 'Week 6',
        procedures: [
          {
            id: 'pr-203',
            code: 'D4910',
            name: 'Periodontal Maintenance & 6-Point Re-probing',
            tooth: 'Full Mouth',
            costRwf: 35000,
            status: 'Pending',
            notes: 'Assess reduction in bleeding on probing and pocket depth.'
          }
        ]
      }
    ],
    totalCostRwf: 97000,
    status: 'Approved',
    createdDate: '2026-10-07',
    approvedDate: '2026-10-07',
    dentistId: 'usr-1',
    dentistName: 'Dr. Diane Uwase',
    patientAgreed: true,
    notes: 'Advised strict glycemic monitoring with primary care physician at Masaka Hospital.'
  }
];

export const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-301',
    patientId: 'pat-1',
    patientName: 'Aline Niyonsaba',
    caseType: 'Symptom & X-Ray Combined',
    dateSubmitted: '2026-10-06 14:45',
    status: 'Pending',
    aiConfidenceScore: 94.6,
    findingsCount: 3,
    dentistId: 'usr-1',
    dentistName: 'Dr. Diane Uwase',
    reviewNotes: '',
    overridden: false
  },
  {
    id: 'rev-302',
    patientId: 'pat-2',
    patientName: 'Kevin Mugisha',
    caseType: 'X-Ray Assessment',
    dateSubmitted: '2026-10-07 10:45',
    status: 'Confirmed',
    aiConfidenceScore: 89.1,
    findingsCount: 2,
    dentistId: 'usr-1',
    dentistName: 'Dr. Diane Uwase',
    reviewNotes: 'Clinical probing depth 6mm correlates with AI bone loss finding on #30. Treatment plan approved for Quadrant 4 SRP.',
    overridden: false,
    digitalSignature: {
      signedByName: 'Dr. Diane Uwase, BDS',
      medicalLicenseNo: 'RMC/DEN/2019/0842',
      signedAt: '2026-10-07 11:10 CAT',
      hash: 'SHA256:d8a9f4c391bb702e1a90c1fef32b71940a02',
      confirmedResponsibility: true
    }
  },
  {
    id: 'rev-303',
    patientId: 'pat-3',
    patientName: 'Imani Uwase',
    caseType: 'Treatment Plan Sign-off',
    dateSubmitted: '2026-10-05 16:30',
    status: 'Confirmed',
    aiConfidenceScore: 96.1,
    findingsCount: 1,
    dentistId: 'usr-1',
    dentistName: 'Dr. Diane Uwase',
    reviewNotes: 'Surgical extraction of tooth #32 approved following resolution of acute pericoronal edema.',
    overridden: false,
    digitalSignature: {
      signedByName: 'Dr. Diane Uwase, BDS',
      medicalLicenseNo: 'RMC/DEN/2019/0842',
      signedAt: '2026-10-05 17:02 CAT',
      hash: 'SHA256:889410ef39cb621a7d50901eab409ff018a1',
      confirmedResponsibility: true
    }
  },
  {
    id: 'rev-304',
    patientId: 'pat-4',
    patientName: 'Eric Murenzi',
    caseType: 'Symptom & X-Ray Combined',
    dateSubmitted: '2026-09-28 11:30',
    status: 'Confirmed',
    aiConfidenceScore: 98.2,
    findingsCount: 0,
    dentistId: 'usr-1',
    dentistName: 'Dr. Diane Uwase',
    reviewNotes: 'Normal dental anatomy confirmed. No intervention required beyond routine prophylaxis.',
    overridden: false,
    digitalSignature: {
      signedByName: 'Dr. Diane Uwase, BDS',
      medicalLicenseNo: 'RMC/DEN/2019/0842',
      signedAt: '2026-09-28 11:55 CAT',
      hash: 'SHA256:0192a83bd82c49a997ef01c238b199042b89',
      confirmedResponsibility: true
    }
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-501',
    timestamp: '2026-10-08 07:10:12',
    category: 'Access',
    user: 'Dr. Diane Uwase',
    role: 'Dental Professional',
    action: 'User Session Authentication',
    resource: 'Auth / Portal',
    status: 'Success',
    details: 'Authenticated via 2FA session from ORI Clinic Masaka IP 197.243.22.84'
  },
  {
    id: 'log-502',
    timestamp: '2026-10-07 11:10:45',
    category: 'Professional reviews',
    user: 'Dr. Diane Uwase',
    role: 'Dental Professional',
    action: 'Digital Signature Executed',
    resource: 'Review #rev-302 (Kevin Mugisha)',
    status: 'Success',
    details: 'Signed cryptographic clinical confirmation with License RMC/DEN/2019/0842'
  },
  {
    id: 'log-503',
    timestamp: '2026-10-07 10:32:18',
    category: 'AI events',
    user: 'AI Pipeline (ORI Symptom Support 2.4)',
    role: 'System AI',
    action: 'Inference Executed on Bitewing Radiograph',
    resource: 'X-Ray #xray-102 (Kevin Mugisha)',
    status: 'Success',
    details: 'Detected 2 radiographic anomalies. Mean confidence 89.1%. Processing time 1.42s.'
  },
  {
    id: 'log-504',
    timestamp: '2026-10-06 14:42:01',
    category: 'AI events',
    user: 'AI Pipeline (ORI Symptom Support 2.4)',
    role: 'System AI',
    action: 'Panoramic OPG Multi-tooth Segmentation',
    resource: 'X-Ray #xray-101 (Aline Niyonsaba)',
    status: 'Success',
    details: 'Identified Deep Caries on #19 (94.8%) and Periapical Radiolucency (87.5%). Decision support flags generated.'
  },
  {
    id: 'log-505',
    timestamp: '2026-10-06 14:35:10',
    category: 'Access',
    user: 'Claire Uwera',
    role: 'Clinic Staff',
    action: 'Assessment Draft Created',
    resource: 'Assessment #asm-101 (Aline Niyonsaba)',
    status: 'Success',
    details: 'Triage symptoms captured and queued for Dr. Diane Uwase.'
  },
  {
    id: 'log-506',
    timestamp: '2026-10-05 09:00:00',
    category: 'System',
    user: 'Patrick Habineza',
    role: 'Administrator',
    action: 'Weekly Database Snapshot',
    resource: 'Cloud Storage Bucket / Backup',
    status: 'Success',
    details: 'Encrypted backup of all encrypted clinical records verified (Size: 428MB).'
  }
];

export const SYSTEM_MODULES = [
  { id: 'dashboard', name: 'Dashboard', icon: 'LayoutDashboard', desc: 'KPI cards, review queues & activity' },
  { id: 'patients', name: 'Patients', icon: 'Users', desc: 'Patient directory, records & history' },
  { id: 'assessments', name: 'Assessments', icon: 'FileText', desc: 'Clinical exams & chief complaints' },
  { id: 'symptoms', name: 'Symptoms', icon: 'Activity', desc: 'Patient symptoms & pain tracking' },
  { id: 'ai-symptoms', name: 'AI Symptom Analysis', icon: 'Sparkles', desc: 'Bayesian dental pattern recognition' },
  { id: 'xrays', name: 'Dental X-Rays', icon: 'Image', desc: 'Panoramic viewer, zoom, contrast & notes' },
  { id: 'ai-xrays', name: 'AI X-Ray Review', icon: 'ScanFace', desc: 'Teeth detection & bounding overlays' },
  { id: 'decision-support', name: 'Decision Support', icon: 'GitCompare', desc: 'Symptom + X-Ray unified analysis' },
  { id: 'treatment-plans', name: 'Treatment Plans', icon: 'Layers', desc: 'Phased procedures & RWF cost estimates' },
  { id: 'professional-review', name: 'Professional Review', icon: 'CheckCircle2', desc: 'Dentist signature & sign-off queue' },
  { id: 'clinical-history', name: 'Clinical History', icon: 'Clock', desc: 'Chronological timeline & before/after' },
  { id: 'reports', name: 'Reports', icon: 'BarChart3', desc: 'Clinical stats, accuracy & exports' },
  { id: 'audit', name: 'Audit & Activity', icon: 'ShieldCheck', desc: 'Regulatory logs & compliance audit trail' },
  { id: 'user-access', name: 'User & Access', icon: 'UserCheck', desc: 'Roles, RBAC permissions & credentials' },
  { id: 'admin', name: 'System Administration', icon: 'Sliders', desc: 'Clinic setup, AI config & health' },
];
