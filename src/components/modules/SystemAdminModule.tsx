import React, { useState } from 'react';
import {
  Sliders,
  Shield,
  Database,
  Cpu,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Server,
  Lock,
  Globe,
  Settings,
  X,
  FileCheck,
  Stethoscope
} from 'lucide-react';

interface SystemAdminModuleProps {
  showToast: (title: string, message?: string, type?: 'success' | 'warning' | 'info' | 'error') => void;
}

export const SystemAdminModule: React.FC<SystemAdminModuleProps> = ({ showToast }) => {
  const [activeTab, setActiveTab] = useState<'Health' | 'Clinic' | 'AI Config' | 'Security' | 'Backup' | 'Integrations'>('Health');
  const [isBackupModalOpen, setIsBackupModalOpen] = useState(false);
  const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false);

  // AI Configuration state
  const [cariesThreshold, setCariesThreshold] = useState<number>(75);
  const [boneLossThreshold, setBoneLossThreshold] = useState<number>(80);
  const [modelEngine, setModelEngine] = useState('ORI Symptom Support 2.4');
  const [activeRegion, setActiveRegion] = useState('Kigali Masaka Primary Node');

  // Clinic Settings state
  const [clinicName, setClinicName] = useState('ORI Dental Clinic');
  const [clinicAddress, setClinicAddress] = useState('Kicukiro District, Masaka Sector, Kigali, Rwanda');
  const [clinicPhone, setClinicPhone] = useState('+250 788 123 456');
  const [currency, setCurrency] = useState('RWF (Rwandan Franc)');

  const handleSaveClinicSettings = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Clinic Config Saved', 'Updated practice metadata across all report headers.', 'success');
  };

  const handleSaveAIConfig = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('AI Thresholds Updated', `Caries: ${cariesThreshold}%, Bone Loss: ${boneLossThreshold}%.`, 'success');
  };

  const handlePerformBackup = () => {
    setIsBackupModalOpen(false);
    showToast('Encrypted Snapshot Created', 'Backup stored securely in encrypted cloud volume (428 MB).', 'success');
  };

  const handlePerformRestore = () => {
    setIsRestoreModalOpen(false);
    showToast('Database Restored', 'Verified state snapshot from Oct 05 restored successfully.', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-[24px] border border-[#E6EAEC] shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-[#0F1A1F]">System Administration &amp; Telemetry</h2>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold font-mono bg-emerald-100 text-[#1F9D74]">
              Healthy (99.98% Uptime)
            </span>
          </div>
          <p className="text-xs text-[#8F9AA0] mt-0.5">
            ORI Dental Clinic infrastructure, AI inference hyperparameters, and backup governance
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsBackupModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#22A6C0] text-white text-xs font-semibold hover:bg-[#1B899F] transition-colors shadow-xs"
          >
            <Database className="w-3.5 h-3.5" />
            <span>Create Encrypted Backup</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-white p-2 rounded-2xl border border-[#E6EAEC] overflow-x-auto no-scrollbar text-xs">
        {(['Health', 'Clinic', 'AI Config', 'Security', 'Backup', 'Integrations'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-colors ${
              activeTab === tab
                ? 'bg-[#E3F4F8] text-[#22A6C0] font-semibold shadow-2xs'
                : 'text-[#8F9AA0] hover:text-[#0F1A1F]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab 1: System Health */}
      {activeTab === 'Health' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-[24px] p-5 border border-[#E6EAEC] shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8F9AA0]">AI Inference Node</span>
              <p className="text-xl font-bold text-[#0F1A1F] mt-1">Operational</p>
              <p className="text-[11px] text-[#1F9D74] mt-1">● Latency: 142ms avg</p>
            </div>
            <div className="bg-white rounded-[24px] p-5 border border-[#E6EAEC] shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8F9AA0]">DICOM Storage Bucket</span>
              <p className="text-xl font-bold text-[#0F1A1F] mt-1">Encrypted</p>
              <p className="text-[11px] text-[#8F9AA0] mt-1">42.8 GB / 500 GB</p>
            </div>
            <div className="bg-white rounded-[24px] p-5 border border-[#E6EAEC] shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8F9AA0]">Database Pool</span>
              <p className="text-xl font-bold text-[#0F1A1F] mt-1">Active (12 conns)</p>
              <p className="text-[11px] text-[#1F9D74] mt-1">● PostgreSQL dev instance</p>
            </div>
            <div className="bg-white rounded-[24px] p-5 border border-[#E6EAEC] shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8F9AA0]">Security Policy</span>
              <p className="text-xl font-bold text-[#0F1A1F] mt-1">HIPAA Compliant</p>
              <p className="text-[11px] text-[#1F9D74] mt-1">● Law Nº 058/2021 active</p>
            </div>
          </div>

          <div className="bg-white rounded-[24px] p-6 border border-[#E6EAEC] shadow-sm space-y-4">
            <h3 className="font-bold text-base text-[#0F1A1F]">Microservice Architecture Status</h3>
            <div className="space-y-3 text-xs">
              {[
                { name: 'Radiograph Panoramic Segmentation Service', status: 'Healthy', load: '14%', engine: 'DeepVision v2.4' },
                { name: 'Bayesian Clinical Symptom Correlator', status: 'Healthy', load: '6%', engine: 'Bayes-Net 2.4' },
                { name: 'Rwanda Medical Council Digital Signature Signer', status: 'Healthy', load: '1%', engine: 'RSA-4096 / SHA-256' },
                { name: 'Automated Nightly Backup Daemon', status: 'Healthy', load: '0%', engine: 'Cron daily 02:00' },
              ].map((svc, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-[#F5F7F8] border border-[#E6EAEC] flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-[#0F1A1F]">{svc.name}</p>
                    <p className="text-[11px] text-[#8F9AA0] font-mono">{svc.engine}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[#8F9AA0]">Load: {svc.load}</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-[#1F9D74]">
                      {svc.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Clinic Settings */}
      {activeTab === 'Clinic' && (
        <div className="bg-white rounded-[24px] p-6 border border-[#E6EAEC] shadow-sm max-w-2xl">
          <h3 className="font-bold text-base text-[#0F1A1F] mb-4">ORI Dental Clinic Configuration</h3>
          <form onSubmit={handleSaveClinicSettings} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-[#0F1A1F] mb-1">Practice Legal Name</label>
              <input
                type="text"
                value={clinicName}
                onChange={e => setClinicName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F5F7F8] rounded-full border border-[#E6EAEC] outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#0F1A1F] mb-1">Clinic Physical Location (Rwanda)</label>
              <input
                type="text"
                value={clinicAddress}
                onChange={e => setClinicAddress(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F5F7F8] rounded-full border border-[#E6EAEC] outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#0F1A1F] mb-1">Direct Clinical Contact Phone</label>
              <input
                type="text"
                value={clinicPhone}
                onChange={e => setClinicPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F5F7F8] rounded-full border border-[#E6EAEC] outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#0F1A1F] mb-1">Billing Currency</label>
              <input
                type="text"
                disabled
                value={currency}
                className="w-full px-3.5 py-2.5 bg-[#F5F7F8] rounded-full border border-[#E6EAEC] text-[#8F9AA0]"
              />
            </div>
            <div className="pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-[#22A6C0] text-white font-semibold hover:bg-[#1B899F]"
              >
                Save Practice Metadata
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab 3: AI Config */}
      {activeTab === 'AI Config' && (
        <div className="bg-white rounded-[24px] p-6 border border-[#E6EAEC] shadow-sm max-w-2xl space-y-6 text-xs">
          <div>
            <h3 className="font-bold text-base text-[#0F1A1F]">AI Model Hyperparameters &amp; Thresholds</h3>
            <p className="text-[#8F9AA0] mt-0.5">Control sensitivity of automated bounding boxes and symptom alerts</p>
          </div>

          <form onSubmit={handleSaveAIConfig} className="space-y-5">
            <div>
              <div className="flex justify-between mb-1">
                <label className="font-semibold text-[#0F1A1F]">
                  Caries Anomaly Detection Threshold ({cariesThreshold}%)
                </label>
                <span className="font-mono text-[#22A6C0] font-bold">{cariesThreshold}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="95"
                value={cariesThreshold}
                onChange={e => setCariesThreshold(Number(e.target.value))}
                className="w-full accent-[#22A6C0]"
              />
              <span className="text-[10px] text-[#8F9AA0]">Lower threshold increases sensitivity; higher threshold reduces false positives.</span>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <label className="font-semibold text-[#0F1A1F]">
                  Periodontal Crestal Bone Loss Threshold ({boneLossThreshold}%)
                </label>
                <span className="font-mono text-[#22A6C0] font-bold">{boneLossThreshold}%</span>
              </div>
              <input
                type="range"
                min="60"
                max="95"
                value={boneLossThreshold}
                onChange={e => setBoneLossThreshold(Number(e.target.value))}
                className="w-full accent-[#22A6C0]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#0F1A1F] mb-1">Active AI Model Version</label>
              <select
                value={modelEngine}
                onChange={e => setModelEngine(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F5F7F8] rounded-full border border-[#E6EAEC] outline-none"
              >
                <option value="ORI Symptom Support 2.4">ORI Symptom Support 2.4 (Current Production)</option>
                <option value="ORI Symptom Support 2.5-RC">ORI Symptom Support 2.5-RC (Evaluation Canary)</option>
              </select>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-[#22A6C0] text-white font-semibold hover:bg-[#1B899F]"
              >
                Save Hyperparameters
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab 4: Security Policy */}
      {activeTab === 'Security' && (
        <div className="bg-white rounded-[24px] p-6 border border-[#E6EAEC] shadow-sm space-y-4 text-xs">
          <h3 className="font-bold text-base text-[#0F1A1F]">Clinical Data Security &amp; Encryption</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-[#F5F7F8] border border-[#E6EAEC] space-y-1">
              <p className="font-bold text-[#0F1A1F]">Data at Rest</p>
              <p className="text-[#8F9AA0]">AES-256 GCM encryption on all radiographic and diagnostic records.</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#F5F7F8] border border-[#E6EAEC] space-y-1">
              <p className="font-bold text-[#0F1A1F]">Data in Transit</p>
              <p className="text-[#8F9AA0]">TLS 1.3 forced across all chairside dental tablet connections.</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#F5F7F8] border border-[#E6EAEC] space-y-1">
              <p className="font-bold text-[#0F1A1F]">Two-Factor Authentication (2FA)</p>
              <p className="text-[#1F9D74] font-medium">Enforced for all Dental Specialist digital signatures.</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#F5F7F8] border border-[#E6EAEC] space-y-1">
              <p className="font-bold text-[#0F1A1F]">Session Timeout</p>
              <p className="text-[#8F9AA0]">Automatic lock after 15 minutes of chairside inactivity.</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Backup & Restore */}
      {activeTab === 'Backup' && (
        <div className="bg-white rounded-[24px] p-6 border border-[#E6EAEC] shadow-sm space-y-5 text-xs">
          <div>
            <h3 className="font-bold text-base text-[#0F1A1F]">Backup &amp; Disaster Recovery</h3>
            <p className="text-[#8F9AA0] mt-0.5">Secure clinical snapshots with single-click verified restoration</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#F5F7F8] border border-[#E6EAEC] flex items-center justify-between">
            <div>
              <p className="font-semibold text-[#0F1A1F]">Latest System Snapshot (428 MB)</p>
              <p className="text-[#8F9AA0] text-[11px]">Taken Oct 08, 2026 at 02:00 CAT · Verified Checksum SHA-256</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsRestoreModalOpen(true)}
                className="px-4 py-2 rounded-full bg-white hover:bg-slate-100 text-[#D9534F] border border-red-200 font-semibold"
              >
                Restore from Snapshot
              </button>
              <button
                onClick={() => setIsBackupModalOpen(true)}
                className="px-4 py-2 rounded-full bg-[#22A6C0] text-white font-semibold hover:bg-[#1B899F]"
              >
                Create New Backup Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 6: Integrations */}
      {activeTab === 'Integrations' && (
        <div className="bg-white rounded-[24px] p-6 border border-[#E6EAEC] shadow-sm space-y-4 text-xs">
          <h3 className="font-bold text-base text-[#0F1A1F]">External Health System Integrations</h3>
          <div className="space-y-3">
            {[
              { name: 'Rwanda MoH-HMIS (Health Management Information System)', status: 'Prototype / Not connected' },
              { name: 'Rwanda Medical and Dental Council (RMDC) License Registry', status: 'Prototype / Not connected' },
              { name: 'RSSB / Mutuelle de Santé Direct Claim Billing', status: 'Prototype / Not connected' },
              { name: 'Direct PACS / DICOM Orthopantomogram Server', status: 'Active (Local Sensor Direct)' },
            ].map((it, i) => (
              <div key={i} className="p-3.5 rounded-2xl bg-[#F5F7F8] border border-[#E6EAEC] flex items-center justify-between">
                <span className="font-semibold text-[#0F1A1F]">{it.name}</span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    it.status.includes('Active')
                      ? 'bg-emerald-100 text-[#1F9D74]'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {it.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Backup Confirmation Modal */}
      {isBackupModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-[28px] max-w-md w-full p-6 shadow-2xl border border-[#E6EAEC]">
            <h3 className="font-bold text-base text-[#0F1A1F] mb-2">Create Practice Snapshot</h3>
            <p className="text-xs text-[#8F9AA0] mb-4">
              This will create a compressed, encrypted snapshot of all 12 patient records, panoramic X-rays, and signed treatment plans.
            </p>
            <div className="flex justify-end gap-2">
              <button onClick={() => setIsBackupModalOpen(false)} className="px-4 py-2 text-xs text-[#8F9AA0]">
                Cancel
              </button>
              <button
                onClick={handlePerformBackup}
                className="px-5 py-2 bg-[#22A6C0] text-white rounded-full text-xs font-semibold"
              >
                Proceed with Backup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Restore Confirmation Modal */}
      {isRestoreModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-[28px] max-w-md w-full p-6 shadow-2xl border border-[#E6EAEC]">
            <h3 className="font-bold text-base text-[#0F1A1F] mb-2 text-[#D9534F]">Warning: Database Restoration</h3>
            <p className="text-xs text-[#8F9AA0] mb-4">
              Restoring from an earlier snapshot will overwrite current session edits. Are you sure you wish to continue?
            </p>
            <div className="flex justify-end gap-2">
              <button onClick={() => setIsRestoreModalOpen(false)} className="px-4 py-2 text-xs text-[#8F9AA0]">
                Cancel
              </button>
              <button
                onClick={handlePerformRestore}
                className="px-5 py-2 bg-[#D9534F] text-white rounded-full text-xs font-semibold"
              >
                Yes, Restore Database
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
