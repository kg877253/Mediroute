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
    <div className="card-clinical overflow-hidden">
      <div className="border-b border-slate-100 border-l-4 border-l-teal bg-white px-6 py-5">
        <p className="text-xs font-bold uppercase tracking-wider text-teal">
          Start a care route
        </p>
        <h3 className="mt-1 text-xl font-extrabold leading-tight text-navy">
          Describe Your Symptoms
        </h3>
        <p className="mt-1 text-xs text-slate-500">
          AI matches your symptoms to the right specialist
        </p>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-5 p-6">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="label-section">
              What symptoms are you experiencing?
            </label>
            <button
              type="button"
              onClick={startVoiceInput}
              className={`flex items-center gap-1.5 rounded-lg border px-3 py-1 text-xs font-bold transition-all ${
                isListening
                  ? 'animate-pulse border-red-500 bg-red-500 text-white'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-teal/30 hover:text-teal'
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
            className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3.5 text-sm leading-relaxed text-navy placeholder-slate-400 outline-none transition-all focus:border-teal focus:bg-white focus:ring-2 focus:ring-teal/10"
          />
        </div>

        <div>
          <label className="label-section mb-2 block">
            Select City
          </label>
          <div className="relative">
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              disabled={loading}
              className="w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-navy outline-none transition-all focus:border-teal focus:ring-2 focus:ring-teal/10"
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
          <p className="label-section mb-2">Quick Symptoms</p>
          <div className="flex flex-wrap gap-2">
            {quickSymptoms.map((s) => (
              <button
                key={s.label}
                type="button"
                onClick={() => setSymptomText(s.text)}
                disabled={loading}
                className="flex cursor-pointer items-center gap-1.5 rounded-xl border border-slate-100 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-navy transition-all hover:border-slate-200 hover:bg-white disabled:opacity-50"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300" />
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="flex items-start gap-2.5 rounded-xl border border-red-100 bg-red-50 p-3">
            <svg className="mt-0.5 h-4 w-4 shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
          <div className="flex flex-col items-center gap-2.5 rounded-xl border border-slate-100 bg-slate-50 p-5">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-teal" />
            <p className="text-sm font-bold text-navy">{loadingPhase}</p>
            <p className="max-w-xs animate-pulse text-center text-[10px] font-semibold text-amber-600">
              Note: Backend hosted on a free Render instance can take up to 50 seconds to initialize during cold starts.
            </p>
            <div className="h-1 w-36 overflow-hidden rounded-full bg-slate-200">
              <div className="h-1 rounded-full bg-teal transition-all duration-500"
                style={{ width: loadingPhase.includes('Analyzing') ? '45%' : '90%' }} />
            </div>
          </div>
        ) : (
          <button
            type="submit"
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-teal py-3.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-teal-dark hover:shadow-md active:translate-y-px"
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
