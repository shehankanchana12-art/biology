import { ArtPart } from "./parts";

type FigProps = {
  explode: boolean;
  selected: string | null;
  onSelect: (id: string) => void;
};

export function RhizopusFigure({ explode, selected, onSelect }: FigProps) {
  const heads = [
    { x: 250, h: 210, r: 30 },
    { x: 340, h: 170, r: 36 },
    { x: 430, h: 226, r: 26 },
  ];
  return (
    <svg viewBox="0 0 680 540" className="h-full w-full">
      <defs>
        <radialGradient id="rh-head">
          <stop offset="0%" stopColor="#57534e" />
          <stop offset="100%" stopColor="#1c1917" />
        </radialGradient>
      </defs>

      <ArtPart
        id="rhizopus-hyphae"
        {...{ explode, selected, onSelect }}
        dy={58}
        label="හයිෆේ · මයිසීලියමය"
        labelX={330}
        labelY={492}
      >
        {Array.from({ length: 16 }).map((_, i) => {
          const x = 176 + i * 22;
          return (
            <path
              key={i}
              d={`M${x} 430 C ${x + 14} 410, ${x - 10} 392, ${x + 8} 372`}
              stroke="#d6d3d1"
              strokeWidth={1.5}
              fill="none"
              opacity={0.6}
            />
          );
        })}
        {[0, 1, 2, 3].map((i) => (
          <path
            key={i}
            d={`M${210 + i * 72} 372 C ${250 + i * 60} 348, ${300 + i * 44} 400, ${356 + i * 40} 374`}
            stroke="#a8a29e"
            strokeWidth={1.2}
            fill="none"
            opacity={0.45}
          />
        ))}
      </ArtPart>

      <ArtPart
        id="rhizopus-rhizoid"
        {...{ explode, selected, onSelect }}
        dx={136}
        dy={74}
        label="රයිසොයිඩ හා ස්ටෝලෝනය"
        labelX={238}
        labelY={506}
        anchor="start"
      >
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path
            key={i}
            d={`M${300 + i * 9} 430 C ${292 + i * 12} 452, ${304 + i * 14} 466, ${296 + i * 18} 488`}
            stroke="#a8a29e"
            strokeWidth={1.6}
            fill="none"
          />
        ))}
        <path d="M300 430 C 348 418 388 424 424 410" stroke="#d6d3d1" strokeWidth={2} fill="none" />
        <text x="296" y="508" fontSize={8} fill="#64748b">ස්ටෝලෝනය</text>
      </ArtPart>

      <ArtPart
        id="rhizopus-sporangium"
        {...{ explode, selected, onSelect }}
        dy={-92}
        label="ස්පෝරංගියම"
        labelX={140}
        labelY={118}
        anchor="start"
      >
        {heads.map((h) => (
          <g key={h.x}>
            <path d={`M${h.x} 420 C ${h.x - 4} 340, ${h.x + 8} 290, ${h.x} ${h.h + h.r}`} stroke="#d6d3d1" strokeWidth={3} fill="none" />
            <circle cx={h.x} cy={h.h} r={h.r} fill="url(#rh-head)" stroke="#78716c" strokeWidth={1.5} />
            <circle cx={h.x} cy={h.h} r={h.r * 0.55} fill="#0c0a09" opacity={0.75} />
            {Array.from({ length: 9 }).map((_, i) => {
              const a = (i / 9) * Math.PI * 2;
              return (
                <circle
                  key={i}
                  cx={h.x + Math.cos(a) * h.r * 0.7}
                  cy={h.h + Math.sin(a) * h.r * 0.7}
                  r={2.4}
                  fill="#a8a29e"
                  opacity={0.6}
                />
              );
            })}
            <path d={`M${h.x} ${h.h + h.r} L ${h.x} ${h.h + h.r + 10}`} stroke="#57534e" strokeWidth={4} />
          </g>
        ))}
        <text x="340" y="96" fontSize={9} fill="#94a3b8" textAnchor="middle">
          ස්පෝරංගියෝස්පෝර (n) — වාතයෙන් විසිරේ
        </text>
      </ArtPart>
    </svg>
  );
}

