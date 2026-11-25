import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Dna,
  HeartPulse,
  Leaf,
  Microscope,
  Sparkles,
} from "lucide-react";
import { ANATOMY } from "../data/anatomy";
import { PLANTS } from "../data/plants";
import { ORGANISMS } from "../data/organisms";
import { UNITS } from "../data/units";
import type { ModeId } from "../data/types";
import type { View } from "../App";

const cards: {
  id: ModeId;
  si: string;
  en: string;
  desc: string;
  icon: typeof HeartPulse;
  grad: string;
  ring: string;
}[] = [
  {
    id: "anatomy",
    si: "මානව දේහය",
    en: "Exploded 3D anatomy",
    desc: "පුරුෂ හා ස්ත්‍රී දේහ මාදිලි, පද්ධති 8ක් සහ අවයව 17ක් ත්‍රිමානව වෙන් කර විමසන්න.",
    icon: HeartPulse,
    grad: "from-rose-500/20 via-rose-500/5 to-transparent",
    ring: "group-hover:border-rose-400/40",
  },
  {
    id: "plants",
    si: "ශාක විවිධත්වය",
    en: "Plant form & function",
    desc: "Pogonatum, Nephrolepis, Cycas හා ඒක/ද්විබීජපත්‍රී ශාක — කොටස් හා කඳ කැපුම් සමඟ.",
    icon: Leaf,
    grad: "from-emerald-500/20 via-emerald-500/5 to-transparent",
    ring: "group-hover:border-emerald-400/40",
  },
  {
    id: "organisms",
    si: "ජීවී විවිධත්වය",
    en: "Organisms & microbes",
    desc: "බැක්ටීරියා, ප්‍රොටිස්ටා, දිලීර, අපෘෂ්ඨවංශී හා කෘෂ්ඨවංශී නියැදි ක්ලික් කර පරීක්ෂා කරන්න.",
    icon: Microscope,
    grad: "from-sky-500/20 via-sky-500/5 to-transparent",
    ring: "group-hover:border-sky-400/40",
  },
];

