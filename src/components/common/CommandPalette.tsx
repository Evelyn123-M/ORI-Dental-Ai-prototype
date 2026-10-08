import React, { useState, useEffect, useRef } from 'react';
import { Search, X, User, FileText, Activity, Image, CheckCircle, ArrowRight } from 'lucide-react';
import { Patient } from '../../types';
import { SYSTEM_MODULES } from '../../data/mockData';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  patients: Patient[];
  onSelectPatient: (patientId: string) => void;
  onNavigateModule: (moduleId: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  patients,
  onSelectPatient,
  onNavigateModule,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Keyboard shortcut listener (Cmd+K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Trigger open in parent
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredPatients = patients.filter(p =>
    p.fullName.toLowerCase().includes(query.toLowerCase()) ||
    p.fileNumber.toLowerCase().includes(query.toLowerCase()) ||
    p.phone.includes(query) ||
    p.district.toLowerCase().includes(query.toLowerCase())
  );

  const filteredModules = SYSTEM_MODULES.filter(m =>
    m.name.toLowerCase().includes(query.toLowerCase()) ||
    m.desc.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        onClick={e => e.stopPropagation()}
        className="w-full max-w-2xl bg-white rounded-[24px] shadow-2xl border border-[#E6EAEC] overflow-hidden flex flex-col max-h-[80vh]"
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#F0F3F5]">
          <Search className="w-5 h-5 text-[#22A6C0] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search patients, file numbers, clinical modules, or actions..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="flex-1 text-sm bg-transparent border-none outline-none text-[#0F1A1F] placeholder:text-[#8F9AA0]"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#8F9AA0] hover:text-[#0F1A1F] hover:bg-[#F5F7F8]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
          {/* Quick Modules */}
          <div>
            <div className="px-2 pb-2 text-[10px] font-bold uppercase tracking-wider text-[#8F9AA0]">
              Clinical Modules ({filteredModules.length})
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {filteredModules.slice(0, 6).map(mod => (
                <button
                  key={mod.id}
                  onClick={() => {
                    onNavigateModule(mod.id);
                    onClose();
                  }}
                  className="flex items-center justify-between p-2 rounded-xl text-left hover:bg-[#F5F7F8] group transition-colors"
                >
                  <div className="min-w-0">
                    <p className="font-semibold text-[#0F1A1F] group-hover:text-[#22A6C0] transition-colors">{mod.name}</p>
                    <p className="text-[11px] text-[#8F9AA0] truncate">{mod.desc}</p>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[#CBD5E1] group-hover:text-[#22A6C0] shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>

          {/* Patients Search */}
          <div>
            <div className="px-2 pb-2 text-[10px] font-bold uppercase tracking-wider text-[#8F9AA0]">
              Patients Directory ({filteredPatients.length})
            </div>
            {filteredPatients.length === 0 ? (
              <p className="p-3 text-center text-[#8F9AA0] text-xs">No matching patient records found.</p>
            ) : (
              <div className="space-y-1">
                {filteredPatients.map(patient => (
                  <button
                    key={patient.id}
                    onClick={() => {
                      onSelectPatient(patient.id);
                      onNavigateModule('patients');
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#E3F4F8]/60 text-left transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#E3F4F8] text-[#22A6C0] flex items-center justify-center font-bold">
                        {patient.fullName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-[#0F1A1F] group-hover:text-[#22A6C0]">
                          {patient.fullName}
                          <span className="font-mono text-[#8F9AA0] font-normal text-[11px] ml-2">
                            {patient.fileNumber}
                          </span>
                        </p>
                        <p className="text-[11px] text-[#8F9AA0]">
                          {patient.district}, {patient.sector} · {patient.phone} · Age {patient.age}
                        </p>
                      </div>
                    </div>
                    <span className="text-[11px] font-medium text-[#22A6C0] bg-white border border-[#22A6C0]/30 px-2.5 py-0.5 rounded-full">
                      View Profile
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer shortcuts */}
        <div className="px-5 py-3 bg-[#F5F7F8] border-t border-[#F0F3F5] text-[11px] text-[#8F9AA0] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span>Press <kbd className="bg-white px-1.5 py-0.5 rounded border border-[#CBD5E1] text-[#0F1A1F]">ESC</kbd> to exit</span>
            <span>·</span>
            <span>ORI Dental Clinic, Masaka, Kigali</span>
          </div>
          <span className="text-[#22A6C0] font-medium">Quick Clinical Access</span>
        </div>
      </div>
    </div>
  );
};
