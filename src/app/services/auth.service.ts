import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl="https://localhost:44368/api/";
  constructor(private httpClient:HttpClient) { }

  login(loginModel:LoginModel):Observable<SingleResponseModel<TokenModel>>{
   let newPath=this.apiUrl+"auth/login";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,loginModel)
  }
  register(registerModel:RegisterModel):Observable<SingleResponseModel<TokenModel>>{
    let newPath=this.apiUrl+"auth/register";
     return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,registerModel)
   }
  isAuthendicated(){
    if(localStorage.getItem("token")){
      return true;
    }
    else{
      return false;
    }
  }
}
