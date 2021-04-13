import {Pharmacie} from './pharmacie.model';
import {Rue} from './rue.model';

export class Magasin {
  public id: number;
  public adresse: string;
  public reference: string;
  public pharmacie = new Pharmacie();
  public rue = new Rue();
}

