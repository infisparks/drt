import React, { useState } from 'react';
import { 
  CheckSquare, 
  Clock, 
  Check, 
  X, 
  AlertCircle, 
  HelpCircle, 
  MessageSquare, 
  FileText, 
  User, 
  Eye, 
  ReceiptIndianRupee,
  Search,
  Filter
} from 'lucide-react';
import { ApprovalWorkflowItem } from '../types';
import { MOCK_APPROVAL_WORKFLOWS } from '../data/mockData';
import { PageHeader } from '../components/common/PageHeader';
import { StatCard } from '../components/common/StatCard';
import { StatusBadge } from '../components/common/StatusBadge';
import { ConfirmationDialog } from '../components/common/ConfirmationDialog';
import { FormDialog } from '../components/common/FormDialog';
import { DetailDrawer } from '../components/common/DetailDrawer';
import { ApprovalTimeline } from '../components/common/ApprovalTimeline';

interface ApprovalsViewProps {
  onShowToast: (type: 'success' | 'warning' | 'error' | 'info', title: string, message?: string) => void;
}

export const ApprovalsView: React.FC<ApprovalsViewProps> = ({ onShowToast }) => {
  const [items, setItems] = useState<ApprovalWorkflowItem[]>(() =>
    MOCK_APPROVAL_WORKFLOWS.map(item => ({
      ...item,
      requestType: item.type,
      requesterName: item.submittedBy.split('(')[0].trim(),
      requesterRole: item.submittedBy.includes('(') ? item.submittedBy.split('(')[1].replace(')', '') : 'Staff',
      submissionDate: item.submittedDate,
      justification: item.details,
      history: [
        {
          step: 'Requisition Filed',
          actor: item.submittedBy,
          timestamp: item.submittedDate,
          status: 'completed' as const,
          comments: 'Initial application submitted with supporting verification.'
        },
        {
          step: 'Administrative Review',
          actor: 'Section Head',
          timestamp: item.submittedDate,
          status: item.status.includes('Approved') ? ('completed' as const) : ('current' as const),
          comments: 'Forwarded for executive signoff.'
        }
      ]
    }))
  );
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  const [selectedItem, setSelectedItem] = useState<ApprovalWorkflowItem | null>(null);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);

  // Dialog states
  const [confirmAction, setConfirmAction] = useState<{
    isOpen: boolean;
    type: 'approve' | 'reject';
    item: ApprovalWorkflowItem | null;
  }>({ isOpen: false, type: 'approve', item: null });

  const [requestChangesModal, setRequestChangesModal] = useState<{
    isOpen: boolean;
    item: ApprovalWorkflowItem | null;
    comments: string;
  }>({ isOpen: false, item: null, comments: '' });

  const filteredItems = items.filter(item => {
    if (filterStatus === 'pending') return item.status.includes('Pending');
    if (filterStatus === 'approved') return item.status === 'Approved';
    if (filterStatus === 'rejected') return item.status === 'Rejected';
    return true;
  });

  const handleConfirmAction = () => {
    const { type, item } = confirmAction;
    if (!item) return;

    if (type === 'approve') {
      setItems(prev => prev.map(i => i.id === item.id ? { 
        ...i, 
        status: 'Approved',
        history: [
          ...(i.history || []),
          {
            step: 'Administrative Approval Granted',
            actor: 'Director Dr. A. R. Khan',
            timestamp: 'Just Now',
            status: 'completed' as const,
            comments: 'Sanctioned under institutional budget authority.'
          }
        ]
      } : i));
      onShowToast('success', 'Request Approved', `"${item.title}" successfully sanctioned and logged.`);
    } else {
      setItems(prev => prev.map(i => i.id === item.id ? { 
        ...i, 
        status: 'Rejected',
        history: [
          ...(i.history || []),
          {
            step: 'Request Rejected',
            actor: 'Executive Authority',
            timestamp: 'Just Now',
            status: 'rejected' as const,
            comments: 'Declined due to budget ceiling or policy constraint.'
          }
        ]
      } : i));
      onShowToast('warning', 'Request Rejected', `"${item.title}" declined.`);
    }

    setConfirmAction({ isOpen: false, type: 'approve', item: null });
  };

  const handleRequestChangesSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const item = requestChangesModal.item;
    if (!item) return;

    setItems(prev => prev.map(i => i.id === item.id ? { 
      ...i, 
      status: 'Changes Requested',
      history: [
        ...(i.history || []),
        {
          step: 'Clarification / Revision Requested',
          actor: 'Administrative Reviewer',
          timestamp: 'Just Now',
          status: 'pending' as const,
          comments: requestChangesModal.comments || 'Please revise quotation and resubmit.'
        }
      ]
    } : i));

    setRequestChangesModal({ isOpen: false, item: null, comments: '' });
    onShowToast('info', 'Clarification Requested', `Returned "${item.title}" to ${item.requesterName} for documentation revision.`);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Approvals & Administrative Tasks"
        description="Paperless multi-tier requisition inbox for procurements, leave applications, fee concessions, and statutory renewals."
        breadcrumbs={[
          { label: 'Governance' },
          { label: 'Approvals & Tasks', active: true }
        ]}
        primaryAction={{
          label: "Create Approval Requisition",
          icon: <CheckSquare className="w-4 h-4" />,
          onClick: () => onShowToast('info', 'New Request', 'Simulated Requisition voucher creation form.')
        }}
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Pending Your Decision"
          value={items.filter(i => i.status.includes('Pending')).length.toString()}
          icon={Clock}
          subtext="High-priority requisitions"
          trend={{ value: "5 Actionable", isNeutral: false }}
        />
        <StatCard
          label="Approved This Month"
          value="18"
          icon={Check}
          subtext="Disbursements & sanctions"
        />
        <StatCard
          label="Changes Requested"
          value="2"
          icon={HelpCircle}
          subtext="Returned to requesters"
        />
        <StatCard
          label="Procurement Value"
          value="₹1.42L"
          icon={ReceiptIndianRupee}
          subtext="Active purchase requests"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex border-b border-surface-border">
        {[
          { key: 'pending', label: `Pending Approvals (${items.filter(i => i.status.includes('Pending')).length})` },
          { key: 'all', label: `All Requests (${items.length})` },
          { key: 'approved', label: 'Approved Archive' },
          { key: 'rejected', label: 'Declined' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilterStatus(tab.key as any)}
            className={`py-3 px-5 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
              filterStatus === tab.key
                ? 'border-brand-navy text-brand-navy'
                : 'border-transparent text-ink-secondary hover:text-ink-primary'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Approvals Inbox List */}
      <div className="bg-white border border-surface-border rounded-xl shadow-subtle overflow-hidden">
        <div className="divide-y divide-surface-border/60">
          {filteredItems.length === 0 ? (
            <div className="p-12 text-center text-xs text-ink-secondary">
              No approval requisitions in this queue.
            </div>
          ) : (
            filteredItems.map((item) => (
              <div
                key={item.id}
                className="p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-surface-cardHover transition-colors"
              >
                {/* Left Details */}
                <div className="space-y-1.5 min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-mono font-bold text-ink-secondary bg-surface-muted px-2 py-0.5 rounded border border-surface-border">
                      {item.id}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-brand-blue/10 text-brand-navy">
                      {item.requestType}
                    </span>
                    <StatusBadge
                      variant={
                        item.priority === 'Urgent' ? 'danger' : item.priority === 'High' ? 'warning' : 'info'
                      }
                      size="sm"
                    >
                      {item.priority} Priority
                    </StatusBadge>
                  </div>

                  <h3 className="font-bold text-base text-ink-primary">
                    {item.title}
                  </h3>

                  <p className="text-xs text-ink-secondary">
                    Requested by <strong className="text-ink-primary font-medium">{item.requesterName}</strong> ({item.requesterRole}) on <span className="font-mono tabular-nums">{item.submissionDate}</span>
                  </p>

                  <p className="text-xs text-ink-secondary line-clamp-1 italic">
                    "{item.justification}"
                  </p>
                </div>

                {/* Amount (if any) */}
                {item.amount && (
                  <div className="text-left lg:text-right flex-shrink-0">
                    <span className="text-[11px] text-ink-secondary block">Sanction Amount</span>
                    <span className="text-lg font-bold text-brand-navy tabular-nums">
                      ₹{item.amount.toLocaleString('en-IN')}
                    </span>
                  </div>
                )}

                {/* Status and Action Buttons */}
                <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
                  <button
                    onClick={() => {
                      setSelectedItem(item);
                      setIsDetailDrawerOpen(true);
                    }}
                    className="px-3 py-1.5 text-xs font-medium text-ink-secondary hover:text-ink-primary bg-white border border-surface-border rounded-lg hover:bg-surface-muted transition-colors"
                  >
                    Details & Audit
                  </button>

                  {item.status.includes('Pending') ? (
                    <>
                      <button
                        onClick={() => setRequestChangesModal({ isOpen: true, item, comments: '' })}
                        className="px-3 py-1.5 text-xs font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition-colors"
                      >
                        Request Changes
                      </button>

                      <button
                        onClick={() => setConfirmAction({ isOpen: true, type: 'reject', item })}
                        className="px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors"
                      >
                        Reject
                      </button>

                      <button
                        onClick={() => setConfirmAction({ isOpen: true, type: 'approve', item })}
                        className="px-4 py-1.5 text-xs font-semibold text-white bg-brand-navy hover:bg-brand-navyDark rounded-lg shadow-subtle transition-colors flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approve</span>
                      </button>
                    </>
                  ) : (
                    <StatusBadge
                      variant={item.status === 'Approved' ? 'success' : item.status === 'Rejected' ? 'danger' : 'warning'}
                      size="md"
                    >
                      {item.status}
                    </StatusBadge>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Confirmation Dialog for Approve / Reject */}
      <ConfirmationDialog
        isOpen={confirmAction.isOpen}
        onClose={() => setConfirmAction({ isOpen: false, type: 'approve', item: null })}
        onConfirm={handleConfirmAction}
        title={confirmAction.type === 'approve' ? 'Sanction Requisition' : 'Decline Requisition'}
        message={
          confirmAction.type === 'approve'
            ? `Are you sure you want to approve "${confirmAction.item?.title}"? This decision will be permanently recorded in the institutional audit ledger.`
            : `Are you sure you want to decline "${confirmAction.item?.title}"? The requester will be notified.`
        }
        variant={confirmAction.type === 'approve' ? 'info' : 'danger'}
        confirmLabel={confirmAction.type === 'approve' ? 'Grant Approval' : 'Confirm Rejection'}
      />

      {/* Request Changes Dialog */}
      <FormDialog
        isOpen={requestChangesModal.isOpen}
        onClose={() => setRequestChangesModal({ isOpen: false, item: null, comments: '' })}
        title="Request Changes / Additional Documentation"
        description={`Return request ${requestChangesModal.item?.id} to ${requestChangesModal.item?.requesterName} with revision remarks.`}
        submitLabel="Send Revision Request"
        onSubmit={handleRequestChangesSubmit}
        maxWidth="md"
      >
        <div>
          <label className="block text-xs font-medium text-ink-primary mb-1">
            Specify Required Revision / Missing Invoices *
          </label>
          <textarea
            rows={4}
            required
            placeholder="e.g. Please attach at least 3 competitive market vendor quotations before Science Lab apparatus purchase can be sanctioned."
            value={requestChangesModal.comments}
            onChange={(e) => setRequestChangesModal({ ...requestChangesModal, comments: e.target.value })}
            className="w-full px-3 py-2 text-xs border border-surface-border rounded-lg bg-surface-bg focus:ring-2 focus:ring-brand-blue/30"
          />
        </div>
      </FormDialog>

      {/* Approval Detail Drawer */}
      <DetailDrawer
        isOpen={isDetailDrawerOpen}
        onClose={() => setIsDetailDrawerOpen(false)}
        title={selectedItem ? selectedItem.title : 'Requisition Details'}
        subtitle={selectedItem ? `${selectedItem.id} • ${selectedItem.requestType}` : ''}
        width="lg"
      >
        {selectedItem && (
          <div className="space-y-5 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-surface-bg border border-surface-border">
              <div className="flex items-center justify-between">
                <span className="font-bold text-base text-ink-primary">
                  {selectedItem.title}
                </span>
                <StatusBadge variant="brand">{selectedItem.priority} Priority</StatusBadge>
              </div>
              <p className="text-xs text-ink-secondary mt-1">
                Requester: <strong className="text-ink-primary">{selectedItem.requesterName}</strong> ({selectedItem.requesterRole})
              </p>
              {selectedItem.amount && (
                <div className="mt-2 text-lg font-bold text-brand-navy tabular-nums">
                  Sanction Amount: ₹{selectedItem.amount.toLocaleString('en-IN')}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-xs uppercase tracking-wider text-ink-secondary">
                Official Justification & Proposal
              </h4>
              <p className="p-3 bg-white border border-surface-border rounded-lg text-ink-primary leading-relaxed">
                {selectedItem.justification}
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-ink-secondary">
                Workflow Audit Trail
              </h4>
              <div className="bg-surface-bg p-4 rounded-xl border border-surface-border">
                <ApprovalTimeline events={selectedItem.history || []} />
              </div>
            </div>
          </div>
        )}
      </DetailDrawer>
    </div>
  );
};
