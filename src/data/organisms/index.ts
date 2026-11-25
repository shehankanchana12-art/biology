import type { Specimen, StudyEntry } from "../types";
import { BACTERIA } from "./bacteria";
import { AMOEBA } from "./amoeba";
import { EUGLENA } from "./euglena";
import { PARAMECIUM } from "./paramecium";
import { RHIZOPUS } from "./rhizopus";
import { EARTHWORM } from "./earthworm";
import { FISH } from "./fish";

export const ORGANISMS: StudyEntry[] = [
  ...BACTERIA,
  ...AMOEBA,
  ...EUGLENA,
  ...PARAMECIUM,
  ...RHIZOPUS,
  ...EARTHWORM,
  ...FISH,
];

export const ORGANISM_SPECIMENS: Specimen[] = [
  {
    id: "bacteria",
    name: "බැක්ටීරියාව",
    term: "Escherichia coli",
    group: "මොනෙරා — ප්‍රොකැරියෝට",
    blurb:
      "පටලයෙන් ආවරණය නොවූ න්‍යෂ්ටියක් හා පෙප්ටිඩොග්ලයිකෑන් බිත්තියක් සහිත ඒක සෛලීය ප්‍රොකැරියෝටයකි.",
    parts: ["bacteria-wall", "bacteria-nucleoid", "bacteria-flagellum"],
  },
  {
    id: "amoeba",
    name: "ඇමීබා",
    term: "Amoeba proteus",
    group: "ප්‍රොටිස්ටා — හැඩය වෙනස් වන",
    blurb:
      "සියුඩොපෝඩියා මගින් චලනය වන හා ආහාර ගන්නා ඒක සෛලීය යුකැරියෝටයකි.",
    parts: ["amoeba-pseudopodium", "amoeba-nucleus", "amoeba-contractile-vacuole"],
  },
  {
    id: "euglena",
    name: "යුග්ලීනා",
    term: "Euglena viridis",
    group: "ප්‍රොටිස්ටා — මිශ්‍ර පෝෂණ",
    blurb:
      "ෆ්ලැජෙලමය, ක්ලෝරොප්ලාස්ට් හා අක්ෂි ලපය සහිත, ශාක හා සත්ත්ව ලක්ෂණ දෙකම දක්වන ප්‍රොටිස්ටාවකි.",
    parts: ["euglena-flagellum", "euglena-chloroplast", "euglena-eyespot"],
  },
  {
    id: "paramecium",
    name: "පැරමීසියම්",
    term: "Paramecium caudatum",
    group: "ප්‍රොටිස්ටා — සිලියා සහිත",
    blurb:
      "සිලියා මගින් චලනය වන අතර න්‍යෂ්ටි දෙකක් හා සංකෝචක රික්තක දෙකක් ඇති ජලජ ප්‍රොටිස්ටාවකි.",
    parts: ["paramecium-cilia", "paramecium-nucleus", "paramecium-vacuole"],
  },
  {
    id: "rhizopus",
    name: "රයිසෝපස්",
    term: "Rhizopus stolonifer",
    group: "ෆන්ගයි — දිලීර",
    blurb:
      "කයිටින් බිත්තියක් හා කොටස් බෙදී නොමැති හයිෆේ සහිත සප්‍රොෆයිටික දිලීරයකි; පාන් බිඳෙන දිලීරය ලෙස ප්‍රසිද්ධය.",
    parts: ["rhizopus-hyphae", "rhizopus-sporangium", "rhizopus-rhizoid"],
  },
  {
    id: "earthworm",
    name: "ගැඩවිලා",
    term: "Pheretima posthuma",
    group: "අපෘෂ්ඨවංශී — Annelida",
    blurb:
      "ඛණ්ඩිත සිරුරක්, සීටේ, ක්ලිටෙලමයක් හා සංවෘත රුධිර සංසරණයක් සහිත පස් තුළ ජීවත් වන ඇනලිඩාවෙකි.",
    parts: ["earthworm-clitellum", "earthworm-setae", "earthworm-gut"],
  },
  {
    id: "fish",
    name: "මත්ස්‍යයා",
    term: "Oreochromis mossambicus",
    group: "කෘෂ්ඨවංශී — Pisces",
    blurb:
      "කර්ණපත්‍ර මගින් ශ්වසනය කරන, පිහිනුම් බුබුලක් හා පාර්ශ්ව රේඛාවක් සහිත ජලජ කෘෂ්ඨවංශියෙකි.",
    parts: ["fish-gills", "fish-swim-bladder", "fish-lateral-line"],
  },
];

export const organismEntryById = (id: string) => ORGANISMS.find((o) => o.id === id);
