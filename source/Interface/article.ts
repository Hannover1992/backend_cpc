import {Subcategory} from "./subcategory";
import {Asset} from "./article/asset";
import {Simkarten} from "./article/Simkarte";



export interface Article {
  artikel_id?: number;
  artikelname?: string;
  firma?: string,
  model?: string,
  unterkategorie_id?: number;
  preis?: number
  beschreibung?: string;
  bild_url?: string;
  zustand?: string;

  einkaufs_datum?: string;
  belegt_von?: string;
  belegt_bis?: string;
  edit_date?: string;
  seriennummer?: string;

  anlagenummer?: string;
  besitzer_id?: null | number;
  assets?: Asset;
  simkarte?: Simkarten;
  unterkategorie?: Subcategory;
}
