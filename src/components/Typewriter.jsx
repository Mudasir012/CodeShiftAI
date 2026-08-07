import { useState, useEffect } from 'react';

export default function Typewriter({ text, delay = 50, className = '', cursor = true }) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), 300);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) return;
    const timeout = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1));
    }, delay);
    return () => clearTimeout(timeout);
  }, [started, displayed, text, delay]);

  return (
    <span className={className}>
      {displayed}
      {cursor && (
        <span
          className="inline-block w-[0.5em] h-[1em] bg-current ml-1 align-middle animate-blink"
          aria-hidden="true"
        />
      )}
    </span>
  );
}
