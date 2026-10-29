import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  CalendarCheck2, 
  BookOpen, 
  GraduationCap, 
  UserCheck, 
  ReceiptIndianRupee, 
  ShieldCheck, 
  FileText, 
  Award, 
  CheckSquare, 
  Building2, 
  Library, 
  Bus, 
  Boxes, 
  BarChart3, 
  KeyRound, 
  Settings, 
  ChevronDown, 
  ChevronRight,
  School,
  Sparkles,
  PanelLeftClose,
  PanelLeftOpen,
  X
} from 'lucide-react';
import { UserRole } from '../../types';

export type ViewKey = 
  | 'command-centre'
  | 'admissions'
  | 'attendance'
  | 'academics'
  | 'examinations'
  | 'staff'
  | 'fees'
  | 'compliance'
  | 'disclosure'
  | 'sqaaf'
  | 'approvals'
  | 'infrastructure'
  | 'library'
  | 'transport'
  | 'inventory'
  | 'reports'
  | 'users-permissions'
  | 'settings';

interface NavItem {
  key: ViewKey;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeVariant?: 'brand' | 'warning' | 'danger';
}

interface NavGroup {
  id: string;
  label: string;
  items: NavItem[];
}

interface AppSidebarProps {
  currentView: ViewKey;
  onNavigate: (view: ViewKey) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  currentRole: UserRole;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({
  currentView,
  onNavigate,
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile,
  currentRole
}) => {
  // Collapsible section state
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});

  const toggleGroup = (groupId: string) => {
    setCollapsedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  const navGroups: NavGroup[] = [
    {
      id: 'overview',
      label: 'OVERVIEW',
      items: [
        { key: 'command-centre', label: 'Command Centre', icon: LayoutDashboard }
      ]
    },
    {
      id: 'school-ops',
      label: 'SCHOOL OPERATIONS',
      items: [
        { key: 'admissions', label: 'Admissions & Students', icon: Users, badge: '1,248' },
        { key: 'attendance', label: 'Attendance', icon: CalendarCheck2, badge: 'Rule 13' },
        { key: 'academics', label: 'Academics', icon: BookOpen },
        { key: 'examinations', label: 'Examinations', icon: GraduationCap },
        { key: 'staff', label: 'Staff & HR', icon: UserCheck, badge: '86' },
        { key: 'fees', label: 'Fees & Finance', icon: ReceiptIndianRupee, badge: '₹82.4L' }
      ]
    },
    {
      id: 'governance',
      label: 'GOVERNANCE',
      items: [
        { key: 'compliance', label: 'CBSE Compliance', icon: ShieldCheck, badge: '87%', badgeVariant: 'warning' },
        { key: 'disclosure', label: 'Public Disclosure', icon: FileText, badge: 'Appx IX' },
        { key: 'sqaaf', label: 'SQAAF & Improvement', icon: Award },
        { key: 'approvals', label: 'Approvals & Tasks', icon: CheckSquare, badge: '5 Pending', badgeVariant: 'danger' }
      ]
    },
    {
      id: 'resources',
      label: 'RESOURCES',
      items: [
        { key: 'infrastructure', label: 'Infrastructure & Safety', icon: Building2 },
        { key: 'library', label: 'Library', icon: Library },
        { key: 'transport', label: 'Transport', icon: Bus },
        { key: 'inventory', label: 'Inventory', icon: Boxes }
      ]
    },
    {
      id: 'insights',
      label: 'INSIGHTS & SETTINGS',
      items: [
        { key: 'reports', label: 'Reports & Analytics', icon: BarChart3 },
        { key: 'users-permissions', label: 'Users & Permissions', icon: KeyRound },
        { key: 'settings', label: 'Settings', icon: Settings }
      ]
    }
  ];

  const handleItemClick = (key: ViewKey) => {
    onNavigate(key);
    if (isMobileOpen) {
      onCloseMobile();
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-[2px] lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 bg-white border-r border-surface-border flex flex-col transition-all duration-200 select-none ${
          isMobileOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0'
        } ${isCollapsed ? 'lg:w-[72px]' : 'lg:w-64'}`}
      >
        {/* Logo and Brand Header */}
        <div className="h-16 px-3.5 flex items-center justify-between border-b border-surface-border/80 flex-shrink-0 bg-white">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-brand-navy flex items-center justify-center text-white flex-shrink-0 shadow-sm border border-brand-navyDark">
              <School className="w-4.5 h-4.5 text-white" />
            </div>

            {!isCollapsed && (
              <div className="flex flex-col min-w-0">
                <span className="text-[13px] font-bold text-brand-navy tracking-tight truncate leading-tight uppercase">
                  DRT Knowledge Hub
                </span>
                <span className="text-[10px] text-ink-secondary truncate flex items-center gap-1 font-medium">
                  <span className="text-slate-500">Mumbra</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-brand-blue font-semibold">CBSE 1130982</span>
                </span>
              </div>
            )}
          </div>

          {/* Desktop collapse button & Mobile close button */}
          <div className="flex items-center">
            <button
              onClick={onToggleCollapse}
              className="hidden lg:flex p-1.5 rounded-md text-ink-secondary hover:text-ink-primary hover:bg-surface-muted transition-colors"
              title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isCollapsed ? (
                <PanelLeftOpen className="w-4 h-4" />
              ) : (
                <PanelLeftClose className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-md text-ink-secondary hover:text-ink-primary"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {navGroups.map((group) => {
            const isGroupCollapsed = collapsedGroups[group.id] && !isCollapsed;

            return (
              <div key={group.id} className="space-y-1">
                {/* Group Heading */}
                {!isCollapsed ? (
                  <button
                    onClick={() => toggleGroup(group.id)}
                    className="w-full flex items-center justify-between px-2.5 py-1 text-[11px] font-semibold text-ink-secondary/80 tracking-wider uppercase hover:text-ink-primary transition-colors focus:outline-none"
                  >
                    <span>{group.label}</span>
                    <span className="text-slate-400">
                      {isGroupCollapsed ? (
                        <ChevronRight className="w-3 h-3" />
                      ) : (
                        <ChevronDown className="w-3 h-3" />
                      )}
                    </span>
                  </button>
                ) : (
                  <div className="h-2 border-b border-surface-border/50 mx-2 mb-2" />
                )}

                {/* Group Items */}
                {!isGroupCollapsed && (
                  <div className="space-y-0.5">
                    {group.items.map((item) => {
                      const isActive = currentView === item.key;
                      const Icon = item.icon;

                      return (
                        <button
                          key={item.key}
                          onClick={() => handleItemClick(item.key)}
                          title={isCollapsed ? item.label : undefined}
                          className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-lg text-xs font-medium transition-all group relative focus:outline-none ${
                            isActive
                              ? 'bg-brand-blue/10 text-brand-navy font-semibold'
                              : 'text-ink-secondary hover:text-ink-primary hover:bg-surface-cardHover'
                          }`}
                        >
                          {/* Active left indicator bar */}
                          {isActive && (
                            <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-brand-navy rounded-r" />
                          )}

                          <Icon
                            className={`w-4 h-4 flex-shrink-0 transition-colors ${
                              isActive
                                ? 'text-brand-navy'
                                : 'text-ink-secondary group-hover:text-ink-primary'
                            }`}
                          />

                          {!isCollapsed && (
                            <div className="flex-1 flex items-center justify-between min-w-0">
                              <span className="truncate">{item.label}</span>
                              {item.badge && (
                                <span
                                  className={`text-[10px] px-1.5 py-0.2 rounded font-medium tabular-nums ${
                                    item.badgeVariant === 'danger'
                                      ? 'bg-rose-100 text-rose-700 font-semibold'
                                      : item.badgeVariant === 'warning'
                                      ? 'bg-amber-100 text-amber-700'
                                      : 'bg-slate-100 text-slate-600'
                                  }`}
                                >
                                  {item.badge}
                                </span>
                              )}
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer / InfiSpark Branding */}
        <div className="p-3 border-t border-surface-border/80 bg-surface-bg/60 flex-shrink-0">
          {!isCollapsed ? (
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-ink-primary leading-tight">
                    InfiSpark Technologies
                  </p>
                  <p className="text-[10px] text-ink-secondary">
                    CBSE ERP v2.0 • Mumbra
                  </p>
                </div>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-500" title="System Operational" />
            </div>
          ) : (
            <div className="flex justify-center" title="InfiSpark Technologies LLP">
              <Sparkles className="w-4 h-4 text-brand-blue" />
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
