import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Postagem } from '../model/Postagem';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  constructor(private http: HttpClient) { }
  
  token = {
    headers: new HttpHeaders().set("Authorization", environment.token)
  }

  getAllPostagens() {
    return this.http.get("physical-sponge-production.up.railway.app/postagem", this.token)
  }

  getByIdPostagem(id: number) {
    return this.http.get(`physical-sponge-production.up.railway.app/postagem/${id}`, this.token)
  }

  postPostagem(postagem: Postagem) {
    return this.http.post("physical-sponge-production.up.railway.app/postagem", postagem, this.token)
  }

  putPostagem(id: number, postagem: Postagem) {
    return this.http.put(`physical-sponge-production.up.railway.app/postagem/${id}`, postagem, this.token);
  }  

  deletePostagem(id: number) {
    return this.http.delete(`physical-sponge-production.up.railway.app/postagem/${id}`, this.token)

  }

  getByTituloPostagem(titulo: string) {
    return this.http.get(`physical-sponge-production.up.railway.app/postagem/titulo/${titulo}`, this.token)
  }
}
