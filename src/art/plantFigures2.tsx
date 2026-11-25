import { ArtPart } from "./parts";

type FigProps = {
  explode: boolean;
  selected: string | null;
  onSelect: (id: string) => void;
};

const base = { explode: false, selected: null as string | null, onSelect: (_: string) => {} };

export function CycasFigure(props: FigProps) {
  const { explode, selected, onSelect } = props;
  const angles = [-72, -50, -28, -6, 16, 38];
  return (
    <svg viewBox="0 0 680 540" className="h-full w-full">
      <defs>
        <linearGradient id="cy-trunk" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#78350f" />
          <stop offset="55%" stopColor="#b45309" />
          <stop offset="100%" stopColor="#7c2d12" />
        </linearGradient>
        <linearGradient id="cy-leaf" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#14532d" />
          <stop offset="100%" stopColor="#4ade80" />
        </linearGradient>
        <radialGradient id="cy-cone">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </radialGradient>
      </defs>

      <ellipse cx="340" cy="452" rx="180" ry="16" fill="#0b1a16" opacity="0.55" />

      <ArtPart
        id="cycas-trunk"
        {...{ explode, selected, onSelect }}
        dy={54}
        label="කඳ"
        labelX={382}
        labelY={330}
        anchor="start"
      >
        <path d="M312 440 L 306 206 L 366 206 L 360 440 Z" fill="url(#cy-trunk)" />
        {Array.from({ length: 11 }).map((_, i) => (
          <path
            key={i}
            d={`M${309 + i * 0.2} ${228 + i * 19} L ${363 - i * 0.2} ${222 + i * 19}`}
            stroke="#451a03"
            strokeWidth={2}
            opacity={0.5}
          />
        ))}
      </ArtPart>

      <ArtPart
        id="cycas-leaf"
        {...{ explode, selected, onSelect }}
        dx={96}
        dy={-12}
        label="පත්‍ර"
        labelX={344}
        labelY={92}
        anchor="start"
      >
        {angles.map((a, i) => (
          <g key={a} transform={`translate(336 208) rotate(${a})`}>
            <path d="M0 0 C 0 -70 4 -120 8 -168" stroke="#166534" strokeWidth={2} fill="none" />
            {Array.from({ length: 11 }).map((_, j) => {
              const y = -18 - j * 14;
              const len = 42 - j * 2.2;
              return (
                <g key={j}>
                  <path
                    d={`M5 ${y} C 18 ${y - 6} ${5 + len} ${y - 4} ${5 + len} ${y + 2} C ${5 + len * 0.5} ${y + 7} 16 ${y + 6} 5 ${y} Z`}
                    fill="url(#cy-leaf)"
                    opacity={0.9 - i * 0.03}
                  />
                </g>
              );
            })}
          </g>
        ))}
      </ArtPart>

      <ArtPart
        id="cycas-cone"
        {...{ explode, selected, onSelect }}
        dx={-150}
        dy={-40}
        label="පුරුෂ කේතුව"
        labelX={256}
        labelY={196}
        anchor="start"
      >
        <ellipse cx="336" cy="170" rx="26" ry="46" fill="url(#cy-cone)" />
        {Array.from({ length: 7 }).map((_, i) => (
          <path
            key={i}
            d={`M${314 + (i % 2) * 3} ${136 + i * 11} Q336 ${146 + i * 11} ${358 - (i % 2) * 3} ${136 + i * 11}`}
            stroke="#78350f"
            strokeWidth={1.2}
            fill="none"
            opacity={0.7}
          />
        ))}
        <path d="M336 216 L 336 246" stroke="#a16207" strokeWidth={4} />
      </ArtPart>

      <ArtPart
        id="cycas-seed"
        {...{ explode, selected, onSelect }}
        dx={86}
        dy={16}
        label="බීජය"
        labelX={34}
        labelY={-34}
        anchor="start"
      >
        <circle cx="512" cy="392" r="40" fill="#0b1220" stroke="#2dd4bf" strokeWidth={1} opacity={0.9} />
        <ellipse cx="512" cy="392" rx="20" ry="26" fill="#fbbf24" />
        <ellipse cx="512" cy="392" rx="13" ry="18" fill="#fef3c7" />
        <path d="M512 366 L 512 418" stroke="#b45309" strokeWidth={1.4} />
        <path d="M498 378 C 512 372 526 378 526 392" stroke="#d97706" strokeWidth={2} fill="none" />
        <text x="512" y="442" fontSize={8.5} fill="#64748b" textAnchor="middle">
          නිදහස් බීජ · හැප්ලොයිඩ එන්ඩොස්පර්මය
        </text>
      </ArtPart>
    </svg>
  );
}

