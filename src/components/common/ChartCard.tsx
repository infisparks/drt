import React, { useState } from 'react';
import { MoreVertical, ExternalLink } from 'lucide-react';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  children: React.ReactNode;
  legend?: { label: string; color: string }[];
  className?: string;
}

export const ChartCard: React.FC<ChartCardProps> = ({
  title,
  subtitle,
  action,
  children,
  legend = [],
  className = ''
}) => {
  return (
    <div className={`bg-white border border-surface-border rounded-xl p-5 shadow-subtle flex flex-col ${className}`}>
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-4 pb-3 border-b border-surface-border/60">
        <div>
          <h3 className="text-base font-bold text-ink-primary">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-ink-secondary mt-0.5">
              {subtitle}
            </p>
          )}
        </div>

        {action && (
          <button
            onClick={action.onClick}
            className="inline-flex items-center text-xs font-semibold text-brand-blue hover:text-brand-navy transition-colors focus:outline-none"
          >
            {action.label}
            <ExternalLink className="w-3 h-3 ml-1" />
          </button>
        )}
      </div>

      {/* Chart Visual */}
      <div className="flex-1 min-h-[220px] flex items-center justify-center">
        {children}
      </div>

      {/* Legend */}
      {legend.length > 0 && (
        <div className="mt-4 pt-3 border-t border-surface-border/60 flex items-center justify-center gap-4 flex-wrap text-xs text-ink-secondary">
          {legend.map((item, idx) => (
            <div key={idx} className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* --- Academic Performance Chart (SVG Line Chart) --- */
export const AcademicPerformanceChart: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Term data across 5 terms
  const terms = [
    { term: 'PT-1', avg: 72.4, topClass: 'Class X (81%)' },
    { term: 'Term 1 Mid', avg: 76.8, topClass: 'Class XII (84%)' },
    { term: 'PT-2', avg: 81.2, topClass: 'Class IX (85%)' },
    { term: 'Pre-Board', avg: 84.5, topClass: 'Class X (88%)' },
    { term: 'Final Proj.', avg: 88.0, topClass: 'Class XII (91%)' },
  ];

  const width = 480;
  const height = 190;
  const padX = 45;
  const padY = 25;
  const chartW = width - padX * 2;
  const chartH = height - padY * 2;

  // Scale 60% to 100%
  const minVal = 65;
  const maxVal = 95;
  const getY = (val: number) => height - padY - ((val - minVal) / (maxVal - minVal)) * chartH;
  const getX = (idx: number) => padX + (idx / (terms.length - 1)) * chartW;

  const points = terms.map((t, i) => `${getX(i)},${getY(t.avg)}`).join(' ');

  return (
    <div className="w-full relative">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-44 overflow-visible">
        {/* Horizontal grid lines */}
        {[70, 80, 90].map((val) => {
          const y = getY(val);
          return (
            <g key={val}>
              <line
                x1={padX}
                y1={y}
                x2={width - padX}
                y2={y}
                stroke="#E7EAF0"
                strokeDasharray="4 4"
              />
              <text
                x={padX - 8}
                y={y + 3.5}
                textAnchor="end"
                className="text-[10px] fill-ink-secondary tabular-nums"
              >
                {val}%
              </text>
            </g>
          );
        })}

        {/* Gradient fill under line */}
        <defs>
          <linearGradient id="academicGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#356AE6" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#356AE6" stopOpacity="0.0" />
          </linearGradient>
        </defs>
        <polygon
          points={`${getX(0)},${height - padY} ${points} ${getX(terms.length - 1)},${height - padY}`}
          fill="url(#academicGrad)"
        />

        {/* Connecting Line */}
        <polyline
          fill="none"
          stroke="#173B70"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
        />

        {/* Points and Labels */}
        {terms.map((t, i) => {
          const x = getX(i);
          const y = getY(t.avg);
          const isHovered = hoveredIdx === i;

          return (
            <g key={t.term} className="cursor-pointer" onMouseEnter={() => setHoveredIdx(i)} onMouseLeave={() => setHoveredIdx(null)}>
              {/* Vertical line indicator on hover */}
              {isHovered && (
                <line
                  x1={x}
                  y1={padY}
                  x2={x}
                  y2={height - padY}
                  stroke="#356AE6"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                />
              )}

              <circle
                cx={x}
                cy={y}
                r={isHovered ? 6 : 4}
                className={`transition-all duration-150 ${
                  isHovered ? 'fill-brand-blue stroke-white stroke-2' : 'fill-brand-navy stroke-white stroke-2'
                }`}
              />

              {/* Term label */}
              <text
                x={x}
                y={height - padY + 16}
                textAnchor="middle"
                className="text-[10px] font-medium fill-ink-secondary"
              >
                {t.term}
              </text>

              {/* Tabular percentage badge */}
              <text
                x={x}
                y={y - 9}
                textAnchor="middle"
                className={`text-[11px] font-bold tabular-nums ${isHovered ? 'fill-brand-blue' : 'fill-brand-navy'}`}
              >
                {t.avg}%
              </text>
            </g>
          );
        })}
      </svg>

      {hoveredIdx !== null && (
        <div className="absolute top-2 right-4 bg-slate-900 text-white text-[11px] px-2.5 py-1.5 rounded shadow-modal pointer-events-none z-10">
          <span className="font-semibold">{terms[hoveredIdx].term}</span>: {terms[hoveredIdx].avg}% average
          <div className="text-slate-300 text-[10px]">Top: {terms[hoveredIdx].topClass}</div>
        </div>
      )}
    </div>
  );
};

/* --- Attendance Trends Chart (Stacked Day Bar Chart) --- */
export const AttendanceTrendsChart: React.FC = () => {
  const days = [
    { day: 'Mon', present: 95.2, absent: 3.6, leave: 1.2 },
    { day: 'Tue', present: 96.1, absent: 2.9, leave: 1.0 },
    { day: 'Wed', present: 94.8, absent: 3.8, leave: 1.4 },
    { day: 'Thu', present: 94.6, absent: 4.1, leave: 1.3 },
    { day: 'Fri', present: 93.9, absent: 4.8, leave: 1.3 },
    { day: 'Sat', present: 91.5, absent: 6.5, leave: 2.0 },
  ];

  return (
    <div className="w-full flex flex-col justify-center h-44 gap-2.5">
      {days.map((item) => (
        <div key={item.day} className="flex items-center gap-3 text-xs">
          <span className="w-8 font-medium text-ink-secondary text-right">
            {item.day}
          </span>
          <div className="flex-1 h-4 bg-surface-muted rounded-full overflow-hidden flex">
            <div
              style={{ width: `${item.present}%` }}
              className="bg-emerald-600 hover:bg-emerald-500 transition-colors"
              title={`Present: ${item.present}%`}
            />
            <div
              style={{ width: `${item.absent}%` }}
              className="bg-rose-500 hover:bg-rose-400 transition-colors"
              title={`Absent: ${item.absent}%`}
            />
            <div
              style={{ width: `${item.leave}%` }}
              className="bg-amber-400 hover:bg-amber-300 transition-colors"
              title={`Medical/Leave: ${item.leave}%`}
            />
          </div>
          <span className="w-12 text-right font-bold text-ink-primary tabular-nums">
            {item.present}%
          </span>
        </div>
      ))}
    </div>
  );
};

/* --- Fee Collection Chart (Collected vs Outstanding) --- */
export const FeeCollectionChart: React.FC = () => {
  const months = [
    { name: 'Apr', collected: 24.5, outstanding: 3.2 },
    { name: 'Jul', collected: 21.0, outstanding: 4.8 },
    { name: 'Oct', collected: 22.4, outstanding: 5.1 },
    { name: 'Jan (Proj)', collected: 14.5, outstanding: 5.5 },
  ];

  const maxVal = 28;

  return (
    <div className="w-full h-44 flex items-end justify-between gap-4 pt-6 pb-2 px-2">
      {months.map((m) => {
        const collH = (m.collected / maxVal) * 100;
        const outH = (m.outstanding / maxVal) * 100;

        return (
          <div key={m.name} className="flex-1 flex flex-col items-center h-full justify-end group">
            <div className="w-full flex items-end justify-center gap-1.5 h-32">
              {/* Collected Bar */}
              <div
                style={{ height: `${collH}%` }}
                className="w-5 bg-brand-navy group-hover:bg-brand-blue rounded-t transition-all relative flex justify-center"
              >
                <span className="opacity-0 group-hover:opacity-100 absolute -top-6 text-[10px] font-bold text-brand-navy tabular-nums bg-white px-1 py-0.5 rounded shadow-subtle border border-surface-border whitespace-nowrap z-10 transition-opacity">
                  ₹{m.collected}L
                </span>
              </div>

              {/* Outstanding Bar */}
              <div
                style={{ height: `${outH}%` }}
                className="w-5 bg-amber-400/80 group-hover:bg-amber-500 rounded-t transition-all relative flex justify-center"
              >
                <span className="opacity-0 group-hover:opacity-100 absolute -top-6 text-[10px] font-bold text-amber-700 tabular-nums bg-white px-1 py-0.5 rounded shadow-subtle border border-surface-border whitespace-nowrap z-10 transition-opacity">
                  ₹{m.outstanding}L
                </span>
              </div>
            </div>

            <span className="mt-2 text-[11px] font-medium text-ink-secondary truncate">
              {m.name}
            </span>
          </div>
        );
      })}
    </div>
  );
};

/* --- Compliance Overview Chart (4 Status Badges & Segments) --- */
export const ComplianceOverviewChart: React.FC = () => {
  const items = [
    { label: 'Completed & Certified', count: 38, pct: 79, color: '#059669', bg: 'bg-emerald-500' },
    { label: 'Pending Verification', count: 6, pct: 12, color: '#356AE6', bg: 'bg-brand-blue' },
    { label: 'Expiring Soon (<30d)', count: 3, pct: 6, color: '#D97706', bg: 'bg-amber-500' },
    { label: 'Overdue / Missing', count: 1, pct: 3, color: '#DC2626', bg: 'bg-rose-500' },
  ];

  return (
    <div className="w-full flex flex-col justify-center h-44 gap-4 px-1">
      {/* Segmented bar */}
      <div className="w-full h-5 bg-surface-muted rounded-full overflow-hidden flex shadow-inner">
        {items.map((item) => (
          <div
            key={item.label}
            style={{ width: `${item.pct}%` }}
            className={`${item.bg} hover:opacity-90 transition-opacity`}
            title={`${item.label}: ${item.count} items (${item.pct}%)`}
          />
        ))}
      </div>

      {/* Grid count cards */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        {items.map((item) => (
          <div
            key={item.label}
            className="p-2 rounded-lg bg-surface-bg border border-surface-border flex items-center justify-between"
          >
            <div className="flex items-center gap-1.5 min-w-0">
              <span className={`w-2 h-2 rounded-full flex-shrink-0 ${item.bg}`} />
              <span className="truncate text-ink-secondary text-[11px]">{item.label}</span>
            </div>
            <span className="font-bold text-ink-primary tabular-nums ml-2">
              {item.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
