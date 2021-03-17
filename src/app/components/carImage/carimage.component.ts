import { Component, OnInit } from '@angular/core';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';

@Component({
  selector: 'app-carimage',
  templateUrl: './carimage.component.html',
  styleUrls: ['./carimage.component.css']
})
export class CarimageComponent implements OnInit {
  carImages:CarImage[]=[]
  dataLoaded=false;
  constructor(private carImageService:CarImageService) {}

  ngOnInit(): void {
    this.getCarImages();
  }
  getCarImages(){
    this.carImageService.getCarImage().subscribe(response=>{
      this.carImages=response.data;
      this.dataLoaded=true;
    })
  }
}
