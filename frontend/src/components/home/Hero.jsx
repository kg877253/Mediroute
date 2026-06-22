export default function Hero() {
  const steps = [
    { title: 'Describe symptoms', desc: 'Plain language — no medical jargon needed' },
    { title: 'AI Triage selection', desc: 'Matched to whitelisted specialties' },
    { title: 'Verified recommendations', desc: 'Doctors with transparent pricing' },
  ]

  return (
    <div className="flex flex-col gap-6 pt-2 lg:pt-4">
      <div>
        <h2 className="heading-display text-[2rem] leading-[1.12] sm:text-[2.35rem]">
          Find the right specialist
          <br />
          <span className="text-teal">in under 60 seconds.</span>
        </h2>

        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-slate-500">
          MediRoute transforms your symptoms into a verified care route — identifying the correct clinical specialty, urgency rating, and local doctors.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
        {[
          { value: '8', label: 'Specialties', accent: 'border-t-teal' },
          { value: '5', label: 'Cities', accent: 'border-t-navy' },
          { value: '24/7', label: 'Emergency', accent: 'border-t-red-500', valueClass: 'text-red-600' },
        ].map((stat) => (
          <div key={stat.label} className={`stat-pill border-t-[3px] ${stat.accent}`}>
            <span className={`stat-pill__value ${stat.valueClass || ''}`}>{stat.value}</span>
            <span className="stat-pill__label">{stat.label}</span>
          </div>
        ))}
      </div>

      <div className="card-clinical p-5">
        <p className="label-section mb-3">Your Care Route Journey</p>
        <div className="space-y-2">
          {steps.map((step, i) => (
            <div key={step.title} className="flex items-start gap-3 rounded-lg bg-slate-50/80 px-3 py-2.5">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-navy text-[11px] font-bold text-white">
                {i + 1}
              </span>
              <div className="min-w-0 pt-0.5">
                <p className="text-sm font-semibold text-navy">{step.title}</p>
                <p className="text-[11px] text-slate-400">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2.5 rounded-xl border border-amber-200/80 bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-900">
        <svg className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <p>
          <strong>Navigation support only.</strong> MediRoute never provides definitive clinical diagnoses or treats emergency conditions.
        </p>
      </div>
    </div>
  )
}
