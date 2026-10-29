import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface FormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  submitLabel?: string;
  cancelLabel?: string;
  isSubmitting?: boolean;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export const FormDialog: React.FC<FormDialogProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  onSubmit,
  submitLabel = 'Save Record',
  cancelLabel = 'Cancel',
  isSubmitting = false,
  maxWidth = 'lg'
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

  const maxWidthClass = {
    sm: 'sm:max-w-sm',
    md: 'sm:max-w-md',
    lg: 'sm:max-w-lg',
    xl: 'sm:max-w-xl',
    '2xl': 'sm:max-w-2xl'
  }[maxWidth];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-end justify-center p-0 text-center sm:items-center sm:p-4">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Modal Window: fullscreen on mobile, centered rounded card on desktop */}
        <div
          className={`relative transform overflow-hidden bg-white text-left shadow-modal transition-all w-full h-full sm:h-auto sm:my-8 ${maxWidthClass} sm:rounded-modal border border-surface-border flex flex-col`}
        >
          {/* Header */}
          <div className="px-5 py-4 border-b border-surface-border flex items-center justify-between bg-surface-bg/50">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-ink-primary">
                {title}
              </h3>
              {description && (
                <p className="text-xs text-ink-secondary mt-0.5">
                  {description}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-ink-secondary hover:text-ink-primary hover:bg-surface-muted transition-colors focus:outline-none"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form and Content */}
          <form onSubmit={onSubmit} className="flex flex-col flex-1">
            <div className="p-5 sm:p-6 overflow-y-auto max-h-[calc(100vh-140px)] sm:max-h-[70vh] space-y-4">
              {children}
            </div>

            {/* Actions */}
            <div className="px-5 py-3.5 border-t border-surface-border bg-surface-bg/50 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs sm:text-sm font-medium text-ink-secondary hover:text-ink-primary hover:bg-surface-muted rounded-lg transition-colors border border-surface-border bg-white"
              >
                {cancelLabel}
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-brand-navy hover:bg-brand-navyDark rounded-lg transition-colors shadow-subtle disabled:opacity-50"
              >
                {isSubmitting ? 'Saving...' : submitLabel}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
