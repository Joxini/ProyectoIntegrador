import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource } from '@angular/material/table';


export interface PeriodicElements {
  id: string;
  fecha: string;
  estado: string;
  observaciones: string;
}


const becas: PeriodicElements[] = [
  { id: '965', fecha: '2002-06-0', estado: 'activa', observaciones: 'pdf' },
  { id: '965', fecha: '2002-06-01', estado: 'activa', observaciones: 'pdf' },
  { id: '965', fecha: '2002-06-01', estado: 'activa', observaciones: 'pdf' },
  { id: '965', fecha: '2002-06-01', estado: 'activa', observaciones: 'pdf' },
  { id: '965', fecha: '2002-06-01', estado: 'activa', observaciones: 'pdf' },

];

@Component({
  selector: 'app-becas',
  templateUrl: './becas.component.html',
  styleUrls: ['./becas.component.scss']
})
export class BecasComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  displayedColumns: string[] = ['id', 'fecha', 'estado', 'observaciones'];
  dataSource = new MatTableDataSource();
  columnas = [
    { titulo: "id", name: "id" },
    { titulo: "fecha", name: "fecha" },
    { titulo: "estado", name: "estado" },
    { titulo: "observaciones", name: "observaciones" },





  ]


}
