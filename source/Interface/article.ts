import {Subcategory} from "./subcategory";
import {Asset} from "./article/asset";
import {Simkarten} from "./article/Simkarte";
import {Notebook} from "./article/Notebook";
import {Handy} from "../Apis/Handy";
import {Router} from "./article/Router";



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
  notebook?: Notebook;
  unterkategorie?: Subcategory;
  handy?: Handy
  router?: Router
}

// - Notebook
// - Adminkonto Name Adminkonto Password -> Zugangs
//     - Adnin Password
// - Userkonto Name Userkonto Password -> Zugangs
//     - User Password

