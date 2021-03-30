import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/carDetail';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css']
})
export class RentComponent implements OnInit {
  customers:Customer[];
  customerId:number;
  rentDate:Date;
  returnDate:Date;
  dataLoaded=false;
  @Input() car: CarDetail;
  rentable:Boolean;

  minDate:string|any;
  maxDate:string|null;
  maxMinDate:string|null;
  firstDateSelected:boolean=false;

  constructor(
    private customerService:CustomerService,
    private router:Router,
    private toastrService:ToastrService,
    private datePipe:DatePipe,
    private rentalService:RentalService
  ) { }

  ngOnInit(): void {
  }
getCustomer(){
  this.customerService.getCustomers().subscribe((response)=>{
    this.customers=response.data;
    this.dataLoaded=true;
  });
}

//  IsRentable(rentD:Date,returnD:Date){
//    let myRental:Rental={
//      carId:this.car.carId,
//      rentDate:rentD,
//      returnDate:returnD
//    }
//    this.rentalService.IsRentable(myRental).subscribe((response)=>{
//      this.rentable=response.success
//    })
//  }
}
