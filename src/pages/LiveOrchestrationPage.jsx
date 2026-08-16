import { useEffect, useReducer, useRef, useState } from 'react';
import Mascot from '../components/Mascot';

const WORKER_META = {
  'LLM-1': { name: 'ARCHITECT', role: 'Dependency mapping · AST planning · Complexity scoring', accent: '#0033FF', tag: 'HYPER' },
  'LLM-2': { name: 'TRANSLATOR', role: 'COBOL→Rust · VB6→Python · Fortran→Go', accent: '#AA44FF', tag: 'SYNTH' },
  'LLM-3': { name: 'VERIFIER', role: 'Compile · Lint · Behavioral equivalence tests', accent: '#00AA44', tag: 'PARITY' },
};

const ORCH_META = { name: 'ORCHESTRATOR', role: 'Director — plans tasks, assigns workers, resolves conflicts' };

const DIRECTIVE_POOL = {
  'LLM-1': [
    'Re-parse AP_REPORT.cbl — dependency graph is stale',
    'Map 4,120 COBOL AST nodes into typed Rust skeletons',
    'Recompute complexity score after file split',
    'Build module manifest for acme-corp/legacy-cobol-core',
  ],
  'LLM-2': [
    'Translate payroll.vb → payroll.py with parity mode ON',
    'Convert inventory.f → inventory.go, preserve fixed-point math',
    'Transpile main.cob → main.rs keeping GO TO semantics',
    'Rewrite report.php → api.ts with strict typing',
  ],
  'LLM-3': [
    'Run equivalence suite on rust-bundle-9422 — 1,024 cases',
    'Lint output against 1,203 rules and fix findings',
    'Compile Go bundle and run integration tests',
    'Verify behavioral parity — target 99.8%',
  ],
};

const ACTIVITY_POOL = {
  'LLM-1': ['Mapping dependency edges...', 'Resolving imports...', 'Classifying subsystems...', 'Extracting business rules...'],
  'LLM-2': ['Translating statement blocks...', 'Preserving comments...', 'Aligning type system...', 'Normalizing control flow...'],
  'LLM-3': ['Compiling module...', 'Running test suite...', 'Linting against rules...', 'Comparing AST output...'],
};

const PICK = (arr) => arr[Math.floor(Math.random() * arr.length)];

let uid = 0;
const ev = () => `EV-${++uid}`;

const nowClock = () => new Date().toLocaleTimeString('en-US', { hour12: false });

const bootFeed = [
  { id: 'EV-0', ts: nowClock(), kind: 'SYS', msg: 'orchestration.sim v1.0 — stream initialized' },
  { id: 'EV-1', ts: nowClock(), kind: 'SYS', msg: 'LLM-4 ORCHESTRATOR online — 3 worker agents registered' },
];

const makeWorker = (id) => ({
  ...WORKER_META[id],
  id,
  status: 'READY',
  task: null,
  progress: 0,
  logs: [],
});

const initialState = {
  mode: 'AUTO',
  counts: { directives: 0, done: 0, overrides: 0 },
  orchestrator: {
    ...ORCH_META,
    status: 'DIRECTING',
    log: ['Boot: strategy table loaded', 'Standing by for job JOB-9422'],
  },
  workers: {
    'LLM-1': makeWorker('LLM-1'),
    'LLM-2': makeWorker('LLM-2'),
    'LLM-3': makeWorker('LLM-3'),
  },
  pending: null,
  feed: bootFeed,
};

const pushLog = (logs, msg) => [{ ts: nowClock(), msg }, ...logs].slice(0, 6);

