export default function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-white/80 py-6 px-6 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500">
        <p className="text-center md:text-left">
          © {new Date().getFullYear()} MediRoute MVP — Bharat Academix CodeQuest 2026.
        </p>
        <p className="text-center md:text-right text-slate-400 max-w-xl font-normal leading-relaxed">
          Disclaimer: This platform provides automated navigation and triage support only. It does not provide medical diagnosis, clinical advice, or treatment plans.
        </p>
      </div>
    </footer>
  )
}
