import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImageResponseModel } from '../models/carImageResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {
  apiUrl="https://localhost:44368/api/carImages/getall";

  constructor(private httpClient:HttpClient) { }

  getCarImage():Observable<CarImageResponseModel>{
      return this.httpClient.
      get<CarImageResponseModel>(this.apiUrl);
  }
}
