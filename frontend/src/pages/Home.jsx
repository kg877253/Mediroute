import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import Hero from '../components/home/Hero'
import RecentSearches from '../components/home/RecentSearches'
import SearchForm from '../components/home/SearchForm'
import EmergencyModal from '../components/home/EmergencyModal'

function Home() {
  const [symptomText, setSymptomText] = useState('')
  const [city, setCity] = useState('Delhi')
  const [emergencyCity, setEmergencyCity] = useState('Delhi')
  const [loading, setLoading] = useState(false)
  const [loadingPhase, setLoadingPhase] = useState('')
  const [error, setError] = useState('')
  const [showEmergencyModal, setShowEmergencyModal] = useState(false)
  const [history, setHistory] = useState(() => {
    return JSON.parse(localStorage.getItem('symptomHistory') || '[]')
  })

  const navigate = useNavigate()
  const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'

  const openEmergencyMode = () => {
    setEmergencyCity(city)
    setShowEmergencyModal(true)
  }

  const saveToHistory = (symptom, searchCity, specialty) => {
    const historyData = JSON.parse(localStorage.getItem('symptomHistory') || '[]')
    const newEntry = { symptom, city: searchCity, specialty, timestamp: new Date().toISOString() }
    const filtered = historyData.filter(
      item => !(item.symptom === symptom && item.city === searchCity)
    )
    const updated = [newEntry, ...filtered].slice(0, 5)
    localStorage.setItem('symptomHistory', JSON.stringify(updated))
    setHistory(updated)
  }

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault()
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
      if (!triageRes.ok) throw new Error(triageData.error || 'Symptom triage failed.')
      if (!triageData.specialty) throw new Error('Triage response did not include a specialty.')

      setLoadingPhase('Finding verified doctors near you')
      const searchRes = await fetch(`${apiBaseUrl}/api/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ specialty: triageData.specialty, city })
      })
      const searchData = await searchRes.json()
      if (!searchRes.ok) throw new Error(searchData.error || 'Doctor search failed.')

      const payload = { symptomText, city, triageData, searchData }
      sessionStorage.setItem('mediroute_results', JSON.stringify(payload))
      navigate('/results', { state: payload })
      saveToHistory(symptomText, city, triageData.specialty)
    } catch (err) {
      console.error(err)
      setError(err.message || 'Failed to connect. Please check the backend is running.')
    } finally {
      setLoading(false)
      setLoadingPhase('')
    }
  }

  const handleSelectHistory = (histSymptom, histCity) => {
    setSymptomText(histSymptom)
    setCity(histCity)
  }

  return (
    <div className="min-h-screen bg-bg font-sans text-text flex flex-col relative overflow-hidden bg-grid-pattern">
      {/* Decorative blobs */}
      <div className="absolute top-[15%] left-[5%] w-[300px] h-[300px] rounded-full bg-teal/5 blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-[15%] right-[5%] w-[400px] h-[400px] rounded-full bg-navy/5 blur-3xl pointer-events-none -z-10" />

      <Header onOpenEmergency={openEmergencyMode} />

      {/* Main — items-start, no min-h calc, no justify-center = no dead space */}
      <main className="max-w-7xl mx-auto px-6 w-full flex-1 flex flex-col py-6 relative z-10">

        <RecentSearches history={history} onSelectHistory={handleSelectHistory} />

        <section className="grid items-start gap-6 lg:grid-cols-[1fr_1fr] w-full min-h-[calc(100vh-220px)]">
          <Hero />
          <div className="w-full">
            <SearchForm
              symptomText={symptomText}
              setSymptomText={setSymptomText}
              city={city}
              setCity={setCity}
              loading={loading}
              loadingPhase={loadingPhase}
              error={error}
              setError={setError}
              onSubmit={handleSubmit}
            />
          </div>
        </section>
      </main>

      <Footer />

      {showEmergencyModal && (
        <EmergencyModal
          emergencyCity={emergencyCity}
          setEmergencyCity={setEmergencyCity}
          onClose={() => setShowEmergencyModal(false)}
        />
      )}
    </div>
  )
}

export default Home
