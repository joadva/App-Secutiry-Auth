import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urlAPI } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _http: HttpClient) {

   }

   login<T>(user: any){
     const pathLogin = "/api/user/login";
     return <any>this._http.post(urlAPI+pathLogin, {
       email: user.email,
       password: user.password
     });
   }
}
