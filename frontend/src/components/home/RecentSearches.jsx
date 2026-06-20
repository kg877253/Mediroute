export default function RecentSearches({ history, onSelectHistory }) {
  if (!history || history.length === 0) return null

  return (
    <div className="max-w-7xl mx-auto px-6 py-3">
      <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
        <h3 className="text-base font-semibold text-navy mb-4">🕐 Recent Searches</h3>
        <div className="flex gap-3 overflow-x-auto pb-3">
          {history.map((item, index) => (
            <button
              key={index}
              onClick={() => onSelectHistory(item.symptom, item.city)}
              className="rounded-xl border border-border bg-bg px-5 py-4 text-left text-sm font-semibold text-navy hover:border-teal hover:bg-teal/10 hover:text-teal transition-all w-[240px] hover:shadow-md h-[84px] flex flex-col justify-center"
            >
              <div className="truncate">{item.symptom}</div>
              <div className="text-xs font-medium text-text-muted mt-2">
                {item.city} • {item.specialty}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
