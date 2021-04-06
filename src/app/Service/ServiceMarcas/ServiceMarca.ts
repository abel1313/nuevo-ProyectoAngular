



import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { IMarca } from 'src/app/Model/Marcas/IMarca';
import { IMarcas } from 'src/app/Model/Marcas/IMarcas';

import { IPagosVenta } from 'src/app/Model/PagosVenta/IPagosVenta';


import { UriJava } from 'src/app/URISERVER/UriJava';

export class ServiceMarca
{

    private uri = new UriJava();

  //  eventKeyUp$ = new EventEmitter<string>();

  marcas$ = new EventEmitter<IMarcas>();

    constructor(private http: HttpClient, private uriServer: string){}


    // ------------------------------ Menu ------------------------------------------ //

      getMarcas(): Observable<IMarcas[]>
      {
        
        return this.http.get<IMarcas[]>(`${this.uriServer}/marcass`)
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

       guardarMarca( marcas: IMarcas ):Observable<IMarcas> 
       {    
        
           return this.http.post<IMarcas>(`${this.uriServer}/marcass` , marcas);
       } 

             // Returns an observable 


  // ------------------------------ Menu ------------------------------------------ //
      
}