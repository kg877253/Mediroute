export default function Hero() {
  const steps = [
    { title: 'Describe symptoms', desc: 'Plain language — no medical jargon needed' },
    { title: 'AI Triage selection', desc: 'Matched to whitelisted specialties' },
    { title: 'Verified recommendations', desc: 'Doctors with transparent pricing' },
  ]

  return (
    <div className="flex flex-col gap-10 pt-10 lg:pt-16 relative">
      <div className="max-w-3xl">
        <h2 className="heading-display text-5xl md:text-[5rem] lg:text-[5.5rem]">
          Fewer clicks.<br />
          <span className="text-teal">More care.</span>
        </h2>

        <p className="mt-8 max-w-xl text-lg md:text-xl leading-relaxed text-slate-600">
          Admit more patients, reduce staff burden, and find the right specialist with an AI-native system built for your health.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl">
        {[
          { value: '8', label: 'Specialties' },
          { value: '5', label: 'Cities' },
          { value: '24/7', label: 'Emergency' },
        ].map((stat) => (
          <div key={stat.label} className="stat-pill border-none bg-transparent !px-0 !shadow-none">
            <span className="stat-pill__value">{stat.value}</span>
            <span className="stat-pill__label">{stat.label}</span>
          </div>
        ))}
      </div>

      <div className="card-elevated p-8 mt-6 max-w-3xl">
        <p className="label-section mb-6">Your Care Route Journey</p>
        <div className="space-y-4">
          {steps.map((step, i) => (
            <div key={step.title} className="flex items-start gap-5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy text-sm font-bold text-white">
                {i + 1}
              </span>
              <div className="min-w-0 pt-1">
                <p className="text-base font-semibold text-navy">{step.title}</p>
                <p className="text-sm text-slate-500 mt-1">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-3xl flex gap-4 rounded-3xl bg-amber-50 p-6 text-sm leading-relaxed text-amber-900 mt-4">
        <svg className="mt-0.5 h-6 w-6 shrink-0 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <p>
          <strong className="font-bold text-amber-950">Navigation support only.</strong> MediRoute never provides definitive clinical diagnoses or treats emergency conditions.
        </p>
      </div>
    </div>
  )
}
