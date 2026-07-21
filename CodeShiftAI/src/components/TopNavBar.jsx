import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Terminal, ChevronDown, Menu, X } from 'lucide-react'

export default function TopNavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/history', label: 'History' },
    { to: '/settings', label: 'Settings' },
  ]

  return (
    <header className="border-b-2 border-black bg-white sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 lg:px-6 h-14">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2 font-bold text-lg text-black uppercase tracking-tight">
            <div className="border-2 border-black p-1">
              <Terminal className="w-5 h-5" />
            </div>
            <span>CodeShift <span className="text-lime-600">AI</span></span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-2 text-sm font-bold uppercase border-2 ${
                location.pathname.startsWith(link.to)
                  ? 'bg-black text-white border-black'
                  : 'text-black border-transparent hover:border-black'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 border-2 border-black cursor-pointer hover:bg-black hover:text-white transition-colors">
            <div className="w-6 h-6 border-2 border-black flex items-center justify-center text-xs font-bold hover:border-white">
              MH
            </div>
            <span className="text-sm font-bold uppercase">Mudasir</span>
            <ChevronDown className="w-4 h-4" />
          </div>
          <button
            className="md:hidden p-2 border-2 border-black hover:bg-black hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t-2 border-black px-4 py-3 bg-white">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 text-sm font-bold uppercase border-2 mb-1 ${
                location.pathname.startsWith(link.to)
                  ? 'bg-black text-white border-black'
                  : 'text-black border-transparent hover:border-black'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
