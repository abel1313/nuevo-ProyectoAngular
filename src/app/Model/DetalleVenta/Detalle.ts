import { IProducto } from "../Productos/IProducto";
import { IVenta } from "../Venta/IVenta";



export interface Detalle 
{
        id?:number;
        subtotalDetalleVenta: number;
        cantidadDetalleVenta: number;
        precioDetalleVenta: number;
        venta?: IVenta;
        producto: IProducto;

}