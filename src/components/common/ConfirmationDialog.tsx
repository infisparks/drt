import React, { useEffect } from 'react';
import { AlertCircle, CheckCircle, Info, HelpCircle } from 'lucide-react';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'success' | 'warning' | 'info';
  isProcessing?: boolean;
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'warning',
  isProcessing = false
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const iconMap = {
    danger: <AlertCircle className="w-6 h-6 text-rose-600" />,
    warning: <HelpCircle className="w-6 h-6 text-amber-600" />,
    success: <CheckCircle className="w-6 h-6 text-emerald-600" />,
    info: <Info className="w-6 h-6 text-brand-blue" />
  };

  const confirmBtnStyles = {
    danger: 'bg-rose-600 hover:bg-rose-700 text-white',
    warning: 'bg-amber-600 hover:bg-amber-700 text-white',
    success: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    info: 'bg-brand-navy hover:bg-brand-navyDark text-white'
  }[variant];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] transition-opacity"
          onClick={onClose}
        />

        <div className="relative transform overflow-hidden rounded-xl bg-white p-6 text-left shadow-modal transition-all w-full max-w-md border border-surface-border">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-full bg-surface-muted flex-shrink-0">
              {iconMap[variant]}
            </div>
            <div>
              <h3 className="text-base font-bold text-ink-primary">
                {title}
              </h3>
              <p className="mt-1.5 text-sm text-ink-secondary leading-relaxed">
                {message}
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              disabled={isProcessing}
              className="px-4 py-2 text-xs sm:text-sm font-medium text-ink-secondary hover:text-ink-primary bg-white border border-surface-border rounded-lg hover:bg-surface-muted transition-colors"
            >
              {cancelLabel}
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={isProcessing}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors shadow-subtle ${confirmBtnStyles} disabled:opacity-50`}
            >
              {isProcessing ? 'Processing...' : confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
