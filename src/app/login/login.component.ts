import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TripsService } from '../services/trips.service';
import { UserAccountService } from '../services/user-account.service';
import { AuthGuard } from '../auth-gard.guard';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{
  isUserLogged: boolean = false;
  form: FormGroup;
  userData: any
  passType: string = "password";
  returnedUrl = "/trip";
  isloggedSubject= new BehaviorSubject<boolean>(false);

  constructor(private builder: FormBuilder,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private tripSv: TripsService,
    private userAccSrv: UserAccountService,
    private myGuard: AuthGuard) {
    this.form = this.builder.group({
      email: ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    })
    this.activateRoute.params.subscribe({
      next: (prams) => {
        this.returnedUrl = prams["returnRrl"]
        console.log(this.returnedUrl)
      }
    })
  }
  ngOnInit() {
    this.isUserLogged = this.userAccSrv.isUserLogged;
    this.userAccSrv.getIsloggedSubject().subscribe((value) => {
      console.log('BehaviorSubject value:', value);
    });
  }

  change() {
    this.passType = (this.passType == "password") ? 'text' : 'password'
    // this.isUserLogged = this.userAccSrv.isUserLogged;
  }

  send() {
    
    if (this.form.valid) {
      this.userData = this.form.value
      this.userAccSrv.adminLogin(this.userData).subscribe((response: any) => {
        console.log(response);
        if (response.status === 'success' || 200) {
          localStorage.setItem("token", this.userData.email)
          this.isloggedSubject.next(true); // update the value of the BehaviorSubject
          this.router.navigate(['']);
          this.isUserLogged = this.userAccSrv.isUserLogged;
        } else {
          console.log("eeeeerrrrr")
        }
      });
    }
  }

  logout() {
    localStorage.removeItem('token')
    this.isUserLogged = this.userAccSrv.isUserLogged;
    this.isloggedSubject.next(false); // update the value of the BehaviorSubject
  }


}
