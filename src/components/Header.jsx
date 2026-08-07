import { Link, useLocation } from 'react-router-dom';
import ScrambleText from './ScrambleText';

const NAV_ITEMS = [
  { path: '/', label: 'Home' },
  { path: '/vision', label: 'Vision' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
];

export default function Header() {
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-100 bg-ink text-paper border-b-3 border-ink">
      <div className="max-w-7xl mx-auto px-5 py-2.5 flex items-center justify-between max-md:flex-col max-md:gap-2 max-md:py-2">
        <div className="flex items-center gap-0 max-md:w-full max-md:justify-between">
          <Link to="/" className="font-display font-bold text-base -tracking-[0.04em] flex items-center gap-1.5 shrink-0 px-2.5 py-1.5 border-3 border-paper bg-paper text-ink hover:bg-signal hover:border-signal hover:text-white transition-colors duration-150">
            <span className="font-mono text-xs">{'>'}</span>
            <ScrambleText text="CODESHIFT" />
            <span className="text-signal">AI</span>
          </Link>
          <nav className="flex max-md:hidden ml-4" aria-label="Main navigation">
            {NAV_ITEMS.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-display font-bold text-xs uppercase tracking-[0.06em] px-4 py-3 border-l-3 border-paper transition-colors duration-150 first:border-l-0 ${pathname === item.path ? 'bg-signal text-white' : 'hover:bg-paper hover:text-ink'}`}
              >
                <ScrambleText text={item.label} />
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3 text-[11px] font-mono text-paper/60 max-md:w-full max-md:justify-center max-md:border-t-3 max-md:border-paper/15 max-md:pt-2">
          <a href="mailto:hello@codeshift.ai" className="hover:text-signal transition-colors duration-150 underline underline-offset-2 decoration-1">hello@codeshift.ai</a>
          <span className="text-paper/20">/</span>
          <a href="tel:+15550000000" className="hover:text-signal transition-colors duration-150 underline underline-offset-2 decoration-1">+1 (555) 000-0000</a>
          <Link
            to="/login"
            className="font-display font-bold text-[11px] uppercase tracking-[0.06em] px-3 py-1.5 border-2 border-paper text-paper hover:bg-signal hover:border-signal hover:text-white transition-colors duration-150"
          >
            Log in
          </Link>
        </div>
      </div>
      {/* Mobile nav */}
      <div className="hidden max-md:flex border-t-3 border-paper/15 px-3 py-0 justify-center gap-0">
        {NAV_ITEMS.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={`font-display font-bold text-[11px] uppercase tracking-[0.06em] px-3 py-2 border-l-3 border-paper/15 transition-colors duration-150 first:border-l-0 ${pathname === item.path ? 'bg-signal text-white' : 'hover:bg-paper hover:text-ink'}`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
