import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminDataService {
email:string=''
  constructor(private http: HttpClient) { }


  getAdminData(){
    return this.http.get('http://localhost:5000/admin/getData',{
      this.email=
    })
  }
}
