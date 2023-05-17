import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/models/curso';
import { CursoService } from 'src/app/services/curso.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-curso-list',
  templateUrl: './curso-list.component.html',
  styleUrls: ['./curso-list.component.css']
})
export class CursoListComponent implements OnInit {

  cursoList: Array<Curso>
  nombre = "";
  duracion = "";

  constructor(
    private cursoservices: CursoService,
    private modalService: NgbModal) { }

  ngOnInit(): void {

    this.cursoservices.getAll().subscribe(cursoresponse => {
      this.cursoList = cursoresponse
    }, error => {
      console.log(error)
    })

  }

  view(updateModal: any, curso: Curso) {
      this.nombre = curso.nombre
      this.duracion = curso.duracion
      this.modalService.open(updateModal).result.then(() => {
        if(this.nombre.trim() !== '' && this.duracion.trim() !== '')
        {
          curso.nombre = this.nombre;
          curso.duracion = this.duracion;
          this.cursoservices.edit(curso).subscribe(() => {
            location.reload();
          }, error => {
            console.error(error)
          })
        }
      })
  }

  delete(id: number) {
    this.cursoservices.delete(id).subscribe(() => {
      location.reload()
    }, error => {
      console.error(error)
      if (error.status === 500) {
        alert('Error: el curso tiene inscriptos, eliminelos primero y luego vuelva a intentarlo.')
      }
    })
  }

}
