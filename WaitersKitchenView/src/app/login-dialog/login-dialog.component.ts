import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Router } from '@angular/router';
import { DataBaseService } from '../services/data-base.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public parentData: any, private databaseservice: DataBaseService, private router: Router, public dialogRef: MatDialogRef<LoginDialogComponent>) { }

  ngOnInit(): void {
  }

  login(user: string, password: string, role: string) {
    this.databaseservice.loginAs(user, password, role).subscribe((res) => {

      if (res.token) {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', user);
        localStorage.setItem('role', role);

        environment.isLoggedIn = true;
        environment.loggedInUser = user;
        environment.role = role.toLowerCase();

        this.router.navigate(['/' + role.toLowerCase() + '/orders']);
        this.dialogRef.close();

      } else {
        console.log("no token has been transmitted")
      }

    }, (err) => {  //TODO error show in html
      if (err.status === 401) {
        (document.getElementById('userInput') as HTMLInputElement).value = "";
        (document.getElementById('passwordInput') as HTMLInputElement).value = "";

        console.log("login failed")

      } else {
        console.log("error")
      }
    })
  }
}


//close dialog: https://www.codegrepper.com/code-examples/typescript/angular+material+close+dialog+programmatically