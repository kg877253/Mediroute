export default function RecentSearches({ history, onSelectHistory }) {
  if (!history || history.length === 0) return null

  return (
    <div className="max-w-7xl mx-auto px-6 py-4">
      <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <svg className="h-4.5 w-4.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Recent Searches</h3>
        </div>
        
        <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar">
          {history.map((item, index) => (
            <button
              key={index}
              onClick={() => onSelectHistory(item.symptom, item.city)}
              className="rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-teal/5 hover:border-teal/20 px-5 py-4.5 text-left text-sm font-semibold text-navy transition-all min-w-[240px] max-w-[280px] flex-shrink-0 flex flex-col justify-center cursor-pointer shadow-sm hover:shadow-md"
            >
              <div className="truncate text-navy font-bold text-base w-full">{item.symptom}</div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-2.5 flex items-center gap-1.5">
                <span>{item.city}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-slate-300"></span>
                <span className="truncate">{item.specialty}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
