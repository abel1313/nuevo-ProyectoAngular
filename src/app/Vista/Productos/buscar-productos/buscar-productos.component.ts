import { ThisReceiver } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IDetalleVenta } from 'src/app/Model/DetalleVenta/DetalleVenta';
import { IVenta } from 'src/app/Model/Venta/Venta';
import { IProducto } from 'src/app/Model/Productos/IProducto';


import { ServiceFerreteriaService } from 'src/app/Service/service-ferreteria.service';
import { Sessiones } from 'src/app/Model/Sessiones/Sessiones';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscar-productos',
  templateUrl: './buscar-productos.component.html',
  styleUrls: ['./buscar-productos.component.css']
})
export class BuscarProductosComponent implements OnInit, OnDestroy {

  constructor(public serviceFerreteria: ServiceFerreteriaService,
              private router: Router ) { }

  
  valueKeyUp: string = '';

  suscription: Subscription;
  countProductoBuscarProducto: number = 0;

  verCarritoCompras: Boolean = false; 

  sessionesProducto = new Sessiones( this.router );

  producto: IProducto = 
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
  detalleVenta: IDetalleVenta = 
  {
    id: 0,
    venta :0,
 
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
    Sessiones.eliminarSessionesReportes('editarMarca');
     this.countProductoDetalle();
    this.controlCarritoVenta();
   this.validarCarritoCompraO();

   this.countProductoBuscarProducto = sessionStorage.getItem("tamanoCarrito") != null ?  parseInt(sessionStorage.getItem("tamanoCarrito"))  : 0 ;

  //  if(sessionStorage.getItem("contador") != null)
  // {
  //   let cont = parseInt(sessionStorage.getItem("contador"));
  //   this.serviceFerreteria.serviceDetalle.countProductosCarrito$.emit(cont);
  // }
    
    let valueBox = document.getElementById('buscar-producto'). innerHTML;
   
    if(valueBox == ""){
        this.serviceFerreteria.serviceProducto.caracterInput$.emit("vacio");
        // console.log("Entra a emitir ");
      }
    //this.serviceFerreteria.serviceProducto.caracterKeyUp$.emit( );


    this.sessionesProducto.eliminarSession("datosEditarProducto");
    

  }

  onKey(event: any) { // without type info
    this.serviceFerreteria.serviceProducto.caracterKeyUp$.emit(event.target.value);
  }

  verDetalle()
  {
    this.verCarritoCompras = true;
  }

  countProductoDetalle()
  {
this.suscription = this.serviceFerreteria.serviceDetalle.countProductosCarrito$
.subscribe(res =>
  {
    this.countProductoBuscarProducto = res;
    // console.log(res);
  });
  }

  carritoDetalle: any = [];
  controlCarritoVenta()
  {
    

  //  console.log(sessionStorage.getItem("productoDetalle"));
  }
  
  limpiandoDetalle()
  {
    
 
    this.detalleVenta.id =  0;
    this.detalleVenta.venta = 0;
 
    this.detalleVenta.precioDetalleVenta = 0;
    this.detalleVenta.cantidadDetalleVenta = 0;
    this.detalleVenta.subtotalDetalleVenta = 0;
    this.detalleVenta.producto.id = 0;
    this.detalleVenta.producto.nombreProducto = '';
    this.detalleVenta.producto.codigoBarrasProducto = '';
    this.detalleVenta.producto.descripcionProducto = '';
    this.detalleVenta.producto.caracteristicasProducto = '';
    this.detalleVenta.producto.existenciaProducto = 0;
    this.detalleVenta.producto.precioProducto = 0;
    this.detalleVenta.producto.proveedor.id = 0;
    this.detalleVenta.producto.proveedor.nombreProveedor = '';
         

  }

  validarCarritoCompraO()
  {

    this.suscription = this.serviceFerreteria.serviceDetalle.verCarritoCompras$
    .subscribe(res =>  
      {
        this.verCarritoCompras = res;
      });

  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }


}
