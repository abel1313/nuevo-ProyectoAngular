import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { IProducto } from 'src/app/Model/Productos/IProducto';
import { ProductoAll } from 'src/app/Model/Productos/ProductoAll';
import { IProveedorAll } from 'src/app/Model/Proveedores/IProveedorAll';
import { Validar } from 'src/app/Model/Validar/Validar';
import { ServiceFerreteriaService } from 'src/app/Service/service-ferreteria.service';

import { ProductoServer } from "../../../Model/Productos/ProductoServer";

import { Sessiones } from "../../../Model/Sessiones/Sessiones";


@Component({
  selector: 'app-editar-productos',
  templateUrl: './editar-productos.component.html',
  styleUrls: ['./editar-productos.component.css']
})
export class EditarProductosComponent implements OnInit, OnDestroy {

  constructor( private serviceFerreteria: ServiceFerreteriaService,
              private _ngZone: NgZone, private router: Router) { }


              getProductoEditar$: Observable<IProducto>;

              dts$: Observable<string>;
  prodEdit: any  = [];

  mostrar$: Observable<Boolean>;
  mostrar: Boolean = false;

  subscription: Subscription;

  
existenciasActuales: number = 0;
  editarProducto: IProducto;

  existsCodigoBarra: Boolean = false;
  existsCodigoBarraMensaje: Boolean = false;

  productosEditar = new ProductoServer();

  productoEditarNuevo = new ProductoAll();

  sessionUsuario = new Sessiones( this.router );

  dataProveedores$: Observable<IProveedorAll[]>;

  editarProductos$: Observable<IProveedorAll>;
  validar = new Validar();


  actualizarMensaje: Boolean = false;
  spinnerEditar: Boolean = false;
  inputEditar: Boolean = false;
  

  ngOnInit(): void 
  {


    // método para redireccionar a la vista de mostrarProducto
    this.sessionUsuario.sessionEditarUsuario( 'productos/buscas' );
    Sessiones.eliminarSessionesReportes('editarMarca');
    this.getProveedores();

this.obtenerProductoEditar();
  }

  selectProveedor( event )
  {
    
    
    this.productoEditarNuevo.producto.proveedor.id = parseInt( event.target.value ) ;
  
    
  }

  onKey(event)
  {

  }
  changeS( event )
  {

  }

  // evento blur que se ejecuta para cuando el input pierda el foco
  verificarCodigo()
  {
    this.productoEditarNuevo.producto.codigoBarrasProducto = 
    this.productosEditar.producto.codigoBarrasProducto;

    this.productoEditarNuevo.producto.id = 
    this.productosEditar.producto.id;

    if(  this.productoEditarNuevo.producto.codigoBarrasProducto != '' )
    {
  
      this.verificarCodigoServer();
    }
  
  }
  eventEditProducto()
  {
  // this.validar.validarDatos();
  if( 
    this.productosEditar.producto.id != 0 && 
    this.productosEditar.producto.nombreProducto != '' &&
    this.productosEditar.producto.caracteristicasProducto != '' && 
    this.productosEditar.producto.codigoBarrasProducto != '' &&
    this.productosEditar.producto.descripcionProducto != '' && 
    this.productosEditar.producto.existenciaProducto != 0 &&
    this.productosEditar.producto.precioProducto != 0 && 
    this.productosEditar.producto.proveedor.id != 0  )
  {
    this.productoEditarNuevo.producto.id = this.productosEditar.producto.id
    this.productoEditarNuevo.producto.nombreProducto = this.productosEditar.producto.nombreProducto;
    this.productoEditarNuevo.producto.caracteristicasProducto = this.productosEditar.producto.caracteristicasProducto;
    this.productoEditarNuevo.producto.codigoBarrasProducto = this.productosEditar.producto.codigoBarrasProducto;
    this.productoEditarNuevo.producto.descripcionProducto = this.productosEditar.producto.descripcionProducto;
    this.productoEditarNuevo.producto.existenciaProducto = this.productosEditar.producto.existenciaProducto +  this.existenciasActuales;
    this.productoEditarNuevo.producto.precioProducto = this.productosEditar.producto.precioProducto;
    
    this.existsProductoBarra();
  }
  else{
    this.validar.validarDatos();
  }
  //  console.log( this.productosEditar.producto );
  }
   obtenerProductoEditar()
  {

    
      this.editarProducto = 
      sessionStorage.getItem("datosEditarProducto") != null ?
      JSON.parse( sessionStorage.getItem("datosEditarProducto") ) :
       this.editarProducto;

       this.productosEditar.producto = this.editarProducto;
       this.existenciasActuales = this.productosEditar.producto.existenciaProducto;
       this.productosEditar.producto.existenciaProducto = 0;
    
  }

  //  obtener todos los proveedores para mostrar en un select
  // Observable para mostrar los proveedores
  getProveedores()
  {
   this.dataProveedores$ =  this.serviceFerreteria.serviceProveedor.getAllProveedores();
  }

// verificar que el código de barra sea diferente cualquier otro
// codigo de barra
  verificarCodigoServer()
  {
    if( this.productoEditarNuevo.producto.codigoBarrasProducto != '' )
    {
    
      this._ngZone.runOutsideAngular(()=>
      {
        this.editarProductos$ =  this.serviceFerreteria.serviceProducto
        .existsCodigoBarraEditar( this.productoEditarNuevo.producto );
        this.editarProductos$.subscribe
        (
          res=>
          {
            this._ngZone.run(()=>
            {
              this.existsCodigoBarra = Boolean(res);
              this.existsCodigoBarra;

              if(  this.existsCodigoBarra )
              {
                this.existsCodigoBarraMensaje = this.existsCodigoBarra;
                setTimeout(() => {
                  this.existsCodigoBarraMensaje = false;
                }, 2000);
              }

          //    console.log(this.existsCodigoBarra , " exis boolean");
            });
          },err=>console.log(err)
        );
      });
 
    }

  }

  existsProductoBarra()
  {
    this._ngZone.runOutsideAngular(()=>
    {
    this.editarProductos$ =  this.serviceFerreteria.serviceProducto
      .existsCodigoBarraEditar( this.productoEditarNuevo.producto );
      this.editarProductos$.subscribe
      (
        res=>
        {
          this._ngZone.run(()=>
          {
            this.existsCodigoBarra = Boolean(res);
            this.existsCodigoBarra;

            if(  this.existsCodigoBarra )
            {
              this.existsCodigoBarraMensaje = this.existsCodigoBarra;
              setTimeout(() => {
                this.existsCodigoBarraMensaje = false;
              }, 2000);
            }else
            {
              this.editarProductoServer();
            }

        //    console.log(this.existsCodigoBarra , " exis boolean");
          });
        },err=>console.log(err)
      );
    });

  }
  

  editarProductoServer()
  {
    this._ngZone.runOutsideAngular(()=>
    {
      this.editarProductos$ = this.serviceFerreteria.serviceProducto
      .editarrProductoServer( this.productoEditarNuevo.producto );
      this.editarProductos$.subscribe(
        res=>
        {
          this._ngZone.run(()=>
          {
            
            this.spinnerEditar = true;
            this.inputEditar = true;

            setTimeout(() => {
              this.spinnerEditar = false;
              this.inputEditar = false;
              this.actualizarMensaje = true;
            }, 2000);

            setTimeout(() => {
              this.actualizarMensaje = false;
       

              this.router.navigateByUrl("mostrarproductos");

            }, 2500);

          });
        }, err=> console.log(err)
      );
    });
  }
  ngOnDestroy(): void {
  //this.subscription.unsubscribe();
  }

}
