import {Article} from "./article";

export interface ProjectArticle {
  projekt_artikel_id?: number;
  projekt_id?: number;
  artikel_id?: number;
  menge?: number;
  artikel?: Article;
}
