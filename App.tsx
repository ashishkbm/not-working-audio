
import React, { useState, useEffect } from 'react';
import { VoiceName, Story, Language } from './types';
import { generateStoryAndAudio } from './services/geminiService';
import PersonaSelector from './components/PersonaSelector';
import StoryCard from './components/StoryCard';
import { saveStoryToOffline, getAllStoriesFromOffline, deleteStoryFromOffline } from './utils/storageUtils';
import { PERSONAS } from './constants';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [selectedPersonaId, setSelectedPersonaId] = useState('kabira');
  const [language, setLanguage] = useState<Language>('hi');
  const [stories, setStories] = useState<Story[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // Load offline stories on mount
    getAllStoriesFromOffline().then(setStories);
    
    // Connectivity listeners
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleGenerate = async () => {
    if (!prompt.trim() || !isOnline) return;

    setIsGenerating(true);
    setError(null);

    try {
      const persona = PERSONAS.find(p => p.id === selectedPersonaId) || PERSONAS[0];
      const result = await generateStoryAndAudio(prompt, persona.voice, persona.tone, language);
      
      const newStory: Story = {
        id: Date.now().toString(),
        title: prompt.length > 30 ? prompt.substring(0, 30) + '...' : prompt,
        content: result.content,
        audioBase64: result.audioBase64,
        voice: persona.voice,
        tone: persona.tone,
        language: language,
        timestamp: Date.now(),
      };

      await saveStoryToOffline(newStory);
      setStories(prev => [newStory, ...prev]);
      setPrompt('');
    } catch (err: any) {
      console.error(err);
      setError(language === 'hi' ? 'कहानी बनाने में विफल। कृपया अपना इंटरनेट या एपीआई कुंजी जांचें।' : 'Failed to conjure the story. Please check your connection or API key.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteStoryFromOffline(id);
    setStories(prev => prev.filter(s => s.id !== id));
  };

  return (
    <div className="min-h-screen text-slate-100 flex flex-col selection:bg-amber-500/30">
      {/* Header */}
      <header className="py-6 px-4 border-b border-slate-800 glass-effect sticky top-0 z-50">
        <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.5)]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-slate-900">
                <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.992 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c1.477 0 2.872.392 4.07.1.58-.505.93-1.222.93-2.017V4.262a.75.75 0 00-1-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight serif-font flex items-center gap-2">
                Fable<span className="text-amber-500">Speak</span>
                {!isOnline && <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full uppercase tracking-tighter">Offline Mode</span>}
              </h1>
            </div>
          </div>

          <div className="flex bg-slate-900/80 p-1 rounded-full border border-slate-700">
            <button 
              onClick={() => setLanguage('hi')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${language === 'hi' ? 'bg-amber-500 text-slate-900 shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
            >
              हिन्दी
            </button>
            <button 
              onClick={() => setLanguage('en')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${language === 'en' ? 'bg-amber-500 text-slate-900 shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
            >
              ENGLISH
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-4xl mx-auto p-4 md:p-8">
        <section className="glass-effect rounded-3xl p-6 mb-12 shadow-2xl border border-slate-700/30">
          <h2 className={`text-xl font-bold mb-4 text-amber-500/90 flex items-center gap-2 ${language === 'hi' ? 'hindi-font' : ''}`}>
             {language === 'hi' ? 'कहानी का विषय' : 'Story Theme'}
          </h2>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={!isOnline}
            placeholder={!isOnline 
              ? (language === 'hi' ? "ऑफ़लाइन मोड: केवल पिछली कहानियाँ सुनी जा सकती हैं" : "Offline: You can only listen to saved stories")
              : (language === 'hi' ? "एक जादुई किताब के बारे में लिखें..." : "A story about a time-traveling compass...")
            }
            className={`w-full bg-slate-900/50 border border-slate-700 rounded-2xl p-4 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all text-lg leading-relaxed mb-6 disabled:opacity-50 ${language === 'hi' ? 'hindi-font' : ''}`}
          />

          <div className="space-y-6">
            <div>
              <h2 className={`text-sm font-bold mb-3 text-slate-400 uppercase tracking-widest ${language === 'hi' ? 'hindi-font' : ''}`}>
                {language === 'hi' ? '20 कथावाचक (Narrators)' : '20 Narrators Available'}
              </h2>
              <PersonaSelector selectedId={selectedPersonaId} onSelect={setSelectedPersonaId} language={language} />
            </div>
          </div>

          {error && (
            <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim() || !isOnline}
            className={`w-full mt-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${
              isGenerating || !isOnline
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                : 'bg-amber-500 text-slate-900 hover:bg-amber-400 hover:shadow-[0_0_25px_rgba(245,158,11,0.4)] active:scale-95'
            } ${language === 'hi' ? 'hindi-font' : ''}`}
          >
            {!isOnline ? (
              'Connect to Internet to Generate'
            ) : isGenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-slate-500 border-t-amber-500 rounded-full animate-spin"></div>
                {language === 'hi' ? 'कहानी बुनी जा रही है...' : 'Narrating...'}
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path fillRule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813a3.75 3.75 0 002.576-2.576l.813-2.846A.75.75 0 019 4.5zM19.307 12.438a.5.5 0 01.39.39l.248.867a1.25 1.25 0 00.859.859l.867.248a.5.5 0 010 .98l-.867.248a1.25 1.25 0 00-.859.859l-.248.867a.5.5 0 01-.98 0l-.248-.867a1.25 1.25 0 00-.859-.859l-.867-.248a.5.5 0 010-.98l.867-.248a1.25 1.25 0 00.859-.859l.248-.867a.5.5 0 01.59-.39zM18 1.5a.5.5 0 01.5.5V2h.5a.5.5 0 010 1h-.5v.5a.5.5 0 01-1 0V3h-.5a.5.5 0 010-1h.5v-.5a.5.5 0 01.5-.5z" clipRule="evenodd" />
                </svg>
                {language === 'hi' ? 'कहानी बनाएं' : 'Create Story'}
              </>
            )}
          </button>
        </section>

        <section className="space-y-8">
          {stories.length > 0 && (
            <h2 className={`text-2xl font-bold mb-6 flex items-center justify-between text-slate-300 px-2 ${language === 'hi' ? 'hindi-font' : ''}`}>
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center text-sm">{stories.length}</span>
                {language === 'hi' ? 'आपका पुस्तकालय' : 'Your Library'}
              </div>
              <span className="text-xs font-normal text-slate-500 uppercase tracking-widest">Saved Offline</span>
            </h2>
          )}
          
          {stories.map(story => (
            <StoryCard key={story.id} story={story} onDelete={handleDelete} />
          ))}

          {stories.length === 0 && !isGenerating && (
            <div className="text-center py-20 border-2 border-dashed border-slate-800 rounded-3xl">
              <h3 className={`text-xl font-medium text-slate-500 ${language === 'hi' ? 'hindi-font' : ''}`}>
                No Stories Found
              </h3>
              <p className="text-slate-600 mt-2">Generate your first story to see it here.</p>
            </div>
          )}
        </section>
      </main>

      <footer className="py-10 px-4 text-center text-slate-500 text-sm border-t border-slate-900 mt-20">
        <p>&copy; 2024 FableSpeak • Powered by Gemini AI • Native Hindi Support</p>
      </footer>
    </div>
  );
};

export default App;
