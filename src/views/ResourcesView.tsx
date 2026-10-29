import React, { useState } from 'react';
import { 
  Building2, 
  Library, 
  Bus, 
  Boxes, 
  Search, 
  Download, 
  CheckCircle2, 
  AlertTriangle, 
  BookOpen, 
  ShieldCheck,
  Calendar,
  Phone,
  Clock,
  Plus,
  Users
} from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { StatCard } from '../components/common/StatCard';
import { StatusBadge } from '../components/common/StatusBadge';
import { SearchFilterBar } from '../components/common/SearchFilterBar';
import { MOCK_FACILITY_ASSETS, MOCK_TRANSPORT_ROUTES, MOCK_LIBRARY_BOOKS } from '../data/mockData';

interface ResourcesViewProps {
  initialTab?: 'infrastructure' | 'library' | 'transport' | 'inventory';
  onShowToast: (type: 'success' | 'warning' | 'error' | 'info', title: string, message?: string) => void;
}

export const ResourcesView: React.FC<ResourcesViewProps> = ({ 
  initialTab = 'infrastructure',
  onShowToast 
}) => {
  const [activeTab, setActiveTab] = useState<'infrastructure' | 'library' | 'transport' | 'inventory'>(initialTab);
  const [searchQuery, setSearchQuery] = useState('');

  // Inventory dataset
  const inventoryItems = [
    { id: 'inv_1', name: 'A4 Printing Paper Reams (75 GSM)', category: 'Stationery', inStock: 120, minThreshold: 30, unit: 'Reams', location: 'Admin Store Room 102', status: 'Sufficient' },
    { id: 'inv_2', name: 'Science Lab Glass Beakers (250ml Borosil)', category: 'Laboratory', inStock: 48, minThreshold: 20, unit: 'Pieces', location: 'Chemistry Lab Prep Room', status: 'Sufficient' },
    { id: 'inv_3', name: 'Student Desk & Chair Twin Units (Wooden)', category: 'Furniture', inStock: 450, minThreshold: 50, unit: 'Sets', location: 'Main Campus Classrooms', status: 'Sufficient' },
    { id: 'inv_4', name: 'First Aid Medical Kit Refills', category: 'Health & Safety', inStock: 8, minThreshold: 10, unit: 'Kits', location: 'Infirmary Clinic', status: 'Reorder Due' },
    { id: 'inv_5', name: 'Fire Extinguisher ABC Powder Refills (6kg)', category: 'Fire Safety', inStock: 18, minThreshold: 18, unit: 'Cylinders', location: 'Floor Corridors', status: 'Sufficient' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Campus Infrastructure & School Resources"
        description="Physical facilities, library catalogue, student bus transport routes, and institutional inventory logistics."
        breadcrumbs={[
          { label: 'Resources' },
          { label: activeTab.toUpperCase(), active: true }
        ]}
        primaryAction={{
          label: activeTab === 'library' ? "Issue Book" : activeTab === 'transport' ? "Add Route" : "Log Resource Inspection",
          icon: <Plus className="w-4 h-4" />,
          onClick: () => onShowToast('info', 'Resource Action', `Simulated form for ${activeTab}.`)
        }}
        secondaryActions={[
          {
            label: "Export Audit Sheet",
            icon: <Download className="w-3.5 h-3.5" />,
            onClick: () => onShowToast('info', 'Export Started', 'Resource audit sheet generated.')
          }
        ]}
      />

      {/* Tabs */}
      <div className="flex border-b border-surface-border overflow-x-auto">
        <button
          onClick={() => setActiveTab('infrastructure')}
          className={`py-3 px-5 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
            activeTab === 'infrastructure'
              ? 'border-brand-navy text-brand-navy'
              : 'border-transparent text-ink-secondary hover:text-ink-primary'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Infrastructure & Facilities</span>
        </button>
        <button
          onClick={() => setActiveTab('library')}
          className={`py-3 px-5 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
            activeTab === 'library'
              ? 'border-brand-navy text-brand-navy'
              : 'border-transparent text-ink-secondary hover:text-ink-primary'
          }`}
        >
          <Library className="w-4 h-4" />
          <span>Library Management</span>
        </button>
        <button
          onClick={() => setActiveTab('transport')}
          className={`py-3 px-5 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
            activeTab === 'transport'
              ? 'border-brand-navy text-brand-navy'
              : 'border-transparent text-ink-secondary hover:text-ink-primary'
          }`}
        >
          <Bus className="w-4 h-4" />
          <span>Transport & Buses</span>
        </button>
        <button
          onClick={() => setActiveTab('inventory')}
          className={`py-3 px-5 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
            activeTab === 'inventory'
              ? 'border-brand-navy text-brand-navy'
              : 'border-transparent text-ink-secondary hover:text-ink-primary'
          }`}
        >
          <Boxes className="w-4 h-4" />
          <span>Inventory & Consumables</span>
        </button>
      </div>

      {/* TAB 1: INFRASTRUCTURE */}
      {activeTab === 'infrastructure' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Total Campus Area" value="2.1 Acres" icon={Building2} subtext="8,500 Sq. Meters (Kausa, Mumbra)" />
            <StatCard label="Classrooms" value="48 Rooms" icon={CheckCircle2} subtext="All Smart Interactive Panels" />
            <StatCard label="Composite Science Labs" value="4 Labs" icon={ShieldCheck} subtext="Physics, Chem, Bio, Math" />
            <StatCard label="Fire Hydrants & Extinguishers" value="32 Units" icon={AlertTriangle} subtext="Audited October 2026" />
          </div>

          <div className="bg-white border border-surface-border rounded-xl shadow-subtle overflow-hidden">
            <div className="p-4 border-b border-surface-border flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-ink-primary">Physical Assets & Facility Inspection Roster</h3>
                <p className="text-xs text-ink-secondary">Mandated under CBSE Affiliation Bye-Laws Appendix IX (Infrastructure Standards)</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-surface-bg/80 border-b border-surface-border text-ink-secondary text-[11px] uppercase tracking-wider font-semibold">
                    <th className="py-3 px-4">Asset / Facility</th>
                    <th className="py-3 px-4">Facility Type</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">Capacity / Dimensions</th>
                    <th className="py-3 px-4">In-Charge</th>
                    <th className="py-3 px-4">Next Inspection</th>
                    <th className="py-3 px-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-border/60">
                  {MOCK_FACILITY_ASSETS.map((fac) => (
                    <tr key={fac.id} className="hover:bg-surface-cardHover transition-colors">
                      <td className="py-3.5 px-4 font-bold text-ink-primary">{fac.name}</td>
                      <td className="py-3.5 px-4 font-medium text-brand-navy">{fac.type}</td>
                      <td className="py-3.5 px-4 text-ink-secondary">{fac.location}</td>
                      <td className="py-3.5 px-4 text-ink-primary tabular-nums">{fac.capacity}</td>
                      <td className="py-3.5 px-4 text-ink-secondary font-medium">{fac.inCharge}</td>
                      <td className="py-3.5 px-4 font-mono text-xs tabular-nums text-ink-secondary">{fac.nextAuditDate}</td>
                      <td className="py-3.5 px-4 text-center">
                        <StatusBadge variant={fac.status === 'Operational' ? 'success' : 'warning'} size="sm">
                          {fac.status}
                        </StatusBadge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: LIBRARY */}
      {activeTab === 'library' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Total Library Volumes" value="8,450" icon={BookOpen} subtext="Exceeds CBSE 5,000 norm" />
            <StatCard label="NCERT & CBSE Reference" value="2,140" icon={CheckCircle2} subtext="Updated to 2026 Edition" />
            <StatCard label="Currently Issued" value="482 Books" icon={Clock} subtext="Tracked to student ID cards" />
            <StatCard label="Digital E-Library" value="24 Desktops" icon={Boxes} subtext="NDLI Portal Access" />
          </div>

          <div className="bg-white border border-surface-border rounded-xl shadow-subtle overflow-hidden">
            <div className="p-4 border-b border-surface-border flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-ink-primary">Library Catalogue & Book Circulation Register</h3>
                <p className="text-xs text-ink-secondary">Classification as per Dewey Decimal System</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-surface-bg/80 border-b border-surface-border text-ink-secondary text-[11px] uppercase tracking-wider font-semibold">
                    <th className="py-3 px-4">Book Title</th>
                    <th className="py-3 px-4">Author</th>
                    <th className="py-3 px-4">ISBN / Accession #</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4 text-center">Copies (Total / Avail)</th>
                    <th className="py-3 px-4">Shelf Location</th>
                    <th className="py-3 px-4 text-right">Circulation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-border/60">
                  {MOCK_LIBRARY_BOOKS.map((bk) => (
                    <tr key={bk.id} className="hover:bg-surface-cardHover transition-colors">
                      <td className="py-3.5 px-4 font-bold text-ink-primary">{bk.title}</td>
                      <td className="py-3.5 px-4 text-ink-secondary">{bk.author}</td>
                      <td className="py-3.5 px-4 font-mono text-xs text-ink-secondary">{bk.isbn}</td>
                      <td className="py-3.5 px-4 font-medium text-brand-navy">{bk.category}</td>
                      <td className="py-3.5 px-4 text-center tabular-nums font-semibold">
                        {bk.totalCopies} / <span className="text-emerald-700">{bk.availableCopies}</span>
                      </td>
                      <td className="py-3.5 px-4 text-ink-secondary font-mono text-xs">{bk.shelfLocation}</td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => onShowToast('success', 'Book Issued', `Issued 1 copy of "${bk.title}" to student card.`)}
                          className="px-2.5 py-1 text-xs font-semibold rounded bg-surface-bg hover:bg-surface-muted text-brand-navy border border-surface-border"
                        >
                          Issue Copy
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

      {/* TAB 3: TRANSPORT */}
      {activeTab === 'transport' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Active Bus Fleet" value="8 Vehicles" icon={Bus} subtext="CCTV & GPS Tracking Equipped" />
            <StatCard label="Students Enrolled" value="384 Students" icon={Users} subtext="Daily Mumbra/Kausa/Thane pickup" />
            <StatCard label="Fitness Certificates" value="100% Valid" icon={ShieldCheck} subtext="RTO Thane Approved" />
            <StatCard label="Speed Governors" value="Calibrated" icon={AlertTriangle} subtext="Locked to 40 km/h limit" />
          </div>

          <div className="bg-white border border-surface-border rounded-xl shadow-subtle overflow-hidden">
            <div className="p-4 border-b border-surface-border flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-ink-primary">School Bus Fleet & Driver Safety Compliance</h3>
                <p className="text-xs text-ink-secondary">Mandated under Supreme Court School Bus Safety Guidelines</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-surface-bg/80 border-b border-surface-border text-ink-secondary text-[11px] uppercase tracking-wider font-semibold">
                    <th className="py-3 px-4">Route #</th>
                    <th className="py-3 px-4">Route Path</th>
                    <th className="py-3 px-4">Vehicle No</th>
                    <th className="py-3 px-4">Driver & Contact</th>
                    <th className="py-3 px-4 text-center">Enrollment</th>
                    <th className="py-3 px-4">Fitness Expiry</th>
                    <th className="py-3 px-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-border/60">
                  {MOCK_TRANSPORT_ROUTES.map((rt) => (
                    <tr key={rt.id} className="hover:bg-surface-cardHover transition-colors">
                      <td className="py-3.5 px-4 font-bold text-brand-navy">{rt.routeNumber}</td>
                      <td className="py-3.5 px-4 font-medium text-ink-primary">{rt.routeName}</td>
                      <td className="py-3.5 px-4 font-mono text-xs text-ink-secondary">{rt.vehicleNo}</td>
                      <td className="py-3.5 px-4">
                        <p className="font-semibold text-ink-primary">{rt.driverName}</p>
                        <p className="text-[11px] font-mono text-ink-secondary flex items-center gap-1">
                          <Phone className="w-3 h-3" /> {rt.driverPhone}
                        </p>
                      </td>
                      <td className="py-3.5 px-4 text-center tabular-nums font-semibold">
                        {rt.studentsEnrolled} / {rt.capacity} Seats
                      </td>
                      <td className="py-3.5 px-4 font-mono text-xs text-ink-secondary tabular-nums">{rt.fitnessCertExpiry}</td>
                      <td className="py-3.5 px-4 text-center">
                        <StatusBadge variant="success" size="sm">{rt.status}</StatusBadge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: INVENTORY */}
      {activeTab === 'inventory' && (
        <div className="bg-white border border-surface-border rounded-xl shadow-subtle overflow-hidden">
          <div className="p-4 border-b border-surface-border flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-ink-primary">Consumables & Campus Inventory Stocks</h3>
              <p className="text-xs text-ink-secondary">Automated minimum threshold alerts for classroom supplies</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-surface-bg/80 border-b border-surface-border text-ink-secondary text-[11px] uppercase tracking-wider font-semibold">
                  <th className="py-3 px-4">Item Name</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4 text-right">In Stock</th>
                  <th className="py-3 px-4 text-right">Reorder Threshold</th>
                  <th className="py-3 px-4">Storage Location</th>
                  <th className="py-3 px-4 text-center">Stock Health</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border/60">
                {inventoryItems.map((inv) => (
                  <tr key={inv.id} className="hover:bg-surface-cardHover transition-colors">
                    <td className="py-3.5 px-4 font-bold text-ink-primary">{inv.name}</td>
                    <td className="py-3.5 px-4 font-medium text-brand-navy">{inv.category}</td>
                    <td className="py-3.5 px-4 text-right font-bold tabular-nums text-ink-primary">{inv.inStock} {inv.unit}</td>
                    <td className="py-3.5 px-4 text-right text-ink-secondary tabular-nums">{inv.minThreshold} {inv.unit}</td>
                    <td className="py-3.5 px-4 text-ink-secondary text-xs">{inv.location}</td>
                    <td className="py-3.5 px-4 text-center">
                      <StatusBadge variant={inv.status === 'Sufficient' ? 'success' : 'warning'} size="sm">
                        {inv.status}
                      </StatusBadge>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => onShowToast('info', 'Requisition Created', `Generated purchase order for ${inv.name}`)}
                        className="px-2.5 py-1 text-xs font-semibold rounded bg-brand-navy text-white hover:bg-brand-navyDark shadow-subtle"
                      >
                        Reorder Stock
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
