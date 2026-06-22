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
    <div className="card-elevated lg:sticky lg:top-32 overflow-hidden">
      <div className="border-b border-slate-100 px-8 py-8 bg-white">
        <p className="label-section flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal"></span>
          </span>
          Start a care route
        </p>
        <h3 className="mt-4 text-3xl font-bold leading-tight text-navy">Describe Your Symptoms</h3>
        <p className="mt-2 text-sm text-slate-500">
          AI matches your symptoms to the right specialist in seconds.
        </p>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-8 p-8 bg-white">
        <div>
          <div className="mb-4 flex items-center justify-between gap-2">
            <label className="text-sm font-semibold text-slate-700">
              What symptoms are you experiencing?
            </label>
            <button
              type="button"
              onClick={startVoiceInput}
              className={`rounded-full border px-4 py-2 text-xs font-bold transition-all flex items-center gap-2 ${
                isListening
                  ? 'animate-pulse border-red-500 bg-red-500 text-white'
                  : 'border-slate-200 bg-white text-navy hover:bg-slate-50 hover:border-teal'
              }`}
            >
              {isListening ? (
                <>
                  <span className="h-2 w-2 rounded-full bg-white animate-bounce"></span>
                  Listening...
                </>
              ) : (
                <>
                  <svg className="h-4 w-4 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
            className="input-field"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-700 mb-4 block">Select City</label>
          <div className="relative group">
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              disabled={loading}
              className="input-field cursor-pointer appearance-none pr-10 font-medium"
            >
              {cities.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <div className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-teal">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-700 mb-4">Quick Symptoms</p>
          <div className="flex flex-wrap gap-3">
            {quickSymptoms.map((s) => (
              <button
                key={s.label}
                type="button"
                onClick={() => setSymptomText(s.text)}
                disabled={loading}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition-all hover:border-teal hover:bg-slate-50 hover:text-teal disabled:opacity-50"
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="flex items-start gap-4 rounded-2xl bg-red-50 p-5">
            <div className="rounded-full bg-red-100 p-2 shrink-0">
              <svg className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-red-900">{error}</p>
              <button type="button" onClick={() => { setError(''); onSubmit({ preventDefault: () => {} }) }}
                className="mt-2 text-sm font-bold text-red-600 hover:text-red-700">
                Try Again
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center gap-4 rounded-3xl bg-slate-50 p-8">
            <div className="relative flex items-center justify-center h-16 w-16">
              <div className="absolute inset-0 rounded-full border-4 border-slate-200"></div>
              <div className="absolute inset-0 rounded-full border-4 border-t-teal border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
            </div>
            <p className="text-lg font-bold text-navy">{loadingPhase}</p>
            <p className="text-center text-xs font-medium text-amber-700 bg-amber-50 px-4 py-2 rounded-xl">
              Backend hosted on free Render instance can take up to 50 seconds to wake up.
            </p>
            <div className="mt-2 h-2 w-full max-w-[200px] overflow-hidden rounded-full bg-slate-200">
              <div className="h-full rounded-full bg-teal transition-all duration-700 ease-out"
                style={{ width: loadingPhase.includes('Analyzing') ? '45%' : '90%' }} />
            </div>
          </div>
        ) : (
          <button type="submit" className="btn-primary w-full group py-4 mt-2">
            Find My Doctor
            <svg className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        )}
      </form>
    </div>
  )
}
