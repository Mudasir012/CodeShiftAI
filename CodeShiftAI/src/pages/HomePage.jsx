import { Link } from 'react-router-dom'
import { Terminal, ArrowRight, Code2, Eye, GitBranch, Shield, Bot, Workflow, CheckCircle2 } from 'lucide-react'
import { GithubIcon as GitHub, GitlabIcon as GitLab, BitbucketIcon as BitBucket } from '../components/BrandIcons.jsx'

const features = [
  {
    icon: Code2,
    title: 'AST-Aware Chunking',
    desc: 'Parses source code into Abstract Syntax Trees for semantically coherent translation — never splits a function or class mid-body.',
  },
  {
    icon: Bot,
    title: 'LLM-Powered Translation',
    desc: 'Retrieval-Augmented Generation (RAG) enriches prompts with official migration guides for accurate, context-aware code transformation.',
  },
  {
    icon: Shield,
    title: 'Sandboxed Validation',
    desc: 'Every migration is validated inside an isolated Docker sandbox against the original test suite before you ever see the changes.',
  },
  {
    icon: Eye,
    title: 'Visual Diff Review',
    desc: 'Review every change side-by-side with syntax highlighting. Accept, reject, or edit individual hunks — you stay in control.',
  },
  {
    icon: GitBranch,
    title: 'Git Integration',
    desc: 'Connect via OAuth to GitHub, GitLab, or Bitbucket. Migrated code is pushed as a new branch, ready for your PR workflow.',
  },
  {
    icon: Workflow,
    title: 'Async Job Pipeline',
    desc: 'Large repositories are processed asynchronously with real-time progress streaming. Close the browser and come back when it\'s done.',
  },
]

const pipelineSteps = [
  { step: '01', title: 'Repository Ingestion', desc: 'Clone your repo and parse every file into an Abstract Syntax Tree, identifying semantic boundaries.' },
  { step: '02', title: 'AST Chunking', desc: 'Split the codebase into independently translatable chunks along function, class, and module boundaries.' },
  { step: '03', title: 'LLM Translation', desc: 'Each chunk is translated via a RAG-enriched prompt, with automatic retry on failed syntax validation.' },
  { step: '04', title: 'Sandbox Validation', desc: 'The migrated code is executed against your original test suite inside an isolated Docker container.' },
  { step: '05', title: 'Human Review', desc: 'Review every changed line in a visual diff interface. Accept, reject, or edit before the final export.' },
]

const migrationPairs = [
  { from: 'Python 2.7', to: 'Python 3.12' },
  { from: 'JavaScript ES5', to: 'TypeScript 5.x' },
  { from: 'COBOL-85', to: 'Java 21' },
  { from: 'Java 8', to: 'Java 21' },
  { from: 'Python 3.8', to: 'Python 3.12' },
  { from: 'JavaScript ES6+', to: 'TypeScript 5.x' },
]

const stats = [
  { value: '47,000+', label: 'Lines Migrated' },
  { value: '99.2%', label: 'Syntax Accuracy' },
  { value: '89%', label: 'Test Pass Rate' },
  { value: '< 30 min', label: 'Avg. Job Time' },
]

