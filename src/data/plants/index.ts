import type { Specimen, StudyEntry } from "../types";
import { POGONATUM } from "./pogonatum";
import { NEPHROLEPIS } from "./nephrolepis";
import { CYCAS } from "./cycas";
import { MONOCOT } from "./monocot";
import { DICOT } from "./dicot";

export const PLANTS: StudyEntry[] = [
  ...POGONATUM,
  ...NEPHROLEPIS,
  ...CYCAS,
  ...MONOCOT,
  ...DICOT,
];

export const PLANT_SPECIMENS: Specimen[] = [
  {
    id: "pogonatum",
    name: "පොගොනේටම්",
    term: "Pogonatum",
    group: "බ්‍රයෝෆයිටා",
    blurb:
      "පත්‍ර සහිත ගැමිටොෆයිටය ප්‍රධාන වන බ්‍රයෝෆයිටා ශාකයකි. ජලය අවශ්‍ය නිෂේචනය හා රයිසොයිඩ මගින් සවි වීම විභාගයේ ප්‍රධාන කරුණුය.",
    parts: [
      "pogonatum-leaf",
      "pogonatum-stem",
      "pogonatum-rhizoid",
      "pogonatum-seta",
      "pogonatum-capsule",
    ],
  },
  {
    id: "nephrolepis",
    name: "නෙෆ්‍රොලෙපිස්",
    term: "Nephrolepis",
    group: "ප්ටෙරිඩොෆයිටා",
    blurb:
      "සැබෑ සංවහන පටක සහිත ප්ටෙරිඩොෆයිටාවකි. ස්පෝරොෆයිටය ප්‍රධාන වන අතර ප්‍රෝතැලසය ස්වාධීන ගැමිටොෆයිටයයි.",
    parts: [
      "nephrolepis-rhizome",
      "nephrolepis-frond",
      "nephrolepis-sorus",
      "nephrolepis-root",
    ],
  },
  {
    id: "cycas",
    name: "සයිකාස්",
    term: "Cycas circinalis",
    group: "ජිම්නොස්පර්මෝෆයිටා",
    blurb:
      "නිදහස් බීජ හා කේතු සහිත ජිම්නොස්පර්මයකි. ශ්‍රී ලංකාවේ දක්නට ලැබෙන Cycas circinalis හි කොරලොයිඩ් මුල් විශේෂ ලක්ෂණයකි.",
    parts: ["cycas-trunk", "cycas-leaf", "cycas-cone", "cycas-seed"],
  },
  {
    id: "monocot",
    name: "ඒකබීජපත්‍රී",
    term: "Monocotyledon (Zea mays)",
    group: "ඇන්ජියොස්පර්මෝෆයිටා",
    blurb:
      "තන්තු මුල්, විසිරුණු සංවහන කදම්භ, සමාන්තර නාරටි හා එක් කොටිලිඩෝනයක් — ඒකබීජපත්‍රී ලක්ෂණ පිළිබඳ සිමියුලේටර්.",
    parts: ["monocot-root", "monocot-stem", "monocot-leaf", "monocot-flower"],
  },
  {
    id: "dicot",
    name: "ද්විබීජපත්‍රී",
    term: "Dicotyledon (Phaseolus)",
    group: "ඇන්ජියොස්පර්මෝෆයිටා",
    blurb:
      "මූලික මුල්, වළල්ලකට සැකසුණු විවෘත කදම්භ, ජාලාකාර නාරටි හා කොටිලිඩෝන දෙකක් සහිත ද්විබීජපත්‍රී ලක්ෂණ.",
    parts: ["dicot-root", "dicot-stem", "dicot-leaf", "dicot-flower"],
  },
];

export const plantEntryById = (id: string) => PLANTS.find((p) => p.id === id);
