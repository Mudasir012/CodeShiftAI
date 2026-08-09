import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Mascot from '../components/Mascot';

export default function Login() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'signup'
  const [isCoveringEyes, setIsCoveringEyes] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    org: '',
    agreeTerms: false,
  });

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="w-full min-h-[calc(100vh-140px)] flex flex-col justify-center py-6 px-4 sm:px-6 lg:px-8 bg-paper">
      <div className="max-w-7xl w-full mx-auto border-3 border-ink bg-white shadow-[8px_8px_0_0_#0A0A0A] overflow-hidden grid grid-cols-1 lg:grid-cols-2 min-h-[640px]">
        
        {/* LEFT COLUMN: Brutalist Hero Graphic & Interactive Mascot */}
        <div className="relative bg-ink text-paper p-8 lg:p-12 flex flex-col justify-between overflow-hidden border-b-3 lg:border-b-0 lg:border-r-3 border-ink group">
          {/* Background Hero Image with Subtle Brutalist Blend & Grid */}
          <div className="absolute inset-0 z-0 opacity-20 mix-blend-luminosity bg-cover bg-center transition-opacity duration-500 hover:opacity-30"
            style={{ backgroundImage: `url('/assets/brutalist-hero.jpg')` }}
          />
          {/* Grid lines overlay */}
          <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px]" />

          {/* Top Panel Bar */}
          <div className="relative z-10 flex items-center justify-between font-mono text-xs text-concrete border-b-2 border-paper/20 pb-4">
            <span className="flex items-center gap-2 text-signal font-bold tracking-wider">
              <span className="w-2.5 h-2.5 bg-signal inline-block animate-pulse" />
              # PORTAL_AUTH_V2
            </span>
            <span className="px-2 py-0.5 border border-paper/30 bg-ink/80 text-[10px] uppercase font-mono">
              SYSTEM: ONLINE
            </span>
          </div>

          {/* Center Content: Interactive Mascot & Headline */}
          <div className="relative z-10 my-8 flex flex-col items-center text-center">
            <Mascot isCoveringEyes={isCoveringEyes} className="mb-6" />
            
            <h2 className="text-[clamp(1.8rem,3vw,2.8rem)] font-display font-bold uppercase leading-none tracking-tight text-paper mb-3">
              Modernize <br />
              <span className="text-signal underline decoration-signal decoration-4 underline-offset-4">Legacy Code</span>
            </h2>
            <p className="font-mono text-xs text-concrete max-w-sm">
              Convert COBOL, Fortran &amp; VB6 into production-ready Go &amp; TypeScript using multi-LLM architecture.
            </p>
          </div>

          {/* Bottom Live System Metrics */}
          <div className="relative z-10 font-mono text-[11px] bg-paper/10 border-2 border-paper/20 p-3 backdrop-blur-sm">
            <div className="flex justify-between items-center text-paper/80 mb-1">
              <span>&gt; ENGINE_STATUS:</span>
              <span className="text-signal font-bold">READY</span>
            </div>
            <div className="flex justify-between items-center text-paper/50 text-[10px]">
              <span>&gt; PARSER_LATENCY:</span>
              <span>12ms</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Tabbed Login / Signup Form */}
        <div className="p-6 sm:p-10 lg:p-12 flex flex-col justify-center bg-paper">
          {/* Form Header Tabs */}
          <div className="flex border-3 border-ink bg-white p-1 mb-8 shadow-[4px_4px_0_0_#0A0A0A]">
            <button
              type="button"
              onClick={() => { setActiveTab('login'); setSubmitted(false); }}
              className={`flex-1 py-3 font-display font-bold text-xs uppercase tracking-[0.06em] transition-all duration-150 ${
                activeTab === 'login'
                  ? 'bg-ink text-paper shadow-[2px_2px_0_0_#FF2D00]'
                  : 'text-ink hover:bg-paper/50'
              }`}
            >
              Log In
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab('signup'); setSubmitted(false); }}
              className={`flex-1 py-3 font-display font-bold text-xs uppercase tracking-[0.06em] transition-all duration-150 ${
                activeTab === 'signup'
                  ? 'bg-ink text-paper shadow-[2px_2px_0_0_#FF2D00]'
                  : 'text-ink hover:bg-paper/50'
              }`}
            >
              Sign Up
            </button>
          </div>

          {submitted ? (
            <div className="border-3 border-signal bg-ink text-paper p-6 shadow-[6px_6px_0_0_#FF2D00] font-mono">
              <div className="flex items-center gap-2 border-b-2 border-paper/20 pb-3 mb-4">
                <span className="w-3 h-3 bg-signal animate-bounce" />
                <span className="text-xs uppercase tracking-wider text-signal font-bold">
                  {activeTab === 'login' ? 'Authentication Accepted' : 'Account Created Successfully'}
                </span>
              </div>
              <div className="space-y-2 text-xs text-paper/90">
                <p className="text-signal">$ {activeTab === 'login' ? 'auth_session: ACCEPTED' : 'account_register: COMPLETED'}</p>
                <p>&gt; Welcome back, {formData.name || formData.email || 'Developer'}.</p>
                <p>&gt; Initializing workspace environment...</p>
                <p className="text-paper/40 text-[10px] pt-3 border-t border-paper/10">
                  * Demo Mode: Redirecting to dashboard interface...
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-6 w-full py-2.5 border-2 border-paper bg-paper text-ink font-display font-bold text-xs uppercase hover:bg-signal hover:border-signal hover:text-white transition-colors"
              >
                Back to Portal
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="mb-2">
                <h1 className="text-2xl font-display font-bold uppercase tracking-tight text-ink">
                  {activeTab === 'login' ? 'Access your workspace' : 'Create developer account'}
                </h1>
                <p className="font-mono text-xs text-concrete mt-1">
                  {activeTab === 'login'
                    ? 'Enter your credentials to manage your code transformations.'
                    : 'Start modernizing legacy systems in minutes.'}
                </p>
              </div>

              {/* Full Name field on Signup tab */}
              {activeTab === 'signup' && (
                <div className="flex flex-col gap-1.5">
                  <label className="font-display font-bold text-xs tracking-wider uppercase text-ink" htmlFor="name">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ada Lovelace"
                    className="font-mono text-sm px-3.5 py-3 border-3 border-ink bg-white transition-all duration-150 focus:outline-none focus:border-signal focus:shadow-[4px_4px_0_0_#FF2D00]"
                  />
                </div>
              )}

              {/* Email field */}
              <div className="flex flex-col gap-1.5">
                <label className="font-display font-bold text-xs tracking-wider uppercase text-ink" htmlFor="email">
                  Work Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="developer@company.com"
                  className="font-mono text-sm px-3.5 py-3 border-3 border-ink bg-white transition-all duration-150 focus:outline-none focus:border-signal focus:shadow-[4px_4px_0_0_#FF2D00]"
                />
              </div>

              {/* Organization field on Signup tab */}
              {activeTab === 'signup' && (
                <div className="flex flex-col gap-1.5">
                  <label className="font-display font-bold text-xs tracking-wider uppercase text-ink" htmlFor="org">
                    Company / Organization
                  </label>
                  <input
                    id="org"
                    type="text"
                    value={formData.org}
                    onChange={handleChange}
                    placeholder="Acme Corp"
                    className="font-mono text-sm px-3.5 py-3 border-3 border-ink bg-white transition-all duration-150 focus:outline-none focus:border-signal focus:shadow-[4px_4px_0_0_#FF2D00]"
                  />
                </div>
              )}

              {/* Password field - triggers mascot cover eyes */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <label className="font-display font-bold text-xs tracking-wider uppercase text-ink" htmlFor="password">
                    Password
                  </label>
                  {isCoveringEyes && (
                    <span className="font-mono text-[10px] text-signal font-bold uppercase animate-pulse">
                      🙈 Mascot Eyes Covered
                    </span>
                  )}
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setIsCoveringEyes(true)}
                  onBlur={() => setIsCoveringEyes(false)}
                  placeholder="••••••••••••"
                  className="font-mono text-sm px-3.5 py-3 border-3 border-ink bg-white transition-all duration-150 focus:outline-none focus:border-signal focus:shadow-[4px_4px_0_0_#FF2D00]"
                />
              </div>

              {/* Checkboxes & Links */}
              {activeTab === 'login' ? (
                <div className="flex items-center justify-between gap-3 font-mono text-xs text-concrete pt-1">
                  <label className="flex items-center gap-2 cursor-pointer hover:text-ink transition-colors">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      className="w-4 h-4 border-2 border-ink bg-paper accent-signal cursor-pointer"
                    />
                    Remember session
                  </label>
                  <a href="#" className="hover:text-signal transition-colors underline underline-offset-2">
                    Forgot password?
                  </a>
                </div>
              ) : (
                <div className="font-mono text-xs text-concrete pt-1">
                  <label className="flex items-start gap-2 cursor-pointer hover:text-ink transition-colors">
                    <input
                      type="checkbox"
                      id="agreeTerms"
                      required
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                      className="w-4 h-4 mt-0.5 border-2 border-ink bg-paper accent-signal cursor-pointer shrink-0"
                    />
                    <span>I agree to the Terms of Service &amp; Privacy Policy.</span>
                  </label>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="mt-4 inline-flex items-center justify-center gap-2 font-display font-bold text-xs uppercase tracking-[0.08em] px-6 py-4 border-3 border-ink bg-ink text-paper transition-all duration-150 hover:bg-signal hover:border-signal hover:text-white hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_#0A0A0A] w-full cursor-pointer"
              >
                <span>{activeTab === 'login' ? 'Log In to Dashboard' : 'Create Free Account'}</span>
                <span>→</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
