import type { UnitNotes } from "./types";
import { unit01 } from "./unit01";
import { unit02 } from "./unit02";
import { unit03 } from "./unit03";
import { unit04 } from "./unit04";
import { unit05 } from "./unit05";
import { unit06 } from "./unit06";
import { unit07 } from "./unit07";
import { unit08 } from "./unit08";
import { unit09 } from "./unit09";
import { unit10 } from "./unit10";

export type { NoteGroup, NoteItem, UnitNotes } from "./types";

const NOTES: Record<number, UnitNotes> = {
  1: unit01,
  2: unit02,
  3: unit03,
  4: unit04,
  5: unit05,
  6: unit06,
  7: unit07,
  8: unit08,
  9: unit09,
  10: unit10,
};

export function notesForUnit(id: number): UnitNotes | undefined {
  return NOTES[id];
}
