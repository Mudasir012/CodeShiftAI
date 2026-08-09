import { useState } from 'react';
import { Link } from 'react-router-dom';

const MOCK_LOGS = [
  { id: 'LOG-1092', timestamp: '2026-08-09T23:38:12Z', level: 'INFO', scope: 'AST_PARSER', message: 'Successfully parsed 4,120 COBOL AST nodes in account_bal.cbl' },
  { id: 'LOG-1091', timestamp: '2026-08-09T23:35:40Z', level: 'SECURITY', scope: 'OAUTH_GITHUB', message: 'User authenticated via GitHub OAuth (Token scope: repo, read:user)' },
  { id: 'LOG-1090', timestamp: '2026-08-09T23:30:15Z', level: 'INFO', scope: 'EQUIVALENCE_ENGINE', message: 'Generated 142 unit test assertions for Fortran matrix module' },
  { id: 'LOG-1089', timestamp: '2026-08-09T23:22:05Z', level: 'WARN', scope: 'DEPRECATION_CHECK', message: 'Legacy MUMPS global reference detected in PATREC.MPS - mapped to Rust KV store' },
  { id: 'LOG-1088', timestamp: '2026-08-09T23:10:00Z', level: 'INFO', scope: 'BUILD_VERIFIER', message: 'Cargo build succeeded for target rust-bundle-9419. zero compiler warnings.' },
];

export default function AuditLogPage() {
  const [filterLevel, setFilterLevel] = useState('ALL');

  const filteredLogs = MOCK_LOGS.filter((l) => {
    if (filterLevel === 'ALL') return true;
    return l.level === filterLevel;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 bg-paper">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b-3 border-ink pb-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-signal font-bold uppercase">
            <Link to="/dashboard" className="hover:underline text-concrete">&lt; Dashboard</Link>
            <span>/</span>
            <span># TERMINAL_AUDIT_LOGS</span>
          </div>
          <h1 className="text-3xl font-display font-bold uppercase text-ink mt-1">
            System Audit &amp; Terminal Stream
          </h1>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
          <span className="font-bold text-ink uppercase">Live Log Stream Active</span>
        </div>
      </div>

      {/* Main Terminal View */}
      <div className="border-3 border-ink bg-ink text-paper shadow-[8px_8px_0_0_#0A0A0A] overflow-hidden">
        
        {/* Terminal Header Bar */}
        <div className="p-3 bg-ink border-b-3 border-paper/15 flex items-center justify-between font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-signal rounded-full" />
            <span className="w-3 h-3 bg-yellow-500 rounded-full" />
            <span className="w-3 h-3 bg-green-500 rounded-full" />
            <span className="text-paper/60 ml-2">codeshift-audit-daemon.log</span>
          </div>

          <div className="flex gap-2">
            {['ALL', 'INFO', 'SECURITY', 'WARN'].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setFilterLevel(lvl)}
                className={`px-2.5 py-0.5 border text-[10px] font-bold uppercase transition-colors ${
                  filterLevel === lvl
                    ? 'border-signal bg-signal text-white'
                    : 'border-paper/20 text-paper/70 hover:text-white'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Log Entries */}
        <div className="p-6 font-mono text-xs space-y-3 min-h-[420px] overflow-y-auto">
          {filteredLogs.map((log) => (
            <div key={log.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 border-b border-paper/10 pb-2">
              <span className="text-paper/40 text-[10px] shrink-0">{log.timestamp}</span>
              <span
                className={`px-1.5 py-0.5 text-[9px] font-bold uppercase shrink-0 border ${
                  log.level === 'SECURITY'
                    ? 'border-signal text-signal bg-signal/10'
                    : log.level === 'WARN'
                    ? 'border-yellow-400 text-yellow-400 bg-yellow-400/10'
                    : 'border-green-400 text-green-400 bg-green-400/10'
                }`}
              >
                [{log.level}]
              </span>
              <span className="text-hyper font-bold text-[11px] shrink-0">[{log.scope}]</span>
              <span className="text-paper/90">{log.message}</span>
            </div>
          ))}
          <p className="text-signal pt-4 font-bold text-xs animate-pulse">
            &gt;_ Waiting for next event...
          </p>
        </div>
      </div>
    </div>
  );
}
