import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';


import { Observable, Subscription } from 'rxjs';
import { IDetalleVenta } from 'src/app/Model/DetalleVenta/DetalleVenta';
import { IVenta } from 'src/app/Model/Venta/Venta';

import { ServiceFerreteriaService } from 'src/app/Service/service-ferreteria.service';
import { DetalleVentaServer } from 'src/app/Model/DetalleVenta/DetalleVentaServer';
import { ProductoServer } from 'src/app/Model/Productos/ProductoServer';
import { PagoVenta } from 'src/app/Model/PagosVenta/PagoVenta';
import { VentasPagadas } from 'src/app/Model/VentasPagadas/VentasPagadas';
import { Router } from '@angular/router';
import { Sessiones } from 'src/app/Model/Sessiones/Sessiones';
import { ICliente } from 'src/app/Model/Clientes/ICliente';
import { IDireccion } from 'src/app/Model/Direccion/IDireccion';
import { UsuAcc } from 'src/app/Model/Usuarios/UsuAccc';
import { Usuario } from 'src/app/Model/Usuarios/Usuario';
import { Cliente } from 'src/app/Model/Clientes/Cliente';
import { RealizarVenta } from 'src/app/Model/Venta/RealizarVenta';
import { IPedido } from 'src/app/Model/Pedidos/IPedido';
import { VentasServidor } from 'src/app/Model/Venta/VentasServidor';
import { IVentasPagadas } from 'src/app/Model/VentasPagadas/IVentasPagadas';
import { IRealizarVenta } from 'src/app/Model/Venta/IRealizarVenta';
import { IPagosVenta } from 'src/app/Model/PagosVenta/IPagosVenta';
import { Pedido } from 'src/app/Model/Pedidos/Pedido';
import { Direccion } from 'src/app/Model/Direccion/Direccion';




@Component({
  selector: 'app-agregar-venta',
  templateUrl: './agregar-venta.component.html',
  styleUrls: ['./agregar-venta.component.css']
})
export class AgregarVentaComponent implements OnInit, OnDestroy {

  @ViewChild('checkClando') calndo: ElementRef;
  @ViewChild('totalVenta', { static: false }) totalVentaElemnet: ElementRef;
  @ViewChild('auto') auto: ElementRef;
  constructor(private serviceFerreteria: ServiceFerreteriaService,
    private router: Router, private render2: Renderer2,
    private _ngZone: NgZone) { }

  //keywordProducto = 'nombrePersona';
  // es para obtener los datos del service que el servidor no regresa
  datosCliente: any[];

  datosResouestVenta: any = [];

  mensajesErrorSave: string = '';


  keyword = 'nombrePersona';

  valueString: number = 0;

  datosCliente$: Observable<any>;
  guardarPepido$: Observable<IPedido>;

  guardarDetalle$: Observable<any>;

  guardarDireccion$: Observable<IDireccion>;

  guardarVentasPagadas$: Observable<IVentasPagadas>;

  realizarPagoVenta$: Observable<IRealizarVenta>;

  guardarPedido$: Observable<IPedido>;

  realizarPagos$: Observable<any>;

  guardarCliente$: Observable<any>;


  suscription: Subscription;
  totalVentaMostrar: number = 0;
  cambioVenta: number = 0;

  pedidos: IPedido;

  pedidos$: Observable<IPedido>;


  radio: Boolean = true;

  disabledPagar: Boolean = false;


  respuestaCliente: ICliente;

  pagoVenta = new PagoVenta();

  direccion: IDireccion;
  clientePersona: ICliente;

  diabledInputClientePersona: Boolean = false;
  diabledInputDireccion: Boolean = false;


  usuEjemplo: string;
  idUsuarioSesion: number;

  clienteVenta = new Cliente();

  clienteUsuario: any =
    {
      idCliente: 0,
      idUsuario: 0
    }
  sessionUsuario = new Sessiones(this.router);

  sessionSistema: any;

  ventasPagadas = new VentasPagadas();


  ventaClienteDatosPersona$: Observable<ICliente>;
  ventaClienteDataDireccion$: Observable<IDireccion>;

  producto = new ProductoServer();


  pago: number = 0;
  showMessage: Boolean = false;

  showMessageRespuesta: Boolean = false;

  realizarVenta = new RealizarVenta();


