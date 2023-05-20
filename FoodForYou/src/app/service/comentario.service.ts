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
    return this.http.get("http://localhost:8080/comentario", this.token)
  }

  getByIdComentario(id: number) {
    return this.http.get(`http://localhost:8080/comentario/${id}`, this.token)
  }

  getComentariosByPost(postId: number) { 
    return this.http.get(`http://localhost:8080/comentario/post/${postId}`, this.token);
  }
 
  postComentario(comentario: Comentario) {
    return this.http.post("http://localhost:8080/comentario", comentario, this.token);
  }
  
  putComentario(comentario: Comentario) {
    return this.http.put("http://localhost:8080/comentario", comentario, this.token);
  }

  deleteComentario(id: number) {
    return this.http.delete(`http://localhost:8080/comentario/${id}`, this.token);
  }

}
