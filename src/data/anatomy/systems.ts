export type AnatomySystem = {
  id: string;
  si: string;
  en: string;
  color: string;
};

export const SYSTEMS: AnatomySystem[] = [
  { id: "circulatory", si: "සංසරණ පද්ධතිය", en: "Circulatory system", color: "#fb7185" },
  { id: "respiratory", si: "ශ්වසන පද්ධතිය", en: "Respiratory system", color: "#38bdf8" },
  { id: "digestive", si: "ආහාර ජීර්ණ පද්ධතිය", en: "Digestive system", color: "#fbbf24" },
  { id: "nervous", si: "ස්නායු පද්ධතිය", en: "Nervous system", color: "#a78bfa" },
  { id: "excretory", si: "බහිස්ස්‍රාවී පද්ධතිය", en: "Excretory system", color: "#34d399" },
  { id: "skeletal", si: "ඇට සැකිලි පද්ධතිය", en: "Skeletal system", color: "#e2e8f0" },
  { id: "endocrine", si: "අන්තඃස්‍රාවී පද්ධතිය", en: "Endocrine system", color: "#facc15" },
  { id: "reproductive", si: "ප්‍රජනක පද්ධතිය", en: "Reproductive system", color: "#f472b6" },
];

export const systemById = (id: string) =>
  SYSTEMS.find((s) => s.id === id) ?? SYSTEMS[0];