  detalleVenta: IDetalleVenta =
    {
      id: 0,

      precioDetalleVenta: 0,
      cantidadDetalleVenta: 0,
      subtotalDetalleVenta: 0,
      producto:
      {
        id: 0,
        nombreProducto: '',
        codigoBarrasProducto: '',
        descripcionProducto: '',
        caracteristicasProducto: '',
        existenciaProducto: 0,
        precioProducto: 0,

        proveedor:
        {
          id: 0,
          nombreProveedor: ''
        }
      }
    }

  venta: IVenta =
    {
      id: 0,
      totalVenta: 0,
      detalle:
        [
          {
            precioDetalleVenta: 0,
            cantidadDetalleVenta: 0,
            subtotalDetalleVenta: 0,
            id: 0,
            venta: 0,

            producto:
            {
              id: 0,
              nombreProducto: '',
              codigoBarrasProducto: '',
              descripcionProducto: '',
              caracteristicasProducto: '',
              existenciaProducto: 0,
              precioProducto: 0,

              proveedor:
              {
                id: 0,
                nombreProveedor: ''

              }

            }
          }
        ]
    }


  ngOnInit(): void 
  {
    Sessiones.eliminarSessionesReportes('editarMarca');
    this.tomarDetalle();
    this.getClientes();

    this.datosEmitAgregarPersona();
    this.datosEmitAgregarDireccion();

    this.sessionUsuario.eliminarSession("datosEditarProducto");

    this.sessionSistema = sessionStorage.getItem("sessionUsuario") != null ?
      JSON.parse(sessionStorage.getItem("sessionUsuario")) : this.router.navigateByUrl("acceso");


    this.usuEjemplo = this.sessionSistema.usuario.nombre_Usuario;
    this.idUsuarioSesion = this.sessionSistema.usuario.id;
  }

  radioSelected(event: any) {
    if (event.target.checked) {
      this.radio = true;
      // this.render2.addClass(this.calndo.nativeElement, "offset-3");
    }
  }
  radioUnSelected(event: any) {
    if (event.target.checked) {
      this.radio = false;
      //  this.render2.removeClass(this.calndo.nativeElement, "offset-3");


    }
  }

  addVentaServer(id: number) {

    let ventaSession = JSON.parse(sessionStorage.getItem('carritoventa'));
    let detalleServer = new DetalleVentaServer();

    for (const key in ventaSession) {

      if (ventaSession[key].id != 0) {
        let detalle = new DetalleVentaServer();

        detalle.detalleAdd.precioDetalleVenta = ventaSession[key].precioProducto;
        detalle.detalleAdd.cantidadDetalleVenta = ventaSession[key].cantidad1;
        detalle.detalleAdd.subtotalDetalleVenta = ventaSession[key].subtotal;
        detalle.detalleAdd.producto.id = ventaSession[key].id;

        detalle.detalleAdd.venta.cliente.id = id;
        detalleServer.detalleV.detalle.push(detalle.detalleAdd);

      }

    }
    let pagoVenta = new PagoVenta();

    pagoVenta.pago.pagoVenta = this.pago;

    let respuestDetalle: any;
    let ventasPagadas = new VentasPagadas();

    let enviarDetalle: any = [];

    enviarDetalle = detalleServer.detalleV.detalle;



    this._ngZone.runOutsideAngular(() => {
      this.guardarDetalle$ = this.serviceFerreteria.serviceDetalle.
        saveDetalleServer(enviarDetalle);
      this.guardarDetalle$
        .subscribe
        (
          res => {
            this._ngZone.run(() => {
              respuestDetalle = res;

              //  agregar d euna el usuariio a la venta

              if (this.pago >= this.totalVentaMostrar) {
                if (respuestDetalle.id != 0) {
                  ventasPagadas.ventasPagadas.estatusVenta.id = 1;
                  ventasPagadas.ventasPagadas.venta.id = respuestDetalle.id;
                  this.saveVentaPagada(ventasPagadas.ventasPagadas);

                  pagoVenta.pago.venta.id = respuestDetalle.id;
                  pagoVenta.pago.pagoVenta = this.totalVentaMostrar;
                  this.realizarPagosVenta(pagoVenta.pago);
                }
              }
              else {

                pagoVenta.pago.venta.id = respuestDetalle.id;
                pagoVenta.pago.pagoVenta = this.pago;

                this.realizarPagosVenta(pagoVenta.pago);

              }

              this.cambioVenta = 0;
              this.totalVentaMostrar = 0;
              this.pago = 0;
              this.showMessageRespuesta = true;
              this.mensajesErrorSave = 'Gracias por realizar su pedido';
              sessionStorage.removeItem("carritoventa");
              sessionStorage.removeItem("tamanoCarrito");
              setTimeout(() => 
              {
                this.showMessageRespuesta = false;
              }, 1500);
              setTimeout(() => {
               this.disabledPagar = false;
                this.router.navigateByUrl('/ventas/buscar');

              }, 2500);

            });

          }, err => console.log(err)
        )
    });
  }
  realizarPagosVenta(pagoVenta: any) {
    let pag: IPagosVenta = pagoVenta;
    this._ngZone.runOutsideAngular(() => {
      this.realizarPagos$ = this.serviceFerreteria.serivicePagosVenta
        .savePagoVenta(pagoVenta);
      this.realizarPagos$.subscribe
        (
          res => {
            this.guardarDireccion(pag.venta.id);
          },
          err => console.log(err)
        );
    });
  }

