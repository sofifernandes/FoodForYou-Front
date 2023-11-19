import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Interesse } from '../model/Interesse';
import { AlertasService } from '../service/alertas.service';
import { InteresseService } from '../service/interesse.service';

@Component({
  selector: 'app-put-interesse',
  templateUrl: './put-interesse.component.html',
  styleUrls: ['./put-interesse.component.css']
})
export class PutInteresseComponent implements OnInit {
 
  interesse: Interesse = new Interesse()

  constructor(
    private interesseService: InteresseService,
    private router: Router,
    private route: ActivatedRoute,
    private alert: AlertasService
  ) { }

  ngOnInit(): void {
    window.scroll(0, 0)
    let id: number = this.route.snapshot.params['id']
    this.findByIdInteresse(id)
  }

  findByIdInteresse(id: number) {
    this.interesseService.getByIdInteresse(id).subscribe((resp: Interesse) => {
      this.interesse = resp
    })
  }

  salvar() {
    if (this.interesse.postagem.length != 0) {
      this.alert.showAlertDanger('Esse interesse não pode ser modificado, pois já pertence a uma postagem.')
      this.router.navigate(['/cadastro-interesse'])
    }else {
      this.interesseService.putInteresse(this.interesse.id, this.interesse).subscribe((resp: Interesse) => {
        this.interesse = resp
        this.router.navigate(['/cadastro-interesse'])
        this.alert.showAlertSuccess('Interesse atualizado com sucesso!')
      })
    }
  }

}
