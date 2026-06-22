export default function Hero() {
  const steps = [
    { title: 'Describe symptoms', desc: 'Plain language — no medical jargon needed' },
    { title: 'AI Triage selection', desc: 'Matched to whitelisted specialties' },
    { title: 'Verified recommendations', desc: 'Doctors with transparent pricing' },
  ]

  return (
    <div className="card-clinical relative overflow-hidden p-6 md:p-7">
      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-teal" />
          </span>
          <span className="label-section !text-[10px] !tracking-wider text-slate-500">
            Powered by Gemini 2.5 Flash
          </span>
        </div>

        <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl md:text-[2.5rem] md:leading-[1.15]">
          Find the right specialist{' '}
          <br className="hidden sm:inline" />
          <span className="text-teal">in under 60 seconds.</span>
        </h2>

        <p className="mt-4 max-w-lg text-sm leading-relaxed text-slate-500">
          MediRoute transforms your symptoms into a verified care route — identifying the correct clinical specialty, urgency rating, and local doctors.
        </p>

        <div className="mt-6 grid grid-cols-3 gap-3">
          {[
            { value: '8', label: 'Specialties', color: 'text-navy', border: 'border-l-[3px] border-navy' },
            { value: '5', label: 'Cities', color: 'text-navy', border: 'border-l-[3px] border-teal' },
            { value: '24/7', label: 'Emergency', color: 'text-red-600', border: 'border-l-[3px] border-red-500' },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`rounded-xl border border-slate-100 bg-white p-3.5 pl-3 shadow-sm ${stat.border}`}
            >
              <p className={`text-2xl font-black tracking-tight sm:text-3xl ${stat.color}`}>{stat.value}</p>
              <p className="label-section mt-1 !text-[10px]">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-xl border border-slate-100 bg-slate-50/50 p-5">
          <p className="label-section mb-4">Your Care Route Journey</p>
          <div className="space-y-0">
            {steps.map((step, i) => (
              <div key={step.title} className="relative flex gap-3 pb-3 last:pb-0">
                {i < steps.length - 1 && (
                  <div className="absolute left-[13px] top-7 bottom-0 w-px bg-slate-200" aria-hidden="true" />
                )}
                <span className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-xs font-bold text-navy">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1 rounded-xl border border-slate-100 bg-white px-4 py-2.5">
                  <p className="text-sm font-semibold leading-tight text-navy">{step.title}</p>
                  <p className="mt-0.5 text-[11px] leading-relaxed text-slate-400">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 flex gap-2.5 rounded-xl border border-amber-100 bg-amber-50/60 p-3.5 text-xs font-medium leading-relaxed text-amber-900">
          <svg className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
