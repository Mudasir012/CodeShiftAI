import { useEffect, useRef, useState } from 'react';

// Generate sparkline SVG path from data array
function sparklinePath(data, width, height) {
  if (!data || data.length < 2) return '';
  const max = Math.max(...data, 1);
  const min = Math.min(...data);
  const range = max - min || 1;
  const step = width / (data.length - 1);
  const pts = data.map((v, i) => {
    const x = i * step;
    const y = height - ((v - min) / range) * (height - 4) - 2;
    return `${x},${y}`;
  });
  return `M ${pts.join(' L ')}`;
}

function generateSparkData(length = 7) {
  let v = 50 + Math.random() * 30;
  return Array.from({ length }, () => {
    v = Math.max(5, Math.min(100, v + (Math.random() - 0.5) * 25));
    return Math.round(v);
  });
}

export default function StatCard({ label, value, sub, accentColor = '#FF2D00', icon, className = '' }) {
  const [sparkData] = useState(() => generateSparkData(8));
  const [animValue, setAnimValue] = useState('0');
  const ref = useRef(null);

  // Animate number count-up on first view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        // Extract numeric value
        const numeric = parseFloat(String(value).replace(/[^0-9.]/g, ''));
        if (isNaN(numeric)) { setAnimValue(value); return; }
        const prefix = String(value).match(/^[^0-9]*/)?.[0] || '';
        const suffix = String(value).match(/[^0-9.]*$/)?.[0] || '';
        const duration = 800;
        const start = performance.now();
        const animate = (now) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          const cur = eased * numeric;
          // Format nicely
          const formatted = cur >= 1000
            ? (cur / 1000).toFixed(1) + 'K'
            : cur >= 1000000
            ? (cur / 1000000).toFixed(1) + 'M'
            : cur.toFixed(cur % 1 !== 0 ? 1 : 0);
          setAnimValue(`${prefix}${formatted}${suffix}`);
          if (p < 1) requestAnimationFrame(animate);
          else setAnimValue(value);
        };
        requestAnimationFrame(animate);
        observer.disconnect();
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  const W = 80, H = 32;
  const path = sparklinePath(sparkData, W, H);

  return (
    <div
      ref={ref}
      className={`border-3 border-ink bg-white p-5 shadow-[4px_4px_0_0_#0A0A0A] font-mono flex flex-col justify-between hover:shadow-[6px_6px_0_0_#FF2D00] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all ${className}`}
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <div>
          <span className="text-[10px] text-concrete uppercase font-bold block mb-1">{label}</span>
          <span
            className="text-2xl font-bold font-display block"
            style={{ color: accentColor }}
          >
            {animValue || value}
          </span>
          {sub && <span className="text-[10px] text-concrete block mt-0.5">{sub}</span>}
        </div>
        {icon && (
          <span className="text-xl opacity-60">{icon}</span>
        )}
      </div>

      {/* Sparkline */}
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="overflow-visible">
        {/* Area fill */}
        <path
          d={`${path} L ${W},${H} L 0,${H} Z`}
          fill={accentColor}
          fillOpacity="0.08"
        />
        {/* Line */}
        <path
          d={path}
          fill="none"
          stroke={accentColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-sparkline"
        />
        {/* Last point dot */}
        {sparkData.length > 0 && (() => {
          const last = sparkData[sparkData.length - 1];
          const max = Math.max(...sparkData, 1);
          const min = Math.min(...sparkData);
          const range = max - min || 1;
          const x = W;
          const y = H - ((last - min) / range) * (H - 4) - 2;
          return <circle cx={x} cy={y} r="2.5" fill={accentColor} />;
        })()}
      </svg>
    </div>
  );
}