export function AngiospermFigure({
  kind,
  ...props
}: FigProps & { kind: "monocot" | "dicot" }) {
  const { explode, selected, onSelect } = props;
  const rootId = `${kind}-root`;
  const stemId = `${kind}-stem`;
  const leafId = `${kind}-leaf`;
  const flowerId = `${kind}-flower`;

  const petals = kind === "monocot" ? 6 : 5;

  return (
    <svg viewBox="0 0 680 540" className="h-full w-full">
      <defs>
        <linearGradient id={`${kind}-stem`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#166534" />
          <stop offset="100%" stopColor="#4ade80" />
        </linearGradient>
        <linearGradient id={`${kind}-leaf`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#15803d" />
          <stop offset="100%" stopColor="#86efac" />
        </linearGradient>
      </defs>

      <ellipse cx="330" cy="474" rx="160" ry="14" fill="#0b1a16" opacity="0.55" />

      <ArtPart
        id={rootId}
        {...{ explode, selected, onSelect }}
        dy={58}
        label="මුල්"
        labelX={470}
        labelY={458}
        anchor="start"
      >
        {kind === "monocot" ? (
          <g>
            {[-70, -45, -22, 0, 20, 42, 66].map((o, i) => (
              <path
                key={o}
                d={`M${330 + o * 0.25} 430 C ${330 + o * 0.7} 454, ${330 + o * 1.1} 476, ${330 + o * 1.35} ${494 - (i % 2) * 8}`}
                stroke="#a3a3a3"
                strokeWidth={1.6}
                fill="none"
                opacity={0.8}
              />
            ))}
          </g>
        ) : (
          <g>
            <path d="M330 430 C 332 458 330 486 330 512" stroke="#a16207" strokeWidth={7} fill="none" />
            {[-1, 1].map((s, i) => (
              <g key={s}>
                <path
                  d={`M331 ${452 + i * 18} C ${331 + s * 22} ${466 + i * 16}, ${331 + s * 34} ${482 + i * 12}, ${331 + s * 40} ${496 + i * 8}`}
                  stroke="#a16207"
                  strokeWidth={2.4}
                  fill="none"
                />
              </g>
            ))}
            {[-1, 1].map((s) => (
              <path
                key={s}
                d={`M${331 + s * 6} 468 C ${331 + s * 26} 474, ${331 + s * 44} 478, ${331 + s * 52} 486`}
                stroke="#78350f"
                strokeWidth={1.2}
                fill="none"
                opacity={0.7}
              />
            ))}
          </g>
        )}
      </ArtPart>

      <ArtPart
        id={stemId}
        {...{ explode, selected, onSelect }}
        dy={26}
        label="කඳ"
        labelX={302}
        labelY={344}
        anchor="end"
      >
        <path d="M316 438 C 314 380 316 320 320 262 L 338 262 C 342 320 344 380 342 438 Z" fill={`url(#${kind}-stem)`} />
        <circle cx="470" cy="330" r="42" fill="#07131f" stroke="#2dd4bf" strokeWidth={1.2} />
        <circle cx="470" cy="330" r="36" fill="none" stroke="#1e3a4a" strokeWidth={1} />
        {kind === "monocot"
          ? Array.from({ length: 16 }).map((_, i) => {
              const a = i * 2.4;
              const r = 6 + (i % 4) * 7;
              return (
                <ellipse
                  key={i}
                  cx={470 + Math.cos(a) * r}
                  cy={330 + Math.sin(a) * r}
                  rx={3}
                  ry={2.2}
                  fill={i % 2 ? "#38bdf8" : "#f472b6"}
                  opacity={0.9}
                />
              );
            })
          : Array.from({ length: 10 }).map((_, i) => {
              const a = (i / 10) * Math.PI * 2;
              const cx = 470 + Math.cos(a) * 24;
              const cy = 330 + Math.sin(a) * 24;
              return (
                <g key={i} transform={`translate(${cx} ${cy}) rotate(${(a * 180) / Math.PI + 90})`}>
                  <ellipse cx="0" cy="-3" rx="3.4" ry="2.2" fill="#38bdf8" />
                  <ellipse cx="0" cy="3" rx="3.4" ry="2.2" fill="#f472b6" />
                </g>
              );
            })}
        <text x="470" y="388" fontSize={8} fill="#64748b" textAnchor="middle">
          සංවහන කදම්භ කැපුම
        </text>
      </ArtPart>

      <ArtPart
        id={leafId}
        {...{ explode, selected, onSelect }}
        dx={-108}
        dy={4}
        label="පත්‍රය"
        labelX={330}
        labelY={186}
        anchor="start"
      >
        {kind === "monocot" ? (
          <g>
            <path d="M328 350 C 240 330 176 288 150 220 C 214 246 288 292 330 342 Z" fill={`url(#${kind}-leaf)`} />
            <path d="M328 320 C 256 300 198 260 170 206 C 226 240 284 278 330 314 Z" fill={`url(#${kind}-leaf)`} opacity={0.8} />
            {[0, 1, 2, 3, 4].map((i) => (
              <path
                key={i}
                d={`M${322 - i * 2} ${344 - i * 16} C ${266 - i * 4} ${320 - i * 14}, ${214 - i * 2} ${282 - i * 12}, ${176 - i} ${234 - i * 8}`}
                stroke="#14532d"
                strokeWidth={1}
                fill="none"
                opacity={0.6}
              />
            ))}
          </g>
        ) : (
          <g>
            <path d="M326 330 C 238 322 178 268 166 196 C 246 208 306 258 330 322 Z" fill={`url(#${kind}-leaf)`} />
            <path d="M326 330 C 246 296 202 240 190 190" stroke="#14532d" strokeWidth={1.6} fill="none" />
            {[0, 1, 2, 3, 4].map((i) => (
              <g key={i}>
                <path
                  d={`M${300 - i * 22} ${300 - i * 20} C ${272 - i * 18} ${286 - i * 20}, ${244 - i * 12} ${262 - i * 18}, ${226 - i * 8} ${230 - i * 12}`}
                  stroke="#166534"
                  strokeWidth={1}
                  fill="none"
                  opacity={0.55}
                />
                <path
                  d={`M${296 - i * 22} ${304 - i * 20} C ${278 - i * 14} ${316 - i * 16}, ${252 - i * 8} ${288 - i * 12}, ${238 - i * 4} ${252 - i * 8}`}
                  stroke="#166534"
                  strokeWidth={1}
                  fill="none"
                  opacity={0.45}
                />
              </g>
            ))}
          </g>
        )}
      </ArtPart>

      <ArtPart
        id={flowerId}
        {...{ explode, selected, onSelect }}
        dy={-78}
        label="මල"
        labelX={362}
        labelY={218}
        anchor="start"
      >
        <path d="M329 262 C 329 234 329 212 329 196" stroke="#22c55e" strokeWidth={3} fill="none" />
        {Array.from({ length: petals }).map((_, i) => {
          const a = (i / petals) * Math.PI * 2 - Math.PI / 2;
          return (
            <ellipse
              key={i}
              cx={329 + Math.cos(a) * 22}
              cy={172 + Math.sin(a) * 22}
              rx={11}
              ry={21}
              fill={kind === "monocot" ? "#fbbf24" : "#f472b6"}
              opacity={0.85}
              transform={`rotate(${(a * 180) / Math.PI + 90} ${329 + Math.cos(a) * 22} ${172 + Math.sin(a) * 22})`}
              stroke="#9d174d"
              strokeWidth={0.6}
            />
          );
        })}
        <circle cx="329" cy="172" r="9" fill="#fde68a" stroke="#b45309" strokeWidth={1} />
        {Array.from({ length: petals }).map((_, i) => {
          const a = (i / petals) * Math.PI * 2;
          return (
            <circle key={i} cx={329 + Math.cos(a) * 5} cy={172 + Math.sin(a) * 5} r={1.3} fill="#b45309" />
          );
        })}
      </ArtPart>
    </svg>
  );
}
