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
    <div className="rounded-3xl border border-border bg-white shadow-2xl shadow-navy/10">
      <div className="flex items-center justify-between gap-6 border-b border-border px-10 py-8 min-h-[100px]">
        <div>
          <p className="text-xs font-semibold uppercase text-teal">Start a care route</p>
          <h3 className="mt-2 text-3xl font-bold text-navy">Describe Your Symptoms</h3>
        </div>
        <div className="hidden rounded-2xl bg-bg px-6 py-4 text-right sm:block">
          <p className="text-xs font-semibold uppercase text-text-muted">City</p>
          <p className="text-base font-bold text-navy">{city}</p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-8 p-10 md:p-7">
        <div>
          <label className="mb-3 block text-base font-semibold text-navy">Symptoms</label>
          <div>
            <textarea
              value={symptomText}
              onChange={(e) => setSymptomText(e.target.value)}
              placeholder="Example: I have chest pain and difficulty breathing..."
              rows={7}
              className="min-h-48 w-full resize-none rounded-2xl border border-border bg-bg px-5 py-5 text-lg text-text outline-none focus:border-teal focus:bg-white focus:ring-4 focus:ring-teal/10 transition-all"
              disabled={loading}
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-[0.95fr_1.05fr]">
          <div>
            <label className="mb-3 block text-base font-semibold text-navy">Current City</label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="h-16 w-full rounded-2xl border border-border bg-white px-5 py-4 text-lg font-semibold text-text outline-none focus:border-teal focus:ring-4 focus:ring-teal/10 transition-all"
              disabled={loading}
            >
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <p className="mb-3 text-base font-semibold text-navy">Quick Symptoms</p>
            <div className="grid grid-cols-2 gap-4">
              {quickSymptoms.map((sample) => (
                <button
                  key={sample.label}
                  type="button"
                  onClick={() => setSymptomText(sample.text)}
                  className="rounded-xl border border-border bg-bg px-4 py-4 text-center text-sm font-semibold text-navy hover:border-teal hover:bg-teal/10 hover:text-teal transition-all hover:shadow-md min-h-[60px] flex items-center justify-center"
                  disabled={loading}
                >
                  {sample.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">⚠️</span>
              <div className="flex-1">
                <div className="font-bold text-red-800 mb-1">AI Analysis Temporarily Unavailable</div>
                <div className="text-red-600 text-sm mb-3">{error}</div>
                <button
                  type="button"
                  onClick={() => {
                    setError('')
                    onSubmit({ preventDefault: () => {} })
                  }}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-700 transition-all"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="rounded-2xl border border-border bg-white p-8 shadow-md">
            <div className="flex flex-col items-center text-center">
              <div className="mb-5">
                <div className="inline-block h-14 w-14 animate-spin rounded-full border-4 border-teal border-t-transparent"></div>
              </div>
              <div className="text-xl font-bold text-navy mb-3">{loadingPhase}</div>
              <div className="w-full max-w-sm bg-gray-200 rounded-full h-3 mb-4">
                <div
                  className="bg-teal h-3 rounded-full transition-all duration-500"
                  style={{ width: loadingPhase.includes('Analyzing') ? '45%' : '90%' }}
                ></div>
              </div>
              <div className="text-base font-medium text-text-muted">
                {loadingPhase.includes('Analyzing') ? 'AI is processing your symptoms...' : 'Finding the best doctors...'}
              </div>
            </div>
          </div>
        ) : (
          <button
            type="submit"
            className="min-h-16 w-full rounded-2xl bg-teal px-6 py-5 text-lg font-semibold text-white shadow-xl shadow-teal/20 hover:bg-teal-light focus:outline-none focus:ring-4 focus:ring-teal/20 transition-all hover:shadow-2xl hover:scale-[1.02]"
          >
            Find My Doctor
          </button>
        )}
      </form>
    </div>
  )
}
