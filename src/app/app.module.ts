import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BoatOwnerComponent} from './boatOwner/boatOwner.component'
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { DescriptionComponent } from './description/description.component';
import { AddBoatComponent } from './add-boat/add-boat.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartModule , LineSeriesService} from '@syncfusion/ej2-angular-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { SideNavComponent } from './sideNav/sideNav.component';
import { UsersComponent } from './users/users.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ShowproductsComponent } from './showproducts/showproducts.component';
import { RouterModule } from '@angular/router';
import { BoatdetailsComponent } from './boatdetails/boatdetails.component';
import { HomeComponent } from './home/home.component';
import { StatisticsComponent } from './Statistics/Statistics.component';
import { NgChartsModule } from 'ng2-charts';
import { TopRatedBoatsComponent } from './topRatedBoats/topRatedBoats.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ClarityModule } from '@clr/angular';
import { OverlayModule } from '@angular/cdk/overlay';
import { LoginComponent } from './login/login.component';
import { TripsComponent } from './trips/trips.component';
import { TripDetailsComponent } from './trip-details/trip-details.component';
import { CommentsComponent } from './comments/comments.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { MatSnackBarModule } from '@angular/material/snack-bar';

 // import { TopRatedBoatsComponent } from './topRatedBoats/topRatedBoats.component';
@NgModule({
  declarations: [
    AppComponent,
      UsersComponent,
      UserDetailsComponent,
      BoatOwnerComponent,
      DescriptionComponent,
      AddBoatComponent,
      NavComponent,
      SideNavComponent,
      ShowproductsComponent,
      BoatdetailsComponent,
      HomeComponent,
      StatisticsComponent,
      SideNavComponent,
      TopRatedBoatsComponent,
      LoginComponent,
      TripsComponent,
      TripDetailsComponent,
      CommentsComponent,
      
    
    ],
   
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    HttpClientModule,
    NgChartsModule,
    ChartModule,
    MatPaginatorModule,
    MatTableModule,
    ChartModule,
    ClarityModule,
    OverlayModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    ToastrModule.forRoot()

  ],
  exports: [RouterModule],

  providers: [
    MatTableDataSource

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
