import {Magasin} from "./magasin.model";

export class Rue {
  public  id : number;
  public code: string;
  public libelle: string;
  public magasin = new Array<Magasin>();

}
