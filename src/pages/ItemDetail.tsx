import { Link, useParams } from "react-router-dom";
import data from "@/data/items.json";
import type { Item, Category } from "@/types";
import Header from "@/components/Header";
import PriceTag from "@/components/PriceTag";
import { AppProvider, useApp } from "@/context/AppContext";
import { tr } from "@/utils/i18n";

const items = data.items as Item[];
const categories = data.categories as Category[];

function StatRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex justify-between border-b border-border/60 py-2">
      <span className="font-display uppercase tracking-wider text-xs text-muted-foreground">
        {label}
      </span>
      <span className="font-body font-semibold text-foreground">{value}</span>
    </div>
  );
}

function DetailInner() {
  const { id } = useParams();
  const { lang } = useApp();
  const item = items.find((i) => i.id === id);

  if (!item) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="container mx-auto px-3 py-12 text-center">
          <p className="font-display text-xl">{tr("itemNotFound", lang)}</p>
          <Link to="/" className="text-accent underline mt-4 inline-block">
            ← {tr("back", lang)}
          </Link>
        </main>
      </div>
    );
  }

  const title = lang === "pt" ? item.title_pt : item.title_en;
  const description = lang === "pt" ? item.description_pt : item.description_en;
  const cats = categories.filter((c) => item.categories.includes(c.id));

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto px-3 py-4 flex-1 max-w-3xl">
        <Link
          to="/"
          className="inline-block mb-4 font-display text-sm text-accent hover:underline"
        >
          ← {tr("back", lang)}
        </Link>

        <article className="parchment-card rounded-md p-5 sm:p-8">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <div className="flex gap-2 text-2xl mb-2">
                {cats.map((c) => (
                  <span key={c.id}>{c.icon}</span>
                ))}
              </div>
              <h1 className="font-display text-2xl sm:text-4xl text-primary leading-tight">
                {title}
              </h1>
            </div>
            <PriceTag goldValue={item.price} size="lg" />
          </div>

          <div className="ornament-divider my-5">⚜</div>

          <p className="font-body text-lg italic leading-relaxed text-foreground/90">
            "{description}"
          </p>

          <div className="ornament-divider my-5">✦</div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
            <StatRow
              label={tr("categories", lang)}
              value={cats.map((c) => (lang === "pt" ? c.name_pt : c.name_en)).join(", ")}
            />
            {item.damage && <StatRow label={tr("damage", lang)} value={item.damage} />}
            {item.defense && <StatRow label={tr("defense", lang)} value={item.defense} />}
            {item.durability !== undefined && (
              <StatRow label={tr("durability", lang)} value={item.durability} />
            )}
            {item.heal && <StatRow label={tr("heal", lang)} value={item.heal} />}
            {item.effect && <StatRow label={tr("effect", lang)} value={item.effect} />}
          </div>
        </article>
      </main>
    </div>
  );
}

export default function ItemDetail() {
  return (
    <AppProvider>
      <DetailInner />
    </AppProvider>
  );
}
