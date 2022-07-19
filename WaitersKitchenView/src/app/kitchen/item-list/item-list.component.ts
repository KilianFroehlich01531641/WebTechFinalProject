import { CdkDragDrop, CdkDragEnter, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbItem } from 'src/app/model/Item';
import { DataBaseService } from 'src/app/services/data-base.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  itemList: DbItem[] = [];
  dragDisabled: boolean = false;

  constructor(private databaseservice: DataBaseService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.fetchItemList();
  }

  fetchItemList() {
    this.databaseservice.getItemsWithStatusOrderedOrInProduction().subscribe((data) => {
      this.itemList = data;
    })
  }

  ngOnInit(): void {
    // this.activatedRoute.fragment.subscribe((fragment) => {
    //   if (fragment) { //redirect to link without fragment if fragment is set
    //     this.router.navigate(['/kitchen/items']); //TODO if fragment set directly on side -> vanishes but jumps to it
    //   }
    // });
  }

  //TODO problem if multiple users change db; update before reordering
  reorderList(event: CdkDragDrop<string[]>) {
    let from = this.itemList[event.previousIndex].itemnumber;
    let to = this.itemList[event.currentIndex].itemnumber;

    moveItemInArray(this.itemList, event.previousIndex, event.currentIndex);

    this.databaseservice.reorderItems(from, to).subscribe((data) => {
      console.log(data);
      this.fetchItemList();
    })
  }

  //TODO replica from order.ts
  public getTimeStamp(date: Date): string {
    let newDate: Date = new Date(date);
    return newDate.toLocaleString().replace(',', '');
  }

  public getNiceString(items: string[]): string {
    let s = "";
    for (let dbItem of items) {
      s += dbItem + ", ";
    }
    return s.slice(0, s.length - 2);
  }

  public setStatus(itemnumber: number, status: string) {
    this.databaseservice.setOrderitemStatus(itemnumber, status).subscribe(() => {
      if(status === "ready for pickup"){
        this.getItemName(itemnumber).then(res=>{
          this.databaseservice.sendSubMessages(res).subscribe(res=>{
            this.fetchItemList();
          });
        });
      }else{
        this.fetchItemList();
      }
    });
  }

  //need async function so the search is always finished before sending a message;
  public async getItemName(itemnumber: number): Promise<string>{
    let itemname: string = "test";
    for(let element of this.itemList){
      if(element.itemnumber === itemnumber){
        itemname = element.title;
        break;
      }
    }
    return itemname;
  }

}
