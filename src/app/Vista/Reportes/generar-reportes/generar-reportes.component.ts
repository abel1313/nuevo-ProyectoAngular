import { Component, NgZone, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
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

  

  mostrarVistas: Boolean = false;
  mostrarVistas$: Observable<Boolean>;

  ngOnInit(): void 
  {
this.mostrarVista();
  }

  eventReporteVentas()
  {
    this.serviceFerreteria.serviceReportes.reportesVenta$.emit('reporteVenta');
  }
  eventReportePagosCliente()
  {
    this.serviceFerreteria.serviceReportes.reportesVenta$.emit('reportePagosCliente');
  }

mostrarVista()
{
  this.mostrarVistas$ = this.serviceFerreteria.serviceReportes.mostrandoVistasReportes$;
  this.mostrarVistas$.subscribe
  (
    ( res: Boolean )=>
    {
      this.mostrarVistas = res;
    }
  );
}



}
