import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MantenimientosComponent } from './mantenimientos.component';
import { LoginComponent } from './login/login.component';
import { BecasComponent } from './becas/becas.component';
// import { RegisterComponent } from './register/register.component';

/* Las `rutas constantes: Rutas` es una matriz de objetos de ruta que definen las rutas para la
aplicación Angular. Cada objeto de ruta tiene una propiedad `ruta` que especifica la ruta URL para
la ruta y una propiedad `componente` que especifica el componente que se representará cuando se
active la ruta. */

const routes: Routes = [
  { path: 'index', component: MantenimientosComponent },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'becas', component: BecasComponent }
  // { path: 'registro', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MantenimientosRoutingModule { }
