import { useApp } from "@/context/AppContext";
import { tr } from "@/utils/i18n";
import type { Category } from "@/types";

export type FilterState = {
  query: string;
  category: string;
  minPrice: string;
  maxPrice: string;
};

type Props = {
  categories: Category[];
  filters: FilterState;
  setFilters: (f: FilterState) => void;
};

export default function Filters({ categories, filters, setFilters }: Props) {
  const { lang } = useApp();

  return (
    <div className="parchment-card rounded-md p-3 sm:p-4 flex flex-col sm:flex-row gap-2 sm:items-end">
      <div className="flex-1 min-w-0">
        <label className="text-xs font-display uppercase tracking-wider text-muted-foreground">
          {tr("search", lang)}
        </label>
        <input
          type="text"
          value={filters.query}
          onChange={(e) => setFilters({ ...filters, query: e.target.value })}
          placeholder={tr("search", lang)}
          className="w-full bg-background/60 border border-border rounded px-3 py-2 font-body text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>

      <div className="sm:w-48">
        <label className="text-xs font-display uppercase tracking-wider text-muted-foreground">
          {tr("categories", lang)}
        </label>
        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="w-full bg-background/60 border border-border rounded px-3 py-2 font-body focus:outline-none focus:ring-2 focus:ring-accent"
        >
          <option value="">{tr("allCategories", lang)}</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.icon} {lang === "pt" ? c.name_pt : c.name_en}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-2 sm:w-56">
        <div className="flex-1">
          <label className="text-xs font-display uppercase tracking-wider text-muted-foreground">
            {tr("min", lang)}
          </label>
          <input
            type="number"
            min={0}
            value={filters.minPrice}
            onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
            className="w-full bg-background/60 border border-border rounded px-2 py-2 font-body focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
        <div className="flex-1">
          <label className="text-xs font-display uppercase tracking-wider text-muted-foreground">
            {tr("max", lang)}
          </label>
          <input
            type="number"
            min={0}
            value={filters.maxPrice}
            onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
            className="w-full bg-background/60 border border-border rounded px-2 py-2 font-body focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
      </div>

      <button
        onClick={() =>
          setFilters({ query: "", category: "", minPrice: "", maxPrice: "" })
        }
        className="font-display text-xs uppercase tracking-wider px-3 py-2 rounded border border-accent/60 text-accent hover:bg-accent hover:text-accent-foreground transition"
      >
        {tr("clear", lang)}
      </button>
    </div>
  );
}
