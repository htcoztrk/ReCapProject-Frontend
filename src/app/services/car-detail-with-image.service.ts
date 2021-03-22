import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDetail } from '../models/carDetail';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarDetailWithImageService {
  apiUrl="https://localhost:44368/api/cars/getcardetailbycarid?carId=";
  constructor(private httpClient:HttpClient) { }
  getCarDetailByCarId(carId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath=this.apiUrl+carId
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
}
