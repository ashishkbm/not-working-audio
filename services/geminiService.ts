
import { GoogleGenAI, Modality } from "@google/genai";
import { VoiceName, Language } from "../types";
import { GET_SYSTEM_INSTRUCTION } from "../constants";

/**
 * Initialize GoogleGenAI with the API key from environment variables.
 * Uses named parameter as per guidelines.
 */
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateStoryAndAudio(prompt: string, voice: VoiceName, tone: string, lang: Language) {
  const ai = getAI();
  
  // Phase 1: Generate the story text
  // Using gemini-3-flash-preview for the creative writing task.
  const textResponse = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      systemInstruction: GET_SYSTEM_INSTRUCTION(lang),
    }
  });

  // Extracting text output directly from the .text property.
  const storyContent = textResponse.text || "Once upon a time...";
  
  // Phase 2: Convert story to high-quality audio with tone injection
  // Prepend tone instruction for better TTS results.
  const ttsPrompt = `Speak in a ${tone} tone: ${storyContent}`;

  const ttsResponse = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: [{ parts: [{ text: ttsPrompt }] }],
    config: {
      // responseModalities must be an array with exactly one element.
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName: voice },
        },
      },
    },
  });

  // Extracting raw PCM audio data from the response candidates.
  const audioBase64 = ttsResponse.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

  return {
    content: storyContent,
    audioBase64,
  };
}
