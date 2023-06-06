import { Curso } from "./curso"

export class Perfil {
    id: number
    nombre: string
    apellido: string
    dni: number
    sexo: string
    edad: number
    cursos: Array<Curso>
}