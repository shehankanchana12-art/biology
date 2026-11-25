import { useState } from "react";
import { Droplets, Microscope } from "lucide-react";
import { ORGANISM_SPECIMENS, organismEntryById } from "../data/organisms";
import type { StudyEntry } from "../data/types";
import {
  AmoebaFigure,
  BacteriaFigure,
  EuglenaFigure,
  ParameciumFigure,
} from "../art/organismFigures1";
import { EarthwormFigure, FishFigure, RhizopusFigure } from "../art/organismFigures2";

export function OrganismMode({
  selectedId,
  onSelect,
}: {
  selectedId: string | null;
  onSelect: (entry: StudyEntry | null) => void;
}) {
  const [specimenId, setSpecimenId] = useState("bacteria");
  const specimen =
    ORGANISM_SPECIMENS.find((s) => s.id === specimenId) ?? ORGANISM_SPECIMENS[0];
  const entries = specimen.parts
    .map((p) => organismEntryById(p))
    .filter((e): e is StudyEntry => Boolean(e));

  const art = (id: string) => {
    const props = {
      explode: false,
      selected: selectedId,
      onSelect: (partId: string) => onSelect(organismEntryById(partId) ?? null),
    };
    switch (id) {
      case "bacteria":
        return <BacteriaFigure {...props} />;
      case "amoeba":
        return <AmoebaFigure {...props} />;
      case "euglena":
        return <EuglenaFigure {...props} />;
      case "paramecium":
        return <ParameciumFigure {...props} />;
      case "rhizopus":
        return <RhizopusFigure {...props} />;
      case "earthworm":
        return <EarthwormFigure {...props} />;
      case "fish":
        return <FishFigure {...props} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="drawer-scroll flex shrink-0 gap-1.5 overflow-x-auto border-b border-white/[0.07] bg-ink-900/40 px-3 py-2.5">
        {ORGANISM_SPECIMENS.map((s) => (
          <button
            key={s.id}
            onClick={() => {
              setSpecimenId(s.id);
              onSelect(null);
            }}
            className={[
              "shrink-0 rounded-lg border px-3 py-1.5 text-left transition",
              specimenId === s.id
                ? "border-lab-teal/40 bg-lab-teal/10"
                : "border-white/10 bg-white/[0.02] hover:border-white/25",
            ].join(" ")}
          >
            <span
              className={`block text-[11.5px] font-medium ${specimenId === s.id ? "text-lab-teal" : "text-slate-300"}`}
            >
              {s.name}
            </span>
            <span className="block text-[8.5px] italic text-slate-500">{s.term}</span>
          </button>
        ))}
      </div>

      <div className="relative flex min-h-0 flex-1 flex-col md:flex-row">
        <div className="relative min-h-[320px] flex-1 overflow-hidden bg-[radial-gradient(ellipse_at_50%_35%,rgba(56,189,248,0.07),transparent_60%)]">
          <div className="scan-grid pointer-events-none absolute inset-0 opacity-30" />
          <div className="relative h-full w-full px-2 pb-2 pt-1">{art(specimenId)}</div>

          <div className="pointer-events-none absolute left-3 top-2 max-w-[62%]">
            <p className="text-[9px] uppercase tracking-[0.16em] text-lab-teal/70">{specimen.group}</p>
            <h2 className="mt-1 font-display text-[19px] font-bold leading-snug text-white">
              {specimen.name}
            </h2>
            <p className="mt-1 text-[9.5px] italic text-slate-500">{specimen.term}</p>
          </div>

          <div className="pointer-events-none absolute bottom-2 right-3 flex items-center gap-1.5 text-[9px] text-slate-500">
            <Microscope size={10} />
            කොටසක් මත ක්ලික් කරන්න
          </div>
        </div>

        <aside className="drawer-scroll w-full shrink-0 overflow-y-auto border-t border-white/[0.07] bg-ink-900/40 p-3 md:w-[290px] md:border-l md:border-t-0 md:p-4">
          <p className="si-body mb-3 text-[11px] leading-relaxed text-slate-400">{specimen.blurb}</p>

          <p className="label-eyebrow mb-2">ව්‍යුහ කොටස්</p>
          <div className="space-y-1.5">
            {entries.map((e) => (
              <button
                key={e.id}
                onClick={() => onSelect(e)}
                className={[
                  "flex w-full items-center justify-between gap-2 rounded-lg border px-2.5 py-2 text-left text-[11.5px] transition",
                  selectedId === e.id
                    ? "border-lab-teal/50 bg-lab-teal/10 text-lab-teal"
                    : "border-white/10 bg-white/[0.02] text-slate-300 hover:border-white/25 hover:text-white",
                ].join(" ")}
              >
                <span className="truncate">{e.name}</span>
                <span className="truncate text-[8.5px] italic text-slate-500">{e.term}</span>
              </button>
            ))}
          </div>

          <div className="mt-5 rounded-xl border border-sky-400/20 bg-sky-400/[0.05] p-3">
            <p className="mb-1.5 flex items-center gap-1.5 text-[10px] font-medium text-sky-300">
              <Droplets size={11} /> පංච රාජධානි වර්ගීකරණය
            </p>
            <ul className="space-y-1 text-[9.5px] text-slate-400">
              <li>මොනෙරා — බැක්ටීරියා (ප්‍රොකැරියෝට)</li>
              <li>ප්‍රොටිස්ටා — ඇමීබා, යුග්ලීනා, පැරමීසියම්</li>
              <li>ෆන්ගයි — රයිසෝපස් වැනි දිලීර</li>
              <li>ප්ලාන්ටේ — ශාක</li>
              <li>ඇනිමාලියා — ගැඩවිලා, මත්ස්‍යයා</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
