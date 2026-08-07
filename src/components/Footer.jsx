import { Link } from 'react-router-dom';
import ScrambleText from './ScrambleText';

export default function Footer() {
  return (
    <footer className="bg-ink text-paper border-t-3 border-ink">
      <div className="max-w-7xl mx-auto px-5 py-10 grid grid-cols-[2fr_1fr_1fr] gap-8 max-md:grid-cols-1 max-md:gap-6">
        <div>
          <div className="font-display font-bold text-base -tracking-[0.04em] flex items-center gap-1.5">
            <span className="text-signal">{'>'}</span>
            <ScrambleText text="CODESHIFTAI" />
          </div>
          <p className="text-paper/50 mt-3 text-xs max-w-[280px] leading-relaxed font-mono">
            Legacy code isn't a liability. It's a language you haven't translated yet.
          </p>
          <pre className="font-mono text-[9px] leading-[1.1] text-paper/20 mt-4 select-none" aria-hidden="true">
{`+-+ +-+ +-+ +-+ +-+
|C| |S| |A| |I| |>|
+-+ +-+ +-+ +-+ +-+`}
          </pre>
        </div>
        <nav className="flex flex-col gap-2" aria-label="Footer navigation">
          <span className="font-display font-bold text-[11px] uppercase tracking-[0.08em] text-paper/30 mb-1">Navigate</span>
          <Link to="/" className="text-xs font-mono hover:text-signal transition-colors duration-150 underline underline-offset-2 decoration-1">Home</Link>
          <Link to="/vision" className="text-xs font-mono hover:text-signal transition-colors duration-150 underline underline-offset-2 decoration-1">Vision</Link>
          <Link to="/about" className="text-xs font-mono hover:text-signal transition-colors duration-150 underline underline-offset-2 decoration-1">About</Link>
          <Link to="/contact" className="text-xs font-mono hover:text-signal transition-colors duration-150 underline underline-offset-2 decoration-1">Contact</Link>
        </nav>
        <div className="flex flex-col gap-2">
          <span className="font-display font-bold text-[11px] uppercase tracking-[0.08em] text-paper/30 mb-1">Legal</span>
          <a href="#privacy" className="text-xs font-mono hover:text-signal transition-colors duration-150 underline underline-offset-2 decoration-1">Privacy Policy</a>
          <a href="#terms" className="text-xs font-mono hover:text-signal transition-colors duration-150 underline underline-offset-2 decoration-1">Terms of Service</a>
        </div>
      </div>
      <div className="border-t-3 border-paper/10 py-4 px-5 max-w-7xl mx-auto flex justify-between items-center text-[11px] text-paper/40 font-mono max-md:flex-col max-md:gap-2">
        <span>&copy; {new Date().getFullYear()} CodeShiftAI, Inc.</span>
        <div className="flex gap-4">
          <a href="#status" className="hover:text-signal transition-colors duration-150">System Status</a>
          <a href="#docs" className="hover:text-signal transition-colors duration-150">Documentation</a>
        </div>
      </div>
    </footer>
  );
}
