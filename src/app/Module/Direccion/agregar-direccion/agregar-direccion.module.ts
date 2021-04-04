import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgregarDireccionComponent } from 'src/app/Vista/Direccion/agregar-direccion/agregar-direccion.component';
import { AutocompleteLibComponent } from 'angular-ng-autocomplete';
import { FormsModule } from '@angular/forms';
import { MateriaModule } from '../../materia/materia.module';



@NgModule({
  declarations: 
  [
    AgregarDireccionComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    MateriaModule
  ],
  exports:
  [
    AgregarDireccionComponent
  ]
})
export class AgregarDireccionModule { }
