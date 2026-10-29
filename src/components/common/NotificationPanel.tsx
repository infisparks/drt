import React from 'react';
import { Bell, ShieldAlert, CheckCircle, Clock, AlertTriangle, ArrowRight, X } from 'lucide-react';

export interface NotificationItem {
  id: string;
  type: 'compliance' | 'approval' | 'attendance' | 'finance';
  title: string;
  description: string;
  time: string;
  isUnread: boolean;
  targetView: string;
}

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onSelectNotification: (notif: NotificationItem) => void;
  onMarkAllRead: () => void;
}

export const NotificationPanel: React.FC<NotificationPanelProps> = ({
  isOpen,
  onClose,
  notifications,
  onSelectNotification,
  onMarkAllRead
}) => {
  if (!isOpen) return null;

  const unreadCount = notifications.filter(n => n.isUnread).length;

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'compliance':
        return <ShieldAlert className="w-4 h-4 text-rose-600" />;
      case 'approval':
        return <Clock className="w-4 h-4 text-amber-600" />;
      case 'attendance':
        return <AlertTriangle className="w-4 h-4 text-brand-blue" />;
      case 'finance':
        return <CheckCircle className="w-4 h-4 text-emerald-600" />;
    }
  };

  return (
    <>
      <div 
        className="fixed inset-0 z-40 bg-black/10"
        onClick={onClose}
      />
      <div className="absolute right-0 top-12 w-80 sm:w-96 bg-white border border-surface-border rounded-xl shadow-modal z-50 overflow-hidden flex flex-col max-h-[480px]">
        {/* Header */}
        <div className="px-4 py-3 border-b border-surface-border flex items-center justify-between bg-surface-bg">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-brand-navy" />
            <h4 className="text-sm font-bold text-ink-primary">
              Notifications
            </h4>
            {unreadCount > 0 && (
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-brand-navy text-white">
                {unreadCount} new
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={onMarkAllRead}
                className="text-[11px] text-brand-blue hover:text-brand-navy font-medium"
              >
                Mark all read
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 rounded text-ink-secondary hover:text-ink-primary"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Notifications list */}
        <div className="flex-1 overflow-y-auto divide-y divide-surface-border/60">
          {notifications.length === 0 ? (
            <div className="p-6 text-center text-xs text-ink-secondary">
              No new notifications
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => {
                  onSelectNotification(notif);
                  onClose();
                }}
                className={`p-3.5 flex items-start gap-3 cursor-pointer transition-colors hover:bg-surface-cardHover ${
                  notif.isUnread ? 'bg-brand-blue/5' : ''
                }`}
              >
                <div className="p-1.5 rounded-md bg-surface-muted flex-shrink-0 mt-0.5">
                  {getIcon(notif.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <p className="text-xs font-semibold text-ink-primary truncate">
                      {notif.title}
                    </p>
                    <span className="text-[10px] text-ink-secondary flex-shrink-0 tabular-nums">
                      {notif.time}
                    </span>
                  </div>
                  <p className="text-xs text-ink-secondary line-clamp-2">
                    {notif.description}
                  </p>
                </div>
                {notif.isUnread && (
                  <span className="w-2 h-2 rounded-full bg-brand-blue flex-shrink-0 mt-1.5" />
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-2.5 bg-surface-bg border-t border-surface-border text-center">
          <span className="text-[11px] text-ink-secondary">
            Simulated live institutional alerts (Session 2026–27)
          </span>
        </div>
      </div>
    </>
  );
};
