import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartType, ChartOptions, ChartDataset, LinearScale } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-Statistics',
  templateUrl: './Statistics.component.html',
  styleUrls: ['./Statistics.component.css']
})

export class StatisticsComponent implements OnInit {
  daysOfWeek: any[]=[];
newClients :any[]= [];
   trips :any[]= [];
  mostRequestedBoat :any[]= [];
  
  
  public barChartLabels:NgChartsModule[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartData: ChartDataset[] = [
    { data: [], label: 'New clients' },
    { data: [], label: 'Trips' },
    { data: [], label: 'Most requested boat' },
  ];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('localhost:5000/admin/statistics/week').subscribe((data: any) => {
      console.log(data);
      this.daysOfWeek = data.daysOfWeek;
      
      this.daysOfWeek.forEach(day => {
       
        this.newClients.push(day.numNewClients);
        this.trips.push(day.numTrips);
        if (day.mostRequestedBoat) {
          this.mostRequestedBoat.push(day.mostRequestedBoat);
        } else {
          this.mostRequestedBoat.push(0);
        }
      });

      this.barChartData[0].data = this.newClients;
      this.barChartData[1].data = this.trips;
      this.barChartData[2].data = this.mostRequestedBoat;
    });
  }

}
