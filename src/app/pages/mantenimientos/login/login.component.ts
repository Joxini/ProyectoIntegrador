import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  IdPersona: number;
  Clave: string;

  constructor(
    public loginService: LoginService,
    private authService: AuthService
  ) {}

  login() {
    console.log('IdPersona:', this.IdPersona);
    console.log('Clave:', this.Clave);

    const IdPersona = this.IdPersona;
    const Clave = this.Clave;
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
