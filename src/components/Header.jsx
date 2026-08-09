import { Link, useLocation } from 'react-router-dom';
import ScrambleText from './ScrambleText';

const PUBLIC_NAV = [
  { path: '/', label: 'Home' },
  { path: '/vision', label: 'Vision' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
];

const PLATFORM_NAV = [
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/jobs', label: 'Jobs' },
  { path: '/new-job', label: 'New Pipeline' },
  { path: '/audit-log', label: 'Audit Logs' },
  { path: '/settings', label: 'Settings' },
];

export default function Header() {
  const { pathname } = useLocation();
  const isPlatformRoute = ['/dashboard', '/jobs', '/new-job', '/audit-log', '/settings'].some((p) => pathname.startsWith(p));
  const navItems = isPlatformRoute ? PLATFORM_NAV : PUBLIC_NAV;

  return (
    <header className="sticky top-0 z-100 bg-ink text-paper border-b-3 border-ink">
      <div className="max-w-7xl mx-auto px-5 py-2.5 flex items-center justify-between max-md:flex-col max-md:gap-2 max-md:py-2">
        
        <div className="flex items-center gap-0 max-md:w-full max-md:justify-between">
          <Link
            to={isPlatformRoute ? '/dashboard' : '/'}
            className="font-display font-bold text-base -tracking-[0.04em] flex items-center gap-1.5 shrink-0 px-2.5 py-1.5 border-3 border-paper bg-paper text-ink hover:bg-signal hover:border-signal hover:text-white transition-colors duration-150"
          >
            <span className="font-mono text-xs">{'>'}</span>
            <ScrambleText text="CODESHIFT" />
            <span className="text-signal">AI</span>
          </Link>

          <nav className="flex max-md:hidden ml-4" aria-label="Main navigation">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-display font-bold text-xs uppercase tracking-[0.06em] px-4 py-3 border-l-3 border-paper transition-colors duration-150 first:border-l-0 ${
                  pathname === item.path ? 'bg-signal text-white' : 'hover:bg-paper hover:text-ink'
                }`}
              >
                <ScrambleText text={item.label} />
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3 text-[11px] font-mono text-paper/60 max-md:w-full max-md:justify-center max-md:border-t-3 max-md:border-paper/15 max-md:pt-2">
          {isPlatformRoute ? (
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-paper/80 font-bold uppercase">Dev Workspace</span>
              <Link
                to="/"
                className="ml-2 font-display font-bold text-[11px] uppercase tracking-[0.06em] px-3 py-1.5 border-2 border-paper/40 text-paper/70 hover:bg-paper hover:text-ink transition-colors"
              >
                Exit Portal
              </Link>
            </div>
          ) : (
            <>
              <a href="mailto:hello@codeshift.ai" className="hover:text-signal transition-colors duration-150 underline underline-offset-2">
                hello@codeshift.ai
              </a>
              <span className="text-paper/20">/</span>
              <Link
                to="/login"
                className="font-display font-bold text-[11px] uppercase tracking-[0.06em] px-3 py-1.5 border-2 border-paper text-paper hover:bg-signal hover:border-signal hover:text-white transition-colors duration-150"
              >
                Log in
              </Link>
            </>
          )}
        </div>

      </div>

      {/* Mobile Nav */}
      <div className="hidden max-md:flex border-t-3 border-paper/15 px-3 py-0 justify-center gap-0 overflow-x-auto">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`font-display font-bold text-[11px] uppercase tracking-[0.06em] px-3 py-2 border-l-3 border-paper/15 transition-colors duration-150 first:border-l-0 shrink-0 ${
              pathname === item.path ? 'bg-signal text-white' : 'hover:bg-paper hover:text-ink'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
