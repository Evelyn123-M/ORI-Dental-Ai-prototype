import React from 'react';
import { Check, ChevronRight } from 'lucide-react';

export type ClinicalStepId = 
  | 'patient' 
  | 'symptoms' 
  | 'xray' 
  | 'ai-findings' 
  | 'treatment-plan' 
  | 'professional-review' 
  | 'final-decision';

interface StepDef {
  id: ClinicalStepId;
  label: string;
  shortLabel: string;
  moduleId: string;
}

export const CLINICAL_STEPS: StepDef[] = [
  { id: 'patient', label: '1. Patient Info', shortLabel: 'Patient', moduleId: 'patients' },
  { id: 'symptoms', label: '2. Symptoms', shortLabel: 'Symptoms', moduleId: 'symptoms' },
  { id: 'xray', label: '3. X-Ray Review', shortLabel: 'X-Ray', moduleId: 'xrays' },
  { id: 'ai-findings', label: '4. AI Findings', shortLabel: 'AI Findings', moduleId: 'ai-symptoms' },
  { id: 'treatment-plan', label: '5. Treatment Plan', shortLabel: 'Plan', moduleId: 'treatment-plans' },
  { id: 'professional-review', label: '6. Professional Review', shortLabel: 'Review', moduleId: 'professional-review' },
  { id: 'final-decision', label: '7. Final Decision', shortLabel: 'Decision', moduleId: 'decision-support' },
];

interface WorkflowStepperProps {
  currentStep: ClinicalStepId;
  completedSteps?: ClinicalStepId[];
  onStepClick: (step: StepDef) => void;
  activePatientName?: string;
}

export const WorkflowStepper: React.FC<WorkflowStepperProps> = ({
  currentStep,
  completedSteps = ['patient', 'symptoms', 'xray'],
  onStepClick,
  activePatientName = 'Aline Niyonsaba (ORI-2026-0041)',
}) => {
  const currentIndex = CLINICAL_STEPS.findIndex(s => s.id === currentStep);

  return (
    <div className="bg-white rounded-[20px] p-3.5 mb-6 border border-[#E6EAEC] shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 mb-2.5 border-b border-[#F0F3F5] text-xs">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-[#0F1A1F] uppercase tracking-wider text-[11px] bg-[#E3F4F8] text-[#22A6C0] px-2.5 py-0.5 rounded-full">
            Clinical Care Pathway
          </span>
          <span className="text-[#8F9AA0] hidden md:inline">· Active Case:</span>
          <span className="font-medium text-[#0F1A1F]">{activePatientName}</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-[#8F9AA0]">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#22A6C0]"></span> Step {currentIndex >= 0 ? currentIndex + 1 : 1} of 7
          </span>
          <span>· Dentist Sign-off Mandatory</span>
        </div>
      </div>

      {/* Stepper Strip */}
      <div className="flex items-center justify-between overflow-x-auto no-scrollbar gap-1 pt-1">
        {CLINICAL_STEPS.map((step, idx) => {
          const isDone = completedSteps.includes(step.id) && step.id !== currentStep;
          const isCurrent = step.id === currentStep;

          return (
            <React.Fragment key={step.id}>
              <button
                onClick={() => onStepClick(step)}
                className={`group flex items-center gap-2 py-1.5 px-3 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  isCurrent
                    ? 'bg-[#22A6C0] text-white shadow-sm ring-2 ring-[#22A6C0]/20'
                    : isDone
                    ? 'bg-[#E3F4F8] text-[#1E7D91] hover:bg-[#d0eff5]'
                    : 'bg-[#F5F7F8] text-[#8F9AA0] hover:text-[#0F1A1F] hover:bg-[#EAEFF2]'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
                    isCurrent
                      ? 'bg-white text-[#22A6C0]'
                      : isDone
                      ? 'bg-[#22A6C0] text-white'
                      : 'bg-white border border-[#CBD5E1] text-[#8F9AA0]'
                  }`}
                >
                  {isDone ? <Check className="w-3 h-3 stroke-[3]" /> : idx + 1}
                </span>
                <span className="hidden lg:inline">{step.label}</span>
                <span className="lg:hidden">{step.shortLabel}</span>
              </button>

              {idx < CLINICAL_STEPS.length - 1 && (
                <ChevronRight className="w-3.5 h-3.5 text-[#CBD5E1] shrink-0" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
