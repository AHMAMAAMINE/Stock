import { Component, OnInit } from '@angular/core';
import {Stock} from '../../Controller/Module/stock.model';
import {StockService} from '../../Controller/Service/stock.service';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {
  referenceMagasin: string;
  refProduit: string;

  public delete(index: number, reference: string, ref: string){
    this.stocks.splice(index, 1);
     this.stockService.delete(index, reference, ref);
   // this.stockService.findByMagasinRefAndProduit( reference, ref);

  }
  public update(index: number , stock: Stock){
    this.stockService.update(index, stock);
  }
  get stocks(): Array<Stock> {

    return this.stockService.stocks;
  }

  constructor(private stockService: StockService) {

  }

  ngOnInit(): void {
    this.stockService.findAll();
  }


  search(reference: string,ref :string) {
    this.stockService.search(reference,ref);
  }
}
