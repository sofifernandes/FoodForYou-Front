import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Comentario } from '../model/Comentario';
import { AlertasService } from '../service/alertas.service';
import { ComentarioService } from '../service/comentario.service';

@Component({
  selector: 'app-post-comentario',
  templateUrl: './post-comentario.component.html',
  styleUrls: ['./post-comentario.component.css']
})
export class PostComentarioComponent implements OnInit {

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

  findAllComentarios(){
    this.comentarioService.getAllComentarios().subscribe((resp: Comentario[]) => {
      this.listaComentarios = resp
    })
  }

  findByIdComentario(){
    this.comentarioService.getByIdComentario(this.comentario.id).subscribe((resp: Comentario) => {
      this.comentario = resp;
    })
  }

  cadastrar(){
      this.comentarioService.postComentario(this.comentario).subscribe((resp: Comentario) => {
        this.comentario = resp
        this.router.navigate(['/perfil'])
        this.alert.showAlertSuccess('Tema cadastrado com sucesso!')
      })    
  }  

}
