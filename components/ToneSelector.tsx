
import React from 'react';
import { TONE_OPTIONS } from '../constants';
import { Language } from '../types';

interface ToneSelectorProps {
  selectedTone: string;
  onSelect: (tone: string) => void;
  language: Language;
}

const ToneSelector: React.FC<ToneSelectorProps> = ({ selectedTone, onSelect, language }) => {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
      {TONE_OPTIONS.map((tone) => (
        <button
          key={tone.id}
          onClick={() => onSelect(tone.id)}
          title={tone.description}
          className={`p-2 rounded-xl flex flex-col items-center justify-center transition-all duration-200 border ${
            selectedTone === tone.id
              ? 'bg-amber-500 text-slate-900 border-amber-400 scale-105 shadow-lg'
              : 'bg-slate-800/40 border-slate-700 hover:border-slate-500 text-slate-300'
          }`}
        >
          <span className="text-xl mb-1">{tone.emoji}</span>
          <span className={`text-[10px] font-bold uppercase truncate w-full text-center ${language === 'hi' ? 'hindi-font' : ''}`}>
            {language === 'hi' ? tone.hindiLabel : tone.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default ToneSelector;
