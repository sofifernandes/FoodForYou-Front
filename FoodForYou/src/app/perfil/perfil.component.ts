import { Component, OnInit } from '@angular/core';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { User } from '../model/User';
import { AlertasService } from '../service/alertas.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';
import { UsuarioService } from '../service/usuario.service';
import { environment } from '../../environments/environment.prod';
import { Router } from '@angular/router';
import { Interesse } from '../model/Interesse';
import { InteresseService } from '../service/interesse.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  key = 'data'
  reverse = true

  postagem: Postagem = new Postagem()
  listaPostagens: Postagem[]
  titulo: string

  tema: Tema = new Tema()
  nomeTema: string

  listaTema: Tema[]

  interesse: Interesse = new Interesse()
  nomeInteresse: string

  listaInteresse: Interesse[]

  user: User = new User()

  idInteresse: number
  idTema: number
  idUser: number  

  nomeUser: string
  fotoUser: string

  frasePostagem: string

  constructor(
    private postagemService: PostagemService,
    private usuarioService: UsuarioService, 
    private temaService: TemaService,
    private interesseService: InteresseService,
    private alert: AlertasService,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0, 0)    

    let token = environment.token

    if(token == '') {
      this.alert.showAlertInfo("Você precisa estar logado para acessar")
      this.router.navigate(["/login"])
    }

    this.nomeUser = environment.nomeUser
    this.fotoUser = environment.fotoUser

    this.findAllTemas()
    this.findAllInteresse()
    this.fraseAleatoria()
    this.findAllUserPostagens()    
  }

  

  publicar() {
    this.tema.id= this.idTema
    this.interesse.id= this.idInteresse
    this.postagem.interesse = this.interesse 
    this.postagem.tema = this.tema 
    this.user.id= environment.idUser
    this.postagem.usuario = this.user
    this.postagem.usuario.nome = environment.nomeUser
    this.postagem.usuario.foto = environment.fotoUser
    this.postagem.usuario.id = environment.idUser
    this.postagem.tipoPostagem = 'tipo genérico'
    if(this.postagem.titulo == null || this.postagem.textoPostagem == null || this.postagem.tema == null){
      this.alert.showAlertDanger('Preencha todos os campos antes de publicar!')
    } else {
      this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) => {
        this.postagem = resp
        this.postagem = new Postagem()
        this.alert.showAlertSuccess('Postagem realizada com sucesso!')
        this.findAllUserPostagens() 
      })  
      this.temaService.putTemas(this.tema.id, this.tema).subscribe((resp: Tema) => {
        this.tema = resp
        this.tema.qnt_posts++
      })       
    }   
  }
    
  findAllInteresse() {
    this.interesseService.getAllInteresse().subscribe((resp: Interesse[]) => {
      this.listaInteresse = resp
    })
  }

  findByIdInteresse() {
    this.interesseService.getByIdInteresse(this.idInteresse).subscribe((resp: Interesse) => {
      this.interesse = resp
    })
  }

  findAllTemas() {
    this.temaService.getAllTemas().subscribe((resp: Tema[]) => {
      this.listaTema = resp
    })
  }

  findByIdTema() {
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }  

  findByTituloPostagem() {
    if (this.titulo === '') {
      this.findAllUserPostagens()
    } else {
      this.postagemService.getByTituloPostagem(this.titulo).subscribe((resp: Postagem[]) => {
        this.listaPostagens = resp
      })
    }
  }

  findByNomeTema() {
    if (this.nomeTema === '') {
      this.findAllTemas()
    } else {
      this.temaService.getByNomeTema(this.nomeTema).subscribe((resp: Tema[]) => {
        this.listaTema = resp
      })
    }
  }  

  findByNomeInteresse() {
    if (this.nomeInteresse === '') {
      this.findAllInteresse()
    } else {
      this.interesseService.getByNomeInteresse(this.nomeInteresse).subscribe((resp: Interesse[]) => {
        this.listaInteresse = resp
      })
    }
  }

  fraseAleatoria() {
    let num = Math.floor(Math.random() * 3)
    if (num == 0) {
      this.frasePostagem = 'Qual o insight de hoje?'
    } else if  (num == 1) {
      this.frasePostagem = 'Que tal ajudar alguém hoje?'
    } else {
      this.frasePostagem = 'Colabore conosco!'
    }
  }

  findAllUserPostagens() { 
    this.usuarioService.getByIdUser(environment.idUser).subscribe((resp: User) => {    
      this.listaPostagens = resp.postagem
    })
  }

  generatePDF() {
    const postagens = this.listaPostagens.map((item, index) => [index + 1, item.titulo]);
  
    const documentDefinition = {
      content: [
        { text: 'Lista de Postagens', style: 'header' },
        {
          table: {
            headerRows: 1,
            widths: [30, '*'],
            body: [
              ['Nº', 'Postagem'],
              ...postagens,
            ],
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'center',
        },
      },
    };
  
    pdfMake.createPdf(documentDefinition).download('lista-postagens.pdf');
  }

  
}

