


import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import { catchError, retry } from 'rxjs/operators';
import { ICategoria } from 'src/app/Model/Categorias/ICategoria';
import { Productos } from 'src/app/Model/Productos/Producto';
import { UriJava } from 'src/app/URISERVER/UriJava';

export class ServiceCategoria
{

    private uri = new UriJava();

    constructor(private http: HttpClient, private uriServer: string ){}
    // ------------------------------ Categorias ------------------------------------------ //

  getCategorias(): Observable<ICategoria[]>
  {
    return this.http.get<ICategoria[]>(`${this.uriServer}/categorias`)
  }
  getOneCategoria( nombreProducto:string ) 
  {
    //console.log(`${this.URI_JAVA_Productos}/all/${nombreProducto}`);
    return this.http.get(`${this.uriServer}/productos/buscarProductos/${nombreProducto}`);
  }
      // Returns an observable 
      saveProduct(file: Object):Observable<any> { 
  
        //console.log(file);
        
           // Make http post request over api 
           // with formData as req 
           return  this.http.post(this.uriServer, file);
       } 

       guardarProducto( producto: Productos ):Observable<any> { 
  
  //        console.log(producto);
      
        
           // Make http post request over api 
           // with formData as req 
           return  this.http.post(`${this.uriServer}/guardarProducto` , producto);
       } 

             // Returns an observable 


  // ------------------------------ Productos ------------------------------------------ //


}
