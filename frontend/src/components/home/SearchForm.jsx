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
    <div className="card-elevated rounded-[1.75rem] lg:sticky lg:top-24 overflow-hidden shadow-2xl shadow-navy/5">
      <div className="border-b border-slate-100 bg-gradient-to-br from-slate-50 to-white px-7 py-6">
        <p className="label-section !text-teal flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal"></span>
          </span>
          Start a care route
        </p>
        <h3 className="mt-2 text-[1.35rem] font-extrabold leading-snug text-navy">Describe Your Symptoms</h3>
        <p className="mt-1.5 text-[13px] font-medium text-slate-500">
          AI matches your symptoms to the right specialist
        </p>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-6 p-7">
        <div>
          <div className="mb-3 flex items-center justify-between gap-2">
            <label className="label-section !text-slate-600">
              What symptoms are you experiencing?
            </label>
            <button
              type="button"
              onClick={startVoiceInput}
              className={`rounded-full border px-3 py-1.5 text-[11px] font-bold transition-all shadow-sm flex items-center gap-1.5 ${
                isListening
                  ? 'animate-pulse border-red-500 bg-red-500 text-white shadow-red-500/20'
                  : 'border-slate-200 bg-white text-navy hover:bg-slate-50 hover:border-teal/30'
              }`}
            >
              {isListening ? (
                <>
                  <span className="h-2 w-2 rounded-full bg-white animate-bounce"></span>
                  Listening...
                </>
              ) : (
                <>
                  <svg className="h-3.5 w-3.5 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                  Speak
                </>
              )}
            </button>
          </div>
          <textarea
            value={symptomText}
            onChange={(e) => setSymptomText(e.target.value)}
            placeholder="e.g. 'I have a dry cough, mild fever, and shortness of breath starting yesterday'..."
            rows={4}
            disabled={loading}
            className="input-field resize-none shadow-inner"
          />
        </div>

        <div>
          <label className="label-section !text-slate-600 mb-3 block">Select City</label>
          <div className="relative group">
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              disabled={loading}
              className="input-field cursor-pointer appearance-none bg-slate-50/50 pr-10 font-bold transition-colors group-hover:bg-white"
            >
              {cities.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-teal group-hover:text-teal-dark transition-colors">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <div>
          <p className="label-section !text-slate-600 mb-3">Quick Symptoms</p>
          <div className="flex flex-wrap gap-2">
            {quickSymptoms.map((s) => (
              <button
                key={s.label}
                type="button"
                onClick={() => setSymptomText(s.text)}
                disabled={loading}
                className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-600 transition-all hover:border-teal hover:bg-teal/5 hover:text-teal hover:shadow-sm disabled:opacity-50"
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-gradient-to-r from-red-50 to-white p-4 shadow-sm animate-fade-in-up">
            <div className="rounded-full bg-red-100 p-1">
              <svg className="h-4 w-4 shrink-0 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <p className="text-[13px] font-bold text-red-900 leading-snug">{error}</p>
              <button type="button" onClick={() => { setError(''); onSubmit({ preventDefault: () => {} }) }}
                className="mt-1.5 text-xs font-bold text-red-600 hover:text-red-700 hover:underline transition-colors">
                Try Again
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center gap-3.5 rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-6 shadow-inner animate-fade-in-up">
            <div className="relative flex items-center justify-center h-12 w-12">
              <div className="absolute inset-0 rounded-full border-[3px] border-slate-200"></div>
              <div className="absolute inset-0 rounded-full border-[3px] border-t-teal border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
            </div>
            <p className="text-[15px] font-extrabold text-navy">{loadingPhase}</p>
            <p className="max-w-[280px] text-center text-[11px] font-medium leading-relaxed text-amber-700 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-100">
              Note: Backend hosted on a free Render instance can take up to 50 seconds to initialize during cold starts.
            </p>
            <div className="mt-1 h-1.5 w-40 overflow-hidden rounded-full bg-slate-200">
              <div className="h-full rounded-full bg-gradient-to-r from-teal-light to-teal transition-all duration-700 ease-out"
                style={{ width: loadingPhase.includes('Analyzing') ? '45%' : '90%' }} />
            </div>
          </div>
        ) : (
          <button type="submit" className="btn-primary w-full group py-3.5 mt-2">
            Find My Doctor
            <svg className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        )}

        <p className="text-center text-[11px] font-medium text-slate-400 mt-2">
          Navigation only · Not a substitute for professional medical advice
        </p>
      </form>
    </div>
  )
}
