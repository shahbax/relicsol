// Brand-themed hero artifact for each service page. Pure SVG + CSS so it is
// lightweight (no Three.js on service pages), fully responsive (scales with
// its container via viewBox), and respects prefers-reduced-motion through the
// keyframes defined in globals.css. Each service gets a distinct motif inside
// a shared frame that echoes the homepage look (orange gradient, orbital ring).

type Props = { slug: string };

const ACCENT = '#F97316';
const ACCENT_LIGHT = '#FFAD5C';

// `gl` prefixes the gradient/glow ids so they stay unique per service.
function Frame({ children, gl }: { children: React.ReactNode; gl: string }) {
  return (
    <svg
      viewBox="0 0 440 440"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-hidden
      style={{ width: '100%', height: 'auto', maxWidth: 440, display: 'block' }}
    >
      <defs>
        <linearGradient id={`${gl}-accent`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={ACCENT} />
          <stop offset="1" stopColor="#C2410C" />
        </linearGradient>
        <radialGradient id={`${gl}-glow`} cx="0.5" cy="0.42" r="0.55">
          <stop offset="0" stopColor={ACCENT} stopOpacity="0.35" />
          <stop offset="1" stopColor={ACCENT} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Ambient glow */}
      <circle cx="220" cy="200" r="200" fill={`url(#${gl}-glow)`} />

      {/* Orbital rings — echo the homepage icosahedron */}
      <g className="rl-art-orbit" style={{ transformOrigin: '220px 220px' }}>
        <ellipse cx="220" cy="220" rx="200" ry="78" fill="none" stroke={ACCENT} strokeOpacity="0.22" strokeWidth="1.5" />
        <ellipse cx="220" cy="220" rx="150" ry="150" fill="none" stroke={ACCENT} strokeOpacity="0.12" strokeWidth="1.5" />
      </g>

      {/* Floating motif */}
      <g className="rl-art-float">{children}</g>
    </svg>
  );
}

function WebDesignMotif() {
  return (
    <g>
      {/* Browser window */}
      <rect x="118" y="120" width="204" height="150" rx="12" fill="#111111" stroke="#262626" strokeWidth="2" />
      <rect x="118" y="120" width="204" height="30" rx="12" fill="#161616" stroke="#262626" strokeWidth="2" />
      <circle cx="136" cy="135" r="4" fill="#F97316" />
      <circle cx="152" cy="135" r="4" fill="#3f3f46" />
      <circle cx="168" cy="135" r="4" fill="#3f3f46" />
      {/* Layout blocks */}
      <rect x="134" y="166" width="80" height="48" rx="6" fill="url(#web-accent)" opacity="0.9" />
      <rect x="224" y="166" width="82" height="12" rx="4" fill="#3f3f46" />
      <rect x="224" y="186" width="60" height="10" rx="4" fill="#2a2a2a" />
      <rect x="224" y="202" width="70" height="10" rx="4" fill="#2a2a2a" />
      <rect x="134" y="228" width="172" height="10" rx="4" fill="#2a2a2a" />
      <rect x="134" y="246" width="120" height="10" rx="4" fill="#2a2a2a" />
      {/* Floating chip */}
      <g className="rl-art-chip">
        <rect x="286" y="96" width="72" height="40" rx="8" fill="#0f0f0f" stroke={ACCENT} strokeWidth="1.5" />
        <rect x="298" y="108" width="18" height="16" rx="3" fill={ACCENT} />
        <rect x="322" y="110" width="26" height="5" rx="2.5" fill="#52525b" />
        <rect x="322" y="120" width="18" height="5" rx="2.5" fill="#3f3f46" />
      </g>
    </g>
  );
}

function SoftwareMotif() {
  return (
    <g>
      {/* Terminal window */}
      <rect x="112" y="122" width="216" height="150" rx="12" fill="#0d0d0d" stroke="#262626" strokeWidth="2" />
      <rect x="112" y="122" width="216" height="28" rx="12" fill="#161616" stroke="#262626" strokeWidth="2" />
      <circle cx="130" cy="136" r="4" fill="#F97316" />
      <circle cx="146" cy="136" r="4" fill="#3f3f46" />
      {/* Code lines with prompt carets */}
      <text x="128" y="176" fontFamily="monospace" fontSize="13" fill={ACCENT}>&gt;</text>
      <rect x="142" y="167" width="70" height="8" rx="4" fill="#52525b" />
      <rect x="218" y="167" width="40" height="8" rx="4" fill={ACCENT} opacity="0.8" />
      <text x="128" y="198" fontFamily="monospace" fontSize="13" fill={ACCENT}>&gt;</text>
      <rect x="142" y="189" width="48" height="8" rx="4" fill="#3f3f46" />
      <rect x="196" y="189" width="86" height="8" rx="4" fill="#52525b" />
      <text x="128" y="220" fontFamily="monospace" fontSize="13" fill={ACCENT}>&gt;</text>
      <rect x="142" y="211" width="100" height="8" rx="4" fill="#3f3f46" />
      <rect x="142" y="233" width="60" height="8" rx="4" fill={ACCENT_LIGHT} opacity="0.6" />
      <rect x="142" y="233" width="6" height="8" rx="3" fill={ACCENT} className="rl-art-caret" />
      {/* Floating braces node */}
      <g className="rl-art-chip">
        <circle cx="330" cy="110" r="26" fill="#0f0f0f" stroke={ACCENT} strokeWidth="1.5" />
        <text x="330" y="118" fontFamily="monospace" fontSize="22" fill={ACCENT} textAnchor="middle" fontWeight="700">{'{}'}</text>
      </g>
    </g>
  );
}

