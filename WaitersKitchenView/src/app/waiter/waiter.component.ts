import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { DataBaseService } from '../services/data-base.service';

@Component({
  selector: 'app-waiter',
  templateUrl: './waiter.component.html',
  styleUrls: ['./waiter.component.css']
})
export class WaiterComponent implements OnInit {

  constructor(private dataBaseService: DataBaseService) { 
      
  }

  ngOnInit(): void {
  }

}
