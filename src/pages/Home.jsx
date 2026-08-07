import { Link } from 'react-router-dom';
import CodeTree from '../components/CodeTree';
import StatsBand from '../components/StatsBand';
import ProcessSteps from '../components/ProcessSteps';
import Testimonials from '../components/Testimonials';
import ClientLogos from '../components/ClientLogos';
import Typewriter from '../components/Typewriter';
import ScrambleText from '../components/ScrambleText';
import Marquee from '../components/Marquee';
import AsciiArt from '../components/AsciiArt';

const PROOFS = [
  'A European bank — 1.2M lines of COBOL → Go, 6-month engagement, zero regressions',
  'A US healthcare provider — 800K lines of MUMPS → Rust, shipped 4 months early',
  'A Japanese manufacturer — 2.1M lines of Fortran → Python, 47% cost saved',
  'A logistics firm — 500K lines of VB6 → TypeScript, 100% test pass rate',
];

export default function Home() {
  return (
    <div>
      {/* TOP MARQUEE */}
      <Marquee
        items={['COBOL → GO', 'FORTRAN → PYTHON', 'VB6 → TYPESCRIPT', 'PHP → RUST', 'MUMPS → RUST', 'PASCAL → GO']}
        direction="left"
        speed="25s"
      />

      {/* HERO */}
      <section className="border-b-3 border-ink">
        <div className="max-w-7xl mx-auto px-6 pt-12 pb-16">
          <div className="mb-6 overflow-hidden">
            <AsciiArt className="w-full" />
          </div>
          <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-8 items-end">
            <div className="flex flex-col gap-5">
              <span className="font-mono font-bold text-xs text-concrete flex items-center">
                # AI-Powered Legacy Code Modernization
              </span>
              <h1 className="text-[clamp(1.8rem,4.5vw,4rem)] font-bold -tracking-[0.05em] leading-[0.9] uppercase min-h-[2.6em]">
                <Typewriter text="YOUR LEGACY CODEBASE ISN'T A LIABILITY." delay={45} />
                <span className="text-signal block mt-2">
                  <Typewriter text="IT'S INPUT." delay={60} />
                </span>
              </h1>
              <p className="text-base text-concrete leading-relaxed max-w-[480px] font-mono">
                CodeShiftAI translates aging codebases — COBOL, Fortran, VB6, PHP 4 —
                into modern Rust, Go, Python, and TypeScript. A parallel pipeline of
                specialized LLMs guarantees behavioral parity. No rewrites. No downtime.
              </p>
              <div className="flex gap-3 flex-wrap max-sm:flex-col">
                <Link to="/contact" className="inline-flex items-center gap-2 font-display font-bold text-xs uppercase tracking-[0.06em] px-5 py-3 border-3 border-ink bg-ink text-paper transition-all duration-150 hover:bg-signal hover:border-signal hover:text-white hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_#0A0A0A] max-sm:w-full max-sm:justify-center">
                  <ScrambleText text="START FREE ASSESSMENT" />
                  <span>→</span>
                </Link>
                <a href="#how-it-works" className="inline-flex items-center gap-2 font-display font-bold text-xs uppercase tracking-[0.06em] px-5 py-3 border-3 border-ink transition-all duration-150 hover:bg-ink hover:text-paper hover:-translate-x-0.5 hover:-translate-y-0.5 max-sm:w-full max-sm:justify-center">
                  <ScrambleText text="HOW THE PIPELINE WORKS" />
                  <span>↓</span>
                </a>
              </div>
            </div>
            <div className="max-lg:order-first">
              <CodeTree />
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM MARQUEE */}
      <Marquee
        items={['14M LINES TRANSLATED', '98% LANGUAGE COVERAGE', '47% COST SAVED', '3.2X FASTER', 'ZERO REGRESSIONS']}
        direction="right"
        speed="20s"
      />

      {/* STATS */}
      <StatsBand />

      {/* CLIENT LOGOS */}
      <ClientLogos />

      {/* TESTIMONIALS */}
      <Testimonials />

      {/* PROCESS */}
      <ProcessSteps />

      {/* PROOFS */}
      <section className="max-w-7xl mx-auto px-6 py-14 border-t-3 border-ink">
        <div className="mb-8 border-b-3 border-ink pb-6">
          <span className="font-mono font-bold text-xs text-concrete mb-3 block">// CASE STUDIES</span>
          <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold -tracking-[0.04em] mb-3 uppercase">
            Migrations we've completed
          </h2>
          <p className="text-concrete text-base max-w-[480px] font-mono">
            Same process. Same guarantees. Your codebase is next.
          </p>
        </div>
        <div className="grid gap-3">
          {PROOFS.map((p, i) => (
            <div
              key={p}
              className="border-3 border-ink px-5 py-4 font-display font-medium text-sm flex items-center gap-4 transition-all duration-150 hover:bg-ink hover:text-paper hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#0A0A0A] group"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <span className="text-signal font-mono font-bold text-base shrink-0 group-hover:animate-glitch">{'>'}</span>
              <span>{p}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="max-w-7xl mx-auto px-6 py-18 text-center border-t-3 border-ink relative overflow-hidden">
        <pre className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[clamp(0.4rem,1.5vw,0.8rem)] leading-[1.1] text-ink/5 select-none pointer-events-none whitespace-pre" aria-hidden="true">
{`
    ██╗  ██╗ █████╗ ██╗  ██╗
    ██║  ██║██╔══██╗██║ ██╔╝
    ███████║███████║█████╔╝ 
    ██╔══██║██╔══██║██╔═██╗ 
    ██║  ██║██║  ██║██║  ██╗
    ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝
`}
        </pre>
        <span className="font-mono font-bold text-xs text-concrete mb-3 block">$ READY_TO_SHIP</span>
        <h2 className="text-[clamp(1.8rem,4vw,3.5rem)] font-bold -tracking-[0.05em] mb-5 max-w-[700px] mx-auto uppercase relative z-10">
          Ship your codebase into this century.
        </h2>
        <p className="text-concrete text-base max-w-[460px] mx-auto mb-6 leading-relaxed font-mono relative z-10">
          We'll analyze your legacy codebase, give you a timeline and
          price, and show you real output — before you commit a dollar.
        </p>
        <div className="flex gap-3 justify-center flex-wrap max-sm:flex-col max-sm:items-stretch relative z-10">
          <Link to="/contact" className="inline-flex items-center gap-2 font-display font-bold text-xs uppercase tracking-[0.06em] px-6 py-3 border-3 border-ink bg-ink text-paper transition-all duration-150 hover:bg-signal hover:border-signal hover:text-white hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_#0A0A0A] max-sm:justify-center">
            <ScrambleText text="GET A FREE ASSESSMENT" />
            <span>→</span>
          </Link>
          <Link to="/vision" className="inline-flex items-center gap-2 font-display font-bold text-xs uppercase tracking-[0.06em] px-6 py-3 border-3 border-ink transition-all duration-150 hover:bg-ink hover:text-paper hover:-translate-x-0.5 hover:-translate-y-0.5 max-sm:justify-center">
            <ScrambleText text="READ THE VISION" />
            <span>→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
