import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {
   colors:Color[]=[];
   dataLoaded=false;
   currentColor:Color;
   nullColor:Color;
   filterText="";
  constructor(private colorService:ColorService) { }

  ngOnInit(): void {
    this.getColors();
  }
   getColors(){
       this.colorService.getColors().subscribe(response=>{
         this.colors=response.data;
         this.dataLoaded=true;
       })
   }
   setCurrentColor(color:Color){
     this.currentColor=color;
   }
   getCurrentColorClass(color:Color){
      if(color==this.currentColor){
        return "list-group-item list-group-item-primary"
      }
      else{
        return "list-group-item"
      }
   }
   getAllColorsClass(){
     if(!this.currentColor){
        return "list-group-item list-group-item-primary"
     }
     else{
       return "list-group-item "
     }
   }
   currentResetter(nullColor:Color){
      this.currentColor=nullColor;
   }
}
