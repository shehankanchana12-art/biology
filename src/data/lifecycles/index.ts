import type { LifeCycle } from "../lifecycleTypes";
import { POGONATUM_CYCLE, NEPHROLEPIS_CYCLE } from "./bryophytes";
import { CYCAS_CYCLE, ANGIOSPERM_CYCLE } from "./seedPlants";

export const LIFECYCLES: Record<string, LifeCycle> = {
  pogonatum: POGONATUM_CYCLE,
  nephrolepis: NEPHROLEPIS_CYCLE,
  cycas: CYCAS_CYCLE,
  monocot: ANGIOSPERM_CYCLE,
  dicot: ANGIOSPERM_CYCLE,
};

/**
 * Plant entry ids are namespaced by specimen (`pogonatum-capsule`,
 * `dicot-flower`, …), so the matching cycle can be resolved without
 * repeating it on every part entry.
 */
export function lifecycleForEntry(entryId: string): LifeCycle | null {
  const specimen = entryId.split("-")[0];
  return LIFECYCLES[specimen] ?? null;
}
