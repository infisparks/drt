import React from 'react';
import { Check, Clock, AlertCircle } from 'lucide-react';

export interface TimelineEvent {
  step: string;
  actor: string;
  timestamp: string;
  status: 'completed' | 'current' | 'pending' | 'rejected';
  comments?: string;
}

interface ApprovalTimelineProps {
  events: TimelineEvent[];
  className?: string;
}

export const ApprovalTimeline: React.FC<ApprovalTimelineProps> = ({ events, className = '' }) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {events.map((evt, idx) => {
        const isLast = idx === events.length - 1;

        const iconConfig = {
          completed: {
            icon: <Check className="w-3.5 h-3.5 text-white" />,
            circleBg: 'bg-emerald-600',
            lineColor: 'border-emerald-500'
          },
          current: {
            icon: <Clock className="w-3.5 h-3.5 text-white" />,
            circleBg: 'bg-brand-blue animate-pulse',
            lineColor: 'border-surface-border'
          },
          pending: {
            icon: <span className="w-2 h-2 rounded-full bg-slate-300" />,
            circleBg: 'bg-slate-100 border border-slate-300',
            lineColor: 'border-surface-border'
          },
          rejected: {
            icon: <AlertCircle className="w-3.5 h-3.5 text-white" />,
            circleBg: 'bg-rose-600',
            lineColor: 'border-rose-400'
          }
        }[evt.status];

        return (
          <div key={idx} className="relative flex items-start gap-3">
            {/* Vertical connector line */}
            {!isLast && (
              <span
                className="absolute left-3.5 top-6 -bottom-4 w-0.5 bg-surface-border"
                aria-hidden="true"
              />
            )}

            {/* Circle Node */}
            <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${iconConfig.circleBg}`}>
              {iconConfig.icon}
            </div>

            {/* Event Content */}
            <div className="flex-1 min-w-0 pt-0.5">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-bold text-ink-primary">
                  {evt.step}
                </p>
                <span className="text-[10px] text-ink-secondary tabular-nums">
                  {evt.timestamp}
                </span>
              </div>
              <p className="text-xs text-ink-secondary mt-0.5">
                By <span className="font-medium text-ink-primary">{evt.actor}</span>
              </p>
              {evt.comments && (
                <div className="mt-1.5 p-2 bg-surface-bg rounded border border-surface-border/80 text-[11px] text-ink-primary">
                  "{evt.comments}"
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
