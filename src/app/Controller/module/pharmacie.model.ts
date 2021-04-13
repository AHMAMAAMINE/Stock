import {Magasin} from './magasin.model';

export class Pharmacie {
  public id: number;
  public reference: string;
  public libelle: string;
  public magasin = new Array<Magasin>();
}
