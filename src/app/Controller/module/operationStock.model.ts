import {Magasin} from './magasin.model';
import {Produit} from './produit.model';

export class OperationStock {
  public  id: number;
  public  descrition: string;
  public  magasinSource = new Magasin();
  public magasinDestination = new Magasin();
  public  produit = new Produit();
  public  qte: number;
}
