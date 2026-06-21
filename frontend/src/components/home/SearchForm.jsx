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
    <div className="rounded-[2rem] border border-slate-200/80 bg-white shadow-2xl shadow-navy/10 overflow-hidden min-h-[580px] flex flex-col justify-between">
      <div className="bg-gradient-to-br from-navy via-navy-light to-navy px-8 py-6 border-b border-navy-light/20 relative">
        <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 text-white/5 font-black text-8xl pointer-events-none">+</div>
        <p className="text-[10px] font-black tracking-widest text-teal-light uppercase">
          Care Path Finder
        </p>
        <h3 className="text-xl font-black text-white mt-1">
          Describe Your Symptoms
        </h3>
        <p className="text-xs text-white/60 mt-1 font-medium">
          Input your details below to map your symptoms to local support
        </p>
      </div>

      <form onSubmit={onSubmit} className="p-8 flex-1 flex flex-col justify-between gap-6">
        <div className="space-y-5">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-black uppercase tracking-wider text-slate-500">
                Symptom Description
              </label>
              <button
                type="button"
                onClick={startVoiceInput}
                className={`text-xs font-extrabold flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all border ${
                  isListening
                    ? 'bg-red-500 text-white border-red-500 animate-pulse shadow-md shadow-red-200'
                    : 'bg-teal/5 text-teal border-teal/10 hover:bg-teal/10 hover:border-teal/25'
                }`}
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${isListening ? 'animate-ping bg-white' : 'bg-teal'}`} />
                  <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${isListening ? 'bg-white' : 'bg-teal'}`} />
                </span>
                {isListening ? 'Listening...' : 'Speak Symptoms'}
              </button>
            </div>
            <textarea
              value={symptomText}
              onChange={(e) => setSymptomText(e.target.value)}
              placeholder="Provide a description of your symptoms here..."
              rows={4}
              disabled={loading}
              className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm text-navy placeholder-slate-400 focus:outline-none focus:border-teal focus:ring-4 focus:ring-teal/5 focus:bg-white transition-all leading-relaxed shadow-inner"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-500">
              Select City
            </label>
            <div className="relative">
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                disabled={loading}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/30 px-4 py-3.5 text-sm font-bold text-navy focus:outline-none focus:border-teal focus:ring-4 focus:ring-teal/5 focus:bg-white transition-all appearance-none cursor-pointer"
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
            <p className="mb-2 text-xs font-black uppercase tracking-wider text-slate-500">Quick Diagnostics</p>
            <div className="flex flex-wrap gap-2">
              {quickSymptoms.map((s) => (
                <button
                  key={s.label}
                  type="button"
                  onClick={() => setSymptomText(s.text)}
                  disabled={loading}
                  className="flex items-center gap-1.5 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-white px-3 py-2 text-xs font-bold text-navy hover:border-teal/30 hover:shadow-sm hover:-translate-y-0.5 transition-all cursor-pointer"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-teal shrink-0" />
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {error && (
            <div className="rounded-2xl border border-red-100 bg-red-50/50 p-4 flex items-start gap-3">
              <svg className="h-5 w-5 text-red-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <p className="text-xs font-bold text-red-900">{error}</p>
                <button type="button" onClick={() => { setError(''); onSubmit({ preventDefault: () => {} }) }}
                  className="mt-1 text-xs font-black text-red-600 underline">Try Again</button>
              </div>
            </div>
          )}

          {loading ? (
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 flex flex-col items-center gap-3">
              <div className="h-8 w-8 rounded-full border-4 border-teal/15 border-t-teal animate-spin" />
              <p className="text-xs font-extrabold text-navy uppercase tracking-wider">{loadingPhase}</p>
              <p className="text-[10px] text-center text-amber-600 font-extrabold max-w-xs animate-pulse">
                Note: Backend hosted on a free Render instance can take up to 50 seconds to initialize during cold starts.
              </p>
              <div className="w-full max-w-[200px] bg-slate-200 rounded-full h-1 overflow-hidden">
                <div className="bg-teal h-1 rounded-full transition-all duration-500"
                  style={{ width: loadingPhase.includes('Analyzing') ? '45%' : '90%' }} />
              </div>
            </div>
          ) : (
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-2xl py-4 text-sm font-black text-white cursor-pointer hover:opacity-95 shadow-lg shadow-teal/25 hover:shadow-xl hover:shadow-teal/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
              style={{ background: 'linear-gradient(135deg, #028090, #015D69)' }}
            >
              Find My Doctor
              <svg className="h-4 w-4 text-teal-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          )}

          <p className="text-center text-[9px] text-slate-400 font-bold uppercase tracking-wider">
            Navigation only · Not a substitute for professional medical advice
          </p>
        </div>
      </form>
    </div>
  )
}