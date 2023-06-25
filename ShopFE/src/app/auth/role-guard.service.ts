import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import { AuthService } from './auth.service';
import { User } from '../Models/user';
@Injectable({
  providedIn : 'root'
})
export class RoleGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data['expectedRole'];
    // const token = localStorage.getItem('user');
    // const tokenPayload = decode(token!);
    let t : User;
    t = JSON.parse( localStorage.getItem('user')!);
    if ( !this.auth.isAuthenticated()  || t.role !== expectedRole)
    {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
