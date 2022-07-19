import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { MenuCategoryList } from 'src/app/model/MenuCategoryList';
import { DataBaseService } from 'src/app/services/data-base.service';
import { KitchenComponent } from '../kitchen.component';

@Component({
  selector: 'app-category-check-list',
  templateUrl: './category-check-list.component.html',
  styleUrls: ['./category-check-list.component.css']
})
export class CategoryCheckListComponent implements OnInit {
  @Input() categories!: string[];
  @Input() id!: number;
  @Output() onCommit: EventEmitter<MouseEvent> = new EventEmitter();
  @Output() onReset: EventEmitter<MouseEvent> = new EventEmitter();

  categoryList: MenuCategoryList;
  selection!: SelectionModel<string>;

  constructor(private databaseService: DataBaseService) {
    this.categoryList = KitchenComponent.getCategoryList();
  }

  ngOnInit(): void {
    this.selection = new SelectionModel<string>(true, this.categories);
  }

  public commit(event: MouseEvent) {
    this.databaseService.putCategories(this.id, this.categoryList.getIds(this.selection.selected)).subscribe((data) => {
      console.log(data);
      console.log(this.selection.selected);
      this.onCommit.emit(event);
    });
  }

  public reset(event: MouseEvent) {
    this.selection = new SelectionModel<string>(true, this.categories);
    this.onReset.emit(event);
  }

  public toggleSelection(category: string) {
    this.selection.isSelected(category) ? this.selection.deselect(category) : this.selection.select(category);
  }

}
