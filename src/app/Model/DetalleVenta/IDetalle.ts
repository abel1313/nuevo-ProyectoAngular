import { IProducto } from "../Productos/IProducto";
import { IVenta } from "../Venta/IVenta";


export interface IDetalle
{
    detalle:
    [
        {
            id?: number;
            precioDetalleVenta: number;
            cantidadDetalleVenta: number;
            subtotalDetalleVenta: number;
            producto: IProducto;
            venta?: IVenta;
        }
    ]

    

}