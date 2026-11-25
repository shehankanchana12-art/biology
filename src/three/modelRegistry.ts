import { useEffect, useState } from "react";

/**
 * Blender (or any 3D tool) models live in `public/models/anatomy/` and are
 * described by `manifest.json`. If the folder is empty the app quietly falls
 * back to the built-in procedural organ art, so nothing breaks.
 */
export const MODEL_BASE = `${import.meta.env.BASE_URL}models/anatomy/`;

export type ModelSpec = {
  /** organ id, e.g. "heart" */
  id: string;
  /** file name inside public/models/anatomy/, e.g. "heart.glb" */
  file: string;
  /** extra multiplier on top of the auto-fit scale */
  scale?: number;
  /** radians, applied after auto-fit — handy for fixing a tilted export */
  rotation?: [number, number, number];
  /** target bounding-box size in scene units (default 0.55) */
  size?: number;
};

export type ModelMap = Record<string, ModelSpec>;

let cache: ModelMap | null = null;
let request: Promise<ModelMap> | null = null;

function normalise(raw: unknown): ModelMap {
  const list = (raw as { models?: unknown })?.models;
  const map: ModelMap = {};
  if (!Array.isArray(list)) return map;
  for (const item of list) {
    const spec = item as Partial<ModelSpec>;
    if (typeof spec?.id === "string" && typeof spec?.file === "string") {
      map[spec.id] = {
        id: spec.id,
        file: spec.file,
        scale: typeof spec.scale === "number" ? spec.scale : undefined,
        rotation: Array.isArray(spec.rotation) ? (spec.rotation as ModelSpec["rotation"]) : undefined,
        size: typeof spec.size === "number" ? spec.size : undefined,
      };
    }
  }
  return map;
}

export function loadManifest(): Promise<ModelMap> {
  if (request) return request;
  request = fetch(`${MODEL_BASE}manifest.json`, { cache: "no-cache" })
    .then((res) => (res.ok ? res.json() : null))
    .then((json) => (cache = normalise(json)))
    .catch(() => (cache = {}));
  return request;
}

/** Model specs declared in the manifest, empty until they are added. */
export function useModelManifest(): ModelMap {
  const [models, setModels] = useState<ModelMap>(cache ?? {});

  useEffect(() => {
    let alive = true;
    if (cache) {
      setModels(cache);
      return;
    }
    loadManifest().then((map) => {
      if (alive) setModels(map);
    });
    return () => {
      alive = false;
    };
  }, []);

  return models;
}
