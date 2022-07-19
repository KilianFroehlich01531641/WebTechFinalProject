import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaiterToolbarComponent } from './waiter-toolbar.component';

describe('WaiterToolbarComponent', () => {
  let component: WaiterToolbarComponent;
  let fixture: ComponentFixture<WaiterToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaiterToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaiterToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
