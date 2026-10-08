import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'warning' | 'info' | 'error';
  title: string;
  message?: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => (
        <ToastItem key={toast.id} toast={toast} onDismiss={() => onDismiss(toast.id)} />
      ))}
    </div>
  );
};

const ToastItem: React.FC<{ toast: ToastMessage; onDismiss: () => void }> = ({ toast, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 4000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  const icons = {
    success: <CheckCircle2 className="w-4 h-4 text-[#1F9D74]" />,
    warning: <AlertCircle className="w-4 h-4 text-[#E2A23B]" />,
    info: <Info className="w-4 h-4 text-[#22A6C0]" />,
    error: <AlertCircle className="w-4 h-4 text-[#D9534F]" />,
  };

  const borderColors = {
    success: 'border-[#1F9D74]/30',
    warning: 'border-[#E2A23B]/30',
    info: 'border-[#22A6C0]/30',
    error: 'border-[#D9534F]/30',
  };

  return (
    <div
      className={`pointer-events-auto bg-white rounded-2xl shadow-xl border ${borderColors[toast.type]} p-3.5 flex items-start gap-3 animate-in slide-in-from-bottom-3 duration-200`}
    >
      <div className="shrink-0 mt-0.5">{icons[toast.type]}</div>
      <div className="flex-1 min-w-0 text-xs">
        <p className="font-semibold text-[#0F1A1F]">{toast.title}</p>
        {toast.message && <p className="text-[#8F9AA0] mt-0.5 leading-relaxed">{toast.message}</p>}
      </div>
      <button
        onClick={onDismiss}
        className="p-1 rounded-md text-[#8F9AA0] hover:text-[#0F1A1F] hover:bg-[#F5F7F8] shrink-0"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
