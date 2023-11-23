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
    return this.http.get(`https://foodforyou-sf.netlify.app/physical-sponge-production.up.railway.app/usuario/nome/${nome}`, this.token)
  } 

  getByIdUser(id: number){
      return this.http.get(`https://foodforyou-sf.netlify.app/physical-sponge-production.up.railway.app/usuario/${id}`, this.token)
  }

  putUsuario(usuario: User) {
    return this.http.put('https://foodforyou-sf.netlify.app/physical-sponge-production.up.railway.app/usuario', usuario, this.token)
  }
 
}