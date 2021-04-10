
import { Component, EventEmitter, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, Subscription } from 'rxjs';
import { IDTOPagoReporte } from 'src/app/Model/DTO/DROPagosRepostes/IDTOPagoReporte';
import { IDTOVentaPago } from 'src/app/Model/DTO/DROPagosRepostes/IDTOVentaPago';
import { IDTOVentasPagos } from 'src/app/Model/DTO/DROPagosRepostes/IDTOVentasPagos';
import { DTOVentaPagos } from 'src/app/Model/DTO/DTOVentaPagos/DTOVentaPagos';
import { IPagosVenta } from 'src/app/Model/PagosVenta/IPagosVenta';
import { PagoVenta } from 'src/app/Model/PagosVenta/PagoVenta';
import { Sessiones } from 'src/app/Model/Sessiones/Sessiones';
import { IVentasPagadas } from 'src/app/Model/VentasPagadas/IVentasPagadas';
import { ServiceFerreteriaService } from 'src/app/Service/service-ferreteria.service';

import { VentasPagadas } from "../../../Model/VentasPagadas/VentasPagadas";
@Component({
  selector: 'app-pagos-venta-mostrar',
  templateUrl: './pagos-venta-mostrar.component.html',
  styleUrls: ['./pagos-venta-mostrar.component.css']
})
export class PagosVentaMostrarComponent implements OnInit {

  DTOPagoVenta$: Observable<IDTOVentasPagos[]>;
  suscription: Subscription;

  getPagosAll$: Observable<IDTOVentasPagos[]>;

  

  guardarVentasPagadasNew$: Observable<IVentasPagadas>;
  IDTOPagoReporteNew$: Observable<IDTOPagoReporte>;

  eventKeyUpNombreEmmit$ = new EventEmitter<string>();


  constructor(private serviceFerreteria: ServiceFerreteriaService, private router: Router) { }

  dtoVentaPago = new DTOVentaPagos();

  ventasPagadas = new VentasPagadas();
  pagoVenta = new PagoVenta();

  pathString: string = '';
  mensaje: string = ''
  mostrarMensaje: Boolean = false;

  mensajeVentaPagada: Boolean = false;

  barraLateralPago: Boolean = false;


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

this.buscarUnPago();
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
    if (this.datosPagoVenta.pago != 0) 
    {
      this.saveVentasPagadas();
    }else
    {
      this.mensaje = ' el pago debe ser mayor a 0';
      this.mostrarMensaje = true;
      setTimeout(() => {
        this.mensaje = '';
        this.mostrarMensaje = false;
      }, 2000);

    }
  }



  //Al realizar una venta agregarla en el de ventas pagadas para poder hacer la relacion completa

  buscarUnPago()
  {
    this.eventKeyUpNombreEmmit$ = this.serviceFerreteria.serivicePagosVenta
    .eventKeyUpNombreCliente$;
    this.eventKeyUpNombreEmmit$.subscribe
    (
      ev=>
      {
        console.log(ev, " sale");
      
        this.DTOPagoVenta$ = this.serviceFerreteria.serivicePagosVenta.getOnePago( ev );
  

      }
      );

    //this.DTOPagoVenta = res;
  }
  buscarPagosVenta() {
    this.DTOPagoVenta$ = this.serviceFerreteria.serivicePagosVenta.buscarPagos();
  }


  saveVentasPagadas() {
    if (this.datosPagoVenta.pago >= this.dtoVentaPago.ventasPagos.totalResta) {

      this.mensajeVentaPagada = true;
      this.datosVentaPagada.estatusventa = 1;
      this.ventasPagadas.ventasPagadas.estatusVenta.id = 1;

      this.ventasPagadas.ventasPagadas.venta.id = this.datosVentaPagada.idVenta;
      this.pagoVenta.pago.pagoVenta = this.dtoVentaPago.ventasPagos.totalResta;


      console.log(this.ventasPagadas.ventasPagadas);
   

      // this.savePagosVenta();


      this.guardarVentasPagadasNew$ = this.serviceFerreteria.seriviceVentasPagadas
        .guardarVentasPagadasUpdate(this.ventasPagadas.ventasPagadas);
        this.guardarVentasPagadasNew$.subscribe
        (
          res=>console.log(res)
        );


    } else if (this.datosPagoVenta.pago < this.dtoVentaPago.ventasPagos.totalResta) {
      this.mensajeVentaPagada = false;
      this.pagoVenta.pago.pagoVenta = this.datosPagoVenta.pago;

      // this.savePagosVenta();

    }

  }
  savePagosVenta() {

    this.barraLateralPago = true;

    if (this.pagoVenta.pago.venta.id != 0) {
      this.pagoVenta.pago.venta.id = this.ventasPagadas.ventasPagadas.venta.id;
    
    } else {
      this.pagoVenta.pago.venta.id = this.datosVentaPagada.idVenta;
    }


    
    this.IDTOPagoReporteNew$ = this.serviceFerreteria.serivicePagosVenta
      .savePagoVentaNew(this.pagoVenta.pago);
      this.IDTOPagoReporteNew$.subscribe
      (
        (res: IDTOPagoReporte) => {
          this.buscarPagosVenta();
          
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


         
           
            setTimeout(() => {
              this.barraLateralPago = false;
              this.mostrarMensaje = true;
              this.mensajeVentaPagada = false;
              this.mensaje = "Gracias por realizar su pago";

              setTimeout(() => {

                setTimeout(() => {
                  this.mostrarMensaje = false;
                  this.mensaje = "";
                  this.router.navigateByUrl('reportes/pagocliente');
                }, 1200);
              }, 2000);

              
            }, 2000);
       
          } else {


            setTimeout(() => {
              this.barraLateralPago = false;
              this.mostrarMensaje = true;
              this.mensajeVentaPagada = false;
              this.mensaje = "Gracias por abonar su pago";
              setTimeout(() => {
                this.mostrarMensaje = false;
                this.mensaje = "";
                
                this.router.navigateByUrl('reportes/pagocliente');
              }, 1200);

            }, 2000);

 
            setTimeout(() => {

              //this.router.navigateByUrl('/reportes/reportepago');
            }, 2000);
          }


        },
        err => console.log(err)
      );
  }


}
