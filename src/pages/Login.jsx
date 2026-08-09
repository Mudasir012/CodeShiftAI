import { useState } from 'react';

export default function Login() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      <section className="max-w-7xl mx-auto px-5 py-14 pb-10">
        <span className="font-mono font-bold text-xs text-concrete mb-4 block flex items-center">
          # ACCESS_PORTAL
        </span>
        <h1 className="text-[clamp(1.8rem,4vw,3.5rem)] font-bold -tracking-[0.05em] leading-[0.9] mb-4 uppercase">
          Log in to
          <br />
          <span className="text-signal">your dashboard.</span>
        </h1>
      </section>

      <div className="h-1 bg-ink w-full" />
      //
      <section className="max-w-3xl mx-auto px-5 py-10 pb-14">
        {submitted ? (
          <div className="border-3 border-signal bg-ink text-paper shadow-[5px_5px_0_0_#FF2D00] p-6 font-mono">
            <div className="flex items-center gap-2 border-b-3 border-paper/15 pb-3 mb-4">
              <span className="w-2.5 h-2.5 bg-signal" />
              <span className="text-xs uppercase tracking-[0.08em] text-paper/60">Session initiated</span>
            </div>
            <div className="min-h-[80px]">
              <p className="text-signal text-xs mb-2">$ auth: OK</p>
              <p className="text-paper/80 text-xs mb-2">&gt; Credentials accepted. Redirecting to dashboard...</p>
              <p className="text-paper/30 text-[10px]">&gt; This is a static demo — no real session is created.</p>
            </div>
          </div>
        ) : (
          <div className="border-3 border-ink bg-white p-6 shadow-[4px_4px_0_0_#0A0A0A]">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-1.5">
                <label className="font-display font-bold text-xs tracking-[0.02em]" htmlFor="email">Email</label>
                <input className="font-mono text-sm px-3 py-3 border-3 border-ink bg-paper transition-all duration-150 focus:outline-none focus:border-signal focus:shadow-[3px_3px_0_0_#FF2D00]" id="email" type="email" required placeholder="you@company.com" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-display font-bold text-xs tracking-[0.02em]" htmlFor="password">Password</label>
                <input className="font-mono text-sm px-3 py-3 border-3 border-ink bg-paper transition-all duration-150 focus:outline-none focus:border-signal focus:shadow-[3px_3px_0_0_#FF2D00]" id="password" type="password" required placeholder="••••••••" />
              </div>
              <div className="flex items-center justify-between gap-3 font-mono text-xs text-concrete">
                <label className="flex items-center gap-2 hover:text-ink transition-colors duration-150">
                  <input type="checkbox" className="w-3.5 h-3.5 border-2 border-ink bg-paper accent-signal" />
                  Remember me
                </label>
                <a href="#" className="hover:text-signal transition-colors duration-150 underline underline-offset-2 decoration-1">
                  Forgot password?
                </a>
              </div>
              <button type="submit" className="inline-flex items-center justify-center gap-2 font-display font-bold text-xs uppercase tracking-[0.06em] px-5 py-3 border-3 border-ink bg-ink text-paper transition-all duration-150 hover:bg-signal hover:border-signal hover:text-white hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_#0A0A0A] w-full">
                LOG IN
                <span>→</span>
              </button>
            </form>
          </div>
        )}
      </section>

      <div className="h-1 bg-ink w-full" />
    </div>
  );
}
