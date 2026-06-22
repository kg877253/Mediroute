export default function DoctorCard({ doc, index }) {
  const getAvailability = () => {
    const hours = new Date().getHours()
    if (hours >= 9 && hours <= 17) {
      return { status: 'Available Today (Demo)', color: 'text-green-600', dot: 'bg-green-500' }
    } else if (hours >= 18 && hours <= 21) {
      return { status: 'Available Evening (Demo)', color: 'text-amber-600', dot: 'bg-amber-500' }
    } else {
      return { status: 'Next: Tomorrow 9AM (Demo)', color: 'text-slate-600', dot: 'bg-slate-400' }
    }
  }

  const availability = getAvailability(doc)

  return (
    <article className="doctor-row group relative overflow-hidden">
      {/* Decorative subtle gradient background on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-teal/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none"></div>
      
      <div className="doctor-row__rank z-10">{index + 1}</div>

      <div className="min-w-0 z-10">
        <div className="flex flex-wrap items-center gap-2.5">
          <h3 className="heading-display text-[1.125rem] text-navy">{doc.name}</h3>
          {doc.nmcVerified && (
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200/60 bg-gradient-to-r from-emerald-50 to-emerald-100/50 px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-emerald-800 shadow-sm">
              <svg className="h-3.5 w-3.5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              NMC Verified
            </span>
          )}
        </div>

        <p className="mt-1 text-[13px] font-medium text-slate-500">{doc.specialty}</p>

        <div className="mt-3 flex flex-wrap items-center gap-2.5">
          <span className="meta-chip">
            <span className={`h-2 w-2 rounded-full ${availability.dot} shadow-[0_0_8px_rgba(0,0,0,0.1)]`} />
            <span className={availability.color}>{availability.status}</span>
          </span>
          <span className="meta-chip border-amber-100 bg-amber-50/30">
            <svg className="h-3.5 w-3.5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-amber-900">Rating {doc.rating}</span>
          </span>
          <span className="meta-chip font-bold text-navy">
            ₹{doc.feeRangeMin} – ₹{doc.feeRangeMax}
          </span>
        </div>
      </div>

      <a
        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(doc.name)}+${encodeURIComponent(doc.specialty)}+${encodeURIComponent(doc.city)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-outline shrink-0 self-start md:self-center z-10 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-md group-hover:border-teal group-hover:text-teal"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
        Directions
      </a>
    </article>
  )
}
