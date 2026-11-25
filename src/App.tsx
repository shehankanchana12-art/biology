import { useEffect, useState } from "react";
import { AppProvider } from "./lib/store";
import { Sidebar } from "./components/Sidebar";
import { TopBar } from "./components/TopBar";
import { HomeView } from "./components/HomeView";
import { UnitView } from "./components/UnitView";
import { AnatomyMode } from "./components/AnatomyMode";
import { PlantMode } from "./components/PlantMode";
import { OrganismMode } from "./components/OrganismMode";
import { KnowledgeDrawer } from "./components/KnowledgeDrawer";
import { UNITS } from "./data/units";
import { systemsByIdList } from "./data/systemLookup";
import type { ModeId, StudyEntry } from "./data/types";

export type View =
  | { kind: "home" }
  | { kind: "unit"; id: number }
  | { kind: "mode"; mode: ModeId };

const MODE_META: Record<ModeId, { title: string; subtitle: string }> = {
  anatomy: {
    title: "මානව දේහය — ත්‍රිමාන සිමියුලේටර්",
    subtitle: "ඒකකය 5 · සත්ත්ව ආකාරය සහ ක්‍රියාකාරීත්වය",
  },
  plants: {
    title: "ශාක විවිධත්වය සහ ව්‍යුහය",
    subtitle: "ඒකකය 4 · ශාක ආකාරය සහ ක්‍රියාකාරීත්වය",
  },
  organisms: {
    title: "ජීවීන්ගේ විවිධත්වය හා ක්ෂුද්‍රජීවීන්",
    subtitle: "ඒකක 3 & 9 · විවිධත්වය සහ ක්ෂුද්‍රජීව විද්‍යාව",
  },
};

function Shell() {
  const [view, setView] = useState<View>({ kind: "home" });
  const [selected, setSelected] = useState<StudyEntry | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = (v: View) => {
    setView(v);
    setSelected(null);
    setMenuOpen(false);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const unit = view.kind === "unit" ? UNITS.find((u) => u.id === view.id) : null;

  const title =
    view.kind === "home"
      ? "ආරම්භක පුවරුව"
      : view.kind === "unit"
        ? (unit?.si ?? "ඒකකය")
        : MODE_META[view.mode].title;

  const subtitle =
    view.kind === "home"
      ? "සාදරයෙන් පිළිගනිමු · A/L ජීව විද්‍යාව"
      : view.kind === "unit"
        ? `ඒකකය ${view.id} · ${unit?.en ?? ""}`
        : MODE_META[view.mode].subtitle;

  const accent = selected
    ? systemsByIdList.find((s) => selected.group.includes(s.si))?.color ??
      (selected.group.includes("ශාක") || /Cycas|Pogonatum|Nephrolepis|ඇන්ජියෝ/.test(selected.group)
        ? "#4ade80"
        : "#38bdf8")
    : "#2dd4bf";

  return (
    <div className="flex h-full overflow-hidden">
      <Sidebar
        view={view}
        onNavigate={navigate}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar title={title} subtitle={subtitle} onMenu={() => setMenuOpen(true)} />

        <main
          className={`relative min-h-0 flex-1 ${
            view.kind === "mode" ? "overflow-hidden" : "overflow-y-auto"
          }`}
        >
          {view.kind === "home" && <HomeView onNavigate={navigate} />}
          {view.kind === "unit" && <UnitView id={view.id} onNavigate={navigate} />}
          {view.kind === "mode" && view.mode === "anatomy" && (
            <AnatomyMode selectedId={selected?.id ?? null} onSelect={setSelected} />
          )}
          {view.kind === "mode" && view.mode === "plants" && (
            <PlantMode selectedId={selected?.id ?? null} onSelect={setSelected} />
          )}
          {view.kind === "mode" && view.mode === "organisms" && (
            <OrganismMode selectedId={selected?.id ?? null} onSelect={setSelected} />
          )}
        </main>
      </div>

      <KnowledgeDrawer entry={selected} accent={accent} onClose={() => setSelected(null)} />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Shell />
    </AppProvider>
  );
}
