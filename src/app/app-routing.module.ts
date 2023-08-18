import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UsersComponent } from './users/users.component';
import { BoatOwnerComponent } from './boatOwner/boatOwner.component';
import { DescriptionComponent } from './description/description.component';
import { AddBoatComponent } from './add-boat/add-boat.component';
import { ShowproductsComponent } from './showproducts/showproducts.component';
import { BoatdetailsComponent } from './boatdetails/boatdetails.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { TripsComponent } from './trips/trips.component';
import { TripDetailsComponent } from './trip-details/trip-details.component';
import { AuthGuard } from './auth-gard.guard';
import { CommentsComponent } from './comments/comments.component';


const routes: Routes = [
  {path:'',redirectTo:"home",pathMatch:"full"},
  {path:'home',component:HomeComponent , canActivate: [AuthGuard]},
  { path: 'BoatOwner', component: BoatOwnerComponent , canActivate: [AuthGuard]},
  { path: 'boats', component: ShowproductsComponent , canActivate: [AuthGuard]},
  { path: 'Description/:id', component: DescriptionComponent , canActivate: [AuthGuard]},
  {path: 'AddBoat' , component: AddBoatComponent , canActivate: [AuthGuard]},
  {path:"user/:id",component:UserDetailsComponent , canActivate: [AuthGuard]},
  {path:"users",component:UsersComponent , canActivate: [AuthGuard]},
  {path:'trip', component: TripsComponent, canActivate: [AuthGuard]},
  { path:'tripDetail/:id', component: TripDetailsComponent, canActivate: [AuthGuard]},
  { path:'login', component: LoginComponent },
  { path:'comments', component: CommentsComponent,canActivate: [AuthGuard] },
  {path: 'showproducts', component: ShowproductsComponent, canActivate: [AuthGuard]},
  {path: 'boatdetails/:id', component: BoatdetailsComponent, canActivate: [AuthGuard]},


]



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
