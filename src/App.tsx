import React, { useState } from 'react';
import { UserRole } from './types';
import { AppSidebar, ViewKey } from './components/layout/AppSidebar';
import { AppHeader } from './components/layout/AppHeader';
import { ToastContainer, ToastMessage } from './components/common/Toast';
import { NotificationPanel, NotificationItem } from './components/common/NotificationPanel';
import { ExecutiveReportModal } from './components/common/ExecutiveReportModal';

// Views
import { DirectorDashboard } from './views/DirectorDashboard';
import { AdmissionsView } from './views/AdmissionsView';
import { AttendanceView } from './views/AttendanceView';
import { AcademicsView } from './views/AcademicsView';
import { ExaminationsView } from './views/ExaminationsView';
import { StaffHRView } from './views/StaffHRView';
import { FeesFinanceView } from './views/FeesFinanceView';
import { CBSEComplianceView } from './views/CBSEComplianceView';
import { PublicDisclosureView } from './views/PublicDisclosureView';
import { NABETView } from './views/NABETView';
import { SQAAFView } from './views/SQAAFView';
import { ApprovalsView } from './views/ApprovalsView';
import { ResourcesView } from './views/ResourcesView';
import { ReportsView } from './views/ReportsView';
import { UsersSettingsView } from './views/UsersSettingsView';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewKey>('command-centre');
  const [currentRole, setCurrentRole] = useState<UserRole>('director');
  const [selectedSession, setSelectedSession] = useState<string>('2026-2027');
  
  // Sidebar states
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Executive Dossier Modal state
  const [isDossierOpen, setIsDossierOpen] = useState(false);

  // Notifications state
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'n1',
      type: 'compliance',
      title: 'Municipal Fire NOC Expiring in 18 Days',
      description: 'TMC Fire Safety NOC renewal inspection pending signoff.',
      time: '10m ago',
      isUnread: true,
      targetView: 'compliance'
    },
    {
      id: 'n2',
      type: 'approval',
      title: '5 Pending Requisition Approvals',
      description: 'Science Lab apparatus and casual leave applications awaiting review.',
      time: '1h ago',
      isUnread: true,
      targetView: 'approvals'
    },
    {
      id: 'n3',
      type: 'attendance',
      title: 'CBSE Rule 13 Attendance Alert',
      description: '4 students in Class X-A & XII fell below 75% aggregate threshold.',
      time: '3h ago',
      isUnread: true,
      targetView: 'attendance'
    },
    {
      id: 'n4',
      type: 'finance',
      title: 'Term-2 Fee Reconciliation',
      description: '₹82.4 Lakhs collected (81.5% target achieved to date).',
      time: '5h ago',
      isUnread: false,
      targetView: 'fees'
    }
  ]);

  // Toast feedback state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'warning' | 'error' | 'info', title: string, message?: string) => {
    const id = `toast_${Date.now()}_${Math.random()}`;
    setToasts(prev => [...prev, { id, type, title, message }]);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Role switching handler
  const handleRoleChange = (role: UserRole) => {
    setCurrentRole(role);
    const roleNames: Record<UserRole, string> = {
      director: 'Chair Person Shabnam Shaikh (Executive Governance & SMC)',
      principal: 'Principal Mrs. Shaheen Shaikh (Academics & Daily Operations)',
      academic: 'Mr. Rakesh Chaubey (Academic Coordinator & Senior Faculty)',
      compliance: 'Mr. Iqbal Virani (Elected Authority & SMC Governance)',
      accounts: 'Ms. Nida Aagah (Finance & Fee Accounts)',
      teacher: 'Faculty Persona',
      admin: 'System Administrator'
    };
    addToast('info', 'Role Context Switched', `Now viewing as ${roleNames[role] || role}`);
  };

  // Breadcrumbs calculation
  const getBreadcrumbs = () => {
    const map: Record<ViewKey, { group: string; label: string }> = {
      'command-centre': { group: 'Overview', label: 'Command Centre' },
      'admissions': { group: 'School Operations', label: 'Admissions & Students' },
      'attendance': { group: 'School Operations', label: 'Attendance' },
      'academics': { group: 'School Operations', label: 'Academics' },
      'examinations': { group: 'School Operations', label: 'Examinations' },
      'staff': { group: 'School Operations', label: 'Staff & HR' },
      'fees': { group: 'School Operations', label: 'Fees & Finance' },
      'nabet': { group: 'Governance', label: 'NABET Accreditation (June 2025)' },
      'compliance': { group: 'Governance', label: 'CBSE Compliance' },
      'disclosure': { group: 'Governance', label: 'Public Disclosure' },
      'sqaaf': { group: 'Governance', label: 'SQAAF & Improvement' },
      'approvals': { group: 'Governance', label: 'Approvals & Tasks' },
      'infrastructure': { group: 'Resources', label: 'Infrastructure & Safety' },
      'library': { group: 'Resources', label: 'Library' },
      'transport': { group: 'Resources', label: 'Transport' },
      'inventory': { group: 'Resources', label: 'Inventory' },
      'reports': { group: 'Insights & Settings', label: 'Reports & Analytics' },
      'users-permissions': { group: 'Insights & Settings', label: 'Users & Permissions' },
      'settings': { group: 'Insights & Settings', label: 'Settings' }
    };

    const current = map[currentView] || { group: 'Overview', label: 'Command Centre' };
    return [
      { label: current.group },
      { label: current.label, active: true }
    ];
  };

  // Global search handler
  const handleGlobalSearch = (query: string) => {
    const q = query.toLowerCase();
    if (q.includes('nabet') || q.includes('accredit') || q.includes('standard 2025') || q.includes('qci')) {
      setCurrentView('nabet');
    } else if (q.includes('fire') || q.includes('noc') || q.includes('compliance')) {
      setCurrentView('compliance');
    } else if (q.includes('fee') || q.includes('due') || q.includes('receipt')) {
      setCurrentView('fees');
    } else if (q.includes('attend') || q.includes('absent') || q.includes('rule 13')) {
      setCurrentView('attendance');
    } else if (q.includes('exam') || q.includes('mark') || q.includes('card')) {
      setCurrentView('examinations');
    } else if (q.includes('staff') || q.includes('teacher') || q.includes('leave')) {
      setCurrentView('staff');
    } else if (q.includes('sqaaf') || q.includes('quality') || q.includes('sip')) {
      setCurrentView('sqaaf');
    } else if (q.includes('disclos') || q.includes('appendix')) {
      setCurrentView('disclosure');
    } else {
      setCurrentView('admissions');
    }
    addToast('info', 'Search Query Applied', `Filtered views matching "${query}"`);
  };

  return (
    <div className="min-h-screen bg-surface-bg flex flex-col font-sans text-ink-primary">
      {/* 1. App Sidebar */}
      <AppSidebar
        currentView={currentView}
        onNavigate={setCurrentView}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        currentRole={currentRole}
      />

      {/* 2. Main Content Wrapper */}
      <div className={`flex-1 flex flex-col transition-all duration-200 ${
        isSidebarCollapsed ? 'lg:pl-[72px]' : 'lg:pl-64'
      }`}>
        {/* Top Header */}
        <AppHeader
          breadcrumbs={getBreadcrumbs()}
          currentRole={currentRole}
          onRoleChange={handleRoleChange}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          onOpenNotifications={() => setIsNotificationPanelOpen(true)}
          unreadNotificationCount={notifications.filter(n => n.isUnread).length}
          onGlobalSearch={handleGlobalSearch}
          selectedSession={selectedSession}
          onSessionChange={(s) => {
            setSelectedSession(s);
            addToast('info', 'Academic Session Changed', `Switched to Session ${s}`);
          }}
          onNavigateHome={() => setCurrentView('command-centre')}
          onQuickAction={(action) => {
            if (action === 'help') {
              setIsDossierOpen(true);
            }
          }}
        />

        {/* Notifications Dropdown Panel */}
        <div className="relative">
          <NotificationPanel
            isOpen={isNotificationPanelOpen}
            onClose={() => setIsNotificationPanelOpen(false)}
            notifications={notifications}
            onSelectNotification={(notif) => {
              setCurrentView(notif.targetView as ViewKey);
            }}
            onMarkAllRead={() => {
              setNotifications(prev => prev.map(n => ({ ...n, isUnread: false })));
              addToast('info', 'All Read', 'Marked all notifications as read.');
            }}
          />
        </div>

        {/* Main View Area with Consistent Padding */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {currentView === 'command-centre' && (
            <DirectorDashboard
              currentRole={currentRole}
              onNavigate={setCurrentView}
              onExportReport={() => setIsDossierOpen(true)}
              onSelectActionItem={(item) => {
                addToast('info', 'Drilling Down', `Navigating to ${item.title}`);
              }}
              selectedSession={selectedSession}
            />
          )}

          {currentView === 'admissions' && (
            <AdmissionsView onShowToast={addToast} />
          )}

          {currentView === 'attendance' && (
            <AttendanceView onShowToast={addToast} />
          )}

          {currentView === 'academics' && (
            <AcademicsView onShowToast={addToast} />
          )}

          {currentView === 'examinations' && (
            <ExaminationsView onShowToast={addToast} />
          )}

          {currentView === 'staff' && (
            <StaffHRView onShowToast={addToast} />
          )}

          {currentView === 'fees' && (
            <FeesFinanceView onShowToast={addToast} />
          )}

          {currentView === 'nabet' && (
            <NABETView
              onShowToast={addToast}
              onNavigateView={(viewKey) => setCurrentView(viewKey as ViewKey)}
            />
          )}

          {currentView === 'compliance' && (
            <CBSEComplianceView onShowToast={addToast} />
          )}

          {currentView === 'disclosure' && (
            <PublicDisclosureView onShowToast={addToast} />
          )}

          {currentView === 'sqaaf' && (
            <SQAAFView onShowToast={addToast} />
          )}

          {currentView === 'approvals' && (
            <ApprovalsView onShowToast={addToast} />
          )}

          {currentView === 'infrastructure' && (
            <ResourcesView initialTab="infrastructure" onShowToast={addToast} />
          )}

          {currentView === 'library' && (
            <ResourcesView initialTab="library" onShowToast={addToast} />
          )}

          {currentView === 'transport' && (
            <ResourcesView initialTab="transport" onShowToast={addToast} />
          )}

          {currentView === 'inventory' && (
            <ResourcesView initialTab="inventory" onShowToast={addToast} />
          )}

          {currentView === 'reports' && (
            <ReportsView onShowToast={addToast} />
          )}

          {currentView === 'users-permissions' && (
            <UsersSettingsView initialTab="users" onShowToast={addToast} />
          )}

          {currentView === 'settings' && (
            <UsersSettingsView initialTab="settings" onShowToast={addToast} />
          )}
        </main>
      </div>

      {/* Floating Toast Alerts Container */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Executive Dossier Modal */}
      <ExecutiveReportModal
        isOpen={isDossierOpen}
        onClose={() => setIsDossierOpen(false)}
        onPrint={() => {
          addToast('info', 'Print Command Dispatched', 'Simulated printing of Executive Dossier.');
        }}
        onDownloadPdf={() => {
          addToast('success', 'PDF Downloaded', 'Executive_Dossier_DRT_2026_27.pdf generated.');
        }}
      />
    </div>
  );
};
export default App;
