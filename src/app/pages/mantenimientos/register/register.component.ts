// import { Component } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
// import { MatTableDataSource } from '@angular/material/table';
// import { UsuariosService } from 'src/app/shared/services/usuarios.service';
// import { AdminRegisterComponent } from './admin-register/admin-register.component';
// import { Usuarios } from 'src/app/shared/models/usuarios';

// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.scss'],
// })
// export class RegisterComponent {
//   IdPersona: number;
//   Identificacion: string;
//   Nombre: string;
//   Apellido1: string;
//   Apellido2: string;
//   Genero: string;
//   FechaNacimiento: Date;

//   dataSource = new MatTableDataSource();

//   constructor(private srvUsuarios: UsuariosService, public dialog: MatDialog) {}
//   ngOnInit() {
//     this.srvUsuarios.getAll().subscribe((datos) => {
//       this.dataSource.data = datos;
//     });
//   }

//   applyFilter(event: Event) {
//     const filterValue = (event.target as HTMLInputElement).value;
//     this.dataSource.filter = filterValue.trim().toLowerCase();
//   }
//   abrirDialog(usuario?: Usuarios): void {
//     if (usuario) {
//       this.dialog.open(AdminRegisterComponent, {
//         width: '700px',
//         height: '700px',
//         data: { usuario },
//       });
//     } else {
//       this.dialog.open(AdminRegisterComponent, {
//         width: '700px',
//         height: '700px',
//       });
//     }
//   }
// }