const reducer = (state, action) => {
  switch (action.type) {
    case 'TAKEOVER': {
      const feed = [{ id: ev(), ts: nowClock(), kind: 'HUMAN', msg: '⚠ HUMAN CONTROL ENGAGED — automation paused' }, ...state.feed].slice(0, 40);
      const orchestrator = { ...state.orchestrator, status: 'PAUSED', log: pushLog(state.orchestrator.log, 'Auto-dispatch disabled — awaiting human instruction') };
      const workers = {};
      for (const id of Object.keys(state.workers)) {
        const w = state.workers[id];
        workers[id] = w.status === 'WORKING'
          ? { ...w, logs: pushLog(w.logs, `✋ Paused at ${Math.round(w.progress)}% — human supervising`) }
          : w;
      }
      return { ...state, mode: 'TAKEOVER', feed, orchestrator, workers, pending: null };
    }

    case 'RESUME': {
      const feed = [{ id: ev(), ts: nowClock(), kind: 'HUMAN', msg: '↩ Control returned to LLM-4 — autonomous mode resumed' }, ...state.feed].slice(0, 40);
      const orchestrator = { ...state.orchestrator, status: 'DIRECTING', log: pushLog(state.orchestrator.log, 'Auto-dispatch re-enabled — strategy table reloaded') };
      return { ...state, mode: 'AUTO', feed, orchestrator, pending: null };
    }

    case 'APPROVE': {
      const p = state.pending;
      if (!p) return state;
      const target = state.workers[p.to];
      const workers = {
        ...state.workers,
        [p.to]: {
          ...target,
          status: 'WORKING',
          task: p.text,
          progress: 5 + Math.random() * 10,
          logs: pushLog(target.logs, `✓ Approved — starting: ${p.text}`),
        },
      };
      const feed = [{ id: ev(), ts: nowClock(), kind: 'HUMAN', msg: `✓ Directive approved → ${p.to}: ${p.text}`, target: p.to }, ...state.feed].slice(0, 40);
      const orchestrator = { ...state.orchestrator, status: 'PAUSED', log: pushLog(state.orchestrator.log, `Approved — ${p.to} executing`) };
      return { ...state, workers, feed, orchestrator, pending: null, counts: { ...state.counts, directives: state.counts.directives + 1, overrides: state.counts.overrides + 1 } };
    }

    case 'COMMAND': {
      const targets = action.target === 'ALL' ? Object.keys(state.workers) : [action.target];
      const workers = { ...state.workers };
      for (const id of targets) {
        const w = workers[id];
        workers[id] = {
          ...w,
          status: 'WORKING',
          task: action.text,
          progress: 5 + Math.random() * 10,
          logs: pushLog(w.logs, `Manual override — ${action.text}`),
        };
      }
      const feed = [{
        id: ev(), ts: nowClock(), kind: 'HUMAN',
        msg: `🖐 MANUAL DIRECTIVE → ${action.target}: ${action.text}`, target: action.target,
      }, ...state.feed].slice(0, 40);
      const orchestrator = { ...state.orchestrator, status: 'PAUSED', log: pushLog(state.orchestrator.log, `Manual directive broadcast to ${action.target}`) };
      return {
        ...state,
        mode: 'TAKEOVER',
        workers, feed, orchestrator, pending: null,
        counts: { ...state.counts, directives: state.counts.directives + 1, overrides: state.counts.overrides + 1 },
      };
    }

    case 'TICK': {
      const feed = [...state.feed];
      let orchestrator = { ...state.orchestrator };
      const workers = {};
      let pending = state.pending;
      let counts = state.counts;

      for (const id of Object.keys(state.workers)) {
        let w = state.workers[id];
        if (w.status === 'WORKING') {
          const inc = 16 + Math.random() * 24;
          const progress = Math.min(100, Math.round(w.progress + inc));
          w = { ...w, progress };
          if (Math.random() < 0.35) {
            w = { ...w, logs: pushLog(w.logs, `${PICK(ACTIVITY_POOL[id])} [${progress}%]`) };
          }
          if (progress >= 100) {
            const completedTask = w.task;
            w = { ...w, status: 'READY', task: null, progress: 0, logs: pushLog(w.logs, '✓ Completed assignment') };
            feed.unshift({ id: ev(), ts: nowClock(), kind: 'DONE', msg: `${id} DONE — ${completedTask}`, target: id });
            orchestrator = { ...orchestrator, log: pushLog(orchestrator.log, `${id} finished "${completedTask}" — verifying next step`) };
            counts = { ...counts, done: counts.done + 1 };

            if (state.mode === 'TAKEOVER') {
              const text = PICK(DIRECTIVE_POOL[id]);
              pending = { to: id, text };
              orchestrator = { ...orchestrator, status: 'AWAITING_APPROVAL', log: pushLog(orchestrator.log, `Suggestion queued → ${id}: ${text} — waiting for approval`) };
              feed.unshift({ id: ev(), ts: nowClock(), kind: 'ORCH', msg: `LLM-4 → ${id}: ${text} [AWAITING APPROVAL]`, target: id });
            } else {
              const text = PICK(DIRECTIVE_POOL[id]);
              w = { ...w, status: 'WORKING', task: text, progress: 4 + Math.random() * 10 };
              feed.unshift({ id: ev(), ts: nowClock(), kind: 'DIRECT', msg: `LLM-4 → ${id}: ${text}`, target: id });
              orchestrator = { ...orchestrator, log: pushLog(orchestrator.log, `Directing ${id}: ${text}`) };
              counts = { ...counts, directives: counts.directives + 1 };
            }
          }
        }
        workers[id] = w;
      }

      if (state.mode === 'AUTO' && !pending) {
        for (const id of Object.keys(workers)) {
          const w = workers[id];
          if (w.status === 'READY' && !w.task) {
            const text = PICK(DIRECTIVE_POOL[id]);
            workers[id] = { ...w, status: 'WORKING', task: text, progress: 4 + Math.random() * 10, logs: pushLog(w.logs, `Assigned: ${text}`) };
            feed.unshift({ id: ev(), ts: nowClock(), kind: 'DIRECT', msg: `LLM-4 → ${id}: ${text}`, target: id });
            orchestrator = { ...orchestrator, log: pushLog(orchestrator.log, `Directing ${id}: ${text}`) };
            counts = { ...counts, directives: counts.directives + 1 };
          }
        }
      }

      const anyWorking = Object.values(workers).some((w) => w.status === 'WORKING');
      if (state.mode === 'TAKEOVER') {
        orchestrator = { ...orchestrator, status: pending ? 'AWAITING_APPROVAL' : (anyWorking ? 'SUPERVISING' : 'PAUSED') };
      } else if (!anyWorking) {
        orchestrator = { ...orchestrator, status: 'IDLE' };
      } else {
        orchestrator = { ...orchestrator, status: 'DIRECTING' };
      }

      return { ...state, workers, feed: feed.slice(0, 40), orchestrator, pending, counts };
    }

    default:
      return state;
  }
};

