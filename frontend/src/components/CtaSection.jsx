function CtaSection() {
  return (
    <section className="w-full relative overflow-hidden py-24 z-10">
      <div className="absolute inset-0 bg-slate-950"></div>
      {/* Premium gradients to give it an elegant dark feel */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-indigo-900/50 via-slate-950 to-slate-950"></div>
      <div className="absolute top-0 right-0 h-full w-1/2 bg-gradient-to-l from-indigo-500/10 to-transparent"></div>
      
      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-10 px-4 text-center sm:px-6 md:flex-row md:text-left lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Ready to Start Your Construction Journey?
          </h2>
          <p className="mt-4 text-lg text-indigo-200/80">
            Let's discuss how we can bring your next big project to life with our expert engineering team.
          </p>
        </div>
        <div className="flex-shrink-0">
          <button className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-indigo-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-indigo-900/50 transition-all duration-300 hover:scale-105 hover:bg-indigo-500 hover:shadow-xl hover:shadow-indigo-500/30">
            <span className="relative z-10">Submit Inquiry</span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default CtaSection
