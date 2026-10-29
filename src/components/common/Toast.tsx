import React, { useEffect } from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message?: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
};

const ToastItem: React.FC<{ toast: ToastMessage; onDismiss: (id: string) => void }> = ({
  toast,
  onDismiss
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 4500);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const config = {
    success: {
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />,
      border: 'border-emerald-200',
      bg: 'bg-emerald-50/90'
    },
    warning: {
      icon: <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />,
      border: 'border-amber-200',
      bg: 'bg-amber-50/90'
    },
    error: {
      icon: <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />,
      border: 'border-rose-200',
      bg: 'bg-rose-50/90'
    },
    info: {
      icon: <Info className="w-5 h-5 text-brand-blue flex-shrink-0" />,
      border: 'border-blue-200',
      bg: 'bg-blue-50/90'
    }
  }[toast.type];

  return (
    <div
      className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border bg-white shadow-modal ${config.border} transition-all duration-200`}
    >
      {config.icon}
      <div className="flex-1 min-w-0">
        <p className="text-xs sm:text-sm font-semibold text-ink-primary">
          {toast.title}
        </p>
        {toast.message && (
          <p className="text-xs text-ink-secondary mt-0.5 leading-snug">
            {toast.message}
          </p>
        )}
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className="text-ink-secondary hover:text-ink-primary p-0.5 rounded transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
