import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { asyncScheduler } from 'rxjs';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { Customer } from 'src/app/models/customer';
import { FakeCard } from 'src/app/models/fakeCard';
import { Rental } from 'src/app/models/rental';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { FakeCardService } from 'src/app/services/fake-card.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  rental: Rental;
  cars: CarDetail;
  customer: Customer;
  getCustomerId: number;
  amountOfPayment: number = 0;
 // nameOnTheCard: string;
  //cardNumber: string;
  //cardCvv: string;
  //expirationDate: string;
  //fakeCard: FakeCard;
  cardExist: Boolean = false;
  cardForm:FormGroup;

  saveUsername:boolean;
  selectedCard:FakeCard;
  constructor(
    private activateRoute: ActivatedRoute,
    private carService: CarDetailService,
    private customerService: CustomerService,
    private router: Router,
    private fromBuilder:FormBuilder,
    private toastrService: ToastrService,
    private rentalService: RentalService,
    private fakeCardService: FakeCardService
  ) {}

  ngOnInit(): void {
    this.createCardForm();
    this.activateRoute.params.subscribe((params) => {
      if (params['rental']) {
        this.rental = JSON.parse(params['rental']);
        this.getCustomerId = JSON.parse(params['rental']).customerId;
        //this.getCustomerDetailById(this.getCustomerId);
        this.getCarDetail();
      }
    });
  }

  /*getCustomerDetailById(customerId: number) {
    this.customerService.getCustomerById(customerId).subscribe((response) => {
      this.customer = response.data[0];
      console.log(response);
    });
  }*/

/*onSaveUsernameChanged(value:boolean){
  this.saveUsername=value;
}*/

  getCarDetail() {
    this.carService
      .getCarDetailByCarId(this.rental.carId)
      .subscribe((response) => {
        this.cars = response.data[0];
        console.log(response);
        this.paymentCalculator();
      });
  }

  paymentCalculator() {
    if (this.rental.returnDate != null) {
      var date1 = new Date(this.rental.returnDate.toString());
      var date2 = new Date(this.rental.rentDate.toString());
      var difference = date1.getTime() - date2.getTime();

      //zamanFark değişkeni ile elde edilen saati güne çevirmek için aşağıdaki yöntem kullanılabilir.
      var numberOfDays = Math.ceil(difference / (1000 * 3600 * 24));

      this.amountOfPayment = numberOfDays * this.cars.dailyPrice;
      if (this.amountOfPayment <= 0) {
        this.router.navigate(['/cars']);
        this.toastrService.error(
          'Araç listesine yönlendiriliyorsunuz',
          'Hatalı işlem'
        );
      }
    }
  }
createCardForm(){
 
  
    this.cardForm=this.fromBuilder.group({
      nameOnTheCard:["",Validators.required],
      cardNumber:["",Validators.required],
      expirationDate:["",Validators.required],
      cardCvv:["",Validators.required],
      cardId:2,
      customerId:1
    })

  

}
/*cardAdd(){
  if(this.cardForm.valid){
   let cardModel=Object.assign("",this.cardForm.value)
   this.fakeCardService.addCard(cardModel).subscribe((response)=>{
     this.toastrService.success("Card added",response.message)
   },(errorResponse)=>{
     this.toastrService.error("card add operation failed")
   })
  }
  else{
    this.toastrService.warning("card form is not valid")
  }
}*/



  async rentACar() {
    // let fakeCard: FakeCard = {
    //   nameOnTheCard: this.nameOnTheCard,
    //   cardNumber: this.cardNumber,
    //   expirationDate: this.expirationDate,
    //   cardCvv: this.cardCvv,
    //   cardId:2,
    //   customerId:1
    // };
    if(this.cardForm.valid){
      let fakeCard=Object.assign({},this.cardForm.value)
      this.cardExist = await this.isCardExist(fakeCard);
    if (this.cardExist) {
      let card = await this.getFakeCardByCardNumber(fakeCard.cardNumber);
     
      if (card.moneyInTheCard >= this.amountOfPayment) {
        fakeCard.moneyInTheCard =
        card.moneyInTheCard - this.amountOfPayment; 
        this.rentalService.addRental(this.rental).subscribe((response)=>{
          this.updateCard(fakeCard).subscribe((response)=>{
            if(response.success){
              this.toastrService.info(" tl kartınızdan cekildi",this.amountOfPayment.toString())
            }
          });
          this.toastrService.success('Arabayı kiraladınız', 'Işlem başarılı');
        },
        (responseError)=>{
          this.toastrService.error(responseError.error.Message,"hata buymusss");
          if(responseError.error.ValidationErrors.length>0){
            for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
              this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,"hata buymusss");
              
            }
          }
         
            
          
        });
        
      } else {
        this.toastrService.error(
          'Kartınızda yeterli para bulunmamaktadır',
          'Hata'
        );
      }
    } else {
      this.toastrService.error('Bankanız bilgilerinizi onaylamadı', 'Hata');
    }


  }
  }

  async isCardExist(fakeCard: FakeCard) {
    return (await this.fakeCardService.isCardExist(fakeCard).toPromise())
      .success;
  }

  async getFakeCardByCardNumber(cardNumber: string) {
    return (await this.fakeCardService.getCardByNumber(cardNumber).toPromise())
      .data[0];
  }

   updateCard(fakeCard: FakeCard) {
    return (this.fakeCardService.updateCard(fakeCard))
  }
}