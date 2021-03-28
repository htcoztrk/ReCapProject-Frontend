import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/carDetail';
import { CarDetailService } from 'src/app/services/car-detail.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
   dataLoaded=false;
   carDetail:CarDetail[]=[]
  constructor(private carDetailService:CarDetailService,
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService) { }

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

}
