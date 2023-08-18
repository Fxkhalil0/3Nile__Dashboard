import { Component, OnInit, ViewChild } from '@angular/core';
import { SiteStatsServiceService } from '../services/site-stats.service.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { io } from 'socket.io-client';
const socket = io('ws://localhost:5000',{

  transports: ['websocket', 'polling'],
  
  withCredentials: true
});
@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'message'];

  usersComments: any[] = [];
  usersCommentsData = new MatTableDataSource<any>(this.usersComments);

  constructor(private srv: SiteStatsServiceService) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    socket.on('user Comment', (message: string, data: any) => {
      this.getUsersComments();

    })
    this.getUsersComments();
  }

  ngAfterViewInit() {
    this.usersCommentsData.paginator = this.paginator;
  }

  getUsersComments() {
    this.srv.getUsersComments().subscribe({
      next: (data: any) => {
        console.log(data);
        this.usersComments = data;
        this.usersCommentsData.data = data;
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }
}