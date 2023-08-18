
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {
  setIsloggedSubject(arg0: boolean) {
    this.isloggedSubject.next(arg0);
  }
  private isloggedSubject: BehaviorSubject<boolean>

  constructor(private Http: HttpClient) {
    this.isloggedSubject = new BehaviorSubject<boolean>(false);
   }

  originalPath = "http://localhost:5000"

  adminLogin(userData: any):any {
    return this.Http.post(this.originalPath + "/admin/login", {
      email: userData.email,
      password: userData.password
    })
  
  }

  get isUserLogged(): boolean {
    return (localStorage.getItem('token')) ? true : false
  }

  getIsloggedSubject() {
    return this.isloggedSubject.asObservable();
  }

}
