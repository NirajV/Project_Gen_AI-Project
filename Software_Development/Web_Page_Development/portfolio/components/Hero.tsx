export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 to-slate-900 px-4">
      <div className="text-center max-w-3xl">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Niraj KV
        </h1>
        <h2 className="text-2xl md:text-4xl text-blue-400 mb-4">
          Lead ETL Developer
        </h2>
        <p className="text-xl text-slate-300 mb-8">
          18+ years of expertise in Data Warehouse, Business Intelligence, and Enterprise Data Solutions
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a href="#contact" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition">
            Get in Touch
          </a>
          <a href="#experience" className="px-8 py-3 border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-slate-950 rounded-lg font-semibold transition">
            View Experience
          </a>
        </div>
      </div>
    </section>
  )
}
