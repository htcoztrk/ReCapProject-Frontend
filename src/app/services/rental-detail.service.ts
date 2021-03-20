import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { RentalDetail } from '../models/rentalDetail';
import { RentalDetailResponseModel } from '../models/rentalDetailResponseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalDetailService {

  apiUrl="https://localhost:44368/api/rentals/getrentaldetail";
  constructor(private httpClient:HttpClient) { }
  getRentalDetails():Observable<ListResponseModel<RentalDetail>{
    return this.httpClient.get<ListResponseModel<RentalDetail>>(this.apiUrl)
  }
}
