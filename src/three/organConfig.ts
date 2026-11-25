export type Vec3 = [number, number, number];

export type OrganVisual = {
  id: string;
  system: string;
  base: Vec3;
  explode: Vec3;
  sex?: "male" | "female";
  labelY?: number;
  focusOffset?: Vec3;
};

export const ORGAN_VISUALS: OrganVisual[] = [
  { id: "heart", system: "circulatory", base: [-0.06, 0.6, 0.12], explode: [-0.85, 0.5, 1.0], labelY: 0.4 },
  { id: "lungs", system: "respiratory", base: [0, 0.72, 0], explode: [0, 0.95, 0.8], labelY: 0.55 },
  { id: "trachea", system: "respiratory", base: [0, 1.1, 0.02], explode: [0, 0.62, 1.15], labelY: 0.3 },
  { id: "liver", system: "digestive", base: [0.26, 0.16, 0.1], explode: [1.0, 0.3, 0.95], labelY: 0.28 },
  { id: "stomach", system: "digestive", base: [-0.3, 0.18, 0.06], explode: [-1.0, 0.15, 1.0], labelY: 0.3 },
  { id: "pancreas", system: "digestive", base: [-0.02, 0.0, 0.0], explode: [0.05, -0.4, 1.3], labelY: 0.18 },
  { id: "small-intestine", system: "digestive", base: [0, -0.4, 0.12], explode: [0.15, -0.7, 1.15], labelY: 0.42 },
  { id: "large-intestine", system: "digestive", base: [0, -0.38, 0.0], explode: [-0.95, -0.62, 0.6], labelY: 0.5 },
  { id: "kidney", system: "excretory", base: [0, 0.0, -0.2], explode: [0, 0.05, 1.0], labelY: 0.3 },
  { id: "bladder", system: "excretory", base: [0, -0.8, 0.1], explode: [0.9, -0.85, 0.85], labelY: 0.22 },
  { id: "brain", system: "nervous", base: [0, 1.9, -0.01], explode: [0, 0.62, 0.5], labelY: 0.3 },
  { id: "spinal-cord", system: "nervous", base: [0, 0.75, -0.24], explode: [-1.2, 0.45, 0.2], labelY: 0.5 },
  { id: "skeleton", system: "skeletal", base: [0, 0.05, -0.05], explode: [0, 0.05, -0.2], labelY: 1.2 },
  { id: "thyroid", system: "endocrine", base: [0, 1.28, 0.03], explode: [-1.1, 1.0, 0.7], labelY: 0.16 },
  { id: "uterus", system: "reproductive", base: [0, -0.55, 0.12], explode: [0, -1.0, 1.5], sex: "female", labelY: 0.3 },
  { id: "ovary", system: "reproductive", base: [0, -0.45, 0.06], explode: [0, -0.55, 1.45], sex: "female", labelY: 0.2 },
  { id: "testis", system: "reproductive", base: [0, -1.0, 0.16], explode: [0.5, -0.7, 1.5], sex: "male", labelY: 0.24 },
];

export const visualById = (id: string) => ORGAN_VISUALS.find((o) => o.id === id);

export const finalPosition = (v: OrganVisual, exploded: boolean): Vec3 =>
  exploded ? [v.base[0] + v.explode[0], v.base[1] + v.explode[1], v.base[2] + v.explode[2]] : v.base;
