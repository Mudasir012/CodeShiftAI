import { Link } from 'react-router-dom'
import { Terminal, ArrowRight, Code2, Eye, GitBranch, Shield, Bot, Workflow, CheckCircle2, Sparkles, ChevronRight } from 'lucide-react'
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
    <div className="bg-[#0a0a0f] min-h-screen font-sans text-[#f1f1f7] overflow-x-hidden">
      {/* Background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-0">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] animate-glow" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-pink-600/15 rounded-full blur-[120px] animate-glow" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/8 rounded-full blur-[150px]" />
        <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-emerald-500/10 rounded-full blur-[100px] animate-glow" style={{ animationDelay: '3s' }} />
      </div>

      {/* Top-right gradient accent line */}
      <div className="fixed top-0 right-0 w-[400px] h-[1px] bg-gradient-to-l from-transparent via-purple-500/40 to-transparent" />
      <div className="fixed top-0 right-0 w-[1px] h-[400px] bg-gradient-to-b from-transparent via-purple-500/40 to-transparent" />

      {/* Sticker badges */}
      <div className="fixed top-5 left-5 z-50">
        <div className="glass rounded-full px-3 py-1 text-xs font-medium text-purple-300 tracking-wide">
          BETA v1.0
        </div>
      </div>

      {/* Nav */}
      <header className="glass-nav sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
                <Terminal className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-semibold tracking-tight">CodeShift<span className="text-gradient font-bold">AI</span></span>
            </div>
            <nav className="hidden md:flex items-center gap-1">
              <a href="#features" className="text-sm text-gray-400 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5 transition-all duration-200">Features</a>
              <a href="#how-it-works" className="text-sm text-gray-400 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5 transition-all duration-200">How it works</a>
              <a href="#migrations" className="text-sm text-gray-400 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5 transition-all duration-200">Migrations</a>
              <Link
                to="/dashboard"
                className="ml-3 px-5 py-2 rounded-full glass-button text-sm font-medium text-white"
              >
                Dashboard
                <ChevronRight className="w-3.5 h-3.5 inline ml-0.5" />
              </Link>
            </nav>
            <Link
              to="/dashboard"
              className="md:hidden px-4 py-2 rounded-full glass-button text-sm font-medium"
            >
              Dashboard &rarr;
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 lg:pt-36 pb-20 sm:pb-28">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-8 animate-fade-in-up">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span className="text-xs font-medium text-gray-300 tracking-wide">AI-Powered Code Migration Platform</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-medium leading-[1.1] tracking-tight animate-fade-in-up-delayed">
              Migrate legacy
              <br />
              codebases{' '}
              <span className="text-gradient italic font-light">
                automatically
              </span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-gray-400 max-w-2xl leading-relaxed animate-fade-in-up-slower">
              CodeShift AI automates legacy codebase translation using AST-aware analysis and LLM-powered generation,
              then validates every change inside an isolated sandbox before you review it.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-in-up-slower">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium hover:from-purple-500 hover:to-pink-500 transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40"
              >
                Start your first migration
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-button text-sm font-medium"
              >
                See how it works
              </a>
            </div>

            {/* Code preview */}
            <div className="mt-16 max-w-3xl animate-fade-in-up-slower">
              <div className="glass-card rounded-2xl overflow-hidden">
                <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/5">
                  <div className="w-3 h-3 rounded-full bg-red-400/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
                  <span className="ml-2.5 text-xs text-gray-500 font-mono">migration.py</span>
                </div>
                <div className="p-5 sm:p-6 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto bg-black/30">
                  <pre className="text-gray-300 whitespace-pre-wrap">{`<span class="text-purple-400"># Before</span> <span class="text-gray-500">(Python 2.7)</span>
<span class="text-blue-400">def</span> <span class="text-yellow-300">calculate_total</span>(items):
    total = <span class="text-orange-300">0</span>
    <span class="text-blue-400">for</span> item <span class="text-blue-400">in</span> items:
        total += item[<span class="text-green-400">'price'</span>] * item[<span class="text-green-400">'quantity'</span>]
    <span class="text-blue-400">return</span> total

<span class="text-purple-400"># After</span> <span class="text-gray-500">(Python 3.12)</span>
<span class="text-blue-400">def</span> <span class="text-yellow-300">calculate_total</span>(items: <span class="text-blue-400">list</span>[<span class="text-blue-400">dict</span>]) -> <span class="text-blue-400">float</span>:
    <span class="text-blue-400">return</span> <span class="text-yellow-300">sum</span>(item[<span class="text-green-400">'price'</span>] * item[<span class="text-green-400">'quantity'</span>] <span class="text-blue-400">for</span> item <span class="text-blue-400">in</span> items)`}
                  </pre>
                  <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Validated &mdash; 42/45 tests passing
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {stats.map((stat, i) => (
                <div key={stat.label} className={`text-center py-8 px-4 ${i < 2 ? 'border-b border-white/5' : ''} md:border-b-0 md:${i < 3 ? 'border-r border-white/5' : ''} ${i === 1 ? 'md:border-r-0' : ''}`}>
                  <div className="text-3xl sm:text-4xl font-bold text-gradient">{stat.value}</div>
                  <div className="text-xs text-gray-500 font-medium mt-1.5 tracking-wide uppercase">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-2xl mb-14">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-5">
              <span className="text-xs font-medium text-purple-400 tracking-wide">What we do</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-medium tracking-tight">
              Everything you need to <span className="text-gradient">modernize</span> your codebase
            </h2>
            <p className="mt-3 text-gray-400 leading-relaxed max-w-xl">
              From repository connection to sandbox validation to visual review — a complete pipeline
              designed for safety and developer control.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f) => {
              const Icon = f.icon
              return (
                <div
                  key={f.title}
                  className="glass-card rounded-2xl p-6 group cursor-default transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/10 flex items-center justify-center mb-4 group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all duration-300">
                    <Icon className="w-5 h-5 text-purple-400 group-hover:text-purple-300" />
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2">{f.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">{f.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-2xl mb-14">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-5">
              <span className="text-xs font-medium text-emerald-400 tracking-wide">Pipeline</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-medium tracking-tight">
              The <span className="text-gradient-alt">5-stage</span> migration pipeline
            </h2>
            <p className="mt-3 text-gray-400 leading-relaxed max-w-xl">
              Every migration passes through automated quality gates before any change reaches your repository.
            </p>
          </div>
          <div className="grid md:grid-cols-5 gap-4">
            {pipelineSteps.map((p, i) => (
              <div key={p.step} className="glass-card rounded-2xl p-5 relative group hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-purple-500/20">
                    {p.step}
                  </div>
                  {i < pipelineSteps.length - 1 && (
                    <div className="hidden md:block flex-1 h-px bg-gradient-to-r from-purple-500/40 to-transparent" />
                  )}
                </div>
                <h3 className="text-sm font-semibold text-white mb-1.5">{p.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Migration Pairs */}
      <section id="migrations" className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-2xl mb-14">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-5">
              <span className="text-xs font-medium text-cyan-400 tracking-wide">Supported</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-medium tracking-tight">
              Supported <span className="text-gradient">migrations</span>
            </h2>
            <p className="mt-3 text-gray-400 leading-relaxed max-w-xl">
              Language and framework pairs actively supported in the v1.0 release.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl">
            {migrationPairs.map((pair) => (
              <div
                key={`${pair.from}-${pair.to}`}
                className="glass-card rounded-xl p-4 flex items-center gap-3 group hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="flex-1">
                  <span className="px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/15 text-amber-400 text-xs font-medium">{pair.from}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-purple-400 transition-colors flex-shrink-0" />
                <div className="flex-1 text-right">
                  <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/15 text-emerald-400 text-xs font-medium">{pair.to}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="glass-card rounded-3xl p-10 sm:p-14 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 pointer-events-none" />
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-[60px]" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-pink-500/20 rounded-full blur-[60px]" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-5">
                <span className="text-xs font-medium text-purple-400 tracking-wide">Get started</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-medium tracking-tight mb-4">
                Ready to modernize your codebase?
              </h2>
              <p className="text-gray-400 leading-relaxed max-w-lg mx-auto mb-8">
                Connect a repository and start your first migration in minutes — no setup required.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium hover:from-purple-500 hover:to-pink-500 transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40"
                >
                  <Terminal className="w-4 h-4" />
                  Go to dashboard
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/connect"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-button text-sm font-medium"
                >
                  <GitBranch className="w-4 h-4" />
                  Connect a repository
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-black/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid sm:grid-cols-4 gap-10">
            <div className="sm:col-span-2">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
                  <Terminal className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-base font-semibold">CodeShift<span className="text-gradient font-bold">AI</span></span>
              </div>
              <p className="text-sm text-gray-500 max-w-sm leading-relaxed">
                AI-powered code migration platform built for engineering teams modernizing legacy codebases.
                Automated translation, sandboxed validation, and human-in-the-loop review.
              </p>
              <div className="flex items-center gap-3 mt-5">
                {[GitHub, GitLab, BitBucket].map((Icon, i) => (
                  <div key={i} className="w-8 h-8 rounded-lg glass flex items-center justify-center hover:bg-white/10 transition-all duration-200 cursor-pointer">
                    <Icon className="w-4 h-4 text-gray-400" />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-gray-400 tracking-widest uppercase mb-4">Product</h4>
              <div className="space-y-2.5">
                {['Features', 'How it works', 'Migrations'].map((item) => (
                  <a key={item} href={`#${item.toLowerCase().replace(/ /g, '-')}`} className="block text-sm text-gray-500 hover:text-white transition-colors">{item}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-gray-400 tracking-widest uppercase mb-4">Company</h4>
              <div className="space-y-2.5 text-sm text-gray-500">
                <p>CodeShift Engineering</p>
                <p>CS-413 SP24-BCS-5C</p>
                <p className="text-gray-600 text-xs mt-3">&copy; 2026 CodeShift AI</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
