export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-100 bg-white px-6 py-5">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-xs text-slate-500 md:flex-row">
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
