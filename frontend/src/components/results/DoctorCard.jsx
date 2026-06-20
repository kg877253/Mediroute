export default function DoctorCard({ doc, index }) {
  const getAvailability = () => {
    const hours = new Date().getHours()
    if (hours >= 9 && hours <= 17) {
      return { status: 'Available Today (Demo)', color: 'text-green-600', bg: 'bg-green-100' }
    } else if (hours >= 18 && hours <= 21) {
      return { status: 'Available Evening (Demo)', color: 'text-yellow-600', bg: 'bg-yellow-100' }
    } else {
      return { status: 'Next: Tomorrow 9AM (Demo)', color: 'text-gray-600', bg: 'bg-gray-100' }
    }
  }

  const availability = getAvailability(doc)

  return (
    <article className="rounded-3xl border border-border bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-navy/10 md:p-7 min-h-[140px] flex items-center">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between w-full">
        <div className="flex gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-navy text-xl font-bold text-white shadow-md">
            {index + 1}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-[22px] font-bold leading-tight text-navy overflow-hidden text-ellipsis">{doc.name}</h3>
              {doc.nmcVerified && (
                <span className="rounded-full bg-green-100 px-3 py-1 text-[11px] font-semibold uppercase text-green-700">
                  NMC Verified
                </span>
              )}
            </div>
            <p className="mt-1 text-base font-semibold text-teal">{doc.specialty}</p>
            <div className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${availability.bg} ${availability.color}`}>
              {availability.status}
            </div>
            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              <span className="rounded-xl bg-bg px-3 py-2 font-semibold text-navy">
                Rating {doc.rating}/5.0
              </span>
              <span className="rounded-xl bg-bg px-3 py-2 font-semibold text-navy">
                ₹{doc.feeRangeMin} – ₹{doc.feeRangeMax}
              </span>
            </div>
          </div>
        </div>

        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(doc.name)}+${encodeURIComponent(doc.specialty)}+${encodeURIComponent(doc.city)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-2xl bg-navy px-5 py-3 text-sm font-semibold uppercase text-white shadow-md hover:bg-navy-light hover:text-white transition-all hover:shadow-lg"
        >
          Get Directions
        </a>
      </div>
    </article>
  )
}
