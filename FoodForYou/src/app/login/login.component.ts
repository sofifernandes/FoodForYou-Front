import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogin } from '../model/UserLogin';
import { AuthService } from '../service/auth.service';
import { environment } from '../../environments/environment.prod';
import { environmentGoogle } from '../../environments/environment.prod-google';
import { OAuthService } from 'angular-oauth2-oidc';
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
        environment.email = this.userLogin.email;
        environment.admin = this.userLogin.admin;

        this.router.navigate(['/home']);
      });
    } else {
      this.configureOAuthService('google', environment['prod-google'].clientId);
      this.configureOAuthService('facebook', environment['prod-facebook'].clientId);
      this.configureOAuthService('github', environment['prod-github'].clientId);
      this.handleOAuthLogin('google');
    }
  }

  selectOAuthLogin() {
    this.isOAuthLogin = true;
  }

  selectBasicLogin() {
    this.isOAuthLogin = false;
  }

  loginWithOAuth(provider: string) {
    this.isOAuthLogin = true; // Set the flag to indicate OAuth login
    
    // Pass the selected OAuth provider and its corresponding clientId to the configureOAuthService function
    if (provider === 'google') {
      this.configureOAuthService('google', environmentGoogle.clientId);
    } else if (provider === 'facebook') {
      // Replace 'environmentFacebook' with the appropriate object for Facebook configuration, if you have one.
      this.configureOAuthService('facebook', 'YOUR_FACEBOOK_CLIENT_ID_HERE');
    } else if (provider === 'github') {
      // Replace 'environmentGitHub' with the appropriate object for GitHub configuration, if you have one.
      this.configureOAuthService('github', 'YOUR_GITHUB_CLIENT_ID_HERE');
    }
    
    // Now call the handleOAuthLogin function with the selected provider to initiate the OAuth login flow
    this.handleOAuthLogin(provider);
  }

  configureOAuthService(provider: string, clientId: string) {
    let config: any;

    if (provider === 'google') {
      config = {
        issuer: 'https://accounts.google.com',
        strictDiscoveryDocumentValidation: false,
        redirectUri: window.location.origin,
        clientId: '622687646351-2us02pog9j0tnjcflfmrd9fgj40808p5.apps.googleusercontent.com',
        scope: 'openid profile email https://www.googleapis.com/auth/gmail.readonly',
        showDebugInformation: true,
        responseType: 'code',
      };
      this.oauthService.configure(config);
      this.oauthService.setStorage(localStorage);
      this.oauthService.loadDiscoveryDocumentAndLogin().then(() => {
        // After successful login, redirect to home page
        this.router.navigate(['/perfil']);
      });

    } else if (provider === 'facebook') {
      config = {
        issuer: 'https://accounts.google.com',
        strictDiscoveryDocumentValidation: false,
        redirectUri: window.location.origin,
        clientId: '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',
        scope: 'openid profile email https://www.googleapis.com/auth/gmail.readonly',
        showDebugInformation: true,
        responseType: 'code',
      };
      this.oauthService.configure(config);
      this.oauthService.setStorage(localStorage);
      this.oauthService.loadDiscoveryDocumentAndLogin().then(() => {
        // After successful login, redirect to home page
        this.router.navigate(['/home']);
      });

    } else if (provider === 'github') {
      config = {
        clientId: clientId,
        issuer: 'https://github.com',
        redirectUri: window.location.origin + '/login',
        scope: 'user:email',
        showDebugInformation: true,
        responseType: 'code',
      };
      this.oauthService.configure(config);
      this.oauthService.setStorage(localStorage);
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



