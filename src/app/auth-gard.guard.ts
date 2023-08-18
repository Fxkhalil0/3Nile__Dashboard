import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserAccountService } from './services/user-account.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {


  constructor(private router: Router, private UserServ: UserAccountService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (this.UserServ.isUserLogged)
      {
        return true
      }
      else{
        this.router.navigate(['/login']);
        return false;
      }}
  }