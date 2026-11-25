export type LifeCycleStage = {
  /** Full Sinhala stage label used in the stage list */
  name: string;
  /** Very short label used around the circular diagram */
  short: string;
  /** English scientific term */
  term: string;
  /** Ploidy, e.g. "n", "2n", "n + n → 2n" */
  ploidy: string;
  /** What happens in this stage */
  detail: string;
};

export type LifeCycle = {
  id: string;
  title: string;
  term: string;
  summary: string;
  dominant: string;
  stages: LifeCycleStage[];
  exam: string[];
};
