import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const [symptomText, setSymptomText] = useState('')
  const [city, setCity] = useState('Delhi')
  const [emergencyCity, setEmergencyCity] = useState('Delhi')
  const [loading, setLoading] = useState(false)
  const [loadingPhase, setLoadingPhase] = useState('')
  const [error, setError] = useState('')
  const [showEmergencyModal, setShowEmergencyModal] = useState(false)
  const navigate = useNavigate()
  const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'

  const cities = ['Delhi', 'Mumbai', 'Jaipur', 'Goa', 'Bangalore']
  const demoSymptoms = [
    { label: 'Chest pain', text: 'I have chest pain and difficulty breathing' },
    { label: 'Skin rash', text: 'I have an itchy skin rash on my arm' },
    { label: 'Tooth pain', text: 'My tooth hurts badly when I eat' },
    { label: 'Child fever', text: 'My child has fever and cough' }
  ]

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

  const openEmergencyMode = () => {
    setEmergencyCity(city)
    setShowEmergencyModal(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!symptomText.trim()) {
      setError('Please describe your symptoms first.')
      return
    }

    setError('')
    setLoading(true)

    try {
      setLoadingPhase('Analyzing symptoms with Gemini AI')
      const triageRes = await fetch(`${apiBaseUrl}/api/triage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptomText })
      })
      const triageData = await triageRes.json()

      if (!triageRes.ok) {
        throw new Error(triageData.error || 'Symptom triage failed.')
      }

      if (!triageData.specialty) {
        throw new Error('Triage response did not include a specialty.')
      }

      setLoadingPhase('Finding verified doctors near you')
      const searchRes = await fetch(`${apiBaseUrl}/api/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          specialty: triageData.specialty,
          city
        })
      })
      const searchData = await searchRes.json()

      if (!searchRes.ok) {
        throw new Error(searchData.error || 'Doctor search failed.')
      }

      navigate('/results', {
        state: {
          symptomText,
          city,
          triageData,
          searchData
        }
      })
    } catch (err) {
      console.error(err)
      setError(err.message || 'Failed to connect to the server. Please check that the backend is running.')
    } finally {
      setLoading(false)
      setLoadingPhase('')
    }
  }

  return (
    <div className="min-h-screen bg-bg font-sans text-text">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-navy shadow-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-2xl font-black text-teal shadow-md">
              +
            </div>
            <div>
              <h1 className="text-2xl font-black leading-none text-white">
                Medi<span className="text-teal-light">Route</span>
              </h1>
              <p className="mt-1 text-xs font-semibold text-white/70">Right doctor. Right cost. Right now.</p>
            </div>
          </div>

          <button
            type="button"
            onClick={openEmergencyMode}
            className="rounded-xl bg-red-600 px-5 py-3 text-xs font-black uppercase text-white shadow-lg shadow-red-950/20 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-200"
          >
            Emergency Mode
          </button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1180px] px-8 py-10 lg:py-14">
        <section className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-border bg-white p-8 shadow-xl shadow-navy/5 md:p-10">
            <div className="inline-flex rounded-full border border-teal/20 bg-teal/10 px-3 py-1 text-xs font-black uppercase text-teal">
              Gemini 2.5 Flash triage navigation
            </div>

            <h2 className="mt-6 text-4xl font-black leading-tight text-navy md:text-[44px]">
              Find the right specialist in under 60 seconds.
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-8 text-text-muted">
              MediRoute turns symptoms into a safe care route: specialty, urgency, verified doctors, fee range, and emergency guidance.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-bg p-4">
                <p className="text-3xl font-black text-navy">8</p>
                <p className="text-xs font-black uppercase text-text-muted">Specialties</p>
              </div>
              <div className="rounded-2xl bg-bg p-4">
                <p className="text-3xl font-black text-navy">5</p>
                <p className="text-xs font-black uppercase text-text-muted">Cities</p>
              </div>
              <div className="rounded-2xl bg-bg p-4">
                <p className="text-3xl font-black text-navy">112</p>
                <p className="text-xs font-black uppercase text-text-muted">Emergency</p>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-border bg-bg p-5">
              <p className="text-xs font-black uppercase text-teal">How the route works</p>
              <div className="mt-4 grid gap-3">
                {['Describe symptoms', 'AI selects safe specialty', 'Doctors sorted by rating'].map((step, index) => (
                  <div key={step} className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy text-sm font-black text-white">
                      {index + 1}
                    </span>
                    <span className="text-sm font-bold text-navy">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold leading-6 text-amber-950">
              Navigation support only. MediRoute never provides a definitive medical diagnosis.
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-white shadow-2xl shadow-navy/10">
            <div className="flex items-center justify-between gap-6 border-b border-border px-8 py-6">
              <div>
                <p className="text-xs font-black uppercase text-teal">Start a care route</p>
                <h3 className="mt-1 text-2xl font-black text-navy">Describe Your Symptoms</h3>
              </div>
              <div className="hidden rounded-2xl bg-bg px-4 py-3 text-right sm:block">
                <p className="text-xs font-black uppercase text-text-muted">City</p>
                <p className="text-sm font-black text-navy">{city}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 p-8">
              <div>
                <label className="mb-2 block text-sm font-black text-navy">Symptoms</label>
                <textarea
                  value={symptomText}
                  onChange={(e) => setSymptomText(e.target.value)}
                  placeholder="Example: I have chest pain and difficulty breathing..."
                  rows={6}
                  className="min-h-40 w-full resize-none rounded-2xl border border-border bg-bg px-4 py-4 text-base text-text outline-none focus:border-teal focus:bg-white focus:ring-4 focus:ring-teal/10"
                  disabled={loading}
                />
              </div>

              <div className="grid gap-5 md:grid-cols-[0.95fr_1.05fr]">
                <div>
                  <label className="mb-2 block text-sm font-black text-navy">Current City</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="h-14 w-full rounded-2xl border border-border bg-white px-4 py-3 text-base font-bold text-text outline-none focus:border-teal focus:ring-4 focus:ring-teal/10"
                    disabled={loading}
                  >
                    {cities.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <p className="mb-2 text-sm font-black text-navy">Try a demo</p>
                  <div className="grid grid-cols-2 gap-3">
                    {demoSymptoms.map((sample) => (
                      <button
                        key={sample.label}
                        type="button"
                        onClick={() => setSymptomText(sample.text)}
                        className="rounded-xl border border-border bg-bg px-3 py-3 text-center text-xs font-black text-navy hover:border-teal hover:bg-teal/10 hover:text-teal"
                        disabled={loading}
                      >
                        {sample.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {error && (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                  {error}
                </div>
              )}

              {loading ? (
                <div className="flex min-h-14 items-center justify-center gap-3 rounded-2xl bg-navy px-5 py-4 text-sm font-black text-white">
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-teal-light" />
                  {loadingPhase}
                </div>
              ) : (
                <button
                  type="submit"
                  className="min-h-14 w-full rounded-2xl bg-teal px-5 py-4 text-base font-black text-white shadow-xl shadow-teal/20 hover:bg-teal-light focus:outline-none focus:ring-4 focus:ring-teal/20"
                >
                  Find My Doctor
                </button>
              )}
            </form>
          </div>
        </section>
      </main>

      {showEmergencyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/70 p-5 backdrop-blur-md">
          <div className="relative flex max-h-[88vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl shadow-navy/30">
            <button
              type="button"
              onClick={() => setShowEmergencyModal(false)}
              className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white text-xl font-black text-red-600 shadow-lg hover:bg-red-50"
              aria-label="Close emergency mode"
            >
              X
            </button>

            <div className="bg-red-600 px-7 py-6 pr-20 text-white">
              <p className="text-xs font-black uppercase text-white/80">Emergency mode</p>
              <h3 className="mt-2 text-3xl font-black">Call 112 for critical symptoms</h3>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/90">
                If symptoms are life-threatening, call the national emergency number immediately or visit the nearest emergency facility.
              </p>
              <a
                href="tel:112"
                className="mt-5 inline-flex rounded-2xl bg-white px-6 py-3 text-base font-black text-red-600 shadow-md hover:bg-red-50 hover:text-red-700"
              >
                Call 112 Now
              </a>
            </div>

            <div className="grid min-h-0 flex-1 gap-0 lg:grid-cols-[240px_1fr]">
              <div className="border-b border-border bg-bg p-5 lg:border-b-0 lg:border-r">
                <p className="mb-3 text-xs font-black uppercase text-text-muted">Choose city</p>
                <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">
                  {cities.map((cityName) => (
                    <button
                      key={cityName}
                      type="button"
                      onClick={() => setEmergencyCity(cityName)}
                      className={`rounded-xl px-4 py-3 text-left text-sm font-black ${
                        emergencyCity === cityName
                          ? 'bg-navy text-white shadow-md'
                          : 'bg-white text-navy hover:bg-teal/10 hover:text-teal'
                      }`}
                    >
                      {cityName}
                    </button>
                  ))}
                </div>
              </div>

              <div className="min-h-0 overflow-y-auto p-6 md:p-7">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-xs font-black uppercase text-teal">Emergency hospitals</p>
                    <h4 className="text-2xl font-black text-navy">{emergencyCity}</h4>
                  </div>
                  <p className="text-sm font-semibold text-text-muted">Verified emergency contacts for demo use</p>
                </div>

                <div className="mt-6 grid gap-4">
                  {emergencyHospitals[emergencyCity].map((hosp, index) => (
                    <div key={hosp.name} className="rounded-2xl border border-border bg-bg p-5">
                      <div className="flex gap-4">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-600 text-sm font-black text-white">
                          {index + 1}
                        </span>
                        <div>
                          <h5 className="text-lg font-black text-navy">{hosp.name}</h5>
                          <p className="mt-1 text-sm text-text-muted">{hosp.location}</p>
                          <a
                            href={`tel:${hosp.phone.replace(/-/g, '')}`}
                            className="mt-3 inline-flex rounded-xl bg-white px-4 py-2 text-sm font-black text-teal shadow-sm hover:text-teal-light"
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
      )}

      <footer className="border-t border-border bg-white px-5 py-4 text-center text-xs font-semibold text-text-muted">
        MediRoute MVP - Bharat Academix CodeQuest 2026. Navigation support only, not clinical diagnosis.
      </footer>
    </div>
  )
}

export default Home