function AiMotif() {
  const nodes = [
    { x: 120, y: 140 },
    { x: 110, y: 250 },
    { x: 200, y: 320 },
    { x: 330, y: 300 },
    { x: 340, y: 150 },
    { x: 250, y: 110 }
  ];
  return (
    <g>
      {/* Links to centre */}
      <g stroke={ACCENT} strokeOpacity="0.4" strokeWidth="1.5" fill="none">
        {nodes.map((n, i) => (
          <line key={i} x1="220" y1="220" x2={n.x} y2={n.y} />
        ))}
      </g>
      {/* Outer nodes */}
      <g fill={ACCENT}>
        {nodes.map((n, i) => (
          <circle key={i} cx={n.x} cy={n.y} r={i % 2 ? 8 : 11} opacity={0.55 + (i % 3) * 0.15} />
        ))}
      </g>
      {/* Pulsing halo + central core */}
      <circle cx="220" cy="220" r="42" fill="none" stroke={ACCENT} strokeOpacity="0.35" strokeWidth="1.5" className="rl-art-pulse" style={{ transformOrigin: '220px 220px' }} />
      <circle cx="220" cy="220" r="30" fill="url(#ai-accent)" />
      <circle cx="220" cy="220" r="30" fill="none" stroke={ACCENT_LIGHT} strokeOpacity="0.5" strokeWidth="2" />
      <circle cx="212" cy="212" r="5" fill="#fff" opacity="0.85" />
    </g>
  );
}

function SeoMotif() {
  const bars = [
    { x: 132, h: 60 },
    { x: 168, h: 92 },
    { x: 204, h: 128 },
    { x: 240, h: 168 }
  ];
  return (
    <g>
      {/* Rising bars */}
      {bars.map((b, i) => (
        <rect
          key={i}
          x={b.x}
          y={272 - b.h}
          width="26"
          height={b.h}
          rx="5"
          fill={i === bars.length - 1 ? 'url(#seo-accent)' : ACCENT}
          opacity={0.4 + i * 0.2}
        />
      ))}
      {/* Baseline */}
      <rect x="120" y="274" width="200" height="2" rx="1" fill="#262626" />
      {/* Trend arrow */}
      <path d="M128 210 L176 178 L212 150 L296 96" fill="none" stroke={ACCENT_LIGHT} strokeWidth="4" strokeLinecap="round" />
      <path d="M296 96 l-30 4 20 22 z" fill={ACCENT_LIGHT} />
      {/* Magnifier over the top bar */}
      <g className="rl-art-chip">
        <circle cx="288" cy="176" r="30" fill="#0f0f0f" fillOpacity="0.85" stroke={ACCENT} strokeWidth="3" />
        <circle cx="288" cy="176" r="14" fill="none" stroke={ACCENT_LIGHT} strokeWidth="2.5" />
        <line x1="309" y1="197" x2="322" y2="210" stroke={ACCENT} strokeWidth="5" strokeLinecap="round" />
      </g>
    </g>
  );
}

const MOTIFS: Record<string, { gl: string; Motif: () => JSX.Element }> = {
  'web-design-development': { gl: 'web', Motif: WebDesignMotif },
  'software-development': { gl: 'sw', Motif: SoftwareMotif },
  'ai-automation': { gl: 'ai', Motif: AiMotif },
  'seo-services': { gl: 'seo', Motif: SeoMotif }
};

export function ServiceHeroArt({ slug }: Props) {
  const { gl, Motif } = MOTIFS[slug] ?? MOTIFS['web-design-development'];
  return (
    <div className="rl-service-art" aria-hidden>
      <Frame gl={gl}>
        <Motif />
      </Frame>
    </div>
  );
}
