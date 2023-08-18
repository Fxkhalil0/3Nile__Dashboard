import {Component} from '@angular/core';
import { TripsService } from '../services/trips.service';
import { ActivatedRoute } from '@angular/router';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css'],
 
})
export class TripDetailsComponent {
  number:number=0
  tripDetails:any
  tripUserDetails:any
  tripBoatDetails:any
  tripRev:any
constructor(private tripSrv :TripsService,private rout:ActivatedRoute) {
  this.rout.params.subscribe(
    (param)=>{
      console.log(param["id"])
this.number=param["id"]
    })
    this.getData()
}
  displayedColumns: string[] = ['demo-position', 'demo-name', 'demo-weight', 'demo-symbol'];
  dataSource = ELEMENT_DATA


  getData(){
    this.tripSrv.getTripData(this.number).subscribe({
      next:(res:any)=>{
          console.log(res)
        this.tripDetails=res.trip;
        this.tripUserDetails=res.user;
        this.tripBoatDetails=res.boat;
        this.tripRev =res.tripRev[0]
      }
    })
  
  }
  // getTripData(){
  //   this.tripSrv.getTripData("70987654321234567").subscribe({
  //     next:(data:any) => {
  //       this.trip=data
  //     }
  //   })
  // }
}

// /**
//  * @title Styling columns using their auto-generated column names
//  */
// @Component({
//   selector: 'table-column-styling-example',
//   styleUrls: ['table-column-styling-example.css'],
//   templateUrl: 'table-column-styling-example.html',
// })
// export class TableColumnStylingExample {
//  ;
// }