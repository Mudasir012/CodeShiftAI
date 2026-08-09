import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GithubIcon, GitlabIcon } from '../components/BrandIcons';
import Mascot from '../components/Mascot';

// Mock Repositories fetched from GitHub/GitLab
const MOCK_GITHUB_REPOS = [
  { id: '1', name: 'acme-corp/core-banking-cobol', provider: 'github', language: 'COBOL 85', files: 412, loc: '850,000 LOC', stars: 42, defaultBranch: 'main' },
  { id: '2', name: 'acme-corp/fortran-flight-dynamics', provider: 'github', language: 'Fortran 77', files: 184, loc: '420,000 LOC', stars: 18, defaultBranch: 'v2-stable' },
  { id: '3', name: 'acme-corp/legacy-vb6-billing', provider: 'github', language: 'VB6', files: 620, loc: '1,120,000 LOC', stars: 9, defaultBranch: 'master' },
];

const MOCK_GITLAB_REPOS = [
  { id: '4', name: 'fintech-org/mumps-patient-records', provider: 'gitlab', language: 'MUMPS', files: 310, loc: '640,000 LOC', stars: 15, defaultBranch: 'main' },
  { id: '5', name: 'fintech-org/pascal-payroll-engine', provider: 'gitlab', language: 'Pascal', files: 128, loc: '210,000 LOC', stars: 7, defaultBranch: 'prod' },
];

