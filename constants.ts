
import { VoiceName, ToneOption, NarratorPersona, Language } from './types';

export const PERSONAS: NarratorPersona[] = [
  // Base Voices (5)
  { id: 'kore_base', name: 'Kore', hindiName: 'कोरे', voice: VoiceName.Kore, tone: 'joyful', emoji: '👩', description: 'Standard Female Voice', lang: 'en' },
  { id: 'puck_base', name: 'Puck', hindiName: 'पक', voice: VoiceName.Puck, tone: 'excited', emoji: '🧑', description: 'Standard Male Voice', lang: 'en' },
  { id: 'charon_base', name: 'Charon', hindiName: 'चरन', voice: VoiceName.Charon, tone: 'wise', emoji: '🧔', description: 'Standard Deep Voice', lang: 'en' },
  { id: 'fenrir_base', name: 'Fenrir', hindiName: 'फेन्रिर', voice: VoiceName.Fenrir, tone: 'heroic', emoji: '🐺', description: 'Strong Voice', lang: 'en' },
  { id: 'zephyr_base', name: 'Zephyr', hindiName: 'ज़ेफायर', voice: VoiceName.Zephyr, tone: 'calm', emoji: '🧚', description: 'Soft Voice', lang: 'en' },
  
  // Hindi Themed Personas (15 more)
  { id: 'kabira', name: 'Kabir', hindiName: 'कबीर', voice: VoiceName.Charon, tone: 'wise', emoji: '📜', description: 'Ancient Mystic', lang: 'hi' },
  { id: 'meera', name: 'Meera', hindiName: 'मीरा', voice: VoiceName.Zephyr, tone: 'nostalgic', emoji: '🪕', description: 'Poetic Soul', lang: 'hi' },
  { id: 'birbal', name: 'Birbal', hindiName: 'बीरबल', voice: VoiceName.Puck, tone: 'sarcastic', emoji: '🐘', description: 'Witty Advisor', lang: 'hi' },
  { id: 'tenali', name: 'Tenali', hindiName: 'तेनाली', voice: VoiceName.Puck, tone: 'mischievous', emoji: '🐒', description: 'Clever Joker', lang: 'hi' },
  { id: 'vikram', name: 'Vikram', hindiName: 'विक्रम', voice: VoiceName.Fenrir, tone: 'majestic', emoji: '⚔️', description: 'Great King', lang: 'hi' },
  { id: 'vetal', name: 'Vetal', hindiName: 'वेताल', voice: VoiceName.Charon, tone: 'spooky', emoji: '🦇', description: 'Ghost Storyteller', lang: 'hi' },
  { id: 'dadi', name: 'Dadi Maa', hindiName: 'दादी माँ', voice: VoiceName.Kore, tone: 'nostalgic', emoji: '👵', description: 'Sweet Grandmother', lang: 'hi' },
  { id: 'rani', name: 'Rani Saiba', hindiName: 'रानी साहिबा', voice: VoiceName.Kore, tone: 'majestic', emoji: '💎', description: 'Royal Queen', lang: 'hi' },
  { id: 'chotu', name: 'Chotu', hindiName: 'छोटू', voice: VoiceName.Puck, tone: 'innocent', emoji: '🍭', description: 'Childhood Friend', lang: 'hi' },
  { id: 'jadugar', name: 'Jadugar', hindiName: 'जादूगर', voice: VoiceName.Charon, tone: 'suspenseful', emoji: '🎩', description: 'Mysterious Magician', lang: 'hi' },
  { id: 'sipahi', name: 'Sipahi', hindiName: 'सिपाही', voice: VoiceName.Fenrir, tone: 'heroic', emoji: '🛡️', description: 'Brave Soldier', lang: 'hi' },
  { id: 'kavi', name: 'Kavi Raj', hindiName: 'कवि राज', voice: VoiceName.Zephyr, tone: 'dreamy', emoji: '🖋️', description: 'Ethereal Poet', lang: 'hi' },
  { id: 'shanti', name: 'Shanti', hindiName: 'शान्ति', voice: VoiceName.Zephyr, tone: 'whispering', emoji: '🧘', description: 'Peaceful Guide', lang: 'hi' },
  { id: 'toofan', name: 'Toofaan', hindiName: 'तूफान', voice: VoiceName.Puck, tone: 'excited', emoji: '🌪️', description: 'Fast Narrator', lang: 'hi' },
  { id: 'ustad', name: 'Ustad', hindiName: 'उस्ताद', voice: VoiceName.Charon, tone: 'dramatic', emoji: '🎻', description: 'Musical Storyteller', lang: 'hi' },
];

