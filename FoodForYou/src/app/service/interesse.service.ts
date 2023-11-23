import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Interesse } from '../model/Interesse';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class InteresseService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set("Authorization", environment.token)
  }

  getAllInteresse() {
    return this.http.get("https://foodforyou-sf.netlify.app/physical-sponge-production.up.railway.app/interesse", this.token)
  }

  getByIdInteresse(id: number) {
    return this.http.get(`https://foodforyou-sf.netlify.app/physical-sponge-production.up.railway.app/interesse/${id}`, this.token)
  }

  getByNomeInteresse(nome: string) {
    return this.http.get(`https://foodforyou-sf.netlify.app/physical-sponge-production.up.railway.app/interesse/nome/${nome}`, this.token)
  }

  postInteresse (interesse: Interesse) {
    return this.http.post("https://foodforyou-sf.netlify.app/physical-sponge-production.up.railway.app/interesse", interesse, this.token)
  }

  putInteresse(id: number, interesse: Interesse) {
    return this.http.put(`https://foodforyou-sf.netlify.app/physical-sponge-production.up.railway.app/interesse/${id}`, interesse, this.token);
  }

  deleteInteresse(id: number) {
    return this.http.delete(`https://foodforyou-sf.netlify.app/physical-sponge-production.up.railway.app/interesse/${id}`, this.token)
  }
  
}