const KIND_STYLES = {
  DIRECT: 'text-purple-400',
  ORCH: 'text-hyper',
  DONE: 'text-green-500',
  HUMAN: 'text-signal',
  SYS: 'text-paper/40',
};

const KIND_GLYPH = {
  DIRECT: '►',
  ORCH: '◆',
  DONE: '✓',
  HUMAN: '⚡',
  SYS: '·',
};

const STATUS_BADGE = {
  WORKING: 'bg-signal text-white animate-pulse',
  READY: 'bg-concrete/20 text-concrete',
  AWAITING_APPROVAL: 'bg-hyper text-white',
  PAUSED: 'bg-ink text-paper',
  SUPERVISING: 'bg-hyper text-white',
  DIRECTING: 'bg-green-500 text-white',
  IDLE: 'bg-concrete/20 text-concrete',
};

export default function LiveOrchestrationPage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [command, setCommand] = useState('');
  const [target, setTarget] = useState('ALL');
  const inputRef = useRef(null);

  useEffect(() => {
    const t = setInterval(() => dispatch({ type: 'TICK' }), 900);
    return () => clearInterval(t);
  }, []);

  const { mode, orchestrator, workers, pending, feed, counts } = state;

  const steer = (id) => {
    dispatch({ type: 'TAKEOVER' });
    setTarget(id);
    setTimeout(() => inputRef.current?.focus(), 60);
  };

  const submitCommand = (e) => {
    e.preventDefault();
    if (!command.trim()) return;
    dispatch({ type: 'COMMAND', target, text: command.trim() });
    setCommand('');
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 bg-paper">

      {/* HEADER */}
      <div className="border-3 border-ink bg-white p-5 sm:p-6 shadow-[6px_6px_0_0_#0A0A0A] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-signal font-bold uppercase tracking-wider">
            <span className={`w-2.5 h-2.5 inline-block ${mode === 'AUTO' ? 'bg-green-500 animate-pulse' : 'bg-signal'}`} />
            # LIVE_AGENT_ORCHESTRATION
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-ink">
            Multi-LLM Control Room
          </h1>
          <p className="font-mono text-xs text-concrete">
            Drive three worker LLMs from the control deck — watch everything unfold live in the preview.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className={`px-3 py-1.5 border-2 border-ink font-mono text-[11px] font-bold uppercase ${mode === 'AUTO' ? 'bg-green-500 text-white' : 'bg-signal text-white'}`}>
            {mode === 'AUTO' ? '● AUTONOMOUS' : '⚡ HUMAN CONTROL'}
          </span>
          <Mascot mode="dashboard" className="scale-75 -my-4 -mx-2" />
        </div>
      </div>

      {/* BENTO GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch">

        {/* ══ LEFT · CONTROL DECK ══ */}
        <div className="lg:col-span-5 flex flex-col gap-3">

          {/* LLM-4 orchestrator control */}
          <div className="border-3 border-ink bg-ink text-paper shadow-[6px_6px_0_0_#FF2D00] overflow-hidden">
            <div className="px-4 py-2.5 border-b-3 border-paper/20 flex items-center gap-2 font-mono text-[10px]">
              <span className="w-2.5 h-2.5 bg-signal animate-pulse" />
              <span className="font-bold uppercase tracking-[0.06em]">LLM-4 · ORCHESTRATOR</span>
              <span className="ml-auto text-paper/40">control_deck</span>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 border-2 border-signal bg-signal/10 flex items-center justify-center font-mono font-bold text-signal shrink-0">
                  4
                </div>
                <div className="min-w-0">
                  <span className="font-mono text-sm font-bold text-paper block">{orchestrator.name}</span>
                  <span className="font-mono text-[10px] text-paper/50 block">{orchestrator.role}</span>
                </div>
                <span className={`ml-auto px-2 py-1 font-mono text-[9px] font-bold uppercase border shrink-0 ${STATUS_BADGE[orchestrator.status]}`}>
                  {orchestrator.status}
                </span>
              </div>

              {/* Current / pending directive */}
              <div className="border-2 border-paper/20 bg-paper/5 p-3 font-mono text-xs">
                <span className="text-paper/40 text-[9px] uppercase tracking-[0.08em] block mb-1">// current_directive</span>
                {pending ? (
                  <>
                    <p className="text-paper leading-snug">
                      <span className="text-signal font-bold">{pending.to} {WORKER_META[pending.to]?.name}:</span>{' '}
                      "{pending.text}"
                    </p>
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => dispatch({ type: 'APPROVE' })}
                        className="px-3 py-1.5 border-2 border-ink bg-green-500 text-white font-mono text-[10px] font-bold uppercase hover:bg-paper hover:text-ink transition-colors"
                      >
                        ✓ Approve
                      </button>
                      <button
                        onClick={() => dispatch({ type: 'COMMAND', target: 'ALL', text: 'Hold — re-evaluate approach' })}
                        className="px-3 py-1.5 border-2 border-ink bg-paper text-ink font-mono text-[10px] font-bold uppercase hover:bg-signal hover:text-white transition-colors"
                      >
                        ✗ Reject
                      </button>
                    </div>
                  </>
                ) : (
                  <p className="text-paper/60">
                    {mode === 'TAKEOVER' ? 'Awaiting your instruction...' : 'Directing workers — no pending approval.'}
                  </p>
                )}
              </div>

              {/* Takeover / resume */}
              {mode === 'AUTO' ? (
                <button
                  onClick={() => dispatch({ type: 'TAKEOVER' })}
                  className="w-full inline-flex items-center justify-center gap-2 font-display font-bold text-xs uppercase tracking-[0.06em] px-5 py-3.5 border-3 border-ink bg-signal text-white shadow-[4px_4px_0_0_#0A0A0A] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                >
                  <span className="text-base leading-none">🛠</span> Take Control Now
                </button>
              ) : (
                <button
                  onClick={() => dispatch({ type: 'RESUME' })}
                  className="w-full inline-flex items-center justify-center gap-2 font-display font-bold text-xs uppercase tracking-[0.06em] px-5 py-3.5 border-3 border-paper bg-paper text-ink shadow-[4px_4px_0_0_#FF2D00] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                >
                  <span className="text-base leading-none">↩</span> Return Control to LLM-4
                </button>
              )}

              {/* Orchestrator log */}
              <div className="space-y-1 font-mono text-[10px]">
                <span className="text-paper/30 text-[9px] uppercase tracking-[0.08em] block">// orchestrator.log</span>
                {orchestrator.log.map((l, i) => (
                  <div key={i} className="flex gap-2 items-baseline">
                    <span className="text-paper/30 shrink-0 tabular-nums">{l.ts}</span>
                    <span className="text-green-400">{'>'}</span>
                    <span className="text-paper/70">{l.msg}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Worker overrides */}
          <div className="border-3 border-ink bg-white shadow-[6px_6px_0_0_#0A0A0A] p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono font-bold text-xs text-ink uppercase">// WORKER_OVERRIDES</span>
              <span className="font-mono text-[9px] text-concrete">tap to steer</span>
            </div>
            <div className="space-y-2">
              {Object.keys(workers).map((id) => {
                const w = workers[id];
                return (
                  <div key={id} className="border-2 border-ink bg-paper px-3 py-2.5 flex items-center gap-3">
                    <div
                      className="w-8 h-8 border-2 border-ink flex items-center justify-center font-mono font-bold text-white shrink-0"
                      style={{ background: w.accent }}
                    >
                      {id.replace('LLM-', '')}
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="font-mono text-[11px] font-bold text-ink block">{w.name}</span>
                      <span className="font-mono text-[9px] text-concrete block truncate">{w.task || 'idle — awaiting directive'}</span>
                    </div>
                    <span className={`px-1.5 py-0.5 font-mono text-[8px] font-bold uppercase shrink-0 ${STATUS_BADGE[w.status]}`}>
                      {w.status}
                    </span>
                    <button
                      onClick={() => steer(id)}
                      className="px-2 py-1 border-2 border-ink font-mono text-[9px] font-bold uppercase hover:bg-ink hover:text-paper transition-colors"
                    >
                      Steer
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Manual directive */}
          <div className="border-3 border-ink bg-white shadow-[6px_6px_0_0_#0A0A0A] p-4">
            <form onSubmit={submitCommand} className="space-y-2">
              <span className="font-mono font-bold text-xs text-ink uppercase block">// MANUAL_DIRECTIVE</span>
              <div className="grid grid-cols-4 gap-2">
                <select
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  className="col-span-1 px-2 py-2.5 border-2 border-ink bg-paper font-mono text-[10px] focus:outline-none focus:border-signal"
                >
                  <option value="ALL">ALL</option>
                  <option value="LLM-1">LLM-1</option>
                  <option value="LLM-2">LLM-2</option>
                  <option value="LLM-3">LLM-3</option>
                </select>
                <input
                  ref={inputRef}
                  type="text"
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  placeholder="e.g. Skip payday module, translate GL_REPORT first"
                  className="col-span-3 px-3 py-2.5 border-2 border-ink bg-paper font-mono text-[11px] focus:outline-none focus:border-signal placeholder:text-concrete/60"
                />
              </div>
              <button
                type="submit"
                disabled={!command.trim()}
                className="w-full py-2.5 border-2 border-ink bg-ink text-paper font-mono text-[11px] font-bold uppercase hover:bg-signal hover:border-signal transition-colors disabled:opacity-50"
              >
                {mode === 'AUTO' ? 'Engage Control & Broadcast →' : 'Broadcast Directive →'}
              </button>
            </form>
          </div>

          {/* Mini stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="border-3 border-ink bg-white p-3 shadow-[4px_4px_0_0_#0A0A0A]">
              <span className="font-display text-xl font-bold text-ink block tabular-nums">{counts.directives}</span>
              <span className="font-mono text-[9px] text-concrete uppercase block">Directives</span>
            </div>
            <div className="border-3 border-ink bg-white p-3 shadow-[4px_4px_0_0_#0A0A0A]">
              <span className="font-display text-xl font-bold text-green-600 block tabular-nums">{counts.done}</span>
              <span className="font-mono text-[9px] text-concrete uppercase block">Completed</span>
            </div>
            <div className="border-3 border-ink bg-white p-3 shadow-[4px_4px_0_0_#0A0A0A]">
              <span className="font-display text-xl font-bold text-signal block tabular-nums">{counts.overrides}</span>
              <span className="font-mono text-[9px] text-concrete uppercase block">Overrides</span>
            </div>
          </div>
        </div>

        {/* ══ RIGHT · LIVE PREVIEW ══ */}
        <div className="lg:col-span-7 flex flex-col gap-3">

          {/* Worker live activity */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {Object.keys(workers).map((id) => {
              const w = workers[id];
              return (
                <div key={id} className={`border-3 border-ink bg-white shadow-[4px_4px_0_0_${w.accent}] p-4 flex flex-col gap-2.5`}>
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-9 h-9 border-2 border-ink flex items-center justify-center font-mono font-bold text-white shrink-0"
                      style={{ background: w.accent }}
                    >
                      {id.replace('LLM-', '')}
                    </div>
                    <div className="min-w-0">
                      <span className="font-display font-bold text-ink uppercase block leading-tight text-sm">{w.name}</span>
                      <span className="font-mono text-[8px] text-concrete block">{id} · {w.tag}</span>
                    </div>
                    <span className={`ml-auto px-1.5 py-0.5 font-mono text-[8px] font-bold uppercase shrink-0 ${STATUS_BADGE[w.status]}`}>
                      {w.status}
                    </span>
                  </div>

                  <p className="font-mono text-[10px] text-ink leading-snug min-h-[30px]">
                    {w.task || <span className="text-concrete/50 italic">awaiting assignment...</span>}
                  </p>

                  {w.status === 'WORKING' && (
                    <div>
                      <div className="h-2.5 bg-paper border-2 border-ink overflow-hidden">
                        <div
                          className="h-full transition-all duration-700"
                          style={{ width: `${w.progress}%`, background: w.accent }}
                        />
                      </div>
                      <span className="font-mono text-[9px] font-bold text-ink tabular-nums mt-1 block">
                        {Math.round(w.progress)}% complete
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Live event stream */}
          <div className="border-3 border-ink bg-ink text-paper shadow-[6px_6px_0_0_#0A0A0A] overflow-hidden flex-1 flex flex-col">
            <div className="px-4 py-2.5 border-b-3 border-paper/20 flex items-center gap-2 font-mono text-[10px]">
              <span className="w-2.5 h-2.5 bg-green-500 animate-pulse" />
              <span className="font-bold uppercase tracking-[0.06em]">LIVE_PREVIEW · COMMAND_BUS</span>
              <span className="ml-auto text-paper/40">stream.log</span>
            </div>
            <div className="p-4 space-y-1.5 font-mono text-xs max-h-[430px] overflow-y-auto terminal-scroll flex-1">
              {feed.map((e) => (
                <div key={e.id} className="flex items-start gap-2 animate-activity-in">
                  <span className="text-paper/30 shrink-0 tabular-nums text-[10px]">{e.ts}</span>
                  <span className={`font-bold shrink-0 ${KIND_STYLES[e.kind]}`}>{KIND_GLYPH[e.kind]}</span>
                  <span className="text-paper/80">{e.msg}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
