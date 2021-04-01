import { Component, NgZone, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { IDTOClientePersona } from 'src/app/Model/Clientes/IDTOClientePersona';
import { IDTOPagoReporte } from 'src/app/Model/DTO/DROPagosRepostes/IDTOPagoReporte';
import { DTOReportesVentas } from 'src/app/Model/Reportes/DTOReportesVentas';
import { IDTOReportesVentas } from 'src/app/Model/Reportes/IDTOReportesVentas';
import { IReporteVenta } from 'src/app/Model/Reportes/IReporteVenta';
import { ServiceFerreteriaService } from 'src/app/Service/service-ferreteria.service';
import { GenerarReportesVentasComponent } from '../generar-reportes-ventas/generar-reportes-ventas.component';

@Component({
  selector: 'app-fechas-venta',
  templateUrl: './fechas-venta.component.html',
  styleUrls: ['./fechas-venta.component.css']
})
export class FechasVentaComponent implements OnInit {

  constructor
    (
      private router: Router,
      private serviceFerreteria: ServiceFerreteriaService,
      private _ngZone: NgZone

    ) { }

  reporteVentas = new DTOReportesVentas();

  reporteEmit$: Observable<string>;

  reporteVentas$: Observable<any>;

  reporteVenta: Boolean = false;
  reportePagos: Boolean = false;

  spinnerReporteVenta: Boolean = false;
  spinnerReportePagos: Boolean = false;

  mensajeReportes: string = '';
  mensajeAlert: Boolean = false;

  keyword = 'nombrePersona';
  datosCliente: IDTOClientePersona[] = [];

  datosCliente$: Observable<IDTOClientePersona[]>;
  itemCliente: IDTOClientePersona;

  datosVentasPagos$: Observable<IDTOPagoReporte[]>;

  mostrarAutocompleteCliente: Boolean = false;
  mostrarPagosCliente: Boolean = false;

  boolCall: Observable<Boolean>;

  auto: any;

  ngOnInit(): void {




    this.mostrarPagosCliente = sessionStorage.getItem('sesionMostrarPagos') != null ? 
    JSON.parse(sessionStorage.getItem('sesionMostrarPagos')) : false;
    this.obtenerEventButton();
  }
  guardando()
  {

  }
  buscarReporteVenta() {
    if (this.reporteVentas.reporteVentas.fechaInicio == "" ||
      this.reporteVentas.reporteVentas.fechaFin == "") {
      this.mensajeAlert = true;
      this.mensajeReportes = 'Por favor no deje campos vacíos';
      setTimeout(() => {
        this.mensajeAlert = false;
        this.mensajeReportes = '';
      }, 1500);
    } else {
      if (this.reporteVentas.reporteVentas.fechaInicio >
        this.reporteVentas.reporteVentas.fechaFin) {
        this.mensajeAlert = true;
        this.mensajeReportes = 'La fecha de inicio no debe ser mayor que la fecha final';
        setTimeout(() => {
          this.mensajeAlert = false;
          this.mensajeReportes = '';
        }, 2500);

      } else {
        let fechaInicio = new Date(this.reporteVentas.reporteVentas.fechaInicio)
        let fechaFin = new Date(this.reporteVentas.reporteVentas.fechaFin)
        let buscarFechaInicio =
          `${fechaInicio.getFullYear()}-${fechaInicio.getMonth() + 1}-${fechaInicio.getDate()}`;
        let buscarFechaFin =
          `${fechaFin.getFullYear()}-${fechaFin.getMonth() + 1}-${fechaFin.getDate()} `
        this.spinnerReporteVenta = true;
        this.serverBuscarReportesVentas(buscarFechaInicio, buscarFechaFin);

      }
    }
  }


  // obtener el dato del evento que emite el bono de la vista
  // generar-venta.component
  obtenerEventButton() 
  {
    this.reporteEmit$ =
      this.serviceFerreteria.serviceReportes
        .reportesVenta$;
    this.reporteEmit$
      .subscribe
      (
        res => {
          if (res === 'reporteVenta') {
            this.reporteVenta = true;
            this.mensajeReportes = ' para buscar las ventas';
            this.mostrarAutocompleteCliente = false;
          } else { this.reporteVenta = false }
          if (res === 'reportePagosCliente') {
            this.getClientesAutoComplete();
            this.reportePagos = true;
            this.mostrarAutocompleteCliente = true;
            this.mensajeReportes = ' para buscar los pagos';

          } else { this.reportePagos = false; }

        }

      );

  }

  buscarReportePagos() {

    let autocomplete = this.auto == 'undefined' ? null : this.auto;

    if (this.reporteVentas.reporteVentas.fechaInicio == "" ||
      this.reporteVentas.reporteVentas.fechaFin == "" ||
      autocomplete == null) {
      this.mensajeAlert = true;
      this.mensajeReportes = 'Por favor no deje campos vacíos';
      setTimeout(() => {
        this.mensajeAlert = false;
        this.mensajeReportes = '';
      }, 1500);
    } else {
      if (this.reporteVentas.reporteVentas.fechaInicio >
        this.reporteVentas.reporteVentas.fechaFin) {

        this.mensajeAlert = true;
        this.mensajeReportes = 'La fecha de inicio no debe ser mayor que la fecha final';
        setTimeout(() => {
          this.mensajeAlert = false;
          this.mensajeReportes = '';
        }, 2500);

      } else {

        let clienteEncontrado: IDTOClientePersona = this.auto;

        let fechaInicio = new Date(this.reporteVentas.reporteVentas.fechaInicio)
        let fechaFin = new Date(this.reporteVentas.reporteVentas.fechaFin)
        let buscarFechaInicio =
          `${fechaInicio.getFullYear()}-${fechaInicio.getMonth() + 1}-${fechaInicio.getDate()}`;

        let buscarFechaFin =
          `${fechaFin.getFullYear()}-${fechaFin.getMonth() + 1}-${fechaFin.getDate()} `

        this.spinnerReportePagos = true;

        this.serverBuscarReportesPagos
          (buscarFechaInicio, buscarFechaFin, clienteEncontrado.idCliente);

        // this.serverBuscarReportesVentas(buscarFechaInicio, buscarFechaFin);

      }
    }
  }

  serverBuscarReportesPagos(fechaInicio: string, fechaFin: string, id: number) {
    this._ngZone.runOutsideAngular(() => {
      this.reporteVentas$ = this.serviceFerreteria.serviceReportes
        .obtenerReportesPagos(fechaInicio, fechaFin, id);
      this.reporteVentas$.subscribe
        (
          (res: IDTOPagoReporte[]) => {
            this._ngZone.run(() => {
              setTimeout(() => {

                if (Object.keys(res).length > 0) {

                  sessionStorage.setItem('sesionPagos', JSON.stringify(res));

                  this.spinnerReportePagos = false;
                  this.mostrarPagosCliente = true;
                  this.serviceFerreteria.serviceReportes.mostrandoVistasReportes$.emit(true);

                } else {
                  this.mensajeAlert = true;
                  this.mensajeReportes = 'No existen ventas en las fechas que ingresó';
                  setTimeout(() => {
                    this.mensajeAlert = false;
                    this.mensajeReportes = '';
                    this.spinnerReportePagos = false;
                  }, 3000);
                }
              }, 2500);

            });
          }
        );
    });


  }

  // método para buscar las ventas
  serverBuscarReportesVentas(inicio: string, fin: string) {
    this._ngZone.runOutsideAngular(() => {
      this.reporteVentas$ = this.serviceFerreteria.serviceReportes
        .obtenerReportesVentas(inicio, fin);
      this.reporteVentas$.subscribe
        (
          (res: IReporteVenta) => {
            this._ngZone.run(() => {
              setTimeout(() => {

                if (Object.keys(res).length > 0) {
                  this.router.navigateByUrl('reportes/generarreporteventas');
                  sessionStorage.setItem('reporteVenta', JSON.stringify(res));

                  this.spinnerReporteVenta = false;


                } else {
                  this.mensajeAlert = true;
                  this.mensajeReportes = 'No existen ventas en las fechas que ingresó';
                  setTimeout(() => {
                    this.mensajeAlert = false;
                    this.mensajeReportes = '';
                    this.spinnerReporteVenta = false;
                  }, 3000);
                }
              }, 2500);

            });
          }
        );
    });
  }

  getClientesAutoComplete() {
    this.datosCliente$ = this.serviceFerreteria.serviceCliente.getClientesAutoComplete();
  }

  selectEvent(item: any) {
    // do something with selected item
    this.itemCliente = item;

  }

  onChangeSearch(item: any) {


    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e: any) {
    // do something when input is focused
  }

}