  // evento click de la vista de ventas
  agregarVenta() {
    if (this.pago > 0) {
     
      if (this.usuEjemplo != '' &&
        this.totalVentaMostrar != 0) {
        if (!this.radio) {
          this._ngZone.runOutsideAngular(() => {
            this.guardarCliente$ = this.serviceFerreteria.serviceCliente.guardarCliente(this.clienteVenta.cliente);
            this.guardarCliente$.subscribe
              (
                (res: ICliente) => {
                  this._ngZone.run(() => {
                    this.addVentaServer(res.id);
                  });
                }
                , err => console.log(err)
              );
          });
        } else if (this.radio) {
          let newDire: IDireccion =
            this.direccion != undefined ? this.direccion : null;

          if (newDire == null) {
            this.showMessageRespuesta = true;
            this.mensajesErrorSave = 'Por favor llene los campos de la dirección';

            setTimeout(() => {
              this.showMessageRespuesta = false;
              this.mensajesErrorSave = '';
            }, 2000);
          } else {
            this.disabledPagar = true;
            this.addVentaServer(this.clienteUsuario.idCliente);
            setTimeout(() => {
              this.disabledPagar = false;
            }, 2000);
          }

        }


      }

    } else {
      this.validarFormulario();
      this.showMessage = true;
      setTimeout(() => {
        this.showMessage = false;
        (<HTMLInputElement>document.getElementById('lblPagoCon')).focus();
      }, 2000);
    }




    //   if( this.radio )
    //   {
    //     let id: number = this.clienteUsuario.idCliente;
    //     this.clienteVenta.cliente.id = id;
    // //    this.clienteVenta.id = this.clienteUsuario.idCliente;
    //   }else
    //   {
    //     this.agregarPedido(this.clientePersona ,this.direccion);
    //  //this.agregarCliente( this.clientePersona );


    //   }
    // setTimeout(() => {
    //   console.log(this.clientePersona, " respaldo persona");
    //   console.log(this.direccion, " respaldo persona");
    // }, 2000);



    // if (this.pago > 0) {

    //   if (!this.radio) {
    //     console.log("llego");
    //     var inputValue = (<HTMLInputElement>document.getElementById('totalVenta')).value;


    //     this.venta.totalVenta = parseInt(inputValue);

    //     let ventaExample = new VentasServidor(this._ngZone, this.serviceFerreteria);
    //     ventaExample.addCliente(this.clienteVenta.cliente, ventaExample.enviarVetaServidor)
    //   }


    //   //  this.render2.setAttribute(this.calndo.nativeElement, "checked", "true");
    // }
    // else {
    //   this.validarFormulario();
    //   this.showMessage = true;
    //   setTimeout(() => {
    //     this.showMessage = false;
    //     (<HTMLInputElement>document.getElementById('lblPagoCon')).focus();
    //   }, 2000);
    // }

  }

  onKey(event: any) // Eventos para tomar el valor del pago
  {


    this.cambioVenta = parseInt(event) - this.totalVentaMostrar;

  }
  changeValue(evt: any) // Eventos para tomar el valor del pago
  {
    this.cambioVenta = parseInt(evt) - this.totalVentaMostrar;
  }


