
import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { element } from 'protractor';

import { Observable, Subscription } from 'rxjs';
import { IDetalleVenta } from 'src/app/Model/DetalleVenta/DetalleVenta';
import { IVenta } from 'src/app/Model/Venta/Venta';
import { ServiceFerreteriaService } from 'src/app/Service/service-ferreteria.service';

@Component({
  selector: 'app-mostrar-productos',
  templateUrl: './mostrar-productos.component.html',
  styleUrls: ['./mostrar-productos.component.css']
})
export class MostrarProductosComponent implements OnInit {

  mostrandoEjemplo: string = '';
  countProductoDetalle: number = 0;
  arregloDetalleMostrarProducto: any = [];

  cont: number = 0;;

  suscription: Subscription;

  prodCarrito =
  {
    id: 0,
    nombreProducto: "",
    precioProducto: 0,
    cantidad1: 0,
    subtotal: 0
  }
  carritoVenta =
  {
    
  }
  

  
  constructor(public serviceFerreteria: ServiceFerreteriaService, private _ngZone: NgZone) { }

  public productosRes: any =  [];

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
  

  ngOnInit(): void 
  {
    this.obtenerProductosServidor();
 this.mostrarproductos();   
  }

  addArray : any = [];
  agregarproductodetalle(event: any)
  {

    this.addArray = this.productosRes;

if(sessionStorage.getItem("tamanoCarrito") == null)
{
  sessionStorage.setItem("tamanoCarrito", JSON.stringify(this.cont));
}

let nuevoArrayEc: any = [];

for (var producto of  this.addArray) 
{
  for (var propiedad in producto) {

    if(producto[propiedad] == event)
    {
      nuevoArrayEc = producto;

      this.prodCarrito =
      {
        id: producto.id,
        nombreProducto: producto.nombreProducto,
        precioProducto: producto.precioProducto,
        cantidad1: 1,
        subtotal: 0
      }
      this.prodCarrito.subtotal = 
      this.prodCarrito.precioProducto * this.prodCarrito.cantidad1;
      
      

      if(sessionStorage.getItem("productoDetalle") == null)
      {
      sessionStorage.setItem("productoDetalle",JSON.stringify(this.arregloDetalleMostrarProducto));
      }

      
      
      this.detalleVenta.cantidadDetalleVenta = 1;
      this.detalleVenta.precioDetalleVenta = producto.precioProducto;

      this.detalleVenta.subtotalDetalleVenta = ( this.detalleVenta.precioDetalleVenta * this.detalleVenta.cantidadDetalleVenta );
      this.detalleVenta.producto = producto; 
      
    

      if( sessionStorage.getItem("tamanoCarrito") != null )
      {
        this.cont =  parseInt(sessionStorage.getItem("tamanoCarrito")) + 1;
   
        this.serviceFerreteria.serviceDetalle.countProductosCarrito$.emit(this.cont);
      }
      sessionStorage.setItem("tamanoCarrito", JSON.stringify(this.cont));

      this.serviceFerreteria.serviceDetalle.detalleVentaBuscarProducto$.emit(this.detalleVenta);

    
  
    }
  
  }
} 

this.carritoVenta = sessionStorage.getItem("carritoventa") != null ? 
JSON.parse(sessionStorage.getItem("carritoventa")) : this.carritoVenta ;


if ( this.carritoVenta.hasOwnProperty( this.prodCarrito.id)) {
  this.prodCarrito.cantidad1 =  
  this.carritoVenta[this.prodCarrito.id].cantidad1 + 1;
  
}

 this.carritoVenta[this.prodCarrito.id] = 
{ ...this.prodCarrito }


console.log(this.carritoVenta, " Carrito");


sessionStorage.setItem("carritoventa", JSON.stringify(this.carritoVenta));

  }
 
  eliminarproducto()
  {
    sessionStorage.removeItem("productoDetalle");
    sessionStorage.removeItem("carritoventa");
  }
  editarproducto()
  {
    const productoDetalleSession = JSON.parse(sessionStorage.getItem("productoDetalle"));
    
  }

  mostrarproductos()
  {

   this.suscription = this.serviceFerreteria.serviceProducto.caracterKeyUp$
    .subscribe(text => 
      {
   
        this.mostrandoEjemplo = text;
        this.buscarProductoServidor(this.mostrandoEjemplo);
      });
  }

  buscarProductoServidor( nombreProducto: string)
  {
  
    if( nombreProducto == '')
    {
   
      this.datosServerProductos("1");
     
    }else{
    
      this.datosServerProductos(nombreProducto);
    }
  }

  datosServerProductos( nombreOrCodigo: string )
  {

        // realiza el service para agregar el proveedor
        this.suscription = this.serviceFerreteria.serviceProducto.getOneProduct( nombreOrCodigo )
        .subscribe(res => 
          {
            this.productosRes = res;
            
          },
          error => console.log(error));
        // reenter the Angular zone and display done
        this._ngZone.run(() => 
        {
          // console.log('Outside Done!'); 
          });
   
  
  }
  obtenerProductosServidor()
  {


      // reenter the Angular zone and display done
      this._ngZone.run(() => 
      {
      // realiza el service para agregar el proveedor
      this.suscription = this.serviceFerreteria.serviceProducto.getProductoAll()
      .subscribe(res => 
        {
          //  console.log(res);
          this.productosRes = res;
          
          
        },
        error => console.log(error));
        // console.log('Outside Done!'); 
        });
 

  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }



}
