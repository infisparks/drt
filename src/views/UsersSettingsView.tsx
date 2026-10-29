import React, { useState } from 'react';
import { 
  KeyRound, 
  Settings, 
  ShieldCheck, 
  Users, 
  Building, 
  Save, 
  Check, 
  Globe, 
  Mail, 
  Phone,
  Sparkles
} from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { StatusBadge } from '../components/common/StatusBadge';
import { MOCK_USERS, SCHOOL_INFO } from '../data/mockData';

interface UsersSettingsViewProps {
  initialTab?: 'users' | 'settings';
  onShowToast: (type: 'success' | 'warning' | 'error' | 'info', title: string, message?: string) => void;
}

export const UsersSettingsView: React.FC<UsersSettingsViewProps> = ({
  initialTab = 'users',
  onShowToast
}) => {
  const [activeTab, setActiveTab] = useState<'users' | 'settings'>(initialTab);
  const [schoolSettings, setSchoolSettings] = useState(SCHOOL_INFO);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onShowToast('success', 'Settings Saved', 'Institutional parameters updated in local state.');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title={activeTab === 'users' ? "Users & Access Permissions" : "School Institutional Settings"}
        description="Role-based access control, biometric auth logs, and CBSE affiliation profile parameters."
        breadcrumbs={[
          { label: 'Insights & Settings' },
          { label: activeTab === 'users' ? 'Users & Permissions' : 'Settings', active: true }
        ]}
      />

      {/* Tabs */}
      <div className="flex border-b border-surface-border">
        <button
          onClick={() => setActiveTab('users')}
          className={`py-3 px-5 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'users'
              ? 'border-brand-navy text-brand-navy'
              : 'border-transparent text-ink-secondary hover:text-ink-primary'
          }`}
        >
          <KeyRound className="w-4 h-4" />
          <span>Users & Role Permissions</span>
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`py-3 px-5 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'settings'
              ? 'border-brand-navy text-brand-navy'
              : 'border-transparent text-ink-secondary hover:text-ink-primary'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Institutional Configuration</span>
        </button>
      </div>

      {/* TAB 1: USERS & PERMISSIONS */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          <div className="bg-white border border-surface-border rounded-xl shadow-subtle overflow-hidden">
            <div className="p-4 border-b border-surface-border flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-ink-primary">
                  Authorized Administrative & Faculty Accounts
                </h3>
                <p className="text-xs text-ink-secondary">
                  5 Key Simulated Personas available for role-switching in prototype demonstration
                </p>
              </div>
              <StatusBadge variant="success">Role-Based Switching Active</StatusBadge>
            </div>

            <div className="divide-y divide-surface-border/60">
              {MOCK_USERS.map((usr) => (
                <div key={usr.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-surface-cardHover transition-colors">
                  <div className="flex items-center gap-3">
                    <img
                      src={usr.avatar}
                      alt={usr.name}
                      className="w-10 h-10 rounded-full object-cover ring-1 ring-surface-border"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-ink-primary text-sm">{usr.name}</span>
                        <StatusBadge variant="brand" size="sm">{usr.role.toUpperCase()}</StatusBadge>
                      </div>
                      <p className="text-xs text-brand-navy font-medium mt-0.5">{usr.roleTitle}</p>
                      <p className="text-[11px] text-ink-secondary font-mono">{usr.email}</p>
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-xs text-ink-secondary block">{usr.department}</span>
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      Full Domain Access
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SETTINGS */}
      {activeTab === 'settings' && (
        <form onSubmit={handleSaveSettings} className="bg-white border border-surface-border rounded-xl p-5 shadow-subtle space-y-4">
          <div className="pb-3 border-b border-surface-border">
            <h3 className="text-base font-bold text-ink-primary">
              DRT Knowledge Hub International School Profile
            </h3>
            <p className="text-xs text-ink-secondary">
              Master parameters synchronized with InfiSpark Technologies ERP core
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-ink-primary mb-1">
                School Official Name
              </label>
              <input
                type="text"
                value={schoolSettings.name}
                onChange={(e) => setSchoolSettings({ ...schoolSettings, name: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-surface-border rounded-lg bg-surface-bg font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-ink-primary mb-1">
                CBSE Affiliation Number
              </label>
              <input
                type="text"
                value={schoolSettings.affiliationNo}
                onChange={(e) => setSchoolSettings({ ...schoolSettings, affiliationNo: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-surface-border rounded-lg bg-surface-bg font-mono font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-ink-primary mb-1">
                CBSE School Code
              </label>
              <input
                type="text"
                value={schoolSettings.schoolCode}
                onChange={(e) => setSchoolSettings({ ...schoolSettings, schoolCode: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-surface-border rounded-lg bg-surface-bg font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-ink-primary mb-1">
                U-DISE+ Registration Code
              </label>
              <input
                type="text"
                value={schoolSettings.udiseCode}
                onChange={(e) => setSchoolSettings({ ...schoolSettings, udiseCode: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-surface-border rounded-lg bg-surface-bg font-mono"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-ink-primary mb-1">
                Campus Location & Address
              </label>
              <input
                type="text"
                value={schoolSettings.address}
                onChange={(e) => setSchoolSettings({ ...schoolSettings, address: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-surface-border rounded-lg bg-surface-bg"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-ink-primary mb-1">
                Official Website Domain
              </label>
              <input
                type="text"
                value={schoolSettings.website}
                onChange={(e) => setSchoolSettings({ ...schoolSettings, website: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-surface-border rounded-lg bg-surface-bg font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-ink-primary mb-1">
                Software Development Partner
              </label>
              <input
                type="text"
                readOnly
                value={schoolSettings.vendor}
                className="w-full px-3 py-2 text-xs border border-surface-border rounded-lg bg-surface-muted text-brand-navy font-bold"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-surface-border flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg bg-brand-navy hover:bg-brand-navyDark text-white shadow-subtle transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Save Configuration</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
