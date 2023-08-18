import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TripsService } from '../services/trips.service';
import { DatePipe } from '@angular/common';
import { io } from 'socket.io-client';
const socket = io('ws://localhost:5000',{

  transports: ['websocket', 'polling'],
  
  withCredentials: true
});
@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css'],
})
export class TripsComponent implements AfterViewInit {
  trips: any = [];
  displayedColumns: string[] = [
    'price',
    'date',
    'startTime',
    'hours',
    'endTime',
    'clientId',
    'boatId',
    'status',
    'button',
  ];

  selectedFilter: string = 'all'; // Selected filter value
  tripsData = new MatTableDataSource<any>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private tripSrv: TripsService) {}

  ngAfterViewInit() {
    this.tripsData.paginator = this.paginator;
  }

  ngOnInit() {
    socket.on('You-Got-New-Trip-Request', (message: string, data: any) => {
      this.getAllTrips();
    })
    this.getAllTrips();
  }

  getAllTrips() {
    this.tripSrv.getTrips().subscribe({
      next: (data) => {
        console.log(data);
        this.trips = data;
        this.tripsData.data = data;
      },
    });
  }

  filterTable() {
    if (this.selectedFilter === 'all') {
      this.tripsData.data = this.trips; // Show all data
    } else {
      this.tripsData.data = this.trips.filter(
        (item: any) => item.status === this.selectedFilter
      ); // Filter based on selected status
    }
  }
}
