import React from 'react';
import { Breadcrumbs, BreadcrumbItem } from './Breadcrumbs';

export interface PageHeaderAction {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
}

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  badge?: React.ReactNode;
  primaryAction?: PageHeaderAction;
  secondaryActions?: PageHeaderAction[];
  children?: React.ReactNode;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  breadcrumbs,
  badge,
  primaryAction,
  secondaryActions = [],
  children,
  className = ''
}) => {
  return (
    <div className={`mb-6 pb-4 border-b border-surface-border/80 ${className}`}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <div className="mb-2">
          <Breadcrumbs items={breadcrumbs} />
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-bold text-ink-primary tracking-tight">
              {title}
            </h1>
            {badge}
          </div>
          {description && (
            <p className="mt-1 text-sm text-ink-secondary">
              {description}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2.5 flex-wrap flex-shrink-0">
          {secondaryActions.map((action, idx) => (
            <button
              key={idx}
              onClick={action.onClick}
              className="inline-flex items-center justify-center px-3.5 py-2 text-xs sm:text-sm font-medium text-ink-primary bg-white border border-surface-border rounded-lg hover:bg-surface-cardHover hover:border-slate-300 transition-colors shadow-subtle focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
            >
              {action.icon && <span className="mr-1.5">{action.icon}</span>}
              {action.label}
            </button>
          ))}

          {primaryAction && (
            <button
              onClick={primaryAction.onClick}
              className={`inline-flex items-center justify-center px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors shadow-subtle focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                primaryAction.variant === 'danger'
                  ? 'bg-rose-600 hover:bg-rose-700 text-white focus:ring-rose-500'
                  : 'bg-brand-navy hover:bg-brand-navyDark text-white focus:ring-brand-navy'
              }`}
            >
              {primaryAction.icon && <span className="mr-1.5">{primaryAction.icon}</span>}
              {primaryAction.label}
            </button>
          )}

          {children}
        </div>
      </div>
    </div>
  );
};
