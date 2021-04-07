import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

import { MatInputModule } from '@angular/material/input';


import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import {MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // BrowserAnimationsModule,



  ], exports: 
  [
    // BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    AutocompleteLibModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    MatDatepickerModule,
    MatProgressBarModule,
    MatSidenavModule
    


  ]
})
export class MateriaModule { }
