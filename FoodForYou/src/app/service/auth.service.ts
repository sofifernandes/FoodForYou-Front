import { UserLogin } from './../model/UserLogin';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OAuthService } from 'angular-oauth2-oidc';
import { User } from '../model/User';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
    private oauthService: OAuthService) { 
    this.oauthService.configure({
      issuer: 'https://your-issuer.com',
      clientId: environment.clientId,
      redirectUri: window.location.origin + '/callback',
      scope: 'openid profile email',
      responseType: 'code',
      showDebugInformation: true
    });
  }
  

  logar(userLogin: UserLogin) {
    return this.http.post('http://localhost:8080/usuario/logar', userLogin)
  }

  cadastrar(user: User) {
    return this.http.post('http://localhost:8080/usuario/cadastrar', user)
  }

  btnSair() {
    let ok = false
    let token = environment.token
    if (token != '') {
      ok = true        
    }
    return ok    
  }

  btnLogin() {
    let ok = false
    let token = environment.token
    if (token == '') {
      ok = true      
    }
    return ok
  } 
  
  
  verificaAdmin(){
    let ok = false
    let admin = environment.admin
    if (admin == true) {
      ok = true
    }

    return ok
  }

}
