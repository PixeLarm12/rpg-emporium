import { Link, NavLink, useLocation } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import { tr } from "@/utils/i18n";
import { CURRENCY_LABELS, type Currency } from "@/utils/currency";

export default function Header() {
  const { lang, setLang, currency, setCurrency } = useApp();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-40 wood-panel border-b-2 border-accent/60 shadow-deep">
      <div className="container mx-auto px-3 py-3 flex items-center gap-3 flex-wrap">
        <Link to="/" className="flex items-center gap-2 mr-auto">
          <span className="text-2xl">⚜️</span>
          <div className="leading-tight">
            <h1 className="font-display text-lg sm:text-xl gold-text font-bold">
              {tr("appName", lang)}
            </h1>
            <p className="text-[10px] sm:text-xs text-primary-foreground/70 italic hidden sm:block">
              {tr("tagline", lang)}
            </p>
          </div>
        </Link>

        <nav className="flex items-center gap-1 text-lg">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-3 py-1.5 rounded font-display tracking-wide transition ${
                isActive || location.pathname.startsWith("/item")
                  ? "bg-accent/90 text-accent-foreground"
                  : "text-primary-foreground/85 hover:bg-accent/30"
              }`
            }
          >
            {tr("catalog", lang)}
          </NavLink>
          <NavLink
            to="/converter"
            className={({ isActive }) =>
              `px-3 py-1.5 rounded font-display tracking-wide transition ${
                isActive
                  ? "bg-accent/90 text-accent-foreground"
                  : "text-primary-foreground/85 hover:bg-accent/30"
              }`
            }
          >
            {tr("converter", lang)}
          </NavLink>
        </nav>

        <div className="flex items-center gap-2 text-xs">
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as Currency)}
            className="bg-wood-dark text-primary-foreground border border-accent/50 rounded px-2 py-1 font-display"
            aria-label="Currency"
          >
            {(Object.keys(CURRENCY_LABELS) as Currency[]).map((c) => (
              <option key={c} value={c}>
                {CURRENCY_LABELS[c].symbol.toUpperCase()}
              </option>
            ))}
          </select>
          <button
            onClick={() => setLang(lang === "pt" ? "en" : "pt")}
            className="bg-wood-dark text-primary-foreground border border-accent/50 rounded px-2 py-1 font-display hover:bg-accent/30"
            aria-label="Toggle language"
          >
            {lang === "pt" ? "PT" : "EN"}
          </button>
        </div>
      </div>
    </header>
  );
}
