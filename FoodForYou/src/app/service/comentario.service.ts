import { Injectable } from '@angular/core';
import { Comentario } from '../model/Comentario';
import { environment } from '../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ComentarioResponse } from '../model/ComentarioResponse';


@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  constructor(private http: HttpClient) { }
 
  token = {
    headers: new HttpHeaders().set("Authorization", environment.token)
  }

  getAllComentarios() {
    return this.http.get("physical-sponge-production.up.railway.app/comentario", this.token)
  }

  getByIdComentario(id: number) {
    return this.http.get(`physical-sponge-production.up.railway.app/comentario/${id}`, this.token)
  }

  getComentariosByPost(postId: number) { 
    return this.http.get(`physical-sponge-production.up.railway.app/comentario/post/${postId}`, this.token);
  }
 
  postComentario(comentario: Comentario) {
    return this.http.post("physical-sponge-production.up.railway.app/comentario", comentario, this.token);
  }
  
  putComentario(id: number, comentario: Comentario) {
    return this.http.put(`physical-sponge-production.up.railway.app/comentario/${id}`, comentario, this.token);
  }

  deleteComentario(id: number) {
    return this.http.delete(`physical-sponge-production.up.railway.app/comentario/${id}`, this.token);
  }

}
