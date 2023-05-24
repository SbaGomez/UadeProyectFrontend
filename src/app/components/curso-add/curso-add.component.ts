import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Curso } from 'src/app/models/curso';
import { CursoService } from 'src/app/services/curso.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-curso-add',
  templateUrl: './curso-add.component.html',
  styleUrls: ['./curso-add.component.css']
})
export class CursoAddComponent {

  @ViewChild('modalAdd') modalAdd: any;
  curso = new Curso();
  cursoForm: FormGroup;

  constructor(private cursoservices: CursoService, private modalService: NgbModal) { }

  ngOnInit() {
    this.curso.nombre = "";
    this.curso.duracion = 0;
    this.cursoForm = new FormGroup({
      nombre: new FormControl(this.curso.nombre, {
        validators: [Validators.required],
        updateOn: 'blur'
      }),
      duracion: new FormControl(this.curso.duracion || '', {
        validators: [Validators.required],
        updateOn: 'blur'
      })
    });
    document.getElementsByTagName('input')[0].focus()
  }

  get nombre() {
    return this.cursoForm.get('nombre');
  }
  get duracion() {
    return this.cursoForm.get('duracion');
  }

  public mensajeExito: string = '';

  addCurso() {
    if (this.cursoForm.valid) {
      const curso = new Curso();
      curso.nombre = this.nombre.value;
      curso.duracion = this.duracion.value;
  
      this.cursoservices.add(curso).subscribe(
        () => {
          this.nombre.setValue('');
          this.duracion.setValue('');
          document.getElementsByTagName('input')[0].focus();
  
          this.mensajeExito = `Curso ${curso.nombre} registrado`;
          this.openModal(); // Abrir el modal de éxito
        },
        (error) => {
          console.error(error);
          if (error.error.text == 'Curso registrado') {
            this.mensajeExito = `Curso ${curso.nombre} registrado`;
            this.openModal(); // Abrir el modal de éxito
          }
          document.getElementsByTagName('input')[0].focus();
        }
      );
    } else {
      alert('Por favor, complete todos los campos obligatorios.');
    }
  }
  

  openModal() {
    this.modalService.open(this.modalAdd).result.then(
      (result) => {
        if (result === 'close') {
          location.reload();
        }
      },
      (reason) => {
        // Manejar cualquier error o rechazo del modal si es necesario
      }
    );
  }


}
