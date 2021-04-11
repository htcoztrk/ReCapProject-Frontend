import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl="https://localhost:44368/api/";
  constructor(private httpClient:HttpClient) { }
  getByUserId(userId:number):Observable<SingleResponseModel<User>>{
   let newPath=this.apiUrl+"users/getbyid?id="+userId
   return this.httpClient.get<SingleResponseModel<User>>(newPath)
  }
  add(user:User):Observable<ResponseModel>{
    let newPath=this.apiUrl+"users/add";
    return this.httpClient.post<ResponseModel>(newPath,user);
  }
  update(user:User):Observable<ResponseModel>{
    let newPath=this.apiUrl+"users/update";
    return this.httpClient.post<ResponseModel>(newPath,user);
  }
}
