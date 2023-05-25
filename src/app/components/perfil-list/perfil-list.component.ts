import { Component, OnInit } from '@angular/core';
import { Perfil } from 'src/app/models/perfil';
import { PerfilService } from 'src/app/services/perfil.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-perfil-list',
  templateUrl: './perfil-list.component.html',
  styleUrls: ['./perfil-list.component.css']
})
export class PerfilListComponent implements OnInit {

  perfilList: Array<Perfil>
  nombre = "";
  apellido = "";
  dni = "";
  sexo = "";
  edad = "";

  constructor(
    private perfilservices: PerfilService,
    private modalService: NgbModal,
    private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Perfil List');
    this.perfilservices.getAll().subscribe(cursoresponse => {
      this.perfilList = cursoresponse
    }, error => {
      console.log(error)
    })
  }

  view(updateModal: any, perfil: Perfil) {
    this.nombre = perfil.nombre;
    this.apellido = perfil.apellido;
    this.dni = perfil.dni.toString();
    this.sexo = perfil.sexo;
    this.edad = perfil.edad.toString();
    this.modalService.open(updateModal).result.then(() => {
      if (this.nombre.trim() !== '' && this.apellido.trim() !== '') {
        perfil.nombre = this.nombre;
        perfil.apellido = this.apellido;
        perfil.sexo = this.sexo;
        perfil.edad = parseInt(this.edad);
        perfil.dni = parseInt(this.dni);
        this.perfilservices.edit(perfil).subscribe(() => {
          location.reload();
        }, error => {
          console.error(error)
        })
      }
    })
  }

  delete(id: number) {
    this.perfilservices.delete(id).subscribe(() => {
      location.reload()
    }, error => {
      console.error(error)
      if (error.status === 500) {
        alert('Error: el curso tiene inscriptos, eliminelos primero y luego vuelva a intentarlo.')
      }
    })
  }
}
