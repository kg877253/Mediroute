import { useState } from 'react'

const cities = ['Delhi', 'Mumbai', 'Jaipur', 'Goa', 'Bangalore']
const quickSymptoms = [
  { label: 'Chest pain', text: 'I have chest pain and difficulty breathing' },
  { label: 'Skin rash', text: 'I have an itchy skin rash on my arm' },
  { label: 'Tooth pain', text: 'My tooth hurts badly when I eat' },
  { label: 'Child fever', text: 'My child has fever and cough' },
  { label: 'Ear pain', text: 'I have ear pain and blocked nose' },
  { label: 'Severe headache', text: 'I have severe headache with nausea' }
]

export default function SearchForm({
  symptomText, setSymptomText,
  city, setCity,
  loading, loadingPhase,
  error, setError,
  onSubmit
}) {
  const [isListening, setIsListening] = useState(false)

  const startVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported on this browser.")
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = 'en-IN'
    recognition.continuous = false

    recognition.onstart = () => setIsListening(true)
    recognition.onend = () => setIsListening(false)

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      setSymptomText(transcript)
    }

    recognition.start()
  }

  return (
    <div style={{
      borderRadius: '1.5rem',
      border: '1px solid #e2e8f0',
      background: '#ffffff',
      boxShadow: '0 4px 24px rgba(30,39,97,0.08)',
      overflow: 'hidden'
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #1E2761 0%, #2E3B87 100%)',
        padding: '1.25rem 1.5rem'
      }}>
        <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#039EAF', margin: 0 }}>
          Start a care route
        </p>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', margin: '0.25rem 0 0', lineHeight: 1.2 }}>
          Describe Your Symptoms
        </h3>
        <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', margin: '0.25rem 0 0' }}>
          AI matches your symptoms to the right specialist
        </p>
      </div>

      <form onSubmit={onSubmit} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              What symptoms are you experiencing?
            </label>
            <button
              type="button"
              onClick={startVoiceInput}
              className={`text-xs font-bold flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all border ${
                isListening
                  ? 'bg-red-500 text-white border-red-500 animate-pulse'
                  : 'bg-teal/5 text-teal border-teal/10 hover:bg-teal/10'
              }`}
            >
              <span>{isListening ? 'Listening...' : 'Speak Symptoms'}</span>
            </button>
          </div>
          <textarea
            value={symptomText}
            onChange={(e) => setSymptomText(e.target.value)}
            placeholder="e.g. 'I have a dry cough, mild fever, and shortness of breath starting yesterday'..."
            rows={4}
            disabled={loading}
            className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-navy placeholder-slate-400 outline-none focus:border-teal focus:bg-white transition-all leading-relaxed"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
            Select City
          </label>
          <div className="relative">
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              disabled={loading}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-navy outline-none appearance-none cursor-pointer"
            >
              {cities.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <div>
          <p className="mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">Quick Symptoms</p>
          <div className="flex flex-wrap gap-2">
            {quickSymptoms.map((s) => (
              <button
                key={s.label}
                type="button"
                onClick={() => setSymptomText(s.text)}
                disabled={loading}
                className="flex items-center gap-1.5 rounded-lg border border-slate-100 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-navy hover:border-teal/40 hover:bg-teal/5 hover:text-teal transition-all cursor-pointer"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-teal shrink-0" />
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="rounded-xl border border-red-100 bg-red-50 p-3 flex items-start gap-2.5">
            <svg className="h-4 w-4 text-red-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <p className="text-xs font-bold text-red-900">{error}</p>
              <button type="button" onClick={() => { setError(''); onSubmit({ preventDefault: () => {} }) }}
                className="mt-1 text-xs font-bold text-red-600 underline">Try Again</button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 flex flex-col items-center gap-2.5">
            <div className="h-8 w-8 rounded-full border-4 border-teal/10 border-t-teal animate-spin" />
            <p className="text-sm font-bold text-navy">{loadingPhase}</p>
            <p className="text-[10px] text-center text-amber-600 font-semibold max-w-xs animate-pulse">
              Note: Backend hosted on a free Render instance can take up to 50 seconds to initialize during cold starts.
            </p>
            <div className="w-36 bg-slate-200 rounded-full h-1 overflow-hidden">
              <div className="bg-teal h-1 rounded-full transition-all duration-500"
                style={{ width: loadingPhase.includes('Analyzing') ? '45%' : '90%' }} />
            </div>
          </div>
        ) : (
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-white cursor-pointer transition-all hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0"
            style={{ background: 'linear-gradient(135deg, #028090, #015D69)', boxShadow: '0 4px 14px rgba(2,128,144,0.35)' }}
          >
            Find My Doctor
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        )}

        <p className="text-center text-[10px] text-slate-400">
          Navigation only · Not a substitute for professional medical advice
        </p>
      </form>
    </div>
  )
}