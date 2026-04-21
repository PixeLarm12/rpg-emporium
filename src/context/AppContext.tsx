import { createContext, useContext, useState, ReactNode } from "react";
import type { Lang } from "@/utils/i18n";
import type { Currency } from "@/utils/currency";

type AppState = {
  lang: Lang;
  setLang: (l: Lang) => void;
  currency: Currency;
  setCurrency: (c: Currency) => void;
};

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("pt");
  const [currency, setCurrency] = useState<Currency>("gold");
  return (
    <AppContext.Provider value={{ lang, setLang, currency, setCurrency }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
