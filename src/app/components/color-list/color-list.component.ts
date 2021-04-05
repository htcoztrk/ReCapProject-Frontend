import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-list',
  templateUrl: './color-list.component.html',
  styleUrls: ['./color-list.component.css']
})
export class ColorListComponent implements OnInit {

  constructor(private colorService:ColorService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private router:Router,
    ) { }

colors:Color[];
dataLoaded=false;

colorUpdateForm:FormGroup;
colorDeleteForm:FormGroup;
selectedColor:Color;

  ngOnInit(): void {
    this.getColors();
  }
getColors(){
  this.colorService.getColors().subscribe((response)=>{
     this.colors=response.data;
     this.dataLoaded=true;
  })
}
setSelectedColorToUpdate(color:Color){
  this.selectedColor=color;
  this.updateCreateForm();
}
setSelectedColorToDelete(color:Color){
  this.selectedColor=color;
  this.deleteCreateForm();
}
updateCreateForm(){
  this.colorUpdateForm=this.formBuilder.group({
    colorId:[this.selectedColor.colorId,Validators.required],
    colorName:[this.selectedColor.colorName,Validators.required]
  })
}
deleteCreateForm(){
  this.colorDeleteForm=this.formBuilder.group({
    colorId:[this.selectedColor.colorId,Validators.required],
    colorName:[this.selectedColor.colorName,Validators.required]
  })
}

updateColor(){
  if(this.colorUpdateForm.valid){
    let colorModel=Object.assign({},this.colorUpdateForm.value)
    console.log(this.colorUpdateForm,"color update formu")
    this.colorService.update(colorModel).subscribe(
      (response)=>{
        this.toastrService.success(response.message,"Success");
       // this.router.navigate(["/colors"])
       setTimeout(() => {
        window.location.reload();
      }, 2000);
      },
      (responseError)=>{
        if(responseError.error.ValidationErrors.length>0){
          for (let i = 0; i <responseError.error.ValidationErrors.length; i++) {
            this.toastrService.error(
              responseError.error.ValidationErrors[i].ErrorMessage,
              "Authendication Problem"
            )     
          }
        }
      })
  }
  else{
    this.toastrService.warning("Color Name can not be null","Update Failed!!")
  }
}
deleteColor(){
  if(this.colorDeleteForm.valid){
    let colorModel=Object.assign({},this.colorDeleteForm.value)
    this.colorService.delete(colorModel).subscribe(
      (response)=>{
        this.toastrService.success(response.message,"Success");
        //this.router.navigate(["/colors"])
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      },
      (responseError)=>{
        if(responseError.error.ValidationErrors.length>0){
          for (let i = 0; i <responseError.error.ValidationErrors.length; i++) {
            this.toastrService.error(
              responseError.error.ValidationErrors[i].ErrorMessage,
              "Authendication Problem"
            )     
          }
        }
      })
  }
  else{
    this.toastrService.warning("Color Name can not be null","Update Failed!!")
  }
}
}
