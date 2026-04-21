import { useApp } from "@/context/AppContext";
import { CURRENCY_LABELS, convertFromGold, formatCurrency } from "@/utils/currency";
import { Coins } from "lucide-react";

export default function PriceTag({ goldValue, size = "md" }: { goldValue: number; size?: "sm" | "md" | "lg" }) {
  const { currency } = useApp();
  const value = convertFromGold(goldValue, currency);
  const label = CURRENCY_LABELS[currency];

  const sizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-3xl",
  };

  return (
    <span className={`flex items-center gap-1 font-display font-semibold ${label.color} ${sizes[size]}`}>
      <Coins className="w-4 h-4" />
      {formatCurrency(value, currency)}
    </span>
  );
}
