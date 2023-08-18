import { Component, OnInit } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { SiteStatsServiceService } from '../services/site-stats.service.service';
import { io } from 'socket.io-client';
const socket = io('ws://localhost:5000',{

  transports: ['websocket', 'polling'],
  
  withCredentials: true
});
@Component({
  selector: 'app-topRatedBoats',
  templateUrl: './topRatedBoats.component.html',
  styleUrls: ['./topRatedBoats.component.css']
})

export class TopRatedBoatsComponent implements OnInit ,AfterViewInit  {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol','stars'];
  boatsData :any[]=([])
  dataSource = new MatTableDataSource<any>([]);
  constructor(private srv:SiteStatsServiceService) { 




  }
  boatsDataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
 
  ngAfterViewInit() {
    this.boatsDataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    socket.on('user Rate', (message: string, data: any) => {
      this.getTopRated()

    })
    this.getTopRated()
  }
  
getTopRated(){
      this.srv.getTopRated().subscribe((data: any) => {
      console.log(data);
    this.boatsData = data;
    this.boatsDataSource.data = data;
  });
}
}
