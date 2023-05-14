import { Tema } from './Tema';
import { User } from './User';
import { Interesse } from './Interesse';

export class Postagem {
  public id: number
  public titulo: string
  public textoPostagem: string
  public data: Date
  public tema: Tema
  public interesse: Interesse
  public qntCurtidas: number
  public tipoPostagem: string
  public usuario: User
}