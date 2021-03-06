import { HttpClient } from "@angular/common/http";
import { EventEmitter } from "@angular/core";
import { IDetalle } from "src/app/Model/DetalleVenta/IDetalle";

import { UriJava } from "src/app/URISERVER/UriJava";




export class ServiceDetalle
{

    constructor( private http : HttpClient, private uriServer: string ){}

    

    countProductosCarrito$ = new EventEmitter<number>();
    detalleVentaBuscarProducto$ = new EventEmitter<any>(); // BuscarProducto se refiera a la vista

    datosVenta$ = new EventEmitter<number>(); // 

    verCarritoCompras$ = new EventEmitter<Boolean>();

    public saveDetalleServer(detalle: any)
    {
      
        return this.http.post(`${this.uriServer}/Detalle/saveDetalle`,  detalle  );
    }

    public getDetalleVenta()
    {
        return this.http.get(`${this.uriServer}/detalleVenta/`);
    }





}