export function EarthwormFigure({ explode, selected, onSelect }: FigProps) {
  return (
    <svg viewBox="0 0 680 540" className="h-full w-full">
      <defs>
        <linearGradient id="ew-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#b45309" />
          <stop offset="45%" stopColor="#92400e" />
          <stop offset="100%" stopColor="#7c2d12" />
        </linearGradient>
      </defs>

      <ArtPart
        id="earthworm-setae"
        {...{ explode, selected, onSelect }}
        dy={80}
        label="සීටේ"
        labelX={330}
        labelY={422}
      >
        {Array.from({ length: 18 }).map((_, i) => {
          const x = 174 + i * 19;
          const y = 366 + Math.sin((i / 18) * Math.PI) * 18;
          return (
            <g key={i}>
              <line x1={x} y1={y} x2={x - 5} y2={y + 16} stroke="#fbbf24" strokeWidth={2} strokeLinecap="round" />
              <line x1={x + 4} y1={y + 2} x2={x + 2} y2={y + 18} stroke="#fbbf24" strokeWidth={1.6} strokeLinecap="round" />
            </g>
          );
        })}
      </ArtPart>

      <path
        d="M138 330 C 210 286 300 288 380 306 C 454 322 512 334 552 318 C 562 348 540 372 496 380 C 420 396 320 382 250 372 C 194 364 148 366 132 352 Z"
        fill="url(#ew-body)"
        stroke="#78350f"
        strokeWidth={2}
      />
      {Array.from({ length: 20 }).map((_, i) => {
        const t = i / 20;
        const x = 150 + t * 392;
        const y = 292 + Math.sin(t * Math.PI) * 20 + t * 60;
        return (
          <line
            key={i}
            x1={x}
            y1={y - 30 + Math.sin(t * 3.14) * 4}
            x2={x - 3}
            y2={y + 34 - Math.sin(t * 3.14) * 2}
            stroke="#5b2107"
            strokeWidth={1.4}
            opacity={0.7}
          />
        );
      })}

      <ArtPart
        id="earthworm-gut"
        {...{ explode, selected, onSelect }}
        dx={96}
        dy={-78}
        label="ආහාර ජීර්ණ නාලය · ගිසාඩ්"
        labelX={226}
        labelY={282}
        anchor="start"
      >
        <path
          d="M168 330 C 250 312 330 322 420 334 C 470 340 512 336 548 328"
          stroke="#fca5a5"
          strokeWidth={11}
          fill="none"
          strokeLinecap="round"
          opacity={0.9}
        />
        <ellipse cx="352" cy="326" rx="20" ry="15" fill="#f87171" stroke="#fecaca" strokeWidth={1.5} />
        <ellipse cx="392" cy="330" rx="16" ry="12" fill="#ef4444" stroke="#fecaca" strokeWidth={1.5} />
        <text x="330" y="292" fontSize={8.5} fill="#fecaca">ආහාර ගබඩාව → ගිසාඩ්</text>
      </ArtPart>

      <ArtPart
        id="earthworm-clitellum"
        {...{ explode, selected, onSelect }}
        dx={-116}
        dy={-92}
        label="ක්ලිටෙලමය"
        labelX={250}
        labelY={262}
        anchor="start"
      >
        <path
          d="M262 294 C 288 286 316 292 324 304 C 330 318 326 344 316 356 C 300 364 272 356 264 344 C 256 328 254 304 262 294 Z"
          fill="#fbbf24"
          opacity={0.92}
          stroke="#b45309"
          strokeWidth={1.6}
        />
        <path d="M268 306 L 318 306" stroke="#92400e" strokeWidth={1} opacity={0.6} />
        <path d="M270 348 L 314 348" stroke="#92400e" strokeWidth={1} opacity={0.6} />
        <text x="292" y="272" fontSize={8.5} fill="#94a3b8" textAnchor="middle">13–16 කොටස්</text>
      </ArtPart>

      <circle cx="148" cy="334" r="4" fill="#1c0a03" />
      <text x="330" y="466" fontSize={9} fill="#64748b" textAnchor="middle">
        ඛණ්ඩිත සිරුර · සංවෘත රුධිර සංසරණය · නෙෆ්‍රීඩියා මගින් බහිස්ස්‍රාවය
      </text>
    </svg>
  );
}

