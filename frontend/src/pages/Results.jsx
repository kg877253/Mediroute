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
        <div className="max-w-md rounded-3xl border border-slate-200 bg-white p-10 shadow-sm animate-fade-in-up">
          <h2 className="text-2xl font-bold text-navy">No search details found</h2>
          <p className="mt-3 text-sm text-slate-500">Please start a search from the home page first.</p>
          <Link to="/" className="mt-8 btn-primary w-full">
            Go to Home
          </Link>
        </div>
      </div>
    )
  }

  const { specialty, urgency, reasoning, confidence } = triageData
  const { results = [], fallbackUsed } = searchData

  const urgencyStyles = {
    high: 'bg-red-50 text-red-700',
    medium: 'bg-amber-50 text-amber-800',
    low: 'bg-green-50 text-green-700'
  }

  const confidenceBadgeStyles = confidence >= 70
    ? 'bg-green-50 text-green-700'
    : confidence >= 55
      ? 'bg-amber-50 text-amber-700'
      : 'bg-red-50 text-red-700'

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
    <div className="page-shell flex min-h-screen flex-col">
      <header className="bg-navy relative overflow-hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10 md:py-6 relative z-10">
          <Link to="/" className="group flex min-w-0 shrink-0 items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-navy transition-transform group-hover:scale-105">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div className="min-w-0 shrink">
              <p className="text-2xl font-bold leading-none text-white tracking-tight">
                Medi<span className="text-teal-light">Route</span>
              </p>
              <p className="label-section mt-1.5 !text-slate-300">
                {city} care route
              </p>
            </div>
          </Link>

          <Link to="/" className="btn-ghost !text-white hover:!bg-white/10 transition-colors">
            Search Again
          </Link>
        </div>
      </header>

      <main className="w-full max-w-7xl mx-auto px-6 py-10 md:py-16 flex-1 relative z-10 animate-fade-in-up">
        {urgency === 'high' && (
          <section className="mb-10 overflow-hidden rounded-3xl bg-[#dc2626] text-white">
            <div className="flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-5">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/20 animate-pulse-subtle">
                  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </span>
                <div>
                  <p className="label-section !text-red-200">Critical Attention Required</p>
                  <h1 className="heading-display mt-2 text-3xl md:text-4xl text-white">Call 112 for Immediate Assistance</h1>
                  <p className="mt-3 max-w-2xl text-base text-red-100">
                    MediRoute has detected high urgency symptoms. Please proceed directly to medical emergency personnel.
                  </p>
                </div>
              </div>
              <a href="tel:112" className="btn-primary shrink-0 !bg-white !text-red-600 hover:!bg-slate-50 !px-8 !py-4 shadow-none border-none">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call 112 Now
              </a>
            </div>
          </section>
        )}

        <section className="grid gap-10 lg:grid-cols-[1fr_360px]">
          <div className="space-y-10">
            <section className="report-panel">
              <div className="report-panel__header">
                <span className="label-section !text-slate-300">Symptom Triage Assessment</span>
                <span className={`rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wide ${confidenceBadgeStyles}`}>
                  {confidence}% Confident
                </span>
              </div>

              <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_300px]">
                <div className="min-w-0 space-y-8 p-8 md:p-10 lg:pr-10 relative z-10">
                  {triageData.fallbackUsed && (
                    <div className="flex items-start gap-4 rounded-2xl bg-amber-50 p-6 text-sm font-medium text-amber-900">
                      <svg className="mt-0.5 h-6 w-6 shrink-0 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <div>
                        <strong className="font-bold text-amber-950">AI Triage Unavailable:</strong> Falling back to a safe general recommendation.
                      </div>
                    </div>
                  )}

                  <div>
                    <p className="label-section">Recommended Specialty</p>
                    <h1 className="heading-display mt-3 text-4xl md:text-5xl lg:text-6xl text-navy break-words">
                      {specialty}
                    </h1>
                  </div>

                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6">
                    <p className="label-section mb-3">Clinical Reasoning</p>
                    <p className="text-base text-slate-700 leading-relaxed">{reasoning}</p>
                  </div>

                  <div className="flex gap-4 rounded-2xl border border-slate-100 bg-white p-5 text-sm text-slate-500">
                    <svg className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p>
                      <strong>Disclaimer:</strong> AI triage estimations are advisory only and do not replace physical clinical evaluation. Confirm with your doctor.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col justify-center gap-8 border-t border-slate-100 bg-slate-50 p-8 md:p-10 lg:border-l lg:border-t-0">
                  <div>
                    <p className="label-section">Urgency Status</p>
                    <span className={`mt-3 inline-flex rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider ${urgencyStyles[urgency] || urgencyStyles.medium}`}>
                      Urgency: {urgency}
                    </span>
                  </div>

                  <div className="rounded-2xl bg-white p-6 shadow-sm">
                    <p className="label-section">Triage Location</p>
                    <p className="heading-display mt-2 text-2xl text-navy">{city}</p>
                  </div>

                  <button type="button" onClick={handleDownloadPDF} className="btn-outline w-full !py-4">
                    <svg className="h-5 w-5 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Emergency Card (PDF)
                  </button>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between border-b border-slate-100 pb-4">
                <div>
                  <p className="label-section">Recommended Specialists</p>
                  <h2 className="heading-display mt-2 text-3xl">Verified Medical Officers</h2>
                </div>
                <p className="text-sm font-medium text-slate-500 pb-1">
                  Showing {Math.min(results.length, 5)} results in <span className="font-bold text-navy">{city}</span>
                </p>
              </div>

              {fallbackUsed && (
                <div className="rounded-2xl bg-amber-50 p-6 text-sm font-medium text-amber-900">
                  No exact {specialty} match was found in {city}, so MediRoute is showing top-rated local doctors for an initial consultation.
                </div>
              )}

              <div className="grid gap-4">
                {results.length > 0 ? (
                  results.slice(0, 5).map((doc, index) => (
                    <DoctorCard key={doc.id} doc={doc} index={index} />
                  ))
                ) : (
                  <div className="rounded-3xl border border-slate-100 bg-white p-12 text-center text-slate-500">
                    <svg className="mx-auto h-16 w-16 text-slate-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-lg font-bold text-navy">No matching medical practitioners found in this location.</p>
                  </div>
                )}
              </div>
            </section>
          </div>

          <aside className="space-y-8 lg:sticky lg:top-32 lg:max-h-[calc(100vh-8rem)] lg:self-start lg:overflow-y-auto no-scrollbar">
            <section className="card-elevated p-8">
              <p className="label-section">Local Emergency Care</p>
              <h2 className="mt-2 text-2xl font-bold text-navy">{city} Contacts</h2>
              <p className="mt-3 text-sm text-slate-500 leading-relaxed">
                In case of critical clinical developments, contact these top-tier emergency providers directly.
              </p>

              <div className="mt-6 space-y-4">
                {cityHospitals.length > 0 ? (
                  cityHospitals.slice(0, 3).map((hosp) => (
                    <div key={hosp.name} className="rounded-2xl bg-slate-50 p-5 transition-colors hover:bg-slate-100">
                      <h3 className="text-sm font-bold text-navy">{hosp.name}</h3>
                      <p className="mt-1 text-xs text-slate-500">{hosp.location}</p>
                      
                      <div className="mt-4">
                        <a
                          href={`tel:${hosp.phone.replace(/-/g, '')}`}
                          className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-teal shadow-sm transition-colors hover:bg-teal hover:text-white"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          {hosp.phone}
                        </a>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-400">No emergency hospitals listed for this city.</p>
                )}
              </div>
            </section>

            <section className="card-clinical p-6 bg-slate-50">
              <p className="label-section flex items-center gap-2">
                <svg className="h-5 w-5 text-navy opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Clinical Navigation Guard
              </p>
              <p className="mt-3 text-sm text-slate-500 leading-relaxed">
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
