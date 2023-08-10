import {Category} from "./category";

export interface Subcategory {
  unterkategorie_id: number;
  unterkategoriename: string;
  kategorie_id: number;
  kategorien: Category;
  zeigt_alles_an: boolean;
}
