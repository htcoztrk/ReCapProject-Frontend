import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { asyncScheduler } from 'rxjs';
import { BankCard } from 'src/app/models/bankCard';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { Customer } from 'src/app/models/customer';
import { FakeCard } from 'src/app/models/fakeCard';
import { Rental } from 'src/app/models/rental';
import { BankCardService } from 'src/app/services/bank-card.service';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { FakeCardService } from 'src/app/services/fake-card.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
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
  customerId: number;
  amountOfPayment: number = 0;
  cardExist: Boolean = false;
  cardForm:FormGroup;

  cards:FakeCard[];
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
    private fakeCardService: FakeCardService,
    private bankCardService: BankCardService,
    private localStorageService:LocalStorageService
  ) {}

  ngOnInit(): void {
    
    this.activateRoute.params.subscribe((params) => {
      if (params['rental']) {
        this.rental = JSON.parse(params['rental']);
        //this.getCustomerId = JSON.parse(params['rental']).customerId;
        //this.getCustomerDetailById(this.getCustomerId);
        this.getCarDetail();
        this.getCardsByCustomerId();
      }
    });
    
    this.createCardForm();
  }
getCardsByCustomerId(){
  console.log(this.rental.customerId,"gelen musteri id si")
  this.customerId=this.rental.customerId
this.fakeCardService.getByCustomerId(this.customerId)
.subscribe((response)=>{
  this.cards=response.data
  console.log(this.cards,"gelen CARD Bilgileri")
})
}

onSaveUsernameChanged(value:boolean){
  this.saveUsername=value;
}

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
 if(this.selectedCard){
  this.cardForm=this.fromBuilder.group({
    nameOnTheCard:[this.selectedCard.nameOnTheCard,Validators.required],
    cardNumber:[this.selectedCard.cardNumber,Validators.required],
    expirationDate:[this.selectedCard.expirationDate,Validators.required],
    cardCvv:[this.selectedCard.cardCvv,Validators.required],
    cardId:[this.selectedCard.cardId,Validators.required],
    customerId:[this.selectedCard.customerId,Validators.required]
  })
 }
 else{
  this.cardForm=this.fromBuilder.group({
    nameOnTheCard:["",Validators.required],
    cardNumber:["",Validators.required],
    expirationDate:["",Validators.required],
    cardCvv:["",Validators.required],
    
  })
 }
}
setCurrentCard(cardNumber:string){
  this.fakeCardService.getCardByNumber(cardNumber).subscribe((response)=>{
    this.selectedCard=response.data[0];
    this.createCardForm();
    console.log(this.selectedCard)
  })
}

cardAdd(bankCard:BankCard){
   let cardModel:FakeCard={
      nameOnTheCard:bankCard.nameOnTheCard,
      cardCvv:bankCard.cardCvv,
      cardNumber:bankCard.cardNumber,
      expirationDate:bankCard.expirationDate,
      cardId:bankCard.cardId,
      moneyInTheCard:bankCard.moneyInTheCard,
      customerId:this.customerId
   }
   this.fakeCardService.addCard(cardModel).subscribe((response)=>{
     this.toastrService.success("Card added",response.message)
   },(errorResponse)=>{
     this.toastrService.error("card add operation failed")
   })
}


  async rentACar() {
   if(this.selectedCard){
    if(this.cardForm.valid){
      let fakeCard=Object.assign({},this.cardForm.value)
      let card = await this.getFakeCardByCardNumber(fakeCard.cardNumber);
      let bankCard = await this.getBankCardByCardNumber(fakeCard.cardNumber);
      if (card.moneyInTheCard >= this.amountOfPayment) {
        card.moneyInTheCard =
        card.moneyInTheCard - this.amountOfPayment;
        bankCard.data.moneyInTheCard =
        bankCard.data.moneyInTheCard - this.amountOfPayment; 
        this.rentalService.addRental(this.rental).subscribe((response)=>{
          this.updateFakeCard(card).subscribe((response)=>{
            if(response.success){
              this.toastrService.info(" tl kartınızdan cekildi",this.amountOfPayment.toString())
            }
          });
          this.updateBankCard(bankCard.data).subscribe((response)=>{
            if(response.success){
              this.toastrService.info(" BankCard updated",this.amountOfPayment.toString())
            }
          });
          
          this.toastrService.success('Arabayı kiraladınız', 'Işlem başarılı');
        },
        (responseError)=>{
          this.toastrService.error(responseError.error.Message,"Renting Failed");
        });
        
      } else {
        this.toastrService.error(
          'Kartınızda yeterli para bulunmamaktadır',
          'Hata'
        );
      }
     }
   }
   else{
    if(this.cardForm.valid){
      let bankCard=Object.assign({},this.cardForm.value)
      this.cardExist = await this.isBankCardExist(bankCard);
    if (this.cardExist) {
      let card = await this.getBankCardByCardNumber(bankCard.cardNumber);
     
      if (card.data.moneyInTheCard >= this.amountOfPayment) {
        card.data.moneyInTheCard =
        card.data.moneyInTheCard - this.amountOfPayment; 
        this.rentalService.addRental(this.rental).subscribe((response)=>{
          if(this.saveUsername){this.cardAdd(card.data)}
          this.updateBankCard(card.data).subscribe((response)=>{
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
  else{
    this.toastrService.warning("form is not valid")
  }
   }
   
  }

  async isBankCardExist(bankCard: BankCard) {
    return (await this.bankCardService.isCardExist(bankCard).toPromise())
      .success;
  }
  async getFakeCardByCardNumber(cardNumber: string) {
    return (await this.fakeCardService.getCardByNumber(cardNumber).toPromise())
      .data[0];
  }
  async getBankCardByCardNumber(cardNumber: string) {
    return (await this.bankCardService.getCardByNumber(cardNumber).toPromise())
  }
   updateFakeCard(fakeCard: FakeCard) {
    return (this.fakeCardService.updateCard(fakeCard))
  }
  updateBankCard(bankCard: BankCard) {
    return (this.bankCardService.updateCard(bankCard))
  }
}