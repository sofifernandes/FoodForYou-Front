import { Postagem } from './postagem';
import { Comentario } from './comentario';
  
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