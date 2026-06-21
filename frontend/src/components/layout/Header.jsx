import { Link } from 'react-router-dom'

export default function Header({ onOpenEmergency }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-navy/95 backdrop-blur-md shadow-md">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-6 py-4">
        <Link to="/" className="flex items-center gap-3.5 group">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-teal to-teal-dark text-xl font-bold text-white shadow-md shadow-teal/20 group-hover:scale-105 transition-transform duration-300">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight leading-none text-white">
              Medi<span className="text-teal-light">Route</span>
            </h1>
            <p className="mt-1 text-[10px] font-medium tracking-wide uppercase text-slate-400">
              Right doctor • Right cost • Right now
            </p>
          </div>
        </Link>

        {onOpenEmergency && (
          <button
            type="button"
            onClick={onOpenEmergency}
            className="relative overflow-hidden inline-flex items-center gap-2 rounded-xl bg-red-600 hover:bg-red-700 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-red-900/20 transition-all hover:scale-105 active:scale-95 duration-200"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            Emergency Mode
          </button>
        )}
      </div>
    </header>
  )
}
