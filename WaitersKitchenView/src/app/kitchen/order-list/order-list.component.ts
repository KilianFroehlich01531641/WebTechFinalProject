import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ExtensiveOrder, Order } from 'src/app/model/Order';
import { DataBaseService } from 'src/app/services/data-base.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  constructor(private databaseservice: DataBaseService) {
    databaseservice.getOrdersWithStatusOrderedOrInProduction().subscribe((data) => {
      this.orderList = data;
    });
  }

  ngOnInit(): void {
  }

  orderList: ExtensiveOrder[] = [];

  reorderList(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.orderList, event.previousIndex, event.currentIndex);
  }


  public getOrderInfo(order: Order): string {
    let info: string = "";
    // for (let item of order.parse()) {
    //   info += item.info() + ", ";
    // }
    return info//.slice(0, info.length - 2);
  }


  public getNiceString(items: string[]): string {
    let s = "";
    for (let dbItem of items) {
      s += dbItem + ", ";
    }
    return s.slice(0, s.length - 2);
  }

}

// TODO order view (change status)

//TODO touch !!
//TODO what to do on update (e.g. new order)


//https://remotestack.io/angular-drag-and-drop-multiple-items-in-a-list-examples/