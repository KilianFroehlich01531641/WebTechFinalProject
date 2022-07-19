import { MenuItem } from "../model/MenuItem";

//variable names have to same as in the json object returned by the db call
export interface DbMenuItem {
    itemid: number;
    title: string;
    description: string;
    price: number;
    categories: number[];
    allergens: string[];
    status: string;
    number: number;   //need this bc I get from the db the number cell in table orderitems
    comment: string|null;
    tableid: number|null;
}

export interface DbItem {
    itemid: number;
    orderdate: Date;
    orderid: number;
    itemnumber: number;
    status: string;
    comment: string;
    title: string;
    description: string;
    price: number;
    categories: string[];
    allergens: string[];
    menuitemstatus: string;
}

export class Item extends MenuItem {
    position: number;
    status: string;
    comment: string|null = null;

    constructor(id: number, title: string, description: string, price: number, categories: number[], allergens: string[], availabilityString: string, position: number, status: string) {
        super(id, title, description, price, categories, allergens, availabilityString,);

        this.position = position;
        this.status = status;
    }
}