  tomarDetalle() {



    let venta = JSON.parse(sessionStorage.getItem("carritoventa"));

    let cantidad = 0;
    for (const key in venta) {

      this.detalleVenta.producto.id = venta[key].id;
      this.detalleVenta.cantidadDetalleVenta = venta[key].cantidad1;
      this.detalleVenta.precioDetalleVenta = venta[key].precioProducto;
      this.detalleVenta.subtotalDetalleVenta = venta[key].subtotal;


      if (Object.prototype.hasOwnProperty.call(venta, key)) {
        const element = venta[key].cantidad1 * venta[key].subtotal;
        this.totalVentaMostrar += element;


      }
      this.venta.detalle.push(this.detalleVenta);
      cantidad += this.detalleVenta.cantidadDetalleVenta;
    }



    this.serviceFerreteria.serviceDetalle.countProductosCarrito$.emit(cantidad);

  }

  // método para seleccionar el id del cliente del autocomplete
  selectEvent(item: any) {
    // do something with selected item


    this.clienteUsuario.idCliente = item.idCliente;
    this.clienteVenta.cliente.id = this.clienteUsuario.idCliente;
  }

  onChangeSearch(item: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e: any) {
    // do something when input is focused
  }
  // método para detectar algun cambio que el cliente haga
  changeS(eve: any) {


  }

  validarFormulario() {
    // Example starter JavaScript for disabling form submissions if there are invalid fields

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form: any) {
        form.addEventListener('submit', function (event: any) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()

          }
          form.classList.add('was-validated')
        }, false)
      });

  }


  getClientes() {
    this.suscription = this.serviceFerreteria.serviceCliente.getClientesAll()
      .subscribe
      (
        res => {
          this.datosCliente = res;

        }, error => console.log(error)
      );
  }



  saveVentaPagada(ventasPagadas: any) {


    this.guardarVentasPagadas$ = this.serviceFerreteria.seriviceVentasPagadas
      .guardarVentasPagadas(ventasPagadas);
    this.guardarVentasPagadas$.subscribe
      (
        res => {

        },
        err => console.log(err)
      );
  }


  datosEmitAgregarPersona() {
    this.ventaClienteDatosPersona$ =
      this.serviceFerreteria.serviceVenta.ventaCliente$;
    this.ventaClienteDatosPersona$.subscribe
      (
        (res: ICliente) => {

          this.clienteVenta.cliente = res;


        }
      );


  }
  datosEmitAgregarDireccion() {
    this.ventaClienteDataDireccion$ =
      this.serviceFerreteria.serviceVenta.direccion$;
    this.ventaClienteDataDireccion$.subscribe
      (
        res => {
          this.direccion = res;
        }
      );
  }

  guardarPedido(id: number, direccion: IDireccion) {

    let pedido = new Pedido();

    pedido.pedido.venta.id = id;
    pedido.pedido.direccion = direccion;

    this._ngZone.runOutsideAngular(() => {
      this.guardarPedido$ = this.serviceFerreteria.servicePedido
        .guardarPedido(pedido.pedido);
      this.guardarPedido$
        .subscribe
        (
          (res: IPedido) => {
            this._ngZone.run(() => {
              // console.log(res, " pedido");
            });
          }, err => console.log(err)
        );
    });
  }
  guardarDireccion(id: number) {
    this._ngZone.runOutsideAngular(() => {
      this.guardarDireccion$ = this.serviceFerreteria.serviceDireccion
        .guardarDireccion(this.direccion);
      this.guardarDireccion$
        .subscribe
        (
          (res: IDireccion) => {
            this._ngZone.run(() => {
              this.guardarPedido(id, res);
            });
          }, err => console.log(err)
        );
    });
  }
  agregarCliente(cliente: ICliente) {

    this._ngZone.runOutsideAngular(() => {
      this.guardarCliente$ = this.serviceFerreteria.serviceCliente
        .guardarCliente(cliente);
      this.guardarCliente$
        .subscribe
        (
          (res: ICliente) => {
            this._ngZone.run(() => {

              this.respuestaCliente = res;

              this.realizarVenta.realizarVenta.cliente = this.respuestaCliente;


            });
          },
          err => console.log(err)
        );
    });
  }



  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }


}






