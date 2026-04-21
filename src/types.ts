export type Category = {
  id: number;
  name_en: string;
  name_pt: string;
};

export type Item = {
  id: number;
  title: string;
  price: number; // in gold
  categories: number[];
  damage?: string;
  defense?: string;
  durability?: number;
  heal?: string;
  effect?: string;
  description: string;
};
