export default function Hero() {
  return (
    <div className="rounded-3xl border border-border bg-white p-10 md:p-7 shadow-xl shadow-navy/5 min-h-[400px] flex flex-col justify-center">
      <div className="inline-flex w-fit rounded-full border border-teal/20 bg-teal/10 px-4 py-2 text-xs font-semibold uppercase text-teal">
        Gemini 2.5 Flash triage navigation
      </div>

      <h2 className="mt-8 text-4xl font-bold leading-tight text-navy md:text-[48px]">
        Find the right specialist in under 60 seconds.
      </h2>

      <p className="mt-6 max-w-2xl text-lg leading-9 text-text-muted">
        MediRoute turns symptoms into a safe care route: specialty, urgency, verified doctors, fee range, and emergency guidance.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-3">
        <div className="rounded-2xl bg-bg p-6 transition-all hover:shadow-md min-h-[100px] flex flex-col justify-center">
          <p className="text-4xl font-bold text-navy">8</p>
          <p className="text-sm font-semibold uppercase text-text-muted">Specialties</p>
        </div>
        <div className="rounded-2xl bg-bg p-6 transition-all hover:shadow-md min-h-[100px] flex flex-col justify-center">
          <p className="text-4xl font-bold text-navy">5</p>
          <p className="text-sm font-semibold uppercase text-text-muted">Cities</p>
        </div>
        <div className="rounded-2xl bg-bg p-6 transition-all hover:shadow-md min-h-[100px] flex flex-col justify-center">
          <p className="text-4xl font-bold text-navy">112</p>
          <p className="text-sm font-semibold uppercase text-text-muted">Emergency</p>
        </div>
      </div>

      <div className="mt-10 rounded-2xl border border-border bg-bg p-6">
        <p className="text-sm font-semibold uppercase text-teal">How the route works</p>
        <div className="mt-5 grid gap-4">
          {['Describe symptoms', 'AI selects safe specialty', 'Doctors sorted by rating'].map((step, index) => (
            <div key={step} className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm transition-all hover:shadow-md min-h-[60px]">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy text-base font-bold text-white">
                {index + 1}
              </span>
              <span className="text-base font-semibold text-navy">{step}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 px-6 py-4 text-base font-medium leading-7 text-amber-950">
        Navigation support only. MediRoute never provides a definitive medical diagnosis.
      </p>
    </div>
  )
}
