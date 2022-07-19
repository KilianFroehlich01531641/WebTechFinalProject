import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitchenToolbarComponent } from './kitchen-toolbar.component';

describe('KitchenToolbarComponent', () => {
  let component: KitchenToolbarComponent;
  let fixture: ComponentFixture<KitchenToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KitchenToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KitchenToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
