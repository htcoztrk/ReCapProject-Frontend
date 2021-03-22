import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl="https://localhost:44368/api/"
  constructor( private httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl+"cars/getall"
   return this.httpClient
    .get<ListResponseModel<Car>>(newPath);

 }
 getCarsByBrand(brandId:number):Observable<ListResponseModel<Car>>{
  let newPath=this.apiUrl+"cars/getbybrandid?id="+brandId
   return this.httpClient
   .get<ListResponseModel<Car>>(newPath);
 }
 getCarsByColor(colorId:number):Observable<ListResponseModel<Car>>{
  let newPath=this.apiUrl+"cars/getbycolorid?id="+colorId
   return this.httpClient
   .get<ListResponseModel<Car>>(newPath);
 }
 getCarDetailByCarId(carId:number):Observable<ListResponseModel<Car>>{
  let newPath=this.apiUrl+"cars/getcardetailbycarid?id="+carId
  return this.httpClient
  .get<ListResponseModel<Car>>(newPath);
 }
}
