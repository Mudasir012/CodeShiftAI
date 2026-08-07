import Marquee from '../components/Marquee';

const PILLARS = [
  {
    title: 'Preserve institutional knowledge',
    desc: 'Your codebase contains decades of business logic, edge case handling, and domain expertise. We don\'t rewrite — we translate. Every behavior preserved, every quirk accounted for.',
  },
  {
    title: 'Eliminate the rewrite gamble',
    desc: 'A rewrite from scratch has a 70% failure rate. CodeShiftAI\'s multi-LLM approach translates your existing code with structural and behavioral parity. No lost features. No surprise timelines.',
  },
  {
    title: 'Meet developers where they are',
    desc: 'Your team doesn\'t need to learn COBOL, Fortran, or VB6 to maintain the old system, and they don\'t need to learn a new framework to adopt the new one. We output idiomatic, modern code your team can actually work with.',
  },
  {
    title: 'Parallel validation, not blind trust',
    desc: 'Every translated module is compiled, linted, and tested against your original test suite by a separate validation LLM. If the tests don\'t pass, the translation doesn\'t ship.',
  },
];

export default function Vision() {
  return (
    <div>
      <section className="max-w-7xl mx-auto px-5 py-14 pb-10">
        <span className="font-mono font-bold text-xs text-concrete mb-4 block flex items-center">
          # THE_VISION
        </span>
        <h1 className="text-[clamp(1.8rem,4vw,3.5rem)] font-bold -tracking-[0.05em] leading-[0.9] mb-4 uppercase">
          Code shouldn't expire.
          <br />
          <span className="text-signal">Languages should.</span>
        </h1>
        <p className="text-base text-concrete max-w-[500px] leading-relaxed font-mono">
          Every company with a 10+ year-old codebase faces the same choice:
          maintain a system nobody wants to touch, or risk a rewrite that
          might fail. We believe there's a third path.
        </p>
      </section>

      <div className="h-1 bg-ink w-full" />

      <Marquee
        items={['TRANSLATE', 'PRESERVE', 'VALIDATE', 'DEPLOY', 'NO REWRITES', 'NO DOWNTIME']}
        direction="left"
        speed="22s"
      />

      <section className="max-w-7xl mx-auto px-5 py-10 pb-14 grid gap-3">
        {PILLARS.map((p, i) => (
          <div key={p.title} className="border-3 border-ink p-4 px-6 grid grid-cols-[80px_1fr] max-md:grid-cols-1 gap-6 max-md:gap-3 items-start transition-all duration-150 hover:bg-ink hover:text-paper group hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#0A0A0A]">
            <span className="font-display font-bold text-4xl text-signal leading-none -tracking-[0.04em] group-hover:animate-glitch">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div>
              <h2 className="text-xl font-semibold -tracking-[0.02em] mb-2 font-display">{p.title}</h2>
              <p className="text-concrete leading-relaxed max-w-[500px] transition-colors duration-150 group-hover:text-paper/70 font-mono text-sm">
                {p.desc}
              </p>
            </div>
          </div>
        ))}
      </section>

      <div className="h-1 bg-ink w-full" />

      <section className="max-w-7xl mx-auto px-5 py-14 text-center border-t-3 border-ink">
        <pre className="font-mono text-[clamp(0.35rem,1.2vw,0.6rem)] leading-[1.1] text-ink/10 mb-6 select-none inline-block" aria-hidden="true">
{`
  ███████╗██╗   ██╗████████╗██╗   ██╗██████╗ ███████╗
  ██╔════╝██║   ██║╚══██╔══╝██║   ██║██╔══██╗██╔════╝
  █████╗  ██║   ██║   ██║   ██║   ██║██████╔╝█████╗
  ██╔══╝  ██║   ██║   ██║   ██║   ██║██╔══██╗██╔══╝
  ██║     ╚██████╔╝   ██║   ╚██████╔╝██║  ██║███████╗
  ╚═╝      ╚═════╝    ╚═╝    ╚═════╝ ╚═╝  ╚═╝╚══════╝
`}
        </pre>
        <p className="font-mono text-xs text-concrete">The future belongs to the maintainable.</p>
      </section>
    </div>
  );
}
