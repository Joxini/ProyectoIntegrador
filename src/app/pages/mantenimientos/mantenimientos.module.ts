import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MantenimientosRoutingModule } from './mantenimientos-routing.module';
import { MantenimientosComponent } from './mantenimientos.component';
import { MaterialModule } from 'src/app/material.module';
import { LoginComponent } from './login/login.component';
import { BecasComponent } from './becas/becas.component';
// import { AdminRegisterComponent } from './register/admin-register/admin-register.component';

@NgModule({
  declarations: [
    MantenimientosComponent,
    LoginComponent,
    BecasComponent,

    // AdminRegisterComponent,
  ],
  imports: [CommonModule, MantenimientosRoutingModule, MaterialModule],
})
export class MantenimientosModule {}
