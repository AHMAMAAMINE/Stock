import { Component, OnInit } from '@angular/core';
import {Stock} from '../../Controller/module/stock.model';
import {StockService} from '../../Controller/Service/stock.service';
import {OperationStock} from '../../Controller/module/operationStock.model';

@Component({
  selector: 'app-stock-create',
  templateUrl: './stock-create.component.html',
  styleUrls: ['./stock-create.component.css']
})
export class StockCreateComponent implements OnInit {

  constructor(private stockService: StockService) { }
  public Save(){
    return this.stockService.save();
  }
  get stock(): Stock {

    return this.stockService.stock;

  }
  ngOnInit(): void {
  }

  empty() {
    return this.stock.magasin == null || this.stock.qteDeffectueuse == null || this.stock.produit == null || this.stock.qte == null;
  }

  sup() {
    return this.stock.qteDeffectueuse > this.stock.qte;
  }
}
