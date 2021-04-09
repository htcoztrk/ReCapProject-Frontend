import { Injectable } from '@angular/core';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
localStorage:Storage;
  constructor() { 
    this.localStorage=window.localStorage;
  }
get(key:string){
  return this.localStorage.getItem(key);
}
set(key:string,value:string){
  return this.localStorage.setItem(key,value)
}
remove(key:string){
  this.localStorage.removeItem(key);
}
clean(){
  this.localStorage.clear();
}
setCurrentCustomer(customer:Customer){
  localStorage.setItem("customer",JSON.stringify(customer))
}
getCurrentCustomer():Customer{
   return JSON.parse(localStorage.getItem("customer"))
}

checkExistsOrNot(value:string):boolean{
  if(localStorage.getItem(value)!==null&&localStorage.getItem(value)!==undefined){
    return true;
  }
  else{
    return false;
  }
}

}
