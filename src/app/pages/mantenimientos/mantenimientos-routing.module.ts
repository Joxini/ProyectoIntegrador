import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MantenimientosComponent } from './mantenimientos.component';
import { LoginComponent } from './login/login.component';
import { BecasComponent } from './becas/becas.component';
// import { RegisterComponent } from './register/register.component';

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
