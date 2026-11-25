import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  HeartPulse,
  Leaf,
  Microscope,
  Target,
} from "lucide-react";
import { UNITS } from "../data/units";
import type { View } from "../App";
import type { ModeId } from "../data/types";

const modeMeta: Record<ModeId, { si: string; icon: typeof HeartPulse; color: string }> = {
  anatomy: { si: "මානව දේහ සිමියුලේටර්", icon: HeartPulse, color: "text-rose-300" },
  plants: { si: "ශාක සිමියුලේටර්", icon: Leaf, color: "text-emerald-300" },
  organisms: { si: "ජීවී විවිධත්ව සිමියුලේටර්", icon: Microscope, color: "text-sky-300" },
};

export function UnitView({
  id,
  onNavigate,
}: {
  id: number;
  onNavigate: (v: View) => void;
}) {
  const unit = UNITS.find((u) => u.id === id) ?? UNITS[0];
  const next = UNITS.find((u) => u.id === id + 1);

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-9">
      <motion.div
        key={unit.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-ink-850/80 to-ink-950 p-5 sm:p-7"
      >
        <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-lab-teal/10 blur-3xl" />
        <div className="relative">
          <div className="mb-2 flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg border border-lab-teal/30 bg-lab-teal/10 font-display text-[12px] font-bold text-lab-teal">
              {String(unit.id).padStart(2, "0")}
            </span>
            <span className="text-[10px] uppercase tracking-[0.16em] text-slate-500">
              NIE ඒකකය
            </span>
          </div>
          <h1 className="font-display text-[23px] font-bold leading-tight text-white sm:text-[28px]">
            {unit.si}
          </h1>
          <p className="mt-0.5 text-[11px] text-slate-500">{unit.en}</p>
          <p className="si-body mt-3 text-[12.5px] leading-relaxed text-slate-300">
            {unit.summary}
          </p>

          <div className="mt-5 grid grid-cols-2 gap-2">
            <div className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-3">
              <p className="mb-1 flex items-center gap-1.5 text-[10px] font-medium text-lab-teal">
                <BookOpen size={11} /> ප්‍රධාන මාතෘකා
              </p>
              <p className="text-[9.5px] text-slate-500">{unit.topics.length} ක්</p>
            </div>
            <div className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-3">
              <p className="mb-1 flex items-center gap-1.5 text-[10px] font-medium text-amber-300">
                <Target size={11} /> විභාග වටිනාකම
              </p>
              <p className="text-[9.5px] text-slate-500">ව්‍යුහගත රචනා + MCQ</p>
            </div>
          </div>
        </div>
      </motion.div>

      <h2 className="mb-2 mt-6 flex items-center gap-2 font-display text-[15px] font-semibold text-white">
        <CheckCircle2 size={15} className="text-lab-teal" />
        මෙම ඒකකයේ ප්‍රධාන මාතෘකා
      </h2>
      <div className="space-y-1.5">
        {unit.topics.map((t, i) => (
          <div
            key={t}
            className="flex items-start gap-2.5 rounded-lg border border-white/[0.07] bg-white/[0.02] px-3 py-2.5"
          >
            <span className="mt-[2px] font-display text-[10px] font-bold text-lab-teal/60">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="si-body text-[11.5px] leading-relaxed text-slate-300">{t}</p>
          </div>
        ))}
      </div>

      {unit.mode && (
        <button
          onClick={() => onNavigate({ kind: "mode", mode: unit.mode! })}
          className="mt-5 flex w-full items-center gap-3 rounded-xl border border-lab-teal/25 bg-lab-teal/[0.07] px-4 py-3 text-left transition hover:border-lab-teal/50 hover:bg-lab-teal/10"
        >
          {(() => {
            const meta = modeMeta[unit.mode];
            const Icon = meta.icon;
            return (
              <span className={`grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/[0.05] ${meta.color}`}>
                <Icon size={16} />
              </span>
            );
          })()}
          <span className="flex-1">
            <span className="block text-[9.5px] uppercase tracking-wide text-slate-500">
              අදාළ අන්තර්ක්‍රියාකාරී මාදිලිය
            </span>
            <span className="block text-[12px] font-medium text-white">
              {modeMeta[unit.mode].si} විවෘත කරන්න
            </span>
          </span>
          <ArrowRight size={15} className="text-lab-teal" />
        </button>
      )}

      <div className="mt-4 rounded-xl border border-white/[0.07] bg-white/[0.02] p-3.5">
        <p className="text-[10.5px] leading-relaxed text-slate-500">
          සටහන: මෙම ඒකකය අදාළ අවයව හෝ ශාක කොටස් මත ක්ලික් කිරීමෙන් හැඳින්වීම,
          ව්‍යුහය, කෘත්‍යයන්, විභාග ඉලක්කගත කරුණු හා ස්වයං-ඇගයීම් MCQ සියල්ල එකම
          පාඩම් සටහනේ ලැබේ.
        </p>
      </div>

      {next && (
        <button
          onClick={() => onNavigate({ kind: "unit", id: next.id })}
          className="mt-3 flex w-full items-center justify-between rounded-xl border border-white/10 px-3.5 py-3 text-left transition hover:border-white/25"
        >
          <span>
            <span className="block text-[9px] uppercase tracking-wide text-slate-500">
              ඊළඟ ඒකකය
            </span>
            <span className="block text-[11.5px] text-slate-300">{next.si}</span>
          </span>
          <ArrowRight size={14} className="text-slate-500" />
        </button>
      )}
    </div>
  );
}
