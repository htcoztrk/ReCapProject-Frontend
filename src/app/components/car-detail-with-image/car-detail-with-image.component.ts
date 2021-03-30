import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { Rental } from 'src/app/models/rental';
import { RentalDetail } from 'src/app/models/rentalDetail';
import { ResponseModel } from 'src/app/models/responseModel';
import { CarDetailWithImageService } from 'src/app/services/car-detail-with-image.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-car-detail-with-image',
  templateUrl: './car-detail-with-image.component.html',
  styleUrls: ['./car-detail-with-image.component.css']
})
export class CarDetailWithImageComponent implements OnInit {

  constructor(private carDetailWithImageService:CarDetailWithImageService,
    private carImageService:CarImageService,
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService,
    private rentalService:RentalService) { }
  carDetails:CarDetail[]=[];
  carImages:CarImage[]=[];
  //rental:Rental[];
  dataLoaded=false;
  message:string
  currentImage:CarImage;
  rentable:boolean;
  rent:Date;
  return:Date
  //currentImage:CarImage

  ngOnInit(): void {
        this.activatedRoute.params.subscribe(params=>{
        this.getCarDetailByCarId(params["carId"]),
        this.getCarImageByCarId(params["carId"])
        this.IsRentable(params["carId"]);
      })

  }
  getCarDetailByCarId(carId:number){
     this.carDetailWithImageService.getCarDetailByCarId(carId).subscribe(response=>{
       this.carDetails=response.data;
       this.message=response.message
       this.dataLoaded=true;

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

IsRentable(carId:number){
     let myRental:Rental={
        carId:carId,
        rentDate:this.rent,
       returnDate:this.return
     }
     this.rentalService.IsRentable(myRental).subscribe((response)=>{
        this.rentable=response.success
      })
    }
setAnswer()
{
  if(!this.rentable){
     return this.toastrService.error("seçtiğiniz tarih aralığında araç kirada.");
  }
 else{
   return this.toastrService.success("odeme sayfasına yonlendiriliyorsun");
 }
}




//  isRent(carId: number) {
//    this.rentalService.getRentalByCarId(carId).subscribe(
//     (response) => {
//        // this.rentFlag = response.data.returnDate == null ? true : false;
//        let today = Date();
//        var date1 = new Date(response.data.returnDate.toString());
//        var date2 = new Date(today.toString());
//        var difference = date2.getTime() - date1.getTime();
          
//        if (response.data.returnDate == null || difference < 0){
//         this.rentFlag = true;
//        }
        
//        else{this.rentFlag = false;} 
//       }
//     //,
//     //   (response) => {
//     //     this.rentFlag = false;
//     //   }
//    );
//  }
  
}
