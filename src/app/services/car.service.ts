import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarResponseModel } from '../models/carResponseModel';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl="https://localhost:44368/api/cars/getall"
  constructor( private httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<Car>>{
   return this.httpClient
    .get<ListResponseModel<Car>>(this.apiUrl);

 }
}
