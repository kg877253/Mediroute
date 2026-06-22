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
        <div className="max-w-md rounded-[2rem] border border-border bg-white p-10 shadow-2xl shadow-navy/5 animate-fade-in-up">
          <h2 className="text-[1.75rem] font-extrabold text-navy">No search details found</h2>
          <p className="mt-3 text-sm font-medium text-slate-500">Please start a search from the home page first.</p>
          <Link to="/" className="mt-8 btn-primary inline-flex">
            Go to Home
          </Link>
        </div>
      </div>
    )
  }

  const { specialty, urgency, reasoning, confidence } = triageData
  const { results = [], fallbackUsed } = searchData

  const urgencyStyles = {
    high: 'border-red-200 bg-red-50 text-red-700 shadow-sm',
    medium: 'border-amber-200 bg-amber-50 text-amber-800 shadow-sm',
    low: 'border-green-200 bg-green-50 text-green-700 shadow-sm'
  }

  const confidenceBadgeStyles = confidence >= 70
    ? 'bg-green-100 text-green-800 border-green-200 shadow-sm'
    : confidence >= 55
      ? 'bg-amber-100 text-amber-800 border-amber-200 shadow-sm'
      : 'bg-red-100 text-red-800 border-red-200 shadow-sm'

  const confidenceBarColor = confidence >= 70
    ? 'bg-gradient-to-r from-green-400 to-green-500'
    : confidence >= 55
      ? 'bg-gradient-to-r from-amber-400 to-amber-500'
      : 'bg-gradient-to-r from-red-400 to-red-500'

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
    <div className="page-shell flex min-h-screen flex-col font-sans text-text">
      <header className="site-header site-header--dark relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay"></div>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5 relative z-10">
          <Link to="/" className="group flex min-w-0 shrink-0 items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal to-teal-dark text-white transition-transform group-hover:scale-105 shadow-md shadow-teal/20">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div className="min-w-0 shrink">
              <p className="text-xl font-extrabold leading-none text-white tracking-tight">
                Medi<span className="text-teal-light">Route</span>
              </p>
              <p className="label-section mt-1 !text-[10px] !text-slate-300">
                {city} care route
              </p>
            </div>
          </Link>

          <Link to="/" className="btn-ghost !border-white/20 !bg-white/10 !text-white hover:!bg-white/20 hover:!border-white/30 backdrop-blur-sm transition-all shadow-sm">
            Search Again
          </Link>
        </div>
      </header>

      <main className="w-full max-w-7xl mx-auto px-6 py-8 md:py-12 flex-1 relative z-10 animate-fade-in-up">
        {/* High Urgency Notification Banner */}
        {urgency === 'high' && (
          <section className="mb-8 overflow-hidden rounded-[1.25rem] border border-red-500 bg-gradient-to-r from-red-600 to-red-700 text-white shadow-xl shadow-red-600/20 relative group">
            {/* Subtle animated pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-30"></div>
            <div className="flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between md:p-7 relative z-10">
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm shadow-inner animate-pulse-subtle">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </span>
                <div>
                  <p className="label-section !text-red-200">Critical Attention Required</p>
                  <h1 className="heading-display mt-1 text-[1.35rem] text-white md:text-2xl drop-shadow-sm">Call 112 or visit the nearest emergency department</h1>
                  <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-red-100 font-medium">
                    MediRoute has detected high urgency symptoms. Please proceed directly to medical emergency personnel.
                  </p>
                </div>
              </div>
              <a href="tel:112" className="btn-danger-solid shrink-0 !py-3 !px-6 !text-base shadow-lg shadow-black/10 group-hover:shadow-black/20">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
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
            <section className="report-panel relative">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <svg className="h-24 w-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
              </div>
              <div className="report-panel__header">
                <span className="label-section !text-slate-300">Symptom Triage Assessment</span>
                <span className={`rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${confidenceBadgeStyles}`}>
                  {confidence}% Confident
                </span>
              </div>

              <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_260px]">
                <div className="min-w-0 space-y-6 overflow-hidden p-6 md:p-8 lg:pr-6 relative z-10">
                  {triageData.fallbackUsed && (
                    <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-4 text-[13px] font-semibold leading-relaxed text-amber-900 shadow-sm">
                      <svg className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <div>
                        <strong className="font-extrabold text-amber-950">AI Triage Unavailable:</strong> Falling back to a safe general recommendation.
                      </div>
                    </div>
                  )}

                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 shadow-inner">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ease-out ${confidenceBarColor}`}
                      style={{ width: `${confidence}%` }}
                    />
                  </div>

                  <div>
                    <p className="label-section">Recommended Specialty</p>
                    <h1 className="heading-display mt-1.5 break-words text-[2rem] md:text-[2.75rem] leading-none bg-gradient-to-br from-navy to-navy-light bg-clip-text text-transparent">
                      {specialty}
                    </h1>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-5 shadow-sm">
                    <p className="label-section mb-2 !text-slate-600">Clinical Reasoning</p>
                    <p className="text-[15px] leading-relaxed text-slate-600 font-medium">{reasoning}</p>
                  </div>

                  <div className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4 text-[12px] leading-relaxed text-slate-500 shadow-sm">
                    <svg className="mt-0.5 h-4.5 w-4.5 shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p>
                      <strong>Disclaimer:</strong> AI triage estimations are advisory only and do not replace physical clinical evaluation. Confirm with your doctor.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col justify-center gap-5 border-t border-slate-100 bg-slate-50/50 p-6 md:p-8 lg:border-l lg:border-t-0 relative z-10">
                  <div>
                    <p className="label-section">Urgency Status</p>
                    <span className={`mt-2.5 inline-flex rounded-xl border px-3.5 py-1.5 text-[11px] font-black uppercase tracking-wider ${urgencyStyles[urgency] || urgencyStyles.medium}`}>
                      Urgency: {urgency}
                    </span>
                  </div>

                  <div className="card-clinical p-4.5 shadow-sm border-white bg-white/60 backdrop-blur-md">
                    <p className="label-section">Triage Location</p>
                    <p className="heading-display mt-1 text-[1.35rem]">{city}</p>
                  </div>

                  <button type="button" onClick={handleDownloadPDF} className="btn-outline w-full shadow-sm mt-2 !py-3">
                    <svg className="h-4.5 w-4.5 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Emergency Card (PDF)
                  </button>
                </div>
              </div>
            </section>

            {/* Doctors Recommendations List */}
            <section className="space-y-5">
              <div className="flex flex-col gap-1.5 sm:flex-row sm:items-end sm:justify-between border-b border-slate-200 pb-3">
                <div>
                  <p className="label-section">Recommended Specialists</p>
                  <h2 className="heading-display mt-1 text-[1.35rem] md:text-[1.75rem]">Verified Medical Officers</h2>
                </div>
                <p className="text-[13px] font-medium text-slate-500 pb-1">
                  Showing {Math.min(results.length, 5)} results in <span className="font-extrabold text-navy">{city}</span>
                </p>
              </div>

              {fallbackUsed && (
                <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-4.5 text-[13px] font-semibold leading-relaxed text-amber-900 shadow-sm">
                  No exact {specialty} match was found in {city}, so MediRoute is showing top-rated local doctors for an initial consultation.
                </div>
              )}

              <div className="grid gap-3.5">
                {results.length > 0 ? (
                  results.slice(0, 5).map((doc, index) => (
                    <DoctorCard key={doc.id} doc={doc} index={index} />
                  ))
                ) : (
                  <div className="rounded-[1.5rem] border border-slate-200 bg-white p-10 text-center text-slate-400 shadow-sm">
                    <svg className="mx-auto h-12 w-12 text-slate-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-base font-bold text-navy">No matching medical practitioners found in this location.</p>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Right Sidebar: Local Emergency and Safety Info */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:max-h-[calc(100vh-6rem)] lg:self-start lg:overflow-y-auto no-scrollbar">
            <section className="card-elevated p-6 shadow-xl shadow-navy/5">
              <p className="label-section">Local Emergency Care</p>
              <h2 className="mt-1.5 text-xl font-extrabold text-navy">{city} Contacts</h2>
              <p className="mt-2.5 text-[13px] font-medium leading-relaxed text-slate-500">
                In case of critical clinical developments, contact these top-tier emergency providers directly.
              </p>

              <div className="mt-5 space-y-3">
                {cityHospitals.length > 0 ? (
                  cityHospitals.slice(0, 3).map((hosp) => (
                    <div key={hosp.name} className="rounded-[1rem] border border-slate-200 bg-slate-50/50 p-4 transition-all hover:border-teal/30 hover:bg-white hover:shadow-md">
                      <h3 className="break-words text-[13px] font-bold leading-snug text-navy">{hosp.name}</h3>
                      <p className="mt-1 break-words text-[11px] font-medium leading-relaxed text-slate-500">{hosp.location}</p>
                      
                      <div className="mt-3">
                        <a
                          href={`tel:${hosp.phone.replace(/-/g, '')}`}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-bold text-teal transition-all hover:border-teal hover:bg-teal/5 shadow-sm"
                        >
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          {hosp.phone}
                        </a>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs font-medium text-slate-400">No emergency hospitals listed for this city.</p>
                )}
              </div>
            </section>

            <section className="card-clinical border-l-[4px] border-l-navy p-5 shadow-sm bg-gradient-to-r from-slate-50 to-white">
              <p className="label-section flex items-center gap-2">
                <svg className="h-4 w-4 text-navy opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Clinical Navigation Guard
              </p>
              <p className="mt-2.5 text-[12px] font-medium leading-relaxed text-slate-500">
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
