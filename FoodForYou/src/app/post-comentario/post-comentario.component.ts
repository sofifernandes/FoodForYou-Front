import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Comentario } from '../model/Comentario';
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
  listaComentarios: Comentario[]

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
    this.findAllComentarios();
    const postId = Number(this.route.snapshot.paramMap.get('id'));
    this.comentario.postagem = this.postagem;
    this.postagem.id = postId;
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

  Publicar() {
    this.comentario.postagem = this.post;
    this.comentario.usuario = this.post.usuario;
    this.comentario.postId = this.post.id;

    const formattedDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss.SSSSSS');
    this.comentario.data = new Date(formattedDate);

    this.comentarioService.postComentario(this.comentario).subscribe((resp: Comentario) => {
      this.comentario = resp
      this.comentario = new Comentario()
      this.alert.showAlertSuccess('Comentário realizado com sucesso!')
      this.findAllComentarios()
    })
  }


}
