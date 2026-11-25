import type { LifeCycle, LifeCycleStage } from "../data/lifecycleTypes";
import { SciTerm } from "./SciTerm";

const CX = 210;
const CY = 148;
const RX = 100;
const RY = 78;
const TAU = Math.PI * 2;

type Generation = "gametophyte" | "sporophyte" | "transition";

type Tint = { line: string; glow: string; soft: string; label: string };

const GEN: Record<Generation, Tint> = {
  gametophyte: {
    line: "#34d399",
    glow: "rgba(52,211,153,0.20)",
    soft: "rgba(52,211,153,0.07)",
    label: "ගැමිටොෆයිටය",
  },
  sporophyte: {
    line: "#fbbf24",
    glow: "rgba(251,191,36,0.20)",
    soft: "rgba(251,191,36,0.07)",
    label: "ස්පෝරොෆයිටය",
  },
  transition: {
    line: "#f472b6",
    glow: "rgba(244,114,182,0.20)",
    soft: "rgba(244,114,182,0.07)",
    label: "සංක්‍රාන්තිය",
  },
};

/**
 * A stage with a ploidy change (meiosis, fertilisation) is the bridge between
 * the two generations; pure n stages belong to the gametophyte and pure
 * 2n/3n stages to the sporophyte.
 */
function generationOf(ploidy: string): Generation {
  if (ploidy.includes("→")) return "transition";
  if (/[23]n/.test(ploidy)) return "sporophyte";
  return "gametophyte";
}

function diagramLabel(stage: LifeCycleStage) {
  return stage.short.split("→")[0].replace(/\s*\([^)]*\)/g, "").trim();
}

function shortPloidy(ploidy: string) {
  const p = ploidy.replace(/\s/g, "");
  return p.length <= 3 ? p : "";
}

function Node({
  index,
  stage,
}: {
  index: number;
  stage: LifeCycleStage;
}) {
  const angle = -Math.PI / 2 + (index / 6) * TAU;
  const x = CX + Math.cos(angle) * RX;
  const y = CY + Math.sin(angle) * RY;
  const t = GEN[generationOf(stage.ploidy)];
  const cos = Math.cos(angle);

  const label = diagramLabel(stage);
  let lx: number;
  let ly: number;
  let align: "left" | "right" | "center";
  if (cos > 0.35) {
    lx = x + 26;
    ly = y - 16;
    align = "left";
  } else if (cos < -0.35) {
    lx = x - 110;
    ly = y - 16;
    align = "right";
  } else {
    lx = x - 42;
    ly = y < CY ? y - 60 : y + 28;
    align = "center";
  }

  return (
    <g>
      <circle cx={x} cy={y} r={27} fill={t.glow} />
      <circle cx={x} cy={y} r={20} fill="#081018" stroke={t.line} strokeWidth={1.6} />
      <text
        x={x}
        y={y + (shortPloidy(stage.ploidy) ? -1 : 4)}
        textAnchor="middle"
        fontSize={11}
        fontWeight={700}
        fill="#f8fafc"
      >
        {index + 1}
      </text>
      {shortPloidy(stage.ploidy) && (
        <text x={x} y={y + 11} textAnchor="middle" fontSize={7} fontWeight={600} fill={t.line}>
          {shortPloidy(stage.ploidy)}
        </text>
      )}
      <foreignObject x={lx} y={ly} width={84} height={44}>
        <div
          style={{
            width: 84,
            fontSize: 9,
            lineHeight: 1.25,
            fontWeight: 600,
            color: "#cbd5e1",
            textAlign: align,
            overflowWrap: "break-word",
          }}
        >
          {label}
        </div>
      </foreignObject>
    </g>
  );
}

