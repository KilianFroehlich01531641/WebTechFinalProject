import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { MenuCategoryList } from './model/MenuCategoryList';
import { environment } from '../environments/environment'
import { Router } from '@angular/router';
import { DataBaseService } from './services/data-base.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


//http-server -p 4200 -c-1 dist/Waiterskitchenview

//When code get's changed the method above will load old cache although the flag is set that it should not. this is a bug from the js itself
//to get a new build do following:
//ng serve
//edit code save
//edit id back save
//cancle ng serve
//ng serve again
//check if no request for push comes. if it does start from the first step, if not continue
//cancle ng serve
//ng build
//now you can run http-server again with new build

export class AppComponent {

  public static myPickups: number[] = [];
  public static waiters: any[] = [];

  constructor(private router: Router) {
    if (!this.resumeSession()) {
      this.redirectLogin();
    }
  }

  resumeSession(): boolean {

    let token = localStorage.getItem('token');
    let user = localStorage.getItem('user');
    let role = localStorage.getItem('role');

    if (token && user && role) {
      environment.role = role;
      environment.loggedInUser = user;
      environment.isLoggedIn = true;

      return true;
    }

    return false;
  }

  redirectLogin() {
    localStorage.clear();
    environment.isLoggedIn = false; //TODO repetition => method
    environment.loggedInUser = "";
    environment.role = "";

    this.router.navigateByUrl('/login'); //redirecting to login if no resumable session
    console.log("redirect")
  }

}
