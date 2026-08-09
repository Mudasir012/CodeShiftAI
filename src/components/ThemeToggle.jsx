import { useState } from 'react';
import { useTheme, THEMES } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [showMenu, setShowMenu] = useState(false);

  const current = THEMES.find((t) => t.id === theme) || THEMES[0];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Theme picker menu */}
      {showMenu && (
        <div className="border-3 border-ink bg-white shadow-[4px_4px_0_0_#0A0A0A] overflow-hidden animate-fade-slide-in">
          {THEMES.map((t) => (
            <button
              key={t.id}
              onClick={() => { setTheme(t.id); setShowMenu(false); }}
              className={`w-full px-4 py-2.5 font-mono text-xs font-bold uppercase flex items-center gap-3 transition-colors border-b border-ink/10 last:border-0 ${
                theme === t.id
                  ? 'bg-ink text-paper'
                  : 'text-ink hover:bg-paper/60'
              }`}
            >
              <span className="text-base">{t.icon}</span>
              {t.label}
              {theme === t.id && <span className="ml-auto text-signal">✓</span>}
            </button>
          ))}
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setShowMenu((s) => !s)}
        title={`Theme: ${current.label}`}
        className="w-12 h-12 border-3 border-ink bg-white shadow-[3px_3px_0_0_#0A0A0A] font-mono text-lg flex items-center justify-center hover:bg-signal hover:text-white hover:border-signal transition-all active:shadow-none active:translate-x-0.5 active:translate-y-0.5"
      >
        {current.icon}
      </button>
    </div>
  );
}
