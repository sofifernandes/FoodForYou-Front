import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogin } from '../model/UserLogin';
import { AuthService } from '../service/auth.service';
import { environment } from '../../environments/environment.prod';
import { OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLogin: UserLogin = new UserLogin();
  isOAuthLogin: boolean = false;


  constructor(
    private authService: AuthService,
    private router: Router,
    private oauthService: OAuthService
  ) { }

  ngOnInit() {
    if (environment.token) {
      this.router.navigate(['/home']);
    }
  }

  entrar() {
    // Log in using existing authentication method
    if (!this.isOAuthLogin) {
      this.authService.logar(this.userLogin).subscribe((resp: UserLogin) => {
        this.userLogin = resp;

        environment.idUser = this.userLogin.id;
        environment.nomeUser = this.userLogin.nome;
        environment.fotoUser = this.userLogin.foto;
        environment.token = this.userLogin.token;
        environment.admin = this.userLogin.admin;

        this.router.navigate(['/home']);
      });
    } else {
      this.configureOAuthService('google');
      this.configureOAuthService('facebook');
      this.configureOAuthService('github');
      this.oauthService.tokenValidationHandler = new JwksValidationHandler();
      this.handleOAuthLogin('google');
    }
  }

  selectOAuthLogin() {
    this.isOAuthLogin = true;
  }

  selectBasicLogin() {
    this.isOAuthLogin = false;
  }

  configureOAuthService(provider: string) {
    let config: any;

    if (provider === 'google') {
      config = {
        clientId: '622687646351-2us02pog9j0tnjcflfmrd9fgj40808p5.apps.googleusercontent.com',
        issuer: 'https://accounts.google.com',
        redirectUri: 'http://localhost:4200/login/oauth2/code/google',
        scope: 'openid profile email',
        showDebugInformation: true,
        responseType: 'code',
      };
      this.oauthService.configure(config);
      this.oauthService.setStorage(localStorage);
      this.oauthService.tokenValidationHandler = new JwksValidationHandler();
      this.oauthService.loadDiscoveryDocumentAndLogin().then(() => {
        // After successful login, redirect to home page
        this.router.navigate(['/home']);
      });

    } else if (provider === 'facebook') {
      config = {
        clientId: 'your-client-id',
        issuer: 'https://www.facebook.com',
        redirectUri: window.location.origin + '/login',
        scope: 'email',
        showDebugInformation: true,
        responseType: 'code',
      };
      this.oauthService.configure(config);
      this.oauthService.setStorage(localStorage);
      this.oauthService.tokenValidationHandler = new JwksValidationHandler();
      this.oauthService.loadDiscoveryDocumentAndLogin().then(() => {
        // After successful login, redirect to home page
        this.router.navigate(['/home']);
      });

    } else if (provider === 'github') {
      config = {
        clientId: 'your-client-id',
        issuer: 'https://github.com',
        redirectUri: window.location.origin + '/login',
        scope: 'user:email',
        showDebugInformation: true,
        responseType: 'code',
      };
      this.oauthService.configure(config);
      this.oauthService.setStorage(localStorage);
      this.oauthService.tokenValidationHandler = new JwksValidationHandler();
      this.oauthService.loadDiscoveryDocumentAndLogin().then(() => {
        // After successful login, redirect to home page
        this.router.navigate(['/home']);
      });
    }    
  }

  handleOAuthLogin(provider: string) {
    if (this.isOAuthLogin && provider === 'google') {
      this.oauthService.initImplicitFlow();
      return; // return to prevent the basic login flow from executing
    } else if (this.isOAuthLogin && provider === 'facebook') {
      this.oauthService.initImplicitFlow();
      return;
    } else if (this.isOAuthLogin && provider === 'github') {
      this.oauthService.initImplicitFlow();
      return;
    }
  }
}



