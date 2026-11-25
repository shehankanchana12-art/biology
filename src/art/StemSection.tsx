import { X } from "lucide-react";

export function StemSection({
  kind,
  onClose,
  onOpenStem,
}: {
  kind: "monocot" | "dicot";
  onClose: () => void;
  onOpenStem: () => void;
}) {
  const bundles =
    kind === "monocot"
      ? Array.from({ length: 14 }).map((_, i) => {
          const a = i * 2.3;
          const r = 26 + (i % 4) * 22;
          return { x: 150 + Math.cos(a) * r, y: 150 + Math.sin(a) * r, rot: (a * 180) / Math.PI };
        })
      : Array.from({ length: 9 }).map((_, i) => {
          const a = (i / 9) * Math.PI * 2;
          return { x: 150 + Math.cos(a) * 82, y: 150 + Math.sin(a) * 82, rot: (a * 180) / Math.PI + 90 };
        });

  return (
    <div className="flex h-full w-full flex-col border-lab-teal/20 bg-ink-950/95 p-4 backdrop-blur-xl">
      <div className="mb-1 flex items-start justify-between">
        <div>
          <p className="label-eyebrow">කඳේ තීර්යක් කැපුම</p>
          <p className="font-display text-[15px] font-semibold text-white">
            {kind === "monocot" ? "ඒකබීජපත්‍රී කඳ" : "ද්විබීජපත්‍රී කඳ"}
          </p>
        </div>
        <button
          onClick={onClose}
          className="grid h-7 w-7 place-items-center rounded-md border border-white/10 text-slate-400 hover:text-white"
        >
          <X size={13} />
        </button>
      </div>
      <p className="mb-2 text-[10px] leading-relaxed text-slate-500">
        {kind === "monocot"
          ? "විසිරුණු, සංවෘත කදම්භ — කැම්බියම් නොමැත"
          : "වළල්ලකට සැකසුණු, විවෘත කදම්භ — කැම්බියම් ඇත"}
      </p>

      <svg viewBox="0 0 300 300" className="w-full flex-1">
        <circle cx="150" cy="150" r="132" fill="#0b2a20" stroke="#2dd4bf" strokeWidth={2} />
        <circle cx="150" cy="150" r="124" fill="none" stroke="#134e4a" strokeWidth={1} />
        <circle cx="150" cy="150" r="116" fill="#123f2f" opacity={0.55} />
        <text x="150" y="24" fontSize={9} fill="#5eead4" textAnchor="middle">
          එපිඩර්මිස්
        </text>
        <text x="150" y="288" fontSize={9} fill="#94a3b8" textAnchor="middle">
          {kind === "monocot" ? "පැරන්කයිමාව" : "පිතිකාව (pith)"}
        </text>

        {bundles.map((b, i) => (
          <g key={i} transform={`translate(${b.x} ${b.y}) rotate(${b.rot})`}>
            <ellipse cx="0" cy="0" rx="11" ry="7.5" fill="#0b1220" stroke="#a3e635" strokeWidth={1} />
            <ellipse cx="0" cy="-2.6" rx="7" ry="3.4" fill="#38bdf8" />
            <ellipse cx="0" cy="2.8" rx="7" ry="3.2" fill="#f472b6" />
            {kind === "dicot" && (
              <path d="M-7 0 L 7 0" stroke="#fde68a" strokeWidth={1.4} opacity={0.9} />
            )}
          </g>
        ))}

      </svg>

      <div className="mt-1 flex items-center justify-center gap-4 text-[10px]">
        <span className="flex items-center gap-1.5 text-sky-300">
          <span className="h-2 w-2 rounded-full bg-sky-400" /> ජයිලම්
        </span>
        <span className="flex items-center gap-1.5 text-pink-300">
          <span className="h-2 w-2 rounded-full bg-pink-400" /> ෆ්ලොයම්
        </span>
        {kind === "dicot" && (
          <span className="flex items-center gap-1.5 text-amber-200">
            <span className="h-2 w-2 rounded-full bg-amber-300" /> කැම්බියම්
          </span>
        )}
      </div>

      <button
        onClick={onOpenStem}
        className="mt-3 rounded-lg border border-lab-teal/30 bg-lab-teal/10 py-2 text-[11px] font-medium text-lab-teal transition hover:bg-lab-teal/20"
      >
        සංවහන කදම්භ පාඩම විවෘත කරන්න
      </button>
    </div>
  );
}
