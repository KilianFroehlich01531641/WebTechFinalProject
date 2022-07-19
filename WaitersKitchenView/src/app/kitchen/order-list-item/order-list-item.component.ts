import { Component, Input, OnInit } from '@angular/core';
import { ExtensiveOrder } from 'src/app/model/Order';

@Component({
  selector: 'app-order-list-item',
  templateUrl: './order-list-item.component.html',
  styleUrls: ['./order-list-item.component.css']
})
export class OrderListItemComponent implements OnInit {
  @Input() order!: ExtensiveOrder;

  constructor() { }

  ngOnInit(): void {
  }

  public getTimeStamp(date: Date): string {
    let newDate: Date = new Date(date);
    return newDate.toLocaleString().replace(',', '');
  }

}
