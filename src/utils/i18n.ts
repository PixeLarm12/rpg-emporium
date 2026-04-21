export type Lang = "pt" | "en";

export const t = {
  appName: { pt: "Empório do Lucão", en: "Lucão's Emporium" },
  tagline: {
    pt: "Mercadorias raras para aventureiros valentes",
    en: "Rare goods for valiant adventurers",
  },
  catalog: { pt: "Catálogo", en: "Catalog" },
  converter: { pt: "Conversor", en: "Converter" },
  search: { pt: "Buscar item...", en: "Search item..." },
  allCategories: { pt: "Todas categorias", en: "All categories" },
  priceRange: { pt: "Faixa de preço (ouro)", en: "Price range (gold)" },
  min: { pt: "Mín", en: "Min" },
  max: { pt: "Máx", en: "Max" },
  noResults: { pt: "Nenhum item encontrado.", en: "No items found." },
  back: { pt: "Voltar", en: "Back" },
  price: { pt: "Preço", en: "Price" },
  categories: { pt: "Categorias", en: "Categories" },
  damage: { pt: "Dano", en: "Damage" },
  defense: { pt: "Defesa", en: "Defense" },
  durability: { pt: "Durabilidade", en: "Durability" },
  heal: { pt: "Cura", en: "Heal" },
  effect: { pt: "Efeito", en: "Effect" },
  description: { pt: "Descrição", en: "Description" },
  converterTitle: { pt: "Conversor de Moedas", en: "Currency Converter" },
  enterGold: { pt: "Insira o valor em ouro", en: "Enter value in gold" },
  result: { pt: "Resultado", en: "Result" },
  displayCurrency: { pt: "Moeda exibida", en: "Display currency" },
  showing: { pt: "itens", en: "items" },
  filters: { pt: "Filtros", en: "Filters" },
  clear: { pt: "Limpar", en: "Clear" },
  itemNotFound: { pt: "Item não encontrado", en: "Item not found" },
};

export function tr(key: keyof typeof t, lang: Lang) {
  return t[key][lang];
}
