import { useState } from 'react';
import { Link } from 'react-router-dom';

const MOCK_JOBS = [
  {
    id: 'JOB-9421',
    repo: 'acme-corp/core-banking-cobol',
    branch: 'main',
    source: 'COBOL 85',
    target: 'Go 1.22',
    progress: 85,
    status: 'IN_PROGRESS',
    loc: '850,000 LOC',
    startedAt: '2026-08-09 22:14:00',
    diffPreview: {
      sourceFile: 'ACCOUNT-BAL.CBL',
      sourceCode: `000100 IDENTIFICATION DIVISION.\n000200 PROGRAM-ID. COMPUTE-INTEREST.\n000300 DATA DIVISION.\n000400 WORKING-STORAGE SECTION.\n000500 01 WS-BAL PIC 9(7)V99 VALUE 15000.00.\n000600 01 WS-RATE PIC V99 VALUE 0.05.`,
      targetFile: 'account_bal.go',
      targetCode: `package banking\n\ntype Account struct {\n\tBalance  float64\n\tInterest float64\n}\n\nfunc (a *Account) ComputeInterest(rate float64) float64 {\n\treturn a.Balance * rate\n}`,
    },
  },
  {
    id: 'JOB-9420',
    repo: 'fintech/fortran-risk-model',
    branch: 'v2.1-stable',
    source: 'Fortran 77',
    target: 'Python 3.12',
    progress: 100,
    status: 'COMPLETED',
    loc: '420,000 LOC',
    startedAt: '2026-08-09 18:30:00',
    diffPreview: {
      sourceFile: 'RISKMAT.FOR',
      sourceCode: `      PROGRAM RISKMAT\n      REAL A(100,100), B(100,100)\n      DO 10 I = 1, 100\n        DO 10 J = 1, 100\n          A(I,J) = I * 1.5 + J\n10    CONTINUE`,
      targetFile: 'risk_mat.py',
      targetCode: `import numpy as np\n\ndef calculate_risk_matrix(rows: int = 100, cols: int = 100) -> np.ndarray:\n    i = np.arange(1, rows + 1)[:, None]\n    j = np.arange(1, cols + 1)[None, :]\n    return i * 1.5 + j`,
    },
  },
  {
    id: 'JOB-9419',
    repo: 'health/mumps-patient-db',
    branch: 'master',
    source: 'MUMPS',
    target: 'Rust 1.78',
    progress: 100,
    status: 'COMPLETED',
    loc: '640,000 LOC',
    startedAt: '2026-08-08 14:10:00',
    diffPreview: {
      sourceFile: 'PATREC.MPS',
      sourceCode: `S ^PATIENT(101)="DOE^JOHN^19800101"\nS ^PATIENT(101,"MEDS",1)="ASPIRIN"`,
      targetFile: 'patient_rec.rs',
      targetCode: `#[derive(Debug, Serialize, Deserialize)]\npub struct Patient {\n    pub id: u64,\n    pub last_name: String,\n    pub first_name: String,\n    pub dob: String,\n    pub medications: Vec<String>,\n}`,
    },
  },
];

