import { useState } from "react";
import { motion } from "framer-motion";
import { Layers, Scissors } from "lucide-react";
import {
  PLANT_SPECIMENS,
  plantEntryById,
} from "../data/plants";
import type { StudyEntry } from "../data/types";
import { PogonatumFigure, NephrolepisFigure } from "../art/plantFigures1";
import { CycasFigure, AngiospermFigure } from "../art/plantFigures2";
import { StemSection } from "../art/StemSection";

export function PlantMode({
  selectedId,
  onSelect,
}: {
  selectedId: string | null;
  onSelect: (entry: StudyEntry | null) => void;
}) {
  const [specimenId, setSpecimenId] = useState("pogonatum");
  const [exploded, setExploded] = useState(false);
  const [section, setSection] = useState(false);

  const specimen = PLANT_SPECIMENS.find((s) => s.id === specimenId) ?? PLANT_SPECIMENS[0];
  const entries = specimen.parts
    .map((p) => plantEntryById(p))
    .filter((e): e is StudyEntry => Boolean(e));
  const isAngiosperm = specimenId === "monocot" || specimenId === "dicot";

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="drawer-scroll flex shrink-0 gap-1.5 overflow-x-auto border-b border-white/[0.07] bg-ink-900/40 px-3 py-2.5">
        {PLANT_SPECIMENS.map((s) => (
          <button
            key={s.id}
            onClick={() => {
              setSpecimenId(s.id);
              setExploded(false);
              setSection(false);
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
        <div className="relative min-h-[320px] flex-1 overflow-hidden bg-[radial-gradient(ellipse_at_50%_40%,rgba(74,222,128,0.07),transparent_60%)]">
          <div className="scan-grid pointer-events-none absolute inset-0 opacity-30" />
          <div className="relative h-full w-full px-2 pb-2 pt-1">
            {specimenId === "pogonatum" && (
              <PogonatumFigure explode={exploded} selected={selectedId} onSelect={(id) => onSelect(plantEntryById(id) ?? null)} />
            )}
            {specimenId === "nephrolepis" && (
              <NephrolepisFigure explode={exploded} selected={selectedId} onSelect={(id) => onSelect(plantEntryById(id) ?? null)} />
            )}
            {specimenId === "cycas" && (
              <CycasFigure explode={exploded} selected={selectedId} onSelect={(id) => onSelect(plantEntryById(id) ?? null)} />
            )}
            {specimenId === "monocot" && (
              <AngiospermFigure
                kind="monocot"
                explode={exploded}
                selected={selectedId}
                onSelect={(id) => onSelect(plantEntryById(id) ?? null)}
              />
            )}
            {specimenId === "dicot" && (
              <AngiospermFigure
                kind="dicot"
                explode={exploded}
                selected={selectedId}
                onSelect={(id) => onSelect(plantEntryById(id) ?? null)}
              />
            )}
          </div>

          <div className="pointer-events-none absolute left-3 top-2 max-w-[62%]">
            <p className="text-[9px] uppercase tracking-[0.16em] text-lab-teal/70">{specimen.group}</p>
            <h2 className="mt-1 font-display text-[19px] font-bold leading-snug text-white">
              {specimen.name}
            </h2>
            <p className="mt-1 text-[9.5px] italic text-slate-500">{specimen.term}</p>
          </div>

          {section && isAngiosperm && (
            <div className="absolute inset-x-0 bottom-0 z-20 max-h-[78%] overflow-y-auto border-t border-lab-teal/20 md:inset-y-0 md:left-auto md:right-0 md:w-[330px] md:max-h-none md:border-l md:border-t-0">
              <StemSection
                kind={specimenId as "monocot" | "dicot"}
                onClose={() => setSection(false)}
                onOpenStem={() => {
                  const stem = plantEntryById(`${specimenId}-stem`);
                  if (stem) onSelect(stem);
                }}
              />
            </div>
          )}
        </div>

        <aside className="drawer-scroll w-full shrink-0 overflow-y-auto border-t border-white/[0.07] bg-ink-900/40 p-3 md:w-[290px] md:border-l md:border-t-0 md:p-4">
          <p className="si-body mb-3 text-[11px] leading-relaxed text-slate-400">{specimen.blurb}</p>

          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setExploded((v) => !v)}
              className={[
                "flex items-center gap-1.5 rounded-lg border px-2.5 py-2 text-[11px] font-medium transition",
                exploded
                  ? "border-lab-teal/50 bg-lab-teal/15 text-lab-teal"
                  : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/30",
              ].join(" ")}
            >
              <Layers size={12} />
              {exploded ? "එකට එකතු කරන්න" : "කොටස් වෙන් කරන්න"}
            </button>
            <button
              onClick={() => isAngiosperm && setSection((v) => !v)}
              disabled={!isAngiosperm}
              title={isAngiosperm ? "කඳේ කැපුම" : "මෙම නියැදියට කඳ කැපුම් දර්ශනයක් නොමැත"}
              className={[
                "flex items-center gap-1.5 rounded-lg border px-2.5 py-2 text-[11px] font-medium transition",
                section
                  ? "border-lab-teal/50 bg-lab-teal/15 text-lab-teal"
                  : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/30",
                !isAngiosperm ? "cursor-not-allowed opacity-40" : "",
              ].join(" ")}
            >
              <Scissors size={12} />
              කැපුම
            </button>
          </div>

          <p className="label-eyebrow mb-2 mt-5">කොටස් {entries.length}</p>
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

          <motion.div
            key={specimen.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 rounded-lg border border-white/[0.07] bg-white/[0.02] p-2.5"
          >
            <p className="text-[9.5px] leading-relaxed text-slate-500">
              කොටසක් මත ක්ලික් කර A/L පාඩම් සටහන, ව්‍යුහය හා විභාග ඉලක්කගත කරුණු බලන්න.
              පරම්පරා ප්‍රත්‍යාවර්තනය පිළිබඳ කරුණු එහි ඇතුළත් වේ.
            </p>
          </motion.div>
        </aside>
      </div>
    </div>
  );
}
