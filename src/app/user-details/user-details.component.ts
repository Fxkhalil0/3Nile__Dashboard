import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../users.service';
import { users } from '../users/users.component';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent {
  displayedColumns: string[] = ["img",'boatId', 'price', 'hours',"startTime","endTime", 'status'];
  // dataSource = ELEMENT_DATA;
  number:number = 0;
  userDetails:any;
  userTrips = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.userTrips.paginator = this.paginator;
  }
  trips:any
  constructor(private route:ActivatedRoute,private usersrv:UsersService){
    this.route.params.subscribe(
      (pram)=>{
        
        console.log(pram["id"])
        this.number=(pram["id"])
      })
    this.getoneUser() 
    this.getUserTrips()     
    }
    getoneUser(){
          this.usersrv.getoneUser(this.number).subscribe({
            next:(res)=>{
              this.userDetails = res
              
             
            }
          })
        }
    getUserTrips(){
      this.usersrv.getOneUserTrips(this.number).subscribe({
        next:(res:any)=>{
                  this.trips = res
                  this.userTrips.data=res
                  console.log(this.userTrips)
                }
      })
    }
}
