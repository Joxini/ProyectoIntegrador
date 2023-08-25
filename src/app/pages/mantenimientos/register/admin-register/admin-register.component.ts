// import { Component, Inject } from '@angular/core';
// import { MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { UsuariosForm } from 'src/app/shared/formsModels/usuariosForm';
// import { UsuariosService } from 'src/app/shared/services/usuarios.service';
// @Component({
//   selector: 'app-admin-register',
//   templateUrl: './admin-register.component.html',
//   styleUrls: ['./admin-register.component.scss'],
// })
// export class AdminRegisterComponent {
//   titulo = 'Crear Persona';
//   isCreate = true;
//   constructor(
//     public usuariosForm: UsuariosForm,
//     private srvUsuarios: UsuariosService,
//     @Inject(MAT_DIALOG_DATA) public data: { usuario: any }
//   ) {}
//   ngOnInit() {
//     if (this.data?.usuario) {
//       this.isCreate = false;
//       this.titulo = 'Modificar Persona';
//       this.cargarDatosForm();
//     } else {
//       this.isCreate = true;
//       this.titulo = 'Crear Persona';
//     }
//   }

//   cargarDatosForm() {
//     this.usuariosForm.baseForm.patchValue({
//       IdPersona: this.data.usuario.IdPersona,
//       Identificacion: this.data.usuario.Identificacion,
//       Nombre: this.data.usuario.Nombre,
//       Apellido1: this.data.usuario.Apellido1,
//       Apellido2: this.data.usuario.Apellido2,
//       Genero: this.data.usuario.Genero,
//       FechaNacimiento: this.data.usuario.FechaNacimiento,
//       estado: true,
//     });
//   }

//   guardar() {
//     if (this.usuariosForm.baseForm.valid) {
//       if (this.isCreate) {
//         this.srvUsuarios.guardar(this.usuariosForm.baseForm.value).subscribe(
//           (dato) => {
//             this.usuariosForm.baseForm.reset();
//             alert('Se guardo el usuario');
//           },
//           (error) => {
//             alert('Error al guardar');
//           }
//         );
//       }
//     }
//   }
// }
