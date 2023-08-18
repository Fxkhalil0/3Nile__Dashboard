import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';

import { UsersService } from '../users.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatTableDataSource } from '@angular/material/table';
import { io } from 'socket.io-client';
const socket = io('ws://localhost:5000',{

  transports: ['websocket', 'polling'],
  
  withCredentials: true
});
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],

})

export class UsersComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'email', 'addrees', 'phone',"image","status","button","details"];
  public imageSrc: any;
  users:any
  status:string = 'block'
  constructor(private ussrv:UsersService,private sanitizer: DomSanitizer ){
    this.users = this.getAllUsers()
    console.log(this.users+"dsffdsf")
  }
  userData = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngOnInit() {
    socket.on('New User-registerd', (message: string, data: any) => {
      this.getAllUsers()

    })}
  ngAfterViewInit() {
    this.userData.paginator = this.paginator;
  }

  getSanitizedImage(imageUrl: string) {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }
  getAllUsers(){
    this.ussrv.getAllUsers().subscribe({
      next:(res:any)=>{
        console.log(res+"dsada");
        this.userData.data=res;
        this.users = res;

      }
    });
  }
  change(id:number){
    this.ussrv.change(id).subscribe({
      next:(res:any)=>{
              console.log(res)
            }
    })
    if(this.status="block"){
      this.status = "active"
    }else{
      this.status = "block"
    }

    setTimeout(()=>{
      this.getAllUsers()

    },50)
  }
  getoneUser(id:number){
    this.ussrv.getoneUser(id).subscribe({
      next:(res:any)=>{
              console.log(res)
            }
    })
  }
}

export interface users {
  name: string;
  email: string;
  addrees: string;
  phone: string;
  image: string;
}