function CycleDiagram({ cycle }: { cycle: LifeCycle }) {
  const markerId = `lc-arrow-${cycle.id}`;
  const n = cycle.stages.length;
  const step = TAU / n;
  const pos = (i: number) => ({
    x: CX + Math.cos(-Math.PI / 2 + i * step) * RX,
    y: CY + Math.sin(-Math.PI / 2 + i * step) * RY,
  });

  const arcs = cycle.stages.map((_, i) => {
    const a = pos(i);
    const b = pos(i + 1);
    const mid = -Math.PI / 2 + (i + 0.5) * step;
    const cx = CX + Math.cos(mid) * RX * 1.12;
    const cy = CY + Math.sin(mid) * RY * 1.12;
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const len = Math.hypot(dx, dy) || 1;
    return `M ${a.x + (dx / len) * 24} ${a.y + (dy / len) * 24} Q ${cx} ${cy} ${
      b.x - (dx / len) * 28
    } ${b.y - (dy / len) * 28}`;
  });

  return (
    <svg viewBox="0 0 420 300" className="w-full" role="img" aria-label={cycle.title}>
      <defs>
        <marker
          id={markerId}
          viewBox="0 0 8 8"
          refX="7"
          refY="4"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M0 0 L8 4 L0 8 z" fill="#64748b" />
        </marker>
      </defs>
      <ellipse
        cx={CX}
        cy={CY}
        rx={RX}
        ry={RY}
        fill="none"
        stroke="#1e293b"
        strokeDasharray="2 6"
        strokeWidth={1}
      />
      {arcs.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke="#475569"
          strokeWidth={1.4}
          markerEnd={`url(#${markerId})`}
        />
      ))}
      {cycle.stages.map((stage, i) => (
        <Node key={i} index={i} stage={stage} />
      ))}
    </svg>
  );
}

export function LifeCycleBody({ cycle }: { cycle: LifeCycle }) {
  return (
    <div>
      <p className="si-body text-[11.5px] leading-[1.85] text-slate-300">{cycle.summary}</p>

      <div className="mt-2.5 flex items-start gap-2 rounded-lg border border-emerald-400/25 bg-emerald-400/[0.06] px-2.5 py-2">
        <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-300" />
        <p className="si-body text-[10.5px] leading-relaxed text-emerald-100">{cycle.dominant}</p>
      </div>

      <div className="mt-3 rounded-xl border border-white/[0.07] bg-[#060c13] p-1.5">
        <CycleDiagram cycle={cycle} />
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 pb-1 text-[9px] text-slate-500">
          <span className="inline-flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> ගැමිටොෆයිට් පරම්පරාව (n)
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" /> ස්පෝරොෆයිට් පරම්පරාව (2n/3n)
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-pink-400" /> සංක්‍රාන්තිය
          </span>
        </div>
      </div>

      <p className="mt-3 mb-1.5 text-[9px] font-medium uppercase tracking-[0.16em] text-slate-500">
        පියවර අනුව ලේබල් කළ අනුක්‍රමය
      </p>

      <ol className="relative ml-[7px] space-y-3 border-l border-white/10 pl-4">
        {cycle.stages.map((stage, i) => {
          const generation = generationOf(stage.ploidy);
          const t = GEN[generation];
          return (
            <li key={i} className="relative">
              <span
                className="absolute -left-[22px] top-[3px] h-2.5 w-2.5 rounded-full border-2"
                style={{ borderColor: t.line, background: "#080f17" }}
              />
              <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
                <span
                  className="font-display text-[9.5px] font-bold tabular-nums"
                  style={{ color: t.line }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h4 className="si-body text-[12px] font-semibold leading-snug text-white">
                  {stage.name}
                </h4>
                <span
                  className="shrink-0 rounded border px-1 py-[0.5px] font-sans text-[8.5px] font-semibold"
                  style={{ borderColor: `${t.line}55`, background: t.soft, color: t.line }}
                >
                  {stage.ploidy}
                </span>
                <span
                  className="shrink-0 text-[8px] font-medium"
                  style={{ color: t.line }}
                >
                  {t.label}
                </span>
              </div>
              <div className="group mt-0.5 flex flex-wrap items-center gap-1.5">
                <SciTerm en={stage.term} className="text-[9px]" />
              </div>
              <p className="si-body mt-1 text-[10.5px] leading-relaxed text-slate-400">
                {stage.detail}
              </p>
            </li>
          );
        })}
      </ol>

      <div className="mt-3.5 rounded-lg border border-amber-400/20 bg-amber-400/[0.05] px-2.5 py-2">
        <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-amber-300/80">
          විභාගයට යතුරු
        </p>
        <ul className="space-y-1.5">
          {cycle.exam.map((point, i) => (
            <li key={i} className="flex gap-1.5">
              <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-amber-400/80" />
              <p className="si-body text-[10.5px] leading-relaxed text-amber-100/80">{point}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
