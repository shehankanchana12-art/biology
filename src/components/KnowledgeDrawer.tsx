import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  ChevronRight,
  Layers,
  MapPin,
  Microscope,
  RefreshCw,
  Target,
  X,
} from "lucide-react";
import { lifecycleForEntry } from "../data/lifecycles";
import type { StudyEntry } from "../data/types";
import { LifeCycleBody } from "./LifeCycleSection";
import { Quiz } from "./Quiz";
import { SciTerm } from "./SciTerm";

const Section = ({
  icon: Icon,
  title,
  en,
  children,
  index,
}: {
  icon: typeof MapPin;
  title: string;
  en: string;
  children: React.ReactNode;
  index: string;
}) => (
  <section className="border-t border-white/[0.06] px-5 py-4">
    <div className="mb-2.5 flex items-center gap-2">
      <span className="grid h-6 w-6 place-items-center rounded-md border border-lab-teal/25 bg-lab-teal/10 text-lab-teal">
        <Icon size={12} />
      </span>
      <h3 className="font-display text-[13.5px] font-semibold text-white">{title}</h3>
      <SciTerm en={en} />
      <span className="ml-auto font-display text-[10px] text-slate-600">{index}</span>
    </div>
    {children}
  </section>
);

const Bullets = ({ items }: { items: string[] }) => (
  <ul className="space-y-2">
    {items.map((item, i) => (
      <li key={i} className="flex gap-2">
        <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-lab-teal/70" />
        <p className="si-body text-[12px] leading-relaxed text-slate-300">{item}</p>
      </li>
    ))}
  </ul>
);

export function KnowledgeDrawer({
  entry,
  accent = "#2dd4bf",
  onClose,
}: {
  entry: StudyEntry | null;
  accent?: string;
  onClose: () => void;
}) {
  const lifecycle = entry ? lifecycleForEntry(entry.id) : null;

  return (
    <AnimatePresence>
      {entry && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
          />
          <motion.aside
            key={entry.id}
            initial={{ x: 520, opacity: 0.6 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 520, opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 260 }}
            className="relative flex h-full w-full max-w-[460px] flex-col border-l border-white/10 bg-ink-900 shadow-panel"
          >
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-40 opacity-40"
              style={{
                background: `radial-gradient(420px 160px at 20% 0%, ${accent}33, transparent 70%)`,
              }}
            />

            <div className="relative shrink-0 border-b border-white/10 px-5 pb-4 pt-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="mb-1.5 flex items-center gap-2">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: accent, boxShadow: `0 0 10px ${accent}` }}
                    />
                    <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-400">
                      {entry.group}
                    </span>
                  </div>
                  <h2 className="font-display text-[24px] font-bold leading-tight text-white">
                    {entry.name}
                  </h2>
                  <div className="group mt-1.5 flex flex-wrap items-center gap-2">
                    <SciTerm en={entry.term} className="text-[11px]" />
                    {entry.tagline && (
                      <span className="text-[10.5px] text-slate-500">· {entry.tagline}</span>
                    )}
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-white/10 text-slate-400 transition hover:border-white/30 hover:text-white"
                  aria-label="වසන්න"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            <div className="drawer-scroll relative flex-1 overflow-y-auto pb-8">
              <Section icon={MapPin} title="හැඳින්වීම සහ පිහිටීම" en="Introduction & location" index="01">
                <p className="si-body text-[12.5px] leading-[1.95] text-slate-300">{entry.intro}</p>
              </Section>

              <Section icon={Layers} title="ව්‍යුහය" en="Structure & histology" index="02">
                <Bullets items={entry.structure} />
              </Section>

              <Section icon={Activity} title="කෘත්‍යයන්" en="Physiological functions" index="03">
                <Bullets items={entry.functions} />
              </Section>

              {lifecycle && (
                <Section
                  icon={RefreshCw}
                  title="පරම්පරා ප්‍රත්‍යාවර්තනය"
                  en="Alternation of generations"
                  index="04"
                >
                  <LifeCycleBody cycle={lifecycle} />
                </Section>
              )}

              <Section
                icon={Target}
                title="විභාග ඉලක්කගත කරුණු"
                en="A/L exam focus"
                index={lifecycle ? "05" : "04"}
              >
                <div className="rounded-xl border border-amber-400/20 bg-amber-400/[0.05] p-3">
                  <Bullets items={entry.exam} />
                </div>
              </Section>

              <div className="mx-5 mt-4 rounded-xl border border-white/[0.07] bg-white/[0.02] p-3">
                <div className="flex items-center gap-2 text-[10px] text-slate-500">
                  <Microscope size={12} className="text-lab-teal" />
                  <span>සිංහල මාධ්‍ය A/L ව්‍යුහගත රචනා පිළිතුරු සඳහා පදනම</span>
                </div>
              </div>

              <div className="px-5 pt-5">
                <Quiz key={entry.id} questions={entry.quiz} />
              </div>

              <div className="mt-5 flex items-center gap-1.5 px-5 text-[10px] text-slate-600">
                <ChevronRight size={11} />
                <span>තවත් කොටසක් තෝරන්න හෝ Esc යතුරෙන් වසන්න</span>
              </div>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
