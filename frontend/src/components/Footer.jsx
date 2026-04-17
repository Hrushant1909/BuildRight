const quickLinks = ['Home', 'Services', 'Projects', 'Careers', 'Contact']

function Footer() {
  return (
    <footer className="w-full bg-slate-950 py-16 text-slate-300">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2 lg:col-span-1">
          <h3 className="text-2xl font-extrabold text-white tracking-tight">BuildRight</h3>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
            Professional civil engineering services for residential and
            commercial development. Building the future, restoring the past.
          </p>
          <div className="mt-6 flex items-center gap-4">
            <div className="h-8 w-8 rounded-full bg-slate-800 transition hover:bg-indigo-600 cursor-pointer flex items-center justify-center text-xs">Ln</div>
            <div className="h-8 w-8 rounded-full bg-slate-800 transition hover:bg-indigo-600 cursor-pointer flex items-center justify-center text-xs">Tw</div>
            <div className="h-8 w-8 rounded-full bg-slate-800 transition hover:bg-indigo-600 cursor-pointer flex items-center justify-center text-xs">Fb</div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-50">
            Company
          </h4>
          <ul className="mt-4 space-y-3">
            {quickLinks.slice(0, 3).map((link) => (
              <li key={link}>
                <a className="text-sm text-slate-400 transition-colors hover:text-indigo-400" href="#">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-50">
            Resources
          </h4>
          <ul className="mt-4 space-y-3">
            {quickLinks.slice(3).map((link) => (
              <li key={link}>
                <a className="text-sm text-slate-400 transition-colors hover:text-indigo-400" href="#">
                  {link}
                </a>
              </li>
            ))}
            <li>
               <a className="text-sm text-slate-400 transition-colors hover:text-indigo-400" href="#">
                 Privacy Policy
               </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-50">
            Contact
          </h4>
          <ul className="mt-4 space-y-3 text-sm text-slate-400">
            <li className="flex items-start gap-3">
              <span className="mt-0.5 text-indigo-400 font-semibold">Email:</span>
              <a href="#" className="transition-colors hover:text-white">contact@buildright.com</a>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 text-indigo-400 font-semibold">Phone:</span>
              <a href="#" className="transition-colors hover:text-white">+1 (555) 123-4567</a>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 text-indigo-400 font-semibold">Address:</span>
              <span>101 Construction Ave,<br/>City Center, State 10001</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="mx-auto mt-16 max-w-7xl border-t border-slate-800 px-4 pt-8 sm:px-6 lg:px-8 text-center text-sm text-slate-500 h-full flex flex-col sm:flex-row justify-between items-center">
        <span>&copy; {new Date().getFullYear()} BuildRight Inc. All rights reserved.</span>
        <span className="mt-2 sm:mt-0">Designed with modern aesthetics.</span>
      </div>
    </footer>
  )
}

export default Footer
