import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ShowboatsService } from '../showboats.service';
import { BoatDetail } from '../showproducts/showproducts.component';

import { io } from 'socket.io-client';
import { SiteStatsServiceService } from '../services/site-stats.service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material/snack-bar';

const socket = io('ws://localhost:5000',{

  transports: ['websocket', 'polling'],
  
  withCredentials: true
});


interface Notification {
  message: string;
  read: boolean;
  // Add any additional properties as needed
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
 

})
export class NavComponent implements OnInit {
  hasNotification: boolean = false; 

  stat :Object={}
  boatDetails:any
  notifications:Object[]=[]
  notificationData :any=[];
  adminData: any;
  constructor(private boatService : ShowboatsService,private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private toastr: ToastrService,
    private snackBar: MatSnackBar,
    private adminService:SiteStatsServiceService) {
      this.audio = new Audio();
      this.audio.src = '../../assets/click.mp3';
   }

   audio: HTMLAudioElement;
   notificationCount: number = 0;
   showNotifications: boolean = false;
   showNotificationsModal: boolean = false;

   openNotificationsModal() {
    this.showNotificationsModal = !this.showNotificationsModal;
    
  }
   
  
   ngOnInit() { 
      // Notification
      socket.on('registeration', (message: string, data: any) => {
        // Check if the notification is new
        const isNewNotification = this.notificationData.find((notification: { message: string; data: any; }) => notification.message === message && notification.data === data) === undefined;
      
        if (isNewNotification) {
          this.notificationCount++;
      
          console.log(message);
          this.showSuccess();
        }
        this.hasNotification = true;
        this.notificationData.push({ message, data });
        console.log(this.notificationData, "dasdasdas");
        this.playAudio();
        
      });







    this.getAdminDataByEmail()
    this.boatService. boatDetails$.subscribe(message => message.map(message =>{
     this.stat= message.status
     console.log(this.stat)
     for (const key in this.stat) {
          console.log(key)
     }
    })

    );
    this.getNotification()
  }
  // Notification Audio
  playAudio() {
    this.audio.play();
  }

  getNotification() {
    socket.on('boat-owner-registered',(ownerData:any)=>{
      console.log(ownerData.email + "has Registered");
      console.log("connected To the server");
      this.notificationData.push(ownerData)
      
      // localStorage.setItem('notification',JSON.stringify(this.notifications))
      console.log(this.notificationData)
      // Do something with the ownerdata, e.g. show it in a popup or update a list of registered owners
    });
  
  }



  showmore(){
    let element = document.getElementById('modal') as HTMLElement
    for (let i = 0; i < this.notificationData.length;i++){
      element.innerHTML +=`<li>${this.notificationData[i].email + "Registered Now "}</li>`

    }
    this.notificationData =[]
   
  }
  logout(){
    localStorage.removeItem("token"); 
    setTimeout(()=>{

      this.router.navigate(['login']);
    },50)


  
  }

  getAdminDataByEmail() {
    this.adminService.getAdminData().subscribe({
      next: (res) => {
        this.adminData = res;
        console.log(this.adminData)
      },
      error: (err) => {
        console.log(err);
      }
    });
  }


  markAsRead(notification: Notification) {
    notification.read = true;
  }
// Notifications Modal
showSuccess() {
  this.toastr.success(
    "New Boat Owner Registered",
    '',
    {
      newestOnTop: false,
      progressBar: true,
      positionClass: "top",
      timeOut: 1000,
      extendedTimeOut: 1000,
   
    }
  );}

showError() {
  this.toastr.error('Oops, something went wrong!', 'Error');
}



closeNotificationsModal() {
  this.notificationData = this.notificationData.filter((notifi: { read: any; }) => !notifi.read);

  this.notificationCount = this.notificationData.length;
    if(this.notificationCount===0){
      this.hasNotification=false
    }
  this.showNotificationsModal = false;
}

navigateToBoatOwner() {
  this.router.navigate(['/BoatOwner']);
}

}
