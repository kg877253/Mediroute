import { useLocation, Link } from 'react-router-dom'
import { jsPDF } from 'jspdf'

function Results() {
  const location = useLocation()
  const { city, triageData, searchData } = location.state || {}

  // Redirect to home if accessed directly without form submission
  if (!triageData || !searchData) {
    return (
      <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold text-navy mb-4">No search details found</h2>
        <p className="text-text-muted mb-6">Please start a search from the home page first.</p>
        <Link to="/" className="bg-teal text-white font-bold py-3 px-6 rounded-xl shadow-md hover:bg-teal-light transition-all">
          Go to Home
        </Link>
      </div>
    )
  }

  const { specialty, urgency, reasoning } = triageData
  const { results, fallbackUsed } = searchData

  // Whitelisted emergency hospitals (matching city)
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

  const cityHospitals = emergencyHospitals[city] || []

  // Download Emergency PDF Card using jsPDF
  const handleDownloadPDF = () => {
    const doc = new jsPDF()
    
    // Title
    doc.setFillColor(30, 39, 97) // #1E2761
    doc.rect(0, 0, 210, 30, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(20)
    doc.text('MEDI-ROUTE EMERGENCY CARD', 15, 20)

    // Body text
    doc.setTextColor(30, 39, 97)
    doc.setFontSize(14)
    doc.text(`Emergency Info for: ${city}`, 15, 45)

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.setTextColor(80, 80, 80)
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 15, 52)
    doc.line(15, 55, 195, 55)

    // Blood Group and National Emergency Line
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(12)
    doc.setTextColor(220, 38, 38)
    doc.text(`NATIONAL EMERGENCY: 112`, 15, 65)

    doc.setTextColor(30, 39, 97)
    doc.text(`BLOOD GROUP: _____________________`, 100, 65)

    // Triage Recommendation
    doc.setFontSize(11)
    doc.text('AI Recommendation:', 15, 80)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(80, 80, 80)
    doc.text(`Recommended Specialist: ${specialty}`, 15, 87)
    
    const splitReasoning = doc.splitTextToSize(reasoning, 180)
    doc.text(splitReasoning, 15, 94)

    // City Emergency Care
    const yOffsetAfterReasoning = 100 + (splitReasoning.length * 6)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(30, 39, 97)
    doc.text(`Top 3 Emergency Providers in ${city}:`, 15, yOffsetAfterReasoning)
    
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(80, 80, 80)
    let yPos = yOffsetAfterReasoning + 7
    cityHospitals.slice(0, 3).forEach((hosp) => {
      doc.text(`- ${hosp.name} (${hosp.location})`, 15, yPos)
      doc.text(`  Phone: ${hosp.phone}`, 15, yPos + 5)
      yPos += 14
    })

    // Footer Disclaimer
    doc.setFillColor(240, 242, 247)
    doc.rect(10, 260, 190, 25, 'F')
    doc.setFontSize(8)
    doc.setTextColor(120, 120, 120)
    doc.text('Disclaimer: MediRoute provides clinical triage navigation, not medical diagnosis.', 15, 268)
    doc.text('In case of critical emergencies, dial 112 directly.', 15, 273)

    doc.save(`MediRoute_Emergency_Card_${city}.pdf`)
  }

  return (
    <div className="min-h-screen bg-bg flex flex-col font-sans">
      {/* ── Navigation Header ─────────────────────────────────── */}
      <header className="bg-navy text-white py-5 px-6 shadow-md border-b border-navy-light sticky top-0 z-40">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">🏥</span>
            <Link to="/" className="text-2xl font-bold tracking-tight text-white hover:text-teal-light transition-colors">
              Medi<span className="text-teal-light">Route</span>
            </Link>
          </div>
          <Link
            to="/"
            className="bg-navy-light hover:bg-navy-dark text-white font-bold text-xs uppercase px-4 py-2.5 rounded-lg border border-border/20 transition-all"
          >
            Search Again
          </Link>
        </div>
      </header>

      {/* ── Emergency Callout Banner (High Urgency) ───────────── */}
      {urgency === 'high' && (
        <div className="bg-red-600 text-white py-4 px-6 shadow-inner animate-pulse">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">⚠️</span>
              <div className="text-left">
                <h4 className="font-extrabold text-lg">High Urgency Situation Detected</h4>
                <p className="text-sm text-white/90 leading-tight">
                  This may be urgent — consider calling 112 or visiting the nearest emergency room
                </p>
              </div>
            </div>
            <a
              href="tel:112"
              className="bg-white text-red-600 font-black text-base px-6 py-2.5 rounded-xl shadow-md hover:scale-105 transition-transform"
            >
              📞 Call 112
            </a>
          </div>
        </div>
      )}

      {/* ── Results Container ────────────────────────────────── */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8 md:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
        
        {/* Left Section: Triage Results & Doctor List (Col Span 8) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Triage Summary Card */}
          <section className="bg-white border border-border/80 rounded-2xl p-6 md:p-8 shadow-md">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <h3 className="text-xl font-bold text-navy">Triage Assessment</h3>
              
              <div className="flex items-center space-x-2">
                {/* Urgency Badge */}
                <span className={`inline-flex items-center text-xs uppercase font-extrabold px-3 py-1.5 rounded-full ${
                  urgency === 'high' ? 'bg-red-100 text-red-800' :
                  urgency === 'medium' ? 'bg-amber-100 text-amber-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  Urgency: {urgency}
                </span>

                {/* Download PDF Card Button */}
                <button
                  onClick={handleDownloadPDF}
                  className="bg-teal/10 hover:bg-teal/20 text-teal font-semibold text-xs py-1.5 px-3 rounded-full flex items-center space-x-1"
                >
                  📥 Download Emergency Card
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-text-muted font-bold block mb-1">
                  Recommended Specialty
                </span>
                <p className="text-2xl font-black text-navy">{specialty}</p>
              </div>

              <div>
                <span className="text-xs uppercase tracking-wider text-text-muted font-bold block mb-1">
                  AI Triage Reasoning
                </span>
                <p className="text-text leading-relaxed bg-bg-soft/40 p-4 rounded-xl border border-border/40">
                  {reasoning}
                </p>
              </div>

              <div className="text-xs text-text-muted/80 italic border-t pt-3 mt-4">
                Disclaimer: AI triage does not constitute a diagnostic claim. Seek professional care to verify.
              </div>
            </div>
          </section>

          {/* Doctor Recommendations */}
          <section className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-2xl font-black text-navy">Recommended Doctors</h3>
              <span className="text-sm font-semibold text-text-muted">
                Showing top results in <span className="text-navy">{city}</span>
              </span>
            </div>

            {fallbackUsed && (
              <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-4 text-sm text-amber-900 leading-relaxed">
                💡 <strong>Notice:</strong> We couldn't find a doctor specifically matching <strong>{specialty}</strong> in <strong>{city}</strong>. We are showing general and top-rated physicians in your area instead so you can obtain an initial consultation.
              </div>
            )}

            {/* Doctors Grid */}
            <div className="space-y-4">
              {results.length > 0 ? (
                results.slice(0, 5).map((doc) => (
                  <div key={doc.id} className="bg-white border border-border/80 rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-5">
                    
                    {/* Doctor Info */}
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-lg font-bold text-navy">{doc.name}</h4>
                        {doc.nmcVerified && (
                          <span className="bg-green-100 text-green-800 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full flex items-center">
                            ✓ NMC Verified
                          </span>
                        )}
                      </div>
                      
                      <p className="text-sm text-teal font-semibold">{doc.specialty}</p>

                      <div className="flex items-center space-x-4 text-xs text-text-muted pt-1">
                        <span className="flex items-center">
                          ⭐ <strong className="text-navy ml-1">{doc.rating}</strong>/5.0
                        </span>
                        <span>•</span>
                        <span>
                          Consultation fee: <strong>₹{doc.feeRangeMin} - ₹{doc.feeRangeMax}</strong>
                        </span>
                      </div>
                    </div>

                    {/* Navigation Map Action */}
                    <div className="flex items-center">
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=Dr.+${encodeURIComponent(doc.name)}+${encodeURIComponent(doc.specialty)}+${encodeURIComponent(doc.city)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-navy hover:bg-navy-light text-white font-bold text-xs uppercase px-5 py-3 rounded-xl shadow-md flex items-center space-x-1.5 transition-all text-center w-full md:w-auto"
                      >
                        <span>🧭 Get Directions</span>
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white border border-border rounded-2xl p-8 text-center text-text-muted">
                  No doctors found in your city.
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Right Section: City Emergency Hospitals (Col Span 4) */}
        <div className="lg:col-span-4 space-y-6">
          <section className="bg-bg-soft/70 border border-border rounded-2xl p-6 shadow-sm">
            <h4 className="text-lg font-bold text-navy mb-4 flex items-center space-x-2">
              <span>🏥</span>
              <span>Local Emergency Care</span>
            </h4>
            
            <p className="text-xs text-text-muted mb-4 leading-relaxed">
              If your symptoms worsen or require immediate emergency assistance, contact these major institutions in <strong>{city}</strong>:
            </p>

            <div className="space-y-3">
              {cityHospitals.length > 0 ? (
                cityHospitals.map((hosp, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-xl border border-border/50 text-left">
                    <h5 className="font-bold text-sm text-navy">{hosp.name}</h5>
                    <p className="text-[11px] text-text-muted mt-0.5 leading-snug">{hosp.location}</p>
                    <a
                      href={`tel:${hosp.phone.replace(/-/g, '')}`}
                      className="inline-flex items-center text-xs text-teal font-bold hover:underline mt-2"
                    >
                      📞 {hosp.phone}
                    </a>
                  </div>
                ))
              ) : (
                <p className="text-xs text-text-muted">No emergency hospitals listed for this city.</p>
              )}
            </div>
          </section>
        </div>

      </main>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="bg-navy-dark text-white/40 text-center text-xs py-6 border-t border-navy/20 mt-12">
        MediRoute MVP — Bharat Academix CodeQuest 2026. All recommendations are advisory. Dial 112 for direct emergencies.
      </footer>
    </div>
  )
}

export default Results
