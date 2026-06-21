import { useLocation, Link } from 'react-router-dom'
import Footer from '../components/layout/Footer'
import DoctorCard from '../components/results/DoctorCard'

function Results() {
  const location = useLocation()
  let { city, triageData, searchData } = location.state || {}

  if (!triageData || !searchData) {
    try {
      const stored = sessionStorage.getItem('mediroute_results')
      if (stored) {
        const parsed = JSON.parse(stored)
        city = parsed.city
        triageData = parsed.triageData
        searchData = parsed.searchData
      }
    } catch (err) {
      console.error('Failed to restore results from session storage:', err)
    }
  }

  if (!triageData || !searchData) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-bg p-6 text-center font-sans">
        <div className="max-w-md rounded-3xl border border-border bg-white p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-navy">No search details found</h2>
          <p className="mt-3 text-text-muted">Please start a search from the home page first.</p>
          <Link to="/" className="mt-6 inline-flex rounded-2xl bg-teal px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-teal-light transition-all">
            Go to Home
          </Link>
        </div>
      </div>
    )
  }

  const { specialty, urgency, reasoning, confidence } = triageData
  const { results = [], fallbackUsed } = searchData

  const urgencyStyles = {
    high: 'border-red-200 bg-red-50 text-red-700',
    medium: 'border-amber-200 bg-amber-50 text-amber-800',
    low: 'border-green-200 bg-green-50 text-green-700'
  }

  const confidenceColor = confidence >= 90 ? 'text-green-600' :
                         confidence >= 80 ? 'text-yellow-600' : 'text-red-600'

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

  const handleDownloadPDF = async () => {
    const { jsPDF } = await import('jspdf')
    const doc = new jsPDF()

    doc.setFillColor(30, 39, 97)
    doc.rect(0, 0, 210, 30, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(20)
    doc.text('MEDIROUTE EMERGENCY CARD', 15, 20)

    doc.setTextColor(30, 39, 97)
    doc.setFontSize(14)
    doc.text(`Emergency Info for: ${city}`, 15, 45)

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.setTextColor(80, 80, 80)
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 15, 52)
    doc.line(15, 55, 195, 55)

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(12)
    doc.setTextColor(220, 38, 38)
    doc.text('NATIONAL EMERGENCY: 112', 15, 65)

    doc.setTextColor(30, 39, 97)
    doc.text('BLOOD GROUP: _____________________', 100, 65)

    doc.setFontSize(11)
    doc.text('AI Recommendation:', 15, 80)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(80, 80, 80)
    doc.text(`Recommended Specialist: ${specialty}`, 15, 87)

    const splitReasoning = doc.splitTextToSize(reasoning, 180)
    doc.text(splitReasoning, 15, 94)

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

    doc.setFillColor(240, 242, 247)
    doc.rect(10, 260, 190, 25, 'F')
    doc.setFontSize(8)
    doc.setTextColor(120, 120, 120)
    doc.text('Disclaimer: MediRoute provides clinical triage navigation, not medical diagnosis.', 15, 268)
    doc.text('In case of critical emergencies, dial 112 directly.', 15, 273)

    doc.save(`MediRoute_Emergency_Card_${city}.pdf`)
  }

  return (
    <div className="min-h-screen bg-bg font-sans text-text flex flex-col relative overflow-hidden bg-grid-pattern">
      {/* Decorative gradient blur background shapes */}
      <div className="absolute top-[15%] right-[5%] w-[400px] h-[400px] rounded-full bg-teal/5 blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-[30%] left-[5%] w-[350px] h-[350px] rounded-full bg-navy/5 blur-3xl pointer-events-none -z-10" />

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/5 bg-navy/95 backdrop-blur-md shadow-md">
        <div className="flex items-center justify-between max-w-7xl mx-auto px-6 py-4">
          <Link to="/" className="flex items-center gap-3.5 group">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-teal to-teal-dark text-xl font-bold text-white shadow-md shadow-teal/20 group-hover:scale-105 transition-transform duration-300">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div>
              <p className="text-xl font-extrabold tracking-tight leading-none text-white">
                Medi<span className="text-teal-light">Route</span>
              </p>
              <p className="mt-1 text-[10px] font-medium tracking-wide uppercase text-slate-400">
                {city} care route
              </p>
            </div>
          </Link>

          <Link
            to="/"
            className="rounded-xl bg-white/10 border border-white/10 hover:bg-white/20 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:scale-105 active:scale-95 duration-200"
          >
            Search Again
          </Link>
        </div>
      </header>

      <main className="w-full max-w-7xl mx-auto px-6 py-8 md:py-10 flex-1 relative z-10">
        {/* High Urgency Notification Banner */}
        {urgency === 'high' && (
          <section className="mb-8 rounded-3xl border border-red-200 bg-gradient-to-r from-red-600 to-red-700 p-6 text-white shadow-lg shadow-red-950/15 relative overflow-hidden">
            <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 text-white/5 font-black text-[120px] pointer-events-none">+</div>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between relative z-10">
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-white">
                  <svg className="h-6 w-6 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/80">Critical Attention Required</p>
                  <h1 className="mt-0.5 text-xl md:text-2xl font-extrabold tracking-tight">Call 112 or visit the nearest emergency department</h1>
                  <p className="mt-1 text-sm text-red-100 max-w-2xl leading-relaxed">
                    MediRoute has detected high urgency symptoms. Please proceed directly to medical emergency personnel.
                  </p>
                </div>
              </div>
              <a 
                href="tel:112" 
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-bold text-red-600 shadow-md hover:bg-red-50 hover:shadow-lg transition-all hover:-translate-y-0.5 active:scale-95 duration-200 shrink-0"
              >
                <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call 112 Now
              </a>
            </div>
          </section>
        )}

        <section className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="space-y-8">
            {/* Triage Lab Report Style Assessment */}
            <section className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
              <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_280px]">
                {/* Left Block: Assessment & Reasoning */}
                <div className="p-8 md:p-10">
                  {triageData.fallbackUsed && (
                    <div className="mb-5 rounded-2xl border border-amber-100 bg-amber-50/50 p-4 text-xs font-semibold leading-relaxed text-amber-900 flex items-start gap-2.5">
                      <svg className="h-4.5 w-4.5 text-amber-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <div>
                        <strong>AI Triage Unavailable:</strong> Falling back to a safe general recommendation.
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between gap-4 mb-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-teal">Symptom Triage Assessment</p>
                    <div className={`text-base font-extrabold tracking-tight ${confidenceColor}`}>
                      {confidence}% Confident
                    </div>
                  </div>

                  <div className="w-full bg-slate-100 rounded-full h-1.5 mb-6 overflow-hidden">
                    <div
                      className="bg-teal h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${confidence}%` }}
                    ></div>
                  </div>

                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Recommended Specialty</p>
                  <h1 className="mt-1 text-3xl md:text-4xl font-extrabold text-navy leading-tight">{specialty}</h1>
                  
                  <div className="mt-6">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Clinical Reasoning</p>
                    <p className="mt-2 text-base leading-relaxed text-slate-500 font-medium">{reasoning}</p>
                  </div>

                  <div className="mt-6 flex gap-2.5 rounded-2xl border border-slate-100 bg-slate-50/50 p-4 text-sm font-medium text-slate-500">
                    <svg className="h-4.5 w-4.5 text-slate-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p>
                      Disclaimer: AI triage estimations are advisory only and do not replace physical clinical evaluation. Confirm with your doctor.
                    </p>
                  </div>
                </div>

                {/* Right Block: Route Info & PDF Download */}
                <div className="border-t border-slate-100 bg-slate-50/50 p-8 lg:border-l lg:border-t-0 flex flex-col justify-center">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Urgency Status</p>
                  <div className="mt-2">
                    <span className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-extrabold uppercase tracking-wide ${urgencyStyles[urgency] || urgencyStyles.medium}`}>
                      Urgency: {urgency}
                    </span>
                  </div>

                  <div className="mt-6 rounded-2xl bg-white border border-slate-100 p-4 shadow-sm">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Triage Location</p>
                    <p className="mt-0.5 text-lg font-extrabold text-navy">{city}</p>
                  </div>

                  <button
                    type="button"
                    onClick={handleDownloadPDF}
                    className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-2xl border border-teal/20 hover:border-teal/40 bg-white hover:bg-teal/5 px-4 py-3.5 text-xs font-bold uppercase tracking-wider text-teal shadow-sm transition-all cursor-pointer"
                  >
                    <svg className="h-4 w-4 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Emergency Card (PDF)
                  </button>
                </div>
              </div>
            </section>

            {/* Doctors Recommendations List */}
            <section className="space-y-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-teal">Recommended Specialists</p>
                  <h2 className="text-2xl font-extrabold text-navy">Verified Medical Officers</h2>
                </div>
                <p className="text-xs font-semibold text-slate-400">
                  Showing {Math.min(results.length, 5)} results in <span className="text-navy font-bold">{city}</span>
                </p>
              </div>

              {fallbackUsed && (
                <div className="rounded-2xl border border-amber-100 bg-amber-50/50 p-4 text-xs font-medium leading-relaxed text-amber-900">
                  No exact {specialty} match was found in {city}, so MediRoute is showing top-rated local doctors for an initial consultation.
                </div>
              )}

              <div className="grid gap-4">
                {results.length > 0 ? (
                  results.slice(0, 5).map((doc, index) => (
                    <DoctorCard key={doc.id} doc={doc} index={index} />
                  ))
                ) : (
                  <div className="rounded-3xl border border-slate-100 bg-white p-8 text-center text-slate-400 shadow-sm">
                    <p className="text-sm font-semibold text-navy">No matching medical practitioners found in this location.</p>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Right Sidebar: Local Emergency and Safety Info */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-wider text-teal">Local Emergency Care</p>
              <h2 className="mt-1 text-xl font-extrabold text-navy">{city} Contacts</h2>
              <p className="mt-2 text-xs leading-relaxed text-slate-400">
                In case of critical clinical developments, contact these top-tier emergency providers directly.
              </p>

              <div className="mt-5 space-y-3">
                {cityHospitals.length > 0 ? (
                  cityHospitals.slice(0, 3).map((hosp) => (
                    <div key={hosp.name} className="rounded-2xl border border-slate-50 bg-slate-50/30 p-4 hover:border-slate-100 transition-all flex flex-col justify-center">
                      <h3 className="text-xs font-bold text-navy truncate">{hosp.name}</h3>
                      <p className="text-[10px] text-slate-400 mt-1 truncate">{hosp.location}</p>
                      
                      <div className="mt-2.5">
                        <a
                          href={`tel:${hosp.phone.replace(/-/g, '')}`}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-3 py-1.5 text-xs font-semibold text-teal hover:border-teal/30 hover:bg-teal/5 transition-all shadow-sm"
                        >
                          <svg className="h-3 w-3 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          {hosp.phone}
                        </a>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400">No emergency hospitals listed for this city.</p>
                )}
              </div>
            </section>

            <section className="rounded-3xl bg-navy p-6 text-white shadow-sm relative overflow-hidden">
              <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 text-white/5 font-black text-6xl pointer-events-none">+</div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-teal-light">Clinical Navigation Guard</p>
              <p className="mt-2 text-xs leading-relaxed text-slate-300">
                MediRoute does not diagnose conditions. Please consult with a certified medical doctor for definitive advice.
              </p>
            </section>
          </aside>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Results
