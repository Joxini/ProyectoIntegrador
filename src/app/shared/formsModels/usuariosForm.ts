import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Injectable({ providedIn: 'root' }) //todos los formGroup deben llevar esta linea
export class UsuariosForm {
  baseForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.baseForm = this.fb.group({
      IdPersona: ['', [Validators.required]],
      Identificacion: ['', [Validators.required]],
      Nombre: ['', [Validators.required]],
      Apellido1: ['', [Validators.required]],
      Apellido2: [Date.now, [Validators.required]],
      Genero: ['', [Validators.email]],
      FechaNacimiento: ['', [Validators.required]],
    });
  }
}
