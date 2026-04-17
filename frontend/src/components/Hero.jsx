function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-white">
      {/* Background Gradients */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-indigo-50/50 to-white"></div>
      <div className="absolute right-0 top-0 -mr-32 -mt-32 h-96 w-96 rounded-full bg-indigo-100/50 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-32 -mb-32 h-96 w-96 rounded-full bg-blue-100/50 blur-3xl"></div>
      
      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-4 py-24 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-32">
        <div className="flex flex-col items-start z-10">
          <p className="mb-6 inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50/80 backdrop-blur-sm px-4 py-1.5 text-sm font-semibold text-indigo-700 shadow-sm transition-all hover:bg-indigo-100 hover:shadow">
            <span className="mr-2 flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse"></span>
            Trusted Civil Engineering Services
          </p>
          <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-5xl xl:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-indigo-800 to-indigo-600">
            Building Your Dream Projects with Precision
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600 sm:text-xl">
            Professional civil engineering services for residential and commercial construction. We turn ambitious visions into enduring realities.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button className="rounded-xl bg-indigo-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-600/30 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-600/40">
              Get Started
            </button>
            <button className="rounded-xl border border-slate-200 bg-white/90 backdrop-blur-sm px-8 py-3.5 text-base font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-slate-300 hover:bg-slate-50 hover:shadow-md">
              View Projects
            </button>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:max-w-none z-10 group">
          <div className="absolute -inset-4 z-0 rounded-[2.5rem] bg-gradient-to-tr from-indigo-200 to-blue-100 opacity-60 blur-2xl transition-opacity duration-500 group-hover:opacity-80" />
          <div className="relative rounded-2xl overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-[1.02] ring-1 ring-slate-900/5">
            <img
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80"
              alt="Modern construction project"
              className="w-full h-auto object-cover sm:h-[500px]"
            />
            {/* Overlay gradient for premium feel */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
