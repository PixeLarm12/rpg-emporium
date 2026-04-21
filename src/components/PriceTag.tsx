import { useApp } from "@/context/AppContext";
import { CURRENCY_LABELS, convertFromGold, formatCurrency } from "@/utils/currency";

export default function PriceTag({ goldValue, size = "md" }: { goldValue: number; size?: "sm" | "md" | "lg" }) {
  const { currency } = useApp();
  const value = convertFromGold(goldValue, currency);
  const label = CURRENCY_LABELS[currency];

  const sizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-2xl",
  };

  return (
    <span className={`font-display font-semibold ${label.color} ${sizes[size]}`}>
      ✦ {formatCurrency(value, currency)}
    </span>
  );
}
