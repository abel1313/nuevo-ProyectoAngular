


import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { IPagosVenta } from 'src/app/Model/PagosVenta/IPagosVenta';

import { Productos } from 'src/app/Model/Productos/Producto';
import { UriJava } from 'src/app/URISERVER/UriJava';

export class ServicePagoVenta
{

    private uri = new UriJava();

    eventKeyUp$ = new EventEmitter<string>();

    constructor(private http: HttpClient){}


    // ------------------------------ Pago Venta ------------------------------------------ //

      getPagosVentaAll(): Observable<any[]>
      {
        return this.http.get<any[]>(`${this.uri.UriJavaFerreteria}/pagosventa/mostrarpagosventa `)
      }
      getOneProduct(nombreProducto:string)
      {
        //console.log(`${this.URI_JAVA_Productos}/all/${nombreProducto}`);
        return this.http.get(`${this.uri.UriJavaFerreteria}/productos/buscarProductos/${nombreProducto}`);
      }
      // Returns an observable 
      savePagoVenta( pagoVenta: IPagosVenta ):Observable<any> 
      { 
           return  this.http.post(`${this.uri.UriJavaFerreteria}/pagosventa/guardarPago`, pagoVenta);
       } 

       guardarProducto( producto: Productos ):Observable<any> { 
  
  //        console.log(producto);
      
        
           // Make http post request over api 
           // with formData as req 
           return  this.http.post(`${this.uri.UriJavaFerreteria}/guardarProducto` , producto);
       } 

             // Returns an observable 


  // ------------------------------ Productos ------------------------------------------ //
      
}