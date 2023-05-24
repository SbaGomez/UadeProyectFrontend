import { Component } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Curso } from 'src/app/models/curso';
import { CursoService } from 'src/app/services/curso.service';


@Component({
  selector: 'app-curso-add',
  templateUrl: './curso-add.component.html',
  styleUrls: ['./curso-add.component.css']
})
export class CursoAddComponent {

  curso = new Curso()
  cursoForm: FormGroup

  constructor(
    private cursoservices: CursoService) { }

  ngOnInit() {
    this.curso.nombre = "";
    this.curso.duracion = 0;
    this.cursoForm = new FormGroup({
      'nombre': new FormControl(this.curso.nombre, { validators: [Validators.required], updateOn: 'blur'}),
      'duracion': new FormControl(this.curso.duracion, Validators.required)
    })
  }

  get nombre() {return this.cursoForm.get('nombre')}
  get duracion() {return this.cursoForm.get('duracion')}

  addCurso() {
    let curso = new Curso();
    curso.nombre = this.curso.nombre
    curso.duracion = this.curso.duracion;
    this.cursoservices.add(curso).subscribe(() => {
      this.curso.nombre = ""
      this.curso.duracion = 0
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
