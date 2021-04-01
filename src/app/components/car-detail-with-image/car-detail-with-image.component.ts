import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private rentalService:RentalService,
    private router:Router) { }
  carDetails:CarDetail[]=[];
  carImages:CarImage[]=[];
  //rental:Rental[];
  dataLoaded=false;
  rentMessage:string;
  message:string;
  currentImage:CarImage;
  rentable:Boolean;
  rent:Date;
  return:Date;
  //currentImage:CarImage
  myRental:Rental
customerId=1;
  ngOnInit(): void {
        this.activatedRoute.params.subscribe(params=>{
        this.getCarDetailByCarId(params["carId"]),
        this.getCarImageByCarId(params["carId"])
        //this.IsRentable(params["carId"]);
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
/*addRental(carId:number){
  let myRental:Rental={
    carId:carId,
    customerId:1,
    rentDate:this.rent,
   returnDate:this.return
 }
 this.rentalService.addRental(myRental).subscribe((response)=>{
   this.rentable=response.success;
   this.rentMessage=response.message;
   console.log(this.rent);
   console.log(this.rent);
 })
}*/
 async IsRentable(carId:number){
      this.myRental={
         carId:carId,
         customerId:this.customerId,
         rentDate:this.rent,
        returnDate:this.return
     }
      this.rentalService.IsRentable(this.myRental).subscribe( (response)=>{
          //this.rentable=response.success;
         // this.rentMessage=response.message;
          this.toastrService.info("Ödeme sayfasına yönlendiriliyorsunuz...","Ödeme İşlemleri");
          this.router.navigate(['/payment/',JSON.stringify(this.myRental)]);
       },(error)=>{
        this.toastrService.error("seçtiğiniz tarih aralığında araç kirada.");
       })
       
     }


/* setAnswer()
{
  if(this.rentable){
    
    this.toastrService.info("Ödeme sayfasına yönlendiriliyorsunuz...","Ödeme İşlemleri");
      this.router.navigate(['/payment/',JSON.stringify(this.myRental)]);
   
  }
 else{
  this.toastrService.error("seçtiğiniz tarih aralığında araç kirada.");
    
 }
}*/




  
}
