export type Category = {
  id: number;
  name_en: string;
  name_pt: string;
  icon: string;
};

export type Item = {
  id: number;
  title_en: string;
  title_pt: string;
  price: number; // in gold
  categories: number[];
  damage?: string;
  defense?: string;
  durability?: number;
  heal?: string;
  effect?: string;
  description_en: string;
  description_pt: string;
};
