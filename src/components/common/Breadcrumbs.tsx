import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
  active?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onHomeClick?: () => void;
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  onHomeClick,
  className = ''
}) => {
  return (
    <nav aria-label="Breadcrumb" className={`flex items-center text-xs text-ink-secondary ${className}`}>
      <button
        onClick={onHomeClick}
        className="inline-flex items-center hover:text-brand-navy transition-colors focus:outline-none"
        title="Command Centre"
      >
        <Home className="w-3.5 h-3.5 mr-1 text-ink-secondary/70" />
        <span>Home</span>
      </button>

      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <ChevronRight className="w-3 h-3 mx-1.5 text-ink-secondary/40 flex-shrink-0" />
          {item.active ? (
            <span className="font-semibold text-brand-navy truncate">
              {item.label}
            </span>
          ) : (
            <button
              onClick={item.onClick}
              className="hover:text-brand-navy transition-colors truncate focus:outline-none"
            >
              {item.label}
            </button>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
