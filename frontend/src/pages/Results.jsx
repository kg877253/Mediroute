import { useLocation, Link } from 'react-router-dom'
import { useState } from 'react'

function Results() {
  const [selectedForComparison, setSelectedForComparison] = useState([])

  const toggleComparison = (doctor) => {
    if (selectedForComparison.find(d => d.id === doctor.id)) {
      setSelectedForComparison(selectedForComparison.filter(d => d.id !== doctor.id))
    } else if (selectedForComparison.length < 3) {
      setSelectedForComparison([...selectedForComparison, doctor])
    }
  }
  const location = useLocation()
  const { city, triageData, searchData } = location.state || {}

  if (!triageData || !searchData) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-bg p-6 text-center font-sans">
        <div className="max-w-md rounded-3xl border border-border bg-white p-8 shadow-xl">
          <h2 className="text-2xl font-black text-navy">No search details found</h2>
          <p className="mt-3 text-text-muted">Please start a search from the home page first.</p>
          <Link to="/" className="mt-6 inline-flex rounded-2xl bg-teal px-6 py-3 text-sm font-black text-white shadow-md hover:bg-teal-light">
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

  const getAvailability = (doctor) => {
    const hours = new Date().getHours()
    if (hours >= 9 && hours <= 17) {
      return { status: 'Available Today', color: 'text-green-600', bg: 'bg-green-100' }
    } else if (hours >= 18 && hours <= 21) {
      return { status: 'Available Evening', color: 'text-yellow-600', bg: 'bg-yellow-100' }
    } else {
      return { status: 'Next: Tomorrow 9AM', color: 'text-gray-600', bg: 'bg-gray-100' }
    }
  }

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
    <div className="min-h-screen bg-bg font-sans text-text">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-navy shadow-lg">
        <div className="mx-auto flex max-w-[1180px] items-center justify-between px-8 py-4">
          <Link to="/" className="flex items-center gap-3 text-white hover:text-white">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-2xl font-black text-teal shadow-md">
              +
            </div>
            <div>
              <p className="text-2xl font-black leading-none">
                Medi<span className="text-teal-light">Route</span>
              </p>
              <p className="mt-1 text-xs font-semibold text-white/70">{city} care route</p>
            </div>
          </Link>

          <Link
            to="/"
            className="rounded-xl bg-white/10 px-5 py-3 text-xs font-black uppercase text-white hover:bg-white/20 hover:text-white"
          >
            Search Again
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1180px] px-8 py-10 lg:py-12">
        {urgency === 'high' && (
          <section className="mb-6 rounded-3xl border border-red-200 bg-red-600 p-5 text-white shadow-xl shadow-red-950/10">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-black uppercase text-white/80">High urgency detected</p>
                <h1 className="mt-1 text-2xl font-black">Call 112 or visit the nearest emergency room.</h1>
                <p className="mt-1 text-sm text-white/90">MediRoute is advisory. Use emergency services for critical symptoms.</p>
              </div>
              <a href="tel:112" className="inline-flex rounded-2xl bg-white px-6 py-3 text-sm font-black text-red-600 shadow-md hover:bg-red-50 hover:text-red-700">
                Call 112
              </a>
            </div>
          </section>
        )}

        <section className="grid gap-9 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-8">
            <section className="overflow-hidden rounded-3xl border border-border bg-white shadow-xl shadow-navy/5">
              <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_280px]">
                <div className="p-8 md:p-10">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-xs font-black uppercase text-teal">Triage assessment</p>
                    <div className={`text-2xl font-black ${confidenceColor}`}>
                      {confidence}% Confident
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div
                      className="bg-teal h-2 rounded-full transition-all duration-500"
                      style={{ width: `${confidence}%` }}
                    ></div>
                  </div>
                  <h1 className="mt-3 text-4xl font-black leading-tight text-navy">{specialty}</h1>
                  <p className="mt-5 max-w-3xl text-base leading-8 text-text-muted">{reasoning}</p>
                  <div className="mt-5 rounded-2xl border border-border bg-bg px-4 py-3 text-sm font-semibold text-text-muted">
                    AI triage does not diagnose illness. Confirm with a qualified clinician.
                  </div>
                </div>

                <div className="border-t border-border bg-bg p-7 lg:border-l lg:border-t-0">
                  <p className="text-xs font-black uppercase text-text-muted">Route status</p>
                  <span className={`mt-3 inline-flex rounded-full border px-3 py-1.5 text-xs font-black uppercase ${urgencyStyles[urgency] || urgencyStyles.medium}`}>
                    Urgency: {urgency}
                  </span>
                  <button
                    type="button"
                    onClick={handleDownloadPDF}
                    className="mt-5 w-full rounded-2xl border border-teal/20 bg-white px-4 py-3 text-sm font-black leading-5 text-teal shadow-sm hover:bg-teal/10"
                  >
                    Download Emergency Card
                  </button>
                  <div className="mt-5 rounded-2xl bg-white p-4">
                    <p className="text-xs font-black uppercase text-text-muted">Selected city</p>
                    <p className="mt-1 text-xl font-black text-navy">{city}</p>
                  </div>
                </div>
              </div>
            </section>

            {results.length > 0 && (
              <section className="overflow-hidden rounded-3xl border border-border bg-white shadow-xl shadow-navy/5">
                <div className="p-8 md:p-10">
                  <p className="text-xs font-black uppercase text-teal">Doctor locations</p>
                  <h2 className="mt-3 text-2xl font-black text-navy">Map View</h2>
                  <div className="mt-6 rounded-2xl border border-border bg-bg p-4">
                    <a
                      href={`https://www.google.com/maps/search/${encodeURIComponent(results.map(d => `${d.name} ${d.city}`).join(' '))}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 rounded-xl bg-navy px-6 py-4 text-base font-black text-white shadow-md hover:bg-navy-light transition-all"
                    >
                      <span className="text-2xl">🗺️</span>
                      Open in Google Maps
                    </a>
                    <p className="mt-3 text-center text-sm font-semibold text-text-muted">
                      View all doctor locations on Google Maps
                    </p>
                  </div>
                </div>
              </section>
            )}

            <section className="space-y-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-black uppercase text-teal">Top matches</p>
                  <h2 className="text-3xl font-black text-navy">Recommended Doctors</h2>
                </div>
                <p className="text-sm font-bold text-text-muted">
                  Showing {Math.min(results.length, 5)} results in <span className="text-navy">{city}</span>
                </p>
              </div>

              {fallbackUsed && (
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-semibold leading-6 text-amber-900">
                  No exact {specialty} match was found in {city}, so MediRoute is showing top-rated local doctors for an initial consultation.
                </div>
              )}

              <div className="grid gap-5">
                {results.length > 0 ? (
                  results.slice(0, 5).map((doc, index) => (
                    <article
                      key={doc.id}
                      className="rounded-3xl border border-border bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-navy/10 md:p-7"
                    >
                      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                        <div className="flex gap-4">
                          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-navy text-xl font-black text-white shadow-md">
                            {index + 1}
                          </div>
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="text-[22px] font-black leading-tight text-navy">{doc.name}</h3>
                              {doc.nmcVerified && (
                                <span className="rounded-full bg-green-100 px-3 py-1 text-[11px] font-black uppercase text-green-700">
                                  NMC Verified
                                </span>
                              )}
                            </div>
                            <p className="mt-1 text-base font-black text-teal">{doc.specialty}</p>
                            {(() => {
                              const availability = getAvailability(doc)
                              return (
                                <div className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-black ${availability.bg} ${availability.color}`}>
                                  {availability.status}
                                </div>
                              )
                            })()}
                          <div className="mt-4 flex flex-wrap gap-3 text-sm">
                              <span className="rounded-xl bg-bg px-3 py-2 font-black text-navy">
                                Rating {doc.rating}/5.0
                              </span>
                              <span className="rounded-xl bg-bg px-3 py-2 font-black text-navy">
                                Rs. {doc.feeRangeMin} - Rs. {doc.feeRangeMax}
                              </span>
                            </div>
                            <button
                              onClick={() => toggleComparison(doc)}
                              className={`mt-3 px-4 py-2 rounded-lg text-sm font-black transition-all ${
                                selectedForComparison.find(d => d.id === doc.id)
                                  ? 'bg-teal text-white'
                                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                              }`}
                            >
                              {selectedForComparison.find(d => d.id === doc.id) ? '✓ Selected' : '+ Compare'}
                            </button>
                          </div>
                        </div>

                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(doc.name)}+${encodeURIComponent(doc.specialty)}+${encodeURIComponent(doc.city)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-2xl bg-navy px-5 py-3 text-sm font-black uppercase text-white shadow-md hover:bg-navy-light hover:text-white"
                        >
                          Get Directions
                        </a>
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="rounded-3xl border border-border bg-white p-8 text-center text-text-muted shadow-sm">
                    No doctors found in your city.
                  </div>
                )}
              </div>
            </section>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <section className="rounded-3xl border border-border bg-white p-7 shadow-xl shadow-navy/5">
              <p className="text-xs font-black uppercase text-teal">Local emergency care</p>
              <h2 className="mt-2 text-2xl font-black text-navy">{city} contacts</h2>
              <p className="mt-2 text-sm leading-6 text-text-muted">
                If symptoms worsen, call 112 or contact one of these emergency providers.
              </p>

              <div className="mt-6 space-y-4">
                {cityHospitals.length > 0 ? (
                  cityHospitals.map((hosp) => (
                    <div key={hosp.name} className="rounded-2xl border border-border bg-bg p-5">
                      <h3 className="text-sm font-black text-navy">{hosp.name}</h3>
                      <p className="mt-1 text-xs leading-5 text-text-muted">{hosp.location}</p>
                      <a
                        href={`tel:${hosp.phone.replace(/-/g, '')}`}
                        className="mt-3 inline-flex rounded-xl bg-white px-3 py-2 text-sm font-black text-teal shadow-sm"
                      >
                        {hosp.phone}
                      </a>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-text-muted">No emergency hospitals listed for this city.</p>
                )}
              </div>
            </section>

            <section className="rounded-3xl bg-navy p-7 text-white shadow-xl shadow-navy/15">
              <p className="text-xs font-black uppercase text-teal-light">Safety note</p>
              <p className="mt-2 text-sm leading-6 text-white/80">
                MediRoute is built for healthcare navigation only. It does not replace professional medical judgement.
              </p>
            </section>
          </aside>
        </section>
      </main>

      <footer className="border-t border-border bg-white px-5 py-4 text-center text-xs font-semibold text-text-muted">
        MediRoute MVP - Bharat Academix CodeQuest 2026. All recommendations are advisory.
      </footer>

      {selectedForComparison.length >= 2 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/70 p-5 backdrop-blur-md">
          <div className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl shadow-navy/30">
            <button
              type="button"
              onClick={() => setSelectedForComparison([])}
              className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white text-xl font-black text-red-600 shadow-lg hover:bg-red-50"
            >
              ×
            </button>

            <div className="bg-navy px-7 py-6 pr-20 text-white">
              <p className="text-xs font-black uppercase text-white/80">Compare doctors</p>
              <h3 className="mt-2 text-3xl font-black">Side-by-side comparison</h3>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {selectedForComparison.map(doctor => (
                  <div key={doctor.id} className="border rounded-xl p-4">
                    <h3 className="font-bold text-navy mb-2">{doctor.name}</h3>

                    <div className="mb-4">
                      <div className="text-sm text-gray-600 mb-1">Rating</div>
                      <div className="flex items-center">
                        <div className="flex-1 bg-gray-200 rounded-full h-3 mr-2">
                          <div
                            className="bg-teal h-3 rounded-full"
                            style={{ width: `${(doctor.rating / 5) * 100}%` }}
                          ></div>
                        </div>
                        <span className="font-bold">{doctor.rating}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-sm text-gray-600 mb-1">Fee Range</div>
                      <div className="font-bold text-teal">
                        ₹{doctor.feeRangeMin} - ₹{doctor.feeRangeMax}
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-sm text-gray-600 mb-1">NMC Verified</div>
                      <div className={doctor.nmcVerified ? 'text-green-600' : 'text-red-600'}>
                        {doctor.nmcVerified ? '✓ Verified' : '✗ Not Verified'}
                      </div>
                    </div>

                    <button className="w-full bg-navy text-white py-2 rounded-lg hover:bg-navy-light">
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Results
