import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Comentario } from '../model/Comentario';
import { ComentarioResponse } from '../model/ComentarioResponse';
import { Postagem } from '../model/Postagem';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';
import { AlertasService } from '../service/alertas.service';
import { ComentarioService } from '../service/comentario.service';
import { PostagemService } from '../service/postagem.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-post-comentario',
  templateUrl: './post-comentario.component.html',
  styleUrls: ['./post-comentario.component.css']
})
export class PostComentarioComponent implements OnInit {

  @Input() post: Postagem;

  key = 'data'
  reverse = true

  postagem: Postagem = new Postagem()
  listaPostagens: Postagem[]

  user: User = new User()

  comentario: Comentario = new Comentario()
  listaComentarios: ComentarioResponse[]

  constructor(
    private comentarioService: ComentarioService,
    private postagemService: PostagemService,
    private router: Router,
    private alert: AlertasService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    console.log('ngOnInit');
    this.findAllComentarios();
    console.log('findAllComentarios');
    const postId = Number(this.route.snapshot.paramMap.get('id'));
    this.comentario.postagem = this.postagem;
    this.postagem.id = postId;
  }

  findAllComentarios() {
    this.comentarioService.getComentariosByPost(this.post.id).subscribe((resp: ComentarioResponse[]) => {
      console.log('getComentariosByPost: ', resp);
      this.listaComentarios = resp;
      console.log('listaComentarios');
    });
  }
    

  findByIdComentario() {
    this.comentarioService.getByIdComentario(this.comentario.id).subscribe((resp: Comentario) => {
      this.comentario = resp;
    })
  } 

  Publicar() {
    this.comentario.postagem = this.post;
    console.log('Post ID:', this.post.id);
  
    const newComentario = new Comentario();
    newComentario.comentario = this.comentario.comentario;
    newComentario.data = new Date();
    newComentario.postagem = new Postagem();
    newComentario.postagem.id = this.post.id;
  
    this.comentarioService.postComentario(newComentario).subscribe((resp: Comentario) => {
      this.comentario = resp;
      this.comentario = new Comentario();
  
      this.post.comentarioId = this.comentario.id;
  
      this.alert.showAlertSuccess('Comentário realizado com sucesso!');

      this.findAllComentarios();
    });
  }  

}