export default function JobsPage() {
  const [selectedJob, setSelectedJob] = useState(MOCK_JOBS[0]);
  const [activeTab, setActiveTab] = useState('diff'); // 'diff' | 'logs'
  const [filterLang, setFilterLang] = useState('ALL');

  const filteredJobs = MOCK_JOBS.filter((j) => {
    if (filterLang === 'ALL') return true;
    return j.source.toUpperCase().includes(filterLang);
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 bg-paper">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b-3 border-ink pb-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-signal font-bold uppercase">
            <Link to="/dashboard" className="hover:underline text-concrete">&lt; Dashboard</Link>
            <span>/</span>
            <span># TRANSFORMATION_JOBS</span>
          </div>
          <h1 className="text-3xl font-display font-bold uppercase text-ink mt-1">
            Modernization Pipelines
          </h1>
        </div>

        <Link
          to="/new-job"
          className="px-5 py-3 border-3 border-ink bg-ink text-paper font-display font-bold text-xs uppercase hover:bg-signal hover:border-signal transition-colors shadow-[4px_4px_0_0_#0A0A0A]"
        >
          + New Pipeline Job
        </Link>
      </div>

      {/* Main Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Job List */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Filters */}
          <div className="border-3 border-ink bg-white p-4 shadow-[4px_4px_0_0_#0A0A0A] font-mono text-xs flex items-center justify-between">
            <span className="font-bold text-ink uppercase">Filter Source:</span>
            <div className="flex gap-1">
              {['ALL', 'COBOL', 'FORTRAN', 'MUMPS'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setFilterLang(lang)}
                  className={`px-2.5 py-1 border border-ink font-bold text-[10px] uppercase transition-colors ${
                    filterLang === lang ? 'bg-ink text-paper' : 'bg-paper text-ink hover:bg-white'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* Job List Cards */}
          <div className="space-y-3 font-mono text-xs">
            {filteredJobs.map((job) => {
              const isSelected = selectedJob.id === job.id;
              return (
                <div
                  key={job.id}
                  onClick={() => setSelectedJob(job)}
                  className={`p-4 border-3 border-ink cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-ink text-paper shadow-[5px_5px_0_0_#FF2D00]'
                      : 'bg-white text-ink hover:bg-paper/60 shadow-[4px_4px_0_0_#0A0A0A]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold">{job.id}</span>
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold uppercase border ${
                        job.status === 'COMPLETED'
                          ? 'border-green-400 text-green-400 bg-black'
                          : 'border-signal text-signal bg-black animate-pulse'
                      }`}
                    >
                      {job.status}
                    </span>
                  </div>

                  <div className="font-bold text-sm mb-1">{job.repo}</div>
                  <div className="text-[11px] opacity-75 mb-3">
                    {job.source} → {job.target} • {job.loc}
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px]">
                      <span>PROGRESS:</span>
                      <span>{job.progress}%</span>
                    </div>
                    <div className="w-full bg-paper border border-current h-2">
                      <div
                        className="h-full bg-signal transition-all duration-300"
                        style={{ width: `${job.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Code Diff & Inspection Workspace */}
        <div className="lg:col-span-7 border-3 border-ink bg-white p-6 shadow-[6px_6px_0_0_#0A0A0A] space-y-6 flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between border-b-3 border-ink pb-4 mb-4 font-mono text-xs">
              <div>
                <span className="font-bold text-signal text-sm block">{selectedJob.id} / {selectedJob.repo}</span>
                <span className="text-concrete text-[11px]">Started: {selectedJob.startedAt}</span>
              </div>

              {/* Tabs */}
              <div className="flex border-2 border-ink">
                <button
                  onClick={() => setActiveTab('diff')}
                  className={`px-3 py-1 font-bold uppercase ${
                    activeTab === 'diff' ? 'bg-ink text-paper' : 'bg-paper text-ink'
                  }`}
                >
                  Code Diff
                </button>
                <button
                  onClick={() => setActiveTab('logs')}
                  className={`px-3 py-1 font-bold uppercase ${
                    activeTab === 'logs' ? 'bg-ink text-paper' : 'bg-paper text-ink'
                  }`}
                >
                  AST Logs
                </button>
              </div>
            </div>

            {/* Code Diff Display */}
            {activeTab === 'diff' ? (
              <div className="space-y-4 font-mono text-xs">
                {/* Source Legacy File */}
                <div className="border-2 border-ink bg-ink text-paper p-3 shadow-[3px_3px_0_0_#0A0A0A]">
                  <div className="text-[11px] text-signal font-bold pb-2 border-b border-paper/15 mb-2 flex items-center justify-between">
                    <span>LEGACY SOURCE: {selectedJob.diffPreview.sourceFile} ({selectedJob.source})</span>
                    <span className="text-paper/40">[READONLY]</span>
                  </div>
                  <pre className="overflow-x-auto text-[11px] leading-relaxed text-paper/90 whitespace-pre">
                    {selectedJob.diffPreview.sourceCode}
                  </pre>
                </div>

                {/* Converted Target File */}
                <div className="border-2 border-ink bg-white text-ink p-3 shadow-[3px_3px_0_0_#0033FF]">
                  <div className="text-[11px] text-hyper font-bold pb-2 border-b border-ink/15 mb-2 flex items-center justify-between">
                    <span>CONVERTED TARGET: {selectedJob.diffPreview.targetFile} ({selectedJob.target})</span>
                    <span className="text-green-600 font-bold">✓ AST VERIFIED</span>
                  </div>
                  <pre className="overflow-x-auto text-[11px] leading-relaxed text-ink font-bold whitespace-pre">
                    {selectedJob.diffPreview.targetCode}
                  </pre>
                </div>
              </div>
            ) : (
              /* AST Logs View */
              <div className="border-2 border-ink bg-ink text-green-400 p-4 font-mono text-xs space-y-2 h-[320px] overflow-y-auto">
                <p className="text-paper/50">[2026-08-09T22:14:02Z] $ codeshift-parser --source={selectedJob.source} --target={selectedJob.target}</p>
                <p>[2026-08-09T22:14:03Z] &gt; Parsing AST tree for {selectedJob.diffPreview.sourceFile}...</p>
                <p>[2026-08-09T22:14:05Z] &gt; 4,120 nodes constructed successfully.</p>
                <p>[2026-08-09T22:14:08Z] &gt; Generating behavioral test fixtures in {selectedJob.target}...</p>
                <p className="text-signal">[2026-08-09T22:14:12Z] &gt; Equivalence Check: 100% assertions passed. Zero side effects.</p>
              </div>
            )}
          </div>

          {/* Action Bar */}
          <div className="pt-4 border-t-2 border-ink flex items-center justify-between font-mono text-xs">
            <span className="text-concrete">Status: {selectedJob.status}</span>
            <button
              onClick={() => alert(`Downloading converted code bundle for ${selectedJob.repo}...`)}
              className="px-5 py-2.5 border-2 border-ink bg-ink text-paper font-bold uppercase hover:bg-signal hover:border-signal transition-colors shadow-[3px_3px_0_0_#0A0A0A] cursor-pointer"
            >
              Download {selectedJob.target.split(' ')[0]} Package ↓
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
