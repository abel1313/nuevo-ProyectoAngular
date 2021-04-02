import { Component, OnInit } from '@angular/core';
import { Sessiones } from 'src/app/Model/Sessiones/Sessiones';

@Component({
  selector: 'app-reportes-pagos',
  templateUrl: './reportes-pagos.component.html',
  styleUrls: ['./reportes-pagos.component.css']
})
export class ReportesPagosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    Sessiones.eliminarSessionesReportes('editarMarca');
  }

}
