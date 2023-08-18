import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class BoatOwnerService {

constructor(private Http:HttpClient) { }
originalPath = "http://localhost:5000/"
getBoatOwners() {
  return this.Http.get(this.originalPath + "admin/getAllBoatOwners")
}
changeStatus(id:number){
  return this.Http.put(this.originalPath + "admin/getBoatOwner/"+id+"/status",{})
}
getBoatOwnerData(id:number){
  return this.Http.get(this.originalPath + "admin/getBoatOwnerData/"+id)
}
getBoatOwnerBoats(id:number){
  console.log(id)
  return this.Http.get(this.originalPath + "admin/getBoatOwnerBoats/"+id)
}
addBoatOwner(data:any){


  let s = this.Http.post(this.originalPath+'register',{

    name:data.name,
    email:data.email,
    password:data.password
  })
 
  return s
}
}
