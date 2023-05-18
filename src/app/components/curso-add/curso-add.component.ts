import { Component } from '@angular/core';
import { Curso } from 'src/app/models/curso';
import { CursoService } from 'src/app/services/curso.service';

@Component({
  selector: 'app-curso-add',
  templateUrl: './curso-add.component.html',
  styleUrls: ['./curso-add.component.css']
})
export class CursoAddComponent {

  constructor(
    private cursoservices: CursoService) { }

  nombre = "";
  duracion = "";

  addCurso() {
    let curso = new Curso();
    curso.nombre = this.nombre
    curso.duracion = this.duracion
    this.cursoservices.add(curso).subscribe(() => {
      this.nombre = ""
      this.duracion = ""
      console.log(curso);
      location.reload()
      document.getElementsByTagName("input")[0].focus()

    }, error => {
      console.error(error)
      alert('Error: ' + error.error.message)
      document.getElementsByTagName('input')[0].focus()
    })
  }
}
