import { UserLogin } from './../model/UserLogin';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OAuthService } from 'angular-oauth2-oidc';
import { User } from '../model/User';
import { environment } from 'src/environments/environment.prod';
import { environmentGoogle } from 'src/environments/environment.prod-google';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  
  tokne_url = environmentGoogle.token_url;

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

  public getToken(code: string): Observable<any> {
    let body = new URLSearchParams();
    body.set('client_id', environmentGoogle.clientId);
    body.set('scope', environmentGoogle.scope);
    body.set('code', code);
    const basic_auth = 'Basic '+ btoa('client:secret');
    const headers_object = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': '*/*',
      'Authorization': basic_auth
    });
    const httpOptions = { headers: headers_object};
    return this.http.post<any>(this.tokne_url, body, httpOptions);
  }


}
