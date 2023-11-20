import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import {NgxChartsModule} from '@swimlane/ngx-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ContatoComponent } from './contato/contato.component';
import { SobreComponent } from './sobre/sobre.component';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { FeedComponent } from './feed/feed.component';
import { PerfilLateralComponent } from './perfil-lateral/perfil-lateral.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PutPostagemComponent } from './put-postagem/put-postagem.component';
import { PutTemaComponent } from './put-tema/put-tema.component';
import { DeletePostagemComponent } from './delete-postagem/delete-postagem.component';
import { DeleteTemaComponent } from './delete-tema/delete-tema.component';
import { AlertasComponent } from './alertas/alertas.component';
import { InformacoesComponent } from './informacoes/informacoes.component';
import { PostTemaComponent } from './post-tema/post-tema.component';
import { DeleteInteresseComponent } from './delete-interesse/delete-interesse.component';
import { PostInteresseComponent } from './post-interesse/post-interesse.component';
import { PutInteresseComponent } from './put-interesse/put-interesse.component';
import { PostComentarioComponent } from './post-comentario/post-comentario.component';
import { PutComentarioComponent } from './put-comentario/put-comentario.component';
import { DeleteComentarioComponent } from './delete-comentario/delete-comentario.component';
import { EditarCadastroComponent } from './editar-cadastro/editar-cadastro.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    ContatoComponent,
    SobreComponent,
    LoginComponent,
    CadastroComponent,
    FeedComponent,
    PerfilLateralComponent,
    PerfilComponent,
    PutPostagemComponent,
    PutTemaComponent,
    DeletePostagemComponent,
    DeleteTemaComponent,
    AlertasComponent,
    InformacoesComponent,
    PostTemaComponent,
    DeleteInteresseComponent,
    PostInteresseComponent,
    PutInteresseComponent,
    PostComentarioComponent,
    PutComentarioComponent,
    DeleteComentarioComponent,
    EditarCadastroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,    
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    NgxChartsModule,
    ModalModule.forRoot()    
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