/**
 * Added AVAILABLE_VOICES to fix the import error in VoiceSelector.tsx
 */
export const AVAILABLE_VOICES = [
  { name: VoiceName.Kore, gender: 'Female' },
  { name: VoiceName.Puck, gender: 'Male' },
  { name: VoiceName.Charon, gender: 'Deep' },
  { name: VoiceName.Fenrir, gender: 'Strong' },
  { name: VoiceName.Zephyr, gender: 'Soft' },
];

export const TONE_OPTIONS: ToneOption[] = [
  { id: 'majestic', label: 'Majestic', hindiLabel: 'शाही', emoji: '👑', description: 'Grand and powerful' },
  { id: 'whispering', label: 'Whispering', hindiLabel: 'फुसफुसाते हुए', emoji: '🤫', description: 'Quiet and intimate' },
  { id: 'joyful', label: 'Joyful', hindiLabel: 'आनंदपूर्ण', emoji: '😊', description: 'Happy and energetic' },
  { id: 'spooky', label: 'Spooky', hindiLabel: 'डरावना', emoji: '👻', description: 'Eerie and mysterious' },
  { id: 'melancholy', label: 'Melancholy', hindiLabel: 'उदासी', emoji: '😢', description: 'Sad and reflective' },
  { id: 'excited', label: 'Excited', hindiLabel: 'उत्साहित', emoji: '🔥', description: 'High energy and fast' },
  { id: 'wise', label: 'Wise', hindiLabel: 'बुद्धिमान', emoji: '🧙', description: 'Ancient and knowledgeable' },
  { id: 'heroic', label: 'Heroic', hindiLabel: 'वीरतापूर्ण', emoji: '🛡️', description: 'Brave and inspiring' },
  { id: 'nostalgic', label: 'Nostalgic', hindiLabel: 'पुरानी यादें', emoji: '🕰️', description: 'Longing and sweet' },
  { id: 'sarcastic', label: 'Sarcastic', hindiLabel: 'व्यंग्यात्मक', emoji: '😏', description: 'Witty and sharp' },
  { id: 'suspenseful', label: 'Suspenseful', hindiLabel: 'रोमांचक', emoji: '🕵️', description: 'Tense and gripping' },
  { id: 'innocent', label: 'Innocent', hindiLabel: 'मासूम', emoji: '👶', description: 'Child-like and pure' },
  { id: 'grumpy', label: 'Grumpy', hindiLabel: 'गुस्सैल', emoji: '😠', description: 'Short and irritable' },
  { id: 'dreamy', label: 'Dreamy', hindiLabel: 'स्वप्निल', emoji: '☁️', description: 'Floating and ethereal' },
  { id: 'dramatic', label: 'Dramatic', hindiLabel: 'नाटकीय', emoji: '🎭', description: 'Theatrical and intense' },
];

export const GET_SYSTEM_INSTRUCTION = (lang: 'en' | 'hi') => `You are an expert storyteller. Write captivating short stories based on prompts. 
Language: ${lang === 'hi' ? 'HINDI (Use Devanagari)' : 'ENGLISH'}.
150-300 words. Output story ONLY.`;
