import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Interesse } from '../model/Interesse';
import { AlertasService } from '../service/alertas.service';
import { InteresseService } from '../service/interesse.service';

@Component({
  selector: 'app-post-interesse',
  templateUrl: './post-interesse.component.html',
  styleUrls: ['./post-interesse.component.css']
})
export class PostInteresseComponent implements OnInit {

  interesse: Interesse = new Interesse()
  listaInteresses: Interesse[]

  constructor(
    private interesseService: InteresseService,
    private router: Router,
    private alert: AlertasService
  ) { }

  ngOnInit(): void {
    this.findAllInteresses()
  }

  findAllInteresses(){
    this.interesseService.getAllInteresse().subscribe((resp: Interesse[]) => {
      this.listaInteresses = resp
    })
  }

  findByIdInteresse(){
    this.interesseService.getByIdInteresse(this.interesse.id).subscribe((resp: Interesse) => {
      this.interesse = resp;
    })
  }

  cadastrar(){
    if (this.interesse.nome == null) {
      this.alert.showAlertDanger('Preencha o campo de nome do interesse corretamente')
    } else {
      this.interesseService.postInteresse(this.interesse).subscribe((resp: Interesse) => {
        this.interesse = resp
        this.router.navigate(['/perfil'])
        this.alert.showAlertSuccess('Interesse cadastrado com sucesso!')
      })
    }
  }  

}
