import { useEffect, useState } from 'react';

const STEPS = [
  { id: 'connect',   label: 'Connect Repository',     detail: 'OAuth handshake & clone',         icon: '🔗' },
  { id: 'analyze',   label: 'Analyze Codebase',        detail: 'AST parsing & dependency graph',  icon: '🔬' },
  { id: 'transform', label: 'LLM Transformation',      detail: 'Chunk → translate → stitch',      icon: '⚡' },
  { id: 'verify',    label: 'Equivalence Verification', detail: 'Run 1,024 behavioral test cases', icon: '✅' },
  { id: 'bundle',    label: 'Bundle & Export',          detail: 'Compile, lint, package bundle',   icon: '📦' },
];

const STEP_DURATION = 1800; // ms per step

export default function JobProgressTimeline({ running = false, onComplete, className = '' }) {
  const [currentStep, setCurrentStep] = useState(-1);
  const [stepTime, setStepTime] = useState({}); // step id -> elapsed seconds

  useEffect(() => {
    if (!running) { setCurrentStep(-1); setStepTime({}); return; }

    let step = 0;
    setCurrentStep(0);

    const advance = () => {
      step++;
      if (step >= STEPS.length) {
        setCurrentStep(STEPS.length); // all done
        onComplete?.();
        return;
      }
      setCurrentStep(step);
    };

    const interval = setInterval(advance, STEP_DURATION);
    return () => clearInterval(interval);
  }, [running]);

  // Per-step elapsed timer
  useEffect(() => {
    if (currentStep < 0 || currentStep >= STEPS.length) return;
    const stepId = STEPS[currentStep]?.id;
    let elapsed = 0;
    const t = setInterval(() => {
      elapsed++;
      setStepTime((prev) => ({ ...prev, [stepId]: elapsed }));
    }, 1000);
    return () => clearInterval(t);
  }, [currentStep]);

  if (!running && currentStep < 0) return null;

  const isDone = currentStep >= STEPS.length;

  return (
    <div className={`border-3 border-ink bg-white shadow-[6px_6px_0_0_#0A0A0A] p-6 space-y-4 animate-fade-slide-in ${className}`}>
      <div className="flex items-center justify-between font-mono text-xs border-b-2 border-ink pb-3">
        <span className="font-bold uppercase text-ink flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${isDone ? 'bg-green-500' : 'bg-signal animate-pulse'}`} />
          {isDone ? 'PIPELINE_COMPLETE' : 'PIPELINE_RUNNING'}
        </span>
        {isDone && (
          <span className="text-green-600 font-bold">✓ All steps completed</span>
        )}
      </div>

      <div className="space-y-1">
        {STEPS.map((step, i) => {
          const state =
            isDone || i < currentStep ? 'done' :
            i === currentStep ? 'active' :
            'pending';

          return (
            <div key={step.id} className="flex items-center gap-4 py-2">
              {/* Step icon / status */}
              <div className={`w-8 h-8 border-2 flex items-center justify-center text-sm font-mono font-bold shrink-0 transition-all duration-300 ${
                state === 'done'   ? 'bg-green-500 border-green-600 text-white' :
                state === 'active' ? 'bg-signal border-signal text-white animate-pulse' :
                'bg-paper border-ink/30 text-concrete'
              }`}>
                {state === 'done' ? '✓' : state === 'active' ? '⟳' : step.icon}
              </div>

              {/* Step info */}
              <div className="flex-1 font-mono min-w-0">
                <div className={`text-xs font-bold uppercase transition-colors ${
                  state === 'done'   ? 'text-green-600' :
                  state === 'active' ? 'text-ink' :
                  'text-concrete'
                }`}>
                  {step.label}
                </div>
                <div className="text-[10px] text-concrete truncate">{step.detail}</div>
              </div>

              {/* Timing */}
              <div className="shrink-0 font-mono text-[10px] text-right">
                {state === 'done' && (
                  <span className="text-green-600 font-bold">
                    {stepTime[step.id] ? `${stepTime[step.id]}s` : '< 1s'}
                  </span>
                )}
                {state === 'active' && (
                  <span className="text-signal font-bold">
                    {stepTime[step.id] ? `${stepTime[step.id]}s` : '0s'}…
                  </span>
                )}
                {state === 'pending' && (
                  <span className="text-concrete">—</span>
                )}
              </div>

              {/* Connector line */}
              {i < STEPS.length - 1 && (
                <div className="absolute left-[3.35rem] w-0.5 h-4 mt-8 bg-ink/10" />
              )}
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="mt-4">
        <div className="w-full h-2 bg-paper border border-ink overflow-hidden">
          <div
            className="h-full bg-signal transition-all duration-700 ease-out"
            style={{ width: `${isDone ? 100 : (currentStep / STEPS.length) * 100}%` }}
          />
        </div>
        <div className="flex justify-between font-mono text-[10px] text-concrete mt-1">
          <span>{isDone ? '100' : Math.round((currentStep / STEPS.length) * 100)}% complete</span>
          <span>Est. {Math.max(0, (STEPS.length - currentStep) * (STEP_DURATION / 1000))}s remaining</span>
        </div>
      </div>
    </div>
  );
}
