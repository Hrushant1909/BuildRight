import { Link } from 'react-router-dom'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Projects', to: '/projects' },
]

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-2xl font-extrabold tracking-tight text-indigo-700">
          BuildRight
        </Link>

        <ul className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                to={link.to}
                className="relative py-1 transition-colors hover:text-indigo-600 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-indigo-600 after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:bg-slate-50"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-600/30"
          >
            Get Started
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