export function FishFigure({ explode, selected, onSelect }: FigProps) {
  return (
    <svg viewBox="0 0 680 540" className="h-full w-full">
      <defs>
        <linearGradient id="fi-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0e7490" />
          <stop offset="60%" stopColor="#155e75" />
          <stop offset="100%" stopColor="#164e63" />
        </linearGradient>
      </defs>

      <ArtPart
        id="fish-lateral-line"
        {...{ explode, selected, onSelect }}
        dy={76}
        label="පාර්ශ්ව රේඛාව"
        labelX={330}
        labelY={352}
      >
        <path
          d="M232 276 C 300 282 380 278 462 268"
          stroke="#5eead4"
          strokeWidth={2}
          fill="none"
          strokeDasharray="6 5"
        />
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <circle key={i} cx={252 + i * 32} cy={278 - i * 1.4} r={2.2} fill="#99f6e4" />
        ))}
      </ArtPart>

      <ArtPart
        id="fish-gills"
        {...{ explode, selected, onSelect }}
        dx={-138}
        dy={-58}
        label="කර්ණපත්‍ර"
        labelX={112}
        labelY={222}
        anchor="start"
      >
        {[0, 1, 2, 3].map((i) => (
          <path
            key={i}
            d={`M${216 + i * 13} 240 C ${204 + i * 13} 268, ${204 + i * 13} 300, ${220 + i * 13} 322`}
            stroke="#f87171"
            strokeWidth={7 - i * 0.8}
            fill="none"
            opacity={0.9}
            strokeLinecap="round"
          />
        ))}
        <ellipse cx="246" cy="282" rx="15" ry="38" fill="#fb7185" opacity={0.25} />
      </ArtPart>

      <ArtPart
        id="fish-swim-bladder"
        {...{ explode, selected, onSelect }}
        dx={112}
        dy={-96}
        label="පිහිනුම් බුබුල"
        labelX={420}
        labelY={202}
        anchor="start"
      >
        <ellipse cx="376" cy="246" rx="66" ry="23" fill="#a5f3fc" opacity={0.25} stroke="#67e8f9" strokeWidth={2} />
        <path d="M316 246 C 340 236 412 236 436 246" stroke="#cffafe" strokeWidth={1} fill="none" opacity={0.6} />
        <text x="376" y="222" fontSize={8} fill="#a5f3fc" textAnchor="middle">වායු</text>
      </ArtPart>

      <path
        d="M168 282 C 190 236 268 208 348 214 C 424 220 478 248 500 276 C 478 304 424 332 348 338 C 268 344 190 322 168 282 Z"
        fill="url(#fi-body)"
        stroke="#0e7490"
        strokeWidth={2}
      />
      <path d="M500 276 L 566 228 L 560 276 L 578 322 L 504 300 Z" fill="#0e7490" opacity={0.95} stroke="#155e75" strokeWidth={2} />
      <path d="M300 214 C 330 184 388 184 414 218" stroke="#0e7490" strokeWidth={12} fill="none" opacity={0.9} strokeLinecap="round" />
      <path d="M300 338 C 332 366 382 362 404 336" stroke="#0e7490" strokeWidth={10} fill="none" opacity={0.85} strokeLinecap="round" />
      <circle cx="222" cy="262" r="7" fill="#e2e8f0" stroke="#0f172a" strokeWidth={2} />
      <circle cx="222" cy="262" r="3" fill="#0f172a" />
      <path d="M196 292 C 176 300 172 314 198 320" stroke="#164e63" strokeWidth={3} fill="none" />
      {Array.from({ length: 5 }).map((_, i) => (
        <path
          key={i}
          d={`M${256 + i * 30} ${252 + i * 4} C ${280 + i * 30} ${266 + i * 4}, ${280 + i * 30} ${292 - i * 2}, ${258 + i * 30} ${302 - i * 2}`}
          stroke="#0f3f4f"
          strokeWidth={1.3}
          fill="none"
          opacity={0.55}
        />
      ))}
      <text x="330" y="392" fontSize={9} fill="#64748b" textAnchor="middle">
        කර්ණපත්‍ර මගින් O₂ ලබා ගැනීම · ද්වි-කුටීර හෘදය · තනි රුධිර චක්‍රය
      </text>
    </svg>
  );
}
