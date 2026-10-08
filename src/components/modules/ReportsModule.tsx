import React, { useState } from 'react';
import {
  BarChart3,
  Download,
  Printer,
  Calendar,
  FileSpreadsheet,
  FileText,
  Clock,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Share2
} from 'lucide-react';

interface ReportsModuleProps {
  showToast: (title: string, message?: string, type?: 'success' | 'warning' | 'info' | 'error') => void;
}

export const ReportsModule: React.FC<ReportsModuleProps> = ({ showToast }) => {
  const [reportType, setReportType] = useState<
    'Clinical Summary' | 'AI Concordance & Accuracy' | 'Procedures & Revenue (RWF)' | 'Epidemiology'
  >('Clinical Summary');
  const [dateRange, setDateRange] = useState<'Last 7 Days' | 'This Month' | 'Quarter 3' | 'Full Year 2026'>('This Month');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const reportTemplates = [
    {
      title: 'Clinical Summary Dossier',
      category: 'Clinical',
      desc: 'Monthly summary of triage complaints, confirmed pathologies, and digital signatures.',
      type: 'Clinical Summary' as const,
    },
    {
      title: 'AI Diagnostic Concordance Report',
      category: 'Quality & Audit',
      desc: 'Comparative analysis of AI predictions versus dentist final clinical decisions.',
      type: 'AI Concordance & Accuracy' as const,
    },
    {
      title: 'Procedural Volume & Cost Projections',
      category: 'Financial',
      desc: 'Completed and scheduled procedures calculated in Rwandan Francs (RWF).',
      type: 'Procedures & Revenue (RWF)' as const,
    },
    {
      title: 'Kicukiro District Dental Epidemiology',
      category: 'Public Health',
      desc: 'Prevalence rates for dental caries, periodontitis, and impactions in Masaka.',
      type: 'Epidemiology' as const,
    },
  ];

  const handleExport = (format: 'PDF' | 'Excel' | 'CSV') => {
    showToast(
      `Export Generated (${format})`,
      `${reportType} report formatted for Rwanda Ministry of Health & clinic records.`,
      'success'
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-[24px] border border-[#E6EAEC] shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-[#0F1A1F]">Clinical &amp; System Reports</h2>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold font-mono bg-[#E3F4F8] text-[#22A6C0]">
              Analytics &amp; Compliance
            </span>
          </div>
          <p className="text-xs text-[#8F9AA0] mt-0.5">
            Export official summaries for ORI Dental Clinic administration and regulatory bodies
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={dateRange}
            onChange={e => setDateRange(e.target.value as any)}
            className="px-3.5 py-2 bg-[#F5F7F8] rounded-full text-xs font-semibold text-[#0F1A1F] border border-[#E6EAEC] outline-none"
          >
            <option value="Last 7 Days">Last 7 Days</option>
            <option value="This Month">This Month (October 2026)</option>
            <option value="Quarter 3">Quarter 3 (Jul - Sep)</option>
            <option value="Full Year 2026">Full Year 2026</option>
          </select>

          <button
            onClick={() => handleExport('PDF')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#22A6C0] text-white text-xs font-semibold hover:bg-[#1B899F] transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export PDF</span>
          </button>

          <button
            onClick={() => handleExport('CSV')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#F5F7F8] hover:bg-[#EAEFF2] text-xs font-semibold text-[#0F1A1F] border border-[#E6EAEC] transition-colors"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-[#22A6C0]" />
            <span>CSV / Excel</span>
          </button>
        </div>
      </div>

      {/* Template Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {reportTemplates.map((tmpl, idx) => (
          <div
            key={idx}
            onClick={() => {
              setReportType(tmpl.type);
              showToast('Report Selected', `${tmpl.title} loaded into preview.`, 'info');
            }}
            className={`p-5 rounded-[22px] border cursor-pointer transition-all flex flex-col justify-between ${
              reportType === tmpl.type
                ? 'bg-[#E3F4F8] border-[#22A6C0] shadow-sm'
                : 'bg-white hover:bg-[#F5F7F8] border-[#E6EAEC]'
            }`}
          >
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8F9AA0] block mb-2">
                {tmpl.category}
              </span>
              <h3 className="font-bold text-sm text-[#0F1A1F] mb-1">{tmpl.title}</h3>
              <p className="text-xs text-[#8F9AA0] leading-relaxed">{tmpl.desc}</p>
            </div>
            <span className="mt-4 text-xs font-semibold text-[#22A6C0] inline-flex items-center gap-1">
              Select Template →
            </span>
          </div>
        ))}
      </div>

      {/* Live Report Preview Canvas */}
      <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-[#E6EAEC] shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#F0F3F5]">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#22A6C0] block mb-1">
              Active Report Preview · {dateRange}
            </span>
            <h3 className="text-2xl font-bold text-[#0F1A1F]">{reportType}</h3>
            <p className="text-xs text-[#8F9AA0] mt-0.5">
              ORI Dental Clinic, Kicukiro, Masaka, Kigali · Generated Oct 8, 2026
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => showToast('Print Job Sent', 'Document sent to clinic network printer.', 'success')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#F5F7F8] hover:bg-[#EAEFF2] text-xs font-semibold text-[#0F1A1F] border border-[#E6EAEC]"
            >
              <Printer className="w-3.5 h-3.5 text-[#22A6C0]" />
              <span>Print</span>
            </button>
            <button
              onClick={() => showToast('Schedule Saved', 'Automated Monday 8:00 AM dispatch enabled.', 'success')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#F5F7F8] hover:bg-[#EAEFF2] text-xs font-semibold text-[#0F1A1F] border border-[#E6EAEC]"
            >
              <Clock className="w-3.5 h-3.5 text-[#8F9AA0]" />
              <span>Schedule Email</span>
            </button>
          </div>
        </div>

        {/* Dynamic content depending on reportType */}
        {reportType === 'Clinical Summary' && (
          <div className="space-y-6 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-[#F5F7F8] border border-[#E6EAEC]">
                <p className="text-[#8F9AA0]">Total Patient Consultations</p>
                <p className="text-2xl font-bold text-[#0F1A1F] mt-1">42 Cases</p>
                <span className="text-[11px] text-[#1F9D74]">100% Doctor Confirmed</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#F5F7F8] border border-[#E6EAEC]">
                <p className="text-[#8F9AA0]">Most Prevalent Pathology</p>
                <p className="text-2xl font-bold text-[#0F1A1F] mt-1">Deep Caries</p>
                <span className="text-[11px] text-[#8F9AA0]">68% Molar Quadrants</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#F5F7F8] border border-[#E6EAEC]">
                <p className="text-[#8F9AA0]">Mean Review Latency</p>
                <p className="text-2xl font-bold text-[#0F1A1F] mt-1">7.4 min</p>
                <span className="text-[11px] text-[#22A6C0]">Efficiency Gain: -35%</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#E6EAEC]">
              <h4 className="font-bold text-sm text-[#0F1A1F] mb-3">Consultation Breakdown by Diagnostic Category</h4>
              <div className="space-y-2.5">
                {[
                  { name: 'Endodontics & Pulpitis', pct: 45, count: 19 },
                  { name: 'Periodontal Scaling & Therapy', pct: 28, count: 12 },
                  { name: 'Oral Surgery / Disimpactions', pct: 17, count: 7 },
                  { name: 'Restorative & Aesthetic Fillings', pct: 10, count: 4 },
                ].map((item, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>{item.name} ({item.count} cases)</span>
                      <span className="font-mono font-bold text-[#22A6C0]">{item.pct}%</span>
                    </div>
                    <div className="w-full bg-[#F5F7F8] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#22A6C0] h-full rounded-full" style={{ width: `${item.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {reportType === 'AI Concordance & Accuracy' && (
          <div className="space-y-6 text-xs">
            <div className="p-5 rounded-2xl bg-[#E3F4F8]/60 border border-[#22A6C0]/20 space-y-2">
              <h4 className="font-bold text-sm text-[#0F1A1F]">AI Model Validation Benchmark (ORI Symptom Support 2.4)</h4>
              <p className="text-[#8F9AA0] leading-relaxed">
                Evaluated against gold standard panel of licensed Rwandan dental surgeons across 1,200 labeled radiographs.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-[#22A6C0]/20 font-mono">
                <div>
                  <span className="text-[#8F9AA0] block text-[10px]">Precision:</span>
                  <span className="text-sm font-bold text-[#0F1A1F]">94.2%</span>
                </div>
                <div>
                  <span className="text-[#8F9AA0] block text-[10px]">Recall:</span>
                  <span className="text-sm font-bold text-[#0F1A1F]">96.8%</span>
                </div>
                <div>
                  <span className="text-[#8F9AA0] block text-[10px]">F1 Score:</span>
                  <span className="text-sm font-bold text-[#0F1A1F]">0.955</span>
                </div>
                <div>
                  <span className="text-[#8F9AA0] block text-[10px]">Clinician Override Rate:</span>
                  <span className="text-sm font-bold text-[#22A6C0]">4.6%</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {reportType === 'Procedures & Revenue (RWF)' && (
          <div className="space-y-6 text-xs">
            <div className="p-5 rounded-2xl bg-[#F5F7F8] border border-[#E6EAEC] flex items-center justify-between">
              <div>
                <p className="text-[#8F9AA0]">Total Projected Procedural Billings</p>
                <p className="text-3xl font-extrabold font-mono text-[#166E7F] mt-1">4,820,000 RWF</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-[#1F9D74]">
                18 Completed Plans
              </span>
            </div>
          </div>
        )}

        {reportType === 'Epidemiology' && (
          <div className="space-y-6 text-xs">
            <div className="p-5 rounded-2xl bg-[#F5F7F8] border border-[#E6EAEC] space-y-2">
              <h4 className="font-bold text-sm text-[#0F1A1F]">Kicukiro District Oral Health Prevalence</h4>
              <p className="text-[#8F9AA0]">
                Masaka and Niboye catchment area data indicated high incidence of untreated adult coronal caries (44%) and mild localized periodontitis (31%).
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
