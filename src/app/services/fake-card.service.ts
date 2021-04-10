import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FakeCard } from '../models/fakeCard';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class FakeCardService {

  constructor(
    private httpClient:HttpClient,
  ) { }

  apiUrl = 'https://localhost:44368/api/';

  isCardExist(fakeCard:FakeCard):Observable<ResponseModel>{
    let newPath = this.apiUrl + "fakecards/iscardexist";
    console.log(fakeCard);
    return this.httpClient.post<ResponseModel>(newPath,fakeCard);
  }

  getCardByNumber(cardNumber:string):Observable<ListResponseModel<FakeCard>>{
    let newPath = this.apiUrl + "fakecards/getbycardnumber?cardnumber=" + cardNumber;
    return this.httpClient.get<ListResponseModel<FakeCard>>(newPath);
  }
  getByCustomerId(customerId:number):Observable<ListResponseModel<FakeCard>>{
    let newPath = this.apiUrl + "fakecards/getbycustomerid?customerId=" + customerId;
    return this.httpClient.get<ListResponseModel<FakeCard>>(newPath);
  }
  updateCard(fakeCard:FakeCard):Observable<ResponseModel>{
    let newPath = this.apiUrl + "fakecards/update";
    return this.httpClient.post<ResponseModel>(newPath,fakeCard)
  }
  addCard(fakeCard:FakeCard):Observable<ResponseModel>{
    let newPath = this.apiUrl + "fakecards/add";
    return this.httpClient.post<ResponseModel>(newPath,fakeCard)
  }
}