import { Postagem } from './postagem'
  
export class User {
    public id: number
    public nome: string
    public usuario: string
    public senha: string
    public email: string
    public postagem: Postagem[]
    public foto: string
    public admin: boolean
  }