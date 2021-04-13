import {Injectable} from '@angular/core';
import {Stock} from '../module/Stock.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  constructor(private http: HttpClient) {
  }

  get stock(): Stock {
    if (this._stock == null) {
      this._stock = new Stock();
    }
    return this._stock;
  }

  // tslint:disable-next-line:adjacent-overload-signatures
  set stock(value: Stock) {
    this._stock = value;
  }

  get stocks(): Array<Stock> {

    if (this._stocks == null) {
      this._stocks = new Array<Stock>();
    }
    return this._stocks;
  }

  set stocks(value: Array<Stock>) {
    this._stocks = value;
  }
  private _stock: Stock;
  private _stocks: Array<Stock>;
  private _index: number;
  private urlBase = 'http://localhost:8036';
  private url = '/stock-api/Stockage';

  public save() {
     if (this.stock.id == null) {
       this.http.post(this.urlBase + this.url + '/', this.stock).subscribe(
         data => {
           if (data === 1) {
             this.stock.id = this.stocks.length + 1;
             this.stocks.push(this.clone(this.stock));
             this.findAll();
           } else if (data === 2) {
             this.findAll();
           } else if (data === -3) {
             alert('donner une quantite deffectueuse inferrieur au quantite:');
           } else {
             alert('error lors de la creation de la commande l un des reference n exist pas dans la base de donnes :' + data);
           }
         }
       );
     }
     else {
       this.stocks[this._index] = this.clone(this.stock);
    }
     this.stock = null;

  }

  public update(index: number, stock: Stock) {
    this.stock = this.clone(stock);
  // \  this.stock.magasin.reference.
    this._index = index;
  }
  public findAll() {
    // for (let _i = 1; _i <= 4; _i++) {
    //   const myStock = new Stock();
    //   myStock.id = _i;
    //   myStock.produit = 'c-' + _i;
    //   myStock.magasin = 'c-' + _i;
    //   myStock.qte = 100 * _i;
    //   myStock.qteDeffectueuse = 20 * _i;
    //   this.stocks.push(myStock);
    // }
   this.http.get<Array<Stock>>(this.urlBase + this.url + '/').subscribe(
     data => {
       this.stocks = data;
     }, error => {
       console.log(error);
     });
  }
  public findByMagasinRefAndProduit(reference: string, ref: string){
    this.http.get<Stock>(this.urlBase + this.url + '/reference/' + reference + '/refProduit/' + ref).subscribe(
      data => {
        this.stocks=null;
        this.stocks.push( data);
      }
    );
  }

  private clone(stock: Stock) {
    const myClone = new Stock();
    myClone.id = stock.id;
    myClone.produit.ref = stock.produit.ref;
    myClone.qte = stock.qte;
    myClone.qteDeffectueuse = stock.qteDeffectueuse;
    myClone.magasin.reference = stock.magasin.reference;
    return myClone;
  }

  delete(index: number, reference: string, ref: string) {
    this.http.delete(this.urlBase + this.url + '/refProduit/' + ref + '/reference/' + reference).subscribe(
      data => {
        if (data > 1){
          console.log('yeaaah');
        }
      }
    );

  }
  public findByRefMagasin(reference:string){
    console.log(reference);
    console.log(this.urlBase + this.url + '/references/' + reference);
    this.http.get<Array<Stock>>(this.urlBase + this.url + '/references/' + reference).subscribe(
      data =>{
        console.log(reference);
        this.stocks=data;
      }
    );
  }
  search(reference: string,ref: string) {
    if(reference!=null && ref !=null){
      this.findByMagasinRefAndProduit(reference,ref);
    }
    if(reference!=null && ref==null){
      this.findByRefMagasin(reference);
    }
    if(reference==null && ref!=null){
      this.findByRefProduit(ref);
    }


  }

  private findByRefProduit(ref: string) {
    this.http.get<Array<Stock>>(this.urlBase + this.url + '/refProduit/' + ref).subscribe(
      data =>{
        console.log(data);
        this.stocks=null;
        this.stocks=data;

      }
    );
  }
}
