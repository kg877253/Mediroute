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
    <div className="rounded-3xl border border-slate-100 bg-white shadow-sm overflow-hidden">
      <div className="flex items-center justify-between gap-6 border-b border-slate-100 px-8 py-6 bg-slate-50/50">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-teal">Start a care route</p>
          <h3 className="mt-1 text-2xl font-extrabold text-navy">Describe Your Symptoms</h3>
        </div>
        <div className="hidden rounded-xl bg-white border border-slate-100 px-4 py-2.5 text-right sm:block shadow-sm shrink-0">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Search City</p>
          <p className="text-sm font-extrabold text-navy mt-0.5">{city}</p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="p-8 space-y-6">
        <div>
          <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">What symptoms are you experiencing?</label>
          <div className="relative">
            <textarea
              value={symptomText}
              onChange={(e) => setSymptomText(e.target.value)}
              placeholder="Describe your symptoms in detail (e.g. 'I have a dry cough, mild fever, and shortness of breath starting yesterday')..."
              rows={5}
              className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-4 text-base text-navy placeholder-slate-400 outline-none focus:border-teal focus:bg-white focus:ring-4 focus:ring-teal/5 transition-all leading-relaxed"
              disabled={loading}
            />
          </div>
        </div>

        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">Select City</label>
            <div className="relative">
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-3.5 text-base font-semibold text-navy outline-none appearance-none focus:border-teal focus:ring-4 focus:ring-teal/5 transition-all shadow-sm cursor-pointer"
                disabled={loading}
              >
                {cities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <span className="mb-2.5 block text-xs font-bold uppercase tracking-wider text-slate-500">Quick Symptoms</span>
            <div className="flex flex-wrap gap-2">
              {quickSymptoms.map((sample) => (
                <button
                  key={sample.label}
                  type="button"
                  onClick={() => setSymptomText(sample.text)}
                  className="rounded-xl border border-slate-100 bg-slate-50/50 px-3.5 py-2 text-left text-xs font-semibold text-navy hover:border-teal/30 hover:bg-teal/5 hover:text-teal transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                  disabled={loading}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-teal shrink-0"></span>
                  <span>{sample.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {error && (
          <div className="rounded-2xl border border-red-100 bg-red-50/50 p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-red-950">AI Analysis Error</h4>
                <p className="text-xs text-red-700 mt-1 leading-relaxed">{error}</p>
                <button
                  type="button"
                  onClick={() => {
                    setError('')
                    onSubmit({ preventDefault: () => {} })
                  }}
                  className="mt-3 inline-flex items-center justify-center rounded-xl bg-red-600 px-4 py-2 text-xs font-semibold text-white hover:bg-red-700 transition-all shadow-sm"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-6">
            <div className="flex flex-col items-center text-center">
              <div className="relative flex items-center justify-center mb-4">
                <div className="h-12 w-12 rounded-full border-4 border-teal/10 border-t-teal animate-spin"></div>
              </div>
              <h4 className="text-base font-bold text-navy">{loadingPhase}</h4>
              
              <div className="w-full bg-slate-200 rounded-full h-1.5 mt-3 max-w-xs overflow-hidden">
                <div
                  className="bg-teal h-1.5 rounded-full transition-all duration-500 ease-out animate-pulse-subtle"
                  style={{ width: loadingPhase.includes('Analyzing') ? '45%' : '90%' }}
                ></div>
              </div>
              
              <p className="text-xs font-semibold text-slate-400 mt-2">
                {loadingPhase.includes('Analyzing') ? 'AI is processing your symptoms...' : 'Finding verified local doctors...'}
              </p>
            </div>
          </div>
        ) : (
          <button
            type="submit"
            className="w-full inline-flex min-h-[52px] items-center justify-center rounded-2xl bg-gradient-to-r from-teal to-teal-dark px-6 py-4 text-base font-bold text-white shadow-md shadow-teal/10 hover:shadow-lg hover:shadow-teal/20 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
          >
            Find My Doctor
          </button>
        )}
      </form>
    </div>
  )
}
