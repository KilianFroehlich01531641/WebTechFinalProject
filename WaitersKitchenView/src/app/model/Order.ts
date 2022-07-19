import { AppComponent } from "../app.component";
import { Item } from "./Item";
import { MenuCategory } from "./MenuCategory";
import { MenuCategoryList } from "./MenuCategoryList";
import { MenuItem } from "./MenuItem";


export class Order {
    orderid: number;
    status: string;
    orderdate: Date;
    tableid: number;
    paymentreference: string;
    paymenttoken: string;
    totalamount: number;
    items: Item[] = [];

    constructor(orderid: number, status: string, orderdate: Date, tableid: number, paymentreference: string, paymenttoken: string, totalamount: number) {
        this.orderid = orderid;
        this.status = status;
        this.orderdate = orderdate;
        this.tableid = tableid;
        this.paymentreference = paymentreference;
        this.paymenttoken = paymenttoken;
        this.totalamount = totalamount;
    }
}

export class ExtensiveOrder {
    orderid: number;
    orderdate: Date;
    tableid: number;
    totalamount: number;

    itemids: number[];
    itemnumbers: number[];
    itemstatuses: string[];
    itemcomments: string[];
    itemtitles: string[];
    itemprices: number[];
    menuitemstatuses: string[];

    constructor(orderid: number, orderdate: Date, tableid: number, totalamount: number, itemids: number[], itemnumbers: number[], itemtitles: string[], itemstatuses: string[], itemcomments: string[], itemprices: number[], menuitemstatuses: string[]) {
        this.orderid = orderid;
        this.orderdate = orderdate;
        this.tableid = tableid;
        this.totalamount = totalamount;

        this.itemids = itemids;
        this.itemnumbers = itemnumbers;
        this.itemstatuses = itemstatuses;
        this.itemcomments = itemcomments;
        this.itemtitles = itemtitles;
        this.itemprices = itemprices
        this.menuitemstatuses = menuitemstatuses;
    }
}

// export class OrderedItem {
//     itemId: number;
//     number: number;
//     status: string;
//     comment: string;

//     constructor(itemId: number, number: number, status: string, comment: string) {
//         this.itemId = itemId;
//         this.number = number;
//         this.status = status;
//         this.comment = comment;
//     }

//     public toString(): string {
//         return this.itemId + " " + this.number + " " + this.status + " " + this.comment;
//     }

//     public info(): string {
//         return AppComponent.getCategoryList().getName(this.itemId).toUpperCase() + " (" + this.status + ")";
//     }

//     public allInfo(): string {
//         return this.itemId + " " + this.number + " " + this.status + " " + this.comment;
//     }
// }