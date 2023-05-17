import { Perfil } from "./perfil"

export class Curso {
    id: number
    nombre: string
    duracion: string
    perfiles: Array<Perfil>
}