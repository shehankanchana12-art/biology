import { ArtPart } from "./parts";

type FigProps = {
  explode: boolean;
  selected: string | null;
  onSelect: (id: string) => void;
};

export function BacteriaFigure({ explode, selected, onSelect }: FigProps) {
  return (
    <svg viewBox="0 0 680 540" className="h-full w-full">
      <defs>
        <linearGradient id="bac-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0e7490" />
          <stop offset="100%" stopColor="#164e63" />
        </linearGradient>
      </defs>

      <ArtPart
        id="bacteria-wall"
        {...{ explode, selected, onSelect }}
        dy={54}
        label="සෛල බිත්තිය හා කැප්සියුලය"
        labelX={330}
        labelY={370}
      >
        <rect x="150" y="232" width="330" height="92" rx="46" fill="#38bdf8" opacity={0.12} />
        <rect x="160" y="240" width="310" height="76" rx="38" fill="url(#bac-body)" stroke="#38bdf8" strokeWidth={3.5} />
        <rect x="172" y="252" width="286" height="52" rx="26" fill="#082f49" stroke="#7dd3fc" strokeWidth={2} strokeDasharray="7 4" />
        <text x="330" y="352" fontSize={9} fill="#7dd3fc" textAnchor="middle">
          පෙප්ටිඩොග්ලයිකෑන් බිත්තිය + කැප්සියුලය
        </text>
      </ArtPart>

      <ArtPart
        id="bacteria-nucleoid"
        {...{ explode, selected, onSelect }}
        dx={-120}
        dy={-96}
        label="නියුක්ලියොයිඩය · ප්ලාස්මිඩය"
        labelX={236}
        labelY={206}
        anchor="start"
      >
        <path
          d="M248 278 C 268 254 300 300 322 274 C 342 250 366 296 386 274 C 402 258 414 282 424 270"
          stroke="#2dd4bf"
          strokeWidth={4}
          fill="none"
          strokeLinecap="round"
        />
        <ellipse cx="300" cy="308" rx="16" ry="10" fill="none" stroke="#5eead4" strokeWidth={2.4} />
        <ellipse cx="340" cy="312" rx="11" ry="7" fill="none" stroke="#5eead4" strokeWidth={2} />
        <circle cx="386" cy="258" r="2.4" fill="#fbbf24" />
        <circle cx="396" cy="262" r="2.4" fill="#fbbf24" />
        <circle cx="392" cy="252" r="2.4" fill="#fbbf24" />
        <text x="222" y="326" fontSize={8} fill="#64748b">වෘත්තාකාර DNA</text>
      </ArtPart>

      <ArtPart
        id="bacteria-flagellum"
        {...{ explode, selected, onSelect }}
        dx={126}
        dy={104}
        label="ෆ්ලැජෙලමය"
        labelX={492}
        labelY={344}
        anchor="start"
      >
        <path
          d="M470 282 C 500 246 528 318 558 282 C 580 256 600 292 618 272"
          stroke="#a5f3fc"
          strokeWidth={3.4}
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="470" cy="282" r="5" fill="#67e8f9" />
        <text x="490" y="330" fontSize={8.5} fill="#64748b">ෆ්ලැජෙලින් තන්තුව</text>
      </ArtPart>

      {[0, 1, 2, 3].map((i) => (
        <path
          key={i}
          d={`M${200 + i * 26} 240 C ${196 + i * 26} 224, ${204 + i * 26} 214, ${200 + i * 26} 204`}
          stroke="#7dd3fc"
          strokeWidth={1.4}
          opacity={0.55}
          fill="none"
        />
      ))}
    </svg>
  );
}

