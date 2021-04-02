import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sessiones } from 'src/app/Model/Sessiones/Sessiones';

@Component({
  selector: 'app-pagos-venta-mostrar',
  templateUrl: './pagos-venta-mostrar.component.html',
  styleUrls: ['./pagos-venta-mostrar.component.css']
})
export class PagosVentaMostrarComponent implements OnInit {

  constructor( private router: Router) { }

  sessionProducto = new Sessiones( this.router);
  ngOnInit(): void 
  {

    this.sessionProducto.eliminarSession("datosEditarProducto");
    Sessiones.eliminarSessionesReportes('editarMarca');
  }

}
