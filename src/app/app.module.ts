import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarComponent } from './components/car/car.component';
import { BrandComponent } from './components/brand/brand.component';
import { CarimageComponent } from './components/carImage/carimage.component';
import { NaviComponent } from './components/navi/navi.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';
import { ColorComponent } from './components/color/color.component';
import { RentalDetailComponent } from './components/rental-detail/rental-detail.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarDetailWithImageComponent } from './components/car-detail-with-image/car-detail-with-image.component';
import { FilterBrandPipePipe } from './pipes/filter-brand-pipe.pipe';
import { FilterColorPipePipe } from './pipes/filter-color-pipe.pipe';
import { CarFilterComponent } from './components/car-filter/car-filter.component';

import {ToastrModule} from "ngx-toastr";
import { RentComponent } from './components/rent/rent.component';


@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    BrandComponent,
    CarimageComponent,
    NaviComponent,
    CustomerComponent,
    RentalComponent,
    ColorComponent,
    RentalDetailComponent,
    CarDetailComponent,
    CarDetailWithImageComponent,
    FilterBrandPipePipe,
    FilterColorPipePipe,
    CarFilterComponent,
    RentComponent
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