export default function HomePage() {
  return (
    <div className="bg-black min-h-screen font-mono">
      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0px) rotate(var(--tw-rotate)); } 50% { transform: translateY(-6px) rotate(var(--tw-rotate)); } }
        @keyframes float-delayed { 0%, 100% { transform: translateY(0px) rotate(var(--tw-rotate)); } 50% { transform: translateY(-6px) rotate(var(--tw-rotate)); } }
        @keyframes wobble { 0%, 100% { transform: rotate(var(--tw-rotate)); } 25% { transform: rotate(calc(var(--tw-rotate) + 3deg)); } 75% { transform: rotate(calc(var(--tw-rotate) - 3deg)); } }
        @keyframes pulse-soft { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
        @keyframes bounce-x { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(4px); } }
        @keyframes jiggle { 0%, 100% { transform: rotate(var(--tw-rotate)); } 20% { transform: rotate(calc(var(--tw-rotate) - 2deg)); } 40% { transform: rotate(calc(var(--tw-rotate) + 2deg)); } 60% { transform: rotate(calc(var(--tw-rotate) - 1deg)); } 80% { transform: rotate(calc(var(--tw-rotate) + 1deg)); } }
        @keyframes dot-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.2; } }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 3s ease-in-out 1.5s infinite; }
        .group:hover .animate-wobble-on-hover { animation: wobble 0.4s ease-in-out; }
        .group:hover .animate-jiggle-on-hover { animation: jiggle 0.5s ease-in-out; }
        .animate-pulse-soft { animation: pulse-soft 2s ease-in-out infinite; }
        .group:hover .animate-bounce-x-on-hover { animation: bounce-x 0.4s ease-in-out infinite; }
        .animate-dot-blink { animation: dot-blink 1.2s step-end infinite; }
        .animate-dot-blink-delayed { animation: dot-blink 1.2s step-end 0.4s infinite; }
        .animate-dot-blink-slower { animation: dot-blink 1.2s step-end 0.8s infinite; }
      `}</style>

      {/* STICKER: corner decoration */}
      <div className="fixed top-4 left-4 z-50 border-2 border-lime-300 bg-lime-300 text-black px-2 py-0.5 text-xs font-bold -rotate-3 animate-float">
        BETA
      </div>
      <div className="fixed top-4 right-4 z-50 border-2 border-fuchsia-300 bg-fuchsia-300 text-black px-2 py-0.5 text-xs font-bold rotate-2 animate-float-delayed">
        v1.0
      </div>

      {/* Nav */}
      <header className="border-b-2 border-white sticky top-0 bg-black z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="border-2 border-white p-1.5">
                <Terminal className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight uppercase">CodeShift<span className="text-lime-300">AI</span></span>
            </div>
            <nav className="hidden md:flex items-center gap-1">
              <a href="#features" className="text-sm text-white border-2 border-transparent hover:border-white px-3 py-1.5">Features</a>
              <a href="#how-it-works" className="text-sm text-white border-2 border-transparent hover:border-white px-3 py-1.5">How It Works</a>
              <a href="#migrations" className="text-sm text-white border-2 border-transparent hover:border-white px-3 py-1.5">Migrations</a>
              <Link
                to="/dashboard"
                className="px-4 py-1.5 bg-lime-300 text-black text-sm font-bold border-2 border-lime-300 hover:bg-lime-400"
              >
                DASHBOARD →
              </Link>
            </nav>
            <Link
              to="/dashboard"
              className="md:hidden px-4 py-1.5 bg-lime-300 text-black text-sm font-bold border-2 border-lime-300"
            >
              DASHBOARD →
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b-2 border-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
          <div className="max-w-4xl">
            {/* STICKER: tag */}
            <div className="inline-block border-2 border-lime-300 bg-lime-300 text-black px-3 py-1 text-xs font-bold mb-6 -rotate-1 group cursor-default">
              <span className="animate-wobble-on-hover inline-block">AI-Powered Code Migration Platform</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white uppercase leading-[1.1] tracking-tight">
              Migrate Legacy
              <br />
              Codebases{' '}
              <span className="text-lime-300 bg-white text-black px-2 -ml-1 inline-block">
                Automatically
              </span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed uppercase tracking-wide">
              CodeShift AI automates legacy codebase translation using AST-aware analysis and LLM-powered generation,
              then validates every change inside an isolated sandbox before you review it.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 px-6 py-3 bg-lime-300 text-black text-sm font-bold border-2 border-lime-300 hover:bg-lime-400 group"
              >
                START YOUR FIRST MIGRATION
                <ArrowRight className="w-4 h-4 animate-bounce-x-on-hover" />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white text-white text-sm font-bold hover:bg-white hover:text-black"
              >
                SEE HOW IT WORKS
              </a>
            </div>

            {/* Code preview */}
            <div className="mt-16 max-w-3xl">
              <div className="border-2 border-white bg-gray-900">
                  <div className="flex items-center gap-1.5 px-4 py-2.5 bg-white border-b-2 border-white">
                  <div className="w-3 h-3 bg-black animate-dot-blink" />
                  <div className="w-3 h-3 bg-lime-300 animate-dot-blink-delayed" />
                  <div className="w-3 h-3 bg-fuchsia-300 animate-dot-blink-slower" />
                  <span className="ml-2 text-xs text-black font-bold">migration.py</span>
                </div>
                <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto">
                  <pre className="text-lime-300 whitespace-pre-wrap">{`# Before (Python 2.7)
