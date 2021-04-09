import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

loginForm:FormGroup;
customer:Customer;
  constructor(private formBuilder:FormBuilder,
    private authService:AuthService,
    private toastrService:ToastrService,
    private router:Router,
    private customerService:CustomerService,
    private localStorageService:LocalStorageService) { }

  ngOnInit(): void {
    this.createLoginForm();
  }
createLoginForm(){
  this.loginForm=this.formBuilder.group({
    email:["",Validators.required],
    password:["",Validators.required]
  })
}
login(){
  console.log("login e girdi")
  console.log(this.loginForm.value)
  if(this.loginForm.valid){
    let loginModel=Object.assign({},this.loginForm.value)
    this.authService.login(loginModel).subscribe((response)=>{
      this.toastrService.info(response.message)
      localStorage.setItem("token",response.data.token)
      this.getCustomerByEmail(loginModel.email)
      this.router.navigate(["/cars"])
    },(responseError)=>{
      this.toastrService.error(responseError.console.error());
      
    })
  }
  else{
    this.toastrService.warning("form not valid")
  }
}
getCustomerByEmail(email:string){
  this.customerService.getCustomerByEmail(email).subscribe((response)=>{
    this.customer=response.data[0];
    this.localStorageService.setCurrentCustomer(this.customer)
  })
}
}
