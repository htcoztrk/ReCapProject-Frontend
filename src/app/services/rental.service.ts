import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { RentalDetail } from '../models/rentalDetail';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl="https://localhost:44368/api/";

  constructor(private httpClient:HttpClient) { }
  getRentals():Observable<ListResponseModel<Rental>>{
    let newPath=this.apiUrl+"rentals/getall"
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }
  getRentalDetails():Observable<ListResponseModel<RentalDetail>>{
    let newPath=this.apiUrl+"rentals/getrentaldetail"
    return this.httpClient.get<ListResponseModel<RentalDetail>>(newPath);
  }
  getRentalByCarId(carId:number):Observable<SingleResponseModel<Rental>>{
    let newPath=this.apiUrl+"rentals/getrentaldetailbycarid?carId="+carId;
    return this.httpClient.get<SingleResponseModel<Rental>>(newPath);
  }
   getRentalByCustomerId(customerId:number):Observable<ListResponseModel<RentalDetail>>{
    let newPath=this.apiUrl+"rentals/getbycustomerid?customerId="+customerId;
    return this.httpClient.get<ListResponseModel<RentalDetail>>(newPath);
  }
  addRental(rental:Rental):Observable<ResponseModel>{
     let newPath=this.apiUrl+"rentals/add";
     return this.httpClient.post<ResponseModel>(newPath,rental);
  }
  IsRentable(rental:Rental):Observable<ResponseModel>{
    let newPath=this.apiUrl+"rentals/IsRentable";
    return this.httpClient.post<ResponseModel>(newPath,rental);
  }
  checkFindeksScore(rental:Rental):Observable<ResponseModel>{
    let newPath=this.apiUrl+"rentals/checkfindeksscore";
    return this.httpClient.post<ResponseModel>(newPath,rental)
  }
}
