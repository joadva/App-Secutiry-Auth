import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urlAPI } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor( private _http: HttpClient) {

   }

   registerUser(user: any){
     const pathRegister = "/api/user/register-user";

     return this._http.post(urlAPI+pathRegister,{ 
       first_name: user.name, 
       last_name: user.last_name, 
       email: user.email, 
       password: user.password, 
       area: 'No tengo we', 
       cargo: 'weno' 
      });
   }
}
