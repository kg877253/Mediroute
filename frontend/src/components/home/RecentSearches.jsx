export default function RecentSearches({ history, onSelectHistory }) {
  if (!history || history.length === 0) return null

  return (
    <div className="mb-4 w-full">
      <div className="card-clinical px-4 py-3">
        <div className="mb-2.5 flex items-center gap-2">
          <svg className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="label-section">Recent Searches</h3>
        </div>

        <div className="no-scrollbar flex gap-2 overflow-x-auto pb-0.5">
          {history.map((item, index) => (
            <button
              key={index}
              onClick={() => onSelectHistory(item.symptom, item.city)}
              className="min-w-[180px] max-w-[240px] flex-shrink-0 cursor-pointer rounded-lg border border-slate-100 bg-slate-50/80 px-3.5 py-2.5 text-left transition-all hover:border-slate-200 hover:bg-white"
            >
              <div className="w-full truncate text-sm font-medium text-navy">
                {item.symptom}
              </div>
              <div className="mt-1 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                <span>{item.city}</span>
                <span className="h-1 w-1 rounded-full bg-slate-300" />
                <span className="truncate">{item.specialty}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
