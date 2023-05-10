import { Component, OnInit } from '@angular/core';
import { Postagem } from '../model/postagem';
import { Tema } from '../model/Tema';
import { User } from '../model/User';
import { AlertasService } from '../service/alertas.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';
import { UsuarioService } from '../service/usuario.service';
import { environment } from '../../environments/environment.prod';
import { Router } from '@angular/router';

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

  user: User = new User()

  idTema: number
  idUser: number

  frasePostagem: string

  constructor(
    private postagemService: PostagemService,
    private usuarioService: UsuarioService, 
    private temaService: TemaService,
    private alert: AlertasService,
    private router: Router
  ) { }

  ngOnInit() {

    let token = environment.token

    if(token == ''){
      this.router.navigate(['/login'])
      this.alert.showAlertInfo('Faça o login antes de entrar no feed...')
    }

    window.scroll(0, 0)

    if(environment.token == '') {
      this.alert.showAlertInfo("Você precisa estar logado para acessar")
      this.router.navigate(["/login"])
    }
     
    this.findAllTemas()
    this.fraseAleatoria()
    this.findAllUserPostagens()
    
  }


  publicar() {
    this.tema.id= this.idTema
    this.postagem.tema = this.tema 
    this.user.id= environment.idUser
    this.postagem.usuario = this.user
    if(this.postagem.titulo == null || this.postagem.textoPostagem == null || this.postagem.tema == null){
      this.alert.showAlertDanger('Preencha todos os campos antes de publicar!')
    } else {
      this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) => {
        this.postagem = resp
        this.postagem = new Postagem()
        this.alert.showAlertSuccess('Postagem realizada com sucesso!')
        this.findAllUserPostagens()
      })
    }
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

  
}

