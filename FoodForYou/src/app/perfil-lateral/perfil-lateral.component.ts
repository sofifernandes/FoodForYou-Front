import { Component, OnInit } from '@angular/core';
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

  constructor() { }    

  ngOnInit() {

  }

}