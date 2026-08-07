import { useState, useEffect, useRef } from 'react';
import ScrambleText from './ScrambleText';

const STEPS = [
  {
    num: '01',
    title: 'Analyze',
    desc: 'We scan every file, map every dependency, assess complexity across your entire codebase. No blind spots, no surprises.',
    sub: 'Input: legacy codebase → Output: dependency graph + complexity report',
  },
  {
    num: '02',
    title: 'Translate',
    desc: 'Four specialized LLMs work in parallel — each handling different language pairs and paradigms. Output is cross-validated in real time.',
    sub: 'COBOL → Rust / Fortran → Go / VB6 → Python / PHP → TypeScript',
  },
  {
    num: '03',
    title: 'Verify',
    desc: "Every translated module is compiled, linted, and tested against your existing test suite. If tests don't pass, the translation doesn't ship.",
    sub: 'Zero false positives. Zero regressions. Guaranteed parity.',
  },
  {
    num: '04',
    title: 'Deploy',
    desc: 'Drop-in replacement with identical API contracts. Your team wakes up to a modern codebase — no migration project, no months of downtime.',
    sub: 'Same contracts. Same behavior. Modern foundations.',
  },
];

const STEP_LOGS = {
  '01': [
    { delay: 200, text: '$ codeshift analyze --recursive --report ./legacy' },
    { delay: 800, text: '|-- scanning 238K lines across 47 files...' },
    { delay: 1400, text: '|-- building dependency graph... 2,831 edges mapped' },
    { delay: 2000, text: '|-- complexity score: 3.2 / 5.0 (moderate)' },
    { delay: 2600, text: '>> ANALYZE COMPLETE — 0 errors, 100% coverage' },
  ],
  '02': [
    { delay: 200, text: '$ codeshift translate --parallel --llms=4 ./source ./target' },
    { delay: 800, text: '|-- LLM-1: COBOL -> Rust  |  LLM-2: Fortran -> Go' },
    { delay: 1400, text: '|-- LLM-3: VB6  -> Python |  LLM-4: PHP -> TypeScript' },
    { delay: 2000, text: '|-- cross-validating output across all 4 LLMs...' },
    { delay: 2600, text: '>> TRANSLATE COMPLETE — parity score: 99.8%' },
  ],
  '03': [
    { delay: 200, text: '$ codeshift verify --compile --lint --test ./output' },
    { delay: 800, text: '|-- compiling 156K lines across 34 modules...' },
    { delay: 1400, text: '|-- running 4,721 integration & regression tests...' },
    { delay: 2000, text: '|-- linting against 1,203 rules...' },
    { delay: 2600, text: '>> VERIFY COMPLETE — 0 failures, 0 warnings, 100% pass' },
  ],
  '04': [
    { delay: 200, text: '$ codeshift deploy --contract-identical --swap ./production' },
    { delay: 800, text: '|-- verifying API contract parity (2,147 endpoints)...' },
    { delay: 1400, text: '|-- swapping legacy binaries for modern equivalents...' },
    { delay: 2000, text: '|-- running smoke tests against live traffic...' },
    { delay: 2600, text: '>> DEPLOY COMPLETE — downtime: 0 min, rollbacks: 0' },
  ],
};