def calculate_total(items):
    total = 0
    for item in items:
        total += item['price'] * item['quantity']
    return total

  # After (Python 3.12)
def calculate_total(items: list[dict]) -> float:
    return sum(item['price'] * item['quantity'] for item in items)`}
                  </pre>
                  {/* STICKER: validation badge */}
                  <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 border-2 border-lime-300 bg-black text-lime-300 text-xs font-bold rotate-1 animate-pulse-soft">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    VALIDATED — 42/45 TESTS PASSING
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b-2 border-white bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((stat, i) => (
              <div key={stat.label} className={`text-center border-2 border-black py-6 ${i < 2 ? 'border-b-0' : ''} md:border-b-0 md:${i < 3 ? 'border-r-0' : ''}`}>
                {/* STICKER: stat */}
                <div className="text-3xl sm:text-4xl font-bold text-black">{stat.value}</div>
                <div className="text-xs text-black font-bold mt-1 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-b-2 border-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          {/* STICKER */}
          <div className="inline-block border-2 border-fuchsia-300 bg-fuchsia-300 text-black px-4 py-1 text-sm font-bold mb-2 rotate-2 group cursor-default">
            <span className="animate-wobble-on-hover inline-block">WHAT WE DO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white uppercase tracking-tight mb-4">
            Everything you need to modernize your codebase
          </h2>
          <p className="text-sm text-gray-400 uppercase tracking-wide mb-12 max-w-2xl">
            From repository connection to sandbox validation to visual review — a complete pipeline
            designed for safety and developer control.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => {
              const Icon = f.icon
              const rotations = ['-rotate-1', 'rotate-1', '-rotate-2', 'rotate-2', '-rotate-1', 'rotate-1']
              return (
                <div key={f.title} className={`p-6 border-2 border-white bg-black hover:bg-white hover:text-black group ${rotations[i]}`}>
                  <div className="w-11 h-11 border-2 border-white flex items-center justify-center mb-4 group-hover:border-black animate-jiggle-on-hover">
                    <Icon className="w-5 h-5 text-lime-300 group-hover:text-black" />
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-black mb-2 uppercase">{f.title}</h3>
                  <p className="text-sm text-gray-400 group-hover:text-gray-700 leading-relaxed">{f.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="border-b-2 border-white bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          {/* STICKER */}
          <div className="inline-block border-2 border-black bg-black text-white px-4 py-1 text-sm font-bold mb-2 -rotate-1 group cursor-default">
            <span className="animate-wobble-on-hover inline-block">PIPELINE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-black uppercase tracking-tight mb-4">
            The 5-stage migration pipeline
          </h2>
          <p className="text-sm text-gray-600 uppercase tracking-wide mb-12 max-w-2xl">
            Every migration passes through automated quality gates before any change reaches your repository.
          </p>
          <div className="space-y-6 max-w-3xl">
            {pipelineSteps.map((p, i) => (
              <div key={p.step} className="flex items-start gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 border-2 border-black bg-lime-300 text-black flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {p.step}
                  </div>
                  {i < pipelineSteps.length - 1 && (
                    <div className="w-0.5 flex-1 bg-black mt-1" />
                  )}
                </div>
                <div className="pb-4 border-b-2 border-black flex-1">
                  <h3 className="text-base font-bold text-black uppercase">{p.title}</h3>
                  <p className="mt-1 text-sm text-gray-600 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Migration Pairs */}
      <section id="migrations" className="border-b-2 border-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          {/* STICKER */}
          <div className="inline-block border-2 border-cyan-300 bg-cyan-300 text-black px-4 py-1 text-sm font-bold mb-2 rotate-1 group cursor-default">
            <span className="animate-wobble-on-hover inline-block">SUPPORTED</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white uppercase tracking-tight mb-4">
            Supported migrations
          </h2>
          <p className="text-sm text-gray-400 uppercase tracking-wide mb-12 max-w-2xl">
            Language and framework pairs actively supported in the v1.0 release.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl">
            {migrationPairs.map((pair, i) => {
              const rots = ['-rotate-1', 'rotate-1', '-rotate-2', 'rotate-2', '-rotate-1', 'rotate-1']
              return (
                <div key={`${pair.from}-${pair.to}`} className={`flex items-center gap-3 p-4 border-2 border-white bg-black hover:bg-lime-300 hover:text-black group ${rots[i]}`}>
                  <div className="flex-1 text-sm">
                    <span className="px-2 py-0.5 border-2 border-amber-300 text-amber-300 text-xs font-bold group-hover:border-black group-hover:text-black">{pair.from}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white group-hover:text-black flex-shrink-0 animate-bounce-x-on-hover" />
                  <div className="flex-1 text-sm">
                    <span className="px-2 py-0.5 border-2 border-emerald-300 text-emerald-300 text-xs font-bold group-hover:border-black group-hover:text-black">{pair.to}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-b-2 border-white bg-lime-300">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          {/* STICKER */}
          <div className="inline-block border-2 border-black bg-fuchsia-300 text-black px-4 py-1 text-sm font-bold mb-4 -rotate-2 group cursor-default">
            <span className="animate-wobble-on-hover inline-block">GET STARTED</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-black uppercase tracking-tight">
            Ready to modernize your codebase?
          </h2>
          <p className="mt-4 text-base text-black uppercase tracking-wide font-bold">
            Connect a repository and start your first migration in minutes — no setup required.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 bg-black text-lime-300 text-sm font-bold border-2 border-black hover:bg-white hover:text-black"
            >
              <Terminal className="w-4 h-4" />
              GO TO DASHBOARD
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/connect"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-black text-black text-sm font-bold hover:bg-black hover:text-lime-300"
            >
              <GitBranch className="w-4 h-4" />
              CONNECT A REPOSITORY
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t-2 border-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid sm:grid-cols-4 gap-8">
            <div className="sm:col-span-2">
              <div className="flex items-center gap-2 text-lg font-bold text-white mb-3 uppercase">
                <div className="border-2 border-white p-1">
                  <Terminal className="w-4 h-4 text-white" />
                </div>
                CodeShift AI
              </div>
              <p className="text-sm text-gray-400 max-w-sm">
                AI-powered code migration platform built for engineering teams modernizing legacy codebases.
                Automated translation, sandboxed validation, and human-in-the-loop review.
              </p>
              <div className="flex items-center gap-3 mt-4">
                <div className="border-2 border-white p-1 hover:bg-white group">
                  <GitHub className="w-4 h-4 text-white group-hover:text-black" />
                </div>
                <div className="border-2 border-white p-1 hover:bg-white group">
                  <GitLab className="w-4 h-4 text-white group-hover:text-black" />
                </div>
                <div className="border-2 border-white p-1 hover:bg-white group">
                  <BitBucket className="w-4 h-4 text-white group-hover:text-black" />
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold text-lime-300 uppercase tracking-wider mb-3">Product</h4>
              <div className="space-y-2 text-sm">
                <a href="#features" className="block text-gray-400 hover:text-white border-b border-transparent hover:border-white">Features</a>
                <a href="#how-it-works" className="block text-gray-400 hover:text-white border-b border-transparent hover:border-white">How It Works</a>
                <a href="#migrations" className="block text-gray-400 hover:text-white border-b border-transparent hover:border-white">Migrations</a>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold text-lime-300 uppercase tracking-wider mb-3">Company</h4>
              <div className="space-y-2 text-sm">
                <span className="block text-gray-400">CodeShift Engineering</span>
                <span className="block text-gray-400">CS-413 SP24-BCS-5C</span>
                <span className="block text-gray-500 text-xs mt-2">© 2026 CodeShift AI</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
