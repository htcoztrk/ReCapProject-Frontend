import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { RentalDetail } from 'src/app/models/rentalDetail';
import { ResponseModel } from 'src/app/models/responseModel';
import { CarDetailWithImageService } from 'src/app/services/car-detail-with-image.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
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
    private router:Router,
    private localStoragrService:LocalStorageService) { }
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
  myRental:Rental;
  currentCustomer:Customer;
  customerId:number
  ngOnInit(): void {
        this.activatedRoute.params.subscribe(params=>{
        this.getCarDetailByCarId(params["carId"]),
        this.getCarImageByCarId(params["carId"])
        //this.checkFindeks(params["carId"]),
        //this.IsRentable(params["carId"]);
      })
       this.getCurrentCustomer();
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
getCurrentCustomer(){
  this.currentCustomer= this.localStoragrService.getCurrentCustomer()
  this.customerId=this.currentCustomer.customerId
  console.log(this.customerId,"car detail with deki customerrrr");
}
 async IsRentable(carId:number){
      this.myRental={
         carId:carId,
         customerId:this.currentCustomer.customerId,
         rentDate:this.rent,
        returnDate:this.return
     }
      this.rentalService.IsRentable(this.myRental).subscribe( (response)=>{
         this.rentalService.checkFindeksScore(this.myRental).subscribe((findeksResponse)=>{
          this.toastrService.info("Ödeme sayfasına yönlendiriliyorsunuz...","Ödeme İşlemleri");
          this.router.navigate(['/payment/',JSON.stringify(this.myRental)]);
         },(findeksError)=>{
            this.toastrService.error("findeks puanınız araba kiralamak için yeterli değil.")
         })
          
       },(error)=>{
        this.toastrService.error("seçtiğiniz tarih aralığında araç kirada.");
       })
       
     }
   





  
}
