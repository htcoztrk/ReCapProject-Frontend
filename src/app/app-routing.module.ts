import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailWithImageComponent } from './components/car-detail-with-image/car-detail-with-image.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';

const routes: Routes = [
  {path:"",pathMatch:"full",component:CarDetailComponent},
  {path:"cars",component:CarDetailComponent},

  {path:"cars/brand",component:CarDetailComponent},
  {path:"cars/brand/:brandId",component:CarDetailComponent},

  {path:"cars/color",component:CarDetailComponent},
  {path:"cars/color/:colorId",component:CarDetailComponent},
  
  {path:"cars/details/:carId",component:CarDetailWithImageComponent},
  {path:"cars/filter/:brandId/:colorId", component:CarDetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
