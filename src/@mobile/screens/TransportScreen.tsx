import React, { useState } from 'react';
import { 
  Bus, 
  Phone, 
  MapPin, 
  Crosshair, 
  Navigation,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { TRANSPORT_DATA } from '../data/parentAppData';

interface TransportScreenProps {
  onCallDriver?: () => void;
}

export const TransportScreen: React.FC<TransportScreenProps> = ({ onCallDriver }) => {
  const [isCentered, setIsCentered] = useState(true);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3.5 bg-[#F8FAFC]">
      {/* 1. Live Map Container */}
      <div className="w-full h-48 rounded-2xl overflow-hidden relative shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-gray-200 bg-[#E8ECEF]">
        {/* SVG Styled Map Graphic */}
        <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
          {/* Background Map Blocks */}
          <rect x="0" y="0" width="400" height="200" fill="#EBF0F2" />
          
          {/* Parks & Green zones */}
          <rect x="15" y="10" width="90" height="60" rx="10" fill="#D8F3DC" />
          <rect x="290" y="20" width="85" height="70" rx="12" fill="#D8F3DC" />
          <rect x="180" y="125" width="100" height="55" rx="8" fill="#D8F3DC" />

          {/* Secondary streets */}
          <line x1="0" y1="45" x2="400" y2="45" stroke="#FFFFFF" strokeWidth="12" />
          <line x1="0" y1="120" x2="400" y2="120" stroke="#FFFFFF" strokeWidth="10" />
          <line x1="120" y1="0" x2="120" y2="200" stroke="#FFFFFF" strokeWidth="12" />
          <line x1="280" y1="0" x2="280" y2="200" stroke="#FFFFFF" strokeWidth="12" />

          {/* Active Bus Route (Red bold curved line) */}
          <path
            d="M 60 140 Q 140 140 145 130 T 230 130 T 260 90 T 360 80"
            fill="none"
            stroke="#DC2626"
            strokeWidth="4.5"
            strokeLinecap="round"
          />

          {/* School Start point */}
          <circle cx="60" cy="140" r="5" fill="#10B981" />

          {/* Yellow School Bus Graphic */}
          <g transform="translate(130, 118)">
            {/* Bus shadow */}
            <rect x="0" y="12" width="36" height="4" rx="2" fill="rgba(0,0,0,0.2)" />
            {/* Bus body */}
            <rect x="2" y="0" width="32" height="15" rx="3" fill="#FACC15" stroke="#CA8A04" strokeWidth="1" />
            {/* Bus windows */}
            <rect x="5" y="2" width="6" height="5" rx="1" fill="#1E293B" />
            <rect x="13" y="2" width="6" height="5" rx="1" fill="#1E293B" />
            <rect x="21" y="2" width="6" height="5" rx="1" fill="#1E293B" />
            {/* Wheels */}
            <circle cx="9" cy="15" r="2.5" fill="#111" />
            <circle cx="27" cy="15" r="2.5" fill="#111" />
          </g>

          {/* Red Destination Pin */}
          <g transform="translate(355, 60)">
            <circle cx="5" cy="5" r="5" fill="#DC2626" />
            <path d="M5 10 L5 20" stroke="#DC2626" strokeWidth="2" />
            <circle cx="5" cy="20" r="2" fill="#DC2626" />
          </g>
        </svg>

        {/* Floating Top-Right ETA Glass Pill */}
        <div className="absolute top-2.5 right-2.5 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.12)] border border-gray-100 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-red-600" />
          <span className="text-[12px] font-black text-gray-900">
            ETA: {TRANSPORT_DATA.etaMinutes} min
          </span>
          <span className="text-[11px] font-medium text-gray-500">
            ({TRANSPORT_DATA.etaDistance})
          </span>
        </div>

        {/* Floating Re-center GPS Button */}
        <button
          onClick={() => setIsCentered(!isCentered)}
          className="absolute bottom-2.5 right-2.5 w-8 h-8 rounded-full bg-white shadow-[0_2px_6px_rgba(0,0,0,0.15)] flex items-center justify-center text-gray-700 hover:text-red-600 transition-colors"
          title="Center on bus"
        >
          <Crosshair className="w-4 h-4" />
        </button>
      </div>

      {/* 2. Bus & Driver Info Card */}
      <div className="bg-white rounded-2xl p-3.5 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={TRANSPORT_DATA.driverAvatar}
            alt={TRANSPORT_DATA.driverName}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100 shadow-sm"
          />
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-[13.5px] font-extrabold text-gray-900">
                Bus No. {TRANSPORT_DATA.busNumber}
              </h4>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[11px] font-bold text-emerald-600">On Route</span>
            </div>
            <p className="text-[11.5px] text-gray-500 font-medium">
              Driver: {TRANSPORT_DATA.driverName}
            </p>
          </div>
        </div>

        {/* Red Round Phone Call Button */}
        <button
          onClick={onCallDriver}
          className="w-10 h-10 rounded-full bg-[#DC2626] hover:bg-red-700 text-white flex items-center justify-center shadow-[0_4px_10px_rgba(220,38,38,0.3)] active:scale-95 transition-all"
          title={`Call ${TRANSPORT_DATA.driverName}`}
        >
          <Phone className="w-4.5 h-4.5 fill-white stroke-none" />
        </button>
      </div>

      {/* 3. Route Timeline / Stops Stepper */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.03)] space-y-3">
        <h4 className="text-[13.5px] font-extrabold text-gray-900">
          Route Schedule & Stops
        </h4>

        <div className="relative pl-6 space-y-4">
          {/* Vertical Connecting Line */}
          <div className="absolute left-2.5 top-2 bottom-3 w-0.5 bg-gray-200" />

          {/* Stop 1: Left from School */}
          <div className="relative flex items-start gap-3">
            <div className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-4 ring-white" />
            <div>
              <h5 className="text-[13px] font-bold text-gray-800">Left from School</h5>
              <span className="text-[11.5px] text-gray-400 font-medium">08:10 AM</span>
            </div>
          </div>

          {/* Stop 2: Active Stop (Light Red Rounded Highlight Card) */}
          <div className="relative flex items-start gap-3">
            <div className="absolute -left-6 top-2 w-3.5 h-3.5 rounded-full bg-red-600 ring-4 ring-white" />
            <div className="w-full bg-red-50/70 border border-red-100 rounded-xl p-2.5 -my-1">
              <h5 className="text-[13.5px] font-black text-red-600">
                Your Stop (Kausa Circle)
              </h5>
              <p className="text-[11.5px] text-red-700 font-bold mt-0.5">
                ETA: 08:24 AM (6 min)
              </p>
            </div>
          </div>

          {/* Stop 3: Drop at Home */}
          <div className="relative flex items-start gap-3 pt-1">
            <div className="absolute -left-6 top-1.5 w-3.5 h-3.5 rounded-full bg-gray-300 ring-4 ring-white" />
            <div>
              <h5 className="text-[13px] font-bold text-gray-600">Drop at Home</h5>
              <span className="text-[11.5px] text-gray-400 font-medium">Est. 08:32 AM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