export default function NewJobPage() {
  const navigate = useNavigate();
  const [provider, setProvider] = useState('github'); // 'github' | 'gitlab'
  const [isConnected, setIsConnected] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRepo, setSelectedRepo] = useState(MOCK_GITHUB_REPOS[0]);
  const [selectedBranch, setSelectedBranch] = useState('main');
  const [targetLang, setTargetLang] = useState('Go');
  const [strategy, setStrategy] = useState('equivalence'); // 'equivalence' | 'fast'
  const [isLaunching, setIsLaunching] = useState(false);

  const repos = provider === 'github' ? MOCK_GITHUB_REPOS : MOCK_GITLAB_REPOS;
  const filteredRepos = repos.filter((r) => r.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleLaunch = (e) => {
    e.preventDefault();
    setIsLaunching(true);
    setTimeout(() => {
      navigate('/jobs');
    }, 1200);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8 bg-paper">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b-3 border-ink pb-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-signal font-bold uppercase">
            <Link to="/dashboard" className="hover:underline text-concrete">&lt; Dashboard</Link>
            <span>/</span>
            <span># NEW_TRANSLATION_PIPELINE</span>
          </div>
          <h1 className="text-3xl font-display font-bold uppercase text-ink mt-1">
            Launch Modernization Job
          </h1>
        </div>
        <div className="hidden sm:block">
          <Mascot mode="new-job" isCoveringEyes={isLaunching} className="scale-65 -my-6" />
        </div>
      </div>

      <form onSubmit={handleLaunch} className="space-y-8">
        
        {/* STEP 1: GIT PROVIDER CONNECTION */}
        <div className="border-3 border-ink bg-white p-6 shadow-[6px_6px_0_0_#0A0A0A] space-y-6">
          <div className="flex items-center justify-between border-b-2 border-ink pb-3">
            <h2 className="font-display font-bold text-lg uppercase text-ink flex items-center gap-2">
              <span className="w-6 h-6 bg-ink text-paper text-xs flex items-center justify-center font-mono font-bold">1</span>
              Connect Git Provider &amp; Fetch Repo
            </h2>
            <span className="font-mono text-xs text-concrete uppercase">OAuth Status: Connected</span>
          </div>

          {/* Provider Selector Tabs */}
          <div className="grid grid-cols-2 gap-4 max-w-md">
            <button
              type="button"
              onClick={() => {
                setProvider('github');
                setSelectedRepo(MOCK_GITHUB_REPOS[0]);
              }}
              className={`p-4 border-3 border-ink font-mono text-xs font-bold uppercase flex items-center justify-center gap-3 transition-all ${
                provider === 'github'
                  ? 'bg-ink text-paper shadow-[4px_4px_0_0_#FF2D00]'
                  : 'bg-white text-ink hover:bg-paper/50'
              }`}
            >
              <GithubIcon className="w-5 h-5" />
              GitHub
            </button>
            <button
              type="button"
              onClick={() => {
                setProvider('gitlab');
                setSelectedRepo(MOCK_GITLAB_REPOS[0]);
              }}
              className={`p-4 border-3 border-ink font-mono text-xs font-bold uppercase flex items-center justify-center gap-3 transition-all ${
                provider === 'gitlab'
                  ? 'bg-ink text-paper shadow-[4px_4px_0_0_#FF2D00]'
                  : 'bg-white text-ink hover:bg-paper/50'
              }`}
            >
              <GitlabIcon className="w-5 h-5" />
              GitLab
            </button>
          </div>

          {/* Repository Search & List */}
          <div className="space-y-3 font-mono text-xs">
            <label className="font-bold text-ink uppercase block">
              Fetched Repositories ({filteredRepos.length})
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter repositories by name or language..."
              className="w-full px-3.5 py-3 border-3 border-ink bg-paper text-ink focus:outline-none focus:border-signal"
            />

            <div className="grid grid-cols-1 gap-3 pt-2">
              {filteredRepos.map((repo) => {
                const isSelected = selectedRepo?.id === repo.id;
                return (
                  <div
                    key={repo.id}
                    onClick={() => {
                      setSelectedRepo(repo);
                      setSelectedBranch(repo.defaultBranch);
                    }}
                    className={`p-4 border-3 border-ink cursor-pointer transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-ink text-paper shadow-[4px_4px_0_0_#FF2D00]'
                        : 'bg-white text-ink hover:bg-paper/60 shadow-[3px_3px_0_0_#0A0A0A]'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="font-bold text-sm flex items-center gap-2">
                        <span>{repo.name}</span>
                        {isSelected && <span className="text-signal text-xs">★ SELECTED</span>}
                      </div>
                      <div className="text-[11px] opacity-75 flex items-center gap-3">
                        <span>Detected: <strong className="underline">{repo.language}</strong></span>
                        <span>•</span>
                        <span>{repo.loc}</span>
                        <span>•</span>
                        <span>{repo.files} files</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <span className="px-2 py-1 border border-current text-[10px] uppercase font-bold">
                        Branch: {repo.defaultBranch}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* STEP 2: TARGET LANGUAGE & PIPELINE CONFIGURATION */}
        <div className="border-3 border-ink bg-white p-6 shadow-[6px_6px_0_0_#0A0A0A] space-y-6 font-mono text-xs">
          <div className="flex items-center justify-between border-b-2 border-ink pb-3 font-display">
            <h2 className="font-bold text-lg uppercase text-ink flex items-center gap-2">
              <span className="w-6 h-6 bg-ink text-paper text-xs flex items-center justify-center font-mono font-bold">2</span>
              Configure Target Modern Language &amp; Strategy
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Target Language Selection */}
            <div className="space-y-2">
              <label className="font-bold uppercase text-ink block">Target Language</label>
              <div className="grid grid-cols-2 gap-2">
                {['Go', 'Rust', 'TypeScript', 'Python'].map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setTargetLang(lang)}
                    className={`py-3 px-4 border-2 border-ink font-bold uppercase transition-all ${
                      targetLang === lang
                        ? 'bg-signal text-white shadow-[3px_3px_0_0_#0A0A0A]'
                        : 'bg-paper text-ink hover:bg-white'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Translation Strategy Selection */}
            <div className="space-y-2">
              <label className="font-bold uppercase text-ink block">LLM Pipeline Mode</label>
              <div className="space-y-2">
                <label
                  onClick={() => setStrategy('equivalence')}
                  className={`p-3 border-2 border-ink block cursor-pointer transition-all ${
                    strategy === 'equivalence' ? 'bg-ink text-paper shadow-[3px_3px_0_0_#FF2D00]' : 'bg-paper text-ink'
                  }`}
                >
                  <div className="font-bold uppercase">Strict Equivalence Verification</div>
                  <div className="text-[10px] opacity-75 mt-0.5">Line-by-line AST state verification with zero regressions.</div>
                </label>
                <label
                  onClick={() => setStrategy('fast')}
                  className={`p-3 border-2 border-ink block cursor-pointer transition-all ${
                    strategy === 'fast' ? 'bg-ink text-paper shadow-[3px_3px_0_0_#FF2D00]' : 'bg-paper text-ink'
                  }`}
                >
                  <div className="font-bold uppercase">Fast Translation Pipeline</div>
                  <div className="text-[10px] opacity-75 mt-0.5">High-speed conversion for quick proof of concept audits.</div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <div className="border-3 border-ink bg-white p-6 shadow-[6px_6px_0_0_#0A0A0A] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-mono text-xs text-concrete">
            Ready to convert <strong className="text-ink">{selectedRepo?.name}</strong> ({selectedRepo?.language}) → <strong className="text-signal">{targetLang}</strong>
          </div>

          <button
            type="submit"
            disabled={isLaunching}
            className="w-full sm:w-auto px-8 py-4 border-3 border-ink bg-ink text-paper font-display font-bold text-xs uppercase tracking-wider hover:bg-signal hover:border-signal hover:text-white transition-all shadow-[5px_5px_0_0_#0A0A0A] cursor-pointer disabled:opacity-50"
          >
            {isLaunching ? 'INITIALIZING PIPELINE...' : 'LAUNCH MODERNIZATION PIPELINE →'}
          </button>
        </div>

      </form>
    </div>
  );
}
