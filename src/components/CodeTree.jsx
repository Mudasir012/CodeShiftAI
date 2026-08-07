export default function CodeTree() {
  const legacyFiles = [
    { name: 'main.cob', bar: 'done' },
    { name: 'inventory.f', bar: 'done' },
    { name: 'payroll.vb', bar: 'progress' },
    { name: 'report.php', bar: 'progress' },
    { name: 'legacy.frt', bar: 'pending' },
  ];

  const modernFiles = [
    { name: 'main.rs', bar: 'done' },
    { name: 'inventory.go', bar: 'done' },
    { name: 'payroll.py', bar: 'progress' },
    { name: 'api.ts', bar: 'progress' },
  ];

  const barStyles = {
    done: 'bg-signal w-full',
    progress: 'bg-hyper w-[60%]',
    pending: 'bg-concrete w-[20%]',
  };

  return (
    <div className="bg-white border-3 border-ink font-mono text-xs shadow-[4px_4px_0_0_#0A0A0A]" role="region" aria-label="Live code migration preview">
      <div className="px-3 py-2 border-b-3 border-ink bg-ink text-paper flex items-center gap-2">
        <span className="w-2.5 h-2.5 bg-signal" />
        <span className="w-2.5 h-2.5 bg-hyper" />
        <span className="w-2.5 h-2.5 bg-paper" />
        <span className="ml-auto text-paper/60 text-[10px] tracking-[0.04em] uppercase">migration_console.exe --watch</span>
      </div>
      <div className="grid grid-cols-[1fr_auto_1fr] max-md:grid-cols-1">
        <div className="p-3 border-r-3 border-ink max-md:border-r-0 max-md:border-b-3 border-ink">
          <span className="text-legacy text-[10px] uppercase tracking-[0.1em] mb-3 block font-display font-bold">Legacy Source</span>
          <div className="flex flex-col gap-1.5">
            {legacyFiles.map(f => (
              <div key={f.name} className="flex items-center gap-2 px-1.5 py-1.5 hover:bg-paper transition-colors duration-150">
                <span className="shrink-0 text-[10px] text-concrete">[-]</span>
                <span className="text-ink/80 text-[11px]">{f.name}</span>
                <div className="flex-1 h-1.5 bg-paper border border-ink max-w-[80px]">
                  <div className={`h-full transition-all duration-1000 ${barStyles[f.bar]}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center p-3 max-md:py-3 bg-paper border-r-3 border-ink max-md:border-r-0 max-md:border-b-3 border-ink">
          <div className="flex flex-col items-center gap-1.5 text-ink font-bold text-xl max-md:flex-row">
            <span>&#8594;</span>
            <span className="text-[10px] font-mono uppercase tracking-[0.08em] text-ink/60">4 LLMs</span>
          </div>
        </div>
        <div className="p-3">
          <span className="text-signal text-[10px] uppercase tracking-[0.1em] mb-3 block font-display font-bold">Modern Output</span>
          <div className="flex flex-col gap-1.5">
            {modernFiles.map(f => (
              <div key={f.name} className="flex items-center gap-2 px-1.5 py-1.5 hover:bg-paper transition-colors duration-150">
                <span className="shrink-0 text-[10px] text-concrete">[+]</span>
                <span className="text-ink/80 text-[11px]">{f.name}</span>
                <div className="flex-1 h-1.5 bg-paper border border-ink max-w-[80px]">
                  <div className={`h-full transition-all duration-1000 ${barStyles[f.bar]}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 max-md:grid-cols-1 border-t-3 border-ink">
        <div className="p-3 border-r-3 border-ink max-md:border-r-0 max-md:border-b-3 border-ink">
          <span className="text-[10px] text-concrete uppercase tracking-[0.08em] block font-mono">Legacy size</span>
          <span className="font-display text-xl font-bold text-ink mt-0.5 block">238K lines / 47 files</span>
        </div>
        <div className="p-3">
          <span className="text-[10px] text-concrete uppercase tracking-[0.08em] block font-mono">Output size</span>
          <span className="font-display text-xl font-bold text-ink mt-0.5 block">156K lines / 100% pass</span>
        </div>
      </div>
      <div className="p-3 border-t-3 border-ink bg-ink text-paper flex items-center gap-2">
        <span className="w-2.5 h-2.5 bg-signal" />
        <span className="text-[10px] text-signal tracking-[0.03em] font-mono flex items-center">
          PIPELINE ACTIVE &mdash; payroll.vb &#8594; payroll.py
        </span>
      </div>
    </div>
  );
}
