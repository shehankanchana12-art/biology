export type QuizQuestion = {
  q: string;
  options: string[];
  answer: number;
  explain: string;
};

export type StudyEntry = {
  id: string;
  /** Sinhala name used in the syllabus */
  name: string;
  /** English scientific term / binomial name */
  term: string;
  /** Optional shorter descriptor */
  tagline?: string;
  group: string;
  intro: string;
  structure: string[];
  functions: string[];
  exam: string[];
  quiz: QuizQuestion[];
};

export type AnatomyOrgan = StudyEntry & {
  system: string;
  sex?: "male" | "female";
};

export type Specimen = {
  id: string;
  name: string;
  term: string;
  group: string;
  blurb: string;
  parts: string[];
};

export type ModeId = "anatomy" | "plants" | "organisms";
