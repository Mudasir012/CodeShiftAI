const TESTIMONIALS = [
  {
    quote: 'CodeShiftAI translated 1.2M lines of COBOL into Go with zero regressions. What we expected to be a 3-year rewrite took 6 months.',
    name: 'Dr. Elena Voss',
    role: 'CTO, European Financial Trust',
  },
  {
    quote: 'We were maintaining 800K lines of MUMPS with a team of three. CodeShiftAI gave us a Rust codebase our whole engineering team could actually work on.',
    name: 'Marcus Chen',
    role: 'VP Engineering, MedCore Systems',
  },
  {
    quote: 'The parallel LLM pipeline isn\'t just clever &mdash; it\'s the only approach that guarantees behavioral parity. We validated every translation against our test suite.',
    name: 'Yuki Tanaka',
    role: 'Lead Architect, Osaka Manufacturing Co.',
  },
  {
    quote: 'Fortran to Python in 4 months. 47% cost savings. Our scientists kept working during the entire migration. Zero downtime.',
    name: 'Sarah O\'Brien',
    role: 'Director of Engineering, AeroLogix',
  },
];

export default function Testimonials() {
  return (
    <section className="max-w-7xl mx-auto px-5 py-14">
      <div className="mb-10 border-b-3 border-ink pb-6">
        <span className="font-mono font-bold text-xs text-concrete mb-3 block">// TESTIMONIALS</span>
        <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold -tracking-[0.04em] mb-3">Trusted by engineering leaders</h2>
        <p className="text-concrete text-base max-w-[480px] font-mono">
          Real results from real migrations. No stock photos. No fluff.
        </p>
      </div>
      <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-3">
        {TESTIMONIALS.map(t => (
          <div key={t.name} className="border-3 border-ink p-4 flex flex-col gap-4 transition-all duration-150 hover:bg-ink hover:text-paper group hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#0A0A0A]">
            <span className="text-4xl leading-none text-signal font-display font-bold">&ldquo;</span>
            <p className="text-sm leading-relaxed transition-colors duration-150 group-hover:text-paper/80">
              {t.quote}
            </p>
            <div className="mt-auto pt-3 border-t-3 border-ink group-hover:border-paper/20 transition-colors duration-150">
              <span className="font-display font-bold text-xs">{t.name}</span>
              <span className="block text-[11px] text-concrete font-mono mt-1 transition-colors duration-150 group-hover:text-signal">{t.role}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
