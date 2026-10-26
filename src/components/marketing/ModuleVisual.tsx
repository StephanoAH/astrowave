const grid = (
  <g opacity=".28">
    {Array.from({ length: 11 }, (_, i) => (
      <line key={`v${i}`} x1={10 + i * 24} y1="8" x2={10 + i * 24} y2="94" stroke="#314156" strokeWidth=".5" />
    ))}
    {Array.from({ length: 5 }, (_, i) => (
      <line key={`h${i}`} x1="8" y1={12 + i * 20} x2="252" y2={12 + i * 20} stroke="#314156" strokeWidth=".5" />
    ))}
  </g>
);

export function ModuleVisual({ id }: { id: string }) {
  const content = {
    tracking: (
      <>
        <circle cx="130" cy="54" r="33" fill="#0b1e30" stroke="#22d3ee" strokeOpacity=".3" />
        <circle cx="130" cy="54" r="21" fill="none" stroke="#64748b" strokeOpacity=".25" />
        <path className="visual-radar" d="M130 54 L130 19 A35 35 0 0 1 158 75 Z" fill="#22d3ee" opacity=".13" />
        <g className="visual-tracked-object">
          <circle cx="153" cy="35" r="3" fill="#c4b5fd" />
          <circle cx="153" cy="35" r="7" fill="none" stroke="#c4b5fd" strokeOpacity=".35" />
        </g>
      </>
    ),
    orbits: (
      <g className="visual-precession" transform="translate(130 52)">
        {[0, 1, 2, 3].map((i) => (
          <ellipse
            key={i}
            rx={36 + i * 14}
            ry={12 + i * 5}
            fill="none"
            stroke={i === 2 ? "#22d3ee" : "#8b5cf6"}
            strokeOpacity={0.2 + i * 0.1}
            transform={`rotate(${i * 22})`}
            strokeDasharray={i % 2 ? "3 5" : undefined}
          />
        ))}
        <circle r="11" fill="#10263d" stroke="#22d3ee" strokeOpacity=".35" />
      </g>
    ),
    passes: (
      <>
        <path d="M18 80 Q130 -5 242 80" fill="none" stroke="#334155" />
        <path className="visual-pass-arc" d="M18 80 Q130 -5 242 80" fill="none" stroke="#22d3ee" strokeWidth="2" pathLength="1" />
        <line x1="18" y1="80" x2="242" y2="80" stroke="#475569" />
        <g className="visual-pass-sat">
          <rect x="-5" y="-3" width="10" height="6" rx="1" fill="#dbeafe" />
          <path d="M-14 -2 H-5 M5 -2 H14" stroke="#8b5cf6" strokeWidth="4" />
        </g>
      </>
    ),
    freq: (
      <>
        {[0, 1, 2].map((i) => (
          <path
            key={i}
            className={`visual-frequency visual-frequency-${i}`}
            d={`M0 ${35 + i * 15} C20 ${5 + i * 15} 40 ${65 + i * 15} 60 ${35 + i * 15} S100 ${5 + i * 15} 120 ${35 + i * 15} S160 ${65 + i * 15} 180 ${35 + i * 15} S220 ${5 + i * 15} 260 ${35 + i * 15}`}
            fill="none"
            stroke={i === 1 ? "#22d3ee" : "#8b5cf6"}
            strokeOpacity={i === 1 ? ".85" : ".32"}
            strokeWidth={i === 1 ? "2" : "1"}
          />
        ))}
      </>
    ),
    antennas: (
      <>
        <path d="M130 86 V61 M112 86 H148" stroke="#94a3b8" strokeWidth="2" />
        <path d="M108 59 Q130 78 152 59" fill="#0c2535" stroke="#22d3ee" strokeWidth="2" />
        <circle cx="130" cy="57" r="3" fill="#d8fbff" />
        {[0, 1, 2].map((i) => (
          <path
            key={i}
            className="visual-antenna-pulse"
            style={{ animationDelay: `${i * 0.62}s` }}
            d="M130 55 Q98 33 80 10 M130 55 Q162 33 180 10"
            fill="none"
            stroke="#8b5cf6"
            strokeOpacity=".65"
          />
        ))}
      </>
    ),
    sdr: (
      <>
        {Array.from({ length: 28 }, (_, i) => {
          const h = 10 + ((i * 19) % 54);
          return <rect key={i} x={7 + i * 9} y={82 - h} width="5" height={h} fill={i % 5 === 0 ? "#8b5cf6" : "#22d3ee"} opacity={0.18 + (i % 4) * 0.14} />;
        })}
        <rect className="visual-sdr-scan" x="0" y="8" width="260" height="3" fill="#d8fbff" opacity=".7" />
      </>
    ),
    dsp: (
      <>
        <path d="M22 52 H238" stroke="#334155" strokeWidth="2" />
        {["IQ", "FIR", "FFT", "DEMOD"].map((label, i) => (
          <g key={label} transform={`translate(${45 + i * 57} 52)`}>
            <rect x="-20" y="-15" width="40" height="30" rx="4" fill="#0c1728" stroke="#53637c" strokeOpacity=".7" />
            <text y="3" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="monospace">{label}</text>
          </g>
        ))}
        <circle className="visual-dsp-packet" cx="22" cy="52" r="4" fill="#22d3ee" />
      </>
    ),
    doppler: (
      <>
        <path d="M0 52 C12 8 24 96 36 52 S60 8 72 52 S96 96 108 52 S132 8 144 52 S174 82 189 52 S225 30 260 52" fill="none" stroke="#334155" />
        <path className="visual-doppler-wave" d="M0 52 C12 8 24 96 36 52 S60 8 72 52 S96 96 108 52 S132 8 144 52 S174 82 189 52 S225 30 260 52" fill="none" stroke="#22d3ee" strokeWidth="2" pathLength="1" />
        <g className="visual-doppler-marker">
          <line y1="12" y2="90" stroke="#c4b5fd" strokeOpacity=".55" />
          <circle cy="52" r="4" fill="#c4b5fd" />
        </g>
      </>
    ),
    telemetry: (
      <>
        {Array.from({ length: 9 }, (_, i) => (
          <g key={i} className="visual-telemetry-bit" style={{ animationDelay: `${i * 0.18}s` }}>
            <rect x={16 + i * 27} y={22 + (i % 3) * 17} width="18" height="10" rx="2" fill={i % 2 ? "#22d3ee" : "#8b5cf6"} opacity=".55" />
            <text x={25 + i * 27} y={30 + (i % 3) * 17} textAnchor="middle" fill="#e2e8f0" fontSize="6" fontFamily="monospace">{i % 2}</text>
          </g>
        ))}
        <path d="M10 84 H250" stroke="#334155" />
        <rect className="visual-telemetry-progress" x="10" y="82" width="70" height="3" fill="#22d3ee" />
      </>
    ),
    weather: (
      <>
        <circle cx="130" cy="51" r="33" fill="#0d2940" stroke="#22d3ee" strokeOpacity=".3" />
        <g className="visual-clouds" fill="none" stroke="#bdefff" strokeOpacity=".55">
          <path d="M101 44 Q112 33 124 43 Q137 29 149 43 Q160 43 161 53 H100 Q94 48 101 44Z" />
          <path d="M107 65 Q119 55 132 64 Q145 51 156 65" />
        </g>
        <path className="visual-weather-scan" d="M92 51 H168" stroke="#8b5cf6" strokeWidth="2" />
      </>
    ),
    recording: (
      <>
        <circle className="visual-reel visual-reel-a" cx="83" cy="50" r="27" fill="#0c1728" stroke="#22d3ee" strokeOpacity=".55" />
        <circle className="visual-reel visual-reel-b" cx="177" cy="50" r="27" fill="#0c1728" stroke="#8b5cf6" strokeOpacity=".55" />
        {[83, 177].map((cx) => (
          <g key={cx}>
            <circle cx={cx} cy="50" r="5" fill="#94a3b8" />
            <circle cx={cx + 11} cy="50" r="4" fill="#334155" />
            <circle cx={cx - 6} cy="40" r="4" fill="#334155" />
            <circle cx={cx - 6} cy="60" r="4" fill="#334155" />
          </g>
        ))}
        <path d="M110 61 Q130 73 150 61" fill="none" stroke="#c4b5fd" strokeOpacity=".6" />
      </>
    ),
    automation: (
      <>
        <path d="M42 50 H95 M115 50 H165 M185 50 H226 M105 42 V20 M175 58 V82" stroke="#475569" strokeDasharray="3 4" />
        {[[35, 50], [105, 50], [105, 16], [175, 50], [175, 86], [232, 50]].map(([x, y], i) => (
          <g key={i} className="visual-auto-node" style={{ animationDelay: `${i * 0.3}s` }}>
            <circle cx={x} cy={y} r="9" fill="#0c1728" stroke={i % 2 ? "#8b5cf6" : "#22d3ee"} />
            <circle cx={x} cy={y} r="2" fill="#d8fbff" />
          </g>
        ))}
      </>
    ),
  }[id];

  return (
    <svg viewBox="0 0 260 100" className="h-full w-full" aria-hidden>
      {grid}
      {content}
    </svg>
  );
}
