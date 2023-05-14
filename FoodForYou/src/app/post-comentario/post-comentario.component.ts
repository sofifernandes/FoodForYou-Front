import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Comentario } from '../model/Comentario';
import { Postagem } from '../model/postagem';
import { User } from '../model/User';
import { AlertasService } from '../service/alertas.service';
import { ComentarioService } from '../service/comentario.service';
import { environment } from '../../environments/environment.prod';

@Component({
  selector: 'app-post-comentario',
  templateUrl: './post-comentario.component.html',
  styleUrls: ['./post-comentario.component.css']
})
export class PostComentarioComponent implements OnInit {

  key = 'data'
  reverse = true

  postagem: Postagem = new Postagem()
  listaPostagens: Postagem[]

  user: User = new User()

  comentario: Comentario = new Comentario()
  listaComentarios: Comentario[]

  constructor(
    private comentarioService: ComentarioService,
    private router: Router,
    private alert: AlertasService
  ) { }

  ngOnInit() {
    this.findAllComentarios()
  }

  findAllComentarios() {
    this.comentarioService.getAllComentarios().subscribe((resp: Comentario[]) => {
      this.listaComentarios = resp
    })
  }

  findByIdComentario() {
    this.comentarioService.getByIdComentario(this.comentario.id).subscribe((resp: Comentario) => {
      this.comentario = resp;
    })
  }

  publicar() {
    this.comentario.id = this.comentario.id
    this.postagem.comentario = this.comentario
    this.user.id = environment.idUser
    this.postagem.usuario = this.user
    this.comentarioService.postComentario(this.comentario).subscribe((resp: Comentario) => {
      this.comentario = resp
      this.comentario = new Comentario()
      this.alert.showAlertSuccess('Comentário realizado com sucesso!')
      this.findAllComentarios()
    })
  }

  cadastrar() {
    this.comentarioService.postComentario(this.comentario).subscribe((resp: Comentario) => {
      this.comentario = resp
      this.router.navigate(['/feed'])
      this.alert.showAlertSuccess('Comentário cadastrado com sucesso!')
    })
  }

}
