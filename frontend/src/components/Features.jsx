const features = [
  {
    title: 'Quality Construction',
    description:
      'We deliver strong and durable structures using industry best practices and high-grade materials that stand the test of time.',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M5 12.5L9.5 17L19 7.5"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: 'Expert Engineers',
    description:
      'Our experienced team plans and executes every project with precision, ensuring safety and innovation at the core.',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 12a4 4 0 100-8 4 4 0 000 8zM4 20a8 8 0 1116 0"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: 'Timely Delivery',
    description:
      'Efficient workflows, proactive management, and project tracking help us complete your builds right on schedule.',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2.2" />
        <path
          d="M12 8v4l2.5 2.5"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
]

function Features() {
  return (
    <section className="w-full bg-slate-50 py-20 sm:py-28 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-1/4 left-0 -ml-40 h-80 w-80 rounded-full bg-indigo-100 opacity-40 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 -mr-40 h-80 w-80 rounded-full bg-blue-100 opacity-40 blur-3xl"></div>
      
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-sm font-bold uppercase tracking-widest text-indigo-600 mb-2">Our Advantages</h2>
          <h3 className="text-3xl font-extrabold text-slate-900 sm:text-4xl lg:text-5xl">
            Why Choose BuildRight
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
            We combine technical expertise, modern working methods, and reliable execution
            to deliver engineering projects that last for generations.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, idx) => (
            <article
              key={feature.title}
              className="group relative flex flex-col items-start rounded-2xl bg-white p-8 shadow-md ring-1 ring-slate-200 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-100 hover:ring-indigo-200 z-10"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 shadow-sm transition-colors duration-300 group-hover:bg-indigo-600 group-hover:text-white">
                {feature.icon}
              </div>
              <h4 className="mb-3 text-xl font-bold text-slate-900 transition-colors group-hover:text-indigo-600">
                {feature.title}
              </h4>
              <p className="leading-relaxed text-slate-600">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
