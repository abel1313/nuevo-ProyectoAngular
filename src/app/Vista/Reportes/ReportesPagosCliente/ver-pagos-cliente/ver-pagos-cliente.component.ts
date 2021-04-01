import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { IDTOPagoReporte } from 'src/app/Model/DTO/DROPagosRepostes/IDTOPagoReporte';
import { IDTOPagosServer } from 'src/app/Model/DTO/DROPagosRepostes/IDTOPagosServer';
import { Sessiones } from 'src/app/Model/Sessiones/Sessiones';
import { ServiceFerreteriaService } from 'src/app/Service/service-ferreteria.service';

@Component({
  selector: 'app-ver-pagos-cliente',
  templateUrl: './ver-pagos-cliente.component.html',
  styleUrls: ['./ver-pagos-cliente.component.css']
})
export class VerPagosClienteComponent implements OnInit {

  constructor
  (
    private serviceFerreteria: ServiceFerreteriaService,
    private router: Router,
    private _ngZone: NgZone
  ) { }

  reportesPagosVentas$: Observable<IDTOPagoReporte[]>;

  datosPagosVentas: IDTOPagoReporte[];
  subscription: Subscription;
  guardandos$: Observable<string>;

  datosPagosRealizados$: Observable<IDTOPagosServer>;

  ngOnInit(): void 
  {
this.obtenerDatosVentas();
  }

  obtenerDatosVentas()
  {
    this.datosPagosVentas = sessionStorage.getItem('sesionPagos') != null ?
    JSON.parse(sessionStorage.getItem('sesionPagos')) : null ;
  }


  cancelarReporteVentas()
  {
    Sessiones.eliminarSessionesReportes('sesionPagos');

    this.serviceFerreteria.serviceReportes
    .mostrandoVistasReportes$.emit(false);
  }
  verPagos( item: IDTOPagoReporte )
  {
    
//     this.datosPagosRealizados$ = this.serviceFerreteria.serviceReportes
//     .obtenerReportesPagosCliente( item.id);
//     this.datosPagosRealizados$
//     .subscribe
//     (
//       ( res: IDTOPagosServer )=>
//       {
//         console.log(res, " res");
//         sessionStorage.setItem('generarReportePagos', JSON.stringify(res));
// this.router.navigateByUrl('reportes/generar-reportes-pagos');
//       }
//     );
    
  }


  pdf()
  {}
}
