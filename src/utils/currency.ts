export type Currency = "copper" | "silver" | "gold" | "platinum";

// Base unit: gold
// 100 copper = 1 silver, 100 silver = 1 gold, 100 gold = 1 platinum
export const RATES: Record<Currency, number> = {
  copper: 10000, // 1 gold = 10000 copper
  silver: 100, // 1 gold = 100 silver
  gold: 1,
  platinum: 0.01, // 1 gold = 0.01 platinum
};

export const CURRENCY_LABELS: Record<Currency, { symbol: string; pt: string; en: string; color: string }> = {
  copper: { symbol: "cp", pt: "Cobre", en: "Copper", color: "text-copper" },
  silver: { symbol: "sp", pt: "Prata", en: "Silver", color: "text-silver" },
  gold: { symbol: "gp", pt: "Ouro", en: "Gold", color: "text-gold" },
  platinum: { symbol: "pp", pt: "Platina", en: "Platinum", color: "text-platinum" },
};

export function convertFromGold(gold: number, target: Currency): number {
  return gold * RATES[target];
}

export function formatCurrency(value: number, currency: Currency): string {
  const formatted =
    value >= 100
      ? Math.round(value).toLocaleString()
      : value.toFixed(2).replace(/\.?0+$/, "");
  return `${formatted} ${CURRENCY_LABELS[currency].symbol}`;
}

export function breakdownGold(gold: number) {
  // Convert to copper (smallest), then break apart
  const totalCopper = Math.round(gold * 10000);
  const platinum = Math.floor(totalCopper / 1000000);
  let rem = totalCopper - platinum * 1000000;
  const goldOut = Math.floor(rem / 10000);
  rem -= goldOut * 10000;
  const silver = Math.floor(rem / 100);
  const copper = rem - silver * 100;
  return { platinum, gold: goldOut, silver, copper };
}
