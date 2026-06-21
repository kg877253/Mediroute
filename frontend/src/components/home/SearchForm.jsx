const cities = ['Delhi', 'Mumbai', 'Jaipur', 'Goa', 'Bangalore']
const quickSymptoms = [
  { label: 'Chest pain', text: 'I have chest pain and difficulty breathing' },
  { label: 'Skin rash', text: 'I have an itchy skin rash on my arm' },
  { label: 'Tooth pain', text: 'My tooth hurts badly when I eat' },
  { label: 'Child fever', text: 'My child has fever and cough' },
  { label: 'Ear pain', text: 'I have ear pain and blocked nose' },
  { label: 'Headache', text: 'I have severe headache with nausea' }
]

export default function SearchForm({
  symptomText, setSymptomText,
  city, setCity,
  loading, loadingPhase,
  error, setError,
  onSubmit
}) {
  return (
    <section className="rounded-[14px] border border-hairline-gray bg-linen-white p-[35px] md:p-[42px]">
      <div className="mb-[28px]">
        <div className="inline-flex rounded-full bg-mist-blue px-[14px] py-[7px] text-[12px] font-normal text-forest-ink">
          Start a care route
        </div>
        <h3 className="font-display mt-[14px] text-[40px] font-light leading-[1.15] tracking-[-0.4px] text-forest-ink">
          Describe symptoms
        </h3>
        <p className="mt-[11px] text-[14px] font-normal leading-[1.5] text-charcoal">
          The app recommends a specialty and searches verified doctors in your selected city.
        </p>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-[21px]">
        <div>
          <label className="mb-[9px] block text-[12px] font-normal uppercase text-charcoal">
            Symptoms
          </label>
          <textarea
            value={symptomText}
            onChange={(e) => setSymptomText(e.target.value)}
            placeholder="Example: I have a dry cough, mild fever, and shortness of breath..."
            rows={6}
            disabled={loading}
            className="w-full resize-none rounded-[14px] border border-hairline-gray bg-linen px-[21px] py-[18px] text-[18px] font-normal leading-[1.5] text-true-black outline-none placeholder:text-graphite/60 focus:border-forest-ink focus:bg-linen-white"
          />
        </div>

        <div className="grid gap-[21px] md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <label className="mb-[9px] block text-[12px] font-normal uppercase text-charcoal">
              City
            </label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              disabled={loading}
              className="h-[56px] w-full rounded-[14px] border border-hairline-gray bg-linen-white px-[21px] text-[14px] font-normal text-true-black outline-none focus:border-forest-ink"
            >
              {cities.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <p className="mb-[9px] text-[12px] font-normal uppercase text-charcoal">Quick symptoms</p>
            <div className="flex flex-wrap gap-[9px]">
              {quickSymptoms.map((s) => (
                <button
                  key={s.label}
                  type="button"
                  onClick={() => setSymptomText(s.text)}
                  disabled={loading}
                  className="rounded-full bg-mist-blue px-[14px] py-[7px] text-[12px] font-normal text-forest-ink hover:bg-mint-veil"
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {error && (
          <div className="rounded-[14px] border border-red-200 bg-red-50 px-[21px] py-[14px] text-[14px] font-normal leading-[1.5] text-red-700">
            <p>{error}</p>
            <button
              type="button"
              onClick={() => { setError(''); onSubmit({ preventDefault: () => {} }) }}
              className="mt-[7px] underline"
            >
              Try again
            </button>
          </div>
        )}

        {loading ? (
          <div className="rounded-[14px] border border-hairline-gray bg-linen px-[21px] py-[18px]">
            <p className="text-[14px] font-normal text-forest-ink">{loadingPhase}</p>
            <div className="mt-[14px] h-[4px] overflow-hidden rounded-full bg-hairline-gray">
              <div
                className="h-[4px] rounded-full bg-forest-ink"
                style={{ width: loadingPhase.includes('Analyzing') ? '45%' : '90%' }}
              />
            </div>
          </div>
        ) : (
          <button
            type="submit"
            className="inline-flex min-h-[56px] items-center justify-center rounded-[14px] bg-forest-ink px-[21px] py-[14px] text-[14px] font-normal text-linen-white hover:bg-navy-light"
          >
            Find My Doctor
          </button>
        )}

        <p className="text-center text-[12px] font-normal text-charcoal">
          Navigation only. Not a substitute for professional medical advice.
        </p>
      </form>
    </section>
  )
}
