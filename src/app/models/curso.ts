import { Perfil } from "./perfil"

export class Curso {
    id: number
    nombre: string
    duracion: number
    perfiles: Array<Perfil>
}