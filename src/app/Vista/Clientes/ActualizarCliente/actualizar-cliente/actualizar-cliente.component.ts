import { Component, OnInit } from '@angular/core';
import { Sessiones } from 'src/app/Model/Sessiones/Sessiones';

@Component({
  selector: 'app-actualizar-cliente',
  templateUrl: './actualizar-cliente.component.html',
  styleUrls: ['./actualizar-cliente.component.css']
})
export class ActualizarClienteComponent implements OnInit {

  constructor() { }

  ngOnInit(): void 
  {

    Sessiones.eliminarSessionesReportes('editarMarca');
  }

}
