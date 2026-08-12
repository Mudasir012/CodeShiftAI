import { useEffect, useState } from 'react';

const STEPS = [
  {
    target: null, // No target - full screen intro
    title: '👋 Welcome to CodeShiftAI',
    body: 'Your AI-powered code modernization platform. Let\'s take a quick tour of the workspace.',
    position: 'center',
  },
  {
    targetId: 'nav-new-job',
    title: '⚡ Launch a Pipeline',
    body: 'Click here to connect a GitHub or GitLab repo and start a new code transformation job.',
    position: 'bottom',
  },
  {
    targetId: 'nav-jobs',
    title: '🔬 Inspect Jobs',
    body: 'View all active and completed transformation jobs. Inspect diffs line-by-line.',
    position: 'bottom',
  },
  {
    targetId: 'nav-audit',
    title: '>_ Audit Logs',
    body: 'Real-time terminal stream showing AST parsing, LLM inference, and security events.',
    position: 'bottom',
  },
  {
    targetId: 'quick-connect-btn',
    title: '+ Quick Connect',
    body: 'The floating button on the bottom-left lets you instantly connect any repo without navigating.',
    position: 'top',
  },
  {
    target: null,
    title: '🚀 You\'re all set!',
    body: 'ShiftBot is ready. Start by launching a pipeline or connecting a repository.',
    position: 'center',
    final: true,
  },
];

const STORAGE_KEY = 'csa-tour-done';

export default function OnboardingTour() {
  const [step, setStep] = useState(-1); // -1 = not started
  const [targetRect, setTargetRect] = useState(null);

  // Start on first visit
  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      const t = setTimeout(() => setStep(0), 800);
      return () => clearTimeout(t);
    }
  }, []);

  useEffect(() => {
    if (step < 0) return;
    const current = STEPS[step];

    const measure = () => {
      if (!current?.targetId) {
        setTargetRect(null);
        return;
      }
      const el = document.getElementById(current.targetId);
      setTargetRect(el ? el.getBoundingClientRect() : null);
    };

    const el = current?.targetId ? document.getElementById(current.targetId) : null;
    if (el) el.scrollIntoView({ block: 'center', behavior: 'smooth' });

    const settle = setTimeout(measure, el ? 450 : 0);
    window.addEventListener('resize', measure);
    window.addEventListener('scroll', measure, { passive: true });

    return () => {
      clearTimeout(settle);
      window.removeEventListener('resize', measure);
      window.removeEventListener('scroll', measure);
    };
  }, [step]);

  const next = () => {
    if (step >= STEPS.length - 1) {
      finish();
    } else {
      setStep((s) => s + 1);
    }
  };

  const finish = () => {
    localStorage.setItem(STORAGE_KEY, '1');
    setStep(-1);
  };

  if (step < 0 || step >= STEPS.length) return null;

  const current = STEPS[step];
  const isCenter = current.position === 'center';
  const showCentered = isCenter || !targetRect;

  return (
    <>
      {/* Dark overlay */}
      <div
        className="fixed inset-0 z-[90] pointer-events-none"
        style={{ background: 'rgba(10,10,10,0.55)' }}
      />

      {/* Spotlight ring around target element */}
      {targetRect && (
        <div
          className="fixed z-[91] pointer-events-none border-2 border-signal animate-pulse rounded-sm"
          style={{
            left: targetRect.left - 6,
            top:  targetRect.top - 6,
            width:  targetRect.width + 12,
            height: targetRect.height + 12,
            boxShadow: '0 0 0 4px rgba(255,45,0,0.3), 0 0 32px rgba(255,45,0,0.2)',
          }}
        />
      )}

      {/* Tooltip box */}
      <div
        className={`fixed z-[92] w-80 ${showCentered ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' : ''}`}
        style={
          !showCentered && targetRect
            ? {
                left: Math.min(Math.max(targetRect.left, 12), window.innerWidth - 332),
                top: current.position === 'bottom'
                  ? targetRect.bottom + 16
                  : Math.max(targetRect.top - 180, 12),
              }
            : {}
        }
      >
        <div className="border-3 border-ink bg-white shadow-[6px_6px_0_0_#FF2D00] p-5 animate-fade-slide-in">
          {/* Progress dots */}
          <div className="flex gap-1 mb-3">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === step ? 'w-4 bg-signal' : i < step ? 'w-1.5 bg-ink/30' : 'w-1.5 bg-ink/10'
                }`}
              />
            ))}
          </div>

          <h3 className="font-display font-bold text-ink text-base mb-2">{current.title}</h3>
          <p className="font-mono text-xs text-concrete leading-relaxed mb-4">{current.body}</p>

          <div className="flex items-center justify-between">
            <button
              onClick={finish}
              className="font-mono text-[10px] text-concrete hover:text-signal uppercase"
            >
              Skip tour
            </button>
            <button
              onClick={next}
              className="px-4 py-2 border-2 border-ink bg-ink text-paper font-mono text-xs font-bold uppercase hover:bg-signal hover:border-signal transition-colors"
            >
              {current.final ? 'Get Started →' : 'Next →'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
