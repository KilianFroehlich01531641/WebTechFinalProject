import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  public userRole: string = environment.role;
  public loggedInUser: string = environment.loggedInUser;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    environment.isLoggedIn = false;
    environment.loggedInUser = "";
    this.userRole = environment.role = "";
    localStorage.clear(); //delete token
    this.router.navigateByUrl('/login');
  }

}
