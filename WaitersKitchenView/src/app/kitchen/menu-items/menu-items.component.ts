import { Component, HostListener, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/model/MenuItem';
import { DataBaseService } from 'src/app/services/data-base.service';

@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.css']
})
export class MenuItemsComponent implements OnInit {

  menuItemsList: MenuItem[] = [];
  available: boolean = true;
  currentExpanded: number = -1;

  constructor(private dataBaseService: DataBaseService) {
    this.fetchMenuItemsList();
  }

  // HostListener annotates methods triggered on events somewhere in the DOM
  inside = false;

  @HostListener("click")
  componentClicked() {
    this.inside = true;
  }

  // effectively: when clicked outside of the list => collaps
  @HostListener("document:click")
  domClicked() {
    if (!this.inside && this.currentExpanded != -1) { this.collaps(); }
    this.inside = false;
  }

  ngOnInit(): void { }

  public fetchMenuItemsList(): void {
    this.dataBaseService.getMenuItems().subscribe(data => {
      this.menuItemsList = data;
    });
  }

  public changeItemStatus(id: number) {
    this.dataBaseService.toggleMenuItemState(id).subscribe(data => {
      console.log(data);
      this.fetchMenuItemsList(); //TODO make fetch only update changed rows for more efficiency
      // this.collaps();
    });
  }

  public expand(id: number) {
    this.currentExpanded = id;
  }

  public collaps() {
    this.currentExpanded = -1;
  }

  public onReset(event: MouseEvent) {
    this.collaps();
    event.stopPropagation();
  }

  public onCommit(event: MouseEvent) {
    this.fetchMenuItemsList();
    this.collaps();
    event.stopPropagation();
  }

  public getNiceString(items: string[]): string {
    let s = "";
    for (let dbItem of items) {
      s += dbItem + ", ";
    }
    return s.slice(0, s.length - 2);
  }

}
