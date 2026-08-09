import { useEffect, useRef, useState } from 'react';

const LANGUAGES = [
  { name: 'COBOL',      pct: 38, color: '#FF2D00' },
  { name: 'Fortran',    pct: 22, color: '#0033FF' },
  { name: 'VB6',        pct: 15, color: '#AA44FF' },
  { name: 'MUMPS',      pct: 12, color: '#FF9900' },
  { name: 'Pascal',     pct:  8, color: '#00AAFF' },
  { name: 'Other',      pct:  5, color: '#888888' },
];

export default function LanguageStatsBar({ className = '' }) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between font-mono text-xs">
        <span className="font-bold text-ink uppercase text-[11px]">// LEGACY_LANG_BREAKDOWN</span>
        <span className="text-concrete">Source repositories</span>
      </div>

      {/* Stacked bar */}
      <div className="flex h-5 w-full overflow-hidden border-2 border-ink">
        {LANGUAGES.map((lang, i) => (
          <div
            key={lang.name}
            title={`${lang.name}: ${lang.pct}%`}
            className="h-full transition-all duration-700 ease-out relative group cursor-default"
            style={{
              width: animated ? `${lang.pct}%` : '0%',
              background: lang.color,
              transitionDelay: `${i * 80}ms`,
            }}
          >
            {/* Hover label */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-0.5 bg-ink text-paper font-mono text-[9px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
              {lang.name} {lang.pct}%
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-1.5">
        {LANGUAGES.map((lang) => (
          <div key={lang.name} className="flex items-center gap-1.5 font-mono text-[10px]">
            <div className="w-2.5 h-2.5 shrink-0" style={{ background: lang.color, border: '1px solid rgba(0,0,0,0.2)' }} />
            <span className="text-ink font-bold">{lang.name}</span>
            <span className="text-concrete">{lang.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
