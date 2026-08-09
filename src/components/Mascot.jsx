import { useState, useEffect, useRef } from 'react';

export default function Mascot({
  isCoveringEyes = false,
  mode = 'home', // 'home' | 'login' | 'dashboard' | 'jobs' | 'new-job' | 'audit'
  className = '',
}) {
  const containerRef = useRef(null);
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current || isCoveringEyes) return;

      const rect = containerRef.current.getBoundingClientRect();
      const mascotCenterX = rect.left + rect.width / 2;
      const mascotCenterY = rect.top + rect.height / 2;

      const dx = e.clientX - mascotCenterX;
      const dy = e.clientY - mascotCenterY;

      const distance = Math.hypot(dx, dy);
      const maxOffset = 7; // Maximum pupil offset distance in px

      if (distance === 0) {
        setPupilOffset({ x: 0, y: 0 });
      } else {
        const clampedDist = Math.min(distance, 300);
        const ratio = (clampedDist / 300) * maxOffset;
        const angle = Math.atan2(dy, dx);

        setPupilOffset({
          x: Math.cos(angle) * ratio,
          y: Math.sin(angle) * ratio,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isCoveringEyes]);

  // Mode badge labels & colors
  const getBadgeText = () => {
    if (isCoveringEyes) return 'SECURE_MODE: EYES_SHIELDED';
    switch (mode) {
      case 'dashboard': return 'COPILOT_MODE: ACTIVE';
      case 'jobs': return 'ANALYZER: PARSING';
      case 'new-job': return 'LAUNCHER: READY';
      case 'audit': return 'SECURITY: MONITORED';
      case 'login': return 'AUTH_GATE: WAITING';
      default: return 'BOT_STATUS: ACTIVE';
    }
  };

  const getAntennaColor = () => {
    if (isCoveringEyes) return '#FF2D00';
    if (mode === 'audit') return '#22C55E';
    if (mode === 'dashboard') return '#0033FF';
    return '#FF2D00';
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative select-none flex flex-col items-center justify-center ${className}`}
      aria-label="CodeShiftAI Mascot ShiftBot"
    >
      {/* Status Tooltip badge */}
      <div className="mb-2 px-2.5 py-1 bg-ink text-paper font-mono text-[10px] tracking-wider uppercase border-2 border-ink shadow-[2px_2px_0_0_#0A0A0A] flex items-center gap-1.5 transition-transform duration-200 hover:scale-105">
        <span
          className={`w-2 h-2 rounded-full ${
            isCoveringEyes
              ? 'bg-signal animate-pulse'
              : mode === 'audit'
              ? 'bg-green-400'
              : 'bg-signal'
          }`}
        />
        <span>{getBadgeText()}</span>
      </div>

      <svg
        width="180"
        height="180"
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[4px_4px_0px_#0A0A0A] transition-transform duration-300 hover:scale-[1.02]"
      >
        {/* Antenna */}
        <line x1="80" y1="28" x2="80" y2="12" stroke="#0A0A0A" strokeWidth="4" />
        <circle
          cx="80"
          cy="8"
          r="6"
          fill={getAntennaColor()}
          stroke="#0A0A0A"
          strokeWidth="3"
          className="transition-colors duration-300"
        />
        <circle
          cx="80"
          cy="8"
          r="10"
          fill="none"
          stroke={getAntennaColor()}
          strokeWidth="1.5"
          opacity="0.5"
          className="animate-ping"
          style={{ animationDuration: '2s' }}
        />

        {/* MODE SPECIFIC ACCESSORIES */}
        {/* Dashboard Mode: Mini Copilot Headset */}
        {mode === 'dashboard' && (
          <path d="M 28 32 C 28 14, 132 14, 132 32" stroke="#0033FF" strokeWidth="5" fill="none" strokeLinecap="round" />
        )}

        {/* New Job Mode: Mini Wrench Icon */}
        {mode === 'new-job' && (
          <g transform="translate(118, 12)">
            <rect x="0" y="0" width="16" height="16" rx="2" fill="#FF2D00" stroke="#0A0A0A" strokeWidth="2" />
            <path d="M 4 4 L 12 12 M 12 4 L 4 12" stroke="#FFFFFF" strokeWidth="2" />
          </g>
        )}

        {/* Side Ears / Connectors */}
        <rect x="14" y="58" width="10" height="24" rx="2" fill="#FF2D00" stroke="#0A0A0A" strokeWidth="3" />
        <rect x="136" y="58" width="10" height="24" rx="2" fill="#FF2D00" stroke="#0A0A0A" strokeWidth="3" />

        {/* Main Head Box */}
        <rect
          x="22"
          y="28"
          width="116"
          height="100"
          rx="8"
          fill="#E8E8E8"
          stroke="#0A0A0A"
          strokeWidth="4"
        />

        {/* Inner Visor Display */}
        <rect
          x="32"
          y="42"
          width="96"
          height="48"
          rx="6"
          fill={mode === 'audit' ? '#05190E' : '#0A0A0A'}
          stroke="#0A0A0A"
          strokeWidth="2"
        />

        {/* EYES SECTION */}
        {isCoveringEyes ? (
          /* Shy / Shut eyes when password is focused */
          <g>
            <path d="M 44 64 L 56 64 M 50 58 L 50 70" stroke="#FF2D00" strokeWidth="4" strokeLinecap="round" />
            <path d="M 104 64 L 116 64 M 110 58 L 110 70" stroke="#FF2D00" strokeWidth="4" strokeLinecap="round" />
            <path d="M 132 40 Q 134 46 130 48 Q 126 46 128 40 Z" fill="#0033FF" stroke="#0A0A0A" strokeWidth="1.5" />
          </g>
        ) : mode === 'audit' ? (
          /* Audit Mode: Matrix Scanner Display */
          <g>
            <rect x="42" y="50" width="28" height="32" rx="4" fill="#0A2912" stroke="#22C55E" strokeWidth="2" />
            <rect x="90" y="50" width="28" height="32" rx="4" fill="#0A2912" stroke="#22C55E" strokeWidth="2" />
            <line x1="34" y1="66" x2="126" y2="66" stroke="#22C55E" strokeWidth="2" strokeDasharray="4 2" />
            <circle cx="56" cy="66" r="4" fill="#22C55E" />
            <circle cx="104" cy="66" r="4" fill="#22C55E" />
          </g>
        ) : (
          /* Standard Active Eye Sockets & Pupils tracking cursor */
          <g>
            <rect x="42" y="50" width="28" height="32" rx="4" fill="#1A1A1A" stroke="#FF2D00" strokeWidth="2" />
            <rect x="90" y="50" width="28" height="32" rx="4" fill="#1A1A1A" stroke="#FF2D00" strokeWidth="2" />

            {/* Left Pupil */}
            <g transform={`translate(${pupilOffset.x}, ${pupilOffset.y})`}>
              <rect x="48" y="56" width="16" height="20" rx="3" fill="#FF2D00" />
              <rect x="51" y="58" width="6" height="8" rx="1" fill="#FFFFFF" />
            </g>

            {/* Right Pupil */}
            <g transform={`translate(${pupilOffset.x}, ${pupilOffset.y})`}>
              <rect x="96" y="56" width="16" height="20" rx="3" fill="#FF2D00" />
              <rect x="99" y="58" width="6" height="8" rx="1" fill="#FFFFFF" />
            </g>
          </g>
        )}

        {/* Mouth / LED Indicator */}
        <g>
          {isCoveringEyes ? (
            <path d="M 64 104 Q 72 108 80 104 Q 88 100 96 104" stroke="#0A0A0A" strokeWidth="3" fill="none" strokeLinecap="round" />
          ) : isHovered ? (
            <path d="M 62 100 Q 80 114 98 100" fill="#FF2D00" stroke="#0A0A0A" strokeWidth="3" />
          ) : (
            <g>
              <path d="M 60 98 L 68 103 L 60 108" stroke="#0A0A0A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="74" y1="108" x2="86" y2="108" stroke="#FF2D00" strokeWidth="3" strokeLinecap="round" />
              <circle cx="96" cy="104" r="3" fill="#0033FF" />
            </g>
          )}
        </g>

        {/* Chest Plate Detail */}
        <rect x="52" y="118" width="56" height="10" rx="2" fill="#0A0A0A" />
        <text x="56" y="125" fill="#E8E8E8" fontFamily="monospace" fontSize="7" fontWeight="bold">CODESHIFT</text>

        {/* ATTACHED ROBOTIC ARMS - Rotates smoothly at fixed shoulder pivot without detaching */}
        {/* Left Arm */}
        <g
          className="transition-transform duration-500 ease-out"
          style={{
            transform: isCoveringEyes ? 'rotate(-130deg)' : mode === 'home' && isHovered ? 'rotate(-25deg)' : 'rotate(0deg)',
            transformOrigin: '24px 105px',
          }}
        >
          {/* Shoulder Joint Pivot (Fixed to body) */}
          <circle cx="24" cy="105" r="5" fill="#0A0A0A" />
          {/* Attached Arm Segment */}
          <path d="M 24 105 L 14 135" stroke="#0A0A0A" strokeWidth="5" strokeLinecap="round" />
          {/* Glove */}
          <rect x="2" y="130" width="22" height="20" rx="4" fill="#FF2D00" stroke="#0A0A0A" strokeWidth="3" />
          <line x1="9" y1="135" x2="9" y2="145" stroke="#0A0A0A" strokeWidth="2" />
          <line x1="16" y1="135" x2="16" y2="145" stroke="#0A0A0A" strokeWidth="2" />
        </g>

        {/* Right Arm */}
        <g
          className="transition-transform duration-500 ease-out"
          style={{
            transform: isCoveringEyes ? 'rotate(130deg)' : 'rotate(0deg)',
            transformOrigin: '136px 105px',
          }}
        >
          {/* Shoulder Joint Pivot (Fixed to body) */}
          <circle cx="136" cy="105" r="5" fill="#0A0A0A" />
          {/* Attached Arm Segment */}
          <path d="M 136 105 L 146 135" stroke="#0A0A0A" strokeWidth="5" strokeLinecap="round" />
          {/* Glove */}
          <rect x="136" y="130" width="22" height="20" rx="4" fill="#FF2D00" stroke="#0A0A0A" strokeWidth="3" />
          <line x1="143" y1="135" x2="143" y2="145" stroke="#0A0A0A" strokeWidth="2" />
          <line x1="150" y1="135" x2="150" y2="145" stroke="#0A0A0A" strokeWidth="2" />
        </g>

      </svg>
    </div>
  );
}
