import { useState } from 'react';
import { Link } from 'react-router-dom';
import Mascot from '../components/Mascot';

const RECENT_JOBS = [
  { id: 'JOB-9421', repo: 'acme-corp/legacy-cobol-core', branch: 'main', source: 'COBOL', target: 'Go', progress: 85, status: 'IN_PROGRESS', date: '10 mins ago' },
  { id: 'JOB-9420', repo: 'fintech/fortran-risk-model', branch: 'v2.1-stable', source: 'Fortran', target: 'Python', progress: 100, status: 'COMPLETED', date: '2 hours ago' },
  { id: 'JOB-9419', repo: 'health/mumps-patient-db', branch: 'master', source: 'MUMPS', target: 'Rust', progress: 100, status: 'COMPLETED', date: '1 day ago' },
];

export default function Dashboard() {
  const [mascotCover, setMascotCover] = useState(false);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 bg-paper">
      
      {/* HEADER & WELCOME HUB */}
      <div className="border-3 border-ink bg-white p-6 sm:p-8 shadow-[6px_6px_0_0_#0A0A0A] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-signal font-bold uppercase tracking-wider">
            <span className="w-2.5 h-2.5 bg-signal inline-block animate-pulse" />
            # PLATFORM_WORKSPACE
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold uppercase tracking-tight text-ink">
            Developer Workspace
          </h1>
          <p className="font-mono text-xs text-concrete max-w-xl">
            Welcome back. Select a dedicated space below to manage code pipelines, connect repositories, or inspect translation logs.
          </p>
        </div>

        {/* Mascot Status Card */}
        <div
          onMouseEnter={() => setMascotCover(true)}
          onMouseLeave={() => setMascotCover(false)}
          className="border-3 border-ink bg-paper p-4 shadow-[4px_4px_0_0_#0A0A0A] flex items-center gap-4 shrink-0 transition-all hover:border-signal"
        >
          <Mascot mode="dashboard" isCoveringEyes={mascotCover} className="scale-75 -my-4 -mx-2" />
          <div className="font-mono text-xs">
            <span className="font-bold text-ink block">ShiftBot Copilot</span>
            <span className="text-[10px] text-concrete block mb-2">Hover to shield eyes</span>
            <span className="px-2 py-0.5 bg-ink text-paper text-[10px] uppercase font-bold">
              {mascotCover ? 'EYES_SHIELDED' : '4 PIPELINES ACTIVE'}
            </span>
          </div>
        </div>
      </div>

      {/* KEY METRICS SUMMARY */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="border-3 border-ink bg-white p-5 shadow-[4px_4px_0_0_#0A0A0A] font-mono">
          <span className="text-[11px] text-concrete uppercase font-bold block mb-1">Total LOC Converted</span>
          <span className="text-2xl font-bold text-ink font-display">1,420,900</span>
          <span className="text-[10px] text-signal font-bold block mt-1">+12.4% this month</span>
        </div>
        <div className="border-3 border-ink bg-white p-5 shadow-[4px_4px_0_0_#0A0A0A] font-mono">
          <span className="text-[11px] text-concrete uppercase font-bold block mb-1">Active Pipelines</span>
          <span className="text-2xl font-bold text-signal font-display">4 Running</span>
          <span className="text-[10px] text-concrete block mt-1">2 queued for verification</span>
        </div>
        <div className="border-3 border-ink bg-white p-5 shadow-[4px_4px_0_0_#0A0A0A] font-mono">
          <span className="text-[11px] text-concrete uppercase font-bold block mb-1">Test Pass Rate</span>
          <span className="text-2xl font-bold text-ink font-display">99.8%</span>
          <span className="text-[10px] text-concrete block mt-1">Behavioral equivalence</span>
        </div>
        <div className="border-3 border-ink bg-white p-5 shadow-[4px_4px_0_0_#0A0A0A] font-mono">
          <span className="text-[11px] text-concrete uppercase font-bold block mb-1">Cost Saved</span>
          <span className="text-2xl font-bold text-hyper font-display">$482,000</span>
          <span className="text-[10px] text-concrete block mt-1">Vs manual rewrite</span>
        </div>
      </div>

      {/* DEDICATED SPACES QUICK NAVIGATION */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b-3 border-ink pb-3">
          <span className="font-mono font-bold text-xs text-concrete uppercase">// PLATFORM SPACES</span>
          <span className="font-mono text-xs text-concrete">Click space card to open</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Space 1: New Job Wizard */}
          <Link
            to="/new-job"
            className="border-3 border-ink bg-white p-6 shadow-[5px_5px_0_0_#0A0A0A] hover:shadow-[7px_7px_0_0_#FF2D00] hover:border-signal hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 border-2 border-ink bg-signal text-white flex items-center justify-center font-mono font-bold text-lg shadow-[2px_2px_0_0_#0A0A0A]">
                +
              </div>
              <h2 className="font-display font-bold text-lg uppercase text-ink group-hover:text-signal transition-colors">
                Launch Pipeline
              </h2>
              <p className="font-mono text-xs text-concrete">
                Connect GitHub / GitLab, pick a repository &amp; branch, select target language.
              </p>
            </div>
            <div className="font-mono text-xs font-bold text-ink mt-6 flex items-center gap-1 group-hover:text-signal">
              <span>Open Space</span>
              <span>→</span>
            </div>
          </Link>

          {/* Space 2: Jobs Workspace */}
          <Link
            to="/jobs"
            className="border-3 border-ink bg-white p-6 shadow-[5px_5px_0_0_#0A0A0A] hover:shadow-[7px_7px_0_0_#FF2D00] hover:border-signal hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 border-2 border-ink bg-ink text-paper flex items-center justify-center font-mono font-bold text-xs shadow-[2px_2px_0_0_#0A0A0A]">
                ⚡
              </div>
              <h2 className="font-display font-bold text-lg uppercase text-ink group-hover:text-signal transition-colors">
                Transformations
              </h2>
              <p className="font-mono text-xs text-concrete">
                View active jobs, inspect line-by-line code diffs, and download Rust/Go bundles.
              </p>
            </div>
            <div className="font-mono text-xs font-bold text-ink mt-6 flex items-center gap-1 group-hover:text-signal">
              <span>Manage Jobs (4)</span>
              <span>→</span>
            </div>
          </Link>

          {/* Space 3: Audit & Terminal Stream */}
          <Link
            to="/audit-log"
            className="border-3 border-ink bg-white p-6 shadow-[5px_5px_0_0_#0A0A0A] hover:shadow-[7px_7px_0_0_#FF2D00] hover:border-signal hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 border-2 border-ink bg-paper text-ink flex items-center justify-center font-mono font-bold text-xs shadow-[2px_2px_0_0_#0A0A0A]">
                &gt;_
              </div>
              <h2 className="font-display font-bold text-lg uppercase text-ink group-hover:text-signal transition-colors">
                Audit &amp; Logs
              </h2>
              <p className="font-mono text-xs text-concrete">
                Real-time AST parser output stream, security compliance logs, and verification reports.
              </p>
            </div>
            <div className="font-mono text-xs font-bold text-ink mt-6 flex items-center gap-1 group-hover:text-signal">
              <span>View Terminal Log</span>
              <span>→</span>
            </div>
          </Link>

          {/* Space 4: Settings & Integrations */}
          <Link
            to="/settings"
            className="border-3 border-ink bg-white p-6 shadow-[5px_5px_0_0_#0A0A0A] hover:shadow-[7px_7px_0_0_#FF2D00] hover:border-signal hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 border-2 border-ink bg-hyper text-white flex items-center justify-center font-mono font-bold text-xs shadow-[2px_2px_0_0_#0A0A0A]">
                ⚙
              </div>
              <h2 className="font-display font-bold text-lg uppercase text-ink group-hover:text-signal transition-colors">
                Settings &amp; Git
              </h2>
              <p className="font-mono text-xs text-concrete">
                Manage OAuth tokens for GitHub/GitLab, API keys, team permissions, and LLM providers.
              </p>
            </div>
            <div className="font-mono text-xs font-bold text-ink mt-6 flex items-center gap-1 group-hover:text-signal">
              <span>Configure Provider</span>
              <span>→</span>
            </div>
          </Link>
        </div>
      </div>

      {/* RECENT PIPELINE ACTIVITY PREVIEW */}
      <div className="border-3 border-ink bg-white p-6 shadow-[6px_6px_0_0_#0A0A0A]">
        <div className="flex items-center justify-between border-b-3 border-ink pb-4 mb-4 font-mono text-xs">
          <span className="font-bold text-ink uppercase flex items-center gap-2">
            <span className="w-2 h-2 bg-signal" />
            RECENT_PIPELINE_ACTIVITY
          </span>
          <Link to="/jobs" className="text-signal hover:underline font-bold">
            View All Jobs →
          </Link>
        </div>

        <div className="divide-y-2 divide-ink/10 font-mono text-xs">
          {RECENT_JOBS.map((job) => (
            <div key={job.id} className="py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:bg-paper/40 px-2 transition-colors">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-ink">{job.id}</span>
                  <span className="text-concrete">/</span>
                  <span className="font-bold text-signal">{job.repo}</span>
                  <span className="px-1.5 py-0.5 bg-paper border border-ink text-[10px]">{job.branch}</span>
                </div>
                <div className="text-[11px] text-concrete">
                  Translate {job.source} → {job.target} • {job.date}
                </div>
              </div>

              <div className="flex items-center gap-4 w-full sm:w-auto justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-paper border border-ink h-2.5 overflow-hidden">
                    <div className="bg-signal h-full transition-all duration-300" style={{ width: `${job.progress}%` }} />
                  </div>
                  <span className="text-[10px] font-bold">{job.progress}%</span>
                </div>
                <Link
                  to="/jobs"
                  className="px-3 py-1 border-2 border-ink bg-ink text-paper text-[11px] uppercase font-bold hover:bg-signal hover:border-signal transition-colors"
                >
                  Inspect
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
