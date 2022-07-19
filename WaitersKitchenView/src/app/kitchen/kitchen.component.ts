import { Component, OnInit } from '@angular/core';

import { MenuCategoryList } from '../model/MenuCategoryList';
import { DataBaseService } from '../services/data-base.service';

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css']
})
export class KitchenComponent implements OnInit {

  private static menuCategoryList: MenuCategoryList;

  constructor(private dataBaseService: DataBaseService) {
    KitchenComponent.menuCategoryList = new MenuCategoryList(dataBaseService);
  }

  ngOnInit(): void {
  }

  public static refreshCategories() {
    KitchenComponent.menuCategoryList.fetchMenuCategoryList();
  }

  public static getCategoryNames(ids: number[]): string[] {
    return KitchenComponent.menuCategoryList.getNames(ids);
  }

  public static getCategoryList(): MenuCategoryList {
    return KitchenComponent.menuCategoryList;
  }

}
