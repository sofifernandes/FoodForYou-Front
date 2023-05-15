import { Postagem } from './Postagem';
import { Comentario } from './Comentario';
  
export class User {
    public id: number
    public nome: string
    public usuario: string
    public senha: string
    public email: string
    public postagem: Postagem[]
    public comentario: Comentario[]
    public foto: string
    public admin: boolean
  }