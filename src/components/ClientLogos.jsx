const CLIENTS = [
  'European Financial Trust',
  'MedCore Systems',
  'Osaka Manufacturing Co.',
  'AeroLogix',
  'NorthStar Logistics',
  'Pacifica Health',
];

export default function ClientLogos() {
  return (
    <section className="bg-ink text-paper py-10 border-y-3 border-ink">
      <div className="max-w-7xl mx-auto px-5">
        <p className="font-mono text-[10px] text-paper/40 uppercase tracking-[0.1em] text-center mb-6">
          Trusted by engineering teams at
        </p>
        <div className="grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-2">
          {CLIENTS.map(c => (
            <div
              key={c}
              className="border-3 border-paper/15 px-4 py-3 flex items-center justify-center hover:border-signal transition-colors duration-150"
            >
              <span className="font-display font-bold text-xs uppercase tracking-[0.06em] text-paper/50">
                {c}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
