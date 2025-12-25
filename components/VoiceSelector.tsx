
import React from 'react';
import { AVAILABLE_VOICES } from '../constants';
import { VoiceName } from '../types';

interface VoiceSelectorProps {
  selectedVoice: VoiceName;
  onSelect: (voice: VoiceName) => void;
}

const VoiceSelector: React.FC<VoiceSelectorProps> = ({ selectedVoice, onSelect }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
      {AVAILABLE_VOICES.map((voice) => (
        <button
          key={voice.name}
          onClick={() => onSelect(voice.name)}
          className={`p-3 rounded-xl flex flex-col items-center transition-all duration-300 border ${
            selectedVoice === voice.name
              ? 'bg-amber-500/20 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
              : 'bg-slate-800/40 border-slate-700 hover:border-slate-500'
          }`}
        >
          <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
            selectedVoice === voice.name ? 'bg-amber-500 text-white' : 'bg-slate-700 text-slate-300'
          }`}>
            <span className="text-lg font-bold">{voice.name[0]}</span>
          </div>
          <span className="text-xs font-semibold text-slate-100">{voice.name}</span>
          <span className="text-[10px] text-slate-400 mt-1">{voice.gender}</span>
        </button>
      ))}
    </div>
  );
};

export default VoiceSelector;
