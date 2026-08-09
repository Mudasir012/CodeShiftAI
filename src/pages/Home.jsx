import { useState } from 'react';
import { Link } from 'react-router-dom';
import CodeTree from '../components/CodeTree';
import Mascot from '../components/Mascot';
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
  const [mascotPeek, setMascotPeek] = useState(false);

  return (
    <div>
      {/* TOP MARQUEE */}
      <Marquee
        items={['COBOL → GO', 'FORTRAN → PYTHON', 'VB6 → TYPESCRIPT', 'PHP → RUST', 'MUMPS → RUST', 'PASCAL → GO']}
        direction="left"
        speed="25s"
      />

      {/* HERO SECTION */}
      <section className="border-b-3 border-ink relative overflow-hidden bg-paper">
        <div className="max-w-7xl mx-auto px-6 pt-10 pb-16">
          <div className="mb-6 overflow-hidden">
            <AsciiArt className="w-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 flex flex-col gap-5">
              <div className="inline-flex items-center gap-2 font-mono font-bold text-xs text-paper bg-ink px-3 py-1 border-2 border-ink self-start shadow-[3px_3px_0_0_#FF2D00]">
                <span className="w-2 h-2 rounded-full bg-signal animate-ping" />
                <span># AI-POWERED LEGACY MODERNIZATION</span>
              </div>

              <h1 className="text-[clamp(2.2rem,4.5vw,4.2rem)] font-bold -tracking-[0.05em] leading-[0.92] uppercase">
                <Typewriter text="YOUR LEGACY CODEBASE ISN'T A LIABILITY." delay={35} />
                <span className="text-signal block mt-2">
                  <Typewriter text="IT'S INPUT." delay={55} />
                </span>
              </h1>

              <p className="text-base text-concrete leading-relaxed max-w-[540px] font-mono">
                CodeShiftAI translates aging codebases — COBOL, Fortran, VB6, PHP 4 —
                into modern Rust, Go, Python, and TypeScript. Guided by autonomous multi-agent pipeline and our Mascot <strong className="text-ink underline decoration-signal">ShiftBot</strong>. No rewrites. No downtime.
              </p>

              <div className="flex gap-4 flex-wrap max-sm:flex-col pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 font-display font-bold text-xs uppercase tracking-[0.06em] px-6 py-4 border-3 border-ink bg-ink text-paper transition-all duration-150 hover:bg-signal hover:border-signal hover:text-white hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_#0A0A0A] max-sm:w-full max-sm:justify-center"
                >
                  <ScrambleText text="START FREE ASSESSMENT" />
                  <span>→</span>
                </Link>
                <a
                  href="#mascot-intro"
                  className="inline-flex items-center gap-2 font-display font-bold text-xs uppercase tracking-[0.06em] px-6 py-4 border-3 border-ink bg-white transition-all duration-150 hover:bg-ink hover:text-paper hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_#0A0A0A] max-sm:w-full max-sm:justify-center"
                >
                  <ScrambleText text="MEET SHIFTBOT AI" />
                  <span>↓</span>
                </a>
              </div>
            </div>

            {/* Right Hero Visual (Interactive Mascot + Code Tree) */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="w-full border-3 border-ink bg-white p-6 shadow-[8px_8px_0_0_#0A0A0A] relative group">
                <div className="flex items-center justify-between border-b-3 border-ink pb-3 mb-4 font-mono text-xs">
                  <span className="font-bold uppercase text-ink flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 bg-signal" />
                    AUTONOMOUS_PARSER
                  </span>
                  <button
                    type="button"
                    onMouseDown={() => setMascotPeek(true)}
                    onMouseUp={() => setMascotPeek(false)}
                    onMouseLeave={() => setMascotPeek(false)}
                    className="px-2 py-0.5 border border-ink text-[10px] bg-paper hover:bg-signal hover:text-white transition-colors cursor-pointer"
                  >
                    {mascotPeek ? 'SHIELDED' : 'PRESS TO SHIELD EYES'}
                  </button>
                </div>

                <div className="flex justify-center mb-4">
                  <Mascot mode="home" isCoveringEyes={mascotPeek} />
                </div>

                <CodeTree />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MASCOT & LAB FEATURE SHOWCASE BAND */}
      <section id="mascot-intro" className="border-b-3 border-ink py-16 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Bold Image Banner */}
            <div className="lg:col-span-7 relative">
              <div className="border-3 border-ink bg-ink shadow-[6px_6px_0_0_#0A0A0A] overflow-hidden group">
                <img
                  src="/assets/brutalist-mascot-lab.jpg"
                  alt="CodeShiftAI Cybernetic Laboratory with ShiftBot Mascot"
                  className="w-full h-auto object-cover opacity-90 filter contrast-100 grayscale hover:grayscale-0 transition-all duration-500"
                />
                <div className="p-3.5 bg-ink border-t-3 border-ink flex items-center justify-between font-mono text-xs text-paper">
                  <span className="text-signal font-bold">$ TELEMETRY: REALTIME_PARSING</span>
                  <span className="text-concrete text-[10px]">LOC: 14,209,100+</span>
                </div>
              </div>
            </div>

            {/* Content description */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <span className="font-mono font-bold text-xs text-signal">// MEET SHIFTBOT</span>
              <h2 className="text-[clamp(1.8rem,3vw,3rem)] font-display font-bold uppercase leading-none text-ink">
                Your AI Copilot for Legacy Transformations
              </h2>
              <p className="font-mono text-xs text-concrete leading-relaxed">
                ShiftBot monitors AST syntax mapping, catches regression bugs before build, and ensures 100% test coverage across your converted codebase.
              </p>

              <div className="grid grid-cols-2 gap-3 mt-2 font-mono text-xs">
                <div className="border-2 border-ink bg-paper p-3 shadow-[3px_3px_0_0_#0A0A0A]">
                  <span className="block font-bold text-ink text-sm">98.4%</span>
                  <span className="text-concrete text-[11px]">Precision Rate</span>
                </div>
                <div className="border-2 border-ink bg-paper p-3 shadow-[3px_3px_0_0_#0A0A0A]">
                  <span className="block font-bold text-signal text-sm">0 DOWNTIME</span>
                  <span className="text-concrete text-[11px]">Deploy Guarantee</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CODE TRANSFORMATION DEEP DIVE WITH BOLD BRUTALIST ART */}
      <section className="border-b-3 border-ink py-16 bg-paper">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-10 text-center max-w-2xl mx-auto">
            <span className="font-mono font-bold text-xs text-concrete uppercase block mb-2">// PIPELINE VISUALIZER</span>
            <h2 className="text-[clamp(2rem,3.5vw,3.2rem)] font-display font-bold uppercase leading-none text-ink">
              From Cobol Monoliths to Cloud Native Microservices
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="border-3 border-ink bg-ink shadow-[6px_6px_0_0_#0A0A0A] overflow-hidden group">
              <img
                src="/assets/brutalist-transform.jpg"
                alt="Subtle Code Shift Visualizer"
                className="w-full h-auto object-cover opacity-90 filter contrast-100 grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>

            <div className="flex flex-col gap-4 font-mono text-xs">
              <div className="border-3 border-ink bg-white p-5 shadow-[4px_4px_0_0_#0A0A0A]">
                <span className="text-signal font-bold block mb-1">01. DECONSTRUCTION</span>
                <p className="text-concrete">Extract business rules &amp; state machines from decades-old mainframes.</p>
              </div>

              <div className="border-3 border-ink bg-white p-5 shadow-[4px_4px_0_0_#0A0A0A]">
                <span className="text-signal font-bold block mb-1">02. MULTI-AGENT REFORMULATION</span>
                <p className="text-concrete">Parallel LLM workers construct typed AST structures in modern languages.</p>
              </div>

              <div className="border-3 border-ink bg-white p-5 shadow-[4px_4px_0_0_#0A0A0A]">
                <span className="text-signal font-bold block mb-1">03. VERIFICATION &amp; CI/CD</span>
                <p className="text-concrete">Automated unit test generation verifies line-by-line behavioral equivalence.</p>
              </div>
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

      {/* PROCESS STEPS */}
      <ProcessSteps />

      {/* PROOFS / CASE STUDIES */}
      <section className="max-w-7xl mx-auto px-6 py-14 border-t-3 border-ink">
        <div className="mb-8 border-b-3 border-ink pb-6">
          <span className="font-mono font-bold text-xs text-concrete mb-3 block">// CASE STUDIES</span>
          <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold -tracking-[0.04em] mb-3 uppercase">
            Migrations completed by CodeShiftAI
          </h2>
          <p className="text-concrete text-base max-w-[480px] font-mono">
            Same process. Same guarantees. Your codebase is next.
          </p>
        </div>
        <div className="grid gap-3">
          {PROOFS.map((p, i) => (
            <div
              key={p}
              className="border-3 border-ink px-5 py-4 font-display font-medium text-sm flex items-center gap-4 transition-all duration-150 hover:bg-ink hover:text-paper hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#0A0A0A] group bg-white"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <span className="text-signal font-mono font-bold text-base shrink-0 group-hover:animate-glitch">{'>'}</span>
              <span>{p}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="max-w-7xl mx-auto px-6 py-18 text-center border-t-3 border-ink relative overflow-hidden bg-white">
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
