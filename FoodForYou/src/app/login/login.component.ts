import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogin } from '../model/UserLogin';
import { AuthService } from '../service/auth.service';
import { environment } from '../../environments/environment.prod';
import { environmentGoogle } from '../../environments/environment.prod-google';
import { User } from '../model/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLogin: UserLogin = new UserLogin();
  user: User = new User();
  isOAuthLogin: boolean = false;


  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    if (environment.token) {
      this.router.navigate(['/home']);
    }
  }

  entrar() {
    if (!this.isOAuthLogin) {
      this.authService.logar(this.userLogin).subscribe((resp: UserLogin) => {
        this.userLogin = resp;

        environment.idUser = this.userLogin.id;
        environment.nomeUser = this.userLogin.nome;
        environment.fotoUser = this.userLogin.foto;
        environment.token = this.userLogin.token;
        environment.email = this.userLogin.email;
        environment.admin = this.userLogin.admin;

        this.router.navigate(['/home']);
      });
    }
  }
  
}



