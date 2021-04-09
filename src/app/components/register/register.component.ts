import { emitDistinctChangesOnlyDefaultValue } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
registerForm:FormGroup;
  constructor(private authService:AuthService,
    private router:Router,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }
createRegisterForm(){
  this.registerForm=this.formBuilder.group({
    firstName:["",Validators.required],
    lastName:["",Validators.required],
    password:["",Validators.required],
    email:["",Validators.required]
  })
}
register(){
  if(this.registerForm.valid){
    let registerModel=Object.assign({},this.registerForm.value)
    this.authService.register(registerModel).subscribe((response)=>{
      //this.toastrService.info(response.message)
      //localStorage.setItem("token",response.data.token)
      this.router.navigate(["login"])
      this.toastrService.info("you can login")
    },(responseError)=>{
       this.toastrService.error("something went wrong!")
       this.toastrService.error(responseError.error)
    })
  }
  else{
    this.toastrService.warning("form is not valid")
  }
}
}
