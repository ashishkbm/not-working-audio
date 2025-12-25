
import React from 'react';
import { PERSONAS } from '../constants';
import { Language } from '../types';

interface PersonaSelectorProps {
  selectedId: string;
  onSelect: (id: string) => void;
  language: Language;
}

const PersonaSelector: React.FC<PersonaSelectorProps> = ({ selectedId, onSelect, language }) => {
  return (
    <div className="flex overflow-x-auto pb-4 gap-4 no-scrollbar -mx-2 px-2">
      {PERSONAS.filter(p => p.lang === language || p.id.includes('base')).map((persona) => (
        <button
          key={persona.id}
          onClick={() => onSelect(persona.id)}
          className={`flex-shrink-0 w-24 h-32 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 border-2 ${
            selectedId === persona.id
              ? 'bg-amber-500/20 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
              : 'bg-slate-800/40 border-slate-700 hover:border-slate-500'
          }`}
        >
          <span className="text-3xl mb-2">{persona.emoji}</span>
          <span className={`text-[10px] font-bold text-center px-1 uppercase truncate w-full ${language === 'hi' ? 'hindi-font' : ''}`}>
            {language === 'hi' ? persona.hindiName : persona.name}
          </span>
          <span className="text-[8px] text-slate-500 mt-1">{persona.tone}</span>
        </button>
      ))}
    </div>
  );
};

export default PersonaSelector;
