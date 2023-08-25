import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

const lista = [
  MatDialogModule,
  MatIconModule,
  MatDividerModule,
  MatRadioModule,
  FormsModule,
  MatButtonModule,
  MatCardModule,
  MatTableModule,
  MatInputModule,
  MatFormFieldModule,
  MatCheckboxModule,
  ReactiveFormsModule,
];
@NgModule({
  exports: [...lista], // los 3 puntos son los elementos de la list, no lo vea como array, sino como los elementos que hay dentro
  imports: [...lista],
})
export class MaterialModule {}
