import React, { useState } from 'react';
import {
  Upload,
  ZoomIn,
  Sliders,
  Calendar,
  Layers,
  ArrowRight,
  GitCompare,
  CheckCircle2,
  AlertTriangle,
  FileText,
  User,
  Tag
} from 'lucide-react';
import { DentalXRay, Patient } from '../../types';
import { DentalXRayViewer } from '../common/DentalXRayViewer';

interface DentalXRaysModuleProps {
  xrays: DentalXRay[];
  patients: Patient[];
  selectedPatientId: string;
  onSelectPatient: (patientId: string) => void;
  onNavigateModule: (moduleId: string) => void;
  showToast: (title: string, message?: string, type?: 'success' | 'warning' | 'info' | 'error') => void;
}

export const DentalXRaysModule: React.FC<DentalXRaysModuleProps> = ({
  xrays,
  patients,
  selectedPatientId,
  onSelectPatient,
  onNavigateModule,
  showToast,
}) => {
  const [selectedTooth, setSelectedTooth] = useState<number | null>(19);
  const [showOverlays, setShowOverlays] = useState<boolean>(true);
  const [isCompareMode, setIsCompareMode] = useState<boolean>(false);
  const [activeXrayId, setActiveXrayId] = useState<string>(xrays[0]?.id || '');

  const activePatient = patients.find(p => p.id === selectedPatientId) || patients[0];
  const activeXray = xrays.find(x => x.id === activeXrayId) || xrays[0];

  const handleSimulateUpload = () => {
    showToast('Radiograph Ingested', 'Panoramic OPG received & verified via direct CMOS sensor.', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header & Upload Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-[24px] border border-[#E6EAEC] shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-[#0F1A1F]">Dental Radiography Suite</h2>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold font-mono bg-[#E3F4F8] text-[#22A6C0]">
              Full Dentition Panoramic (OPG)
            </span>
          </div>
          <p className="text-xs text-[#8F9AA0] mt-0.5">
            Patient: <strong className="text-[#0F1A1F]">{activePatient.fullName}</strong> ({activePatient.fileNumber}) · Taken by {activeXray?.takenBy}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Compare toggle */}
          <button
            onClick={() => {
              setIsCompareMode(!isCompareMode);
              showToast(isCompareMode ? 'Single View' : 'Comparison Mode', 'Comparing current radiograph against baseline checkup.', 'info');
            }}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold border transition-all ${
              isCompareMode
                ? 'bg-[#22A6C0] text-white border-[#22A6C0]'
                : 'bg-[#F5F7F8] hover:bg-[#EAEFF2] text-[#0F1A1F] border-[#E6EAEC]'
            }`}
          >
            <GitCompare className="w-3.5 h-3.5" />
            <span>Before / After Compare</span>
          </button>

          {/* Upload trigger */}
          <button
            onClick={handleSimulateUpload}
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#22A6C0] hover:bg-[#1B899F] text-xs font-semibold text-white shadow-sm transition-all"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Radiograph</span>
          </button>
        </div>
      </div>

      {/* Main Radiograph Viewer Component */}
      <div className="space-y-4">
        {isCompareMode ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <div className="mb-2 px-3 py-1 rounded-full bg-slate-100 text-xs font-semibold text-slate-700 inline-block">
                Baseline (May 2025 Prior Visit)
              </div>
              <DentalXRayViewer
                selectedTooth={selectedTooth}
                onSelectTooth={setSelectedTooth}
                showAIOverlays={false}
              />
            </div>
            <div>
              <div className="mb-2 px-3 py-1 rounded-full bg-[#E3F4F8] text-xs font-semibold text-[#22A6C0] inline-block">
                Current Panoramic OPG (Oct 2026 Active)
              </div>
              <DentalXRayViewer
                selectedTooth={selectedTooth}
                onSelectTooth={setSelectedTooth}
                showAIOverlays={showOverlays}
                onToggleAIOverlays={() => setShowOverlays(!showOverlays)}
              />
            </div>
          </div>
        ) : (
          <DentalXRayViewer
            selectedTooth={selectedTooth}
            onSelectTooth={setSelectedTooth}
            showAIOverlays={showOverlays}
            onToggleAIOverlays={() => setShowOverlays(!showOverlays)}
          />
        )}
      </div>

      {/* Metadata & Timeline Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Radiograph Metadata & Parameters (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-[24px] p-6 border border-[#E6EAEC] shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#F0F3F5]">
            <h3 className="font-bold text-sm text-[#0F1A1F]">Radiograph Imaging Specifications</h3>
            <span className="font-mono text-xs text-[#1F9D74] font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> High Diagnostic Quality
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-2xl bg-[#F5F7F8] border border-[#E6EAEC]">
              <span className="text-[#8F9AA0] block text-[10px] uppercase font-bold">Acquisition Date</span>
              <p className="font-semibold text-[#0F1A1F] mt-0.5">{activeXray?.dateTaken}</p>
            </div>
            <div className="p-3 rounded-2xl bg-[#F5F7F8] border border-[#E6EAEC]">
              <span className="text-[#8F9AA0] block text-[10px] uppercase font-bold">Modality</span>
              <p className="font-semibold text-[#0F1A1F] mt-0.5">{activeXray?.type}</p>
            </div>
            <div className="p-3 rounded-2xl bg-[#F5F7F8] border border-[#E6EAEC]">
              <span className="text-[#8F9AA0] block text-[10px] uppercase font-bold">Operator</span>
              <p className="font-semibold text-[#0F1A1F] mt-0.5">{activeXray?.takenBy}</p>
            </div>
            <div className="p-3 rounded-2xl bg-[#F5F7F8] border border-[#E6EAEC]">
              <span className="text-[#8F9AA0] block text-[10px] uppercase font-bold">Exposure</span>
              <p className="font-semibold text-[#0F1A1F] mt-0.5">70 kVp · 8.0 mA · 14.2s</p>
            </div>
            <div className="p-3 rounded-2xl bg-[#F5F7F8] border border-[#E6EAEC]">
              <span className="text-[#8F9AA0] block text-[10px] uppercase font-bold">Sensor Dimensions</span>
              <p className="font-semibold text-[#0F1A1F] mt-0.5">2048 × 1024 px (CMOS)</p>
            </div>
            <div className="p-3 rounded-2xl bg-[#F5F7F8] border border-[#E6EAEC]">
              <span className="text-[#8F9AA0] block text-[10px] uppercase font-bold">AI Status</span>
              <p className="font-semibold text-[#22A6C0] mt-0.5">Segmented (3 cues)</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#F5F7F8] border border-[#E6EAEC] text-xs">
            <span className="font-semibold text-[#0F1A1F] block mb-1">Radiologist Clinical Remarks:</span>
            <p className="text-[#8F9AA0] leading-relaxed">
              {activeXray?.notes}
            </p>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <span className="text-xs text-[#8F9AA0]">Proceed to bounding box reviews:</span>
            <button
              onClick={() => onNavigateModule('ai-xrays')}
              className="px-5 py-2 rounded-full bg-[#22A6C0] hover:bg-[#1B899F] text-white text-xs font-semibold shadow-xs flex items-center gap-2"
            >
              <span>Open AI X-Ray Review Module</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right: Radiograph Archive Timeline (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-[24px] p-6 border border-[#E6EAEC] shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#F0F3F5]">
            <h3 className="font-bold text-sm text-[#0F1A1F]">Patient Imaging History</h3>
            <span className="text-xs text-[#8F9AA0] font-mono">{xrays.length} studies</span>
          </div>

          <div className="space-y-3">
            {xrays.map(xr => {
              const isSelected = xr.id === activeXrayId;
              return (
                <div
                  key={xr.id}
                  onClick={() => {
                    setActiveXrayId(xr.id);
                    onSelectPatient(xr.patientId);
                  }}
                  className={`p-3.5 rounded-2xl cursor-pointer border transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#E3F4F8] border-[#22A6C0]/40 shadow-xs'
                      : 'bg-[#F5F7F8] hover:bg-[#EAEFF2] border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#0F1D24] text-[#22A6C0] flex items-center justify-center font-bold text-[11px] font-mono shrink-0">
                      DICOM
                    </div>
                    <div>
                      <p className="font-semibold text-xs text-[#0F1A1F]">{xr.patientName}</p>
                      <p className="text-[11px] text-[#22A6C0] font-medium">{xr.type}</p>
                      <p className="text-[10px] text-[#8F9AA0] font-mono">{xr.dateTaken}</p>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-white text-[#0F1A1F] border border-[#CBD5E1]">
                    {xr.aiFindingsCount} cues
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
