import { useEffect, useRef, useState } from 'react';

// Generate a realistic-looking contribution graph data
function generateGraphData() {
  const data = [];
  const now = new Date();
  // Go back ~52 weeks
  const start = new Date(now);
  start.setDate(start.getDate() - 364);
  // Align to Sunday
  start.setDate(start.getDate() - start.getDay());

  for (let w = 0; w < 53; w++) {
    const week = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(start);
      date.setDate(start.getDate() + w * 7 + d);
      if (date > now) { week.push({ date, count: -1 }); continue; }
      // Organic distribution
      const roll = Math.random();
      let count = 0;
      if (roll > 0.35) {
        if (roll > 0.95) count = Math.floor(Math.random() * 18) + 10;       // burst
        else if (roll > 0.80) count = Math.floor(Math.random() * 8) + 5;    // active
        else count = Math.floor(Math.random() * 4) + 1;                     // light
      }
      // Weekends less active
      if (d === 0 || d === 6) count = Math.floor(count * 0.4);
      week.push({ date, count });
    }
    data.push(week);
  }
  return data;
}

function getColor(count) {
  if (count < 0) return 'transparent';
  if (count === 0) return '#EBEDF0';
  if (count <= 2)  return '#9BE9A8';
  if (count <= 5)  return '#40C463';
  if (count <= 10) return '#30A14E';
  return '#216E39';
}

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const DAYS = ['','M','','W','','F',''];

export default function ContributionGraph({ className = '' }) {
  const [data] = useState(() => generateGraphData());
  const [revealed, setRevealed] = useState(0);
  const [tooltip, setTooltip] = useState(null);
  const containerRef = useRef(null);

  // Animate cells in from left to right
  useEffect(() => {
    let col = 0;
    const id = setInterval(() => {
      col++;
      setRevealed(col);
      if (col >= 53) clearInterval(id);
    }, 18);
    return () => clearInterval(id);
  }, []);

  const totalCommits = data.flat().reduce((s, c) => s + Math.max(0, c.count), 0);

  // Month label positions
  const monthLabels = [];
  let lastMonth = -1;
  data.forEach((week, wi) => {
    const month = week[0]?.date?.getMonth();
    if (month !== undefined && month !== lastMonth) {
      monthLabels.push({ wi, label: MONTHS[month] });
      lastMonth = month;
    }
  });

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between font-mono text-xs">
        <span className="font-bold text-ink uppercase text-[11px]">// PIPELINE_ACTIVITY_MAP</span>
        <span className="text-concrete">{totalCommits.toLocaleString()} jobs run this year</span>
      </div>

      <div ref={containerRef} className="overflow-x-auto pb-1">
        <div className="inline-block min-w-max">
          {/* Month labels */}
          <div className="flex mb-1 ml-6">
            {data.map((_, wi) => {
              const ml = monthLabels.find((m) => m.wi === wi);
              return (
                <div key={wi} className="w-[13px] mx-[1px] font-mono text-[9px] text-concrete shrink-0">
                  {ml ? ml.label : ''}
                </div>
              );
            })}
          </div>

          <div className="flex gap-[2px]">
            {/* Day labels */}
            <div className="flex flex-col gap-[2px] mr-1">
              {DAYS.map((d, i) => (
                <div key={i} className="w-4 h-[11px] font-mono text-[9px] text-concrete flex items-center justify-end pr-1">
                  {d}
                </div>
              ))}
            </div>

            {/* Contribution cells */}
            {data.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[2px]">
                {week.map((cell, di) => (
                  <div
                    key={di}
                    onMouseEnter={(e) => {
                      if (cell.count < 0) return;
                      const rect = e.currentTarget.getBoundingClientRect();
                      const parentRect = containerRef.current.getBoundingClientRect();
                      setTooltip({
                        x: rect.left - parentRect.left,
                        y: rect.top - parentRect.top - 36,
                        text: cell.count === 0
                          ? `No jobs on ${cell.date?.toDateString()}`
                          : `${cell.count} job${cell.count !== 1 ? 's' : ''} on ${cell.date?.toDateString()}`,
                      });
                    }}
                    onMouseLeave={() => setTooltip(null)}
                    className="w-[11px] h-[11px] rounded-[2px] transition-all duration-100 hover:ring-1 hover:ring-signal hover:ring-offset-1 cursor-default"
                    style={{
                      background: wi <= revealed ? getColor(cell.count) : 'transparent',
                      border: cell.count >= 0 && wi <= revealed ? '1px solid rgba(0,0,0,0.06)' : 'none',
                      transition: `background 0.15s ease ${wi * 10}ms`,
                    }}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-1 mt-2 ml-6 font-mono text-[9px] text-concrete">
            <span>Less</span>
            {[0, 1, 3, 6, 12].map((v) => (
              <div key={v} className="w-[11px] h-[11px] rounded-[2px]" style={{ background: getColor(v) }} />
            ))}
            <span>More</span>
          </div>
        </div>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="absolute z-50 px-2 py-1 bg-ink text-paper font-mono text-[10px] pointer-events-none whitespace-nowrap shadow-lg"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          {tooltip.text}
        </div>
      )}
    </div>
  );
}