export function AmoebaFigure({ explode, selected, onSelect }: FigProps) {
  return (
    <svg viewBox="0 0 680 540" className="h-full w-full">
      <defs>
        <radialGradient id="amo-body">
          <stop offset="0%" stopColor="#134e4a" />
          <stop offset="100%" stopColor="#0f766e" />
        </radialGradient>
      </defs>

      <ArtPart
        id="amoeba-pseudopodium"
        {...{ explode, selected, onSelect }}
        dx={-88}
        dy={58}
        label="සියුඩොපෝඩියම"
        labelX={190}
        labelY={148}
        anchor="start"
      >
        <path
          d="M220 340 C 170 320 150 270 188 246 C 156 214 178 168 226 182 C 216 138 262 112 302 142 C 330 106 392 108 412 152 C 456 132 500 166 488 210 C 534 222 548 274 512 304 C 546 342 512 388 468 376 C 456 418 396 430 366 398 C 330 432 274 414 270 374 C 242 390 210 372 220 340 Z"
          fill="url(#amo-body)"
          stroke="#2dd4bf"
          strokeWidth={2.5}
          opacity={0.95}
        />
        <path d="M300 300 C 276 292 258 274 252 250" stroke="#5eead4" strokeWidth={1} fill="none" opacity={0.4} />
        <path d="M318 372 C 336 388 362 390 380 378" stroke="#5eead4" strokeWidth={1} fill="none" opacity={0.35} />
      </ArtPart>

      <ArtPart
        id="amoeba-nucleus"
        {...{ explode, selected, onSelect }}
        dx={-150}
        dy={-90}
        label="න්‍යෂ්ටිය"
        labelX={392}
        labelY={248}
        anchor="start"
      >
        <circle cx="336" cy="278" r="34" fill="#1e1b4b" stroke="#a78bfa" strokeWidth={2.5} />
        <circle cx="336" cy="278" r="24" fill="#312e81" opacity={0.9} />
        <circle cx="344" cy="270" r="8" fill="#c4b5fd" />
        <circle cx="326" cy="286" r="4" fill="#8b5cf6" opacity={0.8} />
      </ArtPart>

      <ArtPart
        id="amoeba-contractile-vacuole"
        {...{ explode, selected, onSelect }}
        dx={156}
        dy={76}
        label="සංකෝචක රික්තකය"
        labelX={470}
        labelY={352}
        anchor="start"
      >
        <circle cx="430" cy="292" r="26" fill="#082f49" stroke="#38bdf8" strokeWidth={2.5} />
        <circle cx="430" cy="292" r="18" fill="#0c4a6e" opacity={0.9} />
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i / 8) * Math.PI * 2;
          return (
            <path
              key={i}
              d={`M${430 + Math.cos(a) * 20} ${292 + Math.sin(a) * 20} L ${430 + Math.cos(a) * 32} ${292 + Math.sin(a) * 32}`}
              stroke="#7dd3fc"
              strokeWidth={2}
              opacity={0.8}
            />
          );
        })}
      </ArtPart>

      {[
        [270, 340, 12],
        [392, 340, 9],
      ].map(([x, y, r], i) => (
        <g key={i} opacity={0.7}>
          <circle cx={x} cy={y} r={r} fill="#365314" stroke="#a3e635" strokeWidth={1.4} />
          <circle cx={x + 3} cy={y} r={2} fill="#65a30d" />
        </g>
      ))}
      <text x="252" y="392" fontSize={8} fill="#64748b">ආහාර රික්තක</text>
    </svg>
  );
}

export function EuglenaFigure({ explode, selected, onSelect }: FigProps) {
  return (
    <svg viewBox="0 0 680 540" className="h-full w-full">
      <defs>
        <linearGradient id="eu-body" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#14532d" />
          <stop offset="100%" stopColor="#4ade80" />
        </linearGradient>
      </defs>

      <ArtPart
        id="euglena-flagellum"
        {...{ explode, selected, onSelect }}
        dx={36}
        dy={-118}
        label="ෆ්ලැජෙලමය"
        labelX={496}
        labelY={146}
        anchor="start"
      >
        <path
          d="M438 208 C 490 170 530 206 566 168 C 592 140 612 156 630 138"
          stroke="#a5f3fc"
          strokeWidth={2.6}
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="436" cy="210" r="5" fill="#67e8f9" />
      </ArtPart>

      <ArtPart
        id="euglena-chloroplast"
        {...{ explode, selected, onSelect }}
        dx={-164}
        dy={40}
        label="ක්ලෝරොප්ලාස්ට්"
        labelX={196}
        labelY={400}
        anchor="start"
      >
        <path
          d="M210 250 C 250 214 330 186 402 194 C 452 200 476 232 458 268 C 430 318 344 350 268 340 C 214 332 190 296 210 250 Z"
          fill="url(#eu-body)"
          stroke="#22c55e"
          strokeWidth={2.2}
          opacity={0.95}
        />
        {[
          [266, 290, -28],
          [318, 240, -18],
          [366, 292, -9],
          [388, 226, -14],
          [286, 322, -8],
        ].map(([cx, cy, r], i) => (
          <ellipse
            key={i}
            cx={cx}
            cy={cy}
            rx={27}
            ry={10}
            fill="#86efac"
            opacity={0.85}
            transform={`rotate(${r} ${cx} ${cy})`}
            stroke="#14532d"
            strokeWidth={0.8}
          />
        ))}
        <path d="M220 300 C 270 326 336 330 402 306" stroke="#65a30d" strokeWidth={1} fill="none" opacity={0.6} />
      </ArtPart>

      <ArtPart
        id="euglena-eyespot"
        {...{ explode, selected, onSelect }}
        dx={116}
        dy={-46}
        label="අක්ෂි ලපය · පෙලිකලය"
        labelX={452}
        labelY={238}
        anchor="start"
      >
        <circle cx="422" cy="226" r="11" fill="#ef4444" />
        <circle cx="422" cy="226" r="16" fill="none" stroke="#f87171" strokeWidth={1.2} opacity={0.6} />
        {[0, 1, 2, 3, 4].map((i) => (
          <path
            key={i}
            d={`M${212 + i * 12} ${248 + i * 16} C ${200 + i * 16} ${300 + i * 12}, ${240 + i * 22} ${330 - i * 10}, ${300 + i * 20} ${338 - i * 18}`}
            stroke="#bbf7d0"
            strokeWidth={1}
            opacity={0.4}
            fill="none"
          />
        ))}
      </ArtPart>

      <text x="238" y="374" fontSize={9} fill="#64748b">පරාමයිලම් ධාන්‍ය ගබඩාව</text>
      <circle cx="300" cy="254" r="13" fill="#f8fafc" opacity={0.16} stroke="#e2e8f0" strokeWidth={1} />
    </svg>
  );
}

