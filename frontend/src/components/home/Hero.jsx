export default function Hero() {
  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-8 md:p-10 shadow-sm relative overflow-hidden flex flex-col justify-center">
      {/* Decorative background grid subtle overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      
      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 rounded-full bg-teal/5 border border-teal/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-teal shadow-sm">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-teal"></span>
          </span>
          Powered by Gemini 2.5 Flash
        </div>

        <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl md:text-[44px] md:leading-[1.15]">
          Find the right specialist <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal to-teal-dark">in under 60 seconds.</span>
        </h2>

        <p className="mt-5 text-base leading-relaxed text-slate-500 max-w-xl">
          MediRoute transforms your symptoms into a verified care route: identifying the correct clinical specialty, urgency rating, and local doctors.
        </p>

        {/* Stats Grid */}
        <div className="mt-8 grid gap-4 grid-cols-3">
          <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-4 transition-all hover:bg-slate-50/80 hover:shadow-sm">
            <p className="text-3.5xl font-extrabold text-navy tracking-tight">8</p>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-1">Specialties</p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-4 transition-all hover:bg-slate-50/80 hover:shadow-sm">
            <p className="text-3.5xl font-extrabold text-navy tracking-tight">5</p>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-1">Cities</p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-4 transition-all hover:bg-slate-50/80 hover:shadow-sm">
            <p className="text-3.5xl font-extrabold text-red-600 tracking-tight">24/7</p>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-1">Emergency</p>
          </div>
        </div>

        {/* Route Steps */}
        <div className="mt-8 border border-slate-100 bg-slate-50/30 rounded-2xl p-6">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Your Care Route Journey</p>
          <div className="mt-4 space-y-3.5">
            {[
              { title: 'Describe symptoms', desc: 'Describe how you feel in plain language' },
              { title: 'AI Triage selection', desc: 'Symptom matching with whitelisted specialties' },
              { title: 'Verified recommendations', desc: 'Browse matched doctors with transparent pricing' }
            ].map((step, index) => (
              <div key={step.title} className="flex items-start gap-4 rounded-xl bg-white p-3.5 border border-slate-50 shadow-sm transition-all hover:border-slate-200">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-navy/5 text-sm font-extrabold text-navy">
                  {index + 1}
                </span>
                <div>
                  <h4 className="text-base font-bold text-navy leading-tight">{step.title}</h4>
                  <p className="text-sm text-slate-400 mt-0.5">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer Banner */}
        <div className="mt-6 flex gap-3 rounded-2xl border border-amber-100 bg-amber-50/55 p-4 text-sm font-medium leading-relaxed text-amber-900">
          <svg className="h-5 w-5 text-amber-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p>
            <strong>Navigation support only.</strong> MediRoute never provides definitive clinical diagnoses or treats emergency conditions.
          </p>
        </div>
      </div>
    </div>
  )
}