export function HomeView({ onNavigate }: { onNavigate: (v: View) => void }) {
  const entries = ANATOMY.length + PLANTS.length + ORGANISMS.length;
  const questions = [...ANATOMY, ...PLANTS, ...ORGANISMS].reduce(
    (s, e) => s + e.quiz.length,
    0
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-7 sm:px-6 sm:py-10">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-ink-850/90 via-ink-900/70 to-ink-950 p-5 shadow-panel sm:p-8"
      >
        <div className="scan-grid pointer-events-none absolute inset-0 opacity-40" />
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-lab-teal/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />

        <div className="relative">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-lab-teal/25 bg-lab-teal/[0.08] px-2.5 py-1 text-[10px] text-lab-teal">
            <Sparkles size={11} />
            NIE A/L ජීව විද්‍යාව · ඒකක 1–10 · සිංහල මාධ්‍ය
          </div>
          <h1 className="max-w-2xl font-display text-[27px] font-bold leading-[1.25] text-white sm:text-[38px]">
            ජීව විද්‍යාව,
            <span className="bg-gradient-to-r from-lab-teal via-emerald-300 to-sky-300 bg-clip-text text-transparent">
              {" "}
              ත්‍රිමානව
            </span>{" "}
            අත්දැක ඉගෙන ගන්න.
          </h1>
          <p className="si-body mt-3 max-w-2xl text-[12.5px] leading-relaxed text-slate-400 sm:text-[13.5px]">
            මානව අවයව, ශාක ව්‍යුහ හා ක්ෂුද්‍ර ජීවීන් අන්තර්ක්‍රියාකාරීව වෙන් කර
            පරීක්ෂා කරන්න. සෑම කොටසක් සමඟම NIE පාඩම් සටහන්, කෘත්‍යයන්, විභාග
            ඉලක්කගත කරුණු හා A/L මට්ටමේ MCQ ප්‍රශ්න එකවර ලැබේ.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <button
              onClick={() => onNavigate({ kind: "mode", mode: "anatomy" })}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-lab-teal to-emerald-400 px-4 py-2.5 text-[12.5px] font-semibold text-ink-950 shadow-lg shadow-lab-teal/20 transition hover:brightness-110"
            >
              <HeartPulse size={15} />
              හෘදය වෙන් කර බලන්න
              <ArrowRight size={13} />
            </button>
            <button
              onClick={() => onNavigate({ kind: "unit", id: 5 })}
              className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-4 py-2.5 text-[12.5px] font-medium text-slate-200 transition hover:border-white/30 hover:bg-white/[0.06]"
            >
              <BookOpen size={14} />
              ඒකක 5 — සත්ත්ව ආකාරය
            </button>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {[
              { v: "10", l: "NIE ඒකක" },
              { v: "03", l: "සිමියුලේටර් මාදිලි" },
              { v: String(entries), l: "පාඩම් කොටස්" },
              { v: `${questions}+`, l: "A/L MCQ" },
            ].map((s) => (
              <div key={s.l} className="rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 py-2.5">
                <p className="font-display text-[20px] font-bold leading-none text-white">{s.v}</p>
                <p className="mt-1 text-[9.5px] tracking-wide text-slate-500">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {cards.map((c, i) => (
          <motion.button
            key={c.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 * i, duration: 0.4 }}
            onClick={() => onNavigate({ kind: "mode", mode: c.id })}
            className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${c.grad} p-4 text-left transition hover:-translate-y-0.5 hover:shadow-panel ${c.ring}`}
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="grid h-9 w-9 place-items-center rounded-xl border border-white/15 bg-white/[0.06] text-white">
                <c.icon size={17} />
              </span>
              <ArrowRight
                size={15}
                className="text-slate-500 transition group-hover:translate-x-0.5 group-hover:text-white"
              />
            </div>
            <h3 className="font-display text-[16px] font-semibold text-white">{c.si}</h3>
            <p className="text-[9.5px] uppercase tracking-[0.12em] text-slate-500">{c.en}</p>
            <p className="si-body mt-2 text-[11px] leading-relaxed text-slate-400">{c.desc}</p>
          </motion.button>
        ))}
      </div>

      <div className="mt-7">
        <div className="mb-2.5 flex items-center justify-between">
          <h2 className="flex items-center gap-2 font-display text-[15px] font-semibold text-white">
            <Dna size={15} className="text-lab-teal" />
            විෂය නිර්දේශය අනුව ගවේෂණය
          </h2>
          <span className="text-[10px] text-slate-500">ඒකක 1–10</span>
        </div>
        <div className="grid gap-1.5 sm:grid-cols-2">
          {UNITS.map((u) => (
            <button
              key={u.id}
              onClick={() => onNavigate({ kind: "unit", id: u.id })}
              className="group flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] px-3 py-2.5 text-left transition hover:border-lab-teal/30 hover:bg-white/[0.045]"
            >
              <span className="font-display text-[11px] font-bold tabular-nums text-lab-teal/70">
                {String(u.id).padStart(2, "0")}
              </span>
              <span className="min-w-0 flex-1">
                <span className="si-body block truncate text-[11.5px] font-medium text-slate-200">
                  {u.si}
                </span>
                <span className="block truncate text-[9px] text-slate-500">{u.en}</span>
              </span>
              <ArrowRight
                size={12}
                className="shrink-0 text-slate-600 transition group-hover:text-lab-teal"
              />
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-start gap-2 rounded-xl border border-white/[0.07] bg-white/[0.02] p-3.5">
        <Microscope size={15} className="mt-0.5 shrink-0 text-lab-teal" />
        <p className="text-[10.5px] leading-relaxed text-slate-500">
          ඉඟිය: ඉහළ දකුණේ <span className="text-sky-300">විද්‍යාත්මක පද</span> ස්විචය
          ක්‍රියාත්මක කර ඕනෑම අවයවයක Sinhala + English scientific terms එකට බලන්න.
          නියැදි මත hover කිරීමෙන් ද ඉංග්‍රීසි පද මතු වේ.
        </p>
      </div>
    </div>
  );
}
