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
    return this.http.get("http://localhost:8080/interesse", this.token)
  }

  getByIdInteresse(id: number) {
    return this.http.get(`http://localhost:8080/interesse/${id}`, this.token)
  }

  getByNomeInteresse(nome: string) {
    return this.http.get(`http://localhost:8080/interesse/nome/${nome}`, this.token)
  }

  postInteresse (interesse: Interesse) {
    return this.http.post("http://localhost:8080/interesse", interesse, this.token)
  }

  putInteresse(interesse: Interesse) {
    return this.http.put("http://localhost:8080/interesse", interesse, this.token);
  }

  deleteInteresse(id: number) {
    return this.http.delete(`http://localhost:8080/interesse/${id}`, this.token)
  }
  
}
