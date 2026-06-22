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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/60 p-4 backdrop-blur-sm md:p-6">
      <div className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 text-white transition-all hover:bg-white/25"
          aria-label="Close emergency mode"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="shrink-0 bg-red-600 px-6 py-6 pr-14 text-white md:px-8 md:py-7">
          <p className="label-section !text-red-100">Critical emergency support</p>
          <h3 className="mt-1 text-xl font-extrabold leading-snug md:text-2xl">Call 112 for immediate assistance</h3>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-red-100">
            If you or someone nearby is experiencing a life-threatening crisis, chest pain, or severe breathing distress, contact emergency services immediately.
          </p>
          <a
            href="tel:112"
            className="btn-danger-solid mt-4"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call National Helpline (112)
          </a>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[220px_1fr]">
          <div className="shrink-0 border-b border-slate-100 bg-slate-50 p-5 lg:border-b-0 lg:border-r">
            <p className="label-section mb-3">Filter By City</p>
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">
              {cities.map((cityName) => (
                <button
                  key={cityName}
                  type="button"
                  onClick={() => setEmergencyCity(cityName)}
                  className={`rounded-lg px-3 py-2.5 text-left text-sm font-semibold transition-all ${
                    emergencyCity === cityName
                      ? 'bg-navy text-white shadow-sm'
                      : 'border border-slate-200 bg-white text-navy hover:border-teal/30'
                  }`}
                >
                  {cityName}
                </button>
              ))}
            </div>
          </div>

          <div className="min-h-0 overflow-y-auto p-5 md:p-6">
            <div className="border-b border-slate-100 pb-4">
              <p className="label-section">Emergency medical providers</p>
              <h4 className="mt-0.5 text-xl font-extrabold text-navy">{emergencyCity}</h4>
              <p className="mt-1 text-xs text-slate-400">Demo contacts verified for immediate reference</p>
            </div>

            <div className="mt-4 space-y-3">
              {emergencyHospitals[emergencyCity].map((hosp, index) => (
                <div key={hosp.name} className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start gap-3">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-50 text-xs font-bold text-red-600">
                          {index + 1}
                        </span>
                        <div className="min-w-0 flex-1">
                          <h5 className="break-words text-sm font-bold leading-snug text-navy">{hosp.name}</h5>
                          <p className="mt-1 break-words text-xs leading-relaxed text-slate-500">
                            {hosp.location}
                          </p>
                        </div>
                      </div>
                    </div>
                    <a
                      href={`tel:${hosp.phone.replace(/-/g, '')}`}
                      className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-teal hover:border-teal/30 sm:mt-1"
                    >
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {hosp.phone}
                    </a>
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
