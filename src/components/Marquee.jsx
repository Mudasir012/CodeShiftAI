export default function Marquee({ items, direction = 'left', speed = '30s', className = '' }) {
  const content = items.join(' / ');
  return (
    <div className={`overflow-hidden whitespace-nowrap border-y-3 border-ink bg-ink text-paper py-2 ${className}`}>
      <div
        className={`inline-flex animate-marquee-${direction}`}
        style={{ '--marquee-duration': speed }}
      >
        <span className="font-mono text-xs uppercase tracking-[0.08em] px-4">{content}</span>
        <span className="font-mono text-xs uppercase tracking-[0.08em] px-4">{content}</span>
        <span className="font-mono text-xs uppercase tracking-[0.08em] px-4">{content}</span>
        <span className="font-mono text-xs uppercase tracking-[0.08em] px-4">{content}</span>
      </div>
    </div>
  );
}
