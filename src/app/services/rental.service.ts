import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataResponseModel } from '../models/DataResponseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { RentalDetail } from '../models/rentalDetail';
import { ResponseModel } from '../models/responseModel';

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
  getRentalByCarId(carId:number):Observable<DataResponseModel<Rental>>{
    let newPath=this.apiUrl+"rentals/getrentaldetailbycarid?carId="+carId;
    return this.httpClient.get<DataResponseModel<Rental>>(newPath);
  }
  IsRentable(rental:Rental){
    let newPath=this.apiUrl+"rentals/IsRentable";
    return this.httpClient.post<ResponseModel>(newPath,rental);
  }
}
