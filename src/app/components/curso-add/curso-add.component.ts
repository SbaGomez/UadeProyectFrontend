import { Component, ViewChild } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Curso } from 'src/app/models/curso';
import { CursoService } from 'src/app/services/curso.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-curso-add',
  templateUrl: './curso-add.component.html',
  styleUrls: ['./curso-add.component.css']
})
export class CursoAddComponent {

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private cursoservices: CursoService,
    private modalService: NgbModal,
    private titleService: Title) {
    this.cursoForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      duracion: ['', Validators.required]
    });
  }

  public mensajeExito: string = '';
  public mensajeError: string = '';
  public mensajeTitulo: string = '';

  @ViewChild('modalAdd') modalAdd: any;
  curso = new Curso();
  cursoForm: FormGroup;



  ngOnInit() {
    this.titleService.setTitle('Curso Add');
    this.curso.nombre = "";
    this.curso.duracion = 0;
    this.cursoForm = new FormGroup({
      nombre: new FormControl(this.curso.nombre, {
        validators: [Validators.required],
        updateOn: 'blur'
      }),
      duracion: new FormControl(this.curso.duracion || '', {
        validators: [Validators.required, Validators.pattern('^[0-9]*$'), Validators.maxLength(2)],
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
        },
        (error) => {
          console.error(error);
          if (error.error.text == 'Curso registrado') {
            this.mensajeTitulo = "Registro Exitoso"
            this.mensajeExito = `El curso ${curso.nombre} fue registrado exitosamente.`;
            this.openModal(); // Abrir el modal de éxito
          }
          document.getElementsByTagName('input')[0].focus();
        }
      );
    } else {
      this.mensajeError = "Por favor, complete todos los campos obligatorios."
    }
  }

  openModal() {
    const modalRef = this.modalService.open(this.modalAdd);

    modalRef.result.then(
      (result) => {
        // Manejar cierre del modal
        if (result === 'close') {
          this.router.navigate(['/app-curso-list']);
        }
      },
      (reason) => {
        // Manejar cualquier error o rechazo del modal si es necesario
      }
    );

    // Agregar evento hidden para redirigir al hacer clic fuera del modal
    modalRef.hidden.subscribe(() => {
      this.router.navigate(['/app-curso-list']);
    });
  }

}
