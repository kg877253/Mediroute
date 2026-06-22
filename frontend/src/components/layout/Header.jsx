import { Link } from 'react-router-dom'

export default function Header({ onOpenEmergency }) {
  return (
    <header className="sticky top-0 z-40 border-b border-navy-dark/20 bg-navy shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
        <Link to="/" className="group flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal text-white transition-transform duration-200 group-hover:scale-[1.02]">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-extrabold leading-none tracking-tight text-white">
              Medi<span className="text-teal-light">Route</span>
            </h1>
            <p className="label-section mt-1 !text-[10px] !text-slate-400">
              Right doctor • Right cost • Right now
            </p>
          </div>
        </Link>

        {onOpenEmergency && (
          <button
            type="button"
            onClick={onOpenEmergency}
            className="inline-flex items-center gap-2 rounded-lg border border-red-400/30 bg-red-600 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-red-700"
          >
            <span className="relative flex h-2 w-2">
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
            </span>
            Emergency Mode
          </button>
        )}
      </div>
    </header>
  )
}
