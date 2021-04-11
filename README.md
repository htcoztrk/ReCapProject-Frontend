# ReCapProFrontend

This project is the Frontend part of the [(Rent A Car)](https://github.com/htcoztrk/ReCapProject/tree/master/ReCapProject) project that I have created to rent a car online.
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.3.

## Table of Contents
<ul>
  <li ><a href="#register">Register</a></li>
  <li href=""><a href="#login">Login</a> </li>
  <li ><a href="#carlist">Car List</a></li>
  <li ><a href="#carfilter">Filter Car</a></li>
  <li ><a href="#cardetail">Car Detail</a></li>
  <li ><a href="#rentacar">Rent A Car</a></li>
  <li ><a href="#payment">Payment</a></li>
  <li ><a href="#brand">Brands</a> </li>
  <li ><a href="#color">Colors</a> </li>
  <li ><a href="#profile">Profile</a></li>
 </ul>




## Usage
<p id="register"></p>

Register:
Kullanıcı sisteme kayıtlı değil ise, kayıt olarak Login sayfasına yönlendirilir:
![alt text](src/assets/images/Capture.PNG "Logo Title Text 1")

<p id="login"></p>

Login Page: 
Kullanıcı bilgilerini girdikten sonra token oluşturulur ve sisteme giriş yapar.
![alt text](src/assets/images/Capture2.PNG "Logo Title Text 1")

<p id="carlist"></p> 

Cars: Anasayfada araba listesi bulunmaktadır. 
![alt text](src/assets/images/accesstoken.PNG "Logo Title Text 1")

<p id="filter"></p>

Filter: Kullanıcı renk ve marka seçerek arabaları filtreleyebilir.
![alt text](src/assets/images/filter.PNG "Logo Title Text 1")

<p id="cardetail"></p>

Car Detail: Kullanıcı araba detayına tıklayarak arabaya ait detay sayfasını görüntüleyebilir.
![alt text](src/assets/images/cardetail.PNG "Logo Title Text 1")


Car Add: Araba ekleme için sisteme giriş yapan kullanıcı araba ekleme yetkisine sahip ise araba ekleyebilir. 
![alt text](src/assets/images/addcar.PNG "Logo Title Text 1")

<p id="rentacar"></p>

Rent Car: Kullanıcı, detaylarını görüntülediği arabayı,findeks puanı yeterli olduğu durumda tarihleri belirleyerek arabayı kiralayabilir. Aynı zamanda seçtiği tarih aralığında arabanın kirada olmaması kontrol edilir. Araba kiralanabilir durumdaysa, kullanıcı ödeme sayfasına yönlendirilir. 
![alt text](src/assets/images/rent1.PNG "Logo Title Text 1")
![alt text](src/assets/images/rent2.PNG "Logo Title Text 1")
![alt text](src/assets/images/rent5.PNG "Logo Title Text 1")
![alt text](src/assets/images/rent3.PNG "Logo Title Text 1")

<p id="payment"></p>

Payment:
Ödeme sayfasında işlem özeti bulunur ve ödeme tamamlanması için kart bilgileri girilir. Kullanıcıya Kart bilgileri kaydetme seçeneği sunularak bir sonraki ödemelerde kayıtlı kartları görüntülenir.
![alt text](src/assets/images/rent6.PNG "Logo Title Text 1")
![alt text](src/assets/images/rent4.PNG "Logo Title Text 1")

<p id="brand"></p>

Brand: Markalar listelenebilir, marka ekleme, silme ve güncelleme işlemleri yapılabilir.
![alt text](src/assets/images/brands.PNG "Logo Title Text 1")
![alt text](src/assets/images/BRANDADD2.PNG "Logo Title Text 1")
![alt text](src/assets/images/branddelete.PNG "Logo Title Text1")

<p id="color"></p>

Color: Renkler listelenebilir, renk ekleme, silme ve güncelleme işlemleri yapılabilir.
![alt text](src/assets/images/COLORLİST.PNG "Logo Title Text 1")
![alt text](src/assets/images/color1.PNG "Logo Title Text 1")

<p id="profile"></p>

Profile:Kullanıcı profiline girerek bilgilerini güncelleyebilir. Aynı zamanda MyRental kısmından kiraladığı araç bilgilerini görüntüleyebilir.
![alt text](src/assets/images/profile.PNG "Logo Title Text 1")
![alt text](src/assets/images/myrental.PNG "Logo Title Text 1")




