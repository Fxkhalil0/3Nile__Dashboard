import { Component, OnInit , AfterViewInit , ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { BoatOwnerService } from '../boatOwner.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {
  // constructor(private router: Router) {}

  // goToDescription(): void {
  //   // Navigate to the description page for the element
  //   this.router.navigate(['/description']);
  // }

  displayedColumns: string[] = [
     'name',
      'portName',
       'image'  ,
        'price',
        'numberOfpeople'];
  ngOnInit() {
    this.getBoatOwnerData()
    this.getBoatOwnerBoats()
  }

  boatOwner:any;
  boatOwnerBoats = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.boatOwnerBoats.paginator = this.paginator;
  }
  num:number =0;
  constructor(private owneSrv:BoatOwnerService , private rout:ActivatedRoute) {
    this.rout.paramMap.subscribe(
      (params:any) => {
        console.log(params.params)
        this.num=(params.params["id"])
      }
    )
  }


  getBoatOwnerData(){
    console.log(this.num)
    this.owneSrv.getBoatOwnerData(this.num).subscribe({
      next:(data:any)=>{
     
        this.boatOwner = data;
    }
    })
  }

  getBoatOwnerBoats(){
    console.log("first")
    this.owneSrv.getBoatOwnerBoats(this.num).subscribe({
      next:(data:any)=>{
        console.log(data);
        this.boatOwnerBoats.data=data

    }
    })
  }
}

