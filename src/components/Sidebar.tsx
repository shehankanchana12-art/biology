import { AnimatePresence, motion } from "framer-motion";
import {
  Atom,
  Boxes,
  Dna,
  HeartPulse,
  Leaf,
  Microscope,
  X,
} from "lucide-react";
import type { ModeId } from "../data/types";
import { UNITS } from "../data/units";
import type { View } from "../App";

const MODES: { id: ModeId; si: string; en: string; icon: typeof HeartPulse }[] = [
  { id: "anatomy", si: "මානව දේහය", en: "3D exploded anatomy", icon: HeartPulse },
  { id: "plants", si: "ශාක විවිධත්වය", en: "Plant form & sections", icon: Leaf },
  { id: "organisms", si: "ජීවී විවිධත්වය", en: "Organisms & microbes", icon: Microscope },
];

export function SidebarContent({
  view,
  onNavigate,
  onClose,
}: {
  view: View;
  onNavigate: (v: View) => void;
  onClose?: () => void;
}) {
  const go = (v: View) => {
    onNavigate(v);
    onClose?.();
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2.5 px-5 pb-5 pt-5">
        <div className="relative grid h-10 w-10 place-items-center rounded-xl border border-lab-teal/30 bg-gradient-to-br from-lab-teal/20 to-sky-500/10 text-lab-teal">
          <Dna size={20} />
          <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-lab-teal shadow-[0_0_10px_rgba(45,212,191,0.9)]" />
        </div>
        <div className="min-w-0">
          <p className="font-display text-[15px] font-bold leading-tight text-white">
            ජීව විද්‍යා මණ්ඩපය
          </p>
          <p className="text-[10px] tracking-wide text-slate-500">
            G.C.E. A/L · සිංහල මාධ්‍ය
          </p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-auto grid h-8 w-8 place-items-center rounded-lg border border-white/10 text-slate-400 lg:hidden"
          >
            <X size={15} />
          </button>
        )}
      </div>

      <div className="drawer-scroll flex-1 overflow-y-auto px-3 pb-6">
        <button
          onClick={() => go({ kind: "home" })}
          className={[
            "flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-[12.5px] transition",
            view.kind === "home"
              ? "border border-lab-teal/30 bg-lab-teal/10 text-white"
              : "border border-transparent text-slate-400 hover:bg-white/[0.04] hover:text-white",
          ].join(" ")}
        >
          <Boxes size={15} className="text-lab-teal" />
          <span>ආරම්භක පුවරුව</span>
        </button>

        <p className="label-eyebrow mb-2 mt-6 px-3">අන්තර්ක්‍රියාකාරී සිමියුලේටර්</p>
        <div className="space-y-1">
          {MODES.map((m) => {
            const active = view.kind === "mode" && view.mode === m.id;
            const Icon = m.icon;
            return (
              <button
                key={m.id}
                onClick={() => go({ kind: "mode", mode: m.id })}
                className={[
                  "group flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition",
                  active
                    ? "border-lab-teal/30 bg-gradient-to-r from-lab-teal/[0.12] to-transparent"
                    : "border-transparent hover:bg-white/[0.04]",
                ].join(" ")}
              >
                <span
                  className={[
                    "grid h-8 w-8 shrink-0 place-items-center rounded-lg border transition",
                    active
                      ? "border-lab-teal/40 bg-lab-teal/15 text-lab-teal"
                      : "border-white/10 bg-white/[0.03] text-slate-400 group-hover:text-white",
                  ].join(" ")}
                >
                  <Icon size={15} />
                </span>
                <span className="min-w-0">
                  <span
                    className={`block truncate text-[12.5px] font-medium ${active ? "text-white" : "text-slate-300"}`}
                  >
                    {m.si}
                  </span>
                  <span className="block truncate text-[9.5px] text-slate-500">{m.en}</span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="mb-2 mt-6 flex items-center justify-between px-3">
          <p className="label-eyebrow">NIE ඒකක 1–10</p>
          <Atom size={12} className="text-slate-600" />
        </div>
        <div className="space-y-0.5">
          {UNITS.map((u) => {
            const active = view.kind === "unit" && view.id === u.id;
            return (
              <button
                key={u.id}
                onClick={() => go({ kind: "unit", id: u.id })}
                className={[
                  "flex w-full items-start gap-2.5 rounded-lg px-3 py-2 text-left transition",
                  active ? "bg-white/[0.06]" : "hover:bg-white/[0.035]",
                ].join(" ")}
              >
                <span
                  className={`mt-[1px] w-5 shrink-0 font-display text-[10.5px] font-bold tabular-nums ${
                    active ? "text-lab-teal" : "text-slate-600"
                  }`}
                >
                  {String(u.id).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className={`si-body block text-[11.5px] leading-snug ${
                      active ? "font-medium text-white" : "text-slate-400"
                    }`}
                  >
                    {u.si}
                  </span>
                  <span className="mt-0.5 block truncate text-[9px] text-slate-600">{u.en}</span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-6 rounded-xl border border-white/[0.07] bg-white/[0.02] p-3">
          <p className="text-[10px] leading-relaxed text-slate-500">
            සියලු අන්තර්ගත NIE උසස් පෙළ ජීව විද්‍යා සම්පත් පොත් (ඒකක 1–10) සමඟ
            අනුකූලව සකසා ඇත.
          </p>
        </div>
      </div>
    </div>
  );
}

export function Sidebar({
  view,
  onNavigate,
  open,
  onClose,
}: {
  view: View;
  onNavigate: (v: View) => void;
  open: boolean;
  onClose: () => void;
}) {
  return (
    <>
      <aside className="hidden h-full w-[268px] shrink-0 border-r border-white/[0.07] bg-ink-900/60 lg:block">
        <SidebarContent view={view} onNavigate={onNavigate} />
      </aside>

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="absolute inset-y-0 left-0 w-[280px] border-r border-white/10 bg-ink-900"
            >
              <SidebarContent view={view} onNavigate={onNavigate} onClose={onClose} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
