import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

import { MatInputModule } from '@angular/material/input';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule


  ], exports: 
  [
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule

  ]
})
export class MateriaModule { }
