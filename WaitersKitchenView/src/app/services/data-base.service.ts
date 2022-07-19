import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, ObservedValueOf } from 'rxjs';
import { map } from 'rxjs/operators';
import { MenuItem } from '../model/MenuItem';
import { DbMenuCategory, MenuCategory } from '../model/MenuCategory';
import { DbItem, DbMenuItem, Item } from '../model/Item';
import { ExtensiveOrder, Order } from '../model/Order';
import { Consultation } from '../model/Consultation';
import { KitchenComponent } from '../kitchen/kitchen.component';

const baseURL: string = "http://localhost:3000";

@Injectable({
  providedIn: 'root'
})
export class DataBaseService {

  constructor(private http: HttpClient) { }

  //temporarily to test db connection
  public getUsers(): Observable<any> {
    return this.http.get(baseURL + "/users");
  }

  public addSubscription(sub: PushSubscription): Observable<any>{
    return this.http.post<any>(baseURL + "/subscribe", sub);
  }

  public sendSubMessages(itemname: string): Observable<any>{
    return this.http.post<any>(baseURL + "/message", {itemname});
  }

  public getMenuItems(): Observable<MenuItem[]> {
    return this.http.get<DbMenuItem[]>(baseURL + "/kitchen/menuitems").pipe(map((dbMenuItems) => {
      return dbMenuItems.map(item => ({
        id: item.itemid,
        title: item.title,
        description: item.description,
        price: item.price,
        categories: item.categories,
        allergens: item.allergens,
        isAvailable: item.status == 'available',

        getCategoryNames: function () { //TODO how to add to prototype instead of adding it to any instance?
          return KitchenComponent.getCategoryNames(this.categories);
        }
      }));
    }));
  }

  public getMenuCategories(): Observable<MenuCategory[]> {
    return this.http.get<DbMenuCategory[]>(baseURL + "/kitchen/menucategories").pipe(map((dbMenuItems) => {
      return dbMenuItems.map(item => ({
        id: item.categoryid,
        title: item.title,
        description: item.description
      }));
    }));
  }

  public putCategories(id: number, categories: number[]): Observable<any> {
    return this.http.put(baseURL + "/kitchen/menuitems/" + id + "/categories", categories);
  }

  public toggleMenuItemState(id: number): Observable<any> {
    return this.http.put(baseURL + "/kitchen/menuitems/" + id, {});
  }

  public getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(baseURL + "/waiter/orders");
  }

  public getItemsFromOrder(id: number): Observable<Item[]> {
    return this.http.get<DbMenuItem[]>(baseURL + "/waiter/orders/" + id).pipe(map((dbItems) => {
      return dbItems.map(item => ({
        id: item.itemid,
        title: item.title,
        description: item.description,
        price: item.price,
        categories: item.categories,
        allergens: item.allergens,
        isAvailable: item.status == 'unavailabel',
        position: item.number,
        status: item.status,
        comment: item.comment,

        getCategoryNames: function () { //TODO how to add to prototype instead of adding it to any instance?
          return KitchenComponent.getCategoryNames(this.categories);
        }
      }));
    }));;
  }

  public getItems(id: number): Observable<Item[]> {
    return this.http.get<DbMenuItem[]>(baseURL + "/waiter/items/" + id).pipe(map((dbItems) => {
      return dbItems.map(item => ({
        id: item.itemid,
        title: item.title,
        description: item.description,
        price: item.price,
        categories: item.categories,
        allergens: item.allergens,
        isAvailable: item.status == 'unavailabel',
        position: 0,
        status: "",
        comment: "",

        getCategoryNames: function () { //TODO how to add to prototype instead of adding it to any instance?
          return KitchenComponent.getCategoryNames(this.categories);
        }
      }));
    }));
  }

  public getConsultations(): Observable<Consultation[]> {
    return this.http.get<Consultation[]>(baseURL + "/waiter/consultations");
  }

  public changeConsultation(item: Consultation): Observable<any> {
    return this.http.put<any>(baseURL + "/waiter/consultations/" + item.id, {});
  }

  public deleteConsultation(id: number): Observable<any> {
    return this.http.delete(baseURL + "/waiter/consultations/" + id, {});
  }

  public getItemsForWaiter(): Observable<DbMenuItem[]> {
    return this.http.get<DbMenuItem[]>(baseURL + "/waiter/items");
  }

  public putItemStatus(id: number, status: string): Observable<any> {
    return this.http.put<any>(baseURL + "/waiter/items/" + id, { status });
  }

  public getPickUpsForWaiter(): Observable<DbMenuItem[]> {
    return this.http.get<DbMenuItem[]>(baseURL + "/waiter/itemspickups");
  }

  public getWaiters(): Observable<any[]> {
    return this.http.get<any>(baseURL + "/waiter/users");
  }

  public getOrdersWithStatusOrderedOrInProduction(): Observable<ExtensiveOrder[]> {
    return this.http.get<ExtensiveOrder[]>(baseURL + "/kitchen/extensiveorders").pipe(map((dbItems) => {
      return dbItems.map(item =>
        new ExtensiveOrder(item.orderid, item.orderdate, item.tableid, item.totalamount, item.itemids, item.itemnumbers, item.itemtitles, item.itemstatuses, item.itemcomments, item.itemprices, item.menuitemstatuses));
    }));
  }

  // public getOrdersWithStatusOrderedOrInProduction(): Observable<Order[]> {
  //   return this.http.get<Order[]>(baseURL + "/kitchen/extensiveorders").pipe(map((dbItems) => {
  //     console.log(dbItems)
  //     return dbItems.map(item =>
  //       new Order(item.orderid, item.status, item.orderdate, item.tableid, item.paymentreference, item.paymenttoken, item.totalamount));
  //   }));
  // }

  public getItemsWithStatusOrderedOrInProduction(): Observable<DbItem[]> {
    return this.http.get<DbItem[]>(baseURL + "/kitchen/items");
  }

  public reorderItems(from: number, to: number): Observable<any> {
    return this.http.put(baseURL + "/kitchen/items/reorder?from=" + from + "&to=" + to, {});
  }

  public setComment(number: number, comment: string): Observable<any> {
    return this.http.put(baseURL + "/kitchen/orderitems/" + number, { comment });
  }

  public setOrderitemStatus(number: number, status: string): Observable<any> {
    return this.http.put(baseURL + "/kitchen/orderitems/" + number, { status });
  }

  public loginAs(user: string, password: string, role: string): Observable<any> {
    return this.http.post(baseURL + "/login", { user, password, role });
  }

  public checkToken(token: string): Observable<any> {
    return this.http.post(baseURL + "/checkToken", { token });
  }

}
