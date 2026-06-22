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
    <article className="group card-clinical relative overflow-hidden p-6 transition-all duration-200 hover:border-slate-200 hover:shadow-md">
      <div className="absolute inset-y-0 left-0 w-1 bg-teal/0 transition-colors group-hover:bg-teal/40" aria-hidden="true" />

      <div className="flex w-full flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex min-w-0 items-start gap-4 pl-1">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-sm font-bold text-navy">
            {index + 1}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-bold leading-snug text-navy">{doc.name}</h3>
              {doc.nmcVerified && (
                <span className="inline-flex items-center gap-1 rounded-full border border-green-100 bg-green-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-green-700">
                  <svg className="h-3 w-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  NMC Verified
                </span>
              )}
            </div>
            <p className="mt-0.5 text-sm font-medium text-slate-600">{doc.specialty}</p>

            <div className="mt-2">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                {availability.status}
              </span>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-100 bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-navy">
                <svg className="h-3.5 w-3.5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Rating {doc.rating}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-100 bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-navy">
                <svg className="h-3.5 w-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M12 16v1M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
                </svg>
                ₹{doc.feeRangeMin} – ₹{doc.feeRangeMax}
              </span>
            </div>
          </div>
        </div>

        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(doc.name)}+${encodeURIComponent(doc.specialty)}+${encodeURIComponent(doc.city)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl bg-navy px-5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-navy-light hover:shadow-md active:scale-[0.98]"
        >
          <svg className="h-4 w-4 text-teal-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          Get Directions
        </a>
      </div>
    </article>
  )
}
