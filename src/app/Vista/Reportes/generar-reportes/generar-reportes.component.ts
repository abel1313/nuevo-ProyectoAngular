import { Component, NgZone, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Sessiones } from 'src/app/Model/Sessiones/Sessiones';
import { ServiceFerreteriaService } from 'src/app/Service/service-ferreteria.service';

@Component({
  selector: 'app-generar-reportes',
  templateUrl: './generar-reportes.component.html',
  styleUrls: ['./generar-reportes.component.css']
})
export class GenerarReportesComponent implements OnInit {

  constructor
  (
    private serviceFerreteria: ServiceFerreteriaService,
    private router: Router,
    private _ngZone: NgZone
  ) { }


  ngOnInit(): void 
  {

    Sessiones.eliminarSessionesReportes('editarMarca');
  }

  eventReporteVentas()
  {
    this.serviceFerreteria.serviceReportes.reportesVenta$.emit('reporteVenta');
  }
  eventReportePagosCliente()
  {
    this.serviceFerreteria.serviceReportes.reportesVenta$.emit('reportePagosCliente');
  }




}
