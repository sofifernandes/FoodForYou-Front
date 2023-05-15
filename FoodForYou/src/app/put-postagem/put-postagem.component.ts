import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertasComponent } from '../alertas/alertas.component';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { Interesse } from '../model/Interesse';
import { AlertasService } from '../service/alertas.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';
import { InteresseService } from '../service/interesse.service';

@Component({
  selector: 'app-put-postagem',
  templateUrl: './put-postagem.component.html',
  styleUrls: ['./put-postagem.component.css']
})
export class PutPostagemComponent implements OnInit {

  postagem: Postagem = new Postagem()
  idPost: number

  tema: Tema = new Tema ()
  listaTemas: Tema[]
  idTema: number

  interesse: Interesse = new Interesse()
  listaInteresse: Interesse[]
  idInteresse: number

  constructor(
    private temaService: TemaService,
    private interesseService: InteresseService,
    private postagemService: PostagemService,
    private router: Router,
    private route: ActivatedRoute,
    private alert: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0,0)

    this.idPost = this.route.snapshot.params["id"]
    this.findByIdPostagem(this.idPost)

    this.findAllTemas()
    this.findAllInteresse()
  }

  findByIdPostagem(id: number) {
    this.postagemService.getByIdPostagem(id).subscribe((resp: Postagem) => {
      this.postagem = resp
    })
  }

  salvar() {
    this.tema.id = this.idTema
    this.interesse.id = this.idInteresse
    this.postagem.tema = this.tema
    this.postagem.interesse = this.interesse

    this.postagemService.putPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp
      this.router.navigate(['/perfil'])
      this.alert.showAlertSuccess ('Postagem alterada com sucesso')
    }, err => {
      if (err.status == '500'){
        this.alert.showAlertDanger ('Preencha todos os campos corretamente antes de enviar!')
      }
    })
  }

  findAllTemas() {
    this.temaService.getAllTemas().subscribe((resp: Tema[]) => {
      this.listaTemas= resp
    })
  }

  findByIdTema() {
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }

  findAllInteresse() {
    this.interesseService.getAllInteresse().subscribe((resp: Interesse[]) => {
      this.listaInteresse= resp
    })
  }

  findByIdInteresse() {
    this.interesseService.getByIdInteresse(this.idInteresse).subscribe((resp: Interesse) => {
      this.interesse = resp
    })
  }  

}
