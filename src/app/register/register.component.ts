import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  user: any;
  c_password: string;
  c_email: string;

  constructor(private router: Router, 
              public alertController: AlertController,
              private _register: RegisterService) {
    this.user = {
      name: "",
      last_name: "",
      email: "",
      password: ""
    };
    this.c_email=""; 
    this.c_password=""; 
  }

  ngOnInit() {}

  return(){
    this.router.navigateByUrl('/');
  }

  register(){
    if(this.validateInputs()){
      console.log(this.user);
      this._register.registerUser(this.user).subscribe(
        res =>{
          console.log(res);
          if(res.code == 200){
            this.presentAlert('Usuario creado Exitosamente', 'Success', '', 200);
          }
        },
        error =>{

        },
        () =>{

        }
      );
    }
    
    
  }

  validateInputs(){
    let valid = true;
    if(this.user.name == "" || this.user.last_name == "" || this.user.email =="" || this.user.password == "" || this.c_email == ""  || this.c_password == ""){
      this.presentAlert('Warning','','Todos los campos son requeridos');
      valid = false;
    }
    if(!this.validateEmail(this.user.email)){
      this.presentAlert('Ingrese un correo valido, example: correo@correo.com');
      valid = false;
    }
    if(!this.validatePassword(this.user.password)){
      this.presentAlert('La contraseña debe contener: una mayuscula, una minuscula, un numero y minimo 8 caracteres');
      valid = false;
    }
    if(this.user.email != this.c_email){
      this.presentAlert('Los correos debe coincidir');
      valid = false;
    }
    if(this.user.password != this.c_password){
      this.presentAlert('La contraseñas deben coincidir');
      valid = false;
    }
    return valid;
  }



  setName(value){
    this.user.name = value;
  }
  setLastName(value){
    this.user.last_name= value;
  }
  setemail(value){
    this.user.email= value;
  }
  setPassword(value){
    this.user.password= value;
  }

  setCEmail(value){
    this.c_email= value;
  }

  setCPassword(value){
    this.c_password= value;
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
  validatePassword(password) {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    return re.test(String(password));
  }


}
