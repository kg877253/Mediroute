export default function Hero() {
  return (
    <div className="rounded-3xl border border-slate-200/60 bg-white/80 p-8 shadow-xl shadow-slate-100/50 backdrop-blur-md relative overflow-hidden flex flex-col justify-between min-h-[580px]">
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-teal/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-navy/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-teal/5 border border-teal/15 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-teal">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal" />
          </span>
          Powered by Gemini 2.5 Flash
        </div>

        <div className="space-y-3">
          <h2 className="text-3xl font-black tracking-tight text-navy sm:text-4xl md:text-[40px] md:leading-[1.15]">
            Find the right specialist{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal via-teal-light to-teal-dark block mt-1">
              in under 60 seconds.
            </span>
          </h2>
          <p className="text-sm leading-relaxed text-slate-500 max-w-md font-medium">
            MediRoute converts plain-language symptoms into clinical doctor recommendations, verifying fees and medical credentials automatically.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            { value: '8', label: 'Specialties', border: 'border-slate-100', text: 'text-navy' },
            { value: '5', label: 'Cities', border: 'border-slate-100', text: 'text-navy' },
            { value: '24/7', label: 'Emergency', border: 'border-red-100 bg-red-50/20', text: 'text-red-600' },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`rounded-2xl border ${stat.border} bg-white/40 backdrop-blur-sm p-4 text-center hover:scale-[1.02] hover:shadow-md hover:border-teal/20 transition-all duration-300`}
            >
              <p className={`text-2xl font-black tracking-tight ${stat.text}`}>{stat.value}</p>
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="border border-slate-100 bg-slate-50/40 rounded-2xl p-5 space-y-4">
          <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
            Care Journey Flow
          </p>
          <div className="space-y-3">
            {[
              { title: 'Describe symptoms', desc: 'No complex terminology required' },
              { title: 'AI Triage selection', desc: 'Matched directly to whitelist specialties' },
              { title: 'Verified recommendations', desc: 'Filtered, sorted, and credential-checked' },
            ].map((step, i) => (
              <div
                key={step.title}
                className="flex items-center gap-4 rounded-xl bg-white border border-slate-100/80 px-4 py-3.5 shadow-sm hover:shadow-md hover:border-teal/30 transition-all duration-300"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-navy/5 text-xs font-black text-navy border border-navy/5">
                  {i + 1}
                </span>
                <div>
                  <p className="text-sm font-extrabold text-navy leading-tight">{step.title}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5 font-medium">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-3 rounded-2xl border border-amber-100 bg-amber-50/40 p-4 text-xs font-semibold leading-relaxed text-amber-800 relative z-10">
        <svg className="h-5 w-5 text-amber-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <p>
          <strong>Navigation Support Only:</strong> MediRoute is a supportive indexing and triage tool. It does not issue clinical diagnoses or handle acute medical events.
        </p>
      </div>
    </div>
  )
}