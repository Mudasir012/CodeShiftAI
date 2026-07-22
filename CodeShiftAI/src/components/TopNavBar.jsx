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
    <header className="glass-nav sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 lg:px-6 h-14">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2.5 font-semibold text-base tracking-tight">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Terminal className="w-4 h-4 text-white" />
            </div>
            <span className="hidden sm:inline">CodeShift <span className="text-gradient font-bold">AI</span></span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                location.pathname.startsWith(link.to)
                  ? 'bg-white/10 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg glass cursor-pointer hover:bg-white/10 transition-all duration-200">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-[10px] font-bold text-white">
              MH
            </div>
            <span className="text-sm font-medium text-gray-300">Mudasir</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </div>
          <button
            className="md:hidden p-2 rounded-lg glass hover:bg-white/10 transition-all"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/5 px-4 py-3 bg-[#0a0a0f]">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 text-sm font-medium rounded-lg mb-1 ${
                location.pathname.startsWith(link.to)
                  ? 'bg-white/10 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
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
