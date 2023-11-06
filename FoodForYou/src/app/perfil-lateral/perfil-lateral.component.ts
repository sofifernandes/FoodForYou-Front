import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { environment } from '../../environments/environment.prod';

@Component({
  selector: 'app-perfil-lateral',
  templateUrl: './perfil-lateral.component.html',
  styleUrls: ['./perfil-lateral.component.css']
})
export class PerfilLateralComponent implements OnInit {

  nome: string
  user: User = new User()
  nomeUser = environment.nomeUser
  fotoUser = environment.fotoUser

  constructor(
    private router: Router
  ) { }    

  ngOnInit() {
    this.nomeUser = environment.nomeUser
    this.fotoUser = environment.fotoUser
  }

  editNome() {
    this.router.navigate(['/editar-cadastro'])
  }

}