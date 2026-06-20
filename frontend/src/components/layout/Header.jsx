import { Link } from 'react-router-dom'

export default function Header({ onOpenEmergency }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-navy shadow-lg">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-6 py-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-2xl font-bold text-teal shadow-md">
            +
          </div>
          <div>
            <h1 className="text-2xl font-bold leading-none text-white">
              Medi<span className="text-teal-light">Route</span>
            </h1>
            <p className="mt-1 text-xs font-semibold text-white/70">Right doctor. Right cost. Right now.</p>
          </div>
        </Link>

        {onOpenEmergency && (
          <button
            type="button"
            onClick={onOpenEmergency}
            className="rounded-xl bg-red-600 px-5 py-3 text-xs font-semibold uppercase text-white shadow-lg shadow-red-950/20 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-200 transition-all"
          >
            Emergency Mode
          </button>
        )}
      </div>
    </header>
  )
}
