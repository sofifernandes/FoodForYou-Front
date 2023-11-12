import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ContatoComponent } from './contato/contato.component';
import { DeletePostagemComponent } from './delete-postagem/delete-postagem.component';
import { DeleteTemaComponent } from './delete-tema/delete-tema.component';
import { DeleteInteresseComponent } from './delete-interesse/delete-interesse.component';
import { FeedComponent } from './feed/feed.component';
import { HomeComponent } from './home/home.component';
import { InformacoesComponent } from './informacoes/informacoes.component';
import { LoginComponent } from './login/login.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PostTemaComponent } from './post-tema/post-tema.component';
import { PostInteresseComponent } from './post-interesse/post-interesse.component';
import { PutPostagemComponent } from './put-postagem/put-postagem.component';
import { PutTemaComponent } from './put-tema/put-tema.component';
import { PutInteresseComponent } from './put-interesse/put-interesse.component';
import { PostComentarioComponent } from './post-comentario/post-comentario.component';
import { PutComentarioComponent } from './put-comentario/put-comentario.component';
import { DeleteComentarioComponent } from './delete-comentario/delete-comentario.component';
import { SobreComponent } from './sobre/sobre.component';
import { EditarCadastroComponent } from './editar-cadastro/editar-cadastro.component';



const routes: Routes = [
  {path:'', redirectTo: 'home', pathMatch:'full'},
  {path: 'home', component: HomeComponent },
  {path: 'contato', component: ContatoComponent },
  {path: 'sobre', component: SobreComponent },
  {path: 'login', component: LoginComponent },
  {path: 'cadastro', component: CadastroComponent },
  {path: 'cadastro-tema', component: PostTemaComponent},
  {path: 'cadastro-interesse', component: PostInteresseComponent},
  {path: 'cadastro-comentario', component: PostComentarioComponent},
  {path: 'feed', component: FeedComponent},
  {path: 'perfil', component: PerfilComponent},
  {path: 'editar-post/:id', component: PutPostagemComponent},
  {path: 'delete-post/:id', component: DeletePostagemComponent},
  {path: 'editar-tema/:id', component: PutTemaComponent},
  {path: 'editar-interesse/:id', component: PutInteresseComponent},
  {path: 'editar-comentario/:id', component: PutComentarioComponent},
  {path: 'delete-tema/:id', component: DeleteTemaComponent},
  {path: 'delete-interesse/:id', component: DeleteInteresseComponent},
  {path: 'delete-comentario/:id', component: DeleteComentarioComponent},
  {path: 'informações', component: InformacoesComponent},
  {path: 'editar-cadastro', component: EditarCadastroComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
