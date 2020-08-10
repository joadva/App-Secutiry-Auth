import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoginService } from '../services/login.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  email:string;
  password: string;

  constructor(private router: Router, 
              public alertController: AlertController,
              private _login: LoginService,
              public loadingController: LoadingController) {
    this.email= "alpa@gmail.com";
    this.password="Zafiro14";
   }

   sendLogin(){
     this.presentLoading();
     if(this.validateInputs()){
       const user = {email: this.email, password: this.password}
       this._login.login(user).subscribe(
         res =>{
           if(res.code == 404){
             this.presentAlert('Email and/or password incorrect');
           }
           if(res.code == 200){
            localStorage.setItem('user', JSON.stringify(res.user));
            this.router.navigateByUrl('/home/tabs/tab2');
           }
           console.log(res);
           
         },
         error =>{

         }
       );
     }
   }

   validateInputs(){
     let validate= true;
     if( this.email =="" || this.password == "" ){
      this.presentAlert('Warning','','Todos los campos son requeridos');
      validate = false;
    }
    if(!this.validateEmail(this.email)){
      this.presentAlert('Ingrese un correo valido, example: correo@correo.com');
      validate = false;
    }
     return validate;
   }

  ngOnInit() {}

  setEmail(value){
    this.email= value;
  }
  setPassword(value){
    this.password= value;
  }

  async presentAlert(message = 'Success', title ='Warning!', subtitle='', status = 0) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: title,
      subHeader: subtitle,
      message: message,
      buttons: [{
        text: 'OK',
        handler: () =>{
          if(status == 200){
            this.router.navigateByUrl('/login');
          }
        }
      }]
    });

    await alert.present();
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 700
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

}
