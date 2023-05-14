import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Comentario } from '../model/Comentario';
import { AlertasService } from '../service/alertas.service';
import { ComentarioService } from '../service/comentario.service';

@Component({
  selector: 'app-put-comentario',
  templateUrl: './put-comentario.component.html',
  styleUrls: ['./put-comentario.component.css']
})
export class PutComentarioComponent implements OnInit {

  comentario: Comentario = new Comentario()

  constructor(
    private comentarioService: ComentarioService,
    private router: Router,
    private route: ActivatedRoute,
    private alert: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0, 0)
    let id: number = this.route.snapshot.params['id']
    this.findByIdComentario(id)
  }

  findByIdComentario(id: number) {
    this.comentarioService.getByIdComentario(id).subscribe((resp: Comentario) => {
      this.comentario = resp
    })
  }

  salvar() {
      this.comentarioService.putComentario(this.comentario).subscribe((resp: Comentario) => {
        this.comentario = resp
        this.router.navigate(['/cadastro-tema'])
        this.alert.showAlertSuccess('Comentário atualizado com sucesso!')
      })    
  }

}
