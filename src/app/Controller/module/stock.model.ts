import {Produit} from './produit.model';
import {Magasin} from './magasin.model';

export class Stock {
  public id: number;
  public qte: number;
  public qteDeffectueuse: number;
  public produit = new Produit();
  public magasin = new Magasin();
}
