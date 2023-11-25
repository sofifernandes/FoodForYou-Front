import { UsuarioService } from './../service/usuario.service';
import { User } from './../model/User';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.prod';
import { AlertasService } from '../service/alertas.service';
import { PostagemService } from '../service/postagem.service';
@Component({
  selector: 'app-editar-cadastro',
  templateUrl: './editar-cadastro.component.html',
  styleUrls: ['./editar-cadastro.component.css']
})
export class EditarCadastroComponent implements OnInit {
  user: User = new User()
  nomeUser: string
  linkFoto: string
  idUser: number

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private alert: AlertasService,
    private postagemService: PostagemService
  ) { }

  ngOnInit() {
    window.scroll(0, 0)
    this.findByIdUser()

    let token = environment.token

    if (token == '') {
      this.router.navigate(['/login'])
      this.alert.showAlertInfo('Faça o login antes de entrar na edição de cadastro!')
    }
  }

  findByIdUser() {
    this.usuarioService.getByIdUser(environment.idUser).subscribe((resp: User) => {
      this.user = resp
      this.nomeUser = this.user.nome
      this.linkFoto = this.user.foto
    })
  }

  putUser() {
    this.user.nome = this.nomeUser
    this.user.foto = this.linkFoto
    
    this.usuarioService.putUsuario(this.user).subscribe((resp: User) => {
      this.user = resp
      environment.nomeUser = this.user.nome
      environment.fotoUser = this.user.foto
    })

    this.router.navigate(['/home'])
    this.alert.showAlertSuccess('Perfil alterado com sucesso!!')
  }


  deletar(){
    this.usuarioService.deleteUsuario(this.user.id).subscribe(() => {
      this.alert.showAlertSuccess('Usuário apagado com sucesso!')
      this.router.navigate(["/login"])
      environment.token = ''
      environment.admin = false
    })
  }

}