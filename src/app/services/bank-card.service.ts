import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BankCard } from '../models/bankCard';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BankCardService {

  constructor(
    private httpClient:HttpClient,
  ) { }

  apiUrl = 'https://localhost:44368/api/';

  isCardExist(bankCard:BankCard):Observable<ResponseModel>{
    let newPath = this.apiUrl + "bankcards/iscardexist";
    console.log(bankCard);
    return this.httpClient.post<ResponseModel>(newPath,bankCard);
  }

  getCardByNumber(cardNumber:string):Observable<SingleResponseModel<BankCard>>{
    let newPath = this.apiUrl + "bankcards/getbycardnumber?cardnumber=" + cardNumber;
    return this.httpClient.get<SingleResponseModel<BankCard>>(newPath);
  }

  updateCard(bankCard:BankCard):Observable<ResponseModel>{
    let newPath = this.apiUrl + "bankcards/update";
    return this.httpClient.post<ResponseModel>(newPath,bankCard)
  }
}
