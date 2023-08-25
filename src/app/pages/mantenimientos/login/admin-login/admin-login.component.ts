import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service'; // Asegúrate de importar correctamente el AuthService
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
})
export class AdminLoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      IdPersona: ['', Validators.required],
      Clave: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const credentials = {
      IdPersona: this.loginForm.value.username,
      Clave: this.loginForm.value.password,
    };

    const IdPersona = this.loginForm.value.IdPersona;
    const Clave = this.loginForm.value.password;
    const credenciales = { IdPersona, Clave };
    this.authService.login(credenciales).subscribe(
      (response) => {
        // Guardar el token
        localStorage.setItem('token', response.token);
        localStorage.setItem('idPersona', response.idPersona);
        localStorage.setItem('Clave', response.Clave);
        console.log('response', response);
      },
      (error) => {
        // Error de autenticación
        console.error('Error de autenticación:', error);
      }
    );
  }
}
