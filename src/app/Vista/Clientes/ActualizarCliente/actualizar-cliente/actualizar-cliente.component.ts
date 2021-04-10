import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sessiones } from 'src/app/Model/Sessiones/Sessiones';

@Component({
  selector: 'app-actualizar-cliente',
  templateUrl: './actualizar-cliente.component.html',
  styleUrls: ['./actualizar-cliente.component.css']
})
export class ActualizarClienteComponent implements OnInit {

  constructor( private router: Router ) { }

  ngOnInit(): void 
  {

    //Sessiones.eliminarSessionesReportes('editarMarca');


    new Sessiones( this.router ).interfazEditar( 'ediatrCliente', 'productos/buscar');

  }

}
