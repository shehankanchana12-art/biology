import type { AnatomyOrgan } from "../types";
import { THORACIC } from "./thoracic";
import { LUNGS } from "./lungs";
import { TRACHEA } from "./trachea";
import { LIVER } from "./liver";
import { STOMACH } from "./stomach";
import { PANCREAS } from "./pancreas";
import { SMALL_INTESTINE } from "./smallIntestine";
import { LARGE_INTESTINE } from "./largeIntestine";
import { KIDNEY } from "./kidney";
import { BLADDER } from "./bladder";
import { BRAIN } from "./brain";
import { SPINAL_CORD } from "./spinalCord";
import { SKELETON } from "./skeleton";
import { THYROID } from "./thyroid";
import { UTERUS } from "./uterus";
import { OVARY } from "./ovary";
import { TESTIS } from "./testis";

export const ANATOMY: AnatomyOrgan[] = [
  ...THORACIC,
  ...LUNGS,
  ...TRACHEA,
  ...LIVER,
  ...STOMACH,
  ...PANCREAS,
  ...SMALL_INTESTINE,
  ...LARGE_INTESTINE,
  ...KIDNEY,
  ...BLADDER,
  ...BRAIN,
  ...SPINAL_CORD,
  ...SKELETON,
  ...THYROID,
  ...UTERUS,
  ...OVARY,
  ...TESTIS,
];

export const anatomyById = (id: string) => ANATOMY.find((o) => o.id === id);
