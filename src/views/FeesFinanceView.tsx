import React, { useState } from 'react';
import { 
  ReceiptIndianRupee, 
  Wallet, 
  ArrowUpRight, 
  ArrowDownRight, 
  Search, 
  Download, 
  Receipt, 
  Printer, 
  Filter, 
  Calendar,
  CreditCard,
  Building,
  CheckCircle2,
  AlertTriangle,
  Eye
} from 'lucide-react';
import { FeeTransaction } from '../types';
import { MOCK_FEE_TRANSACTIONS, MOCK_FEE_HEADS } from '../data/mockData';
import { PageHeader } from '../components/common/PageHeader';
import { StatCard } from '../components/common/StatCard';
import { StatusBadge } from '../components/common/StatusBadge';
import { DetailDrawer } from '../components/common/DetailDrawer';
import { SearchFilterBar } from '../components/common/SearchFilterBar';

interface FeesFinanceViewProps {
  onShowToast: (type: 'success' | 'warning' | 'error' | 'info', title: string, message?: string) => void;
}

export const FeesFinanceView: React.FC<FeesFinanceViewProps> = ({ onShowToast }) => {
  const [activeTab, setActiveTab] = useState<'transactions' | 'dues' | 'structure' | 'expenses'>('transactions');
  const [searchQuery, setSearchQuery] = useState('');
  const [modeFilter, setModeFilter] = useState('all');

  // Receipt preview modal state
  const [selectedReceipt, setSelectedReceipt] = useState<FeeTransaction | null>(null);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);

  // Defaulters list
  const [defaulters, setDefaulters] = useState([
    { id: 'd1', name: 'Faizan Merchant', grade: 'Class X-A', admNo: 'DRT-2024-0089', dueAmount: 18500, dueSince: 'Jul 15, 2026', phone: '+91 98201 11223', status: 'Notice Dispatched' },
    { id: 'd2', name: 'Sara Shaikh', grade: 'Class XII-Sci', admNo: 'DRT-2023-0144', dueAmount: 24000, dueSince: 'Oct 10, 2026', phone: '+91 98199 44332', status: 'Follow-up Call Done' },
    { id: 'd3', name: 'Arman Qureshi', grade: 'Class IX-B', admNo: 'DRT-2024-0231', dueAmount: 14200, dueSince: 'Sep 05, 2026', phone: '+91 98921 55667', status: 'Pending Follow-up' },
    { id: 'd4', name: 'Ibrahim Siddiqui', grade: 'Class VI-A', admNo: 'DRT-2025-0412', dueAmount: 12000, dueSince: 'Aug 20, 2026', phone: '+91 98210 99887', status: 'Notice Dispatched' },
  ]);

  // Operational expenses dataset
  const expenses = [
    { id: 'exp_1', category: 'Staff Payroll (7th CPC)', amount: 2840000, recipient: 'DRT Faculty & Support Staff (86 members)', date: 'Oct 01, 2026', mode: 'Bank Direct NEFT' },
    { id: 'exp_2', category: 'Campus Electricity & Power Backup', amount: 142000, recipient: 'Mahavitaran (MSEDCL) Mumbra Substation', date: 'Oct 12, 2026', mode: 'NetBanking' },
    { id: 'exp_3', category: 'Science Lab Equipment & Consumables', amount: 84000, recipient: 'Kausa Scientific Enterprises, Thane', date: 'Oct 20, 2026', mode: 'Cheque #884121' },
    { id: 'exp_4', category: 'CBSE Annual Institutional Affiliation Fee', amount: 50000, recipient: 'Secretary, CBSE New Delhi', date: 'Oct 05, 2026', mode: 'SBI Collect Portal' },
    { id: 'exp_5', category: 'Library Books & NCERT Curriculum Batch', amount: 65000, recipient: 'National Book Trust / NCERT Sales', date: 'Oct 15, 2026', mode: 'UPI RTGS' },
  ];

  const filteredTransactions = MOCK_FEE_TRANSACTIONS.filter(t => {
    const matchesSearch = t.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.receiptNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.admissionNo.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMode = modeFilter === 'all' || t.paymentMode === modeFilter;
    return matchesSearch && matchesMode;
  });

  const handleOpenReceipt = (trans: FeeTransaction) => {
    setSelectedReceipt(trans);
    setIsReceiptOpen(true);
  };

  const handleSendReminder = (name: string) => {
    onShowToast('info', 'Fee Reminder Sent', `Automated SMS with payment link sent to parent of ${name}.`);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Fees & Financial Governance"
        description="Term tuition fee collections, real-time banking gateway receipts, outstanding dues recovery, and operational expenses."
        breadcrumbs={[
          { label: 'School Operations' },
          { label: 'Fees & Finance', active: true }
        ]}
        primaryAction={{
          label: "Issue New Fee Receipt",
          icon: <Receipt className="w-4 h-4" />,
          onClick: () => onShowToast('info', 'Fee Desk', 'Simulated Manual Counter Fee Collection form.')
        }}
        secondaryActions={[
          {
            label: "Export Bank Reconciliation",
            icon: <Download className="w-3.5 h-3.5" />,
            onClick: () => onShowToast('info', 'Export Started', 'Daily Bank Reconciliation Statement generated.')
          }
        ]}
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Collected (YTD)"
          value="₹82.4L"
          icon={ReceiptIndianRupee}
          trend={{ value: "81.5% target achieved", isPositive: true }}
          subtext="Term 1 & Term 2 Cleared"
        />
        <StatCard
          label="Outstanding Dues"
          value="₹18.6L"
          icon={Wallet}
          trend={{ value: "142 student balances", isNeutral: true }}
          subtext="Under active reminder cycle"
        />
        <StatCard
          label="Monthly Expenses"
          value="₹31.8L"
          icon={Building}
          subtext="Payroll, utilities & CBSE fees"
        />
        <StatCard
          label="Digital Payments (UPI)"
          value="74.2%"
          icon={CreditCard}
          trend={{ value: "+8.4% paperless adoption", isPositive: true }}
          subtext="HDFC & Razorpay Gateway"
        />
      </div>

      {/* Tabs */}
      <div className="flex border-b border-surface-border overflow-x-auto">
        <button
          onClick={() => setActiveTab('transactions')}
          className={`py-3 px-4 sm:px-5 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'transactions'
              ? 'border-brand-navy text-brand-navy'
              : 'border-transparent text-ink-secondary hover:text-ink-primary'
          }`}
        >
          Fee Transactions & Receipts
        </button>
        <button
          onClick={() => setActiveTab('dues')}
          className={`py-3 px-4 sm:px-5 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
            activeTab === 'dues'
              ? 'border-brand-navy text-brand-navy'
              : 'border-transparent text-ink-secondary hover:text-ink-primary'
          }`}
        >
          <span>Outstanding Dues Watchlist</span>
          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-800">
            ₹18.6L Pending
          </span>
        </button>
        <button
          onClick={() => setActiveTab('structure')}
          className={`py-3 px-4 sm:px-5 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'structure'
              ? 'border-brand-navy text-brand-navy'
              : 'border-transparent text-ink-secondary hover:text-ink-primary'
          }`}
        >
          Approved Fee Structures (Session 26-27)
        </button>
        <button
          onClick={() => setActiveTab('expenses')}
          className={`py-3 px-4 sm:px-5 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'expenses'
              ? 'border-brand-navy text-brand-navy'
              : 'border-transparent text-ink-secondary hover:text-ink-primary'
          }`}
        >
          Institutional Expenses
        </button>
      </div>

      {/* TAB 1: TRANSACTIONS */}
      {activeTab === 'transactions' && (
        <div className="space-y-4">
          <SearchFilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            searchPlaceholder="Search receipt number, student name, admission no..."
            resultCount={filteredTransactions.length}
            filters={[
              {
                key: 'mode',
                label: 'Payment Mode',
                value: modeFilter,
                onChange: setModeFilter,
                options: [
                  { label: 'All Modes', value: 'all' },
                  { label: 'UPI / QR', value: 'UPI' },
                  { label: 'NetBanking / Gateway', value: 'NetBanking' },
                  { label: 'Cheque / DD', value: 'Cheque' },
                  { label: 'Cash Counter', value: 'Cash' },
                ]
              }
            ]}
            onResetFilters={() => {
              setSearchQuery('');
              setModeFilter('all');
            }}
          />

          <div className="bg-white border border-surface-border rounded-xl shadow-subtle overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-surface-bg/80 border-b border-surface-border text-ink-secondary text-[11px] uppercase tracking-wider font-semibold">
                    <th className="py-3 px-4">Receipt No</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Student</th>
                    <th className="py-3 px-4">Class</th>
                    <th className="py-3 px-4 text-right">Amount (₹)</th>
                    <th className="py-3 px-4 text-center">Payment Mode</th>
                    <th className="py-3 px-4 text-center">Reconciliation</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-border/60">
                  {filteredTransactions.map((tx) => (
                    <tr
                      key={tx.receiptNo}
                      onClick={() => handleOpenReceipt(tx)}
                      className="hover:bg-surface-cardHover transition-colors cursor-pointer group"
                    >
                      <td className="py-3.5 px-4 font-mono font-bold text-brand-navy">
                        {tx.receiptNo}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-xs text-ink-secondary tabular-nums">
                        {tx.date}
                      </td>
                      <td className="py-3.5 px-4">
                        <p className="font-semibold text-ink-primary group-hover:text-brand-navy transition-colors">
                          {tx.studentName}
                        </p>
                        <p className="text-[11px] font-mono text-ink-secondary">
                          {tx.admissionNo}
                        </p>
                      </td>
                      <td className="py-3.5 px-4 font-medium text-ink-primary">
                        {tx.grade}
                      </td>
                      <td className="py-3.5 px-4 text-right font-bold text-ink-primary tabular-nums">
                        ₹{tx.amount.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <StatusBadge variant="neutral" size="sm">
                          {tx.paymentMode}
                        </StatusBadge>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <StatusBadge
                          variant={tx.status === 'Success' ? 'success' : 'warning'}
                          size="sm"
                        >
                          {tx.status}
                        </StatusBadge>
                      </td>
                      <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => handleOpenReceipt(tx)}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-brand-blue hover:text-brand-navy"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Receipt</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: OUTSTANDING DUES */}
      {activeTab === 'dues' && (
        <div className="bg-white border border-surface-border rounded-xl shadow-subtle overflow-hidden">
          <div className="p-4 border-b border-surface-border flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-ink-primary">
                Outstanding Fee Recovery Watchlist (Term 2)
              </h3>
              <p className="text-xs text-ink-secondary">
                142 accounts with overdue balance exceeding 15 days
              </p>
            </div>
            <button
              onClick={() => onShowToast('info', 'Bulk Reminders', 'Dispatched automated SMS notices to all outstanding accounts.')}
              className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-brand-navy text-white hover:bg-brand-navyDark transition-colors shadow-subtle"
            >
              Send Reminders to All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-surface-bg/80 border-b border-surface-border text-ink-secondary text-[11px] uppercase tracking-wider font-semibold">
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-4">Class</th>
                  <th className="py-3 px-4 text-right">Pending Amount</th>
                  <th className="py-3 px-4">Overdue Since</th>
                  <th className="py-3 px-4">Guardian Phone</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Quick Follow-up</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border/60">
                {defaulters.map((item) => (
                  <tr key={item.id} className="hover:bg-surface-cardHover transition-colors">
                    <td className="py-3.5 px-4 font-bold text-ink-primary">
                      {item.name}
                      <span className="block text-[11px] font-mono text-ink-secondary">
                        {item.admNo}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-ink-primary">
                      {item.grade}
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-rose-600 tabular-nums">
                      ₹{item.dueAmount.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5 px-4 tabular-nums text-ink-secondary font-mono text-xs">
                      {item.dueSince}
                    </td>
                    <td className="py-3.5 px-4 text-ink-secondary font-mono text-xs">
                      {item.phone}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <StatusBadge variant="warning" size="sm">
                        {item.status}
                      </StatusBadge>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleSendReminder(item.name)}
                        className="px-3 py-1 text-xs font-semibold rounded bg-brand-blue/10 text-brand-navy hover:bg-brand-blue/20 transition-colors"
                      >
                        Send SMS Alert
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: APPROVED FEE STRUCTURE */}
      {activeTab === 'structure' && (
        <div className="bg-white border border-surface-border rounded-xl shadow-subtle p-5">
          <div className="pb-3 mb-4 border-b border-surface-border">
            <h3 className="text-base font-bold text-ink-primary">
              Approved Fee Structure for Academic Session 2026–27
            </h3>
            <p className="text-xs text-ink-secondary">
              Approved by School Management Committee (SMC) & Disclosed under CBSE Mandate
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {MOCK_FEE_HEADS.map((head) => (
              <div key={head.grade} className="p-4 rounded-xl border border-surface-border bg-surface-bg/40 hover:bg-white hover:shadow-card transition-all">
                <span className="text-xs font-bold text-brand-navy px-2 py-0.5 rounded bg-brand-blue/10">
                  {head.grade}
                </span>
                <div className="mt-3 text-2xl font-bold text-ink-primary tabular-nums">
                  ₹{head.totalAnnual.toLocaleString('en-IN')}
                  <span className="text-xs text-ink-secondary font-normal block">Annual Comprehensive Fee</span>
                </div>

                <div className="mt-3 space-y-1.5 text-xs text-ink-secondary pt-2 border-t border-surface-border">
                  <div className="flex justify-between">
                    <span>Tuition (Monthly):</span>
                    <strong className="text-ink-primary font-mono">₹{head.tuitionFee}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Term / Exam Fee:</span>
                    <strong className="text-ink-primary font-mono">₹{head.termFee}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Annual Activity Charges:</span>
                    <strong className="text-ink-primary font-mono">₹{head.annualCharges}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: EXPENSES */}
      {activeTab === 'expenses' && (
        <div className="bg-white border border-surface-border rounded-xl shadow-subtle overflow-hidden">
          <div className="p-4 border-b border-surface-border flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-ink-primary">
                Monthly Institutional Operating Disbursements
              </h3>
              <p className="text-xs text-ink-secondary">
                Vouchers approved by Managing Director Dr. A. R. Khan
              </p>
            </div>
            <span className="text-xs font-bold text-ink-primary bg-surface-muted px-3 py-1 rounded-full">
              Total Oct Outflow: ₹31.81 Lakhs
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-surface-bg/80 border-b border-surface-border text-ink-secondary text-[11px] uppercase tracking-wider font-semibold">
                  <th className="py-3 px-4">Expense Head</th>
                  <th className="py-3 px-4">Beneficiary / Vendor</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Payment Method</th>
                  <th className="py-3 px-4 text-right">Disbursed (₹)</th>
                  <th className="py-3 px-4 text-center">Audit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border/60">
                {expenses.map((exp) => (
                  <tr key={exp.id} className="hover:bg-surface-cardHover transition-colors">
                    <td className="py-3.5 px-4 font-bold text-ink-primary">
                      {exp.category}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-ink-primary">
                      {exp.recipient}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-xs text-ink-secondary tabular-nums">
                      {exp.date}
                    </td>
                    <td className="py-3.5 px-4 text-xs font-mono text-ink-secondary">
                      {exp.mode}
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-ink-primary tabular-nums">
                      ₹{exp.amount.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <StatusBadge variant="success" size="sm">
                        Voucher Passed
                      </StatusBadge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Fee Receipt Drawer */}
      <DetailDrawer
        isOpen={isReceiptOpen}
        onClose={() => setIsReceiptOpen(false)}
        title="Official School Fee Receipt"
        subtitle={selectedReceipt ? `Receipt #${selectedReceipt.receiptNo}` : ''}
        width="md"
        footer={
          <button
            onClick={() => {
              onShowToast('info', 'Print Job Sent', `Sending receipt #${selectedReceipt?.receiptNo} to thermal printer.`);
              setIsReceiptOpen(false);
            }}
            className="w-full flex items-center justify-center gap-2 py-2 text-xs sm:text-sm font-semibold rounded-lg bg-brand-navy hover:bg-brand-navyDark text-white shadow-subtle"
          >
            <Printer className="w-4 h-4" />
            <span>Print Official Fee Receipt</span>
          </button>
        }
      >
        {selectedReceipt && (
          <div className="border border-surface-border rounded-xl p-5 bg-white space-y-4">
            <div className="text-center pb-3 border-b border-surface-border">
              <h3 className="font-bold text-sm text-brand-navy">
                DRT Knowledge Hub International School
              </h3>
              <p className="text-[11px] text-ink-secondary">
                Kausa, Mumbra, Thane - 400612 • CBSE Affil. 1130982
              </p>
              <span className="inline-block mt-1 font-bold text-xs uppercase tracking-wider text-ink-primary">
                FEE PAYMENT ACKNOWLEDGMENT
              </span>
            </div>

            <div className="space-y-1.5 text-xs text-ink-secondary bg-surface-bg p-3 rounded-lg border border-surface-border">
              <div className="flex justify-between">
                <span>Receipt Number:</span>
                <strong className="text-ink-primary font-mono">{selectedReceipt.receiptNo}</strong>
              </div>
              <div className="flex justify-between">
                <span>Date & Time:</span>
                <strong className="text-ink-primary font-mono">{selectedReceipt.date} • 11:24 AM</strong>
              </div>
              <div className="flex justify-between">
                <span>Student Name:</span>
                <strong className="text-ink-primary">{selectedReceipt.studentName}</strong>
              </div>
              <div className="flex justify-between">
                <span>Admission No:</span>
                <strong className="text-ink-primary font-mono">{selectedReceipt.admissionNo}</strong>
              </div>
              <div className="flex justify-between">
                <span>Class / Grade:</span>
                <strong className="text-ink-primary">{selectedReceipt.grade}</strong>
              </div>
              <div className="flex justify-between">
                <span>Payment Mode:</span>
                <strong className="text-ink-primary">{selectedReceipt.paymentMode}</strong>
              </div>
            </div>

            <div className="border-t border-b border-surface-border py-3 flex items-center justify-between">
              <span className="font-bold text-sm text-ink-primary">Total Amount Received:</span>
              <span className="text-xl font-bold text-emerald-700 tabular-nums">
                ₹{selectedReceipt.amount.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="text-[11px] text-ink-secondary flex items-center justify-between">
              <span>Cashier: {selectedReceipt.collectedBy}</span>
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Verified Clean
              </span>
            </div>
          </div>
        )}
      </DetailDrawer>
    </div>
  );
};
