import { useMemo, useState } from "react";
import data from "@/data/items.json";
import type { Item, Category } from "@/types";
import Header from "@/components/Header";
import Filters, { FilterState } from "@/components/Filters";
import ItemCard from "@/components/ItemCard";
import { AppProvider, useApp } from "@/context/AppContext";
import { tr } from "@/utils/i18n";

const items = data.items as Item[];
const categories = data.categories as Category[];

function CatalogInner() {
  const { lang } = useApp();
  const [filters, setFilters] = useState<FilterState>({
    query: "",
    category: "",
    minPrice: "",
    maxPrice: "",
  });

  const filtered = useMemo(() => {
    const q = filters.query.trim().toLowerCase();
    const min = filters.minPrice ? parseFloat(filters.minPrice) : -Infinity;
    const max = filters.maxPrice ? parseFloat(filters.maxPrice) : Infinity;
    return items
      .filter((it) => {
        if (q && !it.title_pt.toLowerCase().includes(q) && !it.title_en.toLowerCase().includes(q)) return false;
        if (filters.category && !it.categories.includes(filters.category)) return false;
        if (it.price < min || it.price > max) return false;
        return true;
      })
      .sort((a, b) => {
        const ka = (lang === "pt" ? a.title_pt : a.title_en).toLowerCase();
        const kb = (lang === "pt" ? b.title_pt : b.title_en).toLowerCase();
        return ka.localeCompare(kb);
      });
  }, [filters, lang]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto px-3 py-4 flex flex-col gap-4 flex-1">
        <Filters categories={categories} filters={filters} setFilters={setFilters} />

        <div className="ornament-divider font-display text-xs uppercase tracking-widest">
          <span>
            {filtered.length} {tr("showing", lang)}
          </span>
        </div>

        {filtered.length === 0 ? (
          <p className="text-center italic text-muted-foreground py-12">
            {tr("noResults", lang)}
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {filtered.map((it) => (
              <ItemCard key={it.id} item={it} categories={categories} />
            ))}
          </div>
        )}
      </main>
      <footer className="wood-panel py-3 text-center text-xs text-primary-foreground/70 font-display tracking-wider mt-6">
        ⚜ {tr("appName", lang)} ⚜
      </footer>
    </div>
  );
}

export default function Index() {
  return (
    <AppProvider>
      <CatalogInner />
    </AppProvider>
  );
}
