import React from 'react';
import { Search, X, Filter } from 'lucide-react';

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterConfig {
  key: string;
  label: string;
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
}

interface SearchFilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  searchPlaceholder?: string;
  filters?: FilterConfig[];
  onResetFilters?: () => void;
  actions?: React.ReactNode;
  resultCount?: number;
  className?: string;
}

export const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  searchQuery,
  onSearchChange,
  searchPlaceholder = 'Search records...',
  filters = [],
  onResetFilters,
  actions,
  resultCount,
  className = ''
}) => {
  const hasActiveFilters = searchQuery !== '' || filters.some(f => f.value !== '' && f.value !== 'all');

  return (
    <div className={`bg-white border border-surface-border rounded-xl p-3 sm:p-4 shadow-subtle ${className}`}>
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-ink-secondary/70 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full pl-9 pr-8 py-2 text-sm bg-surface-bg border border-surface-border rounded-lg text-ink-primary placeholder:text-ink-secondary/60 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-secondary hover:text-ink-primary p-0.5"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filters and Actions */}
        <div className="flex items-center gap-2 flex-wrap w-full md:w-auto">
          {filters.map((filter) => (
            <div key={filter.key} className="relative flex-1 min-w-[120px] sm:flex-initial sm:min-w-[140px]">
              <select
                value={filter.value}
                onChange={(e) => filter.onChange(e.target.value)}
                className="w-full appearance-none pl-3 pr-7 py-2 text-xs sm:text-sm bg-white border border-surface-border rounded-lg text-ink-primary font-medium focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all cursor-pointer truncate"
              >
                {filter.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <Filter className="w-3.5 h-3.5 text-ink-secondary absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          ))}

          {hasActiveFilters && onResetFilters && (
            <button
              onClick={onResetFilters}
              className="px-2.5 py-2 text-xs font-medium text-ink-secondary hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors border border-transparent hover:border-rose-200"
            >
              Reset
            </button>
          )}

          {actions}
        </div>
      </div>

      {typeof resultCount === 'number' && (
        <div className="mt-2.5 pt-2 border-t border-surface-border/60 flex items-center justify-between text-xs text-ink-secondary">
          <span>
            Showing <strong className="text-ink-primary">{resultCount}</strong> {resultCount === 1 ? 'record' : 'records'}
          </span>
          {hasActiveFilters && (
            <span className="text-brand-blue font-medium text-[11px]">
              Filtered results
            </span>
          )}
        </div>
      )}
    </div>
  );
};
