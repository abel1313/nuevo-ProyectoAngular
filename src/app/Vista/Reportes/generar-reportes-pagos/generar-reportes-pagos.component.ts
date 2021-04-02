import { Component, OnInit } from '@angular/core';
import { Sessiones } from 'src/app/Model/Sessiones/Sessiones';

@Component({
  selector: 'app-generar-reportes-pagos',
  templateUrl: './generar-reportes-pagos.component.html',
  styleUrls: ['./generar-reportes-pagos.component.css']
})
export class GenerarReportesPagosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void 
  {
    Sessiones.eliminarSessionesReportes('editarMarca');
  }

}
