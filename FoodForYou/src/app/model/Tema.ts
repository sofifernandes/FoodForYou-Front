import { Postagem } from './Postagem';

export class Tema {
  public id: number
  public descricao: string
  public qnt_posts: number
  public nome: string
  public postagem: Postagem[]
}