import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Comentario } from '../model/Comentario';
import { AlertasService } from '../service/alertas.service';
import { ComentarioService } from '../service/comentario.service';

@Component({
  selector: 'app-delete-comentario',
  templateUrl: './delete-comentario.component.html',
  styleUrls: ['./delete-comentario.component.css']
})
export class DeleteComentarioComponent implements OnInit {

  comentario: Comentario = new Comentario()

  constructor(
    private comentarioService: ComentarioService,
    private router: Router,
    private route: ActivatedRoute,
    private alert: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0,0)

    let id: number = this.route.snapshot.params['id']
    this.findByIdComentario(id)

  }

  findByIdComentario(id: number) {
    this.comentarioService.getByIdComentario(id).subscribe((resp: Comentario) => {
      this.comentario = resp
    })
  }

  btnSim() {
    this.comentarioService.deleteComentario(this.comentario.id).subscribe(() => {
      this.router.navigate(['/feed'])
      this.alert.showAlertSuccess('Comentario apagado com sucesso!')
    })
  }

  btnNao() {
    this.router.navigate(['/feed'])
  }

}
