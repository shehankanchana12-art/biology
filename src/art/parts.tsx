import type { ReactNode } from "react";
import { motion } from "framer-motion";

export function ArtPart({
  id,
  selected,
  onSelect,
  explode,
  dx = 0,
  dy = 0,
  label,
  labelX,
  labelY,
  anchor = "middle",
  children,
}: {
  id: string;
  selected: string | null;
  onSelect: (id: string) => void;
  explode: boolean;
  dx?: number;
  dy?: number;
  label?: string;
  labelX?: number;
  labelY?: number;
  anchor?: "start" | "middle" | "end";
  children: ReactNode;
}) {
  const active = selected === id;
  return (
    <motion.g
      initial={false}
      animate={{ x: explode ? dx : 0, y: explode ? dy : 0 }}
      transition={{ type: "spring", stiffness: 78, damping: 18 }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(id);
      }}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "auto")}
      style={{
        cursor: "pointer",
        opacity: selected && !active ? 0.32 : 1,
        transition: "opacity 0.25s",
        filter: active ? "drop-shadow(0 0 7px rgba(45,212,191,0.85))" : undefined,
      }}
    >
      {children}
      {label && labelX !== undefined && labelY !== undefined && (
        <text
          x={labelX}
          y={labelY}
          textAnchor={anchor}
          fontSize={11}
          fill={active ? "#2dd4bf" : "#94a3b8"}
          style={{ fontWeight: 500, letterSpacing: "0.01em" }}
        >
          {label}
        </text>
      )}
    </motion.g>
  );
}

export const label = (color = "#94a3b8") => ({
  fontSize: 10,
  fill: color,
});
