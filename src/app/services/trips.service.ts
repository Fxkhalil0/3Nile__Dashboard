import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TripsService {

  constructor( private Http :HttpClient) { }

  originalPath = "http://localhost:5000"

  getTrips(){
    return this.Http.get<any>(this.originalPath+"/admin/getAllTrips")
  }

  changeStatus(id: number){
    return this.Http.put(this.originalPath+"/admin/getTripAndUpdate/"+id+"/status",{})
  }

  getTripData(id:number){
    return this.Http.get(this.originalPath+"/admin/getTrip/"+id)
  }
}
