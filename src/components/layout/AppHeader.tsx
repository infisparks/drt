import React, { useState } from 'react';
import { 
  Menu, 
  Search, 
  Bell, 
  ChevronDown, 
  Calendar, 
  Check, 
  User, 
  Shield, 
  LogOut,
  ExternalLink,
  HelpCircle
} from 'lucide-react';
import { UserProfile, UserRole } from '../../types';
import { MOCK_USERS, CURRENT_SESSION } from '../../data/mockData';
import { Breadcrumbs, BreadcrumbItem } from '../common/Breadcrumbs';

interface AppHeaderProps {
  breadcrumbs: BreadcrumbItem[];
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  onOpenMobileSidebar: () => void;
  onOpenNotifications: () => void;
  unreadNotificationCount: number;
  onGlobalSearch: (term: string) => void;
  selectedSession: string;
  onSessionChange: (session: string) => void;
  onNavigateHome: () => void;
  onQuickAction?: (action: string) => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  breadcrumbs,
  currentRole,
  onRoleChange,
  onOpenMobileSidebar,
  onOpenNotifications,
  unreadNotificationCount,
  onGlobalSearch,
  selectedSession,
  onSessionChange,
  onNavigateHome,
  onQuickAction
}) => {
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isSessionDropdownOpen, setIsSessionDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const currentUser = MOCK_USERS.find(u => u.role === currentRole) || MOCK_USERS[0];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onGlobalSearch(searchTerm.trim());
    }
  };

  const handleRoleSelect = (role: UserRole) => {
    onRoleChange(role);
    setIsRoleDropdownOpen(false);
  };

  return (
    <header className="h-16 bg-white border-b border-surface-border sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6">
      {/* Left: Mobile Toggle & Breadcrumbs */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 rounded-lg text-ink-secondary hover:text-ink-primary hover:bg-surface-muted transition-colors"
          title="Open Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:block min-w-0">
          <Breadcrumbs items={breadcrumbs} onHomeClick={onNavigateHome} />
        </div>
      </div>

      {/* Right: Search, Session, Notifications, User Role */}
      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        {/* Global Search Bar */}
        <form onSubmit={handleSearchSubmit} className="relative hidden md:block">
          <Search className="w-4 h-4 text-ink-secondary/70 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search students, staff, compliances..."
            className="w-48 lg:w-64 pl-9 pr-3 py-1.5 text-xs bg-surface-bg border border-surface-border rounded-lg text-ink-primary placeholder:text-ink-secondary/60 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
          />
        </form>

        {/* Academic Session Selector */}
        <div className="relative">
          <button
            onClick={() => setIsSessionDropdownOpen(!isSessionDropdownOpen)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-brand-navy bg-surface-bg border border-surface-border rounded-lg hover:bg-surface-muted transition-colors focus:outline-none"
            title="Switch Academic Session"
          >
            <Calendar className="w-3.5 h-3.5 text-brand-blue" />
            <span className="hidden sm:inline">Session:</span>
            <span className="tabular-nums font-bold">{selectedSession}</span>
            <ChevronDown className="w-3 h-3 text-ink-secondary" />
          </button>

          {isSessionDropdownOpen && (
            <>
              <div 
                className="fixed inset-0 z-30" 
                onClick={() => setIsSessionDropdownOpen(false)} 
              />
              <div className="absolute right-0 mt-1.5 w-44 bg-white border border-surface-border rounded-lg shadow-modal py-1 z-40 text-xs">
                <div className="px-3 py-1.5 text-[10px] font-semibold text-ink-secondary uppercase tracking-wider border-b border-surface-border">
                  Academic Sessions
                </div>
                {['2026-2027', '2025-2026', '2024-2025'].map((session) => (
                  <button
                    key={session}
                    onClick={() => {
                      onSessionChange(session);
                      setIsSessionDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-left hover:bg-surface-cardHover ${
                      selectedSession === session ? 'text-brand-navy font-bold bg-brand-blue/5' : 'text-ink-primary'
                    }`}
                  >
                    <span>Session {session}</span>
                    {selectedSession === session && (
                      <Check className="w-3.5 h-3.5 text-brand-navy" />
                    )}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Notifications Icon with Badge */}
        <div className="relative">
          <button
            onClick={onOpenNotifications}
            className="relative p-2 rounded-lg text-ink-secondary hover:text-ink-primary hover:bg-surface-muted transition-colors focus:outline-none"
            title="School alerts & tasks"
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
            )}
          </button>
        </div>

        {/* Role Selector & Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
            className="flex items-center gap-2 pl-2 pr-2.5 py-1 rounded-lg hover:bg-surface-cardHover border border-transparent hover:border-surface-border transition-all focus:outline-none"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-7 h-7 rounded-full object-cover ring-1 ring-surface-border"
            />
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-semibold text-ink-primary leading-tight truncate max-w-[120px]">
                {currentUser.name}
              </span>
              <span className="text-[10px] text-brand-blue font-medium leading-none truncate max-w-[120px]">
                {currentUser.roleTitle.split(' ')[0]} ({currentUser.role.toUpperCase()})
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-ink-secondary" />
          </button>

          {isRoleDropdownOpen && (
            <>
              <div 
                className="fixed inset-0 z-30" 
                onClick={() => setIsRoleDropdownOpen(false)} 
              />
              <div className="absolute right-0 mt-1.5 w-64 bg-white border border-surface-border rounded-xl shadow-modal py-1.5 z-40 text-xs">
                {/* Active user info */}
                <div className="px-3.5 py-2.5 border-b border-surface-border bg-surface-bg/50">
                  <p className="text-xs font-bold text-ink-primary">
                    {currentUser.name}
                  </p>
                  <p className="text-[11px] text-ink-secondary">
                    {currentUser.email}
                  </p>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-brand-blue/10 text-brand-navy">
                    {currentUser.roleTitle}
                  </span>
                </div>

                {/* Role Switcher Section */}
                <div className="px-3 py-1.5 text-[10px] font-semibold text-ink-secondary uppercase tracking-wider">
                  Switch Role Context
                </div>

                <div className="max-h-48 overflow-y-auto">
                  {MOCK_USERS.map((usr) => (
                    <button
                      key={usr.id}
                      onClick={() => handleRoleSelect(usr.role)}
                      className={`w-full flex items-center justify-between px-3.5 py-2 text-left hover:bg-surface-cardHover transition-colors ${
                        currentRole === usr.role ? 'bg-brand-blue/5 text-brand-navy font-bold' : 'text-ink-primary'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <img
                          src={usr.avatar}
                          alt={usr.name}
                          className="w-5 h-5 rounded-full object-cover flex-shrink-0"
                        />
                        <div className="truncate">
                          <p className="truncate text-xs leading-tight">{usr.name}</p>
                          <p className="text-[10px] text-ink-secondary truncate">{usr.roleTitle}</p>
                        </div>
                      </div>
                      {currentRole === usr.role && (
                        <Check className="w-3.5 h-3.5 text-brand-navy flex-shrink-0 ml-1.5" />
                      )}
                    </button>
                  ))}
                </div>

                <div className="mt-1 border-t border-surface-border pt-1">
                  <button
                    onClick={() => {
                      setIsRoleDropdownOpen(false);
                      onQuickAction?.('help');
                    }}
                    className="w-full flex items-center gap-2 px-3.5 py-2 text-ink-secondary hover:text-ink-primary hover:bg-surface-cardHover text-left text-xs"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Documentation & Demo Guide</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
