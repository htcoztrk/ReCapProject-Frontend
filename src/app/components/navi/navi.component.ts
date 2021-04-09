import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
currentCustomer:Customer;
  constructor(private localStoragrService:LocalStorageService,
    private authService:AuthService,
    private router:Router) { }

  ngOnInit(): void {
    this.localStoragrService.get("token")
    this.getCurrentCustomer();
  }
  isAuth():boolean{
    return this.authService.isAuthendicated();
  }
  getCurrentCustomer(){
    this.currentCustomer=this.localStoragrService.getCurrentCustomer();
    return this.currentCustomer;
  }
  logout(){
    this.localStoragrService.remove("token")
    this.localStoragrService.remove("customer")
    this.router.navigate(["/login"])
  }
}
