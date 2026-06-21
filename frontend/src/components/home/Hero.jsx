export default function Hero() {
  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-7 md:p-9 shadow-sm relative overflow-hidden flex flex-col justify-start">
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      {/* Decorative top-right teal blob */}
      <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-teal/5 blur-2xl pointer-events-none" />

      <div className="relative z-10">
        {/* Powered by badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-teal/5 border border-teal/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-teal">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-teal" />
          </span>
          Powered by Gemini 2.5 Flash
        </div>

        {/* Headline */}
        <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl md:text-[42px] md:leading-[1.12]">
          Find the right specialist{' '}
          <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal to-teal-dark">
            in under 60 seconds.
          </span>
        </h2>

        <p className="mt-4 text-sm leading-relaxed text-slate-500 max-w-lg">
          MediRoute transforms your symptoms into a verified care route — identifying the correct clinical specialty, urgency rating, and local doctors.
        </p>

        {/* Stats row */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          {[
            { value: '8', label: 'Specialties', color: 'text-navy' },
            { value: '5', label: 'Cities', color: 'text-navy' },
            { value: '24/7', label: 'Emergency', color: 'text-red-600' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-slate-100 bg-slate-50/60 p-3.5 text-center hover:bg-slate-50 transition-all"
            >
              <p className={`text-2xl font-extrabold tracking-tight ${stat.color}`}>{stat.value}</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Care Route Steps */}
        <div className="mt-6 border border-slate-100 bg-slate-50/40 rounded-2xl p-5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3">
            Your Care Route Journey
          </p>
          <div className="space-y-2.5">
            {[
              { title: 'Describe symptoms', desc: 'Plain language — no medical jargon needed' },
              { title: 'AI Triage selection', desc: 'Matched to whitelisted specialties' },
              { title: 'Verified recommendations', desc: 'Doctors with transparent pricing' },
            ].map((step, i) => (
              <div
                key={step.title}
                className="flex items-center gap-3 rounded-xl bg-white border border-slate-100 px-4 py-3 shadow-sm hover:border-teal/20 transition-all"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-navy/5 text-xs font-extrabold text-navy">
                  {i + 1}
                </span>
                <div>
                  <p className="text-sm font-bold text-navy leading-tight">{step.title}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-5 flex gap-2.5 rounded-2xl border border-amber-100 bg-amber-50/60 p-3.5 text-xs font-medium leading-relaxed text-amber-900">
          <svg className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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