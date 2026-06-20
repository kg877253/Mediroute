import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const [symptomText, setSymptomText] = useState('')
  const [city, setCity] = useState('Delhi')
  const [loading, setLoading] = useState(false)
  const [loadingPhase, setLoadingPhase] = useState('')
  const [error, setError] = useState('')
  const [showEmergencyModal, setShowEmergencyModal] = useState(false)
  const navigate = useNavigate()

  // Whitelisted cities
  const cities = ['Delhi', 'Mumbai', 'Jaipur', 'Goa', 'Bangalore']

  // Whitelisted emergency hospitals by city
  const emergencyHospitals = {
    Delhi: [
      { name: 'AIIMS Emergency Department', phone: '011-26588500', location: 'Ansari Nagar, New Delhi' },
      { name: 'Max Super Speciality Hospital', phone: '011-26515050', location: 'Saket, New Delhi' }
    ],
    Mumbai: [
      { name: 'KEM Hospital Emergency Room', phone: '022-24107000', location: 'Parel, Mumbai' },
      { name: 'Kokilaben Dhirubhai Ambani Hospital', phone: '022-30999999', location: 'Andheri West, Mumbai' }
    ],
    Jaipur: [
      { name: 'SMS Hospital Emergency Ward', phone: '0141-2560291', location: 'Ashok Nagar, Jaipur' },
      { name: 'Fortis Escorts Hospital', phone: '0141-2547000', location: 'Malviya Nagar, Jaipur' }
    ],
    Goa: [
      { name: 'Goa Medical College Emergency', phone: '0832-2458727', location: 'Bambolim, Goa' },
      { name: 'Manipal Hospital Goa', phone: '0832-3048800', location: 'Dona Paula, Goa' }
    ],
    Bangalore: [
      { name: 'NIMHANS Casualty Services', phone: '080-26995000', location: 'Hosur Road, Bangalore' },
      { name: 'St. John\'s Medical College Hospital', phone: '080-22065000', location: 'Sarjapur Road, Bangalore' }
    ]
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
      // Phase 1: Gemini Triage
      setLoadingPhase('Analyzing symptoms with Gemini AI...')
      const triageRes = await fetch(`${import.meta.env.VITE_API_URL}/api/triage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptomText })
      })
      const triageData = await triageRes.json()

      // Phase 2: Doctor Search
      setLoadingPhase('Finding verified doctors near you...')
      const searchRes = await fetch(`${import.meta.env.VITE_API_URL}/api/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          specialty: triageData.specialty,
          city
        })
      })
      const searchData = await searchRes.json()

      // Navigate to results page with data
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
      setError('Failed to connect to the server. Please check that the backend is running.')
    } finally {
      setLoading(false)
      setLoadingPhase('')
    }
  }

  return (
    <div className="min-h-screen bg-bg flex flex-col font-sans">
      {/* ── Navigation Header ─────────────────────────────────── */}
      <header className="bg-navy text-white py-5 px-6 shadow-md border-b border-navy-light sticky top-0 z-40">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">🏥</span>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                Medi<span className="text-teal-light">Route</span>
              </h1>
              <p className="text-[10px] text-white/60 tracking-wider uppercase font-semibold">
                Healthcare Navigation
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowEmergencyModal(true)}
            className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase px-4 py-2.5 rounded-lg transition-all shadow-md animate-pulse"
          >
            🚨 Emergency Mode
          </button>
        </div>
      </header>

      {/* ── Main Landing Section ──────────────────────────────── */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 md:py-16 max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          
          {/* Left Column: Copy & Brand pitch */}
          <div className="lg:col-span-5 text-left space-y-6">
            <span className="inline-flex items-center bg-teal/15 text-teal text-xs font-semibold px-3 py-1 rounded-full">
              ✨ Powered by Gemini 2.5 Flash
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-navy leading-tight tracking-tight">
              Get Matched to the Right Specialist in <span className="text-teal">Seconds</span>.
            </h2>
            <p className="text-text-muted text-base leading-relaxed">
              Describe your symptoms naturally, choose your city, and our AI triage agent will guide you to the correct department with transparent pricing and real-time directions.
            </p>
            
            <div className="pt-2 flex flex-col space-y-3">
              <div className="flex items-center space-x-3 text-sm text-text">
                <span className="text-teal font-bold text-lg">✓</span>
                <span>Whitelisted clinical triage navigation</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-text">
                <span className="text-teal font-bold text-lg">✓</span>
                <span>Verified doctor listings with ratings & pricing</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-text">
                <span className="text-teal font-bold text-lg">✓</span>
                <span>Zero diagnostic claims (strict safety filtering)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Form Card */}
          <div className="lg:col-span-7 bg-white border border-border/80 rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden">
            {/* Soft decorative background accents */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-navy/5 rounded-full blur-3xl pointer-events-none" />

            <h3 className="text-xl font-bold text-navy mb-5 flex items-center space-x-2">
              <span>🩺</span>
              <span>Describe Your Symptoms</span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              {/* Symptom input */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-navy">
                  What issues or symptoms are you experiencing?
                </label>
                <textarea
                  value={symptomText}
                  onChange={(e) => setSymptomText(e.target.value)}
                  placeholder="e.g., I have had a dull pain behind my eyes and a severe headache for 2 days..."
                  rows={4}
                  className="w-full border border-border rounded-xl p-4 focus:ring-2 focus:ring-teal/20 focus:border-teal outline-none resize-none text-text bg-bg-soft/30"
                  disabled={loading}
                />
              </div>

              {/* City selector */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-navy">
                  Your Current City
                </label>
                <div className="relative">
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full border border-border bg-white rounded-xl p-4 outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal text-text appearance-none cursor-pointer"
                    disabled={loading}
                  >
                    {cities.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-text-muted">
                    ▼
                  </div>
                </div>
              </div>

              {/* Error messages */}
              {error && (
                <div className="bg-red-50 text-danger border border-red-200/80 rounded-xl p-4 text-sm font-medium">
                  ⚠️ {error}
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-2">
                {loading ? (
                  <div className="w-full bg-navy-light text-white font-semibold py-4 rounded-xl shadow-md flex flex-col items-center justify-center space-y-2">
                    <svg className="animate-spin h-6 w-6 text-teal-light" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span className="text-sm tracking-wide">{loadingPhase}</span>
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="w-full bg-teal hover:bg-teal-light text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer transform hover:-translate-y-[1px]"
                  >
                    Begin Triage Analysis
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* ── Emergency Mode Modal ────────────────────────────── */}
      {showEmergencyModal && (
        <div className="fixed inset-0 bg-navy/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-border">
            <div className="bg-red-600 text-white p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold flex items-center space-x-2">
                  <span>🚨</span>
                  <span>Emergency Mode Enabled</span>
                </h3>
                <button
                  onClick={() => setShowEmergencyModal(false)}
                  className="text-white hover:text-white/80 font-bold text-xl"
                >
                  ✕
                </button>
              </div>
              <p className="text-sm text-white/90 mt-2">
                If you are facing a life-threatening medical situation, immediately call the national emergency number:
              </p>
              <div className="mt-4 flex items-center justify-center">
                <a
                  href="tel:112"
                  className="bg-white text-red-600 font-extrabold text-xl py-3 px-6 rounded-xl shadow-md flex items-center space-x-2 hover:scale-105 transition-transform"
                >
                  📞 Call 112
                </a>
              </div>
            </div>

            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
              <h4 className="font-bold text-navy border-b pb-2">Recommended Emergency Hospitals:</h4>
              
              {cities.map((cityName) => (
                <div key={cityName} className="space-y-3">
                  <h5 className="font-semibold text-teal uppercase text-xs tracking-wider">{cityName}</h5>
                  <div className="space-y-2.5">
                    {emergencyHospitals[cityName].map((hosp, idx) => (
                      <div key={idx} className="bg-bg-soft p-3 rounded-lg border border-border/60 text-left">
                        <div className="font-bold text-sm text-navy">{hosp.name}</div>
                        <div className="text-xs text-text-muted mt-0.5">{hosp.location}</div>
                        <div className="mt-2 text-xs">
                          <a
                            href={`tel:${hosp.phone.replace(/-/g, '')}`}
                            className="text-teal hover:underline font-semibold"
                          >
                            📞 {hosp.phone}
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-bg-soft px-6 py-4 border-t border-border flex justify-end">
              <button
                onClick={() => setShowEmergencyModal(false)}
                className="bg-navy text-white text-xs font-bold uppercase px-5 py-2.5 rounded-lg hover:bg-navy-light transition-colors"
              >
                Close Emergency Mode
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="bg-navy-dark text-white/40 text-center text-xs py-6 border-t border-navy/20">
        MediRoute MVP — Bharat Academix CodeQuest 2026. This app is for navigational help and does not provide clinical diagnosis.
      </footer>
    </div>
  )
}

export default Home
