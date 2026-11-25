import { ArtPart } from "./parts";

type FigProps = {
  explode: boolean;
  selected: string | null;
  onSelect: (id: string) => void;
};

const leafPath = "M0 0 C 22 -14 52 -12 74 2 C 52 16 22 16 0 0 Z";

export function PogonatumFigure({ explode, selected, onSelect }: FigProps) {
  const leaves = [200, 232, 264, 296, 328, 360, 392, 418];
  return (
    <svg viewBox="0 0 680 540" className="h-full w-full">
      <defs>
        <linearGradient id="pg-stem" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#65a30d" />
          <stop offset="100%" stopColor="#3f6212" />
        </linearGradient>
        <linearGradient id="pg-leaf" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
      </defs>

      <ellipse cx="330" cy="470" rx="150" ry="16" fill="#0b1a16" opacity="0.6" />

      <ArtPart
        id="pogonatum-rhizoid"
        {...{ explode, selected, onSelect }}
        dy={58}
        label="රයිසොයිඩ්"
        labelX={330}
        labelY={452}
      >
        {[-46, -24, -6, 14, 34, 52].map((o, i) => (
          <path
            key={i}
            d={`M${326 + o * 0.2} 424 C ${322 + o} 448, ${318 + o * 1.7} 470, ${314 + o * 2} 494`}
            stroke="#84cc16"
            strokeWidth={1.8}
            fill="none"
            opacity={0.8}
          />
        ))}
      </ArtPart>

      <ArtPart
        id="pogonatum-stem"
        {...{ explode, selected, onSelect }}
        dy={48}
        label="කඳ"
        labelX={352}
        labelY={322}
        anchor="start"
      >
        <path
          d="M318 426 C 315 356 316 262 320 186 L 330 186 C 334 262 335 356 332 426 Z"
          fill="url(#pg-stem)"
        />
        <path d="M320 300 L 326 300" stroke="#a3e635" strokeWidth={1} opacity={0.4} />
      </ArtPart>

      <ArtPart
        id="pogonatum-leaf"
        {...{ explode, selected, onSelect }}
        dx={-150}
        dy={6}
        label="පත්‍ර"
        labelX={348}
        labelY={148}
      >
        {leaves.map((y, i) => {
          const right = i % 2 === 0;
          const len = 0.72 + (i % 3) * 0.12;
          return (
            <g
              key={y}
              transform={`translate(${right ? 326 : 322} ${y}) ${right ? "" : "scale(-1,1)"} rotate(${-26 + (i % 4) * 9}) scale(${len})`}
            >
              <path d={leafPath} fill="url(#pg-leaf)" opacity={0.95} />
              <path d="M4 0 C 26 -4 48 -3 68 1" stroke="#14532d" strokeWidth={1} fill="none" opacity={0.55} />
            </g>
          );
        })}
      </ArtPart>

      <ArtPart
        id="pogonatum-seta"
        {...{ explode, selected, onSelect }}
        dx={92}
        dy={-26}
        label="සිට"
        labelX={338}
        labelY={110}
      >
        <path d="M324 188 C 324 150 326 118 328 88" stroke="#d9f99d" strokeWidth={3.2} fill="none" />
        <path d="M324 188 C 324 150 326 118 328 88" stroke="#4d7c0f" strokeWidth={1} fill="none" />
      </ArtPart>

      <ArtPart
        id="pogonatum-capsule"
        {...{ explode, selected, onSelect }}
        dx={148}
        dy={-14}
        label="කැප්සියුලය"
        labelX={366}
        labelY={64}
        anchor="start"
      >
        <ellipse cx="328" cy="62" rx="24" ry="34" fill="#a16207" />
        <ellipse cx="328" cy="62" rx="24" ry="34" fill="url(#pg-leaf)" opacity={0.25} />
        <path d="M304 70 Q328 82 352 70" stroke="#78350f" strokeWidth={1.5} fill="none" />
        <path d="M304 58 Q328 46 352 58" stroke="#713f12" strokeWidth={1.2} fill="none" opacity={0.7} />
        <ellipse cx="328" cy="28" rx="18" ry="7" fill="#365314" />
        <path d="M310 26 L 346 26" stroke="#a3e635" strokeWidth={2} />
      </ArtPart>

      <g opacity={0.6}>
        <line x1="120" y1="470" x2="120" y2="180" stroke="#1e293b" strokeWidth={1} strokeDasharray="3 4" />
        <text x="128" y="470" fontSize={9} fill="#475569">පස් මට්ටම</text>
      </g>
    </svg>
  );
}

