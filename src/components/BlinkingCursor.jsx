export default function BlinkingCursor({ className = '' }) {
  return (
    <span
      className={`inline-block w-[0.6em] h-[1em] bg-current ml-1 align-middle animate-blink ${className}`}
      aria-hidden="true"
    />
  );
}
