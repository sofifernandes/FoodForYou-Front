import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tema } from '../model/Tema';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set("Authorization", environment.token)
  }

  getAllTemas() {
    return this.http.get("https://physical-sponge-production.up.railway.app/tema", this.token)
  }

  getByIdTema(id: number) {
    return this.http.get(`https://physical-sponge-production.up.railway.app/tema/${id}`, this.token)
  }

  getByNomeTema(nome: string) {
    return this.http.get(`https://physical-sponge-production.up.railway.app/tema/nome/${nome}`, this.token)
  }

  postTemas(tema: Tema) {
    return this.http.post("https://physical-sponge-production.up.railway.app/tema", tema, this.token)
  }

  putTemas(id: number, tema: Tema) {
    return this.http.put(`https://physical-sponge-production.up.railway.app/tema/${id}`, tema, this.token)
  }

  deleteTema(id: number) {
    return this.http.delete(`https://physical-sponge-production.up.railway.app/tema/${id}`, this.token)
  }
  
}
