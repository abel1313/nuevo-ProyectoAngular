import { Component, OnDestroy, OnInit } from '@angular/core';


import { Observable, Subscription } from 'rxjs';
import { IDetalleVenta } from 'src/app/Model/DetalleVenta/DetalleVenta';
import { IVenta } from 'src/app/Model/Venta/Venta';

import { ServiceFerreteriaService } from 'src/app/Service/service-ferreteria.service';
import { DetalleVentaServer } from 'src/app/Model/DetalleVenta/DetalleVentaServer';
import { ProductoServer } from 'src/app/Model/Productos/ProductoServer';
import { parse } from 'path';
import { type } from 'os';
import { PagoVenta } from 'src/app/Model/PagosVenta/PagoVenta';
import { VentasPagadas } from 'src/app/Model/VentasPagadas/VentasPagadas';
import { Router } from '@angular/router';
import { Sessiones } from 'src/app/Model/Sessiones/Sessiones';

@Component({
  selector: 'app-agregar-venta',
  templateUrl: './agregar-venta.component.html',
  styleUrls: ['./agregar-venta.component.css']
})
export class AgregarVentaComponent implements OnInit, OnDestroy {

  constructor( private serviceFerreteria: ServiceFerreteriaService,
              private router: Router ) { }

  //keywordProducto = 'nombrePersona';
  // es para obtener los datos del service que el servidor no regresa
  datosCliente: any [];

  datosResouestVenta: any = [];

  keyword = 'nombrePersona';
  
  valueString: number = 0;

  datosCliente$: Observable<any>;

  suscription: Subscription;
  totalVentaMostrar: number = 0;
  cambioVenta: number = 0;
  
  d = new DetalleVentaServer();

  pagoVenta = new PagoVenta();

  clienteUsuario: any =
  {
    idCliente : 0,
    idUsuario : 0
  }
  sessionUsuario = new Sessiones( this.router );


  ventasPagadas = new VentasPagadas();



  producto = new ProductoServer();
  
  pago: number = 0;
  showMessage: Boolean = false;

  showMessageRespuesta: Boolean = false;

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
      id : 0,
      venta :0,
      
      producto :
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



    this.tomarDetalle();
    this.getClientes();

    this.sessionUsuario.eliminarSession("datosEditarProducto");
    
  }
  agregarVenta()
  {

    if( this.pago > 0 )
    {
      this.enviarVetaServidor();
    }
    else
    {
      this.validarFormulario();
     this.showMessage = true;
     setTimeout( ()=>
     {
        this.showMessage = false  ;
        (<HTMLInputElement>document.getElementById('lblPagoCon')).focus();
      }, 2000 );
    }
   
  }

  onKey(event: any) // Eventos para tomar el valor del pago
  {
 

  this.cambioVenta = parseInt( event ) - this.totalVentaMostrar;

  }
  changeValue(evt: any) // Eventos para tomar el valor del pago
  {
    this.cambioVenta = parseInt( evt ) - this.totalVentaMostrar;
  }

  enviarVetaServidor()
  {
    var inputValue = (<HTMLInputElement>document.getElementById('totalVenta')).value;
    this.venta.totalVenta = parseInt( inputValue);
  
    let venta = JSON.parse(sessionStorage.getItem("carritoventa"));
  
      for (const key in venta) 
      {
  
        if(venta[key].id != 0)
        {
          let detalle = new DetalleVentaServer();
  
          detalle.detalleAdd.precioDetalleVenta = venta[key].precioProducto;
          detalle.detalleAdd.cantidadDetalleVenta = venta[key].cantidad1;
          detalle.detalleAdd.subtotalDetalleVenta = venta[key].subtotal;
          detalle.detalleAdd.producto.id = venta[key].id;
          detalle.detalleAdd.venta.cliente.id = this.clienteUsuario.idCliente;
        this.d.detalleV.detalle.push(detalle.detalleAdd);
        
        }
          
    }
  
    let das: any = [];
  
    das = this.d.detalleV.detalle;
    


    this.pagoVenta.pago.pagoVenta = this.pago;
    
  this.suscription = this.serviceFerreteria.serviceDetalle
  .saveDetalleServer( das )
  .subscribe
  (
    res => 
    {
      this.datosResouestVenta = res;
      

      if( this.pago >= this.totalVentaMostrar )
      {
        if(  this.datosResouestVenta.id != 0 )
        {
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
       setTimeout( ()=>
       {
        this.showMessageRespuesta = false;
        this.router.navigateByUrl('/mostrarventas');

       }, 2000); 
    },
    error => console.log(error)
    
  );
  }
  tomarDetalle()
  {

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

    
    
    this.serviceFerreteria.serviceDetalle.countProductosCarrito$.emit( cantidad );
    
  }

// método para seleccionar el id del cliente del autocomplete
  selectEvent(item: any) {
    // do something with selected item

this.clienteUsuario.idCliente = item.idCliente;


  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }
  
  onFocused(e: any){
    // do something when input is focused
  }
  // método para detectar algun cambio que el cliente haga
  changeS(eve: any)
  {

    
  }

  validarFormulario()
  {
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


  getClientes()
  {
    this.suscription = this.serviceFerreteria.serviceCliente.getClientesAll()
    .subscribe
    (
      res=>
      {
        this.datosCliente = res;

      },error=>console.log(error)
    );
  }


  realizarPagosVenta()
  {
    this.suscription = this.serviceFerreteria.serivicePagosVenta
    .savePagoVenta( this.pagoVenta.pago )
    .subscribe
    (
      res=> 
      {

      }, 
      err=> console.log(err)
    );
  }
  saveVentaPagada()
  {
    this.suscription = this.serviceFerreteria.seriviceVentasPagadas
    .guardarVentasPagadas( this.ventasPagadas.ventasPagadas )
    .subscribe
    (
      res=>
      {

      },
       err=> console.log(err)
    );
  }


  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }


}
