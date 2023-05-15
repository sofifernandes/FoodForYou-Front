
import { User } from './User';
import { Postagem } from './Postagem';

export class Comentario {
  public id: number
  public comentario: string
  public data: Date
  public postagem: Postagem
  public usuario: User
  public postId: number

  constructor() {
    this.data = new Date();
  }
}