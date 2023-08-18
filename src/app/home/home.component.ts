// import { SiteStatsService } from '../services/site-stats.service';
import {Component, OnInit } from '@angular/core';
import { SiteStatsServiceService } from '../services/site-stats.service.service';
import { SiteStats } from '../site-stats';
import createChart from 'chart.js/auto';
import {TopRatedBoatsComponent} from '../topRatedBoats/topRatedBoats.component'
import * as Chart from 'chart.js';
import { io } from 'socket.io-client';
const socket = io('ws://localhost:5000',{

  transports: ['websocket', 'polling'],
  
  withCredentials: true
});

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  adminsNumber:any
  numBoats: any;
  usersNumber:any;
  boatOwnerNumber:any;
  tripsNumber:any
  reviewsNumber:any
  commentsNumber:any
  offersNumber:any
  allStatistics:any

  // charts
  userChart: any;
  tripChart: any;
  ownerChart: any;
  constructor(private srv:SiteStatsServiceService ) { }

  ngOnInit() {
    socket.on('registeration', (message: string, data: any) => {
      this.getNumOwnerss()

    })
   
    socket.on('You-Got-New-Trip-Request', (message: string, data: any) => {
      this.getNumTrips()
    })
    socket.on('New User-registerd', (message: string, data: any) => {
      this.getNumUsers()
    })
    socket.on('user Comment', (message: string, data: any) => {
      this.getNumComments()

    })
    socket.on('user Rate', (message: string, data: any) => {
      this.getNumReviews()

    })






    this.getAllStatstics()
    this.getNumOwnerss()
    this.getNumBoats()
    this.getNumUsers()
    this.getNumTrips()
    this.getNumComments()
    this.getNumOffers()
    this.getNumAdmins()
    this.getNumReviews()

    // charts:
    this.getStates()
    
  }
  getAllStatstics(){
    this.srv.getAllstatstic().subscribe((data: any) => {
        console.log(data);
      this.allStatistics = data;
    });
  }
  getNumBoats() {
    this.srv.getNumBoats().subscribe((data: any) => {
      
      this.numBoats = data;
    });
  }
  getNumOwnerss() {
    this.srv.getNumOwners().subscribe((data: SiteStats) =>{
      this.boatOwnerNumber = data;

    })
     
   
  }
  getNumAdmins() {
    this.srv.getNumAdmins().subscribe((data: SiteStats) =>{
      this.adminsNumber = data;

    })
     
   
  }
  getNumOffers() {
    this.srv.getNumOffers().subscribe((data: SiteStats) =>{
      this.offersNumber = data;

    })
  }
  getNumComments() {
    this.srv.getNumComments().subscribe((data: SiteStats) =>{
      this.commentsNumber = data;

    })
  }
  getNumReviews() {
    this.srv.getNumReviews().subscribe((data: SiteStats) =>{
      this.reviewsNumber = data;

    })
  }
  getNumUsers() {
    this.srv.getNumUsers().subscribe((data: any) => {
      this.usersNumber = data;
    });
  }
  getNumTrips() {
    this.srv.getNumTrips().subscribe((data: any) => {
      this.tripsNumber = data;
    });
  }

 getStates(){
  this.srv.getSiteStates().subscribe((data: any) =>{
    const userLabels :string[]= [];
    const userData :string[]= [];
    data.userStats.forEach((week: any) => {
      const weekStr = `${week._id.year}-W${week._id.week}`;
      userLabels.push(weekStr);
      userData.push(week.count);
    });
    const ownersLabels :string[]= []
    const ownersData :string[]= []
    data.boatOwnerStats.forEach((week: any) => {
      const weekStr = `${week._id.year}-W${week._id.week}`;
      ownersLabels.push(weekStr);
      ownersData.push(week.count);
    });




    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const weeksInMonth = Math.ceil((lastDayOfMonth.getDate() - firstDayOfMonth.getDate() + 1) / 7);
    const weekLabels: string[] = [];
    for (let i = 1; i < weeksInMonth; i++) {
      weekLabels.push(`Week ${i}`);
    }
    // 
    const userCanvas = document.getElementById('userChart') as HTMLCanvasElement;
    this.userChart = new createChart(userCanvas, {
      type: 'bar',
      
      
data: {
        labels: weekLabels,
        
        datasets: [
          {
            label: 'Users Registed In This Week',
            data: userData,
            backgroundColor: '#fff',
            borderColor: '#F89334',
            borderWidth: 12,
            hoverBorderColor:'red',
            // hoverBackgroundColor:'red'

  
          }, {
            label: 'Boat Owner Registed In This Week',
            data: ownersData,
            borderColor: '#F89334',
            borderWidth: 12,
            hoverBorderColor:'red',
          

            

          }
        ]
      },
     
    });
   

    // Draw trip chart
  
  });



  }




  getTopRatedBoats(){

  }
 }


 

