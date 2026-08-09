import { useEffect, useRef, useState } from 'react';

const SEED_LOGS = [
  { level: 'INFO',     scope: 'AST_PARSER',         msg: 'Parsed 4,120 COBOL AST nodes in account_bal.cbl' },
  { level: 'SECURITY', scope: 'OAUTH_GITHUB',        msg: 'User authenticated via GitHub OAuth — scope: repo, read:user' },
  { level: 'INFO',     scope: 'EQUIVALENCE_ENGINE',  msg: 'Generated 142 unit test assertions for Fortran matrix module' },
  { level: 'WARN',     scope: 'DEPRECATION_CHECK',   msg: 'Legacy MUMPS global reference detected in PATREC.MPS → mapped to Rust KV store' },
  { level: 'INFO',     scope: 'BUILD_VERIFIER',      msg: 'Cargo build succeeded for rust-bundle-9419. Zero compiler warnings.' },
  { level: 'INFO',     scope: 'LLM_PIPELINE',        msg: 'CodeShift-7B inference complete — 2,841 tokens in 1.2s' },
  { level: 'ERROR',    scope: 'AST_PARSER',          msg: 'Unexpected token at line 342 in FORTRAN_DYNAMICS.f77 — skipping block' },
  { level: 'INFO',     scope: 'DIFF_ENGINE',         msg: 'Generated diff: 412 insertions, 380 deletions, 0 conflicts' },
  { level: 'SECURITY', scope: 'AUTH_MIDDLEWARE',     msg: 'API key rotation triggered for workspace ws-9921' },
  { level: 'INFO',     scope: 'BUILD_VERIFIER',      msg: 'Go build succeeded — binary size: 4.2 MB, allocs: 0' },
  { level: 'WARN',     scope: 'RATE_LIMITER',        msg: 'GitHub API at 88% quota — switching to cached response' },
  { level: 'INFO',     scope: 'EQUIVALENCE_ENGINE',  msg: 'Behavioral equivalence confirmed: 99.8% across 1,024 test cases' },
  { level: 'INFO',     scope: 'PIPELINE_SCHEDULER',  msg: 'Job JOB-9422 queued — priority: HIGH, estimated: 8 min' },
  { level: 'INFO',     scope: 'AST_PARSER',          msg: 'VB6 module COM_INTEROP.bas resolved to TypeScript interface' },
  { level: 'WARN',     scope: 'MEMORY_GUARD',        msg: 'Peak heap usage 2.1 GB during COBOL parse — within limits' },
];

const LEVEL_STYLES = {
  INFO:     'border-green-500 text-green-400 bg-green-500/10',
  WARN:     'border-yellow-400 text-yellow-400 bg-yellow-400/10',
  ERROR:    'border-signal text-signal bg-signal/10',
  SECURITY: 'border-hyper text-blue-400 bg-blue-400/10',
};

function formatTime() {
  return new Date().toISOString().replace('T', ' ').slice(0, 19) + 'Z';
}

let logCounter = 1100;

export default function TerminalStream({ filterLevel = 'ALL', className = '' }) {
  const [logs, setLogs] = useState(() =>
    SEED_LOGS.slice(0, 5).map((l, i) => ({
      ...l,
      id: `LOG-${1090 + i}`,
      ts: new Date(Date.now() - (5 - i) * 120000).toISOString().replace('T', ' ').slice(0, 19) + 'Z',
    }))
  );
  const bottomRef = useRef(null);

  // Stream new log entries every 3-7 seconds
  useEffect(() => {
    const addLog = () => {
      const template = SEED_LOGS[Math.floor(Math.random() * SEED_LOGS.length)];
      logCounter++;
      const newLog = {
        ...template,
        id: `LOG-${logCounter}`,
        ts: formatTime(),
        // Small variation in message
        msg: template.msg,
      };
      setLogs((prev) => [...prev.slice(-80), newLog]); // Keep last 80
    };

    const schedule = () => {
      const delay = 3000 + Math.random() * 4000;
      return setTimeout(() => { addLog(); schedule(); }, delay);
    };
    const t = schedule();
    return () => clearTimeout(t);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const filtered = filterLevel === 'ALL'
    ? logs
    : logs.filter((l) => l.level === filterLevel);

  return (
    <div className={`font-mono text-xs space-y-2 min-h-[420px] max-h-[520px] overflow-y-auto terminal-scroll ${className}`}>
      {/* Boot header */}
      <div className="text-green-500/60 border-b border-green-500/20 pb-2 mb-1">
        <p>{'>'} CodeShift Audit Daemon v2.4.1</p>
        <p>{'>'} Log stream initialized — <span className="text-green-400">LIVE</span></p>
        <p>{'>'} ─────────────────────────────</p>
      </div>

      {filtered.map((log, i) => (
        <div
          key={log.id + i}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-2 border-b border-green-500/10 pb-1.5 animate-activity-in"
          style={{ animationDelay: `${Math.min(i * 30, 300)}ms` }}
        >
          <span className="text-[#4A5568] text-[10px] shrink-0 tabular-nums">{log.ts}</span>
          <span className={`px-1.5 py-0.5 text-[9px] font-bold uppercase border shrink-0 ${LEVEL_STYLES[log.level] || LEVEL_STYLES.INFO}`}>
            {log.level}
          </span>
          <span className="text-purple-400 font-bold text-[11px] shrink-0">[{log.scope}]</span>
          <span className="text-green-100/90">{log.msg}</span>
        </div>
      ))}

      {/* Live cursor */}
      <div className="text-green-400 animate-pulse flex items-center gap-1 pt-1">
        <span>{'>'}_</span>
        <span className="animate-blink">█</span>
        <span className="text-green-500/60">Waiting for next event...</span>
      </div>

      <div ref={bottomRef} />
    </div>
  );
}
