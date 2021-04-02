
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IDTOPagoReporte } from 'src/app/Model/DTO/DROPagosRepostes/IDTOPagoReporte';
import { DTOVentaPagos } from 'src/app/Model/DTO/DTOVentaPagos/DTOVentaPagos';
import { IPagosVenta } from 'src/app/Model/PagosVenta/IPagosVenta';
import { PagoVenta } from 'src/app/Model/PagosVenta/PagoVenta';
import { Sessiones } from 'src/app/Model/Sessiones/Sessiones';
import { ServiceFerreteriaService } from 'src/app/Service/service-ferreteria.service';

import { VentasPagadas } from "../../../Model/VentasPagadas/VentasPagadas";
@Component({
  selector: 'app-pagos-venta-mostrar',
  templateUrl: './pagos-venta-mostrar.component.html',
  styleUrls: ['./pagos-venta-mostrar.component.css']
})
export class PagosVentaMostrarComponent implements OnInit, OnDestroy {

  DTOPagoVenta: any = [];
  suscription: Subscription;

  constructor(private serviceFerreteria: ServiceFerreteriaService, private router: Router) { }

  dtoVentaPago = new DTOVentaPagos();

  ventasPagadas = new VentasPagadas();
  pagoVenta = new PagoVenta();

  pathString: string = '';
  mensaje: string = ''
  mostrarMensaje: Boolean = false;

  mensajeVentaPagada: Boolean = false;


  resultado: number = 0;
  btnDisablePagoVenta: Boolean = false;
  datosVentaPagada =
    {
      idVenta: 0,
      estatusventa: 0
    };
  datosPagoVenta =
    {
      pago: 0,
      ventaId: 0
    };

  sessionProducto = new Sessiones(this.router);

  ngOnInit(): void {
    this.buscarPagosVenta();

    this.sessionProducto.eliminarSession("datosEditarProducto");
    Sessiones.eliminarSessionesReportes('editarMarca');
  }

  onClick(btn: any) {
    this.dtoVentaPago.ventasPagos = btn;

    this.datosVentaPagada.idVenta = this.dtoVentaPago.ventasPagos.idVenta;
    this.btnDisablePagoVenta = this.dtoVentaPago.ventasPagos.idVenta != 0 ? true : false;
  }

  onChangePagoVenta(event: any) {

    this.resultado = parseFloat(event) - this.dtoVentaPago.ventasPagos.totalResta;
  }
  onKeyUpPagoVenta(event: any) {
    this.resultado = parseFloat(event) - this.dtoVentaPago.ventasPagos.totalResta;
  }
  guardarPago() {
    if (this.datosPagoVenta.pago != 0) {
      this.saveVentasPagadas();
    }
  }

  buscarPagosVenta() {
    this.suscription = this.serviceFerreteria.serivicePagosVenta.getPagosVentaAll()
      .subscribe
      (
        res => {

          this.DTOPagoVenta = res;


        },
        err => console.log(err)
      );

  }


  saveVentasPagadas() {
    if (this.datosPagoVenta.pago >= this.dtoVentaPago.ventasPagos.totalResta) {
      this.datosVentaPagada.estatusventa = 1;
      this.ventasPagadas.ventasPagadas.estatusVenta.id = 1;
      this.ventasPagadas.ventasPagadas.venta.id = this.datosVentaPagada.idVenta;
      this.pagoVenta.pago.pagoVenta = this.dtoVentaPago.ventasPagos.totalResta;
      this.savePagosVenta();

      this.suscription = this.serviceFerreteria.seriviceVentasPagadas
        .guardarVentasPagadas(this.ventasPagadas.ventasPagadas)
        .subscribe
        (
          res => {

          },
          err => console.log(err)
        );


    } else if (this.datosPagoVenta.pago < this.dtoVentaPago.ventasPagos.totalResta) {
      this.pagoVenta.pago.pagoVenta = this.datosPagoVenta.pago;

      this.savePagosVenta();

    }

  }
  savePagosVenta() {

    if (this.pagoVenta.pago.venta.id != 0) {
      this.pagoVenta.pago.venta.id = this.ventasPagadas.ventasPagadas.venta.id;
      this.mensajeVentaPagada = true;
    } else {
      this.pagoVenta.pago.venta.id = this.datosVentaPagada.idVenta;
    }

    this.suscription = this.serviceFerreteria.serivicePagosVenta
      .savePagoVenta(this.pagoVenta.pago)
      .subscribe
      (
        (res: IDTOPagoReporte) => {
          this.buscarPagosVenta();
          console.log(res);
          sessionStorage.setItem('iReportePago', JSON.stringify(res));
          this.dtoVentaPago.ventasPagos.totalVenta = 0;
          this.dtoVentaPago.ventasPagos.totalPagosVenta = 0;
          this.dtoVentaPago.ventasPagos.totalResta = 0;
          this.datosPagoVenta.pago = 0;
          this.resultado = 0;
          this.btnDisablePagoVenta = false;
          this.dtoVentaPago.ventasPagos.cliente.persona.nombrePersona = '';
          this.dtoVentaPago.ventasPagos.cliente.persona.paternoPersona = '';
          this.dtoVentaPago.ventasPagos.cliente.persona.maternoPersona = '';

          if (this.mensajeVentaPagada) {
            this.mostrarMensaje = true;
            this.mensaje = "Gracias por realizar su pago";
            setTimeout(() => {
              this.mostrarMensaje = false;
              this.mensaje = "";
            }, 1200);
            setTimeout(() => {
              this.router.navigateByUrl('/reportes/reportepago');
            }, 2000);
          } else {
            this.mostrarMensaje = true;
            this.mensajeVentaPagada = false;
            this.mensaje = "Gracias por abonar su pago";
            setTimeout(() => {
              this.mostrarMensaje = false;
              this.mensaje = "";
            }, 1200);
            setTimeout(() => {
              this.router.navigateByUrl('/reportes/reportepago');
            }, 2000);
          }


        },
        err => console.log(err)
      );
  }


  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

}
