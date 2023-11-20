import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { AlertasService } from '../service/alertas.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {  
  key = 'data'
  reverse = true

  postagem: Postagem = new Postagem()
  listaPostagens: Postagem[]

  tema: Tema = new Tema()
  listaTema: Tema[]
  listaTemaSelected: Tema[]

  idTema: number
  btnTemas: string
  inicioSelected: boolean
  temaSelected: boolean

  constructor(
    private postagemService: PostagemService, 
    private temaService: TemaService,
    private alert: AlertasService,
    private router: Router
  ) { }

  ngOnInit() {

    let token = environment.token
    this.temaSelected = false
    this.inicioSelected = true

    window.scroll(0, 0)

    if(environment.token == '') {
      this.alert.showAlertInfo("Você precisa estar logado para acessar")
      this.router.navigate(["/login"])
    }

    this.findAllPostagens()
    this.findAllTemas()    
  }

  findAllPostagens() {
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp
    })
  }

  findAllTemas() {
    this.temaService.getAllTemas().subscribe((resp: Tema[]) => {
      this.listaTema= resp
      this.listaTemaSelected = resp
    })
  }

  goToTop() {
    window.scroll(0, 0)
    this.temaService.getAllTemas().subscribe((resp: Tema[]) => {
      this.listaTemaSelected = resp
      this.inicioSelected = true
      this.temaSelected = false
    })
  }

  findByNomeTema(event: any) {
    this.temaService.getByNomeTema(event.target.value).subscribe((resp: Tema[]) => {
      this.listaTemaSelected = resp
      this.inicioSelected = false
      this.temaSelected = true
    })
  }

  verificaInicioSelected() {
    let ok = this.inicioSelected
    return ok
  }

  verificaTemaSelected() {
    let ok = this.temaSelected
    return ok
  }
}

 