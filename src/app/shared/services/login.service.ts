import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  login(IdPersona: number, Clave: string): Observable<any> {
    const credentials = { IdPersona, Clave };
    return this.http.post<any>(
      'https://localhost:3000/InicioSesion/login',
      credentials
    );
  }
}
