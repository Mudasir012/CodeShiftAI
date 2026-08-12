import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Terminal, ChevronDown, Menu, X, Shield } from 'lucide-react'

export default function TopNavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/history', label: 'History' },
    { to: '/audit-log', label: 'Audit Log', icon: Shield },
    { to: '/settings', label: 'Settings' },
  ]

  return (
    <header className="border-b border-gray-200/80 bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-xs">
      <div className="h-0.5 w-full bg-gradient-to-r from-violet-600 via-indigo-500 to-blue-500" />
      <div className="flex items-center justify-between px-4 lg:px-6 h-14">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2.5 font-semibold text-base text-gray-900 group">
            <div className="bg-gray-900 rounded-lg p-1.5 shadow-sm group-hover:scale-105 transition-transform">
              <Terminal className="w-4 h-4 text-violet-400" />
            </div>
            <span className="hidden sm:inline font-bold tracking-tight">CodeShift <span className="text-violet-600 font-extrabold">AI</span></span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(link => {
            const Icon = link.icon
            const isActive = location.pathname.startsWith(link.to)
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all inline-flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-violet-50 text-violet-700 shadow-xs font-semibold'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {Icon && <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-violet-600' : 'text-gray-400'}`} />}
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="w-6 h-6 bg-gray-900 rounded-md flex items-center justify-center text-[10px] font-bold text-white">
              MH
            </div>
            <span className="text-sm font-medium text-gray-700">Mudasir</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
          <button
            className="md:hidden p-2 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 px-4 py-3 bg-white">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md mb-1 ${
                location.pathname.startsWith(link.to)
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {link.icon && <link.icon className="w-3.5 h-3.5" />}
              {link.label}
            </Link>
          ))}
          <Link
            to="/login"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 mt-2 text-sm font-medium text-blue-600 border-t border-gray-100 pt-3"
          >
            Sign out
          </Link>
        </div>
      )}
    </header>
  )
}
