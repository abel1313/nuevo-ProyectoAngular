import { Component, ElementRef, NgZone, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';


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

@Component({
  selector: 'app-agregar-venta',
  templateUrl: './agregar-venta.component.html',
  styleUrls: ['./agregar-venta.component.css']
})
export class AgregarVentaComponent implements OnInit, OnDestroy {

  @ViewChild('checkClando') calndo: ElementRef;

  constructor(private serviceFerreteria: ServiceFerreteriaService,
    private router: Router, private render2: Renderer2,
    private _ngZone: NgZone) { }

  //keywordProducto = 'nombrePersona';
  // es para obtener los datos del service que el servidor no regresa
  datosCliente: any[];

  datosResouestVenta: any = [];

  keyword = 'nombrePersona';

  valueString: number = 0;

  datosCliente$: Observable<any>;
  guardarPepido$: Observable<IPedido>;

  guardarCliente$: Observable<any>;


  suscription: Subscription;
  totalVentaMostrar: number = 0;
  cambioVenta: number = 0;

  pedidos: IPedido;

  pedidos$: Observable<IPedido>;


  radio: Boolean = true;

  d = new DetalleVentaServer();

  respuestaCliente: ICliente;

  pagoVenta = new PagoVenta();

  direccion: IDireccion;
  clientePersona: ICliente;

  diabledInputClientePersona: Boolean = false;
  diabledInputDireccion: Boolean = false;


  usuEjemplo: string;

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



  ngOnInit(): void {



    this.tomarDetalle();
    this.getClientes();

    this.datosEmitAgregarPersona();
    this.datosEmitAgregarDireccion();

    this.sessionUsuario.eliminarSession("datosEditarProducto");

    this.sessionSistema = sessionStorage.getItem("sessionUsuario") != null ?
      JSON.parse(sessionStorage.getItem("sessionUsuario")) : this.router.navigateByUrl("acceso");


    this.usuEjemplo = this.sessionSistema.usuario.nombre_Usuario;
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

  agregarVenta() {




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



    if (this.pago > 0) {

      if(!this.radio)
      {
        console.log("llego");
        let ventaExample = new VentasServidor(this._ngZone, this.serviceFerreteria);
        ventaExample.addCliente( this.clienteVenta.cliente ).then((res: number)=>
        {
 
sessionStorage.setItem("idCliente", JSON.stringify(res) );
          
        });
      }


      //  this.render2.setAttribute(this.calndo.nativeElement, "checked", "true");


      this.enviarVetaServidor();
    }
    else {
      this.validarFormulario();
      this.showMessage = true;
      setTimeout(() => {
        this.showMessage = false;
        (<HTMLInputElement>document.getElementById('lblPagoCon')).focus();
      }, 2000);
    }

  }

  onKey(event: any) // Eventos para tomar el valor del pago
  {


    this.cambioVenta = parseInt(event) - this.totalVentaMostrar;

  }
  changeValue(evt: any) // Eventos para tomar el valor del pago
  {
    this.cambioVenta = parseInt(evt) - this.totalVentaMostrar;
  }

  enviarVetaServidor() {
    var inputValue = (<HTMLInputElement>document.getElementById('totalVenta')).value;
    this.venta.totalVenta = parseInt(inputValue);

    let venta = JSON.parse(sessionStorage.getItem("carritoventa"));



    for (const key in venta) {

      if (venta[key].id != 0) {
        let detalle = new DetalleVentaServer();

        detalle.detalleAdd.precioDetalleVenta = venta[key].precioProducto;
        detalle.detalleAdd.cantidadDetalleVenta = venta[key].cantidad1;
        detalle.detalleAdd.subtotalDetalleVenta = venta[key].subtotal;
        detalle.detalleAdd.producto.id = venta[key].id;


        if (this.radio) {
          detalle.detalleAdd.venta.cliente.id = this.clienteUsuario.idCliente;
        }else
        {
          let a =  sessionStorage.getItem('idCliente') != null ? 
          JSON.parse(sessionStorage.getItem('idCliente')) : 0
          detalle.detalleAdd.venta.cliente.id = a;
       ;

          console.log(a, " a ",sessionStorage.getItem('idCliente'), "session");
        }
     
        console.log(detalle.detalleAdd.venta.cliente);
        this.d.detalleV.detalle.push(detalle.detalleAdd);

      }

    }

    let das: any = [];
    das = this.d.detalleV.detalle;

    this.pagoVenta.pago.pagoVenta = this.pago;

    this.suscription = this.serviceFerreteria.serviceDetalle
      .saveDetalleServer(das)
      .subscribe
      (
        res => {
          this.datosResouestVenta = res;




          if (this.pago >= this.totalVentaMostrar) {
            if (this.datosResouestVenta.id != 0) {

              //  this.agregarPedido(this.clientePersona ,this.direccion);

              this.ventasPagadas.ventasPagadas.estatusVenta.id = 1;
              this.ventasPagadas.ventasPagadas.venta.id = this.datosResouestVenta.id;
              this.saveVentaPagada();
            }

          }
          this.pagoVenta.pago.venta.id = this.datosResouestVenta.id;

          this.realizarPagosVenta();


          this.cambioVenta = 0;
          this.totalVentaMostrar = 0;
          this.pago = 0;
          this.showMessageRespuesta = true;
          sessionStorage.removeItem("carritoventa");
          sessionStorage.removeItem("tamanoCarrito");
          setTimeout(() => {
            this.showMessageRespuesta = false;
            this.router.navigateByUrl('/mostrarventas');

          }, 2000);
        },
        error => console.log(error)

      );
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

  onChangeSearch(val: string) {
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


  realizarPagosVenta() {
    this.suscription = this.serviceFerreteria.serivicePagosVenta
      .savePagoVenta(this.pagoVenta.pago)
      .subscribe
      (
        res => {

        },
        err => console.log(err)
      );
  }
  saveVentaPagada() {
    this.suscription = this.serviceFerreteria.seriviceVentasPagadas
      .guardarVentasPagadas(this.ventasPagadas.ventasPagadas)
      .subscribe
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
              console.log(this.direccion);
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






