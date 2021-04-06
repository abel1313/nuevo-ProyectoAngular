import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import { catchError, retry } from 'rxjs/operators';
import { IProducto } from 'src/app/Model/Productos/IProducto';
import { IProductoAll } from 'src/app/Model/Productos/IProductoAll';
import { Productos } from 'src/app/Model/Productos/Producto';
import { ProductoServer } from 'src/app/Model/Productos/ProductoServer';
import { UriJava } from 'src/app/URISERVER/UriJava';

export class ServiceProducto
{
    private URI_JAVA_Productos = 'http://localhost:8080/ferreteria/productos';
    

    constructor(private http: HttpClient, private uriServer: string ){}

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
    return this.http.get<any[]>(`${this.uriServer}/productos`)
  }

  // verificarCodigoBarra( codigoBarra: string )
  // {
  //   return this.http.get(`${this.uriServer}/proveedores/existsproveedor/${codigoBarra}`);
  // }
  getOneProduct(nombreProducto:string)
  {
    //console.log(`${this.URI_JAVA_Productos}/all/${nombreProducto}`);
    return this.http.get(`${this.uriServer}/productos/buscarProductos/${nombreProducto}`);
  }
      // Returns an observable 
      saveProduct(file: Object):Observable<any> { 
  
        //console.log(file);
        
           // Make http post request over api 
           // with formData as req 
           return  this.http.post(this.URI_JAVA_Productos, file);
       } 

       nuevoProducto( producto: IProducto ): Observable<IProducto>
       {
        return  this.http.post<IProducto>(`${this.uriServer}/productos/guardarProducto` , producto );
       }
       existeCodigoBarra( codigoBarra: string ): Observable<Boolean>
       {
        return  this.http.get<Boolean>(`${this.uriServer}/productos/buscarCodigo/${codigoBarra}` );
       }

       guardarProducto( producto: Productos ):Observable<any> { 
  
  //        console.log(producto);
      
        
           // Make http post request over api 
           // with formData as req 
           return  this.http.post(`${this.URI_JAVA_Productos}/guardarProducto` , producto);
       } 
       editarrProductoServer( producto: IProductoAll ): Observable<any> { 

   return  this.http.put<IProductoAll>(`${this.uriServer}/productos/editarProducto` , producto);
             } 
       existsCodigoBarraEditar( producto: IProductoAll ): Observable<any>
       {
         
         return this.http.post(`${this.uriServer}/productos/buscarCodigoEditar`, producto);
       }

             // Returns an observable 


  // ------------------------------ Productos ------------------------------------------ //


}

