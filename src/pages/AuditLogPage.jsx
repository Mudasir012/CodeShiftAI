import { useState } from 'react';
import { Link } from 'react-router-dom';
import Mascot from '../components/Mascot';
import TerminalStream from '../components/TerminalStream';

export default function AuditLogPage() {
  const [filterLevel, setFilterLevel] = useState('ALL');

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

        <div className="flex items-center gap-4">
          <Mascot mode="audit" className="scale-65 -my-6" />
          <div className="hidden md:flex items-center gap-2 font-mono text-xs">
            <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
            <span className="font-bold text-ink uppercase">Live Log Stream Active</span>
          </div>
        </div>
      </div>

      {/* Main Terminal View */}
      <div className="border-3 border-ink bg-ink text-paper shadow-[8px_8px_0_0_#0A0A0A] overflow-hidden animate-terminal-pulse">

        {/* Terminal Header Bar */}
        <div className="p-3 bg-ink border-b-3 border-paper/15 flex items-center justify-between font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-signal rounded-full" />
            <span className="w-3 h-3 bg-yellow-500 rounded-full" />
            <span className="w-3 h-3 bg-green-500 rounded-full" />
            <span className="text-paper/60 ml-2">codeshift-audit-daemon.log</span>
          </div>

          <div className="flex gap-2">
            {['ALL', 'INFO', 'SECURITY', 'WARN', 'ERROR'].map((lvl) => (
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

        {/* Live Terminal Stream */}
        <div className="p-6">
          <TerminalStream filterLevel={filterLevel} />
        </div>
      </div>

      {/* Stats row below terminal */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
        {[
          { label: 'Events Today',      value: '1,247', color: 'text-green-600' },
          { label: 'Security Events',   value: '18',    color: 'text-signal' },
          { label: 'Warnings',          value: '43',    color: 'text-yellow-500' },
          { label: 'Errors',            value: '2',     color: 'text-signal' },
        ].map((s) => (
          <div key={s.label} className="border-3 border-ink bg-white p-4 shadow-[3px_3px_0_0_#0A0A0A]">
            <span className="text-[10px] text-concrete uppercase block mb-1">{s.label}</span>
            <span className={`text-xl font-bold font-display ${s.color}`}>{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
