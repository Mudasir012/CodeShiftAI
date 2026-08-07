const STATS = [
  { value: '98%', label: 'Language coverage' },
  { value: '14M', label: 'Lines translated' },
  { value: '47%', label: 'Average cost saved' },
  { value: '3.2x', label: 'Faster than rewrite' },
];

export default function StatsBand() {
  return (
    <div className="bg-ink text-paper border-y-3 border-ink">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-4 max-md:grid-cols-2 max-sm:grid-cols-1">
        {STATS.map(s => (
          <div
            key={s.label}
            className={`py-6 px-4 flex flex-col gap-1.5 border-r-3 border-paper/15 last:border-r-0 max-md:border-r-3 max-md:[&:nth-child(even)]:border-r-0 max-md:[&:nth-child(-n+2)]:border-b-3 max-md:border-paper/15 max-sm:border-r-0 max-sm:border-b-3 max-sm:last:border-b-0`}
          >
            <span className="font-display font-bold text-4xl leading-none -tracking-[0.04em] text-signal">{s.value}</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-paper/50">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
