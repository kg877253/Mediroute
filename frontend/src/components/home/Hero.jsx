export default function Hero() {
  const steps = [
    { title: 'Describe symptoms', desc: 'Plain language — no medical jargon needed' },
    { title: 'AI Triage selection', desc: 'Matched to whitelisted specialties' },
    { title: 'Verified recommendations', desc: 'Doctors with transparent pricing' },
  ]

  return (
    <div className="flex flex-col gap-6 pt-2 lg:pt-4 relative">
      {/* Decorative Blob */}
      <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-teal/5 blur-3xl -z-10 animate-pulse-subtle pointer-events-none"></div>

      <div>
        <h2 className="heading-display text-[2.25rem] leading-[1.12] sm:text-[2.75rem] bg-gradient-to-br from-navy to-navy-light bg-clip-text text-transparent">
          Find the right specialist
          <br />
          <span className="bg-gradient-to-r from-teal to-teal-light bg-clip-text text-transparent">in under 60 seconds.</span>
        </h2>

        <p className="mt-5 max-w-md text-base leading-relaxed text-slate-500 font-medium">
          MediRoute transforms your symptoms into a verified care route — identifying the correct clinical specialty, urgency rating, and local doctors.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-2">
        {[
          { value: '8', label: 'Specialties', accent: 'border-t-teal text-teal' },
          { value: '5', label: 'Cities', accent: 'border-t-navy text-navy' },
          { value: '24/7', label: 'Emergency', accent: 'border-t-red-500 text-red-600', valueClass: 'text-red-600' },
        ].map((stat) => (
          <div key={stat.label} className={`stat-pill border-t-[4px] ${stat.accent}`}>
            <span className={`stat-pill__value ${stat.valueClass || ''}`}>{stat.value}</span>
            <span className="stat-pill__label">{stat.label}</span>
          </div>
        ))}
      </div>

      <div className="card-clinical p-6 mt-2 relative overflow-hidden group">
        <div className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-teal to-teal-dark opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
        <p className="label-section mb-4 text-navy font-extrabold tracking-wider">Your Care Route Journey</p>
        <div className="space-y-3">
          {steps.map((step, i) => (
            <div key={step.title} className="flex items-start gap-4 rounded-xl bg-slate-50/80 px-4 py-3 transition-colors hover:bg-slate-100/80 border border-transparent hover:border-slate-200">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-navy to-navy-light text-xs font-black text-white shadow-md">
                {i + 1}
              </span>
              <div className="min-w-0 pt-0.5">
                <p className="text-[15px] font-bold text-navy">{step.title}</p>
                <p className="text-xs text-slate-500 mt-0.5 font-medium">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3 rounded-xl border border-amber-200/60 bg-gradient-to-r from-amber-50 to-orange-50/30 px-5 py-4 text-[13px] leading-relaxed text-amber-900 shadow-sm mt-2">
        <svg className="mt-0.5 h-5 w-5 shrink-0 text-amber-500 animate-pulse-subtle" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <p>
          <strong className="font-extrabold text-amber-950">Navigation support only.</strong> MediRoute never provides definitive clinical diagnoses or treats emergency conditions.
        </p>
      </div>
    </div>
  )
}
