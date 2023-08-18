import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ShowboatsService } from '../showboats.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-boatdetails', 
  templateUrl: './boatdetails.component.html',
  styleUrls: ['./boatdetails.component.css']
})
export class BoatdetailsComponent {


 
  dataSource = ELEMENT_DATA;
  displayedColumns: string[] = [ 'date', 'price', 'hours','startTime' ,'status'];
  
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild('mySwiper', { static: false }) mySwiper: any;

  number: number = 0;
  boatDetails: any;
  
  boattable= new MatTableDataSource<ProductDetailsTable>(ELEMENT_DATA);
  boatTrips = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) MatPaginator!: MatPaginator;
  
  ngAfterViewInit() {
    this.boatTrips.paginator = this.paginator;
  }
  constructor(private route: ActivatedRoute, private boatsrv: ShowboatsService) {
    this.route.params.subscribe(
      (pram) => {
        console.log(pram["id"])
        this.number = (pram["id"])
      })
    this.getoneBoat()
    this.getBoatTrips() 
  }
  getoneBoat() {
    this.boatsrv.getoneBoat(this.number).subscribe({
      next: (res) => {
        this.boatDetails = res
        console.log(this.boatDetails)
      }
    })
  }
  
  getBoatTrips() {
    this.boatsrv.getAllBoatTrips(this.number).subscribe({
      next: (trips) => {
        this.boatTrips.data = trips
        console.log(this.boatTrips)
      }
    })
  }
}

export interface ProductDetailsTable {
  date: string;
  price: number,
  status: string,
  hours: string;
  starttime: string,
  clientId: string,
  clientsId: string,
  rate: string;
}

const ELEMENT_DATA: ProductDetailsTable[] = [

];
