import { Languages, Menu, Sparkles } from "lucide-react";
import { useApp } from "../lib/store";

export function TopBar({
  title,
  subtitle,
  onMenu,
}: {
  title: string;
  subtitle: string;
  onMenu: () => void;
}) {
  const { bilingual, toggleBilingual } = useApp();

  return (
    <header className="relative z-20 flex h-16 shrink-0 items-center gap-3 border-b border-white/[0.07] bg-ink-950/70 px-3 backdrop-blur-xl sm:px-5">
      <button
        onClick={onMenu}
        className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-slate-300 transition hover:border-white/25 hover:text-white lg:hidden"
        aria-label="මෙනුව"
      >
        <Menu size={16} />
      </button>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <span className="label-eyebrow hidden sm:inline">ජීව විද්‍යා මණ්ඩපය</span>
          <span className="hidden text-slate-600 sm:inline">/</span>
          <span className="truncate text-[11px] text-slate-400">{subtitle}</span>
        </div>
        <h1 className="mt-0.5 truncate font-display text-[17px] font-semibold leading-tight text-white">
          {title}
        </h1>
      </div>

      <div className="hidden items-center gap-1.5 rounded-full border border-lab-teal/20 bg-lab-teal/[0.06] px-2.5 py-1 text-[10px] text-lab-teal/90 md:flex">
        <Sparkles size={11} />
        <span>A/L · NIE නිර්දේශිත</span>
      </div>

      <button
        onClick={toggleBilingual}
        title="විද්‍යාත්මක ඉංග්‍රීසි පද පෙන්වන්න / සඟවන්න"
        className={[
          "group flex items-center gap-2 rounded-lg border px-2.5 py-2 text-[11px] font-medium transition",
          bilingual
            ? "border-sky-400/40 bg-sky-400/10 text-sky-200"
            : "border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/25 hover:text-white",
        ].join(" ")}
      >
        <Languages size={14} />
        <span className="hidden sm:inline">විද්‍යාත්මක පද</span>
        <span
          className={[
            "relative h-4 w-7 rounded-full transition",
            bilingual ? "bg-sky-400/70" : "bg-white/15",
          ].join(" ")}
        >
          <span
            className={[
              "absolute top-[2px] h-3 w-3 rounded-full bg-white transition-all",
              bilingual ? "left-[14px]" : "left-[2px]",
            ].join(" ")}
          />
        </span>
      </button>
    </header>
  );
}
