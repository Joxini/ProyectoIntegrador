import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Injectable({ providedIn: 'root' }) //todos los formGroup deben llevar esta linea
export class LoginForm {
  baseForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.baseForm = this.fb.group({
      IdPersona: ['', [Validators.required]],
      Clave: ['', [Validators.required]],
    });
  }
}
