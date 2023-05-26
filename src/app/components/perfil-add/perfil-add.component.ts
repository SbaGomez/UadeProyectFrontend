import { Component, ViewChild, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Perfil } from 'src/app/models/perfil';
import { PerfilService } from 'src/app/services/perfil.service';

@Component({
  selector: 'app-perfil-add',
  templateUrl: './perfil-add.component.html',
  styleUrls: ['./perfil-add.component.css']
})
export class PerfilAddComponent implements OnInit {

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private perfilservices: PerfilService,
    private modalService: NgbModal,
    private titleService: Title) {
    this.perfilForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', Validators.required],
      sexo: ['', Validators.required],
      dni: ['', Validators.required]
    });
  }

  public mensajeExito: string = '';
  public mensajeError: string = '';
  public mensajeTitulo: string = '';

  @ViewChild('modalAdd') modalAdd: any;
  perfil = new Perfil();
  perfilForm: FormGroup;

  ngOnInit() {
    this.titleService.setTitle('Perfil Add');
    this.perfil.nombre = "";
    this.perfil.apellido = "";
    this.perfil.edad = 0;
    this.perfil.sexo = "";
    this.perfil.dni = 0;
    this.perfilForm = new FormGroup({
      nombre: new FormControl(this.perfil.nombre, {
        validators: [Validators.required],
        updateOn: 'blur'
      }),
      apellido: new FormControl(this.perfil.apellido, {
        validators: [Validators.required],
        updateOn: 'blur'
      }),
      edad: new FormControl(this.perfil.edad || '', {
        validators: [Validators.required, Validators.pattern('^[0-9]*$'), Validators.maxLength(2)],
        updateOn: 'blur'
      }),
      sexo: new FormControl(this.perfil.sexo, {
        validators: [Validators.required, Validators.maxLength(1)],
        updateOn: 'blur'
      }),
      dni: new FormControl(this.perfil.dni || '', {
        validators: [Validators.required, Validators.pattern('^[0-9]*$'), Validators.maxLength(8)],
        updateOn: 'blur'
      })
    });
    document.getElementsByTagName('input')[0].focus()
  }

  get nombre() {
    return this.perfilForm.get('nombre');
  }
  get apellido() {
    return this.perfilForm.get('apellido');
  }
  get edad() {
    return this.perfilForm.get('edad');
  }
  get sexo() {
    return this.perfilForm.get('sexo');
  }
  get dni() {
    return this.perfilForm.get('dni');
  }

  addPerfil() {
    if (this.perfilForm.valid) {
      const perfil = new Perfil();
      perfil.nombre = this.nombre.value;
      perfil.apellido = this.apellido.value;
      perfil.edad = this.edad.value;
      perfil.sexo = this.sexo.value;
      perfil.dni = this.dni.value;
      this.perfilservices.add(perfil).subscribe(
        () => {
          this.nombre.setValue('');
          this.apellido.setValue('');
          this.edad.setValue('');
          this.sexo.setValue('');
          this.dni.setValue('');
          document.getElementsByTagName('input')[0].focus();
        },
        (error) => {
          console.error(error);
          if (error.error.text == 'Perfil registrado') {
            this.mensajeTitulo = "Registro Exitoso"
            this.mensajeExito = `El perfil ${perfil.nombre} fue registrado exitosamente.`;
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
          this.router.navigate(['/app-perfil-list']);
        }
      },
      (reason) => {
        // Manejar cualquier error o rechazo del modal si es necesario
      }
    );

    // Agregar evento hidden para redirigir al hacer clic fuera del modal
    modalRef.hidden.subscribe(() => {
      this.router.navigate(['/app-perfil-list']);
    });
  }

}
