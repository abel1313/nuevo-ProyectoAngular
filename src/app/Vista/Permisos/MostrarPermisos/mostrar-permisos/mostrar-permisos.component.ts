import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sessiones } from 'src/app/Model/Sessiones/Sessiones';

@Component({
  selector: 'app-mostrar-permisos',
  templateUrl: './mostrar-permisos.component.html',
  styleUrls: ['./mostrar-permisos.component.css']
})
export class MostrarPermisosComponent implements OnInit {

  constructor( private router: Router) { }


  sessionProducto = new Sessiones( this.router );

  ngOnInit(): void 
  {

    this.sessionProducto.eliminarSession("datosEditarProducto");
  }

}
