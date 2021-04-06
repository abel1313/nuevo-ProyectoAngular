import { HttpClient } from "@angular/common/http";


export class ServiceVenta
{
    private URI_JAVA_Productos = 'http://localhost:8080/ferreteria/ventas';

    constructor(private http: HttpClient, private uriServer: string ){}

    public getVenta(idProducto: number)
    {
        return this.http.post(`${this.URI_JAVA_Productos}/agregar/${idProducto}`, idProducto);
    }

    public getDetalleVenta()
    {
        return this.http.get(`${this.URI_JAVA_Productos}/detalleVenta/`);
    }




}