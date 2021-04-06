

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { IMenu } from 'src/app/Model/Menu/IMenu';
import { IPagosVenta } from 'src/app/Model/PagosVenta/IPagosVenta';

import { Productos } from 'src/app/Model/Productos/Producto';
import { UriJava } from 'src/app/URISERVER/UriJava';

export class ServiceMenu
{

    private uri = new UriJava();

  //  eventKeyUp$ = new EventEmitter<string>();

    constructor(private http: HttpClient, private uriServer: string ){}


    // ------------------------------ Menu ------------------------------------------ //

      getMenus(): Observable<IMenu[]>
      {
        
        return this.http.get<IMenu[]>(`${this.uriServer}/menus`)
      }
      getOneMenu(nombreProducto:string)
      {

        return this.http.get(`${this.uriServer}/productos/buscarProductos/${nombreProducto}`);
      }
      // Returns an observable 
      savePagoVenta( pagoVenta: IPagosVenta ):Observable<any> 
      { 
           return  this.http.post(`${this.uriServer}/pagosventa/guardarPago`, pagoVenta);
       } 

       guardarProducto( producto: Productos ):Observable<any> { 
  
  //        console.log(producto);
      
        
           // Make http post request over api 
           // with formData as req 
           return  this.http.post(`${this.uriServer}/guardarProducto` , producto);
       } 

             // Returns an observable 


  // ------------------------------ Menu ------------------------------------------ //
      
}