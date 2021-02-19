
import { IProveedor  } from "../Proveedores/IProveedor";

export interface Productos  extends IProveedor
{
    idProducto?: number,
    nombreProducto: string;
    codigoBarrasProducto: string;
    descripcionProducto: string;
    caracteristicasProducto: string;
    existenciaProducto: number;
    precioProducto: number;

 // proveedor: IProveedor;

    
}