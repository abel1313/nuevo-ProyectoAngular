import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import { catchError, retry } from 'rxjs/operators';
import { IProducto } from 'src/app/Model/Productos/IProducto';
import { IProductoAll } from 'src/app/Model/Productos/IProductoAll';
import { Productos } from 'src/app/Model/Productos/Producto';
import { UriJava } from 'src/app/URISERVER/UriJava';

export class ServiceProducto
{
    private URI_JAVA_Productos = 'http://localhost:8080/ferreteria/productos';
    private uri = new UriJava();

    constructor(private http: HttpClient){}

    caracterKeyUp$ = new EventEmitter<string>();
    caracterInput$ = new EventEmitter<string>();
    editarProducto$ = new EventEmitter<IProducto>();

    mostra$ = new EventEmitter<string>();

    // ------------------------------ Productos ------------------------------------------ //
    options: {
      headers?: HttpHeaders | {[header: string]: string | string[]},
      observe?: 'body' | 'events' | 'response',
      params?: HttpParams|{[param: string]: string | string[]},
      reportProgress?: boolean,
      responseType?: 'arraybuffer'|'blob'|'json'|'text',
      withCredentials?: boolean,
    }
  getProductoAll(): Observable<any[]>
  {
    return this.http.get<any[]>(`${this.uri.UriJavaFerreteria}/productos`)
  }

  // verificarCodigoBarra( codigoBarra: string )
  // {
  //   return this.http.get(`${this.uri.UriJavaFerreteria}/proveedores/existsproveedor/${codigoBarra}`);
  // }
  getOneProduct(nombreProducto:string)
  {
    //console.log(`${this.URI_JAVA_Productos}/all/${nombreProducto}`);
    return this.http.get(`${this.uri.UriJavaFerreteria}/productos/buscarProductos/${nombreProducto}`);
  }
      // Returns an observable 
      saveProduct(file: Object):Observable<any> { 
  
        //console.log(file);
        
           // Make http post request over api 
           // with formData as req 
           return  this.http.post(this.URI_JAVA_Productos, file);
       } 

       guardarProducto( producto: Productos ):Observable<any> { 
  
  //        console.log(producto);
      
        
           // Make http post request over api 
           // with formData as req 
           return  this.http.post(`${this.URI_JAVA_Productos}/guardarProducto` , producto);
       } 
       editarrProductoServer( producto: IProductoAll ): Observable<any> { 

   return  this.http.put<IProductoAll>(`${this.uri.UriJavaFerreteria}/productos/editarProducto` , producto);
             } 
       existsCodigoBarraEditar( producto: IProductoAll ): Observable<any>
       {
         
         return this.http.post(`${this.uri.UriJavaFerreteria}/productos/buscarCodigoEditar`, producto);
       }

             // Returns an observable 


  // ------------------------------ Productos ------------------------------------------ //


}

