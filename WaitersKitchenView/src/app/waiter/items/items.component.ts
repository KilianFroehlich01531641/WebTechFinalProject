import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { DbMenuItem, Item } from 'src/app/model/Item';
import { DataBaseService } from 'src/app/services/data-base.service';


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})

export class ItemsComponent implements OnInit {
  allItems: DbMenuItem[];
  allPickUps: DbMenuItem[];

  constructor(private dataBaseService: DataBaseService) { 
    this.allItems = [];
    this.allPickUps = [];
  }

  //TODO: 
  //      spinner für alle user machen
  //      user speichern
  //      abfrage ändern für nummer array

  ngOnInit(): void {
    this.updateAllItems();
    this.updateMyPickups();
    this.loadWaiters();
  }

  public updateAllItems(){
    this.dataBaseService.getItemsForWaiter().subscribe(res=>{
      this.allItems = res.sort((n1,n2) => n1.number - n2.number);
    })
  }

  public pickUpOrder(id: number){
    this.dataBaseService.putItemStatus(id, "in transit").subscribe(res=>{
      AppComponent.myPickups.push(id);
      this.updateAllItems();
      this.updateMyPickups();
    });
  }

  public updateMyPickups(){
    this.allPickUps = [];
    this.dataBaseService.getPickUpsForWaiter().subscribe(res=>{
      let i = 0;
      res.forEach(element=>{
        if(AppComponent.myPickups.includes(element.number)){
          this.allPickUps.push(element);
        }
      })
    })
  }

  public deliverPickUps(){
    this.itteration(AppComponent.myPickups[0], 0);
  }

  public itteration(id : number, i: number){
    this.dataBaseService.putItemStatus(id, "delivered").subscribe(res=>{
      if(i+1 < AppComponent.myPickups.length){
        this.itteration(AppComponent.myPickups[i+1], i+1);
      }else{
        AppComponent.myPickups = [];
        this.allPickUps = [];
      }
    })
  }

  public loadWaiters(){
    this.dataBaseService.getWaiters().subscribe(res=>{
      AppComponent.waiters = res;
    })
  }

  public getWaiters(){
    return AppComponent.waiters;
  }
}
