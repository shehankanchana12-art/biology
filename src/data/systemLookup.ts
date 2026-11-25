import { SYSTEMS } from "./anatomy/systems";

export const systemsByIdList = SYSTEMS.map((s) => ({
  si: s.si,
  color: s.color,
}));
