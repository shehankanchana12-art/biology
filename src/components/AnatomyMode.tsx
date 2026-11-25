import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Boxes,
  Eye,
  EyeOff,
  Layers,
  Maximize2,
  RotateCcw,
  ScanLine,
  User,
  Users,
} from "lucide-react";
import { AnatomyScene } from "../three/AnatomyScene";
import { useModelManifest } from "../three/modelRegistry";
import { ANATOMY } from "../data/anatomy";
import { SYSTEMS } from "../data/anatomy/systems";
import type { StudyEntry } from "../data/types";

export function AnatomyMode({
  selectedId,
  onSelect,
}: {
  selectedId: string | null;
  onSelect: (entry: StudyEntry | null) => void;
}) {
  const [sex, setSex] = useState<"male" | "female">("male");
  const [exploded, setExploded] = useState(false);
  const [hidden, setHidden] = useState<string[]>([]);
  const [resetKey, setResetKey] = useState(0);

  const models = useModelManifest();
  const [useModels, setUseModels] = useState(true);
  const modelCount = Object.keys(models).length;

  const visibleOrgans = useMemo(
    () => ANATOMY.filter((o) => !o.sex || o.sex === sex),
    [sex]
  );

  const activeModels = useMemo(
    () => (useModels ? models : {}),
    [models, useModels]
  );

  const toggleSystem = (id: string) => {
    setHidden((h) => (h.includes(id) ? h.filter((x) => x !== id) : [...h, id]));
  };

  const reset = () => {
    setExploded(false);
    setHidden([]);
    onSelect(null);
    setResetKey((k) => k + 1);
  };

  return (
    <div className="flex h-full min-h-0 flex-col xl:flex-row">
      <div className="relative flex h-[54vh] min-h-[360px] shrink-0 flex-col overflow-hidden border-b border-white/[0.07] bg-[radial-gradient(ellipse_at_50%_20%,rgba(45,212,191,0.10),transparent_60%),radial-gradient(ellipse_at_80%_80%,rgba(99,102,241,0.10),transparent_55%)] xl:h-auto xl:min-h-0 xl:flex-1 xl:border-b-0">
        <div className="scan-grid pointer-events-none absolute inset-0 opacity-40" />

        <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 p-3 sm:p-4">
          <div className="flex rounded-lg border border-white/10 bg-ink-900/80 p-0.5 backdrop-blur">
            {(
              [
                { id: "male", si: "පුරුෂ", icon: User },
                { id: "female", si: "ස්ත්‍රී", icon: Users },
              ] as const
            ).map((s) => (
              <button
                key={s.id}
                onClick={() => setSex(s.id)}
                className={[
                  "flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[11px] font-medium transition",
                  sex === s.id
                    ? "bg-lab-teal/20 text-lab-teal"
                    : "text-slate-400 hover:text-white",
                ].join(" ")}
              >
                <s.icon size={12} />
                {s.si}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <span className="hidden items-center gap-1.5 rounded-md border border-white/10 bg-ink-900/70 px-2 py-1.5 text-[10px] text-slate-400 backdrop-blur sm:flex">
              <ScanLine size={11} className="text-lab-teal" />
              {visibleOrgans.length} අවයව · 3D
            </span>
            {modelCount > 0 && (
              <button
                onClick={() => setUseModels((v) => !v)}
                title="Blender මාදිලි සහ රූප සටහන් මාරු කරන්න"
                className={[
                  "flex items-center gap-1.5 rounded-md border px-2 py-1.5 text-[10px] backdrop-blur transition",
                  useModels
                    ? "border-lab-teal/40 bg-lab-teal/15 text-lab-teal"
                    : "border-white/10 bg-ink-900/70 text-slate-400 hover:text-white",
                ].join(" ")}
              >
                <Boxes size={11} />
                {useModels ? `මාදිලි ${modelCount}` : "රූප සටහන්"}
              </button>
            )}
            <button
              onClick={reset}
              className="grid h-8 w-8 place-items-center rounded-md border border-white/10 bg-ink-900/70 text-slate-400 transition hover:border-white/25 hover:text-white"
              title="නැවත සකසන්න"
            >
              <RotateCcw size={13} />
            </button>
          </div>
        </div>

        <div className="relative z-0 min-h-0 flex-1">
          <AnatomyScene
            key={resetKey}
            sex={sex}
            exploded={exploded}
            selected={selectedId}
            hiddenSystems={hidden}
            models={activeModels}
            onSelect={(id) => {
              if (!id) return onSelect(null);
              const entry = ANATOMY.find((o) => o.id === id);
              if (entry) onSelect(entry);
            }}
          />
          <div className="pointer-events-none absolute bottom-2 right-3 flex items-center gap-1 text-[9px] text-slate-500">
            <Maximize2 size={9} />
            ඇදගෙන කරකවන්න · ස්ක්‍රෝල් කර විශාල කරන්න
          </div>
        </div>

        <div className="relative z-10 flex flex-wrap items-center justify-center gap-2 p-3">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setExploded((v) => !v)}
            className={[
              "flex items-center gap-2 rounded-xl border px-4 py-2.5 text-[12.5px] font-semibold shadow-lg transition",
              exploded
                ? "border-lab-teal/50 bg-lab-teal/15 text-lab-teal"
                : "border-lab-teal/30 bg-gradient-to-r from-lab-teal/20 to-sky-500/10 text-white hover:border-lab-teal/60",
            ].join(" ")}
          >
            <Layers size={15} />
            {exploded ? "කොටස් එකට එකතු කරන්න" : "කොටස් වෙන් කර පෙන්වන්න"}
          </motion.button>
        </div>

        <AnimatePresence>
          {selectedId && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="pointer-events-none absolute left-3 top-[74px] rounded-lg border border-white/10 bg-ink-950/80 px-2.5 py-1.5 backdrop-blur"
            >
              <p className="text-[9px] uppercase tracking-widest text-lab-teal">තෝරාගත්</p>
              <p className="text-[11px] text-white">
                {ANATOMY.find((o) => o.id === selectedId)?.name}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <aside className="drawer-scroll w-full shrink-0 overflow-y-auto border-white/[0.07] bg-ink-900/40 p-3 xl:w-[300px] xl:border-l xl:p-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="label-eyebrow">පද්ධති පෙරහන</h3>
          {hidden.length > 0 && (
            <button
              onClick={() => setHidden([])}
              className="text-[10px] text-lab-teal hover:underline"
            >
              සියල්ල පෙන්වන්න
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-1.5 xl:grid-cols-1">
          {SYSTEMS.map((s) => {
            const organs = visibleOrgans.filter((o) => o.system === s.id);
            if (organs.length === 0) return null;
            const off = hidden.includes(s.id);
            return (
              <button
                key={s.id}
                onClick={() => toggleSystem(s.id)}
                className={[
                  "flex items-center gap-2 rounded-lg border px-2.5 py-2 text-left transition",
                  off
                    ? "border-white/[0.06] bg-white/[0.01] opacity-45"
                    : "border-white/10 bg-white/[0.03] hover:border-white/25",
                ].join(" ")}
              >
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ background: s.color, boxShadow: `0 0 8px ${s.color}80` }}
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[11px] font-medium text-slate-200">
                    {s.si}
                  </span>
                  <span className="block truncate text-[8.5px] text-slate-500">{s.en}</span>
                </span>
                {off ? (
                  <EyeOff size={11} className="text-slate-500" />
                ) : (
                  <Eye size={11} className="text-slate-400" />
                )}
              </button>
            );
          })}
        </div>

        <h3 className="label-eyebrow mb-2 mt-5">අවයව ලැයිස්තුව</h3>
        <div className="space-y-3">
          {SYSTEMS.map((s) => {
            const organs = visibleOrgans.filter((o) => o.system === s.id);
            if (organs.length === 0) return null;
            return (
              <div key={s.id}>
                <p className="mb-1 flex items-center gap-1.5 text-[9px] uppercase tracking-wide text-slate-500">
                  <span className="h-1 w-1 rounded-full" style={{ background: s.color }} />
                  {s.si}
                </p>
                <div className="flex flex-wrap gap-1">
                  {organs.map((o) => (
                    <button
                      key={o.id}
                      onClick={() => onSelect(o)}
                      className={[
                        "rounded-md border px-2 py-1 text-[10.5px] transition",
                        selectedId === o.id
                          ? "border-lab-teal/50 bg-lab-teal/15 text-lab-teal"
                          : "border-white/10 bg-white/[0.02] text-slate-300 hover:border-white/30 hover:text-white",
                      ].join(" ")}
                    >
                      {o.name}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </aside>
    </div>
  );
}
