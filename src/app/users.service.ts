import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { users } from './users/users.component';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }
  orignaPath ="http://localhost:5000/" 
  getAllUsers(){
    return this.http.get<users>(this.orignaPath+"admin/getAllUsers");
  }
  change(id:number){
    return this.http.put<users>(this.orignaPath+"admin/getUser/"+id+"/status",{});
  }
  getoneUser(id:number){
    return this.http.get<users>(this.orignaPath+"admin/getUserData/"+id);
  }
  getOneUserTrips(id:number){
    return this.http.get(this.orignaPath+"admin/userTrips/"+id);
  }
}
