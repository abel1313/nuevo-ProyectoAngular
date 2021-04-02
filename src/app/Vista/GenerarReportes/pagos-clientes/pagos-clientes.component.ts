import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { IDTOPagoReporte } from 'src/app/Model/DTO/DROPagosRepostes/IDTOPagoReporte';
import { IDTOPagosServer } from 'src/app/Model/DTO/DROPagosRepostes/IDTOPagosServer';
import { Sessiones } from 'src/app/Model/Sessiones/Sessiones';
import { ServiceFerreteriaService } from 'src/app/Service/service-ferreteria.service';

@Component({
  selector: 'app-pagos-clientes',
  templateUrl: './pagos-clientes.component.html',
  styleUrls: ['./pagos-clientes.component.css']
})
export class PagosClientesComponent implements OnInit {

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

  datosReporteVentas$: Observable<IDTOPagoReporte[]>;


  spinnerPagos: Boolean = false;
  btnCancelarPagos: Boolean = false;
  ngOnInit(): void {
    this.obtenerDatosVentas();
    Sessiones.eliminarSessionesReportes('editarMarca');
  }



  obtenerDatosVentas() {
    this.datosPagosVentas = sessionStorage.getItem('reportePagoCliente') != null ?
      JSON.parse(sessionStorage.getItem('reportePagoCliente')) : null;
  }


  eliminarSession(nombreSession: string) {
    if (sessionStorage.getItem(nombreSession) != null) {
      sessionStorage.removeItem(nombreSession);
    }
  }
  cancelarReporteVentas() {

    this.eliminarSession('sesionPagos');
    this.eliminarSession('reportePagoCliente');

    this.router.navigateByUrl('ventas/buscar');
  }
  verPagos(item: IDTOPagoReporte) {
    this._ngZone.runOutsideAngular(() => {
      this.datosPagosRealizados$ = this.serviceFerreteria.serviceReportes
        .obtenerReportesPagosCliente(item.id);
      this.datosPagosRealizados$
        .subscribe
        (
          (res: IDTOPagosServer) => {
            this._ngZone.run(() => {
              sessionStorage.setItem('generarReportePagos', JSON.stringify(res));
              this.router.navigateByUrl('reportes/ventaspagoscliente');
            });
          }
        );
    });

  }

}
