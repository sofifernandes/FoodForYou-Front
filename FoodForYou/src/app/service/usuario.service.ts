import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod'
import { User } from './../model/User';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  
  constructor(
    private http: HttpClient
  ) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getByNomeUser(nome: string) {
    return this.http.get(`http://localhost:8080/usuario/nome/${nome}`, this.token)
  } 

  getByIdUser(id: number){
      return this.http.get(`http://localhost:8080/usuario/${id}`, this.token)
  }

  putUsuario(usuario: User) {
    return this.http.put('http://localhost:8080/usuario', usuario, this.token)
  }
 
}