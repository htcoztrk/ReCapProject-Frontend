import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
   dataLoaded=false;
   carDetail:CarDetail[]=[]

   carUpdateForm:FormGroup;
   carDeleteForm:FormGroup;
   selectedCar:Car;
   
  constructor(private carDetailService:CarDetailService,
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private router:Router,
    private carSerice:CarService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
       if(params["brandId"] && params["colorId"]){
        this.getCarDetailsByBrandColorId(params["brandId"],params["colorId"]);
         
       }
       else if(params["colorId"]){
           this.getCarDetailByColorId(params["colorId"])
         }
      else if(params["brandId"]){
        this.getCarDetailByBrandId(params["brandId"])
         }
      else{
        this.getCarDetails();
      }   
      
    })
    //this.getCarDetails();
  }
   getCarDetails(){
         this.carDetailService.getCarDetails().subscribe(response=>{
           this.carDetail=response.data;
           this.dataLoaded=true;
         })
   }

   getCarDetailByBrandId(brandId:number){
    this.carDetailService.getCarDetailsByBrandId(brandId)
    .subscribe(response=>{
      this.carDetail=response.data;
      this.dataLoaded=true;
    })
 }
 /////
 /*getCarDetailByCarId(brandId:number){
  this.carDetailService.getCarDetailsByBrandId(brandId)
  .subscribe(response=>{
    this.carDetail=response.data;
    this.dataLoaded=true;
  })
}*/
 getCarDetailByColorId(colorId:number){
   this.carDetailService.getCarDetailsByColorId(colorId)
   .subscribe(response=>{
     this.carDetail=response.data;
     this.dataLoaded=true;
   })
 }
getCarDetailsByBrandColorId(brandId:number,colorId:number){
  this.carDetailService.getCarDetailsByBrandColorId(brandId,colorId)
  .subscribe(response=>{
    this.carDetail=response.data;
    this.dataLoaded=true;

  })
} 

setSelectedCarToUpdate(car:Car){
  this.selectedCar=car;
  this.updateCreateForm();
}
updateCreateForm(){
  this.carUpdateForm=this.formBuilder.group({
    carId:[this.selectedCar.carId,Validators.required],
    carName:[this.selectedCar.carName,Validators.required],
    colorId:[this.selectedCar.colorId,Validators.required],
    brandId:[this.selectedCar.brandId,Validators.required],
    dailyPrice:[this.selectedCar.dailyPrice,Validators.required],
    modelYear:[this.selectedCar.modelYear,Validators.required],
    descriptions:[this.selectedCar.descriptions,Validators.required]
  })
}
setSelectedCarToDelete(car:Car){
  this.selectedCar=car;
  this.deleteCreateForm();
}
deleteCreateForm(){
  this.carDeleteForm=this.formBuilder.group({
    carId:[this.selectedCar.carId,Validators.required],
    carName:[this.selectedCar.carName,Validators.required],
    colorId:[this.selectedCar.colorId,Validators.required],
    brandId:[this.selectedCar.brandId,Validators.required],
    dailyPrice:[this.selectedCar.dailyPrice,Validators.required],
    modelYear:[this.selectedCar.modelYear,Validators.required],
    descriptions:[this.selectedCar.descriptions,Validators.required]
  })
}

updateCar(){
  if(this.carUpdateForm.valid){
    let carModel=Object.assign({},this.carUpdateForm.value)
    this.carSerice.update(carModel).subscribe(
      (response)=>{
        this.toastrService.success(response.message,"Success")
        //this.router.navigate(["/cars"])
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      },
      (responseError)=>{
        
        if(responseError.error.ValidationErrors.length>0){
          
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,
              "Authendication Problem")
          }
        }
      })
      
  }
  else{
    this.toastrService.warning("Form can not be null","Update Failed!")
  }
}
deleteCar(){
  if(this.carDeleteForm.valid){
    let carModel=Object.assign({},this.carDeleteForm.value)
    this.carSerice.delete(carModel).subscribe(
      (response)=>{
        this.toastrService.success(response.message,"Success")
        //this.router.navigate(["/cars"])
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      },
      (responseError)=>{
        if(responseError.error.ValidationErrors.length>0){
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,
              "Authendication Problem")
          }
        }
      })
      
  }
  else{
    this.toastrService.warning("Form can not be null","Update Failed!")
  }
}
}
