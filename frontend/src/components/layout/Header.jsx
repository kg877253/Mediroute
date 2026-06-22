import { Link } from 'react-router-dom'

export default function Header({ onOpenEmergency }) {
  return (
    <header className="site-header">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10 md:py-6">
        <Link to="/" className="group flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy text-white transition-transform group-hover:scale-[1.03]">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <div>
            <h1 className="heading-display text-2xl leading-none">
              Medi<span className="text-teal">Route</span>
            </h1>
            <p className="label-section mt-1">
              Right doctor • Right cost
            </p>
          </div>
        </Link>

        {onOpenEmergency && (
          <button
            type="button"
            onClick={onOpenEmergency}
            className="inline-flex items-center gap-2 rounded-full bg-[#dc2626] px-6 py-3 text-[0.8125rem] font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#b91c1c]"
          >
            <span className="h-2 w-2 rounded-full bg-white shadow-sm" />
            Emergency Mode
          </button>
        )}
      </div>
    </header>
  )
}
