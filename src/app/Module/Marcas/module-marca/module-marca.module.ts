import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';





import { AgregarMarcasComponent } from 'src/app/Vista/Marcas/Nuevo/agregar-marcas/agregar-marcas.component';


import { ModuleMarcaRoutingModule } from './module-marca-routing.module';
import { BuscarMarcasComponent } from 'src/app/Vista/Marcas/Buscar/buscar-marcas/buscar-marcas.component';
import { EditarMarcaComponent } from 'src/app/Vista/Marcas/Editar/editar-marca/editar-marca.component';


import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';



import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: 
  [
AgregarMarcasComponent,
BuscarMarcasComponent,
EditarMarcaComponent

  ],
  imports: [
    CommonModule,
    ModuleMarcaRoutingModule,
    // HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    AutocompleteLibModule,
    MatPaginatorModule,
    MatTableModule,
    

    
  ],
  // providers: [ServiceFerreteriaService]
})
export class ModuleMarcaModule { }
