import { Component, Input, OnInit } from '@angular/core';
import { DataBaseService } from 'src/app/services/data-base.service';
import { Item } from '../../model/Item';
import { Order } from '../../model/Order';

@Component({
  selector: 'app-single-order',
  templateUrl: './single-order.component.html',
  styleUrls: ['./single-order.component.css']
})
export class SingleOrderComponent implements OnInit {
  @Input() currentOrder!: Order;
  public simpleDate : String = "";
  public simpleTime : String = "";
  public isExpanded : boolean = false;

  constructor(private dataBaseService: DataBaseService) {
  }

  ngOnInit(): void {
    this.parseItems();
    this.currentOrder.orderdate = new Date(this.currentOrder.orderdate);
    this.simpleDate = this.currentOrder.orderdate.toLocaleDateString();
    this.simpleTime = this.currentOrder.orderdate.toLocaleTimeString();
  }

  public parseItems(){
    let items : number[] = [];
    this.dataBaseService.getItemsFromOrder(this.currentOrder.orderid).subscribe(res =>{
      let i=0;
      this.whatever(i, res.length, res);
    });
  }

  public whatever(act: number, max: number, items: Item[]){
    this.dataBaseService.getItems(items[act].id).subscribe(res =>{
      res[0].status = items[act].status;
      res[0].comment = items[act].comment;
      if(this.currentOrder.items === undefined){
        this.currentOrder.items = res.concat([]);
      }else{
        this.currentOrder.items.push(res[0]);
      }
      act++;
      if(act < max){
        this.whatever(act ,max, items);
      }
    })
  }

  public expand(){
    this.isExpanded = true;
  }

  public collapse(){
    this.isExpanded = false;
  }
}