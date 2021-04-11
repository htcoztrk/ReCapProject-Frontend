import { Byte } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css']
})
export class ProfileUpdateComponent implements OnInit {
  profileUpdateForm: FormGroup;
  user: User;
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: Byte[];
  passwordSalt: Byte[];
  status: boolean;
  constructor(
    private activatedRoute:ActivatedRoute,
    private userService:UserService,
    private router:Router,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private localStorageService:LocalStorageService

  ) { }

  ngOnInit(): void {
    this.createUpdateForm();
    this.activatedRoute.params.subscribe((params)=>{
      if(params['userId']){
         this.getUserById(params['userId']);
      }
    })
  }
  createUpdateForm(){
    this.profileUpdateForm=this.formBuilder.group({
      id:[this.id,Validators.required],
      firstName:[this.firstName,Validators.required],
      lastName:[this.lastName,Validators.required],
      email:[this.email,Validators.required],
      passwordHash:[this.passwordHash,Validators.required],
      passwordSalt:[this.passwordSalt,Validators.required],
      status:[this.status,Validators.required]
    });
  }
  getUserById(userId: number) {
    this.userService.getByUserId(userId).subscribe((response) => {
      this.user = response.data;
      this.id = this.user.id;
      this.firstName = this.user.firstName;
      this.lastName = this.user.lastName;
      this.email = this.user.email;
      this.passwordHash = this.user.passwordHash;
      this.passwordSalt = this.user.passwordSalt;
      this.status = this.user.status;
      this.createUpdateForm();
    });
  }

 update(){
   console.log(this.profileUpdateForm)
   if(this.profileUpdateForm.valid){
      let userModel=Object.assign({},this.profileUpdateForm.value)
      this.userService.update(userModel).subscribe((response)=>{
        this.toastrService.success(response.message,"Success");
      }); 
      this.localStorageService.remove("token")
    this.localStorageService.remove("customer")
    this.router.navigate(["/login"])
    }
   else{
     this.toastrService.warning("form is not valid")
   }
 }
}
