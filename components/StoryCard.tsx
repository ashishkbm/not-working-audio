
import React, { useState, useRef, useEffect } from 'react';
import { Story } from '../types';
import { decode, decodeAudioData, createWavBlob } from '../utils/audioUtils';

interface StoryCardProps {
  story: Story;
  onDelete?: (id: string) => void;
}

const StoryCard: React.FC<StoryCardProps> = ({ story, onDelete }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [loadingAudio, setLoadingAudio] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);

  const togglePlayback = async () => {
    if (isPlaying) {
      sourceNodeRef.current?.stop();
      setIsPlaying(false);
      return;
    }

    if (!story.audioBase64) return;

    try {
      setLoadingAudio(true);
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }

      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }

      const audioBuffer = await decodeAudioData(
        decode(story.audioBase64),
        ctx,
        24000,
        1
      );

      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(ctx.destination);
      source.onended = () => setIsPlaying(false);
      
      sourceNodeRef.current = source;
      source.start();
      setIsPlaying(true);
    } catch (err) {
      console.error("Playback failed", err);
    } finally {
      setLoadingAudio(false);
    }
  };

  const handleDownload = () => {
    if (!story.audioBase64) return;
    const blob = createWavBlob(story.audioBase64);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${story.title.replace(/\s+/g, '_')}_fablespeak.wav`;
    a.click();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    return () => {
      sourceNodeRef.current?.stop();
    };
  }, []);

  return (
    <div className="glass-effect p-6 rounded-3xl mb-6 shadow-xl border border-slate-700/50 group">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className={`text-2xl font-bold text-amber-500 italic ${story.language === 'hi' ? 'hindi-font' : 'serif-font'}`}>
            {story.title}
          </h3>
          <p className={`text-xs text-slate-400 mt-1 ${story.language === 'hi' ? 'hindi-font' : ''}`}>
            {story.language === 'hi' 
              ? `${story.voice} • स्वर: ${story.tone}` 
              : `Narrated by ${story.voice} • Tone: ${story.tone}`}
          </p>
        </div>
        <div className="flex gap-2">
           <button
            onClick={handleDownload}
            className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-amber-500 hover:bg-slate-700 transition-all shadow-inner"
            title="Download Audio"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M7.5 12l4.5 4.5m0 0l4.5-4.5M12 3v13.5" />
            </svg>
          </button>
          
          {onDelete && (
            <button
              onClick={() => onDelete(story.id)}
              className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-slate-700 transition-all shadow-inner"
              title="Delete Story"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
            </button>
          )}

          <button
            onClick={togglePlayback}
            disabled={loadingAudio || !story.audioBase64}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
              isPlaying 
                ? 'bg-red-500 text-white hover:bg-red-600' 
                : 'bg-amber-500 text-white hover:bg-amber-600 hover:scale-105 active:scale-95 shadow-lg shadow-amber-500/20'
            } disabled:bg-slate-700 disabled:opacity-50`}
          >
            {loadingAudio ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6 ml-1">
                <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>
      </div>
      <div className="relative">
        <div className="absolute -left-2 top-0 bottom-0 w-1 bg-amber-500/30 rounded-full group-hover:bg-amber-500 transition-colors"></div>
        <p className={`text-slate-300 leading-relaxed text-lg italic whitespace-pre-wrap pl-4 ${story.language === 'hi' ? 'hindi-font' : 'serif-font'}`}>
          {story.content}
        </p>
      </div>
    </div>
  );
};

export default StoryCard;
