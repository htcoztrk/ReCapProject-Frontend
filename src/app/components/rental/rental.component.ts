import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Rental } from 'src/app/models/rental';
import { RentalDetail } from 'src/app/models/rentalDetail';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {
  rentals:RentalDetail[];
  dataLoaded=false;
  constructor(private rentalService:RentalService,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
   this.activatedRoute.params.subscribe((params)=>{
     if(params["customerId"]){
      this.getByCustomerId(params["customerId"])
     }
     else{
       this.getRentals()
     }
   })
  }
  getRentals(){
    this.rentalService.getRentalDetails().subscribe(response=>{
      this.rentals=response.data;
      this.dataLoaded=true;
    })
  }
  getByCustomerId(customerId:number){
    this.rentalService.getRentalByCustomerId(customerId).subscribe((response)=>{
      this.rentals=response.data;
      this.dataLoaded=true;
    })
  }
}
