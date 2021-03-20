import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from '../models/carImage';
import { CarImageResponseModel } from '../models/carImageResponseModel';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {
  apiUrl="https://localhost:44368/api/carImages/getall";

  constructor(private httpClient:HttpClient) { }

  getCarImage():Observable<ListResponseModel<CarImage>>{
      return this.httpClient.
      get<ListResponseModel<CarImage>>(this.apiUrl);
  }
}
