import { Link } from "react-router-dom";
import type { Item, Category } from "@/types";
import { useApp } from "@/context/AppContext";
import PriceTag from "./PriceTag";

export default function ItemCard({ item, categories }: { item: Item; categories: Category[] }) {
  const { lang } = useApp();
  const title = lang === "pt" ? item.title_pt : item.title_en;
  const description = lang === "pt" ? item.description_pt : item.description_en;
  const cats = categories.filter((c) => item.categories.includes(c.id));

  return (
    <Link
      to={`/item/${item.id}`}
      className="parchment-card rounded-md p-4 flex flex-col gap-2 transition-all duration-200 hover:shadow-gold hover:-translate-y-1 hover:border-accent group"
    >
      <div className="flex items-start justify-between gap-2">
        <PriceTag goldValue={item.price} size="sm" />
      </div>
      <h3 className="font-display text-base sm:text-lg leading-tight text-primary group-hover:text-accent transition-colors">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground italic line-clamp-2 flex-1">
        {description}
      </p>
    </Link>
  );
}
