import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl,Validator, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  constructor(private brandService:BrandService,
              private colorService:ColorService,
              private carService:CarService,
              private formBuilder:FormBuilder,
              private toastrService:ToastrService,
              private router:Router) { }
  
  brands:Brand[];
  colors:Color[];
  carAddForm:FormGroup;
  brandId:number;
  colorId:number;

  ngOnInit(): void {
    this.getBrands();
    this.getColors();
    this.createCarAddForm();
  }
getBrands(){
  this.brandService.getBrands().subscribe((response)=>{
    this.brands=response.data;
  });
}
getColors(){
  this.colorService.getColors().subscribe((response)=>{
    this.colors=response.data;
  });
}
createCarAddForm(){
   this.carAddForm=this.formBuilder.group({
     brandId:["",Validators.required],
     colorId:["",Validators.required],
     dailyPrice:["",Validators.required],
     modelYear:["",Validators.required],
     descriptions:["",Validators.required],
     carName:["",Validators.required]
   });
}
add(){
  if(this.carAddForm.valid){
    console.log(this.carAddForm,"car buraya gelecek")
   // console.log(this.carAddForm[].brandId,"car buraya gelecek")
    let carModel=Object.assign({},this.carAddForm.value);
      this.carService.add(carModel).subscribe(
        (response)=>{
         this.toastrService.success(response.message,"Success");
         console.log(response.message)
         this.router.navigate(["/cars"])
      },
      (responseError)=>{
        console.log("errrorun icine girdi")
        console.log(responseError.error,"vali error bumu ya")
        if(responseError.error.ValidationErrors.length>0){
          console.log("if in icine girdi")
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            console.log("for un icine girdi")
            this.toastrService.error(
              responseError.error.ValidationErrors[i].ErrorMessage,"Authendication Problem"
            )
            
          }
        }
      });
  }
  else{
    this.toastrService.error("Attendion!","Form is empty")
  }
}
}
