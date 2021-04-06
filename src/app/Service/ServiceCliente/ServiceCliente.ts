

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import { catchError, retry } from 'rxjs/operators';
import { ICliente } from 'src/app/Model/Clientes/ICliente';
import { IDTOClientePersona } from 'src/app/Model/Clientes/IDTOClientePersona';
import { Productos } from 'src/app/Model/Productos/Producto';
import { UriJava } from 'src/app/URISERVER/UriJava';

export class ServiceCliente {

  private uri = new UriJava();

  constructor(private http: HttpClient, private uriServer: string) { }

  mensajeAgregarService$ = new EventEmitter<string>();
  mensajeGuardarClientePersona$ = new EventEmitter<string>();

  buscarClienteKeyUp$ = new EventEmitter<string>();

  // ------------------------------ Clientes ------------------------------------------ //

  getClientesAutoComplete(): Observable<IDTOClientePersona[]> {
    return this.http.get<IDTOClientePersona[]>(`${this.uriServer}/clientes/buscarclientes`)
  }

  getClientesAll(): Observable<any> {
    return this.http.get(`${this.uriServer}/clientes/buscarclientes`)
  }
  getOneCliente( nombreCliente: string ): Observable<ICliente[]> {
    //console.log(`${this.URI_JAVA_Productos}/all/${nombreProducto}`);
    return this.http.get<ICliente[]>(`${this.uriServer}/clientes/ObtenerUnCliente/${nombreCliente}`);
  }

  obtenerClientesService(): Observable<any> {
    return this.http.get<ICliente[]>(`${this.uriServer}/clientes`)
  }

  // Returns an observable 
  guardarCliente( cliente: ICliente ): Observable<any> {

    //console.log(file);

    // Make http post request over api 
    // with formData as req 
    return this.http.post( `${this.uriServer}/clientes/savecliente`, cliente);
  }

  guardarProducto(producto: Productos): Observable<any> {

    //        console.log(producto);


    // Make http post request over api 
    // with formData as req 
    return this.http.post(`${this.uriServer}/guardarProducto`, producto);
  }

  // Returns an observable 

  actualizarCliente( cliente: ICliente ): Observable<any> {

    return this.http.put<ICliente[]>(`${this.uriServer}/clientes/updateClient/${cliente.id}`, cliente);
  }

  // Returns an observable 


  // ------------------------------ Clientes ------------------------------------------ //


}
