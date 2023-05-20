import { Component,Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Comentario } from '../model/Comentario';
import { AlertasService } from '../service/alertas.service';
import { ComentarioService } from '../service/comentario.service';
import { Postagem } from '../model/Postagem';
import { ComentarioResponse } from '../model/ComentarioResponse';

@Component({
  selector: 'app-delete-comentario',
  templateUrl: './delete-comentario.component.html',
  styleUrls: ['./delete-comentario.component.css']
})
export class DeleteComentarioComponent implements OnInit {

  @Input() post: Postagem;

  comentario: Comentario = new Comentario()

  postagem: Postagem = new Postagem()
  
  listaComentarios: ComentarioResponse[]

  constructor(
    private comentarioService: ComentarioService,
    private router: Router,
    private route: ActivatedRoute,
    private alert: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0,0)
    let id: number = this.route.snapshot.params['id']
    this.findByIdComentario(id);
    const postId = Number(this.route.snapshot.paramMap.get('id'));
    this.comentario.postagem = this.postagem;
    this.postagem.id = postId;

  }

  findByIdComentario(id: number) {
    this.comentarioService.getByIdComentario(id).subscribe((resp: Comentario) => {
      this.comentario = resp
    })
  }

  btnSim() {
    console.log('id comentario: ', this.comentario.id);
    this.comentarioService.deleteComentario(this.comentario.id).subscribe(() => {      
      this.alert.showAlertSuccess('Comentario apagado com sucesso!')
      this.router.navigate(['/feed'])
    })
  }

  btnNao() {
    this.router.navigate(['/feed'])
  }

}
