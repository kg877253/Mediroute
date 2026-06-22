export default function Hero() {
  const steps = [
    { title: 'Describe symptoms', desc: 'Plain language — no medical jargon needed' },
    { title: 'AI Triage selection', desc: 'Matched to whitelisted specialties' },
    { title: 'Verified recommendations', desc: 'Doctors with transparent pricing' },
  ]

  // Specialty cards with unique colors for visual interest
  const specialties = [
    { name: 'General Physician', icon: '🩺', color: '#EFF6FF', border: '#BFDBFE', text: '#1D4ED8' },
    { name: 'Cardiologist', icon: '❤️', color: '#FFF1F2', border: '#FECDD3', text: '#BE123C' },
    { name: 'Dermatologist', icon: '✨', color: '#F0FDF4', border: '#BBF7D0', text: '#15803D' },
    { name: 'Pediatrician', icon: '🧒', color: '#FFFBEB', border: '#FDE68A', text: '#B45309' },
    { name: 'ENT Specialist', icon: '👂', color: '#F5F3FF', border: '#DDD6FE', text: '#6D28D9' },
    { name: 'Orthopedic', icon: '🦴', color: '#FFF7ED', border: '#FED7AA', text: '#C2410C' },
    { name: 'Gynecologist', icon: '🌸', color: '#FDF4FF', border: '#F0ABFC', text: '#A21CAF' },
    { name: 'Dentist', icon: '🦷', color: '#ECFEFF', border: '#A5F3FC', text: '#0E7490' },
  ]

  return (
    <div className="flex flex-col gap-10 pt-6 lg:pt-12 relative">

      {/* Hero Headline */}
      <div className="relative">
        {/* Decorative blobs behind headline */}
        <div
          className="absolute -top-8 -left-6 h-48 w-48 rounded-full blur-3xl opacity-40 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #028090 0%, transparent 70%)' }}
        />
        <div
          className="absolute top-12 left-32 h-32 w-32 rounded-full blur-2xl opacity-20 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)' }}
        />

        <div className="relative">
          {/* Eyebrow label */}
          <div className="inline-flex items-center gap-2 rounded-full bg-teal/10 border border-teal/20 px-4 py-1.5 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-teal animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-teal">AI-Powered Navigation</span>
          </div>

          <h2 className="heading-display text-[2.75rem] leading-[1.05] sm:text-[3.5rem] lg:text-[4rem]">
            Find the right<br />
            <span
              className="inline-block"
              style={{
                background: 'linear-gradient(135deg, #028090 0%, #039EAF 40%, #7C3AED 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              specialist
            </span>{' '}
            <span className="text-navy">in under</span><br />
            <span
              style={{
                background: 'linear-gradient(135deg, #1E2761 0%, #028090 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              60 seconds.
            </span>
          </h2>

          <p className="mt-6 max-w-md text-base leading-relaxed text-slate-500 font-medium">
            MediRoute transforms your symptoms into a verified care route — identifying the correct clinical specialty, urgency rating, and local doctors near you.
          </p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="flex flex-wrap gap-6">
        {[
          { value: '8', label: 'Specialties', color: '#028090' },
          { value: '5', label: 'Cities', color: '#1E2761' },
          { value: '24/7', label: 'Emergency', color: '#dc2626' },
        ].map((stat) => (
          <div key={stat.label} className="flex flex-col gap-1">
            <span
              className="stat-pill__value"
              style={{ color: stat.color }}
            >
              {stat.value}
            </span>
            <span className="stat-pill__label">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Specialty Pills — colorful showcase */}
      <div>
        <p className="label-section mb-4">Covered Specialties</p>
        <div className="flex flex-wrap gap-2.5">
          {specialties.map((s) => (
            <span
              key={s.name}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold border transition-transform hover:-translate-y-0.5 cursor-default"
              style={{
                backgroundColor: s.color,
                borderColor: s.border,
                color: s.text,
              }}
            >
              <span>{s.icon}</span>
              {s.name}
            </span>
          ))}
        </div>
      </div>

      {/* How it works — numbered steps */}
      <div
        className="rounded-3xl p-6 border"
        style={{
          background: 'linear-gradient(135deg, #FAFBFF 0%, #EFF6FF 100%)',
          borderColor: 'rgb(30 39 97 / 0.08)',
        }}
      >
        <p className="label-section mb-5">Your Care Route Journey</p>
        <div className="flex flex-col gap-4">
          {steps.map((step, i) => {
            const colors = [
              { bg: 'linear-gradient(135deg, #028090, #039EAF)', shadow: 'rgb(2 128 144 / 0.3)' },
              { bg: 'linear-gradient(135deg, #7C3AED, #9061F9)', shadow: 'rgb(124 58 237 / 0.3)' },
              { bg: 'linear-gradient(135deg, #1E2761, #2E3B87)', shadow: 'rgb(30 39 97 / 0.3)' },
            ]
            return (
              <div key={step.title} className="flex items-start gap-4">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white shadow-md"
                  style={{ background: colors[i].bg, boxShadow: `0 4px 12px ${colors[i].shadow}` }}
                >
                  {i + 1}
                </span>
                <div className="pt-1">
                  <p className="text-sm font-bold text-navy">{step.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{step.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Navigation disclaimer */}
      <div className="flex gap-3 rounded-2xl border border-amber-200/60 bg-amber-50 px-5 py-4 text-sm text-amber-900">
        <svg className="h-5 w-5 shrink-0 text-amber-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <p className="leading-relaxed">
          <strong className="font-bold">Navigation support only.</strong> MediRoute never provides definitive clinical diagnoses or treats emergency conditions.
        </p>
      </div>
    </div>
  )
}
