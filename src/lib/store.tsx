import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type AppCtx = {
  bilingual: boolean;
  toggleBilingual: () => void;
};

const Ctx = createContext<AppCtx>({ bilingual: true, toggleBilingual: () => {} });

export function AppProvider({ children }: { children: ReactNode }) {
  const [bilingual, setBilingual] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    return localStorage.getItem("bio-bilingual") !== "off";
  });

  useEffect(() => {
    localStorage.setItem("bio-bilingual", bilingual ? "on" : "off");
  }, [bilingual]);

  const value = useMemo(
    () => ({ bilingual, toggleBilingual: () => setBilingual((v) => !v) }),
    [bilingual]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useApp = () => useContext(Ctx);
