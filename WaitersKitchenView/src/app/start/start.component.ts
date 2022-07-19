import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(role: string) {
    this.dialog.open(LoginDialogComponent, { data: { role: role }, width: '100%', height: '50%' });
  }

}


//https://www.youtube.com/watch?v=lrVpUVydZwM