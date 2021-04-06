
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import { catchError, retry } from 'rxjs/operators';
import { IPermisos } from 'src/app/Model/Permisos/IPermisos';
import { Productos } from 'src/app/Model/Productos/Producto';
import { UriJava } from 'src/app/URISERVER/UriJava';

export class ServicePermisos
{
 

    constructor(private http: HttpClient, private uriServer: string){}

    // ------------------------------ Productos ------------------------------------------ //


       guardarPermisos( permisos: IPermisos ): Observable<IPermisos>
       { 
           return  this.http.post<IPermisos>(`${this.uriServer}/permisos/permisosAdd`, permisos);
       } 

             // Returns an observable 


  // ------------------------------ Productos ------------------------------------------ //


}
