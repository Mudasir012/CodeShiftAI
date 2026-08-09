import { useEffect, useRef, useState } from 'react';

// Syntax token types and their colors
const TOKEN_COLORS = {
  keyword:  '#FF2D00',
  string:   '#00AAFF',
  comment:  '#888888',
  number:   '#FF9900',
  type:     '#AA44FF',
  normal:   'inherit',
};

// Simple tokenizer for display
function tokenize(line) {
  const keywords = ['if', 'else', 'for', 'while', 'return', 'IDENTIFICATION', 'DIVISION', 'PROCEDURE', 'PERFORM', 'MOVE', 'TO', 'fn', 'let', 'mut', 'use', 'pub', 'struct', 'impl', 'async', 'await'];
  const types    = ['i32', 'u64', 'String', 'Vec', 'Option', 'Result', 'bool', 'f64'];
  const tokens   = [];
  const words    = line.split(/(\s+|[{}()[\].,;:])/);

  for (const word of words) {
    if (!word) continue;
    if (word.startsWith('*') || word.startsWith('//')) {
      tokens.push({ text: word, type: 'comment' });
    } else if (/^".*"$/.test(word) || /^'.*'$/.test(word)) {
      tokens.push({ text: word, type: 'string' });
    } else if (/^\d+$/.test(word)) {
      tokens.push({ text: word, type: 'number' });
    } else if (keywords.includes(word.trim())) {
      tokens.push({ text: word, type: 'keyword' });
    } else if (types.includes(word.trim())) {
      tokens.push({ text: word, type: 'type' });
    } else {
      tokens.push({ text: word, type: 'normal' });
    }
  }
  return tokens;
}

const BEFORE_CODE = [
  '       IDENTIFICATION DIVISION.',
  '       PROGRAM-ID. ACCT-BALANCE.',
  '       PROCEDURE DIVISION.',
  '       MAIN-LOGIC.',
  '           MOVE 0 TO WS-BALANCE',
  '           PERFORM FETCH-RECORDS',
  '               UNTIL END-OF-FILE',
  '           DISPLAY "BALANCE: " WS-BALANCE',
  '           STOP RUN.',
  '       FETCH-RECORDS.',
  '           READ ACCOUNT-FILE',
  '               AT END SET END-OF-FILE TO TRUE',
  '           ADD ACCT-AMT TO WS-BALANCE.',
];

const AFTER_CODE = [
  'use std::fs::File;',
  'use std::io::{BufRead, BufReader};',
  '',
  'fn main() {',
  '    let balance = calc_balance("acct.dat");',
  '    println!("BALANCE: {}", balance);',
  '}',
  '',
  'fn calc_balance(path: &str) -> f64 {',
  '    let file = File::open(path).unwrap();',
  '    BufReader::new(file)',
  '        .lines()',
  '        .filter_map(|l| l.ok()?.parse::<f64>().ok())',
  '        .sum()',
  '}',
];

function CodePane({ title, lang, lines, highlight, delay = 0 }) {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      setVisible(i);
      if (i >= lines.length) clearInterval(id);
    }, 60 + delay);
    return () => clearInterval(id);
  }, [lines.length, delay]);

  return (
    <div className="flex-1 min-w-0 border-3 border-ink bg-[#0D1117] overflow-hidden shadow-[4px_4px_0_0_#0A0A0A]">
      {/* Pane header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#161B22] border-b border-[#30363D] font-mono text-xs">
        <span className="text-[#8B949E]">{title}</span>
        <span className="px-2 py-0.5 border border-[#30363D] text-[10px] font-bold uppercase text-[#8B949E]">{lang}</span>
      </div>
      {/* Code lines */}
      <div className="p-4 font-mono text-xs overflow-x-auto min-h-[280px]">
        {lines.map((line, i) => {
          const tokens = tokenize(line);
          const isHighlighted = highlight?.includes(i);
          const isVisible = i < visible;
          return (
            <div
              key={i}
              className={`flex items-start gap-3 leading-6 transition-all duration-200 ${
                isVisible ? 'opacity-100' : 'opacity-0'
              } ${isHighlighted ? 'bg-yellow-500/10 -mx-4 px-4 border-l-2 border-yellow-400' : ''}`}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <span className="text-[#3B434B] select-none shrink-0 w-5 text-right">{i + 1}</span>
              <span className="text-[#E6EDF3] whitespace-pre">
                {tokens.map((tok, j) => (
                  <span key={j} style={{ color: TOKEN_COLORS[tok.type] }}>{tok.text}</span>
                ))}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function CodeDiffViewer({ className = '' }) {
  const [key, setKey] = useState(0);

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Label bar */}
      <div className="flex items-center justify-between font-mono text-xs">
        <div className="flex items-center gap-3">
          <span className="px-2 py-1 bg-signal text-white font-bold uppercase text-[10px]">BEFORE</span>
          <span className="text-concrete">acct_balance.cbl (COBOL 85)</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-concrete">acct_balance.rs (Rust)</span>
          <span className="px-2 py-1 bg-hyper text-white font-bold uppercase text-[10px]">AFTER</span>
        </div>
        <button
          onClick={() => setKey((k) => k + 1)}
          className="hidden sm:block px-3 py-1 border-2 border-ink font-mono text-[10px] uppercase font-bold hover:bg-ink hover:text-paper transition-colors"
        >
          ↺ Replay
        </button>
      </div>

      {/* Split panes */}
      <div key={key} className="flex gap-3 overflow-hidden">
        <CodePane
          title="before: acct_balance.cbl"
          lang="COBOL"
          lines={BEFORE_CODE}
          highlight={[4, 5, 6, 7]}
          delay={0}
        />
        {/* Arrow divider */}
        <div className="hidden md:flex items-center justify-center shrink-0">
          <div className="flex flex-col items-center gap-1 font-mono text-signal font-bold">
            <span className="text-xl">→</span>
            <span className="text-[10px] uppercase rotate-90 whitespace-nowrap">transform</span>
          </div>
        </div>
        <CodePane
          title="after: acct_balance.rs"
          lang="RUST"
          lines={AFTER_CODE}
          highlight={[9, 10, 11, 12, 13]}
          delay={300}
        />
      </div>

      {/* Stats bar */}
      <div className="flex flex-wrap gap-4 font-mono text-[11px] px-1">
        <span className="text-signal font-bold">-13 lines COBOL</span>
        <span className="text-hyper font-bold">+15 lines Rust</span>
        <span className="text-concrete">• Behavioral equivalence: 99.8%</span>
        <span className="text-concrete">• 0 regressions detected</span>
      </div>
    </div>
  );
}
