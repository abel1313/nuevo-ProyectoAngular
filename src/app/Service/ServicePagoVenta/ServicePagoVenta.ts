


import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { IDTOPagoReporte } from 'src/app/Model/DTO/DROPagosRepostes/IDTOPagoReporte';
import { IDTOVentasPagos } from 'src/app/Model/DTO/DROPagosRepostes/IDTOVentasPagos';
import { IPagosVenta } from 'src/app/Model/PagosVenta/IPagosVenta';

import { Productos } from 'src/app/Model/Productos/Producto';
import { UriJava } from 'src/app/URISERVER/UriJava';

export class ServicePagoVenta
{

    

    eventKeyUp$ = new EventEmitter<string>();
    eventKeyUpNombreCliente$ = new EventEmitter<string>();






    constructor(private http: HttpClient, private uriServer: string ){}


    // ------------------------------ Pago Venta ------------------------------------------ //

      getPagosVentaAll(): Observable<IDTOVentasPagos[]>
      {
        return this.http.get<IDTOVentasPagos[]>(`${this.uriServer}/pagosventa/mostrarpagosventa `)
      }
      buscarPagos(): Observable<IDTOVentasPagos[]>
      {
        return this.http.get<IDTOVentasPagos[]>(`${this.uriServer}/pagosventa/buscarPagos`)
      }
      getOnePago( nombreCliente: string ): Observable<IDTOVentasPagos[]>
      {
        return this.http.get<IDTOVentasPagos[]>(`${this.uriServer}/pagosventa/mostrarUnPago/${nombreCliente}`)
      }
      getOneProduct(nombreProducto:string)
      {
        //console.log(`${this.URI_JAVA_Productos}/all/${nombreProducto}`);
        return this.http.get(`${this.uriServer}/productos/buscarProductos/${nombreProducto}`);
      }
      // Returns an observable 
      savePagoVenta( pagoVenta: IPagosVenta ):Observable<any> 
      { 
           return  this.http.post(`${this.uriServer}/pagosventa/guardarPago`, pagoVenta);
       } 

       //
       savePagoVentaNew( pagoVenta: IPagosVenta ):Observable<IDTOPagoReporte> 
       { 
            return  this.http.post<IDTOPagoReporte>(`${this.uriServer}/pagosventa/guardarPago`, pagoVenta);
        } 
       //

       guardarProducto( producto: Productos ):Observable<any> { 
  
  //        console.log(producto);
      
        
           // Make http post request over api 
           // with formData as req 
           return  this.http.post(`${this.uriServer}/guardarProducto` , producto);
       } 

             // Returns an observable 


  // ------------------------------ Productos ------------------------------------------ //
      
}