import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
import { UsuarioService } from '../service/usuario.service';
import { UserLogin } from '../model/UserLogin';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  user: User = new User();
  senha: string;


  constructor(
    private authService: AuthService,
    private router: Router,
    private alert: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0, 0)
  }

  conferirSenha(event: any) {
    this.senha = event.target.value;
  }

  cadastrar() {
    if (this.senha === this.user.senha) {
      if(this.user.email === 'FoodForYou.PI@gmail.com'){
        this.user.admin = true
      } else { 
        this.user.admin = false
      }
      this.authService.cadastrar(this.user).subscribe((resp: User) => {
        this.user = resp
        this.router.navigate(["/login"])
        this.alert.showAlertSuccess("Usuário cadastrado com sucesso")
      })
    } else {
      this.alert.showAlertDanger("Suas senhas não conferem")
    }
  }
}
