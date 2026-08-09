import { useEffect, useState } from 'react';

const EVENTS = [
  { type: 'success', icon: '✓', text: 'JOB-9421 completed — COBOL → Go (850K LOC)', tag: 'PIPELINE' },
  { type: 'connect', icon: '⚡', text: 'Repo connected: acme-corp/legacy-vb6-billing', tag: 'GIT' },
  { type: 'warn',    icon: '⚠', text: 'Deprecation warning in FORTRAN_DYNAMICS.f77:342', tag: 'AUDIT' },
  { type: 'success', icon: '✓', text: 'Equivalence verified: 99.8% (1,024 tests)', tag: 'VERIFY' },
  { type: 'info',    icon: 'ℹ', text: 'LLM inference: 2,841 tokens in 1.2s', tag: 'LLM' },
  { type: 'connect', icon: '⚡', text: 'GitLab OAuth refreshed for workspace ws-0012', tag: 'AUTH' },
  { type: 'success', icon: '✓', text: 'JOB-9422 queued — Fortran → Python', tag: 'PIPELINE' },
  { type: 'warn',    icon: '⚠', text: 'GitHub API at 88% quota — using cache', tag: 'RATE' },
  { type: 'info',    icon: 'ℹ', text: 'Settings updated: LLM provider → CodeShift-7B', tag: 'SYSTEM' },
  { type: 'success', icon: '✓', text: 'Build succeeded — cargo: 0 warnings, 0 errors', tag: 'BUILD' },
  { type: 'connect', icon: '⚡', text: 'New repo detected: fintech/mumps-patient-db', tag: 'GIT' },
  { type: 'info',    icon: 'ℹ', text: 'AST parsed: 4,120 COBOL nodes in 0.8s', tag: 'PARSER' },
];

const TYPE_STYLES = {
  success: 'text-green-500 border-green-500/30 bg-green-500/5',
  warn:    'text-yellow-400 border-yellow-400/30 bg-yellow-400/5',
  connect: 'text-hyper border-hyper/30 bg-hyper/5',
  info:    'text-concrete border-concrete/30 bg-concrete/5',
};

const TAG_COLORS = {
  PIPELINE: '#FF2D00',
  GIT:      '#0033FF',
  AUDIT:    '#FF9900',
  VERIFY:   '#00AA44',
  LLM:      '#AA44FF',
  AUTH:     '#00AAFF',
  SYSTEM:   '#888888',
  RATE:     '#FF9900',
  BUILD:    '#00AA44',
  PARSER:   '#0033FF',
};

function timeAgo(date) {
  const diff = Math.floor((Date.now() - date) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return `${Math.floor(diff / 3600)}h ago`;
}

let eventIdx = 0;

export default function ActivityFeed({ className = '' }) {
  const [events, setEvents] = useState(() =>
    EVENTS.slice(0, 5).map((e, i) => ({
      ...e,
      id: i,
      ts: Date.now() - (5 - i) * 45000,
    }))
  );
  const [, tick] = useState(0);

  // Update relative timestamps every 30s
  useEffect(() => {
    const t = setInterval(() => tick((n) => n + 1), 30000);
    return () => clearInterval(t);
  }, []);

  // Stream new events every 8-15 seconds
  useEffect(() => {
    const addEvent = () => {
      eventIdx++;
      const template = EVENTS[eventIdx % EVENTS.length];
      setEvents((prev) => [
        { ...template, id: Date.now(), ts: Date.now() },
        ...prev.slice(0, 19),
      ]);
    };
    const schedule = () => {
      const delay = 8000 + Math.random() * 7000;
      return setTimeout(() => { addEvent(); schedule(); }, delay);
    };
    const t = schedule();
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between font-mono text-xs border-b-2 border-ink pb-2">
        <span className="font-bold text-ink uppercase text-[11px] flex items-center gap-2">
          <span className="w-2 h-2 bg-signal animate-pulse rounded-full" />
          // LIVE_ACTIVITY_FEED
        </span>
        <span className="text-concrete">{events.length} events</span>
      </div>

      <div className="space-y-1.5 max-h-[340px] overflow-y-auto terminal-scroll pr-1">
        {events.map((evt, i) => (
          <div
            key={evt.id}
            className={`flex items-start gap-2 p-2 border rounded-sm font-mono text-[10px] animate-activity-in ${TYPE_STYLES[evt.type] || TYPE_STYLES.info}`}
            style={{ animationDelay: i === 0 ? '0ms' : '0ms' }}
          >
            <span className="text-xs shrink-0 mt-0.5">{evt.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="truncate leading-tight">{evt.text}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span
                  className="text-[9px] font-bold px-1 py-0.5"
                  style={{ color: TAG_COLORS[evt.tag] || '#888', background: (TAG_COLORS[evt.tag] || '#888') + '15' }}
                >
                  {evt.tag}
                </span>
                <span className="text-concrete text-[9px]">{timeAgo(evt.ts)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
