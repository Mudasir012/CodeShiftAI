import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GithubIcon, GitlabIcon } from './BrandIcons';

export default function QuickConnectWidget() {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [provider, setProvider] = useState('github');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const navigate = useNavigate();

  const handleConnect = (e) => {
    e.preventDefault();
    if (!url.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
      setTimeout(() => {
        setOpen(false);
        setDone(false);
        setUrl('');
        navigate('/new-job');
      }, 1200);
    }, 1800);
  };

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-ink/20 backdrop-blur-[1px]"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Widget */}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-2">
        {open && (
          <div className="border-3 border-ink bg-white shadow-[6px_6px_0_0_#0A0A0A] p-5 w-72 animate-fade-slide-in">
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs font-bold uppercase text-ink">Quick Connect Repo</span>
              <button
                onClick={() => setOpen(false)}
                className="font-mono text-xs text-concrete hover:text-signal"
              >
                ✕
              </button>
            </div>

            {done ? (
              <div className="text-center py-4 font-mono text-xs text-green-600 font-bold">
                <div className="text-2xl mb-2">✓</div>
                Repo connected! Opening pipeline...
              </div>
            ) : (
              <form onSubmit={handleConnect} className="space-y-3">
                {/* Provider selector */}
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'github', Icon: GithubIcon, label: 'GitHub' },
                    { id: 'gitlab', Icon: GitlabIcon, label: 'GitLab' },
                  ].map(({ id, Icon, label }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setProvider(id)}
                      className={`p-2.5 border-2 border-ink font-mono text-[10px] font-bold uppercase flex items-center justify-center gap-2 transition-colors ${
                        provider === id
                          ? 'bg-ink text-paper'
                          : 'bg-paper text-ink hover:bg-paper/70'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {label}
                    </button>
                  ))}
                </div>

                {/* URL input */}
                <div>
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder={`https://${provider}.com/org/repo`}
                    className="w-full px-3 py-2.5 border-2 border-ink bg-paper font-mono text-xs focus:outline-none focus:border-signal placeholder:text-concrete/60"
                    autoFocus
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || !url.trim()}
                  className="w-full py-2.5 border-2 border-ink bg-ink text-paper font-mono text-xs font-bold uppercase hover:bg-signal hover:border-signal transition-colors disabled:opacity-50"
                >
                  {loading ? 'Connecting...' : 'Connect & Launch →'}
                </button>
              </form>
            )}
          </div>
        )}

        {/* FAB button */}
        <button
          onClick={() => setOpen((o) => !o)}
          title="Quick connect a repository"
          className={`flex items-center gap-2 px-4 py-3 border-3 border-ink font-mono text-xs font-bold uppercase shadow-[3px_3px_0_0_#0A0A0A] transition-all active:shadow-none active:translate-x-0.5 active:translate-y-0.5 ${
            open
              ? 'bg-signal border-signal text-white'
              : 'bg-white text-ink hover:bg-ink hover:text-paper'
          }`}
        >
          <span className="text-lg leading-none">{open ? '✕' : '+'}</span>
          <span>{open ? 'Cancel' : 'Connect Repo'}</span>
        </button>
      </div>
    </>
  );
}
