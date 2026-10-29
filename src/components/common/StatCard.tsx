import React from 'react';
import { LucideIcon, ArrowUpRight, ArrowDownRight, Minus, ChevronRight } from 'lucide-react';

export interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  subtext?: string;
  trend?: {
    value: string;
    isPositive?: boolean;
    isNeutral?: boolean;
  };
  badgeText?: string;
  badgeVariant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  onClick?: () => void;
  clickableHint?: string;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon: Icon,
  subtext,
  trend,
  badgeText,
  badgeVariant = 'neutral',
  onClick,
  clickableHint,
  className = ''
}) => {
  const isClickable = Boolean(onClick);

  return (
    <div
      onClick={onClick}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={(e) => {
        if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick?.();
        }
      }}
      className={`group relative bg-white border border-surface-border rounded-xl p-5 shadow-subtle transition-all duration-150 ${
        isClickable 
          ? 'cursor-pointer hover:border-brand-blue/40 hover:shadow-card hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-brand-blue/20' 
          : ''
      } ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-ink-secondary tracking-wide uppercase truncate">
            {label}
          </p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-ink-primary tabular-nums tracking-tight">
              {value}
            </span>
            {trend && (
              <span
                className={`inline-flex items-center text-xs font-semibold tabular-nums ${
                  trend.isNeutral
                    ? 'text-ink-secondary'
                    : trend.isPositive
                    ? 'text-emerald-600'
                    : 'text-rose-600'
                }`}
              >
                {trend.isNeutral ? (
                  <Minus className="w-3 h-3 mr-0.5" />
                ) : trend.isPositive ? (
                  <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
                ) : (
                  <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
                )}
                {trend.value}
              </span>
            )}
          </div>
        </div>

        <div className="w-10 h-10 rounded-lg bg-surface-muted flex items-center justify-center text-brand-navy flex-shrink-0 group-hover:bg-brand-blue/10 group-hover:text-brand-blue transition-colors">
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-ink-secondary pt-2 border-t border-surface-border/60">
        <span className="truncate">
          {subtext || (isClickable ? (clickableHint || 'Click to view details') : '')}
        </span>
        {isClickable && (
          <span className="inline-flex items-center text-brand-blue font-medium group-hover:translate-x-0.5 transition-transform flex-shrink-0 ml-2">
            View <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
          </span>
        )}
      </div>
    </div>
  );
};
