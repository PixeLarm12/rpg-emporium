import { useState, useMemo } from "react";
import Header from "@/components/Header";
import { AppProvider, useApp } from "@/context/AppContext";
import { tr } from "@/utils/i18n";
import { breakdownGold, CURRENCY_LABELS, convertFromGold, formatCurrency, type Currency } from "@/utils/currency";

function ConverterInner() {
  const { lang, currency, setCurrency } = useApp();
  const [gold, setGold] = useState<string>("100");
  const goldNum = parseFloat(gold) || 0;
  const breakdown = useMemo(() => breakdownGold(goldNum), [goldNum]);

  const coins: { key: Currency; value: number; label: string }[] = [
    { key: "platinum", value: breakdown.platinum, label: CURRENCY_LABELS.platinum[lang] },
    { key: "gold", value: breakdown.gold, label: CURRENCY_LABELS.gold[lang] },
    { key: "silver", value: breakdown.silver, label: CURRENCY_LABELS.silver[lang] },
    { key: "copper", value: breakdown.copper, label: CURRENCY_LABELS.copper[lang] },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto px-3 py-6 max-w-2xl flex-1">
        <h2 className="font-display text-2xl sm:text-3xl text-primary text-center">
          {tr("converterTitle", lang)}
        </h2>
        <div className="ornament-divider my-4">⚜</div>

        <div className="parchment-card rounded-md p-5 sm:p-8 space-y-6">
          <div>
            <label className="font-display text-xs uppercase tracking-wider text-muted-foreground">
              {tr("enterGold", lang)}
            </label>
            <input
              type="number"
              min={0}
              step="0.01"
              value={gold}
              onChange={(e) => setGold(e.target.value)}
              className="w-full mt-1 bg-background/60 border-2 border-border rounded px-3 py-3 text-2xl font-display text-center text-primary focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <div>
            <h3 className="font-display text-xs uppercase tracking-wider text-muted-foreground mb-2">
              {tr("result", lang)}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {coins.map((c) => (
                <div
                  key={c.key}
                  className="text-center p-3 rounded border border-border bg-background/40"
                >
                  <div className={`text-2xl font-display font-bold ${CURRENCY_LABELS[c.key].color}`}>
                    {c.value}
                  </div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">
                    {c.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="ornament-divider">✦</div>

          <div>
            <label className="font-display text-xs uppercase tracking-wider text-muted-foreground">
              {tr("displayCurrency", lang)}
            </label>
            <div className="flex flex-wrap gap-2 mt-2">
              {(Object.keys(CURRENCY_LABELS) as Currency[]).map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-4 py-2 rounded font-display text-lg uppercase tracking-wider border transition ${
                    currency === c
                      ? "bg-accent text-accent-foreground border-accent shadow-gold"
                      : "border-border hover:border-accent text-foreground"
                  }`}
                >
                  {CURRENCY_LABELS[c][lang]}
                </button>
              ))}
            </div>
            <p className="mt-3 text-lg italic text-muted-foreground">
              {goldNum} gp = {formatCurrency(convertFromGold(goldNum, currency), currency)}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function Converter() {
  return (
    <AppProvider>
      <ConverterInner />
    </AppProvider>
  );
}
