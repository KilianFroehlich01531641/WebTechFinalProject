import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const requiredRoles: string[] = route.data['requiredRoles'];
    const atLeastOneOfRoles: string[] = route.data['atLeastOneOfRoles'];
    const notAuthenticated: boolean = route.data['notAuthenticated'];

    if (notAuthenticated) {
      return !environment.isLoggedIn;
    } else {

      if (requiredRoles) {
        if (requiredRoles.length !== 1) return false; //only one role at a time implemented
        if (requiredRoles[0] !== environment.role.toLowerCase()) return false;
      }

      if (atLeastOneOfRoles) {
        if (!atLeastOneOfRoles.includes(environment.role.toLowerCase())) return false;
      }

    }


    return true;
  }

}


//https://stackoverflow.com/questions/46062934/angular-route-guards-or-vs-and