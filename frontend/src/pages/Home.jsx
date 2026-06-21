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
    const newEntry = {
      symptom,
      city: searchCity,
      specialty,
      timestamp: new Date().toISOString()
    }
    const filteredHistory = historyData.filter(
      item => !(item.symptom === symptom && item.city === searchCity)
    )
    const updatedHistory = [newEntry, ...filteredHistory].slice(0, 5)
    localStorage.setItem('symptomHistory', JSON.stringify(updatedHistory))
    setHistory(updatedHistory)
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

      const payload = { symptomText, city, triageData, searchData }
      sessionStorage.setItem('mediroute_results', JSON.stringify(payload))
      navigate('/results', { state: payload })

      // Save to history after successful navigation
      saveToHistory(symptomText, city, triageData.specialty)
    } catch (err) {
      console.error(err)
      setError(err.message || 'Failed to connect to the server. Please check that the backend is running.')
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
      {/* Decorative gradient blur background shapes */}
      <div className="absolute top-[20%] left-[10%] w-[350px] h-[350px] rounded-full bg-teal/5 blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-[20%] right-[10%] w-[450px] h-[450px] rounded-full bg-navy/5 blur-3xl pointer-events-none -z-10" />

      <Header onOpenEmergency={openEmergencyMode} />

      <main className="max-w-7xl mx-auto px-6 w-full flex-1 flex flex-col relative z-10">
        <RecentSearches history={history} onSelectHistory={handleSelectHistory} />

        <div className="py-8 lg:py-12 flex-1 flex items-start">
          <section className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] w-full">
            <Hero />

            <div className="w-full max-w-[500px] mx-auto lg:mr-0">
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
        </div>
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
