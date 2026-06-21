export default function EmergencyModal({ emergencyCity, setEmergencyCity, onClose }) {
  const cities = ['Delhi', 'Mumbai', 'Jaipur', 'Goa', 'Bangalore']
  
  const emergencyHospitals = {
    Delhi: [
      { name: 'AIIMS Emergency Department', phone: '011-26588500', location: 'Ansari Nagar, New Delhi' },
      { name: 'Max Super Speciality Hospital', phone: '011-26515050', location: 'Saket, New Delhi' },
      { name: 'Safdarjung Hospital', phone: '011-26165060', location: 'Ansari Nagar West, New Delhi' }
    ],
    Mumbai: [
      { name: 'KEM Hospital Emergency Room', phone: '022-24107000', location: 'Parel, Mumbai' },
      { name: 'Kokilaben Dhirubhai Ambani Hospital', phone: '022-30999999', location: 'Andheri West, Mumbai' },
      { name: 'Lilavati Hospital', phone: '022-26468000', location: 'Bandra West, Mumbai' }
    ],
    Jaipur: [
      { name: 'SMS Hospital Emergency Ward', phone: '0141-2560291', location: 'Ashok Nagar, Jaipur' },
      { name: 'Fortis Escorts Hospital', phone: '0141-2547000', location: 'Malviya Nagar, Jaipur' },
      { name: 'Mahatma Gandhi Hospital', phone: '0141-2771777', location: 'Sitapura, Jaipur' }
    ],
    Goa: [
      { name: 'Goa Medical College Emergency', phone: '0832-2458727', location: 'Bambolim, Goa' },
      { name: 'Manipal Hospital Goa', phone: '0832-3048800', location: 'Dona Paula, Goa' },
      { name: 'Healthway Hospital', phone: '0832-2495555', location: 'Old Goa' }
    ],
    Bangalore: [
      { name: 'NIMHANS Casualty Services', phone: '080-26995000', location: 'Hosur Road, Bangalore' },
      { name: 'St. John\'s Medical College Hospital', phone: '080-22065000', location: 'Sarjapur Road, Bangalore' },
      { name: 'Apollo Hospitals', phone: '080-26304050', location: 'Bannerghatta Road, Bangalore' }
    ]
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/60 p-4 md:p-6 backdrop-blur-sm">
      <div className="relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-white shadow-xl shadow-navy/20">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-6 top-6 z-20 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 text-white hover:scale-105 active:scale-95 transition-all cursor-pointer"
          aria-label="Close emergency mode"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Urgent Call-out Header */}
        <div className="bg-red-600 px-8 py-7 md:px-10 md:py-8 text-white relative overflow-hidden">
          {/* Decorative background cross outline */}
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 text-white/5 font-black text-[220px] pointer-events-none">+</div>
          
          <div className="relative z-10">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/80">Critical emergency support</p>
            <h3 className="mt-1 text-2xl md:text-3xl font-extrabold tracking-tight">Call 112 for immediate assistance</h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-red-100">
              If you or someone nearby is experiencing a life-threatening crisis, chest pain, or severe breathing distress, contact emergency services immediately.
            </p>
            <a
              href="tel:112"
              className="mt-4 inline-flex items-center gap-2.5 rounded-xl bg-white px-6 py-3 text-sm font-bold text-red-600 shadow-md hover:bg-red-50 hover:shadow-lg transition-all hover:-translate-y-0.5"
            >
              <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call National Helpline (112)
            </a>
          </div>
        </div>

        {/* Modal Content Panels */}
        <div className="grid min-h-0 flex-1 gap-0 grid-cols-1 lg:grid-cols-[280px_1fr]">
          {/* Left panel: Cities */}
          <div className="border-b border-slate-100 bg-slate-50/50 p-6 lg:border-b-0 lg:border-r lg:border-slate-100">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">Filter By City</p>
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">
              {cities.map((cityName) => (
                <button
                  key={cityName}
                  type="button"
                  onClick={() => setEmergencyCity(cityName)}
                  className={`rounded-xl px-4 py-3 text-left text-sm font-semibold transition-all flex items-center gap-2.5 cursor-pointer border ${
                    emergencyCity === cityName
                      ? 'bg-navy border-navy text-white shadow-md'
                      : 'bg-white border-slate-100 text-navy hover:bg-teal/5 hover:text-teal hover:border-teal/20'
                  }`}
                >
                  <span className={`h-2 w-2 rounded-full ${emergencyCity === cityName ? 'bg-teal-light' : 'bg-slate-300'}`}></span>
                  {cityName}
                </button>
              ))}
            </div>
          </div>

          {/* Right panel: Hospitals list */}
          <div className="min-h-0 overflow-y-auto p-6 md:p-8 bg-white">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between border-b border-slate-100 pb-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-teal">Emergency medical providers</p>
                <h4 className="text-2xl font-extrabold text-navy">{emergencyCity}</h4>
              </div>
              <p className="text-xs font-semibold text-slate-400">Demo contacts verified for immediate reference</p>
            </div>

            <div className="mt-6 grid gap-4">
              {emergencyHospitals[emergencyCity].map((hosp, index) => (
                <div key={hosp.name} className="rounded-2xl border border-slate-100 bg-slate-50/30 p-5 hover:border-slate-200 transition-all flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600 text-sm font-extrabold border border-red-100">
                    {index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div>
                        <h5 className="text-base font-bold text-navy truncate">{hosp.name}</h5>
                        <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                          <svg className="h-3.5 w-3.5 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {hosp.location}
                        </p>
                      </div>
                      <a
                        href={`tel:${hosp.phone.replace(/-/g, '')}`}
                        className="inline-flex items-center gap-2 rounded-xl bg-white border border-slate-200 px-4 py-2.5 text-xs font-bold text-teal hover:border-teal/30 hover:bg-teal/5 shadow-sm transition-all"
                      >
                        <svg className="h-3.5 w-3.5 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        {hosp.phone}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
