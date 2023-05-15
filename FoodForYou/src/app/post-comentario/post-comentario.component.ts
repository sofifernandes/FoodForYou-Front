import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Comentario } from '../model/Comentario';
import { Postagem } from '../model/Postagem';
import { User } from '../model/User';
import { AlertasService } from '../service/alertas.service';
import { ComentarioService } from '../service/comentario.service';
import { PostagemService } from '../service/postagem.service';
import { environment } from '../../environments/environment.prod';

@Component({
  selector: 'app-post-comentario',
  templateUrl: './post-comentario.component.html',
  styleUrls: ['./post-comentario.component.css']
})
export class PostComentarioComponent implements OnInit {

  @Input() postId: number;

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
    // Check if the postagem with the given id exists in the database
    this.postagemService.getByIdPostagem(this.postagem.id).subscribe((resp: Postagem) => {
      // If the postagem exists, set it as the postagem property of the comentario
      if (resp != null) {
        this.comentario.postagem = resp;
        this.comentario.usuario = this.user;
        this.comentario.postId = resp.id;
        
        // Save the comentario to the database
        this.comentarioService.postComentario(this.comentario).subscribe((resp: Comentario) => {
          this.comentario = resp;
          this.comentario = new Comentario();
          this.alert.showAlertSuccess('Comentário realizado com sucesso!');
          this.findAllComentarios();
        });
      } else {
        // If the postagem doesn't exist, show an error message
        this.alert.showAlertDanger('A postagem com o ID informado não existe!');
      }
    });
  }
  

  cadastrar() {
    this.comentarioService.postComentario(this.comentario).subscribe((resp: Comentario) => {
      this.comentario = resp
      this.router.navigate(['/feed'])
      this.alert.showAlertSuccess('Comentário cadastrado com sucesso!')
    })
  }

}
