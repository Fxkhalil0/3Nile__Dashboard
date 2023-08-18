import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ShowboatsService } from '../showboats.service'


@Component({
  selector: 'app-showproducts',
  templateUrl: './showproducts.component.html',
  styleUrls: ['./showproducts.component.css']
})

export class ShowproductsComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'images', 'price', 'boattype', 'category', 'port', 'numpeo', 'status', 'reviews', 'button', 'showdetails'];
  dataSource = new MatTableDataSource<BoatDetail>(ELEMENT_DATA);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  Boats: any
  status: any
  boatStatus: any
  oldStatus: any



  constructor(private BoatService: ShowboatsService) {
    this.getAllBoatss();
  }

  getAllBoatss() {

    this.BoatService.getAllboats().subscribe({
      next: (res:any) => {
        this.Boats = res;
        this.dataSource.data=res
      }
    })
  }

  change(id:number){
    this.BoatService.change(id).subscribe({
      next:(res:any)=>{
              console.log(res)
            }
    })
    if(this.status="block"){
      this.status = "active"
    }else{
      this.status = "block"
    }

    setTimeout(()=>{
      this.getAllBoatss()

    },50)
  }
  getoneBoat(id: number) {
    this.BoatService.getoneBoat(id).subscribe({
      next: (res) => {
        console.log(res)
      }
    });
  }
}

export interface BoatDetail {
  id: number;
  name: string,
  images: [],
  price: number,
  boattype: string,
  category: string,
  port: string,
  numpeo: number,
  status: string,
  offerid: '',
  reviews: ''
}

const ELEMENT_DATA: BoatDetail[] = [

];
