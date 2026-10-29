import React from 'react';
import { LucideIcon, FileQuestion } from 'lucide-react';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = FileQuestion,
  title,
  description,
  actionLabel,
  onAction,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-white rounded-xl border border-surface-border ${className}`}>
      <div className="w-12 h-12 rounded-full bg-surface-muted flex items-center justify-center text-ink-secondary mb-3.5">
        <Icon className="w-6 h-6 text-ink-secondary" />
      </div>
      <h3 className="text-base font-semibold text-ink-primary mb-1">
        {title}
      </h3>
      <p className="text-sm text-ink-secondary max-w-sm mb-4">
        {description}
      </p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center px-3.5 py-2 text-xs sm:text-sm font-semibold text-white bg-brand-navy hover:bg-brand-navyDark rounded-lg transition-colors shadow-subtle"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};