export function NephrolepisFigure({ explode, selected, onSelect }: FigProps) {
  const fronds = [
    { x: 300, rot: -18, scale: 1, id: "main" },
    { x: 250, rot: -52, scale: 0.74, id: "left" },
    { x: 380, rot: 24, scale: 0.8, id: "right" },
  ];
  return (
    <svg viewBox="0 0 680 540" className="h-full w-full">
      <defs>
        <linearGradient id="np-frond" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#166534" />
          <stop offset="100%" stopColor="#4ade80" />
        </linearGradient>
        <linearGradient id="np-rhizome" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#78350f" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
      </defs>

      <ellipse cx="330" cy="480" rx="170" ry="14" fill="#0b1a16" opacity="0.55" />

      <ArtPart
        id="nephrolepis-root"
        {...{ explode, selected, onSelect }}
        dy={58}
        label="මුල්"
        labelX={468}
        labelY={430}
        anchor="start"
      >
        {[210, 250, 300, 350, 400, 440].map((x, i) => (
          <path
            key={x}
            d={`M${x} 424 C ${x + (i % 2 ? 12 : -12)} 448, ${x + (i % 2 ? 20 : -18)} 462, ${x + (i % 2 ? 26 : -22)} 486`}
            stroke="#a3a3a3"
            strokeWidth={1.8}
            fill="none"
            opacity={0.75}
          />
        ))}
      </ArtPart>

      <ArtPart
        id="nephrolepis-rhizome"
        {...{ explode, selected, onSelect }}
        dy={58}
        label="රයිසෝමය"
        labelX={330}
        labelY={446}
      >
        <path
          d="M190 410 C 250 394 410 394 476 410 C 484 424 470 436 440 440 C 380 448 250 448 200 438 C 184 432 182 418 190 410 Z"
          fill="url(#np-rhizome)"
        />
        {[230, 268, 306, 344, 382, 420].map((x) => (
          <path key={x} d={`M${x} 402 L ${x + 6} 432`} stroke="#78350f" strokeWidth={1} opacity={0.6} />
        ))}
      </ArtPart>

      <ArtPart
        id="nephrolepis-frond"
        {...{ explode, selected, onSelect }}
        dx={120}
        dy={-26}
        label="ෆ්‍රොන්ඩය"
        labelX={300}
        labelY={104}
        anchor="start"
      >
        {fronds.map((f) => (
          <g key={f.id} transform={`translate(${f.x} 408) rotate(${f.rot}) scale(${f.scale})`}>
            <path d="M0 0 C 4 -110 6 -200 8 -288" stroke="#166534" strokeWidth={2.4} fill="none" />
            {Array.from({ length: 13 }).map((_, i) => {
              const y = -34 - i * 19;
              const len = 46 - i * 1.6;
              return (
                <g key={i}>
                  <path
                    d={`M6 ${y} C ${24} ${y - 9} ${6 + len} ${y - 6} ${6 + len} ${y + 4} C ${6 + len * 0.6} ${y + 12} 20 ${y + 8} 6 ${y} Z`}
                    fill="url(#np-frond)"
                    opacity={0.92}
                  />
                  <path
                    d={`M6 ${y + 1} C ${20} ${y - 4} ${30} ${y - 2} ${6 + len} ${y + 3}`}
                    stroke="#065f46"
                    strokeWidth={0.8}
                    fill="none"
                    opacity={0.6}
                  />
                </g>
              );
            })}
            <path d="M8 -288 C 8 -300 12 -312 10 -320" stroke="#22c55e" strokeWidth={2} fill="none" />
          </g>
        ))}
      </ArtPart>

      <ArtPart
        id="nephrolepis-sorus"
        {...{ explode, selected, onSelect }}
        dx={-160}
        dy={-84}
        label="සෝරස්"
        labelX={302}
        labelY={252}
        anchor="start"
      >
        <circle cx="352" cy="236" r="26" fill="#0b1220" stroke="#2dd4bf" strokeWidth={1.2} opacity={0.95} />
        <circle cx="352" cy="236" r="26" fill="#78350f" opacity={0.18} />
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          return (
            <circle
              key={i}
              cx={352 + Math.cos(a) * (8 + (i % 3) * 4)}
              cy={236 + Math.sin(a) * (7 + (i % 2) * 4)}
              r={2.4}
              fill="#d97706"
            />
          );
        })}
        <path d="M330 216 L 300 190" stroke="#2dd4bf" strokeWidth={1} strokeDasharray="3 3" />
        <text x="298" y="184" fontSize={9} fill="#94a3b8" textAnchor="end">
          ස්පෝරංගියා පොකුර
        </text>
      </ArtPart>
    </svg>
  );
}
