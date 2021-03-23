import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { CarDetailWithImageService } from 'src/app/services/car-detail-with-image.service';
import { CarImageService } from 'src/app/services/car-image.service';

@Component({
  selector: 'app-car-detail-with-image',
  templateUrl: './car-detail-with-image.component.html',
  styleUrls: ['./car-detail-with-image.component.css']
})
export class CarDetailWithImageComponent implements OnInit {

  constructor(private carDetailWithImageService:CarDetailWithImageService,
    private carImageService:CarImageService,
    private activatedRoute:ActivatedRoute) { }
  carDetails:CarDetail[]=[];
  carImages:CarImage[]=[];
  dataLoaded=false;
  message:string
  carii:number
  currentImage:CarImage
  ngOnInit(): void {
        this.activatedRoute.params.subscribe(params=>{
        this.getCarDetailByCarId(params["carId"]),
        this.getCarImageByCarId(params["carId"])
      })
      
  }
  getCarDetailByCarId(carId:number){
     this.carDetailWithImageService.getCarDetailByCarId(carId).subscribe(response=>{
       this.carDetails=response.data;
       this.message=response.message
       this.dataLoaded=true;
       this.carii=carId
     })
  }
  getCarImageByCarId(carId:number){
    this.carImageService.getImageByCarId(carId).subscribe(response=>{
      this.carImages=response.data;
      
      this.dataLoaded=true;
      this.currentImage=this.carImages[0];
    })
 }

 getSliderClassName(carImage:CarImage){
  if(this.currentImage ==carImage){
    return "carousel-item active"
  }else{
    return "carousel-item"
  }

}
}
