export type Category = {
  id: string;
  name_en: string;
  name_pt: string;
  icon: string;
};

export type Item = {
  id: string;
  title_en: string;
  title_pt: string;
  price: number; // in gold
  categories: string[];
  damage?: string;
  defense?: string;
  durability?: number;
  heal?: string;
  effect?: string;
  description_en: string;
  description_pt: string;
};
