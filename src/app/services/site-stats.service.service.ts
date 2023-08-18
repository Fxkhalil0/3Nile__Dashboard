import { SiteStats } from './../site-stats';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { SiteStats } from '../site-stats';
import { BehaviorSubject, Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SiteStatsServiceService {
  // statesSub:BehaviorSubject<SiteStats>

  
  // behavSubject:BehaviorSubject
  constructor(private http: HttpClient ) { 
// this.statesSub=new BehaviorSubject<SiteStats>()
  }
 getNumBoats() {
    return this.http.get<SiteStats>('http://localhost:5000/admin/num-boats');
  }
  getAllstatstic() {
    return this.http.get<any>('http://localhost:5000/admin//site-stats');
  }
  getNumOwners()  {
    
    let data = this.http.get<SiteStats>('http://localhost:5000/admin/num-owners');
    return data;
  }
  getNumAdmins() {
    return this.http.get<SiteStats>('http://localhost:5000/admin/num-admins');
  }
  getNumUsers() {
    return this.http.get<SiteStats>('http://localhost:5000/admin/num-users');
  }
  getNumTrips() {
    return this.http.get<SiteStats>('http://localhost:5000/admin/num-trips');
  }
  getNumComments(){
    return this.http.get<SiteStats>('http://localhost:5000/admin/num-comments');

  }
  getNumReviews(){
    return this.http.get<SiteStats>('http://localhost:5000/admin/num-reviews');

  }
  getNumOffers(){
    return this.http.get<SiteStats>('http://localhost:5000/admin/num-offers');

  }



  getSiteStates(){
    return this.http.get<any>('http://localhost:5000/admin/allStats');

  }


  getTopRated(){
    return this.http.get<any>('http://localhost:5000/admin/boats/top-rated');

  }
  getTopRatedTrips(){
    return this.http.get<any>('http://localhost:5000/admin/trips/top-rated');

  }
  getTripDetails(id:any){
    return this.http.get<any>('http://localhost:5000/admin/getTrip/'+id);

  }
  // getTripDetails(id:any){
  //   return this.http.get<any>('http://localhost:5000/admin/getTrip/'+id);

  // }
  
  getUsersComments(){
    return this.http.get<any>('http://localhost:5000/admin/comments/');

  }
  getAdminData() {
    const email = localStorage.getItem('token');
    console.log(email)
    return this.http.get<any>(`http://localhost:5000/admin/getData/${email}`);
  }


}
