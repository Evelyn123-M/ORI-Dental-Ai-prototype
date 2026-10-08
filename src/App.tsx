/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  UserProfile,
  Patient,
  ClinicalAssessment,
  SymptomRecord,
  DentalXRay,
  TreatmentPlan,
  ReviewItem,
  AuditLog,
} from './types';
import {
  DOCTORS_AND_STAFF,
  INITIAL_PATIENTS,
  INITIAL_ASSESSMENTS,
  INITIAL_SYMPTOMS,
  INITIAL_XRAYS,
  INITIAL_TREATMENT_PLANS,
  INITIAL_REVIEWS,
  INITIAL_AUDIT_LOGS,
} from './data/mockData';
import { LandingPage } from './components/landing/LandingPage';
import { LoginPage } from './components/auth/LoginPage';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { WorkflowStepper, ClinicalStepId, CLINICAL_STEPS } from './components/common/WorkflowStepper';
import { CommandPalette } from './components/common/CommandPalette';
import { ToastContainer, ToastMessage } from './components/common/Toast';

// 15 Modules
import { DashboardModule } from './components/modules/DashboardModule';
import { PatientsModule } from './components/modules/PatientsModule';
import { AssessmentsModule } from './components/modules/AssessmentsModule';
import { SymptomsModule } from './components/modules/SymptomsModule';
import { AISymptomAnalysisModule } from './components/modules/AISymptomAnalysisModule';
import { DentalXRaysModule } from './components/modules/DentalXRaysModule';
import { AIXRayReviewModule } from './components/modules/AIXRayReviewModule';
import { DecisionSupportModule } from './components/modules/DecisionSupportModule';
import { TreatmentPlansModule } from './components/modules/TreatmentPlansModule';
import { ProfessionalReviewModule } from './components/modules/ProfessionalReviewModule';
import { ClinicalHistoryModule } from './components/modules/ClinicalHistoryModule';
import { ReportsModule } from './components/modules/ReportsModule';
import { AuditActivityModule } from './components/modules/AuditActivityModule';
import { UserAccessModule } from './components/modules/UserAccessModule';
import { SystemAdminModule } from './components/modules/SystemAdminModule';

