import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, CreditCard, ArrowRight, Smartphone } from 'lucide-react';

interface PayFeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  dueDate: string;
  studentName: string;
  onPaymentSuccess: (receiptId: string) => void;
}

export const PayFeeModal: React.FC<PayFeeModalProps> = ({
  isOpen,
  onClose,
  amount,
  dueDate,
  studentName,
  onPaymentSuccess
}) => {
  const [selectedMethod, setSelectedMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);

  if (!isOpen) return null;

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsDone(true);
      const receiptNo = `DRT-REC-${Math.floor(100000 + Math.random() * 900000)}`;
      setTimeout(() => {
        onPaymentSuccess(receiptNo);
        setIsDone(false);
        onClose();
      }, 1500);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-sm bg-white rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-gray-100">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div>
            <h3 className="text-[16px] font-black text-gray-900">Online Fee Payment</h3>
            <p className="text-[12px] text-gray-500 font-medium">{studentName} • Term Fee</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isDone ? (
          <div className="py-8 text-center space-y-2">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-[17px] font-black text-gray-900">Payment Successful!</h4>
            <p className="text-[12px] text-gray-500">
              ₹ {amount.toLocaleString('en-IN')} received. E-Receipt generated.
            </p>
          </div>
        ) : (
          <div className="space-y-4 py-3 text-[13px]">
            {/* Amount card */}
            <div className="bg-red-50/70 border border-red-100 rounded-2xl p-3.5 flex items-center justify-between">
              <div>
                <span className="text-[11.5px] font-bold text-gray-500 block">Total Payable</span>
                <span className="text-[24px] font-black text-red-600 tracking-tight">
                  ₹ {amount.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-semibold text-gray-400 block uppercase">Due Date</span>
                <span className="text-[12px] font-extrabold text-red-700">{dueDate}</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <label className="block text-[12px] font-bold text-gray-700">
                Select Payment Mode
              </label>

              <button
                type="button"
                onClick={() => setSelectedMethod('upi')}
                className={`w-full p-3 rounded-xl border flex items-center justify-between transition-all ${
                  selectedMethod === 'upi'
                    ? 'border-red-500 bg-red-50/30 ring-1 ring-red-500'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-gray-900 text-[13px]">UPI / QR / GPay / PhonePe</p>
                    <p className="text-[11px] text-gray-500">Instant verification (0% surcharge)</p>
                  </div>
                </div>
                {selectedMethod === 'upi' && <CheckCircle2 className="w-4 h-4 text-red-600" />}
              </button>

              <button
                type="button"
                onClick={() => setSelectedMethod('card')}
                className={`w-full p-3 rounded-xl border flex items-center justify-between transition-all ${
                  selectedMethod === 'card'
                    ? 'border-red-500 bg-red-50/30 ring-1 ring-red-500'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-gray-900 text-[13px]">Debit / Credit Card</p>
                    <p className="text-[11px] text-gray-500">Visa, Mastercard, RuPay</p>
                  </div>
                </div>
                {selectedMethod === 'card' && <CheckCircle2 className="w-4 h-4 text-red-600" />}
              </button>
            </div>

            <div className="pt-2">
              <button
                onClick={handlePay}
                disabled={isProcessing}
                className="w-full py-3 bg-[#DC2626] hover:bg-red-700 active:scale-[0.98] text-white rounded-xl text-[14px] font-extrabold flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(220,38,38,0.25)] transition-all disabled:opacity-70"
              >
                {isProcessing ? (
                  <span>Processing Payment...</span>
                ) : (
                  <>
                    <span>Pay ₹ {amount.toLocaleString('en-IN')}</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-gray-400 text-[11px] pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>256-bit Bank Grade Encrypted Payment</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
