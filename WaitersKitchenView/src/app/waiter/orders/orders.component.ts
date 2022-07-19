import { Component, OnInit } from '@angular/core';
import { DataBaseService } from 'src/app/services/data-base.service';
import { Order } from '../../model/Order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  fetch: any;
  orders: Order[] = [];

  constructor(private dataBaseService: DataBaseService) {
    this.getOrders();
  }

  ngOnInit(): void {
  }

  public getOrders(){
    this.dataBaseService.getOrders().subscribe(res =>{
      this.orders = res;
      console.log(res);
    });
  }



}
