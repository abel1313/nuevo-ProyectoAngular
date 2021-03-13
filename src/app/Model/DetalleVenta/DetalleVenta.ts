import { IProducto } from "../Productos/IProducto";


export interface IDetalleVenta
{
    id?: number;
    venta? :number;
 
    precioDetalleVenta: number;
    cantidadDetalleVenta: number;
    subtotalDetalleVenta: number;
    producto: IProducto;
}
