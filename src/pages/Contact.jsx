import { useState } from 'react';
import Typewriter from '../components/Typewriter';
import ScrambleText from '../components/ScrambleText';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      <section className="max-w-7xl mx-auto px-5 py-14 pb-10">
        <span className="font-mono font-bold text-xs text-concrete mb-4 block flex items-center">
          # GET_IN_TOUCH
        </span>
        <h1 className="text-[clamp(1.8rem,4vw,3.5rem)] font-bold -tracking-[0.05em] leading-[0.9] mb-4 uppercase">
          Tell us about
          <br />
          <span className="text-signal">your legacy codebase.</span>
        </h1>
      </section>

      <div className="h-1 bg-ink w-full" />

      {submitted ? (
        <div className="max-w-3xl mx-auto px-5 py-10 pb-14">
          <div className="border-3 border-signal bg-ink text-paper shadow-[5px_5px_0_0_#FF2D00] p-6 font-mono">
            <div className="flex items-center gap-2 border-b-3 border-paper/15 pb-3 mb-4">
              <span className="w-2.5 h-2.5 bg-signal" />
              <span className="text-xs uppercase tracking-[0.08em] text-paper/60">Transmission complete</span>
            </div>
            <div className="min-h-[120px]">
              <p className="text-signal text-xs mb-2">$ status: OK</p>
              <p className="text-paper/80 text-xs mb-2">&gt; Assessment request transmitted.</p>
              <Typewriter
                text="&gt; We'll review your codebase profile and respond within 5 business days with a plan and a price estimate."
                delay={30}
                className="text-paper/80 text-xs block leading-relaxed"
              />
            </div>
            <pre className="text-paper/20 text-[10px] mt-4 select-none" aria-hidden="true">
{`
    +-+-+-+-+-+-+-+-+-+-+-+
    |T|R|A|N|S|M|I|T|T|E|D|
    +-+-+-+-+-+-+-+-+-+-+-+
`}
            </pre>
          </div>
        </div>
      ) : (
        <section className="max-w-7xl mx-auto px-5 py-10 pb-14 grid grid-cols-[1fr_1.2fr] max-lg:grid-cols-1 gap-8">
          {/* LEFT: INFO */}
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-xl font-bold mb-3 font-display">What happens next</h2>
              <ol className="font-mono text-xs text-concrete flex flex-col gap-3 list-none">
                <li className="flex gap-2">
                  <span className="text-signal font-bold">01.</span>
                  <span>We read your submission and check language coverage.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-signal font-bold">02.</span>
                  <span>We run a quick complexity estimate on sample files.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-signal font-bold">03.</span>
                  <span>You get a timeline, price, and real translated output.</span>
                </li>
              </ol>
            </div>
            <div className="border-3 border-ink p-4">
              <span className="font-mono text-[11px] text-concrete uppercase tracking-[0.08em] block mb-2">Direct contact</span>
              <a href="mailto:hello@codeshift.ai" className="font-mono font-bold text-base text-ink hover:text-signal transition-colors duration-150 block mb-1.5">
                hello@codeshift.ai
              </a>
              <a href="tel:+15550000000" className="font-mono text-xs text-concrete hover:text-signal transition-colors duration-150 block">
                +1 (555) 000-0000
              </a>
            </div>
            <pre className="font-mono text-[clamp(0.35rem,1vw,0.6rem)] leading-[1.1] text-ink/10 select-none" aria-hidden="true">
{`
    ____ ____ ____ ____ ____ ____ ____ ____ ____ ____ 
   ||C |||O |||N |||T |||A |||C |||T |||  |||U |||S ||
   ||__|||__|||__|||__|||__|||__|||__|||__|||__|||__||
    |/__|/__|/__|/__|/__|/__|/__|/__|/__|/__|
`}
            </pre>
          </div>

          {/* RIGHT: FORM */}
          <div className="border-3 border-ink bg-white p-6 shadow-[4px_4px_0_0_#0A0A0A]">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-display font-bold text-xs tracking-[0.02em]" htmlFor="name">Your name</label>
                  <input className="font-mono text-sm px-3 py-3 border-3 border-ink bg-paper transition-all duration-150 focus:outline-none focus:border-signal focus:shadow-[3px_3px_0_0_#FF2D00]" id="name" type="text" required placeholder="Jane Smith" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-display font-bold text-xs tracking-[0.02em]" htmlFor="email">Email</label>
                  <input className="font-mono text-sm px-3 py-3 border-3 border-ink bg-paper transition-all duration-150 focus:outline-none focus:border-signal focus:shadow-[3px_3px_0_0_#FF2D00]" id="email" type="email" required placeholder="jane@company.com" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-display font-bold text-xs tracking-[0.02em]" htmlFor="company">Company</label>
                <input className="font-mono text-sm px-3 py-3 border-3 border-ink bg-paper transition-all duration-150 focus:outline-none focus:border-signal focus:shadow-[3px_3px_0_0_#FF2D00]" id="company" type="text" required placeholder="Acme Corp" />
              </div>
              <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-display font-bold text-xs tracking-[0.02em]" htmlFor="languages">Legacy languages</label>
                  <input className="font-mono text-sm px-3 py-3 border-3 border-ink bg-paper transition-all duration-150 focus:outline-none focus:border-signal focus:shadow-[3px_3px_0_0_#FF2D00]" id="languages" type="text" required placeholder="COBOL, Fortran, VB6..." />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-display font-bold text-xs tracking-[0.02em]" htmlFor="size">Codebase size</label>
                  <select className="font-mono text-sm px-3 py-3 border-3 border-ink bg-paper transition-all duration-150 focus:outline-none focus:border-signal focus:shadow-[3px_3px_0_0_#FF2D00] appearance-none" id="size" required
                    style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 2l5 5 5-5' stroke='%230A0A0A' stroke-width='2' fill='none' stroke-linecap='square'/%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', paddingRight: '2rem' }}>
                    <option value="">Select an estimate...</option>
                    <option value="small">&lt; 50K lines</option>
                    <option value="medium">50K – 500K lines</option>
                    <option value="large">500K – 5M lines</option>
                    <option value="enterprise">5M+ lines</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-display font-bold text-xs tracking-[0.02em]" htmlFor="message">Additional context</label>
                <textarea className="font-mono text-sm px-3 py-3 border-3 border-ink bg-paper transition-all duration-150 focus:outline-none focus:border-signal focus:shadow-[3px_3px_0_0_#FF2D00] resize-y min-h-[100px]" id="message" rows={3} placeholder="Timeline, constraints, target languages..." />
              </div>
              <button type="submit" className="inline-flex items-center justify-center gap-2 font-display font-bold text-xs uppercase tracking-[0.06em] px-5 py-3 border-3 border-ink bg-ink text-paper transition-all duration-150 hover:bg-signal hover:border-signal hover:text-white hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_#0A0A0A] w-full">
                <ScrambleText text="TRANSMIT REQUEST" />
                <span>→</span>
              </button>
            </form>
          </div>
        </section>
      )}

      <div className="h-1 bg-ink w-full" />
    </div>
  );
}
