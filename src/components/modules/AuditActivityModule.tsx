import React, { useState } from 'react';
import {
  ShieldCheck,
  Search,
  Filter,
  Download,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Clock,
  User,
  FileCheck,
  Sparkles
} from 'lucide-react';
import { AuditLog } from '../../types';
import { INITIAL_AUDIT_LOGS } from '../../data/mockData';

interface AuditActivityModuleProps {
  logs?: AuditLog[];
  showToast: (title: string, message?: string, type?: 'success' | 'warning' | 'info' | 'error') => void;
}

export const AuditActivityModule: React.FC<AuditActivityModuleProps> = ({
  logs = INITIAL_AUDIT_LOGS,
  showToast,
}) => {
  const [activeTab, setActiveTab] = useState<'All' | 'Access' | 'AI events' | 'Professional reviews' | 'System'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLogs = logs.filter(l => {
    const matchesTab = activeTab === 'All' || l.category === activeTab;
    const matchesSearch =
      l.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.resource.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.details.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleExportAudit = () => {
    const header = 'Timestamp,Category,User,Role,Action,Resource,Status,Details\n';
    const rows = filteredLogs
      .map(
        l =>
          `"${l.timestamp}","${l.category}","${l.user}","${l.role}","${l.action}","${l.resource}","${l.status}","${l.details}"`
      )
      .join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ORI_Dental_Audit_Trail_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    showToast('Audit Log Exported', 'Full regulatory compliance audit trail exported.', 'success');
  };

  const handleGenerateComplianceReport = () => {
    showToast(
      'Compliance Dossier Ready',
      'HIPAA, GDPR & Rwanda Data Protection and Privacy Law (Law Nº 058/2021) audit package verified.',
      'success'
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-[24px] border border-[#E6EAEC] shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-[#0F1A1F]">Regulatory Audit &amp; Activity Log</h2>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold font-mono bg-emerald-100 text-[#1F9D74]">
              Immutable Trail
            </span>
          </div>
          <p className="text-xs text-[#8F9AA0] mt-0.5">
            Full event logging for Rwanda Medical Council clinical review compliance and data privacy
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleGenerateComplianceReport}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#F5F7F8] hover:bg-[#EAEFF2] text-xs font-semibold text-[#0F1A1F] border border-[#E6EAEC] transition-colors"
          >
            <FileCheck className="w-3.5 h-3.5 text-[#22A6C0]" />
            <span>Generate Compliance Brief</span>
          </button>

          <button
            onClick={handleExportAudit}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#22A6C0] hover:bg-[#1B899F] text-xs font-semibold text-white shadow-xs transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV Trail</span>
          </button>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-[24px] p-6 border border-[#E6EAEC] shadow-sm space-y-5">
        {/* Filter Tabs & Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#F0F3F5]">
          {/* Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar text-xs">
            {(['All', 'Access', 'AI events', 'Professional reviews', 'System'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-1.5 rounded-full font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab
                    ? 'bg-[#E3F4F8] text-[#22A6C0] font-semibold'
                    : 'text-[#8F9AA0] hover:text-[#0F1A1F]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 text-[#8F9AA0] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search logs by user, action, resource..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[#F5F7F8] rounded-full text-xs text-[#0F1A1F] border border-[#E6EAEC] outline-none"
            />
          </div>
        </div>

        {/* Audit Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E6EAEC] text-[#8F9AA0] uppercase tracking-wider text-[10px]">
                <th className="py-2.5 px-3">Timestamp</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">User &amp; Role</th>
                <th className="py-2.5 px-3">Action</th>
                <th className="py-2.5 px-3">Resource Target</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Cryptographic Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F3F5]">
              {filteredLogs.map(log => (
                <tr key={log.id} className="hover:bg-[#F5F7F8]">
                  <td className="py-3 px-3 font-mono text-[#8F9AA0] whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        log.category === 'AI events'
                          ? 'bg-cyan-100 text-[#22A6C0]'
                          : log.category === 'Professional reviews'
                          ? 'bg-emerald-100 text-[#1F9D74]'
                          : log.category === 'Access'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {log.category}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-medium text-[#0F1A1F]">
                    {log.user}
                    <span className="block text-[10px] text-[#8F9AA0] font-normal">{log.role}</span>
                  </td>
                  <td className="py-3 px-3 font-semibold text-[#0F1A1F]">{log.action}</td>
                  <td className="py-3 px-3 font-mono text-[#22A6C0]">{log.resource}</td>
                  <td className="py-3 px-3">
                    <span className="flex items-center gap-1 font-semibold text-[#1F9D74]">
                      <CheckCircle2 className="w-3.5 h-3.5" /> {log.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-[#8F9AA0] max-w-sm truncate font-mono text-[11px]">
                    {log.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
