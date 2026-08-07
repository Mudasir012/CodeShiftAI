import Marquee from '../components/Marquee';

const TEAM = [
  { name: 'Ada Lovelace', role: 'Chief Architect', bio: 'Designed the first translation engine. Formerly led compiler infrastructure at Rust Labs.' },
  { name: 'Grace Hopper', role: 'Head of LLM Systems', bio: 'Built the multi-model orchestration layer. PhD in NLP from MIT.' },
  { name: 'Alan Kay', role: 'Protocol Design', bio: 'Defines the intermediate representation that bridges old and new languages.' },
  { name: 'Lynn Conway', role: 'Validation & Testing', bio: 'Designed the cross-validation framework that guarantees behavioral parity.' },
];

const PROOFS = [
  'A European bank — 1.2M lines of COBOL → Go, 6-month engagement',
  'A US healthcare provider — 800K lines of MUMPS → Rust, zero regressions',
  'A Japanese manufacturer — 2.1M lines of Fortran → Python, 47% cost saved',
  'A logistics firm — 500K lines of VB6 → TypeScript, shipped in 4 months',
];

export default function About() {
  return (
    <div>
      <section className="max-w-7xl mx-auto px-5 py-14 pb-10">
        <span className="font-mono font-bold text-xs text-concrete mb-4 block flex items-center">
          # ABOUT_US
        </span>
        <h1 className="text-[clamp(1.8rem,4vw,3.5rem)] font-bold -tracking-[0.05em] leading-[0.9] mb-4 uppercase">
          We're engineers
          <br />
          <span className="text-signal">who've done this before.</span>
        </h1>
        <p className="text-base text-concrete max-w-[500px] leading-relaxed font-mono">
          CodeShiftAI was founded by engineers who spent years modernizing
          legacy systems at enterprise scale. We built the tool we wished
          had existed.
        </p>
      </section>

      <div className="h-1 bg-ink w-full" />

      <Marquee
        items={['ADA', 'GRACE', 'ALAN', 'LYNN', 'COMPILERS', 'IR', 'VALIDATION', 'PARITY']}
        direction="right"
        speed="24s"
      />

      <section className="max-w-7xl mx-auto px-5 py-10 pb-14">
        <span className="font-mono font-bold text-xs text-concrete mb-6 block">// TEAM</span>
        <div className="grid grid-cols-4 max-lg:grid-cols-2 max-md:grid-cols-1 gap-3">
          {TEAM.map(m => (
            <div key={m.name} className="border-3 border-ink p-4 flex flex-col gap-2 transition-all duration-150 hover:bg-ink hover:text-paper group hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#0A0A0A]">
              <div className="w-10 h-10 bg-ink text-paper font-display font-bold text-sm flex items-center justify-center mb-1 group-hover:bg-signal">
                {m.name.split(' ').map(n => n[0]).join('')}
              </div>
              <h3 className="text-base font-semibold font-display">{m.name}</h3>
              <span className="font-mono font-bold text-[11px] uppercase tracking-[0.06em] text-signal">{m.role}</span>
              <p className="text-xs text-concrete leading-relaxed font-mono group-hover:text-paper/70">{m.bio}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="h-1 bg-ink w-full" />

      <section className="max-w-7xl mx-auto px-5 py-14 pb-10">
        <span className="font-mono font-bold text-xs text-concrete mb-6 block">// PROOF OF CONCEPT</span>
        <p className="text-base text-concrete max-w-[500px] leading-relaxed mb-6 font-mono">
          These are actual migrations we've completed. Same process.
          Same guarantees. Your codebase is next.
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-5 pb-14 grid gap-3">
        {PROOFS.map(p => (
          <div key={p} className="border-3 border-ink px-5 py-4 font-display font-medium text-sm flex items-center gap-3 transition-all duration-150 hover:bg-ink hover:text-paper hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#0A0A0A]">
            <span className="text-signal font-mono font-bold">{'>'}</span>
            {p}
          </div>
        ))}
      </div>

      <div className="h-1 bg-ink w-full" />
    </div>
  );
}
