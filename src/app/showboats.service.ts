import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BoatDetail } from '../app/showproducts/showproducts.component'
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowboatsService {
 


  private boatDetailsSubject = new BehaviorSubject<BoatDetail[]>([]);
  boatDetails$ = this.boatDetailsSubject.asObservable();
  
  constructor(private http:HttpClient) { }


  originalpath = "http://localhost:5000/"

  getAllboats(){
    this.http.get<BoatDetail[]>(this.originalpath + 'admin/getAllBoats').subscribe({
      next: (res) => {
        this.boatDetailsSubject.next(res);
      }
    });
    return this.boatDetails$;
  }
  change(id:number){
    return this.http.put<BoatDetail>(this.originalpath+"admin/getBoat/"+id+"/status",{});
  }
    getoneBoat(id:number){
    return this.http.get<BoatDetail>(this.originalpath +"admin/getBoatData/"+id);
    }


    getAllBoatTrips(id:number){
      return this.http.get<any>(this.originalpath +"admin/getBoatTrips/"+id);
    }
}
