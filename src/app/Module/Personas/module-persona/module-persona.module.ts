import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgregarPersonaComponent } from 'src/app/Vista/Personas/AgregarPersona/agregar-persona/agregar-persona.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { MateriaModule } from '../../materia/materia.module';



@NgModule({
  declarations: 
  [
    AgregarPersonaComponent
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AutocompleteLibModule,
    MateriaModule
  ],
  exports: 
  [
AutocompleteLibModule,
AgregarPersonaComponent
  ],

  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ]
})
export class ModulePersonaModule { }
