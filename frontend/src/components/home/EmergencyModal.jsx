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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/70 p-6 backdrop-blur-md">
      <div className="relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl shadow-navy/30">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-6 top-6 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl font-black text-red-600 shadow-lg hover:bg-red-50"
          aria-label="Close emergency mode"
        >
          X
        </button>

        <div className="bg-red-600 px-10 py-8 pr-24 text-white">
          <p className="text-sm font-semibold uppercase text-white/80">Emergency mode</p>
          <h3 className="mt-3 text-4xl font-bold">Call 112 for critical symptoms</h3>
          <p className="mt-3 max-w-2xl text-lg leading-7 text-white/90">
            If symptoms are life-threatening, call the national emergency number immediately or visit the nearest emergency facility.
          </p>
          <a
            href="tel:112"
            className="mt-6 inline-flex rounded-2xl bg-white px-8 py-4 text-lg font-semibold text-red-600 shadow-md hover:bg-red-50 hover:text-red-700 transition-all hover:shadow-lg"
          >
            Call 112 Now
          </a>
        </div>

        <div className="grid min-h-0 flex-1 gap-0 lg:grid-cols-[280px_1fr]">
          <div className="border-b border-border bg-bg p-6 lg:border-b-0 lg:border-r">
            <p className="mb-4 text-sm font-semibold uppercase text-text-muted">Choose city</p>
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
              {cities.map((cityName) => (
                <button
                  key={cityName}
                  type="button"
                  onClick={() => setEmergencyCity(cityName)}
                  className={`rounded-xl px-5 py-4 text-left text-base font-semibold transition-all min-h-[60px] flex items-center ${
                    emergencyCity === cityName
                      ? 'bg-navy text-white shadow-md'
                      : 'bg-white text-navy hover:bg-teal/10 hover:text-teal hover:shadow-md'
                  }`}
                >
                  {cityName}
                </button>
              ))}
            </div>
          </div>

          <div className="min-h-0 overflow-y-auto p-8 md:p-10">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase text-teal">Emergency hospitals</p>
                <h4 className="text-3xl font-bold text-navy">{emergencyCity}</h4>
              </div>
              <p className="text-base font-medium text-text-muted">Verified emergency contacts for demo use</p>
            </div>

            <div className="mt-8 grid gap-6">
              {emergencyHospitals[emergencyCity].map((hosp, index) => (
                <div key={hosp.name} className="rounded-2xl border border-border bg-bg p-6 min-h-[120px] flex items-center">
                  <div className="flex gap-5 w-full">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-600 text-base font-bold text-white">
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <h5 className="text-xl font-semibold text-navy overflow-hidden text-ellipsis">{hosp.name}</h5>
                      <p className="mt-2 text-base text-text-muted overflow-hidden text-ellipsis">{hosp.location}</p>
                      <a
                        href={`tel:${hosp.phone.replace(/-/g, '')}`}
                        className="mt-4 inline-flex rounded-xl bg-white px-5 py-3 text-base font-semibold text-teal shadow-sm hover:text-teal-light transition-all hover:shadow-md"
                      >
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