export default function App() {
  // Navigation View: 'landing' (public) | 'login' | 'app' (authenticated)
  const [view, setView] = useState<'landing' | 'login' | 'app'>('landing');

  // Active authenticated user
  const [currentUser, setCurrentUser] = useState<UserProfile>(DOCTORS_AND_STAFF[0]);

  // Active Module in App Shell
  const [activeModule, setActiveModule] = useState<string>('dashboard');

  // Sidebar toggle state (mobile)
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  // Command palette search modal state
  const [searchOpen, setSearchOpen] = useState<boolean>(false);

  // Profile / Password modal states
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);

  // Central Patient Store (12 Rwandan Patients)
  const [patients, setPatients] = useState<Patient[]>(INITIAL_PATIENTS);
  const [selectedPatientId, setSelectedPatientId] = useState<string>('pat-1');

  // Clinical Records Stores
  const [assessments, setAssessments] = useState<ClinicalAssessment[]>(INITIAL_ASSESSMENTS);
  const [symptoms, setSymptoms] = useState<SymptomRecord[]>(INITIAL_SYMPTOMS);
  const [xrays, setXrays] = useState<DentalXRay[]>(INITIAL_XRAYS);
  const [treatmentPlans, setTreatmentPlans] = useState<TreatmentPlan[]>(INITIAL_TREATMENT_PLANS);
  const [reviews, setReviews] = useState<ReviewItem[]>(INITIAL_REVIEWS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);

  // Toast Notification System
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (
    title: string,
    message?: string,
    type: 'success' | 'warning' | 'info' | 'error' = 'success'
  ) => {
    const id = `toast-${Date.now()}`;
    setToasts(prev => [...prev, { id, title, message, type }]);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Add Patient Handler
  const handleAddPatient = (newPatient: Patient) => {
    setPatients(prev => [newPatient, ...prev]);
    setSelectedPatientId(newPatient.id);
  };

  // Update Patient Handler
  const handleUpdatePatient = (updatedPatient: Patient) => {
    setPatients(prev => prev.map(p => (p.id === updatedPatient.id ? updatedPatient : p)));
  };

  // Save Assessment Handler
  const handleSaveAssessment = (assessment: ClinicalAssessment) => {
    setAssessments(prev => {
      const exists = prev.some(a => a.id === assessment.id);
      if (exists) {
        return prev.map(a => (a.id === assessment.id ? assessment : a));
      }
      return [assessment, ...prev];
    });
  };

  // Add Symptom Handler
  const handleAddSymptom = (symptom: SymptomRecord) => {
    setSymptoms(prev => [symptom, ...prev]);
  };

  // Update Treatment Plan Handler
  const handleUpdateTreatmentPlan = (plan: TreatmentPlan) => {
    setTreatmentPlans(prev => prev.map(tp => (tp.id === plan.id ? plan : tp)));
  };

  // Update Review Item Handler
  const handleUpdateReview = (review: ReviewItem) => {
    setReviews(prev => prev.map(r => (r.id === review.id ? review : r)));
  };

  // Active Patient helper
  const activePatient = patients.find(p => p.id === selectedPatientId) || patients[0];
  const pendingReviewsCount = reviews.filter(r => r.status === 'Pending').length;

  // Determine which clinical step we are in
  const getClinicalStepFromModule = (modId: string): ClinicalStepId => {
    switch (modId) {
      case 'patients':
        return 'patient';
      case 'symptoms':
        return 'symptoms';
      case 'xrays':
      case 'ai-xrays':
        return 'xray';
      case 'ai-symptoms':
        return 'ai-findings';
      case 'treatment-plans':
        return 'treatment-plan';
      case 'professional-review':
        return 'professional-review';
      case 'decision-support':
        return 'final-decision';
      default:
        return 'patient';
    }
  };

  const isClinicalModule = [
    'patients',
    'symptoms',
    'assessments',
    'xrays',
    'ai-xrays',
    'ai-symptoms',
    'decision-support',
    'treatment-plans',
    'professional-review',
    'clinical-history',
  ].includes(activeModule);

  // Render view
  if (view === 'landing') {
    return (
      <>
        <LandingPage
          onSignIn={() => setView('login')}
          onExploreDemo={() => {
            setView('app');
            showToast('Welcome to Demo', 'Logged in as Dr. Diane Uwase (Lead Dental Specialist).', 'info');
          }}
        />
        <ToastContainer toasts={toasts} onDismiss={dismissToast} />
      </>
    );
  }

  if (view === 'login') {
    return (
      <>
        <LoginPage
          onLoginSuccess={user => {
            setCurrentUser(user);
            setView('app');
            showToast('Authenticated', `Welcome back, ${user.name}.`, 'success');
          }}
          onBackToLanding={() => setView('landing')}
        />
        <ToastContainer toasts={toasts} onDismiss={dismissToast} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7F8] flex">
      {/* 1. App Sidebar (collapsible drawer on mobile) */}
      <Sidebar
        activeModule={activeModule}
        onSelectModule={setActiveModule}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        pendingReviewsCount={pendingReviewsCount}
      />

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-72">
        {/* Sticky Header with Title, Search (⌘K), Notifications & Avatar */}
        <Header
          currentUser={currentUser}
          onOpenSearch={() => setSearchOpen(true)}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onLogout={() => {
            setView('landing');
            showToast('Signed Out', 'Your clinical session has been safely closed.', 'info');
          }}
          onSwitchUser={user => {
            setCurrentUser(user);
            showToast('Switched User', `Active profile changed to ${user.name} (${user.role}).`, 'info');
          }}
          availableUsers={DOCTORS_AND_STAFF}
          onNavigateToLanding={() => setView('landing')}
          onOpenPasswordModal={() => setIsPasswordModalOpen(true)}
          onOpenProfileModal={() => setIsProfileModalOpen(true)}
          pendingReviewsCount={pendingReviewsCount}
        />

        {/* Scrollable Page Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1440px] w-full mx-auto">
          {/* Clinical Workflow Stepper Bar (shown on clinical pages) */}
          {isClinicalModule && (
            <WorkflowStepper
              currentStep={getClinicalStepFromModule(activeModule)}
              completedSteps={['patient', 'symptoms', 'xray']}
              onStepClick={step => setActiveModule(step.moduleId)}
              activePatientName={`${activePatient.fullName} (${activePatient.fileNumber})`}
            />
          )}

          {/* Module 1: Dashboard */}
          {activeModule === 'dashboard' && (
            <DashboardModule
              currentUser={currentUser}
              patients={patients}
              reviews={reviews}
              auditLogs={auditLogs}
              onNavigateModule={setActiveModule}
              onSelectPatient={setSelectedPatientId}
            />
          )}

          {/* Module 2: Patients Directory */}
          {activeModule === 'patients' && (
            <PatientsModule
              patients={patients}
              selectedPatientId={selectedPatientId}
              onSelectPatient={setSelectedPatientId}
              onAddPatient={handleAddPatient}
              onUpdatePatient={handleUpdatePatient}
              assessments={assessments}
              symptoms={symptoms}
              xrays={xrays}
              treatmentPlans={treatmentPlans}
              onNavigateToModule={setActiveModule}
              showToast={showToast}
            />
          )}

          {/* Module 3: Clinical Assessments */}
          {activeModule === 'assessments' && (
            <AssessmentsModule
              assessments={assessments}
              patients={patients}
              selectedPatientId={selectedPatientId}
              onSelectPatient={setSelectedPatientId}
              onSaveAssessment={handleSaveAssessment}
              onNavigateModule={setActiveModule}
              showToast={showToast}
            />
          )}

          {/* Module 4: Symptoms Tracker */}
          {activeModule === 'symptoms' && (
            <SymptomsModule
              symptoms={symptoms}
              patients={patients}
              selectedPatientId={selectedPatientId}
              onSelectPatient={setSelectedPatientId}
              onAddSymptom={handleAddSymptom}
              onNavigateModule={setActiveModule}
              showToast={showToast}
            />
          )}

          {/* Module 5: AI Symptom Analysis */}
          {activeModule === 'ai-symptoms' && (
            <AISymptomAnalysisModule
              patients={patients}
              selectedPatientId={selectedPatientId}
              onSelectPatient={setSelectedPatientId}
              onNavigateModule={setActiveModule}
              showToast={showToast}
            />
          )}

          {/* Module 6: Dental Radiographs */}
          {activeModule === 'xrays' && (
            <DentalXRaysModule
              xrays={xrays}
              patients={patients}
              selectedPatientId={selectedPatientId}
              onSelectPatient={setSelectedPatientId}
              onNavigateModule={setActiveModule}
              showToast={showToast}
            />
          )}

          {/* Module 7: AI X-Ray Review */}
          {activeModule === 'ai-xrays' && (
            <AIXRayReviewModule
              patients={patients}
              selectedPatientId={selectedPatientId}
              onSelectPatient={setSelectedPatientId}
              onNavigateModule={setActiveModule}
              showToast={showToast}
            />
          )}

          {/* Module 8: Decision Support Matrix */}
          {activeModule === 'decision-support' && (
            <DecisionSupportModule
              patients={patients}
              selectedPatientId={selectedPatientId}
              onSelectPatient={setSelectedPatientId}
              onNavigateModule={setActiveModule}
              showToast={showToast}
            />
          )}

          {/* Module 9: Phased Treatment Plans */}
          {activeModule === 'treatment-plans' && (
            <TreatmentPlansModule
              treatmentPlans={treatmentPlans}
              patients={patients}
              selectedPatientId={selectedPatientId}
              onSelectPatient={setSelectedPatientId}
              onUpdateTreatmentPlan={handleUpdateTreatmentPlan}
              onNavigateModule={setActiveModule}
              showToast={showToast}
            />
          )}

          {/* Module 10: Professional Review & Signature */}
          {activeModule === 'professional-review' && (
            <ProfessionalReviewModule
              reviews={reviews}
              patients={patients}
              selectedPatientId={selectedPatientId}
              onSelectPatient={setSelectedPatientId}
              onUpdateReview={handleUpdateReview}
              onNavigateModule={setActiveModule}
              showToast={showToast}
            />
          )}

          {/* Module 11: Clinical History */}
          {activeModule === 'clinical-history' && (
            <ClinicalHistoryModule
              patients={patients}
              selectedPatientId={selectedPatientId}
              onSelectPatient={setSelectedPatientId}
              assessments={assessments}
              xrays={xrays}
              treatmentPlans={treatmentPlans}
              onNavigateModule={setActiveModule}
              showToast={showToast}
            />
          )}

          {/* Module 12: Reports & Analytics */}
          {activeModule === 'reports' && <ReportsModule showToast={showToast} />}

          {/* Module 13: Audit & Regulatory Log */}
          {activeModule === 'audit' && (
            <AuditActivityModule logs={auditLogs} showToast={showToast} />
          )}

          {/* Module 14: User & Access Management */}
          {activeModule === 'user-access' && (
            <UserAccessModule
              currentUser={currentUser}
              onSwitchUser={setCurrentUser}
              showToast={showToast}
            />
          )}

          {/* Module 15: System Administration */}
          {activeModule === 'admin' && <SystemAdminModule showToast={showToast} />}
        </main>
      </div>

      {/* Global Command Palette (⌘K) */}
      <CommandPalette
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        patients={patients}
        onSelectPatient={setSelectedPatientId}
        onNavigateModule={setActiveModule}
      />

      {/* Profile Modal */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-[28px] max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#E6EAEC] space-y-4 text-xs">
            <div className="flex items-center gap-4 pb-4 border-b border-[#F0F3F5]">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                referrerPolicy="no-referrer"
                className="w-16 h-16 rounded-full object-cover ring-4 ring-[#22A6C0]/20"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80';
                }}
              />
              <div>
                <h3 className="font-bold text-base text-[#0F1A1F]">{currentUser.name}</h3>
                <p className="text-[#8F9AA0]">{currentUser.roleTitle}</p>
                <span className="mt-1 inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono bg-[#E3F4F8] text-[#22A6C0] uppercase">
                  {currentUser.role}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between p-2 rounded-xl bg-[#F5F7F8]">
                <span className="text-[#8F9AA0]">Practice Email:</span>
                <span className="font-semibold text-[#0F1A1F]">{currentUser.email}</span>
              </div>
              <div className="flex justify-between p-2 rounded-xl bg-[#F5F7F8]">
                <span className="text-[#8F9AA0]">Specialty:</span>
                <span className="font-semibold text-[#0F1A1F]">{currentUser.specialty || 'General Dentistry'}</span>
              </div>
              <div className="flex justify-between p-2 rounded-xl bg-[#F5F7F8]">
                <span className="text-[#8F9AA0]">RMC License:</span>
                <span className="font-mono text-[#0F1A1F]">RMC/DEN/2019/0842</span>
              </div>
              <div className="flex justify-between p-2 rounded-xl bg-[#F5F7F8]">
                <span className="text-[#8F9AA0]">Location:</span>
                <span className="text-[#0F1A1F]">ORI Clinic, Masaka, Kigali</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setIsProfileModalOpen(false)}
                className="px-5 py-2 rounded-full bg-[#22A6C0] text-white font-semibold text-xs hover:bg-[#1B899F]"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-[28px] max-w-md w-full p-6 shadow-2xl border border-[#E6EAEC] space-y-4 text-xs">
            <h3 className="font-bold text-base text-[#0F1A1F]">Change Password</h3>
            <p className="text-[#8F9AA0]">Update clinical session credentials for {currentUser.name}</p>
            <form
              onSubmit={e => {
                e.preventDefault();
                setIsPasswordModalOpen(false);
                showToast('Password Updated', 'New password saved.', 'success');
              }}
              className="space-y-3"
            >
              <div>
                <label className="block font-semibold mb-1">Current Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  className="w-full px-3 py-2 bg-[#F5F7F8] rounded-full border border-[#E6EAEC] outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">New Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  className="w-full px-3 py-2 bg-[#F5F7F8] rounded-full border border-[#E6EAEC] outline-none"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="px-4 py-2 text-[#8F9AA0]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#22A6C0] text-white rounded-full font-semibold"
                >
                  Save Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast Notification Mount */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
