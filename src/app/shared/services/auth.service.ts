import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Logins } from '../models/login';

const AUTH_API = 'http://localhost:3000/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

interface Credenciales {
  IdPersona: number;
  Clave: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(credenciales: Credenciales): Observable<any> {
    return this.http.post(
      `${AUTH_API}InicioSesion/login`,
      {
        IdPersona: credenciales.IdPersona,
        Clave: credenciales.Clave,
      },
      httpOptions
    );
  }
}
