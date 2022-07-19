import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryCheckListComponent } from './category-check-list.component';

describe('CategoryCheckListComponent', () => {
  let component: CategoryCheckListComponent;
  let fixture: ComponentFixture<CategoryCheckListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryCheckListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryCheckListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
