export default function RecentSearches({ history, onSelectHistory }) {
  if (!history || history.length === 0) return null

  return (
    <div className="w-full mb-4">
      <div className="rounded-2xl border border-slate-100 bg-white/80 backdrop-blur-sm px-5 py-3.5 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <svg className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Recent Searches</h3>
        </div>

        <div className="flex gap-2.5 overflow-x-auto pb-0.5 no-scrollbar">
          {history.map((item, index) => (
            <button
              key={index}
              onClick={() => onSelectHistory(item.symptom, item.city)}
              className="rounded-xl border border-slate-100 bg-slate-50 hover:bg-teal/5 hover:border-teal/20 px-4 py-3 text-left transition-all min-w-[200px] max-w-[260px] flex-shrink-0 cursor-pointer shadow-sm group"
            >
              <div className="truncate text-sm font-bold text-navy w-full group-hover:text-teal transition-colors">
                {item.symptom}
              </div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1.5 flex items-center gap-1.5">
                <span>{item.city}</span>
                <span className="h-1 w-1 rounded-full bg-slate-300" />
                <span className="truncate text-teal/70">{item.specialty}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
