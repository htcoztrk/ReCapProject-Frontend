import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/carDetail';
import { CarDetailWithImageService } from 'src/app/services/car-detail-with-image.service';

@Component({
  selector: 'app-car-detail-with-image',
  templateUrl: './car-detail-with-image.component.html',
  styleUrls: ['./car-detail-with-image.component.css']
})
export class CarDetailWithImageComponent implements OnInit {

  constructor(private carDetailWithImageService:CarDetailWithImageService,
    private activatedRoute:ActivatedRoute) { }
  carDetail:CarDetail[]=[];
  dataLoaded=false;
  message:string
  carii:number
  path="C:/Users/Hp/Desktop/KodlamaİO/ReCapProject/WebAPI/Images/";
  imageBaseUrl = "https://localhost:44368/";
  ngOnInit(): void {
        this.activatedRoute.params.subscribe(params=>{
        this.getCarDetailByCarId(params["carId"])
      })
      
  }
  getCarDetailByCarId(carId:number){
     this.carDetailWithImageService.getCarDetailByCarId(carId).subscribe(response=>{
       this.carDetail=response.data;
       this.message=response.message
       this.dataLoaded=true;
       this.carii=carId
     })
  }
}
