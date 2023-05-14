import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/models/curso';
import { CursoService } from 'src/app/services/curso.service';

@Component({
  selector: 'app-curso-list',
  templateUrl: './curso-list.component.html',
  styleUrls: ['./curso-list.component.css']
})
export class CursoListComponent implements OnInit{

  cursoList: Array<Curso>

  constructor(
    private cursoservices: CursoService){}

  ngOnInit(): void {
    
      this.cursoservices.getAll().subscribe(cursoresponse => {
        this.cursoList = cursoresponse
      },error => {
        console.log(error)
      })
    
  }

  delete(id: number) {
    this.cursoservices.delete(id).subscribe(() => {
      location.reload()
      alert('Baja Exitosa!')
    }, error => {
      console.error(error)
      if (error.status === 500) {
        alert('Error: el curso tiene inscriptos, eliminelos primero y luego vuelva a intentarlo.')
      }
    })
  }

}
