import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {

  brandAddForm:FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private brandService:BrandService,
    private toastrService:ToastrService,
    private router:Router
    ) { }


  ngOnInit(): void {
    this.createBrandAddForm();
  }
  createBrandAddForm(){
    this.brandAddForm=this.formBuilder.group({
      brandName:["",Validators.required]
    })
  }
  add(){
    if(this.brandAddForm.valid){
      let brandModel=Object.assign({},this.brandAddForm.value);
      this.brandService.add(brandModel).subscribe(
        (response)=>{
          this.toastrService.success(response.message,"success")
          this.router.navigate(["/brands"])
        },
        (responseError)=>{
          if(responseError.erros.ValidationErrors.length>0){
            for (let i = 0; i < responseError.erros.ValidationErrors.length; i++) {
              this.toastrService.error(
                responseError.error.ValidationErrors[i].ErrorMessage,"Authendication Problem"
              )
              
            }
          }
        })
    }
    else{
      this.toastrService.error("Attendiom","Form is not full")
    }
  }
}
