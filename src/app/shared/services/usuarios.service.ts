import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Logins } from '../models/login';
import { Usuarios } from '../models/usuarios';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  getAll(): Observable<Usuarios[]> {
    return this.http.get<Usuarios[]>('http://localhost:3000/usuarios');
  }
  guardar(login: Logins): Observable<Logins> {
    return this.http
      .post<Logins>('http://localhost:3000/InicioSesion/login', login)
      .pipe(catchError(this.handlerError));
  }
  constructor(private http: HttpClient) {}

  login(log: Logins): Observable<Logins> {
    return this.http
      .post<Logins>('http://localhost:3000/InicioSesion/login', log)
      .pipe(catchError(this.handlerError));
  }
  register(user: any): Observable<any> {
    return this.http
      .post('https://localhost:3000/register', user)
      .pipe(catchError(this.handlerError));
  }
  handlerError(error: any): Observable<never> {
    console.log(error);
    return throwError(error);
  }
}
