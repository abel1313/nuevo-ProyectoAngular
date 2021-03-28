import { NgZone } from "@angular/core";
import { Observable } from "rxjs";
import { ServiceFerreteriaService } from "src/app/Service/service-ferreteria.service";
import { ICliente } from "../Clientes/ICliente";
import { IDetalleVenta } from "../DetalleVenta/DetalleVenta";
import { DetalleVentaServer } from "../DetalleVenta/DetalleVentaServer";
import { IDireccion } from "../Direccion/IDireccion";



export class VentasServidor
{

    private guardarCliente$: Observable<ICliente>;
    private guardarDireccion$: Observable<IDireccion>;

    private gusardarDetalle$: Observable<IDetalleVenta>;


    private idCliente : number;
    public constructor( private _ngZone: NgZone, 
        private service: ServiceFerreteriaService )
        {
            this.idCliente = 0;
        }
    public ejemplo( addCliente: Boolean, cliente: ICliente ): number
    {
        
        if( addCliente)
        {

            return cliente.id;
        }else
        {
     
        // this.addCliente( cliente );


            setTimeout(() => {
                return this.idCliente;
            }, 3000);
        }
    }


      
      
 

    public addCliente( cliente: ICliente, callback: any)
    {
        // return new Promise( (resolve, err )=>
        // {
            this._ngZone.runOutsideAngular(()=>
            {
                this.guardarCliente$ = this.service.serviceCliente.guardarCliente(cliente);
                this.guardarCliente$.subscribe
                (
                    (res: ICliente)=>
                    {
                        this._ngZone.run(()=>
                        {
                            this.idCliente = res.id;
                            
                            callback(res.id);
                            
                             //   resolve(res.id);
                            //    sessionStorage.setItem("idCliente", JSON.stringify(res.id) );
                            
      
                        });
                    }
                    ,err=>console.log(err)
                );
            });
        // });
    }

    enviarVetaServidor( id: number) 
    {
     
  
      console.log(id , "id segunda");
      let venta = JSON.parse(sessionStorage.getItem("carritoventa"));
  
      let d = new DetalleVentaServer();
  
      for (const key in venta) {
  
        if (venta[key].id != 0) {
          let detalle = new DetalleVentaServer();
  
          detalle.detalleAdd.precioDetalleVenta = venta[key].precioProducto;
          detalle.detalleAdd.cantidadDetalleVenta = venta[key].cantidad1;
          detalle.detalleAdd.subtotalDetalleVenta = venta[key].subtotal;
          detalle.detalleAdd.producto.id = venta[key].id;
       
          
          d.detalleV.detalle.push(detalle.detalleAdd);
  
        }
  
      }
  
      console.log(d.detalleV.detalle);

    }


    // enviarVetaServidor( id: number) 
    // {
     
  
      
    //   let venta = JSON.parse(sessionStorage.getItem("carritoventa"));
  
    //   let d = new DetalleVentaServer();
  
    //   for (const key in venta) {
  
    //     if (venta[key].id != 0) {
    //       let detalle = new DetalleVentaServer();
  
    //       detalle.detalleAdd.precioDetalleVenta = venta[key].precioProducto;
    //       detalle.detalleAdd.cantidadDetalleVenta = venta[key].cantidad1;
    //       detalle.detalleAdd.subtotalDetalleVenta = venta[key].subtotal;
    //       detalle.detalleAdd.producto.id = venta[key].id;
       
    //       console.log(detalle.detalleAdd.venta.cliente);
    //       d.detalleV.detalle.push(detalle.detalleAdd);
  
    //     }
  
    //   }
  
    //   let das: any = [];
    //   das = d.detalleV.detalle;
  
    //   this.pagoVenta.pago.pagoVenta = this.pago;
  
    //   this.suscription = this.serviceFerreteria.serviceDetalle
    //     .saveDetalleServer(das)
    //     .subscribe
    //     (
    //       res => {
    //         this.datosResouestVenta = res;
  
  
  
  
    //         if (this.pago >= this.totalVentaMostrar) {
    //           if (this.datosResouestVenta.id != 0) {
  
    //             //  this.agregarPedido(this.clientePersona ,this.direccion);
  
    //             this.ventasPagadas.ventasPagadas.estatusVenta.id = 1;
    //             this.ventasPagadas.ventasPagadas.venta.id = this.datosResouestVenta.id;
    //             this.saveVentaPagada();
    //           }
  
    //         }
    //         this.pagoVenta.pago.venta.id = this.datosResouestVenta.id;
  
    //         this.realizarPagosVenta();
  
  
    //         this.cambioVenta = 0;
    //         this.totalVentaMostrar = 0;
    //         this.pago = 0;
    //         this.showMessageRespuesta = true;
    //         sessionStorage.removeItem("carritoventa");
    //         sessionStorage.removeItem("tamanoCarrito");
    //         setTimeout(() => {
    //           this.showMessageRespuesta = false;
    //           this.router.navigateByUrl('/mostrarventas');
  
    //         }, 2000);
    //       },
    //       error => console.log(error)
  
    //     );
    // }



    public addDireccion( direccion: IDireccion )
    {
        this._ngZone.runOutsideAngular(()=>
        {
            this.guardarDireccion$ = this.service.serviceDireccion
            .guardarDireccion(direccion);
            this.guardarDireccion$.subscribe
            (
                (res: IDireccion)=>
                {
                    this._ngZone.run(()=>
                    {
                        sessionStorage.setItem("idDireccion", JSON.stringify(res.id) );
  
                    });
                }
                ,err=>console.log(err)
            );
        });
    }

}