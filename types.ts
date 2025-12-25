
export enum VoiceName {
  Kore = 'Kore',
  Puck = 'Puck',
  Charon = 'Charon',
  Fenrir = 'Fenrir',
  Zephyr = 'Zephyr'
}

export type Language = 'en' | 'hi';

export interface Story {
  id: string;
  title: string;
  content: string;
  audioBase64?: string;
  voice: VoiceName;
  tone: string;
  language: Language;
  timestamp: number;
}

export interface NarratorPersona {
  id: string;
  name: string;
  hindiName: string;
  voice: VoiceName;
  tone: string;
  emoji: string;
  description: string;
  lang: Language;
}

export interface ToneOption {
  id: string;
  label: string;
  hindiLabel: string;
  emoji: string;
  description: string;
}
