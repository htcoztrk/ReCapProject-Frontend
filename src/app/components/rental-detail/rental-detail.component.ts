import { Component, OnInit } from '@angular/core';
import { RentalDetail } from 'src/app/models/rentalDetail';
import { RentalDetailService } from 'src/app/services/rental-detail.service';

@Component({
  selector: 'app-rental-detail',
  templateUrl: './rental-detail.component.html',
  styleUrls: ['./rental-detail.component.css']
})
export class RentalDetailComponent implements OnInit {
  dataLoaded=false;
  rentalDetail:RentalDetail[]=[]
  constructor(private rentalDetailService:RentalDetailService) { }

  ngOnInit(): void {
     this.getRentalDetails(); 
  }
   getRentalDetails(){
      this.rentalDetailService.getRentalDetails().subscribe(response=>{
        this.rentalDetail=response.data
        this.dataLoaded=true;
      })
   }
}
