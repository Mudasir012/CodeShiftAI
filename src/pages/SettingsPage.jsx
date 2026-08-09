import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GithubIcon, GitlabIcon, BitbucketIcon } from '../components/BrandIcons';

export default function SettingsPage() {
  const [githubToken, setGithubToken] = useState('ghp_************************************');
  const [gitlabToken, setGitlabToken] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8 bg-paper">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b-3 border-ink pb-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-signal font-bold uppercase">
            <Link to="/dashboard" className="hover:underline text-concrete">&lt; Dashboard</Link>
            <span>/</span>
            <span># SETTINGS_AND_PROVIDERS</span>
          </div>
          <h1 className="text-3xl font-display font-bold uppercase text-ink mt-1">
            Platform Settings
          </h1>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* GIT PROVIDER INTEGRATIONS */}
        <div className="border-3 border-ink bg-white p-6 shadow-[6px_6px_0_0_#0A0A0A] space-y-6">
          <div className="border-b-2 border-ink pb-3">
            <h2 className="font-display font-bold text-lg uppercase text-ink">
              Connected Git Providers
            </h2>
            <p className="font-mono text-xs text-concrete">
              Connect your code hosts to allow CodeShiftAI to fetch legacy repositories and open modernization pull requests.
            </p>
          </div>

          <div className="space-y-4 font-mono text-xs">
            {/* GitHub Card */}
            <div className="p-4 border-3 border-ink bg-paper flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-[3px_3px_0_0_#0A0A0A]">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-ink text-paper border-2 border-ink">
                  <GithubIcon className="w-6 h-6" />
                </div>
                <div>
                  <span className="font-bold text-sm text-ink block">GitHub</span>
                  <span className="text-[11px] text-green-600 font-bold">CONNECTED (@muda-org)</span>
                </div>
              </div>

              <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-2">
                <input
                  type="password"
                  value={githubToken}
                  onChange={(e) => setGithubToken(e.target.value)}
                  className="px-3 py-2 border-2 border-ink bg-white text-xs font-mono w-full sm:w-64 focus:outline-none focus:border-signal"
                />
                <button
                  type="button"
                  onClick={() => alert('GitHub Token Updated')}
                  className="px-4 py-2 border-2 border-ink bg-ink text-paper font-bold uppercase hover:bg-signal transition-colors shrink-0 cursor-pointer"
                >
                  Update Token
                </button>
              </div>
            </div>

            {/* GitLab Card */}
            <div className="p-4 border-3 border-ink bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-[3px_3px_0_0_#0A0A0A]">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-orange-600 text-white border-2 border-ink">
                  <GitlabIcon className="w-6 h-6" />
                </div>
                <div>
                  <span className="font-bold text-sm text-ink block">GitLab</span>
                  <span className="text-[11px] text-concrete">Not connected</span>
                </div>
              </div>

              <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-2">
                <input
                  type="password"
                  placeholder="glpat-********************"
                  value={gitlabToken}
                  onChange={(e) => setGitlabToken(e.target.value)}
                  className="px-3 py-2 border-2 border-ink bg-paper text-xs font-mono w-full sm:w-64 focus:outline-none focus:border-signal"
                />
                <button
                  type="button"
                  onClick={() => alert('GitLab Connected')}
                  className="px-4 py-2 border-2 border-ink bg-signal text-white font-bold uppercase hover:bg-ink transition-colors shrink-0 cursor-pointer"
                >
                  Connect GitLab
                </button>
              </div>
            </div>

            {/* Bitbucket Card */}
            <div className="p-4 border-3 border-ink bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 opacity-75 shadow-[3px_3px_0_0_#0A0A0A]">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-600 text-white border-2 border-ink">
                  <BitbucketIcon className="w-6 h-6" />
                </div>
                <div>
                  <span className="font-bold text-sm text-ink block">Bitbucket Server</span>
                  <span className="text-[11px] text-concrete">Enterprise Addon</span>
                </div>
              </div>

              <button
                type="button"
                className="px-4 py-2 border-2 border-ink bg-paper text-ink font-bold uppercase hover:bg-white transition-colors cursor-pointer"
              >
                Request Enterprise Access
              </button>
            </div>
          </div>
        </div>

        {/* CODESHIFT API KEYS */}
        <div className="border-3 border-ink bg-white p-6 shadow-[6px_6px_0_0_#0A0A0A] space-y-4 font-mono text-xs">
          <div className="border-b-2 border-ink pb-3 font-display">
            <h2 className="font-bold text-lg uppercase text-ink">CodeShiftAI API Key</h2>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-paper p-4 border-2 border-ink">
            <code className="text-signal font-bold tracking-wider">cs_live_94820a194bc021894a</code>
            <button
              type="button"
              onClick={() => navigator.clipboard.writeText('cs_live_94820a194bc021894a')}
              className="px-4 py-2 border-2 border-ink bg-ink text-paper font-bold uppercase hover:bg-signal transition-colors cursor-pointer"
            >
              Copy API Key
            </button>
          </div>
        </div>

        {/* SAVE BUTTON */}
        <div className="flex items-center justify-between border-t-3 border-ink pt-6">
          {saved ? (
            <span className="font-mono text-xs text-green-600 font-bold">✓ Settings saved successfully.</span>
          ) : (
            <span className="font-mono text-xs text-concrete">All tokens are encrypted with AES-256.</span>
          )}

          <button
            type="submit"
            className="px-8 py-3.5 border-3 border-ink bg-ink text-paper font-display font-bold text-xs uppercase hover:bg-signal hover:border-signal transition-colors shadow-[4px_4px_0_0_#0A0A0A] cursor-pointer"
          >
            Save Settings
          </button>
        </div>

      </form>
    </div>
  );
}