export function ParameciumFigure({ explode, selected, onSelect }: FigProps) {
  return (
    <svg viewBox="0 0 680 540" className="h-full w-full">
      <defs>
        <linearGradient id="par-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1e1b4b" />
          <stop offset="100%" stopColor="#4c1d95" />
        </linearGradient>
      </defs>

      <ArtPart
        id="paramecium-cilia"
        {...{ explode, selected, onSelect }}
        dy={-84}
        label="සිලියා · මුඛ කටාරය"
        labelX={330}
        labelY={176}
      >
        <path
          d="M170 300 C 196 220 300 196 360 214 C 442 236 500 280 492 322 C 482 372 388 392 320 374 C 244 356 152 364 170 300 Z"
          fill="url(#par-body)"
          stroke="#a78bfa"
          strokeWidth={2.5}
          transform="rotate(-8 330 290)"
        />
        {Array.from({ length: 34 }).map((_, i) => {
          const t = i / 34;
          const a = Math.PI * 2 * t;
          const x = 332 + Math.cos(a) * 160;
          const y = 294 + Math.sin(a) * 84;
          return (
            <line
              key={i}
              x1={x}
              y1={y}
              x2={x + Math.cos(a) * 12}
              y2={y + Math.sin(a) * 12}
              stroke="#c4b5fd"
              strokeWidth={1.4}
              opacity={0.65}
            />
          );
        })}
        <path d="M240 290 C 268 312 300 318 328 306" stroke="#f472b6" strokeWidth={2.4} fill="none" opacity={0.9} />
        <text x="330" y="430" fontSize={8.5} fill="#64748b" textAnchor="middle">
          සිලියා මගින් ආහාර ජල ධාරාවක් සමඟ ගෙන එයි
        </text>
      </ArtPart>

      <ArtPart
        id="paramecium-nucleus"
        {...{ explode, selected, onSelect }}
        dx={-118}
        dy={84}
        label="විශාල හා ක්ෂුද්‍ර න්‍යෂ්ටි"
        labelX={250}
        labelY={392}
        anchor="start"
      >
        <ellipse cx="352" cy="290" rx="42" ry="24" fill="#5b21b6" stroke="#c4b5fd" strokeWidth={2} />
        <circle cx="352" cy="290" r="6" fill="#ddd6fe" />
        <circle cx="394" cy="306" r="9" fill="#8b5cf6" stroke="#ddd6fe" strokeWidth={1.4} />
      </ArtPart>

      <ArtPart
        id="paramecium-vacuole"
        {...{ explode, selected, onSelect }}
        dx={148}
        dy={54}
        label="සංකෝචක රික්තක"
        labelX={506}
        labelY={386}
        anchor="start"
      >
        {[
          [232, 266, 16],
          [432, 320, 14],
        ].map(([cx, cy, r], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r={r} fill="#0c4a6e" stroke="#38bdf8" strokeWidth={2} />
            {Array.from({ length: 6 }).map((_, j) => {
              const a = (j / 6) * Math.PI * 2;
              return (
                <line
                  key={j}
                  x1={cx + Math.cos(a) * (r + 2)}
                  y1={cy + Math.sin(a) * (r + 2)}
                  x2={cx + Math.cos(a) * (r + 14)}
                  y2={cy + Math.sin(a) * (r + 14)}
                  stroke="#7dd3fc"
                  strokeWidth={1.6}
                  opacity={0.75}
                />
              );
            })}
          </g>
        ))}
      </ArtPart>
    </svg>
  );
}
