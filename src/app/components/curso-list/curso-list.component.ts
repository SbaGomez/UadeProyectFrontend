import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Curso } from 'src/app/models/curso';
import { CursoService } from 'src/app/services/curso.service';
import 'jquery';
import 'popper.js';

@Component({
  selector: 'app-curso-list',
  templateUrl: './curso-list.component.html',
  styleUrls: ['./curso-list.component.css']
})
export class CursoListComponent implements OnInit{

  cursoList: Array<Curso>

  constructor(private cursoservices: CursoService){}

  ngOnInit(): void {
    
      this.cursoservices.getAll().subscribe(cursoresponse => {
        this.cursoList = cursoresponse
        alert(cursoresponse)
      },error => {
        console.log(error)
      })
    
  }
  

}