export default function ProcessSteps() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [started, setStarted] = useState(false);
  const [revealedCards, setRevealedCards] = useState(new Set());
  const [visibleLogs, setVisibleLogs] = useState(new Set());
  const sectionRef = useRef(null);

  // Intersection Observer to trigger on scroll
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          setActiveIndex(0);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  // Reveal step cards after a short delay
  useEffect(() => {
    if (!started || activeIndex < 0) return;
    if (activeIndex >= STEPS.length) return;

    const revealTimer = setTimeout(() => {
      setRevealedCards(prev => new Set(prev).add(STEPS[activeIndex].num));
    }, 300);

    const nextTimer = setTimeout(() => {
      setVisibleLogs(new Set());
      setActiveIndex(prev => prev + 1);
    }, 3200);

    return () => {
      clearTimeout(revealTimer);
      clearTimeout(nextTimer);
    };
  }, [started, activeIndex]);

  // Reveal log lines for the active step
  useEffect(() => {
    if (!started || activeIndex < 0 || activeIndex >= STEPS.length) return;

    const stepNum = STEPS[activeIndex].num;
    const logs = STEP_LOGS[stepNum];
    if (!logs) return;

    const timers = logs.map(({ delay }) => {
      return setTimeout(() => {
        setVisibleLogs(prev => new Set(prev).add(stepNum));
      }, delay);
    });

    return () => timers.forEach(clearTimeout);
  }, [started, activeIndex]);

  const getStepState = (num) => {
    const index = STEPS.findIndex(s => s.num === num);
    if (index < activeIndex) return 'complete';
    if (index === activeIndex) return 'running';
    return 'waiting';
  };

  return (
    <section ref={sectionRef} className="max-w-7xl mx-auto px-5 py-14" id="how-it-works">
      {/* Header */}
      <div className="mb-8 border-b-3 border-ink pb-6">
        <span className="font-mono font-bold text-xs text-concrete mb-3 block">
          // PIPELINE
        </span>
        <h2 className="text-[clamp(1.5rem,3.5vw,3rem)] font-bold -tracking-[0.04em] mb-3 uppercase">
          How the translation pipeline works
        </h2>
        <p className="text-concrete text-base max-w-[460px] font-mono">
          Four stages. No rewrites. No downtime. Nobody learns COBOL.
        </p>

        {/* Progress bar */}
        <div className="mt-5 flex items-center gap-2">
          <span className="font-mono text-[10px] text-concrete uppercase tracking-[0.08em] shrink-0">
            PROGRESS
          </span>
          <div className="flex-1 h-2.5 bg-paper border-2 border-ink">
            <div
              className="h-full bg-signal transition-all duration-700 ease-out"
              style={{ width: `${Math.max(activeIndex / STEPS.length * 100, activeIndex < 0 ? 0 : activeIndex >= STEPS.length ? 100 : 2)}%` }}
            />
          </div>
          <span className="font-mono text-[10px] text-signal font-bold w-10 text-right tabular-nums">
            {Math.round(Math.max(activeIndex / STEPS.length * 100, activeIndex < 0 ? 0 : activeIndex >= STEPS.length ? 100 : 0))}%
          </span>
        </div>
      </div>

      {/* Terminal log window */}
      <div className="mb-6 border-3 border-ink shadow-[4px_4px_0_0_#0A0A0A] overflow-hidden">
        <div className="px-3 py-1.5 border-b-3 border-ink bg-ink text-paper flex items-center gap-2 font-mono text-[10px]">
          <span className={`w-2.5 h-2.5 ${activeIndex >= 0 && activeIndex < STEPS.length ? 'bg-signal' : 'bg-concrete'}`} />
          <span className={`w-2.5 h-2.5 ${activeIndex >= 1 && activeIndex <= STEPS.length ? 'bg-signal' : 'bg-concrete'}`} />
          <span className={`w-2.5 h-2.5 ${activeIndex >= 2 ? 'bg-signal' : 'bg-concrete'}`} />
          <span className="ml-auto text-paper/50 uppercase tracking-[0.06em]">
            pipeline_execution.log
          </span>
        </div>
        <div className="bg-ink text-paper font-mono text-[10px] leading-relaxed p-3 min-h-[100px]">
          {activeIndex < 0 && (
            <span className="text-paper/30 italic">Awaiting scroll to execute pipeline...</span>
          )}
          {activeIndex >= 0 && activeIndex < STEPS.length && STEP_LOGS[STEPS[activeIndex].num]?.map((line, i) => (
            <div
              key={i}
              className={`transition-opacity duration-300 py-0.5 ${visibleLogs.has(STEPS[activeIndex].num) || i === 0 ? 'opacity-100' : 'opacity-0'}`}
            >
              <span className="text-paper/30 mr-2">[{String((i + 1) * 2).padStart(3, '0')}ms]</span>
              <span className={
                line.text.startsWith('>>') ? 'text-signal font-bold' :
                line.text.startsWith('$') ? 'text-hyper' :
                'text-paper/60'
              }>
                {line.text}
              </span>
            </div>
          ))}
          {activeIndex >= STEPS.length && (
            <div className="text-signal font-bold space-y-1">
              <div><span className="text-paper/30 mr-2">[9999ms]</span> {'>>'} ALL STAGES COMPLETE</div>
              <div><span className="text-paper/30 mr-2">[OK]</span> Pipeline finished. 4/4 steps passed. 0 failures.</div>
              <div><span className="text-paper/30 mr-2">[OK]</span> Ready for production deployment.</div>
            </div>
          )}
        </div>
      </div>

      {/* Step detail cards */}
      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-3">
        {STEPS.map((step) => {
          const state = getStepState(step.num);
          const isRevealed = revealedCards.has(step.num);

          return (
            <div
              key={step.num}
              className={`border-3 p-4 flex flex-col gap-3 transition-all duration-500 ${
                state === 'running'
                  ? 'border-signal bg-white shadow-[3px_3px_0_0_#FF2D00] scale-[1.02]'
                  : state === 'complete'
                  ? 'border-ink bg-white'
                  : 'border-concrete/20 opacity-30 bg-white'
              }`}
            >
              {/* Step number + status */}
              <div className="flex items-center gap-2">
                <span className={`font-display font-bold text-3xl leading-none -tracking-[0.04em] transition-colors duration-500 ${
                  state === 'running' || state === 'complete' ? 'text-signal' : 'text-concrete/30'
                }`}>
                  {state === 'running' && !isRevealed ? (
                    <span className="inline-block text-concrete/50">--</span>
                  ) : state === 'running' ? (
                    <ScrambleText text={step.num} className="text-signal" />
                  ) : (
                    step.num
                  )}
                </span>
                <div className="flex flex-col gap-0.5">
                  {state === 'running' && (
                    <span className="text-[10px] font-mono text-signal font-bold uppercase tracking-[0.08em] flex items-center gap-1">
                      EXECUTING
                    </span>
                  )}
                  {state === 'complete' && (
                    <span className="text-[10px] font-mono text-concrete uppercase tracking-[0.08em] flex items-center gap-1">
                      &#10003; COMPLETE
                    </span>
                  )}
                </div>
              </div>

              {/* Content - revealed with animation */}
              <div className={`transition-all duration-500 ${
                (state === 'waiting' && !isRevealed) ? 'opacity-0 max-h-0 overflow-hidden' : 'opacity-100'
              }`}>
                <h3 className="text-lg font-semibold -tracking-[0.02em] font-display mb-2">{step.title}</h3>
                <p className="text-concrete leading-relaxed text-xs font-mono mb-2">{step.desc}</p>
                <span className="font-mono text-[10px] text-concrete tracking-[0.03em] block border-t-3 border-ink pt-2">
                  {step.sub}
                </span>
              </div>

              {/* Placeholder when waiting */}
              {(state === 'waiting' && !isRevealed) && (
                <div className="flex-1 flex items-center justify-center py-3">
                  <span className="font-mono text-[10px] text-concrete/20 uppercase tracking-[0.08em]">
                    awaiting execution...
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Pipeline complete banner */}
      {started && activeIndex >= STEPS.length && (
        <div className="mt-6 border-3 border-ink bg-ink text-paper p-4 flex items-center gap-4 shadow-[4px_4px_0_0_#0A0A0A]">
          <pre className="font-mono text-[9px] leading-[1.15] text-paper/40 select-none" aria-hidden="true">
{`  OK   OK   OK   OK
 / \\  / \\  / \\  / \\
01-- 02-- 03-- 04--`}</pre>
          <div>
            <span className="font-mono text-xs text-signal font-bold block">
              PIPELINE EXECUTION COMPLETE
            </span>
            <span className="font-mono text-[10px] text-paper/50">
              4/4 stages passed — 0 errors — ready for production
            </span>
          </div>
          <span className="ml-auto font-mono text-[10px] text-paper/30">
            [{new Date().toLocaleTimeString('en-US', { hour12: false })}]
          </span>
        </div>
      )}
    </section>
  );
}
