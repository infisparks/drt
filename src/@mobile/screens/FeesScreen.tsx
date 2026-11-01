import React, { useState } from 'react';
import { 
  Receipt, 
  ArrowRight, 
  CheckCircle2, 
  Download, 
  ShieldCheck,
  CreditCard
} from 'lucide-react';
import { FEE_STRUCTURE_DATA } from '../data/parentAppData';

interface FeesScreenProps {
  onPayNow?: () => void;
  onDownloadReceipt?: (receiptNo: string) => void;
}

export const FeesScreen: React.FC<FeesScreenProps> = ({ 
  onPayNow,
  onDownloadReceipt 
}) => {
  const [activeTab, setActiveTab] = useState<'Overview' | 'History' | 'Receipts'>('Overview');

  return (
    <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 bg-[#F8FAFC]">
      {/* 1. Segmented Pill Tabs */}
      <div className="flex items-center gap-2 p-1 bg-white rounded-full border border-gray-100 shadow-sm">
        {(['Overview', 'History', 'Receipts'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-1.5 px-3 rounded-full text-[12px] font-bold transition-all ${
              activeTab === tab
                ? 'bg-[#DC2626] text-white shadow-[0_2px_6px_rgba(220,38,38,0.3)]'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Overview' && (
        <>
          {/* 2. Term Fee Due Card */}
          <div className="bg-white rounded-2xl p-4 border border-red-100 shadow-[0_4px_14px_rgba(220,38,38,0.06)] space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center border border-red-100 flex-shrink-0">
                <Receipt className="w-5 h-5 stroke-[2]" />
              </div>
              <div className="flex-1">
                <h4 className="text-[15px] font-bold text-gray-900">Term Fee</h4>
                <p className="text-[12px] text-red-600 font-semibold">
                  Due by {FEE_STRUCTURE_DATA.dueDate}
                </p>
              </div>
            </div>

            {/* Big Amount */}
            <div className="pt-1">
              <span className="text-[30px] font-black text-red-600 tracking-tight leading-none block">
                ₹ {FEE_STRUCTURE_DATA.termFeeDue.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Pay Now Button */}
            <button
              onClick={onPayNow}
              className="w-full py-3 bg-[#DC2626] hover:bg-red-700 active:scale-[0.98] text-white rounded-xl text-[14px] font-extrabold flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(220,38,38,0.25)] transition-all"
            >
              <span>Pay Now</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

          {/* 3. Section: Fee Breakdown (Annual) */}
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.03)] space-y-3">
            <h4 className="text-[14px] font-extrabold text-gray-900">
              Fee Breakdown (Annual)
            </h4>

            <div className="space-y-2.5 text-[13px]">
              {FEE_STRUCTURE_DATA.breakdown.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-gray-700">
                  <span className="font-medium text-gray-600">{item.title}</span>
                  <span className="font-bold text-gray-900">
                    ₹ {item.amount.toLocaleString('en-IN')}
                  </span>
                </div>
              ))}

              <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                <span className="font-extrabold text-gray-900 text-[14px]">
                  Total (Annual)
                </span>
                <span className="font-black text-red-600 text-[16px]">
                  ₹ {FEE_STRUCTURE_DATA.totalAnnual.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>
        </>
      )}

      {/* History Tab */}
      {activeTab === 'History' && (
        <div className="space-y-3 pb-4">
          <h4 className="text-[14px] font-extrabold text-gray-900">
            Payment History (2026–27)
          </h4>

          <div className="bg-white rounded-2xl p-3.5 border border-gray-100 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Paid Online
              </span>
              <span className="text-[11px] text-gray-400">10 Jul 2026</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h5 className="text-[13px] font-bold text-gray-800">Term 1 Fee + Annual Charges</h5>
                <p className="text-[11px] text-gray-500">Receipt #DRT-REC-2026-0814</p>
              </div>
              <span className="text-[15px] font-black text-gray-900">₹ 23,500</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-3.5 border border-gray-100 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Paid Online
              </span>
              <span className="text-[11px] text-gray-400">15 Apr 2026</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h5 className="text-[13px] font-bold text-gray-800">Admission & First Quarter</h5>
                <p className="text-[11px] text-gray-500">Receipt #DRT-REC-2026-0122</p>
              </div>
              <span className="text-[15px] font-black text-gray-900">₹ 35,000</span>
            </div>
          </div>
        </div>
      )}

      {/* Receipts Tab */}
      {activeTab === 'Receipts' && (
        <div className="space-y-3 pb-4">
          <h4 className="text-[14px] font-extrabold text-gray-900">
            Download Receipts
          </h4>

          {['DRT-REC-2026-0814', 'DRT-REC-2026-0122'].map((rec, i) => (
            <div key={i} className="bg-white rounded-2xl p-3.5 border border-gray-100 shadow-sm flex items-center justify-between">
              <div>
                <h5 className="text-[13px] font-bold text-gray-800">{rec}</h5>
                <p className="text-[11px] text-gray-400">Verified CBSE Accounts Ledger</p>
              </div>
              <button
                onClick={() => onDownloadReceipt && onDownloadReceipt(rec)}
                className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                title="Download PDF"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
