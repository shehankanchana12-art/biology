export type NoteItem = {
  /** Bold Sinhala lead term */
  term?: string;
  /** English scientific term shown as a badge */
  en?: string;
  text?: string;
  /** Nested bullets (sub-points of this item) */
  sub?: string[];
};

export type NoteGroup = {
  title: string;
  en?: string;
  intro?: string;
  items: NoteItem[];
};

export type UnitNotes = {
  groups: NoteGroup[];
  /** Exam-focused closing tips for the unit */
  tips?: string[];
};
