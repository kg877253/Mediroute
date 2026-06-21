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
  symptomText,
  setSymptomText,
  city,
  setCity,
  loading,
  loadingPhase,
  error,
  setError,
  onSubmit
}) {
  return (
    <div className="rounded-3xl border border-slate-100 bg-white shadow-lg overflow-hidden">
      {/* Card Header — fixed: stacked layout instead of flex row to prevent clipping */}
      <div className="border-b border-slate-100 px-7 py-5 bg-gradient-to-br from-navy to-navy-light">
        <p className="text-[10px] font-bold uppercase tracking-widest text-teal-light">
          Start a care route
        </p>
        <h3 className="mt-1 text-xl font-extrabold text-white leading-tight">
          Describe Your Symptoms
        </h3>
        <p className="mt-1 text-xs text-white/50">
          AI matches your symptoms to the right specialist
        </p>
      </div>

      <form onSubmit={onSubmit} className="p-6 space-y-5">
        {/* Symptom Textarea */}
        <div>
          <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
            What symptoms are you experiencing?
          </label>
          <textarea
            value={symptomText}
            onChange={(e) => setSymptomText(e.target.value)}
            placeholder="e.g. 'I have a dry cough, mild fever, and shortness of breath starting yesterday'..."
            rows={4}
            className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm text-navy placeholder-slate-400 outline-none focus:border-teal focus:bg-white focus:ring-4 focus:ring-teal/5 transition-all leading-relaxed"
            disabled={loading}
          />
        </div>

        {/* City Selector */}
        <div>
          <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
            Select City
          </label>
          <div className="relative">
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-navy outline-none appearance-none focus:border-teal focus:ring-4 focus:ring-teal/5 transition-all shadow-sm cursor-pointer"
              disabled={loading}
            >
              {cities.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Quick Symptom Chips */}
        <div>
          <span className="mb-2.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
            Quick Symptoms
          </span>
          <div className="flex flex-wrap gap-2">
            {quickSymptoms.map((sample) => (
              <button
                key={sample.label}
                type="button"
                onClick={() => setSymptomText(sample.text)}
                className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-navy hover:border-teal/40 hover:bg-teal/5 hover:text-teal transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                disabled={loading}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-teal shrink-0"></span>
                {sample.label}
              </button>
            ))}
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="rounded-2xl border border-red-100 bg-red-50/50 p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-red-950">Connection Error</h4>
                <p className="text-xs text-red-700 mt-0.5 leading-relaxed">{error}</p>
                <button
                  type="button"
                  onClick={() => { setError(''); onSubmit({ preventDefault: () => {} }) }}
                  className="mt-2 inline-flex items-center rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700 transition-all"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-5">
            <div className="flex flex-col items-center text-center gap-3">
              <div className="h-10 w-10 rounded-full border-4 border-teal/10 border-t-teal animate-spin" />
              <div>
                <h4 className="text-sm font-bold text-navy">{loadingPhase}</h4>
                <div className="w-48 bg-slate-200 rounded-full h-1 mt-2 mx-auto overflow-hidden">
                  <div
                    className="bg-teal h-1 rounded-full transition-all duration-500"
                    style={{ width: loadingPhase.includes('Analyzing') ? '45%' : '90%' }}
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1.5">
                  {loadingPhase.includes('Analyzing') ? 'Gemini AI is processing...' : 'Finding verified doctors...'}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            type="submit"
            className="w-full inline-flex min-h-[50px] items-center justify-center gap-2 rounded-2xl bg-teal hover:bg-teal-dark px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-teal/20 hover:shadow-lg hover:shadow-teal/30 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
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
