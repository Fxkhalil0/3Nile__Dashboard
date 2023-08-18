import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from'@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BoatOwnerService } from '../boatOwner.service';

@Component({
  selector: 'app-add-boat',
  templateUrl: './add-boat.component.html',
  styleUrls: ['./add-boat.component.css']
})
export class AddBoatComponent {
  data:FormData
  // editform:FormGroup;
  form:FormGroup

  constructor(
    private router:Router,
    private builder: FormBuilder,
    private botownsrv:BoatOwnerService
    ) {
    this.data = new FormData()
    this.form = this.builder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],

      /// error => colors: [this.builder.array([['']])], control=>array=>[control,control,...]
      // categoryName: ['1',],
      // categoryID: ['1',],
      // imgURL:['',],
    })
  }

  ngOnInit() {
  }
  send(){
    if (this.form.valid) 
      this.data = this.form.value
    this.botownsrv.addBoatOwner(this.data).subscribe({
      next:(res)=>{
        console.log(res)
   
      }
      
     
    })

    this.botownsrv.getBoatOwners()
   
    this.router.navigate(['/BoatOwner'])
  }
 

}
