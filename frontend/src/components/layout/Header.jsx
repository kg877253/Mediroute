import { Link } from 'react-router-dom'

export default function Header({ onOpenEmergency }) {
  return (
    <header className="site-header">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link to="/" className="group flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy text-white transition-transform group-hover:scale-[1.03]">
            <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <div>
            <h1 className="heading-display text-lg leading-none">
              Medi<span className="text-teal">Route</span>
            </h1>
            <p className="label-section mt-0.5 !text-[10px]">
              Right doctor • Right cost • Right now
            </p>
          </div>
        </Link>

        {onOpenEmergency && (
          <button
            type="button"
            onClick={onOpenEmergency}
            className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-red-700"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            Emergency Mode
          </button>
        )}
      </div>
    </header>
  )
}
