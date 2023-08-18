import {AfterViewInit, Component, OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { BoatOwnerService } from '../boatOwner.service';
import { DomSanitizer } from '@angular/platform-browser';
import { io } from 'socket.io-client';
const socket = io('ws://localhost:5000',{

  transports: ['websocket', 'polling'],
  
  withCredentials: true
});
@Component({
  selector: 'app-boatOwner',
  templateUrl: './boatOwner.component.html',
  styleUrls: ['./boatOwner.component.css']
})
export class BoatOwnerComponent implements AfterViewInit {
  displayedColumns: string[] = [ 'name', 'email' , 'phone', 'imgUrl' , 'address' , 'status' , 'button' , 'button2'];
  dataSource = new MatTableDataSource<BoatOwner>(ELEMENT_DATA);
  boatOwner:any;
  constructor(private owneSrv:BoatOwnerService,private sanitizer: DomSanitizer) {
    this.getAllBoatOwners()
  }
  boatOwnerData = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  getSanitizedImage(imageUrl: string) {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }
  ngAfterViewInit() {
    this.boatOwnerData.paginator = this.paginator;
  }

  ngOnInit() {
    socket.on('registeration', (message: string, data: any) => {
      this.getAllBoatOwners()

    })
  }

  getAllBoatOwners(){
    this.owneSrv.getBoatOwners().subscribe({
      next:(data:any)=>{
        this.boatOwner = data;
        this.boatOwnerData.data=data
        console.log(this.boatOwnerData)

    }
  })
}


changeStatus(id:number){
  this.owneSrv.changeStatus(id).subscribe({
    next:(data:any)=>{
      this.getAllBoatOwners()
      console.log("Done")
}})
// setTimeout(()=>{
  
// },50)

}

}


// import {MatPaginator} from '@angular/material/paginator';
// import {MatTableDataSource} from '@angular/material/table';

export interface BoatOwner {
  name: string;
  email: string;
  phone: number;
  imgUrl: string;
  address: string;
  status:string;
}

const ELEMENT_DATA: BoatOwner[] = [
  {name: 'Hydrogen', email: "email@iti.com" , imgUrl: "image", phone: 1.0079, status: "active", address: 'H'},
  {name: 'Helium', email: "email@iti.com" , imgUrl: "image", phone: 4.0026, status: "active", address: 'He'},
  {name: 'Lithium', email: "email@iti.com" , imgUrl: "image", phone: 6.941, status: "active", address: 'Li'},
  {name: 'Beryllium', email: "email@iti.com" , imgUrl: "image", phone: 9.0122, status: "active", address: 'Be'},
  {name: 'Boron', email: "email@iti.com" , imgUrl: "image", phone: 10.811, status: "active", address: 'B'},
  {name: 'Carbon', email: "email@iti.com" , imgUrl: "image", phone: 12.0107, status: "active", address: 'C'},
  {name: 'Nitrogen', email: "email@iti.com" , imgUrl: "image", phone: 14.0067, status: "active", address: 'N'},
  {name: 'Oxygen', email: "email@iti.com" , imgUrl: "image", phone: 15.9994, status: "active", address: 'O'},
  {name: 'Fluorine', email: "email@iti.com" , imgUrl: "image", phone: 18.9984, status: "active", address: 'F'},
  {name: 'Neon', email: "email@iti.com" , imgUrl: "image", phone: 20.1797, status: "active", address: 'Ne'},
  {name: 'Sodium', email: "email@iti.com" , imgUrl: "image", phone: 22.9897, status: "active", address: 'Na'},
  {name: 'Magnesium', email: "email@iti.com" , imgUrl: "image", phone: 24.305, status: "active", address: 'Mg'},
  {name: 'Aluminum', email: "email@iti.com" , imgUrl: "image", phone: 26.9815, status: "active", address: 'Al'},
  {name: 'Silicon', email: "email@iti.com" , imgUrl: "image", phone: 28.0855, status: "active", address: 'Si'},
  {name: 'Phosphorus', email: "email@iti.com" , imgUrl: "image", phone: 30.9738, status: "active", address: 'P'},
  {name: 'Sulfur', email: "email@iti.com" , imgUrl: "image", phone: 32.065, status: "active", address: 'S'},
  {name: 'Chlorine', email: "email@iti.com" , imgUrl: "image", phone: 35.453, status: "active", address: 'Cl'},
  {name: 'Argon', email: "email@iti.com"  , imgUrl: "image",phone: 35.453, status: "active", address: 'Ar'},
  {name: 'Potassium', email: "email@iti.com" , imgUrl: "image", phone: 39.0983, status: "active", address: 'K'},
  {name: 'Calcium', email: "email@iti.com" , imgUrl: "image", phone: 40.078, status: "active", address: 'Ca'},
];
