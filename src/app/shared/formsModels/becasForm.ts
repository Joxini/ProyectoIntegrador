import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Injectable({ providedIn: 'root' }) //todos los formGroup deben llevar esta linea
export class becasForm {
    becasForm: any;
    constructor(private fb: FormBuilder) {
        this.becasForm = this.fb.group({
            IdSolicitud: ['', [Validators.required]],
            estado: ['', [Validators.required]],
            observaciones: ['', [Validators.required]],
            tipo: ['', [Validators.required]],
        });
    }

}