import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandListComponent } from './components/brand-list/brand-list.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailWithImageComponent } from './components/car-detail-with-image/car-detail-with-image.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorListComponent } from './components/color-list/color-list.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:"",pathMatch:"full",component:CarDetailComponent},
  {path:"cars",component:CarDetailComponent},

  {path:"cars/brand",component:CarDetailComponent},
  {path:"cars/brand/:brandId",component:CarDetailComponent},

  {path:"cars/color",component:CarDetailComponent},
  {path:"cars/color/:colorId",component:CarDetailComponent},
  
  {path:"cars/details/:carId",component:CarDetailWithImageComponent},
  {path:"cars/filter/:brandId/:colorId", component:CarDetailComponent},

  {path:"rentals/car", component:CarDetailComponent},
  {path:"payment/:rental", component:PaymentComponent},

  {path:"brands", component:BrandListComponent},
  {path:"colors", component:ColorListComponent},
  
  {path:"brands/add", component:BrandAddComponent},
  {path:"colors/add", component:ColorAddComponent},
  {path:"cars/add", component:CarAddComponent,canActivate:[LoginGuard]},

  {path:"login", component:LoginComponent},
  {path:"register", component:RